# 电视交互说明：写作方法与例稿

本页保留可复用的写作方法。例稿为去标识的方法示例，不是某个实际产品的已确认规则。实际任务使用当前项目的画面、规则和用户定稿；不需要读取任何作者的私人 Figma 文件。

## 三层文档

- 页面概览：交代区域、初始状态和适用于全页的规则；确有必要才增加。
- 状态说明：围绕当前焦点写 Screen Design、Entry Point、Interaction、Controls。
- 状态流程：用于跨状态计时、保存/取消或复杂分支；不为简单页面额外扩写 PRD。

每个状态按“焦点 + 可见内容 + 操作模式 + 时间阶段”识别。列表还需区分逻辑项目、屏幕槽位、滚动偏移和经过轮次。同一个项目再次出现不一定意味着回到初始状态。

## 四节各写什么

| 部分 | 内容 | 不要混入 |
| --- | --- | --- |
| Screen Design | 有哪些区域、控件、内容及遮罩，分别在哪里 | 操作过程、节点诊断、版本核查日志 |
| Entry Point | 直接来源、触发方式、当前默认焦点 | 其他状态的完整导航规则 |
| Interaction | 当前状态的选择、反馈、联动及必要约束 | 没有依据的服务端结果和业务参数 |
| Controls | 当前截图焦点下六键的一次操作结果 | 整页所有焦点的按键规则 |

入口推荐分行：`Press DOWN from [source].`、`Default Focus: [target].`。同构选项不必各复制一整份说明；存在行为差异的状态分别写。

## 虚构例稿：三选项，第一项获焦

假设本次任务明确给出：三个并列选项、下方 Continue、OK 选择、BACK 回上一页、边界不移动。以下只示范写法，不应直接套用于实际产品。

### General Behaviour

**Screen Design**

Three options are arranged in one row. A Continue button is shown below.

**Entry Point**

Enter from the previous step.
Default Focus: Option A (not selected).

**Interaction**

Focus and selection are separate states. Press OK to select the focused option.

### Controls

| 输入 | 行为 |
| --- | --- |
| UP | Null |
| DOWN | To Continue. |
| LEFT | Null |
| RIGHT | To Option B. |
| BACK | Return to the previous step. |
| OK | Select Option A. |

RIGHT 只写 Option A 获焦时的结果。未取得当前项目对边界或返回的定义时，不能用这个例子的 Null 和返回结果填空。

## 弹窗：按当前字段写按键

日期选择器若由年、月、日和屏幕确认按钮组成，Year 获焦状态的示例为：UP → Previous year，DOWN → Next year，RIGHT → To Month。遥控器 OK 在 Year 上的行为，与选中屏幕确认按钮后的提交行为必须分别核对。

每个弹窗也包含 Screen Design。BACK 是否取消、是否保存、关闭后焦点返回哪里，以当前定稿为准。不要因为模板缺了一节就省略它。

## 邻项、行与边界

- 左右邻项可写 `To last card.` / `To next card.`，不把样例广告名写成固定目标。
- `last` 表示上一个邻项时，要与列表末项的循环规则分开表述。
- 上下目标写真实行名；只有来源明确时才补第几项。
- 全页映射在概览或 Interaction 说明；局部 Controls 仍按当前焦点写。
- 用户定稿中的 Null 可沿用；未解释的空白、斜线或历史 Null 不足以证明无动作。

## 计时与分支

分别核对触发事件、等待多久、展示多久、结束结果、取消/重置及展示频率。动画转场时长不等于停留阈值；键盘演示事件不等于真实遥控器输入。

出现循环列表、长按、广告播放或跨状态计时时，用条件表表达真正不同的分支。不自行补时长、轮次、默认日期、服务端结果和下游页面。只留接口时记录触发点及待定呈现，不自创提示 UI。

## 一行一页的大纲

用户要求行级大纲时，概括该行的状态序列、入口、上下映射、左右移动、OK、BACK 和相关边界。必要条件分支可合并到同一行，不为每张同构截图重复建板。当前任务需要逐状态交付时，再按实际焦点拆开。

## 批量修改与写回

1. 重新定位当前 Page、版本和嵌套 Section；核对说明与画面内容，不只信旧 ID 或几何位置。
2. 限定目标说明和字段，先核对命中数量。只改 BACK 时不能误改 LEFT 或其他例外。
3. 同步检查 Screen Design、Entry Point、Interaction、Controls 和相关入口中受影响的规则。
4. 保留样式；加载实际字体并处理混合样式。说明实例受限时仅调整已授权本地实例，不改共享主组件。
5. 超时或部分失败后先回读，再定向补缺，避免重复创建或二次平移。
6. 检查实际修改数、剩余旧词、六键和渲染。已通过且没有新变化时不反复导出。

## 版式与验收

沿用当前项目的颜色、字号、画布和双列 Controls。没有模板时可以提出一个示例版式，但不能称其为既有规范。内容多时先精简重复句，再加高或拆板，不缩小至难读。

逐板检查四节、六键、入口、提交/取消、返回焦点、文字裁切与相邻重叠。核对文件结构和静态画面不等于实测电视产品；最终只报告实际完成的层级。
