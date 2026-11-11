#!/usr/bin/env python3
"""Validate self-contained skills and build one ZIP per skill using only stdlib."""

import argparse
import hashlib
import io
import json
import re
import sys
import zipfile
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
LINK = re.compile(r"\[[^\]\n]*\]\(([^)\n]+)\)")
PRIVATE_LOCATOR = re.compile(
    r"(?:/Users/|/home/|[A-Za-z]:\\Users\\)"
    r"|https?://(?:www\.)?figma\.com/(?:design|file|proto)/[A-Za-z0-9]{10,}"
    r"|node-id=\d"
)
WORKFLOW_SKILLS = ("web-prototype-design", "web-interaction-spec")
WORKFLOW_VERSION = re.compile(r"^工作流版本：\d+\.\d+\.\d+$", re.MULTILINE)


def require(condition, message):
    if not condition:
        raise ValueError(message)


def skill_files(skill):
    files = []
    for path in sorted(skill.rglob("*")):
        require(not path.is_symlink(), f"技能不能依赖符号链接：{path.relative_to(ROOT)}")
        if path.is_dir():
            continue
        relative = path.relative_to(skill)
        require(
            not any(part.startswith(".") or part == "__pycache__" for part in relative.parts),
            f"技能目录含有隐藏或缓存文件：{path.relative_to(ROOT)}",
        )
        require(path.suffix != ".pyc", f"不能打包缓存：{relative}")
        if path.suffix.lower() in {".md", ".json", ".yaml", ".yml", ".txt"}:
            content = path.read_text(encoding="utf-8")
            require(
                not PRIVATE_LOCATOR.search(content),
                f"检测到个人路径或私人 Figma 定位信息：{path.relative_to(ROOT)}",
            )
        files.append(path)
    return files


def validate_skill(skill):
    require(re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", skill.name), f"技能名无效：{skill.name}")
    require(len(skill.name) <= 64, f"技能名过长：{skill.name}")
    entry = skill / "SKILL.md"
    require(entry.is_file(), f"缺少入口：{entry.relative_to(ROOT)}")
    text = entry.read_text(encoding="utf-8")
    sections = text.split("---", 2)
    require(text.startswith("---\n") and len(sections) == 3, f"缺少 YAML 头：{skill.name}")
    fields = {}
    for line in sections[1].strip().splitlines():
        key, sep, value = line.partition(":")
        require(sep and key in {"name", "description"}, f"请检查 YAML 字段：{skill.name}: {line}")
        require(key not in fields, f"重复字段：{skill.name}: {key}")
        fields[key] = value.strip().strip('"\'')
    require(fields.get("name") == skill.name, f"目录名与 name 不一致：{skill.name}")
    require(bool(fields.get("description")), f"缺少 description：{skill.name}")
    require(len(fields["description"]) <= 1024, f"description 过长：{skill.name}")
    files = skill_files(skill)
    for path in files:
        if path.suffix == ".md":
            check_links(path, within=skill)
    return files


def check_links(path, within=ROOT):
    """Check actual local Markdown links, including links to generated downloads."""
    for raw in LINK.findall(path.read_text(encoding="utf-8")):
        target = raw.strip().split(' "', 1)[0].strip("<>")
        url = urlsplit(target)
        if url.scheme or url.netloc or not url.path:
            continue
        destination = (path.parent / unquote(url.path)).resolve()
        require(destination.is_relative_to(within.resolve()), f"链接越出目录：{path.relative_to(ROOT)} → {target}")
        require(destination.exists(), f"本地链接失效：{path.relative_to(ROOT)} → {target}")


def make_archive(skill, files, flat=False):
    entries = {}
    for path in files:
        relative = path.relative_to(skill).as_posix()
        entries[relative] = path.read_bytes()
    entries["LICENSE"] = (ROOT / "LICENSE").read_bytes()
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for relative, data in sorted(entries.items()):
            name = relative if flat else f"{skill.name}/{relative}"
            info = zipfile.ZipInfo(name, date_time=(2020, 1, 1, 0, 0, 0))
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            info.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(info, data)
    output = buffer.getvalue()
    with zipfile.ZipFile(io.BytesIO(output)) as archive:
        require(archive.testzip() is None, f"ZIP 校验失败：{skill.name}")
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="只验证源文件与已有下载包，不修改文件")
    parser.add_argument("--sync-workflow", action="store_true", help="将工作流版本同步到两个技能后打包")
    args = parser.parse_args()
    require(not (args.check and args.sync_workflow), "--check 不能与 --sync-workflow 同时使用")
    version = (ROOT / "VERSION").read_text(encoding="utf-8").strip()
    require(re.fullmatch(r"\d+\.\d+\.\d+", version), "VERSION 应为主版本.次版本.修订号")
    workflow = json.loads((ROOT / "_data/web_workflow.json").read_text(encoding="utf-8"))
    workflow_version = workflow.get("version", "")
    require(isinstance(workflow_version, str) and re.fullmatch(r"\d+\.\d+\.\d+", workflow_version), "Web 工作流版本无效")
    for name in WORKFLOW_SKILLS:
        entry = ROOT / "skills" / name / "SKILL.md"
        content = entry.read_text(encoding="utf-8")
        require(len(WORKFLOW_VERSION.findall(content)) == 1, f"{name} 必须有且仅有一个工作流版本标识")
        expected = f"工作流版本：{workflow_version}"
        if args.sync_workflow:
            content = WORKFLOW_VERSION.sub(expected, content)
            entry.write_text(content, encoding="utf-8")
        require(expected in WORKFLOW_VERSION.findall(content), f"{name} 的工作流版本不一致；运行 --sync-workflow")
    skills = sorted(path for path in (ROOT / "skills").iterdir() if path.is_dir())
    require(bool(skills), "没有找到技能")
    outputs = {}
    for skill in skills:
        files = validate_skill(skill)
        outputs[f"{skill.name}.zip"] = make_archive(skill, files)
        outputs[f"flat/{skill.name}.zip"] = make_archive(skill, files, flat=True)

    dist = ROOT / "dist"
    existing = {p.relative_to(dist).as_posix() for p in dist.rglob("*.zip") if not p.relative_to(dist).parts[0] == "versions"}
    require(not (existing - outputs.keys()), f"存在过期下载包，请核对后移除：{sorted(existing - outputs.keys())}")
    sums = "".join(
        f"{hashlib.sha256(data).hexdigest()}  {name}\n" for name, data in sorted(outputs.items())
    )
    outputs["SHA256SUMS"] = sums.encode("utf-8")
    # Released workflow versions are immutable, including their prompt generator.
    # A version bump is required before changing either skill or its prompt code.
    workflow_outputs = {}
    for name in WORKFLOW_SKILLS:
        for prefix in ("", "flat/"):
            archive = f"{prefix}{name}.zip"
            workflow_outputs[archive] = outputs[archive]
    workflow_hashes = {
        "assets/js/prompt-generators.js": hashlib.sha256((ROOT / "assets/js/prompt-generators.js").read_bytes()).hexdigest(),
        **{name: hashlib.sha256(data).hexdigest() for name, data in sorted(workflow_outputs.items())},
    }
    manifest = (json.dumps({"version": workflow_version, "sha256": workflow_hashes}, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    workflow_outputs["manifest.json"] = manifest
    for name, data in workflow_outputs.items():
        relative = f"versions/{workflow_version}/{name}"
        destination = dist / relative
        require(not destination.exists() or destination.read_bytes() == data, f"已发布的工作流版本不能修改：{relative}；请更新工作流版本并同步技能")
        outputs[relative] = data
    for name, data in outputs.items():
        destination = dist / name
        if args.check:
            require(destination.is_file(), f"缺少下载包：dist/{name}")
            require(destination.read_bytes() == data, f"产物已过期，请重新打包：dist/{name}")
        else:
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(data)
    for path in [ROOT / "README.md", ROOT / "CONTRIBUTING.md", *sorted((ROOT / "docs").glob("*.md"))]:
        check_links(path)
    action = "校验通过" if args.check else "打包完成"
    print(f"{action}：项目 v{version}，Web 工作流 v{workflow_version}，{len(skills)} 个独立技能，校验值及本地链接有效。")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, zipfile.BadZipFile) as error:
        print(f"错误：{error}", file=sys.stderr)
        sys.exit(1)
