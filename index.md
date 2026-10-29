---
title: 首页与下载
---

# 设计技能与使用教程

这里有三个设计工作用的 Agent 技能，可以分别安装。它们用于写电视交互说明、制作 Web 原型和整理 Web 交互文档，主要用在 TV 端（OS 10、OS Go!、majica）与 Web 端（SSP、WI）。

## 让 Agent 帮你安装

第一次使用 Agent，可以先看 [Agent 使用入门](docs/agent_intro.md)，选好工具并安装后再继续。

在支持安装技能的 Agent 中新建对话，复制这段话，让它一次装好全部技能：

```text
阅读这个仓库的说明，帮我将 skills/ 下的全部技能安装到当前使用的 Agent 中：
https://github.com/OrsonKrennlc/design-skills-by-jerry
请根据当前环境选择正确的安装方式，保留完整技能文件夹和参考资料。
完成后列出已安装的技能和安装位置；需要我完成的步骤，请给出具体操作。
```

按提示授权后，确认安装结果。以后做任务时直接说要用哪个技能。详细步骤见[安装教程](docs/platforms.md)，里面也有手动安装方法，适合无法直接安装的应用。

## 从这里开始

1. 第一次使用 Agent，先读 [Agent 使用入门](docs/agent_intro.md)，了解它能做什么，以及怎样授予权限。
2. 用上面的提示词，让 Agent 一次安装全部技能。
3. 需要读写设计文件时，按[连接 Figma](docs/figma.md)完成工具连接。
4. 参考[使用方法与提示词](docs/usage.md)，提供当前需求、页面链接和交付范围。

## 技能列表与手动下载

手动安装或需要保留安装包时，可以下载下面的 ZIP。三个技能各自独立。

| 技能 | 适用任务 | 安装包 |
| --- | --- | --- |
| [tvos-interaction-spec](https://github.com/OrsonKrennlc/design-skills-by-jerry/blob/main/skills/tvos-interaction-spec/SKILL.md) | 电视页面交互说明、焦点与遥控器六键规则 | [下载 ZIP](dist/tvos-interaction-spec.zip) |
| [web-prototype-design](https://github.com/OrsonKrennlc/design-skills-by-jerry/blob/main/skills/web-prototype-design/SKILL.md) | 可编辑的 Web / 后台页面、关键状态与任务流程 | [下载 ZIP](dist/web-prototype-design.zip) |
| [web-interaction-spec](https://github.com/OrsonKrennlc/design-skills-by-jerry/blob/main/skills/web-interaction-spec/SKILL.md) | 依据 PRD 与当前设计稿整理 Web / 后台交互说明 | [下载 ZIP](dist/web-interaction-spec.zip) |

ZIP 中有技能文件夹和参考资料。如果导入器要求根层直接放 `SKILL.md`，按[安装教程中的说明](docs/platforms.md#先检查下载内容)下载兼容包。

当前版本是 v0.1.0，[发布说明](docs/releases/0.1.0.md)中列出了内容。[GitHub Release](https://github.com/OrsonKrennlc/design-skills-by-jerry/releases/tag/v0.1.0)保留了这个版本的安装包。

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
