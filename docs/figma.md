---
title: 连接 Figma：官方方案与 Figwright
---

# 连接 Figma：官方方案与 Figwright

以下内容核对于 2026-11-23。先按[安装教程](platforms.md)装好技能，再按自己使用的客户端选择连接方式。暂时不连接也能根据 PRD 附件写文字草稿，但 Agent 无法读取当前 Figma 节点或把结果写回画布。

如果你使用特定组合，可以直接看对应的专项保姆级教程：

- [ChatGPT 客户端 + 原生 Figma 插件教程](chatgpt_figma.md)（需 ChatGPT Plus 及以上订阅）
- [WorkBuddy + Figwright MCP 教程](workbuddy_figwright.md)（含信任 MCP 与 Figma 导入插件全流程）

## 1. 两种连接路线对比

本仓库的 UX 技能（如生成 `Interaction` 说明板、制作可编辑页面）需要读取设计稿并往画布写入内容。目前推荐两条路线：

| 方案 | 读写能力 | 适用 Figma 账号 | 适用场景与特点 |
| --- | --- | --- | --- |
| **Figma 官方连接** | 读 + 写（`use_figma`） | 写入草稿外文件通常需对应编辑权限与席位 | 官方远程 MCP 与平台原生插件，OAuth 登录免手动配环境，仅支持官方目录内的客户端 |
| **[Figwright](https://github.com/awdr74100/figwright)（推荐社区方案）** | 读 + 写（147 个工具） | Free / Pro / Enterprise 均可用 | 开源免费的双向本地 MCP，通过 Figma 开发插件与本地 WebSocket（`127.0.0.1:3055`）通信，支持多文件切换、截图导出与完整画布编辑，数据全程不经过第三方云端 |

各客户端推荐搭配：

| 平台 / 环境 | 推荐连接方式 |
| --- | --- |
| ChatGPT 桌面端 / 网页端 | 官方原生 Figma 插件（详见 [ChatGPT + Figma 插件教程](chatgpt_figma.md)） |
| ChatGPT 本地 Codex / 独立 Codex | 官方远程 MCP 或本地 Figwright |
| Claude 网页端 / Desktop | Claude 官方 Figma connector |
| Claude Code | 官方 Figma 插件或本地 Figwright |
| Antigravity | 本地 Figwright |
| WorkBuddy | 本地 Figwright（详见 [WorkBuddy + Figwright 教程](workbuddy_figwright.md)） |
| TRAE | 本地 Figwright |

官方支持列表与权限可能随版本调整，配置前可核对 [Figma MCP 总览与客户端列表](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)。

## 2. 方案一：Figma 官方连接

官方连接中，只有**官方远程 MCP / 平台官方插件**支持写回画布；官方桌面 MCP（`http://127.0.0.1:3845/mcp`）仅用于读取设计上下文，不支持写回说明板或页面。详情见[官方入门文档](https://help.figma.com/hc/en-us/articles/39216419318551-Get-started-with-the-Figma-MCP-server)。

### ChatGPT / Codex 官方连接

- **ChatGPT 桌面端 / 网页端**：在 **Settings → Plugins**（或左侧个人菜单的 **Apps & connectors**）搜索 **Figma** 安装并登录授权。完整步骤见 [ChatGPT 客户端 + 原生 Figma 插件教程](chatgpt_figma.md)。
- **本地 Codex CLI**：可手动添加官方远程服务（配置示例见 [figma-remote.codex.toml](../examples/mcp/figma-remote.codex.toml)）：

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

## 3. 方案二：Figwright（推荐社区方案）

[Figwright](https://github.com/awdr74100/figwright) 由本地 MCP 服务（`@figwright/mcp`）和 Figma 开发插件两部分组成，两者通过本机 WebSocket 通信。不需要购买付费 Dev Mode 席位，免费版 Figma 账号也能完整读写画布。

### 第一步：准备运行环境

1. 安装 **Figma 桌面端**（网页版 Figma 无法导入本地开发插件）。
2. 安装 **Node.js 20.19+ 或 22.12+**（注意：Node 18、21 以及 22.0–22.11 不受支持）。安装后可在终端运行 `node -v` 核对版本。

### 第二步：在 AI 客户端添加 Figwright MCP

通用的 MCP JSON 配置如下（仓库内已提供可直接复制的示例文件 [figwright.json](../examples/mcp/figwright.json)）：

```json
{
  "mcpServers": {
    "figwright": {
      "command": "npx",
      "args": ["-y", "@figwright/mcp@latest"]
    }
  }
}
```

不同客户端的配置位置：

- **WorkBuddy**：支持图形界面添加并点击“信任”启用，详见 [WorkBuddy + Figwright 专项教程](workbuddy_figwright.md)。
- **Claude Code**：在项目目录或终端运行：
  ```bash
  claude mcp add figwright -- npx -y @figwright/mcp@latest
  ```
- **OpenAI Codex**：将 [codex-figwright.toml](../examples/mcp/codex-figwright.toml) 中的 `[mcp_servers.figwright]` 配置段合并到 `~/.codex/config.toml`。
- **Antigravity**：在面板右上角 **… → MCP Servers → Manage MCP Servers → View raw config** 打开 `~/.gemini/config/mcp_config.json`，合入上面的 `figwright` 配置。
- **Cursor / Claude Desktop**：分别合入 `~/.cursor/mcp.json` 或 `~/Library/Application Support/Claude/claude_desktop_config.json`（Windows 为 `%APPDATA%\Claude\claude_desktop_config.json`），保存后重启客户端。
- **TRAE**：在 **设置 → MCP → 添加 → 手动添加** 中选择运行环境为**本地**，命令填 `npx`，参数填 `-y @figwright/mcp@latest`。

### 第三步：在 Figma 桌面端安装并开启插件

Figwright 插件未上架 Figma 社区商店，需要手动从 GitHub 导入一次：

1. 前往 [Figwright 最新 Release](https://github.com/awdr74100/figwright/releases/latest) 下载插件压缩包（例如 `figwright-plugin-vX.X.X.zip`），解压到一个固定文件夹（建议放在不易误删的位置，后续更新只需覆盖此目录）。
2. 打开 **Figma 桌面端** 并进入任意 **Design** 文件。
3. 在顶部菜单栏点击 **Plugins → Development → Import plugin from manifest…**，选中解压目录里的 `manifest.json`。
4. 导入后，点击 **Plugins → Development → Figwright** 启动插件。面板显示 **Connected** 即表示已连上本地 MCP。

提示：面板右上角 `✕` 下方的 **Run in background** 按钮可以收起插件窗口同时保持连接不断开；直接点最上方的 `✕` 会关闭插件并断开连接。

### 第四步：测试连通性

连好后在新对话发送以下提示词，确认能正确读取目标画布后再开始正式任务：

```text
请用 Figwright 的 ping 工具检查连接状态，并读取我当前打开的 Figma 文件和选区。
先报告是否与我提供的目标一致，此轮不要修改画布。
```

写回画布时请保持 Figma 处于 **Design 模式**（在 Dev Mode 下插件只能读取，所有写入操作都会失败）。

### 可选：安装 Figwright 配套技能

如果同时需要让 Agent 更擅长将代码与设计双向互转，还可以选装 Figwright 官方自带的两个技能（`figma-codegen` 与 `figma-build`）：

```bash
npx skills add awdr74100/figwright/skills
```

## 4. 常见问题与排查

| 现象 | 检查与处理 |
| --- | --- |
| 已安装 skill，AI 仍说不能访问 Figma | Skill 不提供连接能力。检查 MCP / connector 是否安装、启用并在当前会话授权 |
| 插件一直显示 `Waiting` 连不上 | 确认 AI 客户端处于打开状态且已启用 Figwright MCP（在 WorkBuddy 中需确认已点击“信任”）；确认插件和 AI 客户端运行在同一台电脑，且防火墙未拦截 `127.0.0.1:3055` |
| 报错 `command not found` 或 `-32000` | 客户端未继承终端的 `PATH`（常见于 `nvm` / `fnm` 安装的 Node）。在终端运行 `which npx`，把配置里的 `"npx"` 替换为完整的绝对路径 |
| `npx` 启动卡住或拉取失败 | 改用本地全局安装：`npm i -g @figwright/mcp`，再用 `which figwright-mcp` 获取路径直接填入 `command` |
| 提示插件与服务端版本不一致 | 插件面板的 **Debug** 标签页会并排显示服务端与插件版本。下载最新 Release 解压后，用新的 `manifest.json` 和 `dist` 覆盖原插件目录，重启插件即可（无需重新 Import） |
| 同时打开多个 Figma 文件写错画布 | 多文件场景下让 Agent 先运行 `list_files` 并用 `use_file` 声明目标文件，避免切换标签页后误改其他文件 |
| 写入失败或提示只读 | 检查 Figma 是否切换到了 Dev Mode（需切回 Design 模式），以及当前账号对目标文件是否有编辑权限 |
| 文字缺字、裁切、重叠 | 核对字体、Auto Layout 和文本尺寸，让 Agent 截图（`get_screenshot`）或自己打开画布复查 |
