---
title: 安装技能
---

# 安装技能

可以让 Agent 一次装好全部技能。把仓库链接发给它，它会先读安装说明，再选择当前应用支持的安装方式。

## 让 Agent 帮你安装

第一次使用 Agent，可以先看 [Agent 使用入门](agent_intro.md)，选好工具并安装后再继续。

确认 Agent 能访问仓库、安装技能，然后新建对话，复制这段提示词：

```text
阅读这个仓库的说明，帮我将 skills/ 下的全部技能安装到当前使用的 Agent 中：
https://github.com/OrsonKrennlc/design-skills-by-jerry
请根据当前环境选择正确的安装方式，保留完整技能文件夹和参考资料。
完成后列出已安装的技能和安装位置；需要我完成的步骤，请给出具体操作。
```

按提示授予下载文件、写入技能目录的权限。它会安装这三个技能：

- `tvos-interaction-spec`：电视页面交互说明。
- `web-prototype-design`：Web / 后台原型设计。
- `web-interaction-spec`：Web / 后台交互说明。

装好后，让 Agent 列出这三个技能，并打开各自的 `SKILL.md` 和参考资料。如果客户端提示刷新，就新建对话或重启。以后做任务时直接指定技能，不用重装。

要读写设计文件，还需按[Figma 连接教程](figma.md)连接工具。

如果应用只支持手动上传，或 Agent 没有安装权限，可以让它准备好安装包，告诉你接下来点哪里。普通网页聊天无法写入本机技能目录，具体用法见 ChatGPT 小节。

## 备用：手动安装

想自己管理技能文件，或 Agent 无法安装时，可以手动操作。以下步骤核对于 2026-10-26，以 `web-interaction-spec` 为例，安装其他技能时换成对应名称。各技能都能单独安装和更新。

### 先检查下载内容

标准包：[web-interaction-spec.zip](../dist/web-interaction-spec.zip)。解压后应看到：

```text
web-interaction-spec/
├── SKILL.md
├── agents/openai.yaml
├── references/
└── LICENSE
```

复制文件夹安装时用标准包。上传器要求根层直接放 `SKILL.md` 时，用 [flat 兼容包](../dist/flat/web-interaction-spec.zip)。两种包的内容相同，区别在最外层目录，选一种安装即可。请保留 `references/`。

### ChatGPT

#### 桌面端的本地 Codex 环境

这部分适用于 ChatGPT 桌面端的本地 Codex / 本地工作环境，以及独立 Codex 客户端。本地可以用文件夹安装独立技能；网页端通过插件跨设备分发。本仓库提供的是独立技能，没有插件清单。[官方技能说明](https://learn.chatgpt.com/docs/build-skills)

1. 下载一个标准 ZIP，解压出同名完整文件夹。
2. 打开一个本地工作文件夹，将该 skill 放到工作文件夹的 `.agents/skills/` 中：`.agents/skills/web-interaction-spec/SKILL.md`。隐藏目录不存在时新建。
3. 若希望跨项目可用，改为放到用户目录 `~/.agents/skills/web-interaction-spec/`；Windows 对应 `%USERPROFILE%\.agents\skills\web-interaction-spec\`。项目和全局二选一，避免重复。
4. 在本地 Codex 打开该工作文件夹，新建对话。使用 `$web-interaction-spec`，或在技能选择器中选择它；ChatGPT 的技能入口支持时使用 `@`。
5. 让 AI 说明技能用途，并打开写作参考，确认能读到 `references/`。技能没出现时，重启客户端或新建对话。

macOS / Linux 用户可以在工作文件夹中运行以下命令。请替换实际解压位置；目标目录已有同名技能时，先看本页末尾的更新方法：

```bash
mkdir -p .agents/skills
cp -R /实际解压位置/web-interaction-spec .agents/skills/
```

Codex 能访问本地文件并安装技能时，直接使用页首的提示词即可。

#### ChatGPT 普通网页聊天 / 云端聊天

网页端不会读取电脑上的本地 Codex 配置。网页 Chat / Work 通过插件分发技能，上传 ZIP 文件本身不等于安装技能。[官方分发说明](https://developers.openai.com/plugins/build/plugins)、[网页与本地 MCP 的区别](https://learn.chatgpt.com/docs/extend/mcp)

在这类环境中，可以选择以下用法：

- 希望技能能在以后的任务中继续被发现和调用，请按上一节在桌面本地环境安装。
- 只在当前网页对话试用，可以解压安装包，上传 `SKILL.md` 和所需的 `references/*.md`，要求 Agent 按文件工作。这些文件只作为当前对话的参考，无法保证自动加载全部资料，也不保证后续对话仍能使用。

账号有官方 Figma 插件时，可以另行安装、授权，并确认当前工具是否支持写入。本地 Figwright 命令不能填进网页插件的 URL 输入框。

### Claude

#### Claude 网页端 / Desktop 的 Skills

1. 下载一个标准 ZIP，不需要解压。
2. 在设置中启用 **Code execution and file creation**；组织账号还需管理员允许 Skills。
3. 打开 **Customize → Skills → + → Create skill → Upload a skill**。
4. 上传该 ZIP，确认列表出现相应技能并启用。
5. 新建对话，写“使用 web-interaction-spec”，附上需求和当前设计材料。

手动导入全部技能时，分别上传三个标准 ZIP。个人技能需要在各自账号中安装或启用，不会自动共享给同事。[Claude 官方教程](https://support.claude.com/en/articles/12512180-use-skills-in-claude)

#### Claude Code

将一个完整技能文件夹放入项目的 `.claude/skills/`，或用户目录的 `~/.claude/skills/`，新建会话后可用 `/web-interaction-spec` 或自然语言调用。[Claude Code 技能文档](https://code.claude.com/docs/en/skills)

Figma connector、Claude Code 的官方 Figma 插件和 Figwright 是另外的连接步骤，见 [连接教程](figma.md#claude-官方连接)。

### Antigravity

1. 下载一个标准 ZIP，解压完整技能文件夹。
2. 用 Antigravity 打开你的工作文件夹。
3. 将技能放到 `.agents/skills/web-interaction-spec/`。
4. 新建对话，说明“使用 web-interaction-spec”，提供当前任务。
5. 让 AI 读取 `SKILL.md` 及其引用的写作方法，检查发现是否成功。

当前官方目录是项目 `.agents/skills/`、全局 `~/.gemini/config/skills/`。旧 `.agent/skills/` 仍兼容；使用者应以自己版本对应文档为准，不要在多处重复放同名技能。[Antigravity 官方技能文档](https://antigravity.google/docs/skills)

需要 Figma 读写时，按 [Figwright 通用连接](figma.md#figwright-通用连接) 配置本地 MCP。Figma 支持目录中的 Gemini CLI 不能直接视为 Antigravity 已获相同支持。

### WorkBuddy

1. 下载一个标准 ZIP。
2. 打开左侧 **专家·技能·连接器 → 技能**。
3. 点击 **添加技能**，选择导入本地技能包，导入该 ZIP。
4. 按当前版本的检查提示完成安装，在已安装列表启用该技能。
5. 新建本地任务，直接说“使用 web-interaction-spec”，并提供需求和交付位置。

这里是在自己的客户端导入技能，无需到 WorkBuddy 开放平台发布，也不用填写市场发布要求的作者和双语介绍。[WorkBuddy 用户端教程](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)

导入器要求 ZIP 根层有 `SKILL.md` 时，换用 `dist/flat/` 中的同名包。装好后要检查参考资料，确认它们也已导入，不能只看主文件。Figma 使用自定义本地 MCP，见 [各平台添加 Figwright](figma.md#各平台添加-figwright)。

### TRAE

#### 复制完整技能目录

1. 下载一个标准 ZIP，解压完整文件夹。
2. 用 TRAE 打开工作文件夹。
3. 将 skill 放到 `.trae/skills/web-interaction-spec/`。
4. 在 **设置 → 技能与命令** 确认该项目技能可见。
5. 新建对话，指定该技能或直接说“使用 web-interaction-spec”。

这条路径能明确保留全部参考文件。中国版全局目录在 macOS / Linux 为 `~/.trae-cn/skills/`，Windows 为 `%USERPROFILE%\.trae-cn\skills\`；其他版本以自身设置为准。不要把中国版目录当成所有版本的固定目录。[TRAE 官方技能文档](https://docs.trae.cn/ide_skills)

#### 使用界面导入

在 **设置 → 技能与命令 → 创建 → 项目 / 全局 → 导入本地技能** 中选择一个 ZIP。导入后检查目标目录的 `references/`；若当前版本只提取了名称、描述和主指令，手动补齐同包参考资料，或改用上面的完整目录方式。

TraeWork 的独立上传入口要求包根层直接含 `SKILL.md` 时，使用 [flat 兼容包](../dist/flat/web-interaction-spec.zip)。[TraeWork 官方说明](https://docs.trae.cn/work_skills)

TRAE 也可按官方设置启用 `.agents/skills/`，但初次使用按上述 `.trae/skills/` 路径即可。Figma MCP 运行环境请选择本地，见 [连接教程](figma.md#各平台添加-figwright)。

## 安装后检查、更新与卸载

让 Agent 检查全部技能是否可用，无需立刻改 Figma：

```text
请检查本仓库的 tvos-interaction-spec、web-prototype-design 和 web-interaction-spec 是否已安装，
逐项读取 SKILL.md 及其引用的参考资料，说明各自适用的任务和交付内容。
列出检查通过、未安装或仍需操作的项目，并说明现在能否读取/写回 Figma。
此轮只检查能力，不修改设计稿。
```

更新时，可以让 Agent 读取仓库最新说明，更新已安装的技能，并报告结果。项目专用规则请单独保存，以免被更新覆盖。

手动更新请重新下载同名包。通过界面安装的技能，使用更新或替换入口；没有该入口时，卸载后重新导入。通过目录安装的，先把旧文件夹备份到技能目录之外，再整体换成新版，以免残留旧参考文件。ZIP 由源文件生成，不直接编辑。

卸载时，从已安装列表移除技能，或删除对应的技能文件夹。Figma 连接需要另外处理：到平台的 MCP / 连接器设置中停用或移除。
