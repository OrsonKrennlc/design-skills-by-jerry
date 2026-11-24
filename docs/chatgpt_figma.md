---
title: ChatGPT 客户端 + 原生 Figma 插件教程
---

# ChatGPT 客户端 + 原生 Figma 插件教程

> **订阅要求**：连接并使用原生 Figma 插件需要 **ChatGPT Plus 及更高级订阅**（Plus、Pro、Business 或 Enterprise；具体可用性还受账号所在地区限制，目前欧盟地区暂未开放，参见 [Figma 官方说明](https://help.figma.com/hc/en-us/articles/35326636109975-Use-ChatGPT-with-Figma)）。

这篇教程面向不想折腾本地环境的设计师，带你从下载 ChatGPT 桌面客户端开始，完成原生 Figma 插件的安装与账号登录。

---

## 1. 下载并安装 ChatGPT 桌面客户端

1. 前往 OpenAI 官方下载页：[chatgpt.com/download](https://chatgpt.com/download/)。
2. 页面会自动识别你的系统（支持 macOS 与 Windows，详见 [OpenAI 桌面端文档](https://help.openai.com/en/articles/9275200-downloading-the-chatgpt-macos-app)）：
   - **macOS**：下载 `.dmg` 安装包后打开，将 ChatGPT 图标拖入 **Applications（应用程序）** 文件夹即可。
   - **Windows**：下载安装包后双击运行，按默认向导完成安装。
3. 打开 ChatGPT 客户端，使用已开通 **Plus / Pro**（或企业工作区）的账号登录。

## 2. 安装原生 Figma 插件

OpenAI 已将连接器统一整合在插件目录中，按以下步骤安装：

1. 在 ChatGPT 客户端中打开 **Settings（设置）**（通常点击左下角或左侧栏你的头像即可进入）。
2. 在设置菜单中选择 **Plugins**（部分旧版界面显示为 **Apps & connectors**，详见 [OpenAI 已连接应用文档](https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt)）。
3. 在列表或搜索框中找到 **Figma**。
4. 点击 **Install plugin**（或 **Connect**）完成插件安装。

注：如果你使用的是公司管理的 Team / Enterprise 工作区，若页面提示被管理员禁用，需要联系工作区管理员在 Admin Console 中开启 Figma 插件权限。

## 3. 登录并授权 Figma 账号

安装插件后，还需要把你的 Figma 账号绑定进来：

1. 安装完成后系统会自动弹出 **Connect** 授权引导（也可以在 **Settings → Plugins → Figma** 中手动点击 **Connect** 触发）。
2. 浏览器会打开 Figma 登录与授权页面，登录你需要协作的那个 Figma 账号。
3. 核对请求的访问权限后，点击 **Allow access** 确认授权。
4. 页面跳转回 ChatGPT 客户端，看到 Figma 显示为已连接状态即完成绑定。

## 4. 在对话中使用及能力边界

绑定好后，新建任意对话，在输入框输入 `@Figma`（或点击输入框旁的 `+` 号图标选择 **Figma**）即可呼出插件，也可以在提问开头直接写“Figma …”来触发。

### 能力边界提醒（重要）

- **原生 Figma 插件适合什么**：在常规 ChatGPT 对话中，原生 Figma 插件主要擅长读取参考信息，以及把你的 PRD、文字思路直接生成为 **FigJam 流程图 / 结构图**，生成后点击预览卡片上的 **Edit in Figma** 即可在桌面端认领并编辑（未认领前链接为公开状态，认领进草稿后转为私有）。
- **如果需要直接修改 Figma Design 画布（如写 `Interaction` 说明板、建 UI 页面）**：原生聊天插件本身不负责往现有 Figma Design 画布里写入 UI 图层。这类任务建议切到新版 ChatGPT 桌面端内置的 **Codex / 本地工作台**，按 [安装技能](platforms.md#chatgpt) 装好本仓库的 Skills，并参照 [Figma 连接教程](figma.md) 接入官方远程 MCP 或本地 Figwright。
