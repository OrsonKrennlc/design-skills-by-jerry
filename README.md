# Design Skills by Jerry

给设计同事的一套 AI 工作方法：把需求变成可评审的 Web 原型，把设计稿里的行为整理成可交付的交互说明。

**按需安装，一个 skill 一个包。** 不需要安装整套，也不包含作者的本机插件清单、账号配置、个人路径或私人 Figma 原始档案。

当前版本 **0.1.0** · 平台说明核对于 **2026-10-26**。已检查文件结构和下载包；各平台步骤依据官方文档整理，尚未逐个平台完成安装实测。账号、地区、版本和组织权限可能影响可见入口。

直接下载独立安装包：[v0.1.0 Release](https://github.com/OrsonKrennlc/design-skills-by-jerry/releases/tag/v0.1.0)。

## 先选你要做的事

| Skill | 用来做什么 | 典型交付 | 独立下载 |
| --- | --- | --- | --- |
| [tvos-interaction-spec](skills/tvos-interaction-spec/SKILL.md) | 写、改、审查电视页面交互说明，核对焦点和遥控器六键 | `Screen Design / Entry Point / Interaction / Controls` | [ZIP](dist/tvos-interaction-spec.zip) |
| [web-prototype-design](skills/web-prototype-design/SKILL.md) | 按需求和设计系统设计 Web 页面、关键状态，按需连接演示 | 可编辑的 Figma 页面与状态；需要时增加可点击原型 | [ZIP](dist/web-prototype-design.zip) |
| [web-interaction-spec](skills/web-interaction-spec/SKILL.md) | 按 PRD、当前页面和定稿整理 Web / 后台交互说明 | 页面旁的 `Interaction` 说明板或可复制正文 | [ZIP](dist/web-interaction-spec.zip) |

电视 skill 适用于不同 TV OS，不代表默认采用 Apple tvOS 规则。三个 skill 均不负责生产前端实现。可以只装其中一个；skill 之间没有安装依赖。

## 第一次使用：三步完成

1. **下载一个 skill。** 点击上表对应 ZIP，进入 GitHub 文件页面后点下载。ZIP 内有完整技能文件夹，包含 `SKILL.md` 与配套参考资料；不要只复制入口文件。
2. **在你的平台安装。** 按下表选择教程。这里的“部署”就是把方法包安装到 AI 工具，不需要搭建网站或服务器。
3. **提供任务与交付位置。** 给 AI 当前需求、Figma 节点、定稿样例，以及“只写草稿 / 写回说明板 / 先做页面 / 需要可点击演示”。要读写 Figma 时，再单独连接 Figma。

也可以从 **Code → Download ZIP** 获取全仓库，再取出 `skills/` 内想安装的一个文件夹。全仓库 ZIP 不能当作单个 skill 上传。

## 选择你的平台

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
├── README.md                       从这里开始
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
│   ├── platforms.md                五个平台的安装、更新与卸载
│   ├── figma.md                    官方连接、Figwright 与排查
│   └── usage.md                    输入、提示词与验收
├── examples/mcp/                   可复制配置，不会自动启用
├── scripts/package_skills.py        检查并生成独立压缩包
├── dist/
│   ├── <skill-name>.zip            内含完整技能文件夹
│   ├── flat/<skill-name>.zip       根层直接含 SKILL.md 的兼容包
│   └── SHA256SUMS                  下载包校验值
└── CONTRIBUTING.md                 维护和发版约定
```

后续增加 skill 时，新建 `skills/<skill-name>/` 即可。每个目录自包含，不依赖作者电脑上的其他文件。

## 共享版与个人版的区别

保留方法和关键行为约束；把个人会话默认约定改为服从当前项目；适配官方 MCP 与 Figwright 两种工具路径。私人 Figma 文件链接、文件 key、节点索引、原始项目导出和个人插件清单不进入共享包。参考例稿已改成去标识的方法示例，不代表任何实际项目的已确认业务规则。

`agents/openai.yaml` 仅包含这个 skill 的展示名称、简介和启动提示，是可选的界面元数据，不是本机插件清单。其他平台使用 `SKILL.md` 和 `references/` 即可。

## 维护与校验

维护者使用 Python 3.10+，无第三方依赖；普通使用者下载 ZIP 即可。

```bash
python3 scripts/package_skills.py
python3 scripts/package_skills.py --check
```

第一条检查并生成独立包；第二条检查下载包及校验文件是否与源文件一致。同一份源文件生成两种 ZIP 结构，使用者只选择所在平台需要的那一种。详见 [贡献与发布](CONTRIBUTING.md)。

技能指令与仓库工具按 [Apache-2.0](LICENSE) 共享。Figma、Figwright 和各 AI 平台遵循各自的许可与访问规则。
