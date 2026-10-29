(() => {
  "use strict";

  const root = document.querySelector("[data-prompt-workbench]");
  if (!root) return;
  const inputs = Object.fromEntries([...root.querySelectorAll("[data-input]")].map(input => [input.dataset.input, input]));
  const outputs = Object.fromEntries([...root.querySelectorAll("[data-output]")].map(output => [output.dataset.output, output]));
  const buttons = Object.fromEntries([...root.querySelectorAll("[data-copy]")].map(button => [button.dataset.copy, button]));
  const required = ["prd", "wap", "library", "target"];
  const optionalLinks = ["reference", "result"];
  const touched = new Set();
  const status = root.querySelector("[data-copy-status]");

  function value(key) { return inputs[key].value.trim(); }
  function figmaError(key) {
    const raw = value(key);
    if (!raw) return optionalLinks.includes(key) ? "" : "请填写 Figma 文件或节点链接。";
    try {
      const url = new URL(raw);
      const kinds = key === "wap" ? "design|file|proto" : "design|file";
      if (url.protocol !== "https:" || !["figma.com", "www.figma.com"].includes(url.hostname) || url.username || url.password || !new RegExp(`^/(${kinds})/[A-Za-z0-9_-]+(?:/|$)`).test(url.pathname)) {
        return key === "wap" ? "请使用 https://www.figma.com/ 下的 Design、File 或 Prototype 链接。" : "请使用 Figma Design 文件或节点链接（非演示链接）。";
      }
    } catch { return "链接格式不完整，请粘贴完整的 Figma 链接。"; }
    return "";
  }
  function error(key) { return key === "prd" ? (value(key) ? "" : "请填写 Agent 可读取的 PRD 位置。") : figmaError(key); }
  function showError(key) {
    const message = touched.has(key) ? error(key) : "";
    inputs[key].setAttribute("aria-invalid", message ? "true" : "false");
    root.querySelector(`[data-error="${key}"]`).textContent = message;
  }
  function source(key, fallback) { return JSON.stringify(value(key) || fallback); }
  function language() {
    if (value("language") === "zh") return "交互说明使用中文，保留实际 UI 标签和指定文案。";
    if (value("language") === "en") return "交互说明使用英文，保留实际 UI 标签和指定文案。";
    return "交互说明沿用项目定稿样例的语言；没有样例时使用中文，保留实际 UI 标签和指定文案。";
  }
  function sources() {
    const reference = value("reference") ? `\n参考样式（只读）：${source("reference", "")}` : "";
    return `本次材料：
- PRD：${source("prd", "【PRD 文件位置】")}
- 需求原型：${source("wap", "【WAP 原型 Figma 链接】")}
- 组件库：${source("library", "【组件库 Figma 链接】")}${reference}
- 目标位置：${source("target", "【目标位置 Figma 链接】")}
- 功能范围：${value("scope") ? JSON.stringify(value("scope")) : "根据 PRD 和需求原型确定"}

请先读取实际材料；无法访问时说明缺少什么。需求原型、组件库和参考样式只用于阅读与复用，写入限于指定目标位置。`;
  }
  function stageOne() {
    const reference = value("reference")
      ? "参考给出的 Figma 样式，学习相关页面的布局、组件和视觉语言，并结合当前功能设计；参考内容保持只读。"
      : "结合目标产品现有页面学习布局和视觉语言。";
    return `使用 web-prototype-design，根据本次需求制作 Web UX 原型。

${sources()}

请阅读 PRD 和需求原型，理解功能、用户操作和页面状态，梳理需要哪些页面与关键状态。检查组件库，尽量复用现成组件、变体和素材，不要重复造轮子。${reference}

先规划需要的页面和组件；如果缺少关键组件，告诉我具体缺口，我可以帮忙寻找。涉及业务规则不明确或材料互相冲突时及时问我；明确的部分继续推进，不要自行编造规则。

在目标位置制作可编辑的 UX 画面，按业务流程和状态合理排列，并为后续交互说明留出空间。状态以能讲清楚流程为准，相同部分不必重复画；不需要制作 Prototype 连线。保留现有定稿和共享组件，准确沿用已确认的业务规则及文案。

完成后检查画面与需求是否对应、组件是否可用，以及文字、布局有无裁切或重叠。给我成果的 Figma 节点链接、页面与状态清单，以及需要我确认的问题；如果无法写入，也请说明实际完成的内容。`;
  }
  function stageTwo() {
    const target = value("result")
      ? `第一阶段成果：${source("result", "")}。请核对它属于指定目标范围。`
      : "请在目标位置找到本次功能的 UX 成果；若有多个可能的版本，先向我确认。";
    const reference = value("reference")
      ? "参考给出的 Figma 样式；如其中有定稿交互说明，学习其语言、结构和版式。"
      : "参考目标文件中已有的定稿说明，沿用适合本次任务的语言、结构和版式。";
    const repair = inputs.repair.checked
      ? "对于依据明确、可用现有组件解决的原型问题，可以在本次目标范围内同步修正，并检查相关状态；需要业务决策的问题先和我确认。"
      : "本轮只写交互说明和标记问题，不修改 UX 原型；需要改动的地方先列出来供我评审。";
    return `使用 web-interaction-spec，根据 PRD 和当前 UX 画面，为本次功能编写交互说明。

${sources()}

${target}
${reference}${language()}

逐个核对需求与画面，说明当前页面的入口、操作和有依据的字段规则、状态变化及结果。按实际内容组织说明，不必为每个画面重复通用规则，也不要补写 PRD 没有规定的开发细节。保留已有 UI 标签和明确指定的文案。

在对应 UX 画面旁放置可编辑的 Interaction 说明。将 PRD 与 UX 对不上的地方在画布中用红色标出，写清对应画面、需求依据和现状，方便我直接评审；不确定的事项单独列出，不把猜测当成已确认规则。${repair}

完成后检查说明与画面是否对应、文字是否可编辑且没有裁切或重叠。给我成果节点链接和问题清单，说明哪些问题需要我确认，以及实际完成的检查。`;
  }

  function render() {
    outputs.one.value = stageOne();
    outputs.two.value = stageTwo();
    for (const stage of ["one", "two"]) {
      root.querySelector(`[data-count="${stage}"]`).textContent = `${outputs[stage].value.length.toLocaleString("zh-CN")} 字符`;
      buttons[stage].textContent = `复制第${stage === "one" ? "一" : "二"}阶段提示词`;
    }
    const ready = required.filter(key => !error(key)).length;
    root.querySelector("[data-material-count]").textContent = `${ready} / 4 项就绪`;
    buttons.one.disabled = ready !== 4 || Boolean(error("reference"));
    buttons.two.disabled = ready !== 4 || Boolean(error("reference")) || Boolean(error("result"));
    for (const key of [...required, ...optionalLinks]) showError(key);
    status.textContent = "";
  }

  for (const [key, input] of Object.entries(inputs)) {
    input.addEventListener("input", render);
    input.addEventListener("change", render);
    if ([...required, ...optionalLinks].includes(key)) input.addEventListener("blur", () => { touched.add(key); showError(key); });
  }
  root.querySelector("form").addEventListener("submit", event => event.preventDefault());
  for (const [stage, button] of Object.entries(buttons)) {
    button.addEventListener("click", async () => {
      if (required.some(key => error(key)) || error("reference") || (stage === "two" && error("result"))) return;
      const output = outputs[stage];
      const text = output.value;
      let copied = false;
      try { await navigator.clipboard.writeText(text); copied = true; }
      catch {
        output.focus(); output.select();
        try { copied = document.execCommand("copy"); } catch { copied = false; }
      }
      if (copied) {
        if (output.value === text) button.textContent = "已复制";
        status.textContent = `已复制第${stage === "one" ? "一" : "二"}阶段提示词，可粘贴到 Agent。`;
        button.focus();
      } else {
        status.textContent = "自动复制不可用，已选中提示词，请按 ⌘C 或 Ctrl+C 复制。";
      }
    });
  }
  render();
})();
