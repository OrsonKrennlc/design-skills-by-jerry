---
title: 连接 Figma：官方方案与社区 MCP
---

# 连接 Figma：官方方案与社区 MCP

以下内容核对于 2026-11-16。先按[安装教程](platforms.md)装好技能，再选择连接方式。暂时不连接也能根据 PRD 附件写文字草稿，但 Agent 无法读取当前 Figma 节点或把结果写回画布。

## 1. 先选路线：主流 Figma MCP 对比

本仓库的 UX 技能（如生成 `Interaction` 说明板、制作可编辑页面）需要**既能读又能写** Figma 画布。目前最主流的方案如下：

| 方案 | 读写能力 | 适用计费方案 | 核心特点 |
| --- | --- | --- | --- |
| **Figma 官方远程 MCP** | 读 + 写（`use_figma`） | 写入草稿外文件需 Full seat | 官方维护，OAuth 登录免手动管 Token，但仅支持官方目录内的客户端 |
| **[Figma Console MCP](https://github.com/southleft/figma-console-mcp)**（推荐社区方案） | 读 + 写（130 个工具） | Free / Pro / Enterprise 均可用 | [Glama 2026-11 Figma MCP 榜单第一](https://glama.ai/mcp/best/figma)（3.3k+ Stars），支持建画板、改图层、截图复查与变量管理；支持本地 NPX、免 Node.js 云端写回（Cloud Mode）和只读 Remote SSE |
| **[TalkToFigma](https://github.com/grab/cursor-talk-to-figma-mcp)** | 读 + 写 | Free / Pro / Enterprise 均可用 | 开源社区常用双向方案（7.1k+ Stars），基于 Bun、独立 WebSocket 服务和 Figma 社区插件通信 |
| **[Framelink (Figma-Context-MCP)](https://github.com/glips/figma-context-mcp)** | **仅只读** | Free / Pro / Enterprise 均可用 | GitHub Stars 最高（16.2k+），专精读取布局供写代码使用，无法往画布写入说明板或原型 |

各客户端推荐搭配：

| 平台 / 环境 | 官方连接 | 社区推荐（Figma Console MCP） |
| --- | --- | --- |
| ChatGPT 本地 Codex / 独立 Codex | 有官方 Figma 插件与远程 MCP | NPX 本地模式 |
| ChatGPT 网页聊天 | 有官方 Figma 插件入口时可安装 | 普通网页端不支持本地 NPX，可先出正文草稿 |
| Claude 网页端 / Desktop | 使用 Figma connector | Desktop 可用 NPX；网页端可用 Cloud Mode（写回）或 Remote SSE（只读） |
| Claude Code | 官方 Figma 插件或远程 MCP | NPX 本地模式（一条命令添加） |
| Antigravity | 官方支持表未单列 | NPX 本地模式（写入 `mcp_config.json`） |
| WorkBuddy | 官方支持表未单列 | NPX 本地模式（自定义本地 MCP） |
| TRAE | 官方支持表未单列 | NPX 本地模式（手动添加本地 MCP） |

官方支持列表与权限可能随版本调整，安装前可核对 [Figma MCP 总览与客户端列表](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)。

## 2. 方案一：Figma 官方连接

官方连接提供三种形式，只有**官方远程 MCP / 平台官方插件**支持写回画布；官方桌面 MCP（`http://127.0.0.1:3845/mcp`）仅用于读取设计上下文，不支持写回说明板或页面。详情见[官方入门文档](https://help.figma.com/hc/en-us/articles/39216419318551-Get-started-with-the-Figma-MCP-server)。

### ChatGPT / Codex 官方连接

在提供插件入口的 ChatGPT / Codex 客户端中打开 **Plugins**，搜索 **Figma** 安装并完成账号授权（Codex 路径为 **Plugins → Figma 的 + → Install Figma → Allow access**，见 [Figma 的 Codex 教程](https://help.figma.com/hc/en-us/articles/39888629089175-Codex-and-Figma-Set-up-the-MCP-server)）。

本地 Codex CLI 也可手动添加远程服务（配置文件示例见 [figma-remote.codex.toml](../examples/mcp/figma-remote.codex.toml)）：

```bash
codex mcp add figma --url https://mcp.figma.com/mcp
```

按浏览器提示完成授权；手动添加后，还需按下方“配套官方工具技能”补齐技能。

### Claude 官方连接

- **Claude 网页 / Desktop**：在 **Customize → Connectors** 中找到 **Figma**，连接并授权，在当前对话启用（见 [Claude 连接器说明](https://support.claude.com/en/articles/13454812-use-interactive-connectors-in-claude)）。连接后需确认当前会话是否具备创建 Design 图层的工具。
- **Claude Code**：推荐安装官方插件，会同时配置 MCP 和官方工具技能（见 [Figma 的 Claude Code 教程](https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server)）：

```bash
claude plugin install figma@claude-plugins-official
```

重启 Claude Code 后运行 `/plugin`，在 Installed 中选择 Figma 并登录。无法安装插件时可手动添加：`claude mcp add --transport http figma https://mcp.figma.com/mcp`，再用 `/mcp` 认证。

### 配套官方工具技能

本仓库的技能规定“怎么设计、怎么写说明”，官方远程 MCP 的 `use_figma` 等写入工具还需要搭配官方工具技能（如 `figma-use`）才能发挥完整效果。手动配置官方 MCP 时，可从 [Figma MCP server guide 仓库](https://github.com/figma/mcp-server-guide) 获取所需技能（见[官方技能说明](https://help.figma.com/hc/en-us/articles/39166810751895-Figma-skills-for-MCP)）。

## 3. 方案二：Figma Console MCP（推荐社区方案）

[Figma Console MCP](https://github.com/southleft/figma-console-mcp) 是目前功能最完整、对设计师最友好的开源 Figma MCP，不依赖 Figma Enterprise 席位，在 Free 和 Pro 账号上也能读写画布和变量。

它提供三种连接模式，按自己的环境选一种即可：

### 模式 A：NPX 本地完整模式（推荐，130 个工具全开）

适合需要完整读写画布、截图复查和实时读取选中节点的桌面端用户。

**1. 准备环境与 Figma Token**

1. 安装 Figma 桌面端与 Node.js 18+（终端运行 `node --version` 检查）。
2. 前往 Figma 账号设置的 **Personal access tokens** 生成一个新 Token（以 `figd_` 开头，生成后立刻复制保存）。权限勾选 File content、File versions、Library content、Library assets、Comments（Read and write）、Current user 等（见[官方 Token 管理说明](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens)）。

**2. 在 AI 客户端添加 MCP**

通用 JSON 配置如下（把 `figd_YOUR_TOKEN_HERE` 换成你的 Token）：

```json
{
  "mcpServers": {
    "figma-console": {
      "command": "npx",
      "args": ["-y", "figma-console-mcp@latest"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "figd_YOUR_TOKEN_HERE",
        "ENABLE_MCP_APPS": "true"
      }
    }
  }
}
```

不同客户端的添加方式：

- **Claude Code**：在终端直接运行：
  ```bash
  claude mcp add figma-console -s user -e FIGMA_ACCESS_TOKEN=figd_YOUR_TOKEN_HERE -e ENABLE_MCP_APPS=true -- npx -y figma-console-mcp@latest
  ```
- **OpenAI Codex**：运行 `codex mcp add figma-console --env FIGMA_ACCESS_TOKEN=figd_YOUR_TOKEN_HERE --env ENABLE_MCP_APPS=true -- npx -y figma-console-mcp@latest`，并在 `~/.codex/config.toml` 中为该服务加上 `startup_timeout_sec = 60` 和 `tool_timeout_sec = 300`。
- **Antigravity**：在面板右上角 **… → MCP Servers → Manage MCP Servers → View raw config** 打开 `~/.gemini/config/mcp_config.json`，加入上述 `figma-console` 条目，并在条目内补充 `"timeoutSeconds": 300`。
- **Claude Desktop / Cursor**：分别打开 `~/Library/Application Support/Claude/claude_desktop_config.json` 或 `~/.cursor/mcp.json`（Windows 为 `%APPDATA%\Claude\claude_desktop_config.json` 与 `%USERPROFILE%\.cursor\mcp.json`）合并上述 JSON，保存后重启客户端。
- **WorkBuddy / TRAE**：在客户端的自定义本地 MCP 设置入口（WorkBuddy 为 **专家·技能·连接器 → 连接器**，TRAE 为 **设置 → MCP → 添加 → 手动添加**，运行环境选**本地**）填入上述命令、参数与环境变量。

**3. 在 Figma 桌面端导入 Desktop Bridge 插件**

1. 启动一次配置好 MCP 的 AI 客户端（首次启动会自动在本地生成插件文件）。
2. 打开 Figma 桌面端和目标设计文件，点击 **Plugins → Development → Import plugin from manifest…**。
3. 选择 `~/.figma-console-mcp/plugin/manifest.json`（macOS 选择文件弹窗里按 `Command + Shift + .` 显示隐藏目录，或按 `Command + Shift + G` 直接粘贴该路径；也可在终端运行 `npx figma-console-mcp --print-path` 查看精确路径）。
4. 在设计文件中运行 **Plugins → Development → Figma Desktop Bridge**，保持插件窗口开启，它会自动扫描 9223–9232 端口连上本地 MCP。

### 模式 B：Cloud Mode（免装 Node.js，网页端 AI 也能写回）

如果使用 Claude.ai 等网页端 AI 客户端，或者不想在电脑上折腾 Node.js，可以使用 Cloud Mode（提供 105 个工具，同样支持往画布写入）：

1. 在网页端 AI 的 MCP / 连接器设置（如 Claude.ai 的 **Settings → Connectors → Add Custom Connector**）添加端点 `https://figma-console-mcp.southleft.com/mcp`，认证方式填你的 Figma Personal Access Token（Bearer Token）。
2. 在 Figma 桌面端运行 **Figma Desktop Bridge** 插件，切换到 **Cloud Mode**。
3. 在 AI 对话里说 `Connect to my Figma plugin`，把 AI 给出的 6 位配对码填进插件完成配对即可。

### 模式 C：Remote SSE（免安装、仅只读体验）

如果只需要让 Agent 读取设计稿做原型审查或输出文字草稿，不需要写回画布：

- 在客户端自定义连接器中添加 URL：`https://figma-console-mcp.southleft.com/sse`（Claude Code 用户因 `--transport sse` 限制，需改用 `npx -y mcp-remote@latest https://figma-console-mcp.southleft.com/sse`）。首次调用时会自动弹出浏览器完成 Figma OAuth 授权。

### 检查连接

连好后在新对话发送以下提示词，确认能正确读取目标画布后再开始正式任务：

```text
请检查 Figma MCP 连接状态，读取我当前打开的 Figma 文件、Page 和选区。
先报告是否与我提供的目标一致，此轮不要修改画布。
```

写回画布时请保持 Figma 处于 **Design 模式**（Dev Mode 下无法写入）。

## 4. 其他可选社区方案

- **[TalkToFigma](https://github.com/grab/cursor-talk-to-figma-mcp)**：如果工作流已经依赖 Bun，可按其仓库说明运行 `bun socket` 配合 Figma 社区插件使用。
- **[Figwright](https://github.com/awdr74100/figwright)**：若团队此前已配好 Figwright 插件与本地 MCP，可继续沿用，无需强行更换。
- **[Framelink (Figma-Context-MCP)](https://github.com/glips/figma-context-mcp)**：仅需只读提取设计稿结构（例如只跑原型审查或前端切图）时可用，不支持向 Figma 写入内容。

## 5. 常见问题

| 现象 | 检查与处理 |
| --- | --- |
| 已安装 skill，AI 仍说不能访问 Figma | Skill 不提供连接能力。检查 MCP / connector 是否安装、登录，并在当前会话启用 |
| Desktop Bridge 插件连不上 | 确认 AI 客户端已重启并成功拉起 MCP；确认插件窗口处于打开状态，且与 AI 客户端在同一台电脑 |
| 升级后插件提示版本旧或报错 | Figma 会缓存开发插件。到 **Plugins → Manage plugins** 重新导入 `~/.figma-console-mcp/plugin/manifest.json` 即可 |
| Codex / Antigravity 写入时超时断开 | 默认超时较短，按上文在配置中把 `tool_timeout_sec` / `timeoutSeconds` 设为 `300` |
| 提示找不到 npx / node | 检查 Node.js 18+ 是否安装成功；GUI 客户端有时不继承终端 PATH，可在配置中把 `npx` 换成真实绝对路径 |
| 写入失败或只读 | 检查是否误用了 Remote SSE 只读地址、Figma 是否处于 Design 模式，以及账号对目标文件是否有编辑权限 |
| 读到另一个文件 | 回读文件与选区核对；多开文件时让 Agent 先切换活动文件目标，不要只依赖当前标签页 |
| 官方 MCP 没有 use_figma | 核对是否误连了只读的桌面 MCP（3845 端口）、客户端是否在官方支持列表中，以及当前席位权限 |
| 文字缺字、裁切、重叠 | 核对字体、Auto Layout 和文本尺寸，让 Agent 截图或自己打开画布复查，不以接口返回成功代替视觉验收 |
