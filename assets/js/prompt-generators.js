(() => {
  "use strict";

  const root = document.querySelector("[data-prompt-workbench]");
  if (!root) return;
  const inputs = Object.fromEntries([...root.querySelectorAll("[data-input]")].map(input => [input.dataset.input, input]));
  const outputs = Object.fromEntries([...root.querySelectorAll("[data-output]")].map(output => [output.dataset.output, output]));
  const buttons = Object.fromEntries([...root.querySelectorAll("[data-copy]")].map(button => [button.dataset.copy, button]));
  const status = root.querySelector("[data-copy-status]");
  const workflowVersion = root.dataset.workflowVersion;
  if (!/^\d+\.\d+\.\d+$/.test(workflowVersion || "")) {
    for (const output of Object.values(outputs)) output.value = "工作流版本信息不可用，请刷新页面或联系维护者。";
    for (const button of Object.values(buttons)) button.disabled = true;
    status.textContent = "工作流版本信息不可用，无法生成提示词。";
    return;
  }
  const touched = new Set();
  const dependencies = {
    one: ["prd", "library", "wap", "reference", "layoutCustom"],
    two: ["prd", "library", "wap", "reference", "layoutCustom", "scope", "target", "plan"],
    three: ["prd", "result", "specReference", "plan"]
  };
  const labels = {one: "复制全局规划提示词", two: "复制模块 UX 提示词", three: "复制说明与审查提示词"};
  const stageNames = {one: "第一阶段", two: "第二阶段", three: "第三阶段"};
  const readyHelp = {
    one: "复制后交给 Agent；先审阅全局规划，确认后再开画。",
    two: "在计划已确认的前提下执行，可更换模块重复使用。",
    three: "按成果链接定位当前模块，写说明并独立审查。"
  };
  const validated = [...new Set(Object.values(dependencies).flat())];
  const value = key => inputs[key].value.trim();
  const source = (key, fallback) => JSON.stringify(value(key) || fallback);

  function figmaError(key) {
    const raw = value(key);
    if (!raw) return ["library", "target", "result"].includes(key) ? "请填写 Figma 文件或节点链接。" : "";
    try {
      const url = new URL(raw);
      const kinds = key === "wap" ? "design|file|proto" : "design|file";
      if (url.protocol !== "https:" || !["figma.com", "www.figma.com"].includes(url.hostname) || url.username || url.password || !new RegExp(`^/(${kinds})/[A-Za-z0-9_-]+(?:/|$)`).test(url.pathname)) {
        return key === "wap" ? "请使用完整的 Figma Design、File 或 Prototype 链接。" : "请使用 Figma Design 文件或节点链接（非演示链接）。";
      }
    } catch { return "链接格式不完整，请粘贴完整的 Figma 链接。"; }
    return "";
  }
  function error(key) {
    if (key === "prd") return value(key) ? "" : "请填写 Agent 可读取的完整 PRD 位置。";
    if (key === "scope") return value(key) ? "" : "请填写本轮制作的模块。";
    if (key === "layoutCustom") return value("layout") === "custom" && !value(key) ? "请描述自定义布局。" : "";
    if (key === "plan") return value("planMode") === "provided" && !value(key) ? "请填写已确认的全局规划位置或内容。" : "";
    return figmaError(key);
  }
  function showError(key) {
    const message = touched.has(key) ? error(key) : "";
    inputs[key].setAttribute("aria-invalid", message ? "true" : "false");
    root.querySelector(`[data-error="${key}"]`).textContent = message;
  }
  function materials(withDesign) {
    const lines = [`- 完整 PRD：${source("prd", "【完整 PRD 位置或附件名】")}`];
    if (withDesign) {
      lines.push(`- 组件库（只读）：${source("library", "【组件库 Figma 链接】")}`);
      if (value("wap")) lines.push(`- WAP 需求原型（只读）：${source("wap", "")}`);
      if (value("reference")) lines.push(`- 参考样式（只读）：${source("reference", "")}`);
    }
    return `本次材料：\n${lines.join("\n")}`;
  }
  function designPreferences() {
    const layouts = {
      wap: "整体布局优先参考 WAP。",
      "sidebar-topbar": "整体采用侧边栏 + 顶栏 + 内容区的布局。",
      sidebar: "整体采用侧边栏 + 内容区的布局。",
      topbar: "整体采用顶栏导航 + 内容区的布局。",
      split: "页面主要内容采用左右分栏布局。",
      custom: `整体布局按我的描述：${source("layoutCustom", "【自定义布局描述】")}。`
    };
    const layout = layouts[value("layout")];
    return layout ? `\n\n布局偏好：${layout}` : "";
  }
  function planContext() {
    return value("planMode") === "provided"
      ? `已确认的全局规划与设计约定：${source("plan", "【已确认规划的位置或内容】")}。`
      : "沿用本对话中已确认的全局规划和设计定稿。缺少已确认的规划时，先向我索取。";
  }
  function language() {
    if (value("language") === "zh") return "交互说明使用中文。";
    if (value("language") === "en") return "交互说明使用英文。";
    return "交互说明沿用项目定稿的语言。没有样例时使用中文。";
  }
  function versionCheck(skills) {
    return `开始任务前，核对实际加载的 ${skills.join("、")} 的 SKILL.md，确认工作流版本均为 ${workflowVersion}，不要仅凭技能列表判断。若未安装、版本不符或无法核实，请停止并告诉我具体情况；确认后再继续。`;
  }
  function stageOne() {
    return `${versionCheck(["web-prototype-design", "web-interaction-spec"])}

使用 web-prototype-design，通读完整 PRD 并完成全局 UX 规划。

${materials(true)}${designPreferences()}

Figma 只读。交付各模块的画面清单与预计张数、组件方案、制作顺序和待确认问题。等我确认计划后再制作。`;
  }
  function stageTwo() {
    return `${versionCheck(["web-prototype-design"])}

使用 web-prototype-design，按已确认的全局规划制作本轮模块的可编辑 UX，为每个完整页面配空白 Interaction 画板。

${materials(true)}
- 本轮模块：${source("scope", "【本轮制作模块】")}
- 目标位置：${source("target", "【UX 目标 Page 或 Section 链接】")}

${planContext()}${designPreferences()}

本轮只在目标位置写入。交付成果链接、页面与状态清单、检查结果和待确认问题。`;
  }
  function stageThree() {
    const reference = value("specReference")
      ? `\n- 交互说明参考样例（只读）：${source("specReference", "")}`
      : "";
    const repair = inputs.repair.checked
      ? "允许同步修正本轮模块内依据明确的原型问题。"
      : "UX 原型保持只读。";
    return `${versionCheck(["web-interaction-spec"])}

使用 web-interaction-spec，对本轮模块做独立的对抗性审查。在对应 Interaction 写交互说明，在模块 Section 外另建审查画布。

${materials(false)}
- 本轮 UX 成果：${source("result", "【当前模块 UX 成果链接】")}${reference}

${planContext()}
${language()}

${repair}

交付说明与审查画布的链接、问题清单和实际检查范围。`;
  }
  function render() {
    const canUseWap = Boolean(value("wap")) && !error("wap");
    const wapOption = root.querySelector("[data-wap-layout]");
    wapOption.disabled = !canUseWap;
    wapOption.textContent = canUseWap ? "参考 WAP 布局" : "参考 WAP 布局（需填写需求原型）";
    if (!canUseWap && value("layout") === "wap") inputs.layout.value = "";
    root.querySelector("[data-custom-layout]").hidden = value("layout") !== "custom";
    root.querySelector("[data-plan-source]").hidden = value("planMode") !== "provided";
    outputs.one.value = stageOne();
    outputs.two.value = stageTwo();
    outputs.three.value = stageThree();
    for (const stage of Object.keys(outputs)) {
      root.querySelector(`[data-count="${stage}"]`).textContent = `${outputs[stage].value.length.toLocaleString("zh-CN")} 字符`;
      const firstError = dependencies[stage].map(error).find(Boolean);
      buttons[stage].disabled = Boolean(firstError);
      buttons[stage].textContent = labels[stage];
      root.querySelector(`[data-stage-help="${stage}"]`).textContent = firstError || readyHelp[stage];
    }
    root.querySelector("[data-material-count]").textContent = `${["prd", "library"].filter(key => !error(key)).length} / 2 项就绪`;
    for (const key of validated) showError(key);
    status.textContent = "";
  }

  for (const [key, input] of Object.entries(inputs)) {
    input.addEventListener("input", render);
    input.addEventListener("change", render);
    if (validated.includes(key)) input.addEventListener("blur", () => { touched.add(key); showError(key); });
  }
  root.querySelector("form").addEventListener("submit", event => event.preventDefault());
  for (const [stage, button] of Object.entries(buttons)) {
    button.addEventListener("click", async () => {
      if (dependencies[stage].some(key => error(key))) return;
      const output = outputs[stage];
      const text = output.value;
      let copied = false;
      try { await navigator.clipboard.writeText(text); copied = true; }
      catch {
        output.closest("details").open = true;
        output.focus(); output.select();
        try { copied = document.execCommand("copy"); } catch { copied = false; }
      }
      if (copied) {
        if (output.value === text) button.textContent = "已复制";
        status.textContent = `已复制${stageNames[stage]}提示词，可粘贴到 Agent。`;
        button.focus();
      } else {
        status.textContent = "自动复制不可用，已展开并选中提示词，请按 ⌘C 或 Ctrl+C 复制。";
      }
      root.querySelector(`[data-stage-help="${stage}"]`).textContent = status.textContent;
    });
  }
  render();
})();
