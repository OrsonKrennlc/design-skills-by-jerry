# 去标识例稿与评审方法

以下为虚构的方法示例，不对应实际项目，不含私人 Figma 链接。仅学习结构、粒度和语言；字段限制、选项、提交结果和精确文案均须由本次项目提供依据。

## 例稿一：创建抽屉

假设需求明确：名称必填、备注可选，确认后校验，成功关闭，取消不保存。

```text
Entry:
Click Create on the Records page.

Function & Interaction:
Name — Required.
Description — Optional.

Confirm
Validate the required fields.
On success, close the drawer and show the created record in the list.

Cancel / ×
Close the drawer without saving.
```

来源未规定字符上限、唯一性、记录排序、遮罩点击或 Esc 时，不从这个例稿继续推导。若有未保存确认，应按项目规则补相应状态。

## 例稿二：条件字段

假设需求明确给出以下依赖：

```text
Advanced settings
Hidden while Enable advanced settings is unchecked.
Shown when Enable advanced settings is checked.

Related item
Disabled until a category is selected.
Lists items from the selected category.
```

这里展示隐藏和禁用的区别。上游切换后清空还是保留旧值，需要当前项目依据。

## 例稿三：局部提示

```text
Entry:
Hover over the information icon beside the disabled action.

Function & Interaction:
Show the explanation defined in the approved UI copy.
```

说明直接触发当前状态的操作。真实提示原文已取得时直接引用，不在正式文档中保留这种方法占位句。不能将悬浮说明的入口写成模块首页路径。

## 例稿四：有依据的异步失败

若来源明确写出刷新过程和失败反馈，可以写：

```text
Entry:
Click Refresh beside the selector.

Function & Interaction:
Fetch the latest options and show the progress message.
If the refresh fails, replace the progress message with the approved error message below the field.
```

不要自创自动重试、保留旧选项、失败后的按钮状态或服务端错误码。精确 UI 文案与说明原文不一致时，集中列一条必要问题，先完成其余确定内容。

## 识别需要修正的差异

- 复制旧说明后，创建和编辑使用了同一 Entry：重新核对直接入口。
- 说明叫 popup，但当前界面是右侧抽屉：按当前容器核准术语；保存规则仍看依据。
- 一处要求单行截断，另一处要求两行：先确认版本和适用状态，不任意推广。
- 页面被用户重置后旧标记仍在：重新读取文本和截图，清理已解决的问题。
- PRD 只写模糊匹配：沿用该粒度，不主动设计大小写、空格和匹配算法。
- 用户明确保留某项待办：只保留该待办，不将所有未定义实现细节一并列入。

例稿不是交付模板里的固定业务值。正式正文仅保留当前任务可用的规则、清楚的页面引用和必要未决项。
