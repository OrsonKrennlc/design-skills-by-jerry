---
title: 使用方法与提示词
---

# 使用方法与提示词

先按[安装教程](platforms.md)装好技能。需要读写 Figma 时，再按[连接教程](figma.md)连接工具，并确认 Agent 能打开你提供的文件。只写正文可以直接使用附件。第一次使用 Agent，可以先读[使用入门](agent_intro.md)。

{% include prompt-generators.html %}

<details markdown="1">
<summary>单独使用技能的提示词示例</summary>

下面的示例可以单独使用。附上 Markdown 格式（`.md`）的 PRD，把 `【PRD】` 换成附件名，其余 `【…】` 换成实际链接、目标 ID 或 Section 名称。没有正式 PRD 时，可以提供现有需求。Figma 节点链接可通过 Copy link to selection 获取。

参考链接只供 Agent 阅读；要修改文件，请另行说明。需要英文说明时也请直接提出，中文对话不会自动要求翻译 UI。

## 电视交互说明

使用 `tvos-interaction-spec`。写入画布需要可写的 Figma 连接。

```text
使用 tvos-interaction-spec技能，在【Figma链接】中完成任务：
需求：为【目标ID】编写电视页面交互说明。阅读【PRD】文档和【Figma中目标页面所在Section名】中的图片，了解任务目标、页面状态和遥控器操作规则，参考我给出的【Figma中参考说明所在Section名】中的定稿说明，沿用其语言、结构和版式。然后在【Figma中新建空白目标Section名】中完成说明。
每个状态写齐 Screen Design、Entry Point、Interaction 与 Controls，Controls 按各张图的实际焦点写，覆盖遥控器六键和返回焦点。
本轮只编写交互说明，不修改原 UI；缺少的业务规则请集中列出，不自行补成既定规则。
```

只需要一行一页的大纲时：

```text
使用 tvos-interaction-spec，把我提供的电视首页规则整理为行级交互大纲。
每行概括状态序列、入口、上下映射、左右边界、OK 和 BACK。
此轮只交付可复制正文，不在 Figma 建板。
```

检查焦点和选中状态是否分清，遥控器六键及返回焦点是否符合当前画面。画面检查只能核对图上的规则，不能算电视端的操作测试。

## Web 原型设计

使用 `web-prototype-design`。先规划，确认后再通过可写的 Figma 连接制作页面。

```text
使用 web-prototype-design，先通读【完整 PRD】，结合【组件库链接】完成全局 UX 规划。
交付各模块的画面清单与预计张数、组件方案、制作顺序和待确认问题。Figma 只读，等我确认计划后再制作。
```

有需求原型时可附上链接。规划确认后再发送：

```text
使用 web-prototype-design，沿用已确认的全局规划与设计约定，在【目标位置】制作【本轮模块】的可编辑 UX。
为每个完整页面配空白 Interaction 画板，交付成果链接、页面与状态清单及待确认问题。
```

## Web 交互说明

使用 `web-interaction-spec`。如果只根据附件写正文，可以暂不连接 Figma。

```text
使用 web-interaction-spec，依据【PRD】和【当前 UX 节点链接】编写交互说明。
参考【定稿样例链接】，将说明写入【目标 Section】中对应的 Interaction 画板。原 UI 保持只读。
```

只检查页面和说明是否一致时：

```text
使用 web-interaction-spec，只读审查这些页面与已有说明是否一致。
交付差异及受影响的状态。
```

## 原型审查

建议另开对话，提供当前版本的 PRD、原型和本次要求，让 Agent 从原始材料重新检查。同一对话也可以审查，但不能拿上一轮自评作为通过依据。

```text
使用 web-interaction-spec，对当前原型做对抗性审查。
PRD：[目标版本附件或链接]
当前原型：[节点链接]
范围：[本次功能、页面和关键状态]
评审可编辑页面与关键状态，优先核对指定组件库的引用。原型和说明板只读，交付审查报告。
```

需要接着写说明时，追加：

```text
审查报告后，在【目标位置】整理 Interaction 说明。将冲突关联到报告中的问题编号，原 UI 保持只读。
```

评审时要核对问题是否有依据、是否存在误报。问题找出来以后，还需要按评审结论修改；静态画面中的状态关系也需要在运行产品中验证。

</details>
