---
title: 维护与发布
---

# 维护与发布

## 每个 skill 独立打包

每个 `skills/<skill-name>/` 是独立安装单元，只维护这份源文件，不手工修改 `dist/` 中的包。每个技能保持自包含，不依赖仓库内的其他技能，也不加入个人插件清单。

使用教程推荐让 Agent 一次安装仓库中的全部技能；安装包仍按技能分别生成，便于手动导入、单项更新和卸载。

新增 skill 时包含：

- `SKILL.md`：YAML 头中的 `name`、`description`，以及工作流正文。
- `references/`：正文实际引用的方法、例稿或规范；引用使用相对路径。
- `agents/openai.yaml`：可选的展示元数据，只填该 skill 的名称、简介和启动提示。其他平台可以忽略。

技能目录与 `name` 一致，使用小写字母、数字和连字符。描述中区分适用任务与相近技能的边界。

## 分享版的边界

本次从作者的个人技能中提炼了共享版，原本机技能未修改。保留工作方法、授权范围、证据判断、状态覆盖与核验要求；调整了以下内容：

- 个人会话的默认写回、术语及尺寸改为服从当前项目约定。
- 删除私人 Figma 链接、file key、节点索引、原始 Home JSON 档案和项目专用业务规则档案。
- 将私人来源基线与逐次改稿记录替换为去标识的方法归纳和虚构示例；不再宣称安装者已读取历史文件。
- 官方 MCP 的配套工具技能只在使用相应工具时按需加载；Figwright 使用其实际工具，不假定存在 `use_figma`。

项目专用规则由使用者在实际任务中提供，不写进通用包。发布包不包含任何账号凭证、用户目录或本机工具配置；`examples/mcp/` 仅是公开工具的通用示例，不会自动安装服务。

## 生成与验证

需要 Python 3.10+，仅使用标准库。在仓库根目录执行：

```bash
python3 scripts/package_skills.py
python3 scripts/package_skills.py --check
```

打包脚本检查技能名、入口、当前使用的精简 YAML 头、技能内相对链接、自包含性和常见私人定位信息，生成：

- `dist/<skill-name>.zip`：包含一个同名顶层文件夹，适合 Claude 等导入器或解压安装。
- `dist/flat/<skill-name>.zip`：根层直接包含 `SKILL.md`，适合明确要求该格式的导入器。
- `dist/SHA256SUMS`：六个独立包的 SHA-256 校验值。

每个包自动带 Apache-2.0 许可证。ZIP 使用固定时间戳和文件顺序，在相同运行环境下可以重复生成相同字节。`--check` 不修改文件，可发现源文件与压缩包不一致、遗留旧包和本地文档断链。

脚本只支持本仓库当前的 `name` / `description` YAML 头；未来增加多行 YAML 或其他前置信息时，应先同步校验逻辑。常见模式扫描不能替代人工检查，也不能保证检测所有敏感业务信息。

## 发一个新版本

1. 修改对应 skill 及其必要参考资料，确保不依赖私人来源。
2. 更新 `VERSION` 和 README 中的版本号；平台步骤变化时重新核对官方文档，并更新核对日期。
3. 运行打包和 `--check`。人工检查修改过的任务边界、示例和跨平台工具依赖。
4. 在实际使用的客户端只安装受影响的一项，验证技能与参考资料可发现。涉及 Figma 时用明确的测试文件检查读写与渲染，不覆盖用户工作稿。
5. 在 `docs/releases/<版本号>.md` 写发布说明，提交源文件、文档、下载包和校验值。发布 GitHub Release 时，分别附上需要的独立安装包及校验文件；保持仓库下载链接可用。

Release 中的兼容包命名为 `<skill-name>-flat.zip`，其余标准包名称不变。Release 的 `SHA256SUMS` 按附件名生成，与仓库 `dist/` 中带子目录的校验文件分别使用。

结构校验不代表五个平台安装已实测，静态截图也不代表运行产品已测试。记录实际通过的验证层级即可。

## 维护文档网站

文档站使用 GitHub Pages 与 [Minimal](https://github.com/pages-themes/minimal) 主题，发布来源为 `main` 分支根目录。提交推送后，由 GitHub 自动构建和发布。

- `index.md` 是网站首页，`README.md` 是 GitHub 仓库入口。调整技能或版本信息时，检查这两个入口是否一致。
- 教程继续维护在 `docs/` 中。新页面需要包含带 `title` 的 YAML 头，再按需加入 `_config.yml` 的 `navigation`。
- 文档之间保留 `.md` 相对链接，网站构建时由 `jekyll-relative-links` 转换为网页地址。下载链接使用 `dist/` 中的现有安装包。
- `_layouts/default.html` 负责文档导航，`assets/css/style.scss` 在 Minimal 原样式上补充中文排版、响应式布局和表格滚动。
- 技能源文件不参与网站渲染；首页中的技能名称链接到 GitHub 源文件。修改主题配置不会改变技能安装包。

本地预览需要 Ruby 与 Bundler。在仓库根目录执行：

```bash
bundle install
bundle exec jekyll serve
```

预览地址为 `http://127.0.0.1:4000/design-skills-by-jerry/`。发布后检查首页、文档导航、页内链接和 ZIP 下载；构建失败时，到仓库的 Actions 中查看 Pages 构建日志。
