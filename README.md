# genAi102
Agentic Task Automator
Right now, AI models give answers in isolation. But what if you want to automate multi-step tasks locally? Example:
“Summarize this PDF → Generate SQL insert script from the summary → Save into DB.”
You need an orchestrator: a local agent system with memory, tools, and a workflow runner.

# 🤖 Agentic Task Automator

> Local-first AI Orchestrator — run multi-step agent workflows with your own LLMs (Ollama + Qwen/Gemma/DeepSeek), file system, SQL, and APIs.  
> Built with **Next.js + TypeScript + Prisma + SQLite**.

---

## ✨ Features

- 🔄 **Workflow Orchestration**: Define multi-step tasks in JSON (like Zapier, but local).
- 🧰 **Pluggable Tools**: LLM (Ollama), File read/write, SQL queries, HTTP requests.
- 🖥 **Dashboard UI**: Next.js + Tailwind pages for running workflows & viewing logs.
- 📝 **Persistent Tasks**: SQLite via Prisma; every run stored with status + logs.
- 🛡 **Local-First**: Works offline with Ollama, no API keys required.

---

## 📂 Project Structure

.
app/ # Next.js App Router (frontend)
    ├─ workflows/ # Workflow runner UI
    ├─ tasks/ # Task list + detail pages
    └─ layout.tsx # Navbar + layout
├─ pages/api/ # API routes for workflows/tasks
├─ orchestrator/ # Core engine (workflowRunner, logger)
├─ tools/ # LLM, file, http, sql tools
├─ models/ # TS types for Workflow, Task
└─ db/ # Prisma SQLite wrapper
workflows/ # Example workflow JSONs
prisma/ # Prisma schema + migrations


---

## 🚀 Getting Started

### 1. Clone repo
```bash
git clone https://github.com/<your-username>/genAi102.git
cd genAi102

2. Install dependencies

npm install

3. Setup database

npx prisma migrate dev --name init

4. Run dev server

npm run dev

App runs at 👉 http://localhost:3000

### 🛠 Example Workflow

Save this as workflows/summarize.json:
```
{
  "name": "Summarize File",
  "steps": [
    { "id": "step1", "type": "file.read", "params": { "path": "docs/input.txt" } },
    { "id": "step2", "type": "llm.query", "params": { "prompt": "Summarize: {{step1}}" } },
    { "id": "step3", "type": "file.write", "params": { "path": "docs/output.txt", "input": "step2" } }
  ]
}
```
Run via API:
```bash
curl -X POST http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -d @workflows/summarize.json

Then open http://localhost:3000/tasks
```
to view logs.

## 📸 Screenshots

    Workflows UI → Paste JSON, run workflows.

    Tasks UI → Persistent history of runs.

    Task Detail → Pretty-printed logs with step-by-step output.

## 🧱 Architecture

- [Swagger API Docs (GitHub Pages)](https://luckyhegde6.github.io/genAi102/)
- [Example Workflows](https://luckyhegde6.github.io/genAi102/examples)
- [Architecture Diagram](docs/architecture.md)

## 🧪 Development

Run these scripts:
```
    npm run lint → ESLint check

    npm run build → Build Next.js app

    npm run test → (Jest or Vitest, WIP)

    npx prisma studio → Browse DB
```
For running the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## 🛠 Tools Used

    Next.js 14 – fullstack React framework

    Prisma + SQLite – persistence

    Ollama – local LLM runtime (Qwen, Gemma, DeepSeek)

    TailwindCSS – styling
    TypeScript – type safety
    Node.js – backend runtime
    VSCode – IDE
    GitHub – source control
    Postman / curl – API testing
    Figma – UI design

