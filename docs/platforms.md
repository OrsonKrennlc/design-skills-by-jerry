---
title: 安装技能
---

# 安装技能

推荐让 Agent 一次性安装本仓库的全部技能。把仓库链接和安装要求发给它，由它读取说明、选择适合当前环境的安装方式，省去逐个下载、解压和复制的重复操作。

## 推荐：让 Agent 一次安装全部技能

在能够访问仓库并安装技能的 Agent 中，新建对话，复制下面的提示词：

```text
阅读这个仓库的说明，帮我将 skills/ 下的全部技能安装到当前使用的 Agent 中：
https://github.com/OrsonKrennlc/design-skills-by-jerry
请根据当前环境选择正确的安装方式，保留完整技能文件夹和参考资料。
完成后列出已安装的技能和安装位置；需要我完成的步骤，请给出具体操作。
```

按提示授予下载和写入技能目录所需的权限，让 Agent 完成安装。当前仓库包含三个技能：

- `tvos-interaction-spec`：电视页面交互说明。
- `web-prototype-design`：Web / 后台原型设计。
- `web-interaction-spec`：Web / 后台交互说明。

安装完成后，确认它列出了这三个技能，并能读取各自的 `SKILL.md` 和引用的参考资料。客户端需要刷新时，按提示新建对话或重启。之后用到哪个技能，就在任务中指定哪个，不需要重新安装。

安装技能和连接 Figma 是两个步骤。需要读写设计文件时，再按[Figma 连接教程](figma.md)配置工具。

如果当前应用只支持在界面上传技能包，或者 Agent 没有相应安装权限，可以先让它准备全部安装包并说明剩余操作，再按下面的备用步骤完成导入。普通网页聊天无法直接写入本机技能目录，具体用法见 ChatGPT 小节。

## 备用：手动安装

无法由 Agent 完成安装，或希望自己管理技能文件时，再使用以下步骤。平台操作说明按 **2026-10-26** 的官方文档整理，以 `web-interaction-spec` 举例；安装另外两个时替换技能名称即可。各技能仍分别打包，支持单独安装和更新。

### 先检查下载内容

标准包：[web-interaction-spec.zip](../dist/web-interaction-spec.zip)。解压后应看到：

```text
web-interaction-spec/
├── SKILL.md
├── agents/openai.yaml
├── references/
└── LICENSE
```

文件夹复制类安装使用标准包。需要根层直接含 `SKILL.md` 的上传器，使用 [flat 兼容包](../dist/flat/web-interaction-spec.zip)。它们内容相同，只是 ZIP 顶层结构不同。不要同时安装两种包，也不要把 `references/` 丢掉。

### ChatGPT

#### 桌面端的本地 Codex 环境

适用于 ChatGPT 桌面端提供的本地 Codex / 相应本地工作环境，以及独立 Codex 客户端。官方将独立技能文件夹与插件分发区分：本地技能目录可用于独立技能，网页端跨设备分发走插件。本仓库只提供独立技能，不包含插件清单。[官方技能说明](https://learn.chatgpt.com/docs/build-skills)

1. 下载一个标准 ZIP，解压出同名完整文件夹。
2. 打开一个本地工作文件夹，将该 skill 放到工作文件夹的 `.agents/skills/` 中：`.agents/skills/web-interaction-spec/SKILL.md`。隐藏目录不存在时新建。
3. 若希望跨项目可用，改为放到用户目录 `~/.agents/skills/web-interaction-spec/`；Windows 对应 `%USERPROFILE%\.agents\skills\web-interaction-spec\`。项目和全局二选一，避免重复。
4. 在本地 Codex 打开该工作文件夹，新建对话。使用 `$web-interaction-spec`，或在技能选择器中选择它；ChatGPT 的技能入口支持时使用 `@`。
5. 请 AI 说明技能用途并读取它的写作参考，确认 `references/` 也可访问。没出现时重启客户端或新建对话。

macOS / Linux 可在你的工作文件夹内执行以下命令；把来源换成实际解压位置，目标已有同名技能时先按本文末尾的更新方法处理：

```bash
mkdir -p .agents/skills
cp -R /实际解压位置/web-interaction-spec .agents/skills/
```

有本地文件访问和安装能力的 Codex，可以直接使用本页开头的提示词安装全部技能，无需逐个下载和复制。

#### ChatGPT 普通网页聊天 / 云端聊天

网页端不会读取你电脑的本地 Codex 配置；官方将技能通过插件分发到网页 Chat / Work。不能把上传任意 ZIP 宣称为原生安装。[官方分发说明](https://developers.openai.com/plugins/build/plugins)、[网页与本地 MCP 的区别](https://learn.chatgpt.com/docs/extend/mcp)

在这类环境中，可以选择以下用法：

- **需要可持续发现的本地 skill：** 使用上一节的桌面本地环境安装。
- **只想在当前网页对话试用方法：** 解压一个包，上传其中的 `SKILL.md` 和本任务需要的 `references/*.md`，明确要求按这些文件工作。这是当前会话的文件参考，不是原生技能安装，也不能承诺自动发现、自动加载全部参考或后续对话可用。

若账号有官方 Figma 插件，可另行安装并授权；能否写入要核对当前实际工具。不要把本地 Figwright 的命令粘进网页插件 URL 输入框。

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

这是用户端的本地技能导入；不是在 WorkBuddy 开放平台发布技能，不需要填写市场发布用的作者、双语介绍等字段。[WorkBuddy 用户端教程](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)

如果当前导入器明确要求 ZIP 根层有 `SKILL.md`，换用 `dist/flat/` 中同名包。安装后检查参考资料是否完整；只显示主文件不代表引用文件已导入。Figma 使用自定义本地 MCP，见 [各平台添加 Figwright](figma.md#各平台添加-figwright)。

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

更新也可以交给 Agent：让它读取仓库最新说明，更新本仓库中已安装的技能，并报告结果。自己的项目规则应另存，避免更新时被覆盖。

手动更新时，下载新的同名包。上传类平台通过现有技能的更新/替换入口操作；没有此入口时卸载该技能再导入。目录类安装先把旧文件夹备份到技能发现目录之外，再用新目录整体替换，避免遗留被新版本删除的参考文件。不直接修改生成的 ZIP。

卸载时，上传类平台在已安装列表移除对应技能；目录类安装只移除相应技能文件夹。移除 skill 不会卸载 Figma 连接；不再使用连接时去平台 MCP / 连接器设置单独停用或移除。
