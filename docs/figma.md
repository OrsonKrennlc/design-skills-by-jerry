---
title: 连接 Figma：官方方案与 Figwright
---

# 连接 Figma：官方方案与 Figwright

以下步骤核对于 2026-10-26。先按[安装教程](platforms.md)装好技能，再选择连接方式。暂时不连接也能根据附件写草稿，但 Agent 无法读取当前 Figma 节点或把结果写回画布。

## 先选路线

| 平台 / 环境 | 官方连接 | 本地 Figwright |
| --- | --- | --- |
| ChatGPT 的本地 Codex / 独立 Codex | 已有官方 Figma 插件与 MCP 设置方式 | 可用本地 MCP 配置 |
| ChatGPT 网页聊天 | 有官方 Figma 插件入口时安装；实际读写工具以当前账号为准 | 普通云端会话不能直接启动本机服务 |
| Claude / Claude Desktop | 使用 Figma connector；Claude Desktop 在 Figma 官方支持表中 | Desktop 的本地 MCP 配置可用；网页云端连接器不能直接代替它 |
| Claude Code | 官方 Figma 插件，或手动添加官方远程 MCP | 可用 |
| Antigravity | 本次核对的 Figma 支持表未单列此客户端 | 使用自定义本地 MCP |
| WorkBuddy | 本次核对的 Figma 支持表未列出 | 使用自定义本地 MCP |
| TRAE | 本次核对的 Figma 支持表未列出 | 使用本地 MCP |

Figma 官方服务只支持部分客户端。安装前请核对客户端名称，Gemini CLI 的支持情况不能直接套用到 Antigravity。支持列表和权限可能调整，详见 [Figma MCP 总览与客户端列表](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)。

## 官方连接的三种形式

“Figma 插件”在不同地方指的东西不同：AI 平台的插件装在 AI 工具中，Figwright 插件则装在 Figma 里。

| 形式 | 怎么连 | 能力边界 |
| --- | --- | --- |
| AI 平台的官方 Figma 插件 / connector | 在平台内安装并登录 Figma | 由平台、账号、实际开放工具决定；支持时带有配套技能 |
| 官方远程 MCP | Streamable HTTP：`https://mcp.figma.com/mcp`，OAuth 登录 | 支持客户端可读写画布；官方要求按功能配齐技能和权限 |
| 官方桌面 MCP | Figma 桌面端开启服务，连接 `http://127.0.0.1:3845/mcp` | 用于读取设计上下文，不支持写回画布；不要用它承诺完成说明板写入 |

官方远程写入需要文件编辑权限；按当前官方说明，写入草稿以外的文件还需要 Full seat。桌面 MCP 的开启方式和席位要求见 [官方入门](https://help.figma.com/hc/en-us/articles/39216419318551-Get-started-with-the-Figma-MCP-server)；具体访问条件见该文链接的 Plans, access, and permissions。

### ChatGPT / Codex 官方连接

在提供插件入口的 ChatGPT / Codex 客户端中打开 **Plugins**，搜索 **Figma**，安装并完成 Figma 账号授权。Codex 的官方步骤为 **Plugins → Figma 的 + → Install Figma → Allow access**。[Figma 的 Codex 教程](https://help.figma.com/hc/en-us/articles/39888629089175-Codex-and-Figma-Set-up-the-MCP-server)

本地 Codex CLI 也可手动连接：

```bash
codex mcp add figma --url https://mcp.figma.com/mcp
```

按浏览器提示完成授权，需要单独登录时运行 `codex mcp login figma`。手动添加 MCP 后，还需要另行安装官方工具技能。配置文件示例：[figma-remote.codex.toml](../examples/mcp/figma-remote.codex.toml)。MCP 设置方法见 [OpenAI 官方 MCP 文档](https://learn.chatgpt.com/docs/extend/mcp)。

普通 ChatGPT 网页端通过自身的插件入口连接，不读取本机 `config.toml`。账号没有插件入口时，可以改用本地 Codex，或先根据已有材料写草稿；仅提供官方远程 URL 无法让所有账号都完成安装。

### Claude 官方连接

**Claude 网页 / Desktop：** 在 **Customize → Connectors** 中找到 **Figma**，连接并完成授权；在当前对话里启用它，提供具体节点链接。菜单随版本变化时，进入 Connectors Directory 搜索。连接后请确认工具是否支持创建所需的 Design 图层，有些会话只提供读取和批注。[Claude 连接器说明](https://support.claude.com/en/articles/13454812-use-interactive-connectors-in-claude)

**Claude Code：** 推荐安装官方插件，它同时提供 MCP 配置和官方技能：

```bash
claude plugin install figma@claude-plugins-official
```

重启 Claude Code，运行 `/plugin`，在 Installed 中选择 Figma 并登录。无法安装插件时，手动添加：

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

新建会话，用 `/mcp` 选择 Figma 并 Authenticate。默认是当前项目范围；跨项目配置按官方文档添加 `--scope user`。[Figma 的 Claude Code 教程](https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server)

### 配套的官方工具技能

本仓库的技能说明怎样设计、写文档和检查结果。官方工具技能则负责 Figma 工具的调用方法。使用官方 `use_figma` 时需要加载 `figma-use`，生成整页、组件或新文件时还需对应技能，按本次任务安装即可，不必与本仓库的三个技能全部一起安装。

官方工具技能可以随 Figma 插件取得；手动配置 MCP 的用户可从 [Figma MCP server guide 仓库](https://github.com/figma/mcp-server-guide) 获取当前任务必需的技能，放到所在客户端的技能目录。[Figma 官方技能安装说明](https://help.figma.com/hc/en-us/articles/39166810751895-Figma-skills-for-MCP)

## Figwright 通用连接

Figwright 是第三方开源工具，与 Figma 官方 MCP 分开维护。[项目仓库](https://github.com/awdr74100/figwright) · [插件下载](https://github.com/awdr74100/figwright/releases/latest)。

AI 客户端需要能在本机启动 stdio MCP 进程。客户端通过本机 Figwright MCP 连接 Figma 中的 Figwright 插件，服务和插件需要在同一台电脑上运行。

### 1. 准备环境

安装 Figma 桌面端和 Node.js。Figwright 当前要求 Node 20.19+ 或 22.12+，可以选满足要求的 LTS 版本。安装后，在终端运行 `node --version`、`npx --version` 检查。Figma 免费方案可以用 Figwright，写入时仍需目标文件的编辑权限。版本要求见 [Figwright 上游 README](https://github.com/awdr74100/figwright)。

### 2. 给 AI 客户端添加本地 MCP

在客户端 MCP 设置中新增：

- 名称：`figwright`
- 类型：本地 / STDIO
- 命令：`npx`
- 参数：`-y`、`@figwright/mcp@latest`，作为两个参数填写。

JSON 配置示例见 [figwright.json](../examples/mcp/figwright.json)。把其中的 `figwright` 条目加入现有 `mcpServers`，保留已有服务。客户端格式可能不同，例如 Codex 使用 TOML。

### 3. 安装 Figma 内的 Figwright 插件

1. 从上面的 Releases 页面下载插件 ZIP 并解压。
2. 在 **Figma 桌面端 → Plugins → Development → Import plugin from manifest…** 选择解压包内的 `manifest.json`。
3. 在目标 Design 文件中运行 **Plugins → Development → Figwright**，保持插件打开。
4. 由 AI 客户端启动 MCP；插件出现 **Connected** 后继续。

下载源码后仍需完成插件导入。请保留解压后的插件文件夹，Figma 会从该位置加载。使用官方连接时，可以跳过本节。

### 4. 检查连接

在 AI 对话里说：

```text
请调用 Figwright 的 ping 检查连接，读取当前文件、Page 和选区。
先报告是否与我提供的目标一致，此轮不要修改画布。
```

确认读到的文件正确后，再指定允许修改的页面或说明板。写回时切换到 Figma Design 模式，Dev Mode 中的读取和导出功能不提供写入。

## 各平台添加 Figwright

### 本地 Codex

```bash
codex mcp add figwright -- npx -y @figwright/mcp@latest
```

或将 [codex-figwright.toml](../examples/mcp/codex-figwright.toml) 中的单个服务段合并到 `~/.codex/config.toml`。之后重启或新建会话。此配置用于本地 Codex，不用于普通 ChatGPT 网页聊天。

### Claude Code / Claude Desktop

Claude Code 将通用 JSON 条目合并进项目 `.mcp.json`，重启后用 `/mcp` 检查。

Claude Desktop 在 **Settings → Developer → Edit Config** 打开本地 MCP 配置，合并通用 JSON，保存后完整重启。请使用本地 MCP 配置，不要把 `npx` 填入远程 connector 的 URL 输入框。菜单位置以当前 Desktop 版本为准。[Claude 本地 MCP 官方教程](https://modelcontextprotocol.io/docs/develop/connect-local-servers)

### Antigravity

Agent 面板右上角 **… → MCP Servers → Manage MCP Servers → View raw config**，将通用 JSON 条目合并进 `mcp_config.json`。当前官方全局位置为 `~/.gemini/config/mcp_config.json`，工作区位置为 `.agents/mcp_config.json`；重新加载服务后检查工具。[Antigravity 官方 MCP 教程](https://antigravity.google/docs/mcp)

### WorkBuddy

进入 **专家·技能·连接器 → 连接器**，在当前版本提供的自定义 MCP 配置入口添加一个本地 stdio 服务，填入上述命令和参数，或合并通用 JSON。`command` 可以推断 stdio；表单明确要求类型时选 `stdio`。

WorkBuddy 官方文档支持自定义连接器和 stdio，但入口名称可能随版本变化。如果只看到市场连接器，可以先升级，或查当前版本的帮助，找到自定义 MCP 设置。仅在市场中搜索 Figwright 并未完成安装。配置后，在本地任务中启用服务，并保持 Figma 插件打开。[WorkBuddy 用户端连接器说明](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Connector)、[stdio 配置规范](https://open.workbuddy.cn/docs/connector)

### TRAE

在 **设置 → MCP → 添加 → 手动添加** 填入通用 JSON。需要选择运行环境时选 **本地**，新会话中确认服务已启用并可调用工具。云端运行环境无法直接访问本机 Figma 插件。[TRAE 官方 MCP 教程](https://docs.trae.cn/ide_add-mcp-servers)

## 常见问题

| 现象 | 检查与处理 |
| --- | --- |
| 已安装 skill，AI 仍说不能访问 Figma | Skill 不提供连接。检查 MCP / connector 是否安装、登录，并在当前会话启用 |
| Figwright 插件一直 Waiting | AI 客户端是否已启动服务；插件与服务是否在同一台电脑；插件是否仍打开 |
| 提示找不到 npx / node | 检查受支持的 Node 版本和客户端可见的 PATH；GUI 不一定继承终端环境。必要时在配置中使用 npx 的真实绝对路径 |
| Connected 但没有新工具 | 重启 MCP / 客户端，再新建会话；确认工具没有被禁用 |
| Figwright 写入失败 | 检查文件可编辑、处于 Design 模式；确认目标文件、Page、节点仍存在 |
| 读到另一个文件 | 回读文件与选区，明确目标；多开文件时按当前工具支持绑定目标，不只依赖活动标签页 |
| 官方 MCP 没有 use_figma | 核对是否用了桌面服务、客户端是否支持写入，以及账号权限；不要直接把所有官方 MCP 当作只读或可写 |
| 文字缺字、裁切、重叠 | 核对字体、Auto Layout 和文本尺寸，实际截图复查，不以写入成功代替视觉验收 |

升级 Figwright 时，请一起更新 MCP 服务和 Releases 中的插件文件，然后重开插件、检查连接。两边版本不匹配时，可能出现工具参数错误。[上游更新与排查说明](https://github.com/awdr74100/figwright#updating)

Figwright 另有可选的 `figma-build` / `figma-codegen` 技能，与本仓库的技能分别安装，用到时再装即可。
