<p align="right">
  <a href="README.md">🇬🇧 English</a>
</p>

# Pi Ask

> Pi coding agent 的交互式提问工具——结构化问题、选项列表、多选和自由输入。

一个 Pi 扩展，为模型提供 `questionnaire` 工具：单个问题渲染为简洁的选项列表，多个问题渲染为带提交汇总页的选项卡表单。基于 [`badlogic/pi-mono`](https://github.com/badlogic/pi-mono) 的 questionnaire 示例。

## 安装

```bash
pi install npm:pi-ask
```

安装并重启 pi 后，模型即可调用：

- `questionnaire` — 一次询问一个或多个问题，答案汇总在同一个工具结果里返回

## 特性

- **单问 / 多问自适应** — 单个问题显示纯选项列表；多个问题显示选项卡栏（`Tab`/`←`/`→` 切换）和汇总所有答案的 Submit 页
- **多选** — `allowMultiple` 把问题变成复选框（`Space` 勾选，`Enter` 确认）
- **自由输入** — "Type something." 条目（`allowOther`，默认开启）展开内联编辑器
- **选项描述** — 每个选项可以在标签下方附一行灰色说明
- **轻量 schema** — `id` 和选项的 `value` 均可省略，默认分别为 `q1, q2, …` 和选项标签

## 示例

模型的一次典型调用：

```json
{
  "questions": [
    {
      "label": "Scope",
      "prompt": "先重构哪部分？",
      "options": [
        { "label": "Parser", "description": "tokenizer + AST" },
        { "label": "Renderer" }
      ]
    },
    {
      "label": "Tests",
      "prompt": "需要哪些层级的测试？",
      "allowMultiple": true,
      "options": [{ "label": "Unit" }, { "label": "Integration" }, { "label": "E2E" }]
    }
  ]
}
```

## 键位

| 按键 | 动作 |
|------|------|
| `↑` `↓` | 在选项间移动 |
| `Enter` | 选中 / 确认多选 / 提交 |
| `Space` | 勾选选项（多选模式） |
| `Tab` / `←` `→` | 切换问题选项卡（多问模式） |
| `Esc` | 取消 |

## 开发

```bash
bun install
bun test
```

## 许可

MIT — 基于 [`badlogic/pi-mono`](https://github.com/badlogic/pi-mono) 的 questionnaire 示例（MIT）。
