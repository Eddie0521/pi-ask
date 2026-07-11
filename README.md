<p align="right">
  <a href="README-zh.md">🇨🇳 中文</a>
</p>

# Pi Ask

> Interactive questionnaire tool for the Pi coding agent — structured questions with option lists, multi-select, and free-text answers.

A Pi extension that gives the model a `questionnaire` tool: one question renders as a simple option list, several questions render as a tab-based form with a submit summary. Based on the questionnaire example from [`badlogic/pi-mono`](https://github.com/badlogic/pi-mono).

## Install

```bash
pi install npm:@eddie0521/pi-ask
```

Once installed and pi restarted, the model can call:

- `questionnaire` — ask one or more questions and collect the answers in a single tool result

## Features

- **Single or multi question** — one question shows a plain option list; multiple questions get a tab bar (`Tab`/`←`/`→` to switch) plus a Submit tab summarizing all answers
- **Multi-select** — `allowMultiple` turns a question into checkboxes (`Space` to toggle, `Enter` to confirm)
- **Free-text answers** — a "Type something." entry (`allowOther`, on by default) opens an inline editor
- **Option descriptions** — each option can carry a muted description line below its label
- **Lightweight schema** — `id` and option `value` are optional; they default to `q1, q2, …` and the option label

## Example

A call the model might make:

```json
{
  "questions": [
    {
      "label": "Scope",
      "prompt": "Which part should I refactor first?",
      "options": [
        { "label": "Parser", "description": "tokenizer + AST" },
        { "label": "Renderer" }
      ]
    },
    {
      "label": "Tests",
      "prompt": "Which test levels do you want?",
      "allowMultiple": true,
      "options": [{ "label": "Unit" }, { "label": "Integration" }, { "label": "E2E" }]
    }
  ]
}
```

## Keyboard

| Key | Action |
|-----|--------|
| `↑` `↓` | Move between options |
| `Enter` | Select option / confirm multi-select / submit |
| `Space` | Toggle option (multi-select) |
| `Tab` / `←` `→` | Switch question tabs (multi-question) |
| `Esc` | Cancel |

## Development

```bash
bun install
bun test
```

## License

MIT — based on the questionnaire example from [`badlogic/pi-mono`](https://github.com/badlogic/pi-mono) (MIT).
