---
title: WorkBuddy + Figwright MCP 教程
---

# WorkBuddy + Figwright MCP 教程

这篇教程面向使用腾讯 **WorkBuddy** 桌面端的零代码设计师，带你完成客户端安装、让 WorkBuddy 帮忙配置 **Figwright MCP**、在客户端中**信任并启用 MCP**，以及在 **Figma 桌面端导入并开启第三方插件** 的完整流程。

**所需前置条件**：免费版 Figma 账号即可（无需付费 Dev Mode 席位），但必须使用 **Figma 桌面客户端**（网页版不支持导入本地开发插件）。

---

## 1. 下载并安装 WorkBuddy 客户端

1. 前往 WorkBuddy 官网下载对应系统的安装包：
   - 国内版官网：[workbuddy.cn](https://www.workbuddy.cn/)
   - 国际版官网：[workbuddy.ai](https://www.workbuddy.ai/)
2. 系统要求与安装（参考 [WorkBuddy Mac 安装指南](https://www.workbuddy.ai/docs/zh/workbuddy/From-Beginner-to-Expert-Guide/Installation-Mac-Guide)）：
   - **macOS**（需 macOS 12 Monterey 及以上）：下载 `.dmg` 后打开，将 WorkBuddy 拖入 **应用程序（Applications）**。
   - **Windows**：下载 `.exe` 安装包双击运行，按提示选择安装路径完成安装。
3. 打开 WorkBuddy 客户端，按引导登录账号即可进入主界面。

## 2. 用 WorkBuddy 自动安装并配置 Figwright

Figwright 运行依赖电脑上的 Node.js（20.19+ 或 22.12+），并且需要把一段本地 MCP 配置写进 WorkBuddy 的连接器。不想自己查命令行的话，可以直接新建一个 WorkBuddy 任务，把下面这段话发给它：

```text
请帮我在当前电脑配置 Figwright（Figma 双向 MCP）：
1. 检查本机是否已安装 Node.js 20.19+ 或 22.12+（如果没有，请告诉我下载安装地址）。
2. 从 https://github.com/awdr74100/figwright/releases/latest 下载最新的插件压缩包，并帮我解压到一个固定文件夹（比如桌面或文稿下的 figwright-plugin 目录），完成后把解压文件夹的完整路径告诉我。
3. 指导我或帮我在 WorkBuddy 中添加名为 figwright 的本地 MCP 配置，启动命令为 npx，参数为 ["-y", "@figwright/mcp@latest"]。
```

### 如果你想手动在界面里添加 MCP

1. 在 WorkBuddy 左侧导航栏点击 **专家·技能·连接器 → 连接器**，进入连接器管理页面（见 [WorkBuddy 连接器文档](https://www.workbuddy.ai/docs/zh/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Connector)）。
2. 点击右上角的 **自定义连接器**（或添加本地 MCP），按下面内容填写：
   - **名称**：`figwright`
   - **运行环境**：选择 **本地**
   - **命令（Command）**：`npx`
   - **参数（Args）**：`-y @figwright/mcp@latest`（若需填入 JSON 格式，直接复制仓库里的 [figwright.json](../examples/mcp/figwright.json)）
3. 保存配置。

## 3. 在 WorkBuddy 中“信任”并启用 MCP

这是新手最容易漏掉的一步。把配置文件或自定义连接器加进去之后，WorkBuddy 默认处于未信任/未启用状态，Agent 还不能调用它：

1. 回到 WorkBuddy 左侧导航栏的 **专家·技能·连接器 → 连接器** 管理页面。
2. 在连接器列表里找到刚添加的 **figwright** 卡片。
3. 点击卡片上的 **「信任」** 按钮（确认允许本地运行该工具），并确保右侧的 **启用开关** 处于打开状态。
4. 完成后，新建或回到一个任务对话，在输入框中确认已能看到并启用 `figwright` 连接器。

## 4. 在 Figma 桌面端安装第三方插件并开启

Figwright 需要在 Figma 里运行一个配套的本地开发插件，才能把画布和 WorkBuddy 接通：

1. **下载插件包**：如果前面没有让 WorkBuddy 自动下载，自行前往 [Figwright Releases 页面](https://github.com/awdr74100/figwright/releases/latest) 下载最新的插件压缩包（如 `figwright-plugin-vX.X.X.zip`），解压到一个不会随手删掉的目录（里面包含 `manifest.json` 和 `dist/`）。
2. **导入插件**：
   - 打开 **Figma 桌面端**，新建或打开任意一个 **Design** 文件。
   - 在顶部菜单栏依次点击 **Plugins → Development → Import plugin from manifest…**。
   - 在弹出的文件选择框中，找到刚才解压的文件夹，选中里面的 `manifest.json` 并点击打开。
3. **开启插件并保持运行**：
   - 导入完成后，在 Figma 菜单栏点击 **Plugins → Development → Figwright** 启动插件。
   - 确保 Figma 处于 **Design 模式**（不要切到 Dev Mode）。
   - 插件窗口弹出后，左上角或状态栏会显示 **Connected**。你可以点击面板右上角 `✕` 下方的 **Run in background** 把窗口收起到后台，连接依然有效（注意不要点最上方的 `✕`，点它会直接关闭插件并断开连接）。

## 5. 验证连通并开始设计

1. 如果还没装本仓库的 UX 技能，先按 [安装技能](platforms.md#workbuddy) 在 WorkBuddy 左侧 **技能 → 添加技能** 中导入技能包。
2. 在 WorkBuddy 新建任务，发送下面这段测试指令确认两头已经打通：

```text
请调用 figwright 的 ping 工具检查连接状态，并读取我当前打开的 Figma 文件名称和选中图层。此轮不要修改画布。
```

当 WorkBuddy 准确报出你当前打开的 Figma 文件名时，就可以正式把 PRD、节点链接和定稿样例交给他辅助设计了。

### 常见卡点速查

- **Figma 插件一直显示 `Waiting`**：检查 WorkBuddy 客户端是否开着、连接器列表里 `figwright` 是否已点击 **「信任」** 并开启开关。
- **提示找不到 `npx` 或连接立刻断开**：确认电脑已安装 Node.js 20.19+ 或 22.12+；若安装后仍报错，可在终端运行 `which npx` 查看绝对路径，把 WorkBuddy 自定义连接器里的命令从 `npx` 换成完整路径。
