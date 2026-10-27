# Design Skills by Jerry

[文档网站](https://orsonkrennlc.github.io/design-skills-by-jerry/) · [安装教程](docs/platforms.md) · [连接 Figma](docs/figma.md) · [使用方法](docs/usage.md) · [v0.1.0 Release](https://github.com/OrsonKrennlc/design-skills-by-jerry/releases/tag/v0.1.0)

本仓库提供用于设计工作的 Agent 技能，主要面向 TV 端（OS 10、OS Go!、majica）与 Web 端（SSP、WI）。技能帮助整理说明和完成重复操作，设计判断与业务规则仍需要由项目负责人确认。

## 开始使用

推荐让 Agent 一次性安装本仓库的全部技能，省去逐个下载、解压和导入的重复操作。装好后，按具体任务调用所需技能即可。

### 推荐：让 Agent 安装全部技能

如果还没使用过 Agent 工具，请先读 [Agent 使用入门](docs/agent_intro.md)，选择并安装适合自己的工具，再回来继续。

把下面的提示词发给支持安装技能的 Agent，再按提示授予必要权限：

```text
阅读这个仓库的说明，帮我将 skills/ 下的全部技能安装到当前使用的 Agent 中：
https://github.com/OrsonKrennlc/design-skills-by-jerry
请根据当前环境选择正确的安装方式，保留完整技能文件夹和参考资料。
完成后列出已安装的技能和安装位置；需要我完成的步骤，请给出具体操作。
```

详细步骤和安装后的检查见[安装教程](docs/platforms.md)。当前应用不能直接安装时，再使用下方的手动安装方法。需要读写 Figma 时，另行完成工具连接。

完整教程可在[文档网站](https://orsonkrennlc.github.io/design-skills-by-jerry/)阅读，也可以在仓库中直接查看：

| 你要做什么 | 入口 |
| --- | --- |
| 了解 Agent 及授权注意事项 | [Agent 使用入门](docs/agent_intro.md) |
| 让 Agent 一次安装全部技能 | [安装教程](docs/platforms.md) |
| 让 Agent 读写 Figma | [Figma 连接教程](docs/figma.md) |
| 给出任务、参考材料与交付要求 | [使用方法与提示词](docs/usage.md) |

## 技能列表

| Skill | 用来做什么 | 典型交付 | 独立下载 |
| --- | --- | --- | --- |
| [tvos-interaction-spec](skills/tvos-interaction-spec/SKILL.md) | 写、改、审查电视页面交互说明，核对焦点和遥控器六键 | `Screen Design / Entry Point / Interaction / Controls` | [ZIP](https://orsonkrennlc.github.io/design-skills-by-jerry/dist/tvos-interaction-spec.zip) |
| [web-prototype-design](skills/web-prototype-design/SKILL.md) | 按需求和设计系统设计 Web 页面、关键状态，按需连接演示 | 可编辑的 Figma 页面与状态；需要时增加可点击原型 | [ZIP](https://orsonkrennlc.github.io/design-skills-by-jerry/dist/web-prototype-design.zip) |
| [web-interaction-spec](skills/web-interaction-spec/SKILL.md) | 按 PRD、当前页面和定稿整理 Web / 后台交互说明 | 页面旁的 `Interaction` 说明板或可复制正文 | [ZIP](https://orsonkrennlc.github.io/design-skills-by-jerry/dist/web-interaction-spec.zip) |

`tvos-interaction-spec` 的写作方法参考了 OS 10 Home 的交互文档，并针对 majica 项目作过调整。用于其他电视项目时，需要提供该项目的焦点规则和定稿样例。

`web-prototype-design` 包含针对 SSP 设计风格的约定。用于其他 Web 项目时，应提供当前项目的设计系统和参考页面；其他风格尚未经过完整实测。

下方的手动安装方法和表中的 ZIP 下载作为备用。固定版本的独立安装包也可从 [v0.1.0 Release](https://github.com/OrsonKrennlc/design-skills-by-jerry/releases/tag/v0.1.0) 下载。

## 备用：手动安装

无法让 Agent 直接安装，或希望自己管理技能文件时，可以按以下步骤操作。

1. **下载 skill。** 点击上表对应 ZIP 直接下载。ZIP 内有完整技能文件夹，包含 `SKILL.md` 与配套参考资料；不要只复制入口文件。
2. **在你的 Agent 中安装。** 按下表选择教程。安装技能不需要搭建网站或服务器。
3. **提供任务与交付位置。** 给 AI 当前需求、Figma 节点、定稿样例，以及“只写草稿 / 写回说明板 / 先做页面 / 需要可点击演示”。要读写 Figma 时，再单独连接 Figma。

也可以从 **Code → Download ZIP** 获取全仓库，再取出 `skills/` 内的各技能文件夹，按平台要求分别导入。全仓库 ZIP 不能当作单个 skill 上传。

### 各平台的手动安装入口

| 平台 | 单个 skill 怎么装 | Figma 怎么连 | 教程 |
| --- | --- | --- | --- |
| ChatGPT | 桌面端本地 Codex / Work 环境安装单个技能文件夹；普通网页聊天可用文件参考方式，能力不同 | 有 Figma 插件入口时用官方插件；本地 Codex 可用官方 MCP 或 Figwright | [操作步骤](docs/platforms.md#chatgpt) |
| Claude | `Customize → Skills → Upload a skill`，上传一个 ZIP；Claude Code 也可用技能文件夹 | Claude 的 Figma connector；Claude Code 的官方 Figma 插件；或本地 Figwright | [操作步骤](docs/platforms.md#claude) |
| Antigravity | 完整技能文件夹放入项目 `.agents/skills/` | 本地 Figwright MCP | [操作步骤](docs/platforms.md#antigravity) |
| WorkBuddy | 技能 → 添加技能 → 导入本地技能包 | 自定义本地 MCP 连接 Figwright | [操作步骤](docs/platforms.md#workbuddy) |
| TRAE | 完整技能文件夹放入 `.trae/skills/`，或从技能设置导入 | 本地 MCP 连接 Figwright | [操作步骤](docs/platforms.md#trae) |

以上平台能力的官方出处和版本差异见各段教程。ChatGPT 网页端与本地 Codex 的安装方式不同，不能把本地文件夹安装说成网页原生导入。

## Skill 与 Figma 连接是两件事

Skill 约定“怎么做事”，MCP / 连接器提供“能操作什么”。安装 skill 不会自动获得 Figma 权限，也不会自动安装 Figwright。

- **官方连接：** 支持的平台优先安装 Figma 插件 / connector，或连接官方远程 MCP：`https://mcp.figma.com/mcp`。支持列表与写入能力见 [Figma 官方文档](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)。
- **通用连接：** [Figwright 仓库](https://github.com/awdr74100/figwright)，通过本地 MCP 服务与 Figma 内运行的插件连接。适用于可以启动本地 MCP 的客户端；普通云端聊天不能直接连接本机服务。
- **官方配套技能：** [Figma MCP server guide 仓库](https://github.com/figma/mcp-server-guide)。使用官方写入工具时，按官方要求安装其工具技能；本仓库不复制分发这些第三方技能。

完整步骤、配置示例和故障排查见 [Figma 连接教程](docs/figma.md)。

## 一句话开始

```text
使用 web-interaction-spec。
根据我提供的 PRD 和 Figma 节点，为“新建记录”整理交互说明。
目标：[粘贴 Copy link to selection 得到的链接]
沿用同一 Section 里已定稿的说明板，只更新本功能说明。
交付到当前页面旁的 Interaction 画布。
```

ChatGPT 支持时可用 `@` 选择已安装技能，Codex 可用 `$`；也可以直接说“使用技能名”。没有读写工具时，明确要求先交付正文。更多独立用法、组合流程与验收方法见 [使用教程](docs/usage.md)。

## 仓库结构

```text
design-skills-by-jerry/
├── README.md                       GitHub 仓库入口
├── index.md                        文档网站首页
├── _config.yml                     Minimal 主题与文档导航
├── _layouts/default.html           网站布局
├── assets/css/style.scss           中文排版与响应式适配
├── Gemfile                         网站本地预览依赖
├── LICENSE                         Apache-2.0
├── VERSION                         当前技能包版本
├── skills/                         唯一维护的技能源文件
│   ├── tvos-interaction-spec/
│   ├── web-prototype-design/
│   └── web-interaction-spec/
│       ├── SKILL.md
│       ├── agents/openai.yaml      可选的名称、简介和启动提示
│       └── references/             方法、检查点与去标识例稿
├── docs/
│   ├── agent_intro.md              Agent 基本概念、授权与验收
│   ├── platforms.md                Agent 批量安装与手动备用教程
│   ├── figma.md                    官方连接、Figwright 与排查
│   ├── usage.md                    输入、提示词与验收
│   └── releases/                   版本发布说明
├── examples/mcp/                   可复制配置，不会自动启用
├── scripts/package_skills.py        检查并生成独立压缩包
├── dist/
│   ├── <skill-name>.zip            内含完整技能文件夹
│   ├── flat/<skill-name>.zip       根层直接含 SKILL.md 的兼容包
│   └── SHA256SUMS                  下载包校验值
└── CONTRIBUTING.md                 维护和发版约定
```


## 文档网站

在线地址：[Design Skills by Jerry](https://orsonkrennlc.github.io/design-skills-by-jerry/)。网站使用 [Minimal](https://github.com/pages-themes/minimal) 主题，首页提供技能下载与教程入口，各文档页共用导航。

GitHub Pages 从 `main` 分支根目录构建，推送后自动更新。网站首页维护在 `index.md`，教程沿用 `docs/` 中的 Markdown 文件。主题配置、本地预览与发布检查见[维护文档网站](CONTRIBUTING.md#维护文档网站)。

## 维护与校验

打包校验需要 Python 3.10+，无第三方依赖；普通使用者可以直接让 Agent 安装技能。

```bash
python3 scripts/package_skills.py
python3 scripts/package_skills.py --check
```

第一条检查并生成独立包；第二条检查下载包及校验文件是否与源文件一致。同一份源文件生成两种 ZIP 结构，使用者只选择所在平台需要的那一种。详见 [贡献与发布](CONTRIBUTING.md)。

技能指令与仓库工具按 [Apache-2.0](LICENSE) 共享。Figma、Figwright 和各 AI 平台遵循各自的许可与访问规则。
