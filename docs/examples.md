# ⚡ Example Workflows

Here are some ready-to-run workflows you can copy into your `workflows/` folder or paste into the **Workflows UI** at [http://localhost:3000/workflows](http://localhost:3000/workflows).

---

## 1. Summarize a File

Reads a text file, summarizes it with your local LLM, and saves the result.

```json
{
  "name": "Summarize File",
  "steps": [
    { "id": "step1", "type": "file.read", "params": { "path": "docs/input.txt" } },
    { "id": "step2", "type": "llm.query", "params": { "prompt": "Summarize this text:\n\n{{step1}}" } },
    { "id": "step3", "type": "file.write", "params": { "path": "docs/summary.txt", "input": "step2" } }
  ]
}
