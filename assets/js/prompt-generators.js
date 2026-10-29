(() => {
  "use strict";

  const root = document.querySelector("[data-prompt-workbench]");
  if (!root) return;
  const inputs = Object.fromEntries([...root.querySelectorAll("[data-input]")].map(input => [input.dataset.input, input]));
  const outputs = Object.fromEntries([...root.querySelectorAll("[data-output]")].map(output => [output.dataset.output, output]));
  const buttons = Object.fromEntries([...root.querySelectorAll("[data-copy]")].map(button => [button.dataset.copy, button]));
  const status = root.querySelector("[data-copy-status]");
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
    return `本次材料：\n${lines.join("\n")}\n请读取实际材料；无法访问时说明缺少的必要来源，不凭链接或文件名假装已读。`;
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
    const lines = [];
    if (value("layout") && layouts[value("layout")]) lines.push(`布局偏好：${layouts[value("layout")]}`);
    if (value("reference")) lines.push("读取参考样式，学习相关页面的布局、组件和视觉语言，并用于本次规划及后续设计。");
    return lines.length ? `\n\n${lines.join("\n")}` : "";
  }
  function planContext() {
    return value("planMode") === "provided"
      ? `已确认的全局规划与设计约定：${source("plan", "【已确认规划的位置或内容】")}。请先读取，并核对其覆盖的完整功能与跨模块依赖。`
      : "沿用本对话中已由我确认的全局规划和后续设计定稿。若当前对话没有这些依据，请先索取已确认的规划，不自行跳过全局规划开始制作。";
  }
  function language() {
    if (value("language") === "zh") return "交互说明使用中文，保留实际 UI 标签和指定文案。";
    if (value("language") === "en") return "交互说明使用英文，保留实际 UI 标签和指定文案。";
    return "交互说明沿用项目定稿样例的语言；没有样例时使用中文。保留实际 UI 标签和指定文案。";
  }
  function stageOne() {
    const prototype = value("wap")
      ? "结合全部 WAP 需求图对照 PRD，指出不一致之处；需求图未覆盖的功能仍纳入全局规划。"
      : "从 PRD 的用户任务、业务规则和功能关系推导页面、流程及关键状态，区分明确需求与设计建议。";
    return `使用 web-prototype-design，先阅读完整需求、评估组件并完成全局 UX 规划，本轮只交付计划，不绘制或改动 Figma 画布。

${materials(true)}${designPreferences()}

请先通读整份 PRD，理解全部功能及其关系，再进行规划。${prototype}

梳理全部模块、页面、用户任务与关键状态，理清入口、跳转、数据依赖、权限和状态联动，以及全局共用的导航、组件和交互规则。不得只规划单个模块或忽略跨模块衔接。

读取组件库的实际组件来源、变体和样式，评估可复用组件、业务组合与具体缺口。此轮只整理组件信息和复用方案，不导入组件或开始落图。

给出各模块的画面清单、预计张数、重点状态和建议制作顺序，说明各阶段需要衔接的内容。张数用于估算，后续可按实际状态调整，不为凑数量重复出图。对于不合理的页面结构或细节安排，说明原因并提出改进建议；影响业务结果的缺失规则和材料冲突集中列出，不自行补成已确认事实。

交付全局功能关系、分模块画面清单与数量、组件复用方案、分阶段制作计划和必要待确认问题。到计划为止，等待我审阅确认后再开始制作。`;
  }
  function stageTwo() {
    const prototype = value("wap") ? "WAP 用于理解需求，不必照搬其设计。" : "";
    return `使用 web-prototype-design，依据已确认的全局规划，制作本轮模块的可编辑 UX 原型。

${materials(true)}
- 本轮模块：${source("scope", "【本轮制作模块】")}
- 目标位置：${source("target", "【UX 目标 Page 或 Section 链接】")}

${planContext()}${designPreferences()}

开始前重读本轮模块的 PRD，同时核对全局功能安排、上下游入口、数据与状态联动。不能孤立制作当前模块；与其他模块衔接的内容须保持一致。

尽量复用组件库现有组件、变体和素材，不重复造轮子。允许针对当前设计适当微调样式，例如文字颜色，主题色仍沿用组件库；不修改共享主组件。缺少关键组件时说明具体缺口，明确部分继续推进。

${prototype}在具体设计中发现整体或局部布局不合理时，说明问题和改进建议并向我确认；已指定整体布局时，在其框架下继续完成不受影响的部分，改变整体布局前先确认。准确沿用已确认的业务规则和指定文案，不编造规则。

按业务流程组织页面与关键状态，例如列表、Create 及创建成功结果、Edit 及保存成功结果分别成行，依实际任务安排，不机械套固定行数。相同部分不必重复画；不需要制作 Prototype 连线。需要表达的点击、hover 状态独立呈现为完整页面，在实际操作位置放小 cursor，不给无关页面机械加指针。弹窗或抽屉展开时压暗背景。UX 画面外不散放说明文字。

为每个完整 UX 页面立即建立空白 Interaction 画板：名称为 Interaction、不透明纯黑 #000000、宽 1200 px、高度与对应完整页面相同，顶部对齐并紧贴页面右侧。此轮不填写交互说明。每行相邻 UX 页面之间净间距 1400 px，包含 1200 px 的说明画板和其右侧 200 px 留白；每行最后一页也配说明板。上下两行从上一行最下缘到下一行顶部留 200 px。

仅在目标位置创建或整理本轮成果，需求来源、组件库和参考样式保持只读，保留其他业务和既有定稿。首个模块供我确认布局和状态表现方式，后续模块沿用评审定稿并结合各自功能调整。

完成后核对需求覆盖、模块衔接、组件、数据与文案一致性，检查所有关键状态的字体、换行、裁切、遮挡和画布间距。交付成果节点链接、页面与状态清单、实际检查范围和必要待确认问题。`;
  }
  function stageThree() {
    const reference = value("specReference")
      ? `\n交互说明参考样例（只读）：${source("specReference", "")}。请读取并学习其文字层级、组织方式和写法，固定画板规格仍按下方要求。`
      : "";
    const repair = inputs.repair.checked
      ? "本轮允许同步修正依据明确的原型问题，仅限成果链接所指模块的本地页面或实例，不改共享组件。需要业务决策的问题先确认；修正后重读关联状态并更新说明及问题状态。"
      : "本轮只写交互说明和审查问题，不修改 UX 原型。需要调整的地方先列出供我评审。";
    return `使用 web-interaction-spec，为当前模块编写交互说明，同时进行独立的原型对抗性审查。

${materials(false)}
本轮 UX 成果：${source("result", "【当前模块 UX 成果链接】")}。请核对所属模块、版本、各状态及已有 Interaction 画板。${reference}

${planContext()}
${language()}

重新阅读当前模块 PRD，结合全局规划核对关联功能和跨模块衔接，从原始需求独立建立审查依据，不把生成者自评当作正确性的证明。

在各状态对应的 Interaction 画板中编写说明，默认结构为 Entry → Function & Interaction。准确说明直接入口、操作、字段规则、条件联动、反馈及结果；通用规则集中写，局部状态只写差异。保留实际 UI 标签和精确文案，不补造 PRD 未规定的开发细节。

Interaction 画板固定为不透明纯黑 #000000、宽 1200 px、与对应完整 UX 页面等高，顶部对齐、紧贴页面右侧，水平间距 0。文字可编辑、清晰可读；内容过多时先精简重复说明，仍放不下则报告具体缺口，不自行加高或裁切正文。PRD 与 UX 的真实差异在对应说明中标红并写清依据。

同时检查明确需求、任务路径、保存与取消、关键状态变化及模块衔接。在原模块 Section 外、同一 Page 的可用位置新建审查画布，不散放于 UX 画面中；只写入对应说明和该审查区域。每个问题写清需求依据、具体画面、触发路径、预期与现状、影响及改进建议。区分已证实冲突、必要待确认项和待验证行为，静态图无法证明的运行行为不直接判缺陷，PRD 未展开的细节也不自动成为问题；没有可证实问题时如实说明。

${repair}

逐板核对说明与当前画面配对、文字可编辑性、换行、裁切和重叠。交付说明与审查画布的实际链接、问题清单、修正与必要未决项，并说明实际检查范围。`;
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
