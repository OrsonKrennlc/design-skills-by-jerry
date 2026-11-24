---
title: 安装技能
---

# 安装技能

安装技能只是把本仓库的 UX 设计规范交给 Agent。装好之后，如果还需要让 Agent 直接读取或修改 Figma 画布，请继续完成 [Figma 连接教程](figma.md)。第一次使用 Agent 可以先看 [Agent 使用入门](agent_intro.md)。

具备读写文件权限的桌面客户端可以直接让 Agent 自动安装；网页端或需要手动管理的客户端，按第二节的速查表导入即可。

## 1. 首选方式：让 Agent 自动安装

如果当前使用的客户端支持读取仓库并写入本地技能目录，新建对话并复制下面这段提示词，按界面弹窗授予下载和写入权限：

```text
阅读这个仓库的说明，帮我将 skills/ 下的全部技能安装到当前使用的 Agent 中：
https://github.com/OrsonKrennlc/design-skills-by-jerry
请根据当前环境选择正确的安装方式，保留完整技能文件夹和参考资料。
完成后列出已安装的技能和安装位置；需要我完成的步骤，请给出具体操作。
```

它会自动装入三个技能：

- `tvos-interaction-spec`：电视页面交互说明。
- `web-prototype-design`：Web / 后台原型设计。
- `web-interaction-spec`：Web / 后台交互说明与原型审查。

装好后若技能列表没有立刻刷新，新建对话或重启客户端即可。普通网页聊天通常无法写入本机目录，需要手动处理，具体见下文 ChatGPT 小节。

## 2. 手动安装速查与安装包说明

以下步骤核对于 2026-11-23。各技能都可以单独安装和更新，下面以 `web-interaction-spec` 为例，安装其他技能时换成对应名称即可。

### 各平台安装方式速览

| 平台 | 推荐安装包 | 安装入口 / 放置位置 | 呼出方式 |
| --- | --- | --- | --- |
| ChatGPT（本地 Codex） | 标准 ZIP 解压文件夹 | 项目 `.agents/skills/` 或全局 `~/.agents/skills/` | `$技能名` 或 `@技能名` |
| ChatGPT（网页 / 桌面常规对话） | 解压后上传文件 | 当前对话附件（仅单次对话有效） | 对话中指定 |
| Claude（网页 / Desktop） | 标准 ZIP（不解压） | **Customize → Skills → Upload a skill** | 对话中直接点名 |
| Claude Code | 标准 ZIP 解压文件夹 | 项目 `.claude/skills/` 或全局 `~/.claude/skills/` | `/技能名` 或自然语言 |
| Antigravity | 标准 ZIP 解压文件夹 | 项目 `.agents/skills/` 或全局 `~/.gemini/config/skills/` | 对话中直接点名 |
| WorkBuddy | 标准 ZIP 或 Flat ZIP | 左侧 **专家·技能·连接器 → 技能 → 添加技能** | 对话中直接点名 |
| TRAE / TraeWork | 解压文件夹或 Flat ZIP | `.trae/skills/` 或 **设置 → 技能与命令** 导入 | 对话中直接点名 |

### 两种压缩包怎么选

- **标准包**（如 [web-interaction-spec.zip](../dist/web-interaction-spec.zip)）：解压后外层自带同名文件夹，里面包含 `SKILL.md`、`agents/openai.yaml`、`references/` 和 `LICENSE`。需要把整个文件夹放进项目目录，或在 Claude 网页端上传时，选标准包。
- **Flat 兼容包**（如 [flat/web-interaction-spec.zip](../dist/flat/web-interaction-spec.zip)）：压缩包根层直接是 `SKILL.md`。如果客户端导入器提示“找不到 SKILL.md”，换用这个包。

无论选哪种包，都必须保留里面的 `references/` 参考资料文件夹，否则 Agent 会缺少交互说明的写作规范和样例。

## 3. 分平台安装步骤

### ChatGPT

#### 桌面端的本地 Codex 环境

适用于 ChatGPT 桌面端的本地 Codex / 工作环境，以及独立 Codex 客户端（见[官方技能说明](https://learn.chatgpt.com/docs/build-skills)）。

1. 下载标准 ZIP 并解压，得到完整的 `web-interaction-spec` 文件夹。
2. 打开你的本地项目文件夹，把该文件夹放进 `.agents/skills/`（完整路径为 `.agents/skills/web-interaction-spec/SKILL.md`）。如果希望所有项目共用，改放到用户目录 `~/.agents/skills/`（Windows 为 `%USERPROFILE%\.agents\skills\`），项目与全局二选一，避免重复。
3. macOS 访达默认隐藏以 `.` 开头的文件夹，在项目文件夹里按 `Command + Shift + .` 可以显示隐藏目录；若没有 `.agents/skills/`，新建即可。
4. 在本地 Codex 打开该文件夹并新建对话，输入 `$web-interaction-spec`（或通过技能选择器 / `@` 选中），让它读取 `SKILL.md` 和 `references/` 确认可用。

习惯用终端的用户也可以在项目根目录直接运行（把路径换成实际解压位置）：

```bash
mkdir -p .agents/skills
cp -R /实际解压位置/web-interaction-spec .agents/skills/
```

#### ChatGPT 常规对话（桌面客户端 / 网页端）

常规对话不会读取电脑本地的 Codex 目录，上传 ZIP 本身也不会完成安装（见[官方分发说明](https://developers.openai.com/plugins/build/plugins)与[网页和本地 MCP 的区别](https://learn.chatgpt.com/docs/extend/mcp)）。

- 如果希望以后每次对话都能直接调用技能，建议在桌面客户端切换到本地环境按上一节安装。
- 如果只是在当前对话临时试用，可以解压安装包后，把 `SKILL.md` 和用到的 `references/*.md` 作为附件发给它，让它按附件规则工作。这类附件只对当前对话有效。

如需在 ChatGPT 客户端连接原生 Figma 插件，请直接看 [ChatGPT 客户端 + 原生 Figma 插件教程](chatgpt_figma.md)；本地 `npx` 启动的 Figwright 命令不能填进网页插件的 URL 输入框。

### Claude

#### Claude 网页端 / Desktop

1. 下载标准 ZIP，不需要解压。
2. 在设置中开启 **Code execution and file creation**（组织账号需由管理员开启 Skills 权限）。
3. 打开 **Customize → Skills → + → Create skill → Upload a skill**，上传 ZIP 并确认启用。
4. 新建对话，写“使用 web-interaction-spec”，附上 PRD 和设计稿材料。

需要装全部三个技能时，分别上传三个标准 ZIP。个人上传的技能只对当前账号生效，不会自动同步给团队成员（见 [Claude 官方教程](https://support.claude.com/en/articles/12512180-use-skills-in-claude)）。

#### Claude Code

把解压后的完整技能文件夹放进项目目录 `.claude/skills/` 或用户目录 `~/.claude/skills/`，新建会话后即可用 `/web-interaction-spec` 或自然语言调用（见 [Claude Code 技能文档](https://code.claude.com/docs/en/skills)）。Figma 连接见 [连接教程](figma.md)。

### Antigravity

1. 下载标准 ZIP 并解压完整文件夹。
2. 用 Antigravity 打开你的工作文件夹，把技能放入 `.agents/skills/web-interaction-spec/`。
3. 新建对话，说“使用 web-interaction-spec”，让它读取 `SKILL.md` 及引用的参考资料，确认能正常发现。

当前官方目录为项目 `.agents/skills/` 与全局 `~/.gemini/config/skills/`（旧 `.agent/skills/` 仍兼容），不要在多个目录里重复放置同名技能（见 [Antigravity 官方技能文档](https://antigravity.google/docs/skills)）。需要读写 Figma 时，按[连接教程](figma.md#方案二figwright推荐社区方案)配置 Figwright。

### WorkBuddy

1. 下载标准 ZIP（若导入器要求根层直接含 `SKILL.md`，改用 `dist/flat/` 中的同名包）。
2. 打开左侧 **专家·技能·连接器 → 技能 → 添加技能**，选择导入本地技能包并启用。
3. 装好后确认参考资料目录也已一并导入，不要只保留单个主文件。
4. 新建本地任务，直接说“使用 web-interaction-spec”即可调用。

这是在个人客户端导入技能，不需要走 WorkBuddy 开放平台的发布审核流程（见 [WorkBuddy 用户端教程](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)）。完整配置 Figma 连接请直接看 [WorkBuddy + Figwright MCP 专项教程](workbuddy_figwright.md)。

### TRAE

**方式 A：复制完整目录（推荐，能完整保留 `references/`）**

1. 下载标准 ZIP 并解压完整文件夹。
2. 用 TRAE 打开工作文件夹，把技能放入 `.trae/skills/web-interaction-spec/`（中国版全局目录在 macOS / Linux 为 `~/.trae-cn/skills/`，Windows 为 `%USERPROFILE%\.trae-cn\skills\`，其他版本以自身设置为准，见 [TRAE 官方技能文档](https://docs.trae.cn/ide_skills)）。
3. 在 **设置 → 技能与命令** 中确认该技能已识别。

**方式 B：通过界面导入**

在 **设置 → 技能与命令 → 创建 → 项目 / 全局 → 导入本地技能** 中选择 ZIP。导入后请检查目标目录里是否包含 `references/`；如果当前版本只提取了主文件，手动把 `references/` 补齐，或改用方式 A。TraeWork 独立上传入口要求包根层直接含 `SKILL.md` 时，使用 [flat 兼容包](../dist/flat/web-interaction-spec.zip)（见 [TraeWork 官方说明](https://docs.trae.cn/work_skills)）。

TRAE 也可按设置启用 `.agents/skills/`，初次使用按 `.trae/skills/` 即可。Figma 连接见[连接教程](figma.md#方案二figwright推荐社区方案)。

## 4. 安装后检查、更新与卸载

### 一键检查安装结果

装好后可以在新对话里发送下面这段话，让 Agent 核对技能与 Figma 连接状态，不会修改任何设计稿：

```text
请检查本仓库的 tvos-interaction-spec、web-prototype-design 和 web-interaction-spec 是否已安装，
逐项读取 SKILL.md 及其引用的参考资料，说明各自适用的任务和交付内容。
列出检查通过、未安装或仍需操作的项目，并说明现在能否读取/写回 Figma。
此轮只检查能力，不修改设计稿。
```

### 更新与卸载

- **更新技能**：仓库发布新版本（如 `v1.0.2`）后，可以让 Agent 读取仓库最新说明自动更新；手动更新则重新下载新版 ZIP，通过界面安装的走更新/替换入口（没有该入口就先卸载再导入），通过文件夹安装的先把旧目录备份到技能目录之外，再整体替换为新版，以免残留旧参考文件。项目自定义的规则请单独备份，避免更新时被覆盖。
- **卸载技能**：从客户端已安装列表移除，或删除对应的技能文件夹。之前配置过的 Figma MCP 或连接器需要到平台的连接器设置里另外停用或移除。
