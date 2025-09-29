import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        🤖 Agentic Task Automator
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-10">
        Local-first AI orchestrator that runs multi-step workflows with LLMs,
        file I/O, SQL, and HTTP tools. Built with Next.js, Prisma, and Ollama.
      </p>

      <div className="grid gap-4 sm:grid-cols-3 w-full max-w-3xl">
        <Link
          href="/workflows"
          className="p-6 bg-white shadow-md rounded-lg border hover:shadow-lg transition"
        >
          <h2 className="font-semibold text-xl mb-2">⚡ Workflows</h2>
          <p className="text-gray-600">
            Trigger workflows by pasting JSON definitions.
          </p>
        </Link>

        <Link
          href="/tasks"
          className="p-6 bg-white shadow-md rounded-lg border hover:shadow-lg transition"
        >
          <h2 className="font-semibold text-xl mb-2">📋 Tasks</h2>
          <p className="text-gray-600">
            View all executed tasks and inspect logs.
          </p>
        </Link>

        <Link
          href="/api/docs"
          className="p-6 bg-white shadow-md rounded-lg border hover:shadow-lg transition"
        >
          <h2 className="font-semibold text-xl mb-2">📖 API Docs</h2>
          <p className="text-gray-600">
            Explore the REST API with Swagger UI.
          </p>
        </Link>
      </div>

      <footer className="mt-12 text-gray-500 text-sm">
        Built with Next.js • Prisma • Ollama
      </footer>
    </div>
  );
}
