# 🧱 Architecture – Agentic Task Automator

This project is designed as a **local-first workflow orchestrator**.  

It combines:
- **Next.js (frontend + API routes)** for UI + API layer.  
- **Workflow Runner** (custom orchestrator) for executing tasks.  
- **Tools** (LLM, File, HTTP, SQL) for real-world actions.  
- **SQLite (via Prisma)** for persistence of tasks + logs.  

---

## ⚙️ High-Level Flow

```mermaid
flowchart TD
    U[👩 User] -->|Define workflow JSON| API[Next.js API]
    API --> ORCH[⚙️ Workflow Runner]
    ORCH --> T1[📄 File Tool]
    ORCH --> T2[🤖 LLM Tool (Ollama)]
    ORCH --> T3[🌐 HTTP Tool]
    ORCH --> T4[🗄 SQL Tool]
    ORCH --> DB[(SQLite DB)]
    DB --> UI[🖥 Dashboard UI]
    UI --> U