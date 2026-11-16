# Design Skills by Jerry

这里收集了用于辅助 UX/UI 设计的 Agent 技能，覆盖 TV 端（OS 10、OS Go!、majica）与 Web 端（SSP、WI）的原型制作、交互说明编写和原型审查。

**当前版本：v1.0.2** · [文档网站](https://orsonkrennlc.github.io/design-skills-by-jerry/) · [Releases](https://github.com/OrsonKrennlc/design-skills-by-jerry/releases) · [版本清单](dist/versions/1.0.2/manifest.json) · [校验值](dist/SHA256SUMS)

* **直接来装 Skill**：看下方[快速安装](#快速安装)与[技能清单](#技能清单与独立下载)。
* **第一次用 Agent**：先读 [Agent 使用入门](docs/agent_intro.md)，再按[新手路径](#新手路径从零开始跑通流程)推进。

## 快速安装

### 让 Agent 自动安装

在支持安装技能的 Agent 中新建对话，复制下面这段话，按提示授权即可：

```text
阅读这个仓库的说明，帮我将 skills/ 下的全部技能安装到当前使用的 Agent 中：
https://github.com/OrsonKrennlc/design-skills-by-jerry
请根据当前环境选择正确的安装方式，保留完整技能文件夹和参考资料。
完成后列出已安装的技能和安装位置；需要我完成的步骤，请给出具体操作。
```

### 各平台手动安装与 Figma 连接入口

如果客户端不支持自动安装，或你想自己管理技能文件，按所用平台选对应的装法和连接方式（全仓库压缩包不能直接当作单个 skill 上传）：

| 平台 | 技能怎么装 | Figma 怎么连 | 详细步骤 |
| --- | --- | --- | --- |
| ChatGPT / Codex | 桌面端本地 Codex / Work 环境安装单个技能文件夹；网页聊天可作参考附件 | 官方 Figma 插件；本地 Codex 可用官方远程 MCP 或 Figwright | [安装步骤](docs/platforms.md#chatgpt) |
| Claude | `Customize → Skills → Upload a skill` 上传单个 ZIP；Claude Code 也可用技能文件夹 | Claude Figma connector；Claude Code 官方插件；或本地 Figwright | [安装步骤](docs/platforms.md#claude) |
| Antigravity | 完整技能文件夹放入项目 `.agents/skills/` | 本地 Figwright MCP | [安装步骤](docs/platforms.md#antigravity) |
| WorkBuddy | 技能 → 添加技能 → 导入本地技能包 | 自定义本地 MCP 连接 Figwright | [安装步骤](docs/platforms.md#workbuddy) |
| TRAE | 完整技能文件夹放入 `.trae/skills/`，或从技能设置导入 | 本地 MCP 连接 Figwright | [安装步骤](docs/platforms.md#trae) |

### 一句话启动示例

装好技能并连上 Figma 后，可以直接在对话里指定技能名（ChatGPT 可用 `@`、Codex 可用 `$`）：

```text
使用 web-interaction-spec。
根据我提供的 PRD 和 Figma 节点，为“新建记录”整理交互说明。
目标：[粘贴 Copy link to selection 得到的链接]
沿用同一 Section 里已定稿的说明板，只更新本功能说明。
交付到当前页面旁的 Interaction 画布。
```

Skill 只规定“怎么做”，不提供 Figma 访问权限。需要读写画布时，需另外连接 [Figma 官方 MCP](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server) 或本地 [Figwright](https://github.com/awdr74100/figwright)（使用官方写入工具时，还需按 [Figma MCP server guide](https://github.com/figma/mcp-server-guide) 安装配套工具技能）。没有可写连接时，先让 Agent 输出正文草稿。

## 技能清单与独立下载

| 技能名称 | 适用端与场景 | 核心交付物 | 适用范围提示 | 独立下载 |
| --- | --- | --- | --- | --- |
| [web-prototype-design](skills/web-prototype-design/SKILL.md) | Web 端原型设计 | 全局 UX 规划、可编辑的 Figma 页面与关键状态 | 含 SSP 设计风格约定，其他项目需提供当前设计系统与参考页 | [ZIP](https://orsonkrennlc.github.io/design-skills-by-jerry/dist/web-prototype-design.zip) · [Flat ZIP](https://orsonkrennlc.github.io/design-skills-by-jerry/dist/flat/web-prototype-design.zip) |
| [web-interaction-spec](skills/web-interaction-spec/SKILL.md) | Web 端说明与审查 | `Interaction` 说明板、正文草稿或原型审查报告 | 适用于 Web 与后台系统 | [ZIP](https://orsonkrennlc.github.io/design-skills-by-jerry/dist/web-interaction-spec.zip) · [Flat ZIP](https://orsonkrennlc.github.io/design-skills-by-jerry/dist/flat/web-interaction-spec.zip) |
| [tvos-interaction-spec](skills/tvos-interaction-spec/SKILL.md) | TV 端交互说明 | `Screen Design / Entry Point / Interaction / Controls` | 参考 OS 10 Home 与 majica，其他项目需提供焦点规则与定稿样例 | [ZIP](https://orsonkrennlc.github.io/design-skills-by-jerry/dist/tvos-interaction-spec.zip) · [Flat ZIP](https://orsonkrennlc.github.io/design-skills-by-jerry/dist/flat/tvos-interaction-spec.zip) |

每个技能提供两种打包结构：`dist/<skill-name>.zip` 内含完整技能文件夹，`dist/flat/<skill-name>.zip` 根层直接包含 `SKILL.md`，按所用平台要求选择即可。历史版本安装包可在 [Releases](https://github.com/OrsonKrennlc/design-skills-by-jerry/releases) 中获取。

## 新手路径：从零开始跑通流程

如果你平时不做代码开发，第一次用 Agent 辅助 Figma 设计，建议按下面四步走：

1. **建立基本认知**：先读 [Agent 使用入门](docs/agent_intro.md)，了解 Prompt、Skill 与 Figma 连接的分工，以及画布防误改和结果检查方法。
2. **安装技能包**：按 [安装教程](docs/platforms.md) 把技能导入你常用的客户端。
3. **打通 Figma 连接**：按 [Figma 连接教程](docs/figma.md) 选择只读模式（先出文字草稿或审查报告）或可写模式（官方 MCP / Figwright）。
4. **复制提示词开干**：到 [使用方法与提示词](docs/usage.md) 按场景选取模板，建议先拿一份不含敏感信息的 PRD 和页面副本试跑。

## 仓库结构、文档网站与维护

在线文档托管在 [Design Skills by Jerry](https://orsonkrennlc.github.io/design-skills-by-jerry/)，使用 Minimal 主题并从 `main` 分支根目录自动构建；首页维护在 `index.md`，教程对应 `docs/` 下的 Markdown 文件。

```text
design-skills-by-jerry/
├── README.md                       GitHub 仓库入口
├── index.md                        文档网站首页
├── VERSION                         当前技能包版本（1.0.2）
├── skills/                         维护中的技能源文件
│   ├── tvos-interaction-spec/
│   ├── web-prototype-design/
│   └── web-interaction-spec/
├── docs/                           入门、安装、连接与用法教程
├── examples/mcp/                   可复制的 MCP 配置示例
├── scripts/package_skills.py       打包与一致性检查脚本
└── dist/                           独立下载包、版本清单与校验值
```

维护者更新技能后，可使用 Python 3.10+ 运行以下命令重新生成压缩包并校验一致性（无需第三方依赖），具体规范见 [贡献与发布](CONTRIBUTING.md)：

```bash
python3 scripts/package_skills.py
python3 scripts/package_skills.py --check
```

技能指令与仓库工具按 [Apache-2.0](LICENSE) 开源共享。Figma、Figwright 和各 AI 平台遵循各自的许可与访问规则。
