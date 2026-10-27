---
title: 首页与下载
---

# 设计技能与使用教程

Design Skills by Jerry 提供三个可独立安装的 Agent 技能，用于电视交互说明、Web 原型设计和 Web 交互文档。主要面向 TV 端（OS 10、OS Go!、majica）与 Web 端（SSP、WI）的设计工作。

## 从这里开始

1. 第一次使用 Agent，先读 [Agent 使用入门](docs/agent_intro.md)，了解它能做什么，以及怎样授予权限。
2. 根据当前任务选择一个技能，按[平台安装教程](docs/platforms.md)安装。
3. 需要读写设计文件时，按[连接 Figma](docs/figma.md)完成工具连接。
4. 参考[使用方法与提示词](docs/usage.md)，提供当前需求、页面链接和交付范围。

## 选择技能

| 技能 | 适用任务 | 安装包 |
| --- | --- | --- |
| [tvos-interaction-spec](https://github.com/OrsonKrennlc/design-skills-by-jerry/blob/main/skills/tvos-interaction-spec/SKILL.md) | 电视页面交互说明、焦点与遥控器六键规则 | [下载 ZIP](dist/tvos-interaction-spec.zip) |
| [web-prototype-design](https://github.com/OrsonKrennlc/design-skills-by-jerry/blob/main/skills/web-prototype-design/SKILL.md) | Web / 后台页面、关键状态与按需演示的交互原型 | [下载 ZIP](dist/web-prototype-design.zip) |
| [web-interaction-spec](https://github.com/OrsonKrennlc/design-skills-by-jerry/blob/main/skills/web-interaction-spec/SKILL.md) | 依据 PRD 与当前设计稿整理 Web / 后台交互说明 | [下载 ZIP](dist/web-interaction-spec.zip) |

ZIP 内含完整技能文件夹和参考资料。若导入器要求 ZIP 根层直接包含 `SKILL.md`，请按[安装教程中的说明](docs/platforms.md#先检查下载内容)选择兼容包。

当前版本为 v0.1.0。你可以查看[发布说明](docs/releases/0.1.0.md)，或到 [GitHub Release](https://github.com/OrsonKrennlc/design-skills-by-jerry/releases/tag/v0.1.0)下载固定版本的安装包。

## 借助 Agent 安装

已经使用支持安装 Skill 的 Agent 时，可以把这段话发给它：

```text
阅读仓库说明，帮我选择并安装本次任务需要的技能：
https://github.com/OrsonKrennlc/design-skills-by-jerry
```

安装 Skill 和连接 Figma 是两个步骤。需要工具连接时，再授予对应权限。

## 开始一个任务

```text
使用 web-interaction-spec。
根据附件 PRD 和当前 Figma 页面，为“新建记录”整理交互说明。
目标：[粘贴目标节点链接]
定稿样例：[粘贴说明板链接]，只读参考。
只在目标页面旁新建 Interaction 说明板，不修改原 UI。
未确定的业务规则请集中列出，完成后给我实际交付链接。
```

更多任务示例与验收方法见[使用教程](docs/usage.md)。维护者可以查看[维护与发布](CONTRIBUTING.md)。技能指令与仓库工具按 [Apache-2.0](https://github.com/OrsonKrennlc/design-skills-by-jerry/blob/main/LICENSE) 共享。
