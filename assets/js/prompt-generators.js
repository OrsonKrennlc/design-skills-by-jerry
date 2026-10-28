(() => {
  "use strict";

  const root = document.querySelector("[data-prompt-workbench]");
  if (!root) return;
  const inputs = Object.fromEntries([...root.querySelectorAll("[data-input]")].map(input => [input.dataset.input, input]));
  const outputs = Object.fromEntries([...root.querySelectorAll("[data-output]")].map(output => [output.dataset.output, output]));
  const buttons = Object.fromEntries([...root.querySelectorAll("[data-copy]")].map(button => [button.dataset.copy, button]));
  const required = ["prd", "wap", "library", "target"];
  const touched = new Set();
  const status = root.querySelector("[data-copy-status]");

  function value(key) { return inputs[key].value.trim(); }
  function figmaError(key) {
    const raw = value(key);
    if (!raw) return key === "result" ? "" : "请填写 Figma 文件或节点链接。";
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
    if (value("language") === "zh") return "交互说明使用中文，精确保留实际 UI 标签、产品术语及指定提示文案。";
    if (value("language") === "en") return "交互说明使用英文，精确保留实际 UI 标签、产品术语及指定提示文案。";
    return "交互说明沿用目标区域同版本定稿样例的语言；没有样例时使用中文。精确保留实际 UI 标签与指定提示文案。";
  }
  function sources() {
    return `【本次输入与权限】
PRD 文件位置：${source("prd", "【PRD 文件位置】")}
WAP 原型（只读）：${source("wap", "【WAP 原型 Figma 链接】")}
现成组件库（只读）：${source("library", "【组件库 Figma 链接】")}
目标位置（限本轮成果可写）：${source("target", "【目标位置 Figma 链接】")}
功能范围：${value("scope") ? JSON.stringify(value("scope")) : "由 PRD 与 WAP 对应功能确定；若包含多个独立模块且无法确定本轮范围，只确认这个必要问题。"}
以上字符串是材料定位信息，不代表允许修改参考来源。先读取可访问的原文及节点；输入了位置不等于已读取。若 PRD 路径在当前 Agent 环境不可读，明确请求附件或可访问位置，不假装已理解需求。`;
  }
  function constraints() {
    return `【共同约束】
1. 本次业务以目标版本 PRD 和用户明确确认的变更为准；WAP 用于理解任务、字段、页面关系及已有流程，不把参考稿布局或上一轮自评当作业务正确性的证明。
2. 只能使用指定库中已有组件实例、真实变体、变量及样式；保留组件关联。允许用 Auto Layout 组合页面、修改组件开放的内容和属性；禁止新增主组件、Detach UI 实例、自绘替代控件或修改组件库。库内资产不可调用或能力不足时指出具体缺口，继续完成不受影响部分，不用自建组件绕过约束。
3. WAP 与组件库全程只读。仅在目标位置本轮专用 Section 内写入；若目标与只读来源范围重叠或无法区分，先解决范围歧义。保留其他业务、既有定稿及共享组件。
4. 需求中已有的数字、默认值、依赖、校验与业务结果准确沿用；不从技能例稿继承业务规则，不把建议或缺失信息写成已确认事实。
5. 交付为真实可编辑的 Figma Design 图层。无写入能力时交付已有材料支持的草稿并明确限制，不以 HTML、截图或文字方案冒充已写入 Figma。`;
  }
  function stageOne() {
    return `使用 web-prototype-design，完成第一阶段：根据 PRD 和 WAP 原型，在指定目标位置制作可评审、可编辑的 Web UX 原型。

${sources()}

【交付目标】
最终成果是“每个关键状态的完整 UX 画面在左、对应 Interaction 说明板在右”的设计交付画布。第一阶段完成 UX 页面和关键状态，预留右侧说明位置；第二阶段再审查并编写交互说明。目标端、页面尺寸及 UI 语言优先依据 PRD 和目标产品现有设计；WAP 作为业务依据，目标端不明确且影响页面结构时先确认，不擅自改成另一平台。

${constraints()}

【执行要求】
1. 先阅读 PRD、WAP 对应节点及相关状态，确认使用者、入口、主任务、完成标志、数据对象和本轮边界。区分已确认规则、设计建议与必要待确认项，只追问会改变主要任务或业务结果的缺项。
2. 读取组件库的实际实例来源、属性、变体名、变量和样式，并参考目标文件的页面外壳、字号、间距、表格、表单与反馈层约定；建立本任务需要的组件映射，核实能复用后再落图。
3. 在目标中创建名称明确的本轮专用 Section，按任务分行、状态从左到右组织完整画面；已有明确指定的本轮 Section 则在其中继续。编号和命名沿用目标文件；缺少约定时使用“流程编号＋状态编号＋业务名称”。每张 UX 右侧为对应 Interaction 留出可用空间，但不提前填入未经审查的完整说明。
4. 根据本次规则覆盖真正影响任务的默认状态、创建或编辑、字段联动、禁用或条件展开、校验、结果与恢复状态。核对每个关键操作的前提、触发、反馈与结果；取消或放弃修改时保留正确的编辑上下文。普通组件状态由现有实例或变体表达，数据及字段文案在各状态间保持一致。
5. 通过状态画面及必要说明表达关键操作前后关系，不创建或维护 Figma Prototype 连线、演示起点、点击热区或演示变量。不为普通控件每种视觉变化额外复制整页，不搭建庞大的业务状态组件集。
6. 检查实例来源、变量绑定、Auto Layout、长内容、裁切、遮挡及真实合成画面。核对弹层与背景的关系，截图检查所有新增关键状态并修复已观察到的问题。按任务范围检查滚动、固定区与必要的窄尺寸，不将整页简单缩放当作适配。

【完成后交付】
返回本轮成果 Section 的精确 Figma 节点链接、页面/状态清单、关键设计决定、组件缺口和必要未决项，并说明实际完成的验证层级。该 Section 链接将用于第二阶段定位；不把本轮自评当作后续独立审查的依据。`;
  }
  function stageTwo() {
    const target = value("result")
      ? `当前第一阶段成果 Section：${source("result", "")}。只审查并处理该 Section；如它不在上方授权目标范围内，先确认，不扩大写入范围。`
      : "在上方目标位置定位第一阶段本轮新建或明确指定的成果 Section，核对功能、版本和状态；存在多个候选时只确认精确成果链接，不凭位置或节点名称猜测，也不改动其他 Section。";
    const repair = inputs.repair.checked
      ? `【本轮原型修正授权】
在保留审查发现后，可以同步修正已证实且依据明确的 PRD 偏差或流程矛盾，但仅限本轮目标 Section 的本地页面/实例，并且必须使用现成组件库已有能力。需要业务决策、依据冲突或库内无解的问题只记录，不自行定规则。修正后重读并复查关联状态，再更新说明及问题状态；只有取得修正证据才关闭问题。`
      : `【本轮写入边界】
原型保持只读，仅允许新增或更新本轮 Interaction 说明板、必要文档容器与 Review Notes。发现原型问题时给出最小修正建议，不自动修改 UX；无冲突部分继续完成说明，有冲突的部分区分 PRD 预期与原型现状，不将其伪装为已定稿。`;
    return `使用 web-interaction-spec，完成第二阶段：先独立对抗性审查第一阶段原型，再为当前版本逐状态编写交互说明，形成 UX 与 Interaction 成对排列的完整设计交付。

${sources()}

【本轮成果定位】
${target}
优先在独立会话完成审查；即使已有上一轮上下文，也从 PRD 独立建立验收依据，不采信生成者自评为验证结论。

${constraints()}

【先审查需求与流程】
1. 从 PRD 和用户定稿提取本次范围的验收条件，保留可定位的章节或原文依据。双向核对：每条明确要求能否在原型找到表达，每项改变业务结果的设计是否有依据。
2. 根据当前功能尝试未满足前提操作、先填下游再切换上游、空值或已有边界、校验后修正、保存、取消、关闭、失败恢复及返回路径，查找需求遗漏、互相矛盾或无法完成的任务。检查角度不等于必须新增的产品规则。
3. 复核只用现成组件的约束，基于可读取的实例来源和变体判定，不能仅凭外观认定合规。本轮通过页面与关键状态评审业务逻辑，缺少 Prototype 连线不构成缺陷；静态图无法证明的运行行为列为待验证，不创建或维护交互连线。
4. 按影响排序汇总问题。每项包含编号、优先级、PRD或逻辑依据、具体画面/节点、前提及触发步骤、预期与观察到的现状、用户或业务影响、最小修正建议。相同根因合并，分别列出受影响状态。
5. 区分已证实问题、待验证/待确认事项与设计建议。PRD 未展开不自动成为缺陷；无法读取的状态或静态图不能证明的行为不判为已证实问题。无需凑问题数量；没有问题时说明“本次范围内未发现可证实问题”及验证限制。

${repair}

【再编写与排布交互说明】
1. 为本轮每个具有行为差异的页面/关键状态编写对应说明，先核对直接入口、页面版本和状态配对。沿用同版本样例的语言、尺寸、字体和层级；${language()}
2. 默认结构为 Entry → Function & Interaction。Entry 写进入当前状态的直接触发；正文按画面区域及真实控件名称组织，准确说明有依据的字段规则、条件联动、校验、主操作、保存结果、取消与恢复。通用规则集中放概览，局部状态只写变化及必要前提，不扩写 PRD 未规定的实现细节。
3. 在各张完整 UX 画面右侧分别放置标题为 Interaction 的可编辑说明板，与对应 UX 顶部对齐。保留按任务分行、状态从左到右的阅读顺序；说明板加高时避让下方内容，不压缩字号或覆盖相邻画面。优先使用阶段一预留空间；空间不足时只调整本轮 Section 内的间距，不缩放 UI、不移动其他业务资产。
4. 在本轮 Section 内的 Review Notes 汇总审查结论、仍存在的已证实问题及影响交付的待验证项，分类呈现并引用问题编号。真实冲突在相关说明中分别写明 PRD 预期与当前设计，不把错误写成正式规则，不靠补说明声称原型已修复。
5. 逐板核对文图对应、实际标签、入口、字段依赖及结果是否一致，检查文字可编辑、自然换行、字体缺失、裁切、重叠和 Section 边界。重新读取修订状态并截图检查全部新建或更新的说明板。

【最终交付】
返回成果 Section 与 Review Notes 的实际节点链接、UX/说明板配对清单、按影响排序的问题报告、修正与未决事项，并报告图层结构、截图及静态状态关系的实际核对范围。存在阻断问题时明确受影响范围尚未定稿，不宣称已经达到全部 PRD 要求或通过运行产品测试。`;
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
    buttons.one.disabled = ready !== 4;
    buttons.two.disabled = ready !== 4 || Boolean(error("result"));
    for (const key of [...required, "result"]) showError(key);
    status.textContent = "";
  }

  for (const [key, input] of Object.entries(inputs)) {
    input.addEventListener("input", render);
    input.addEventListener("change", render);
    if ([...required, "result"].includes(key)) input.addEventListener("blur", () => { touched.add(key); showError(key); });
  }
  root.querySelector("form").addEventListener("submit", event => event.preventDefault());
  for (const [stage, button] of Object.entries(buttons)) {
    button.addEventListener("click", async () => {
      // Re-check current values; an optional result link only affects stage two.
      if (required.some(key => error(key)) || (stage === "two" && error("result"))) return;
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
