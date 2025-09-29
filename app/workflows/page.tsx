"use client";

import { useState } from "react";

export default function WorkflowsPage() {
  const [workflow, setWorkflow] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function runWorkflow() {
    setLoading(true);
    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: workflow,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Run a Workflow</h1>
      <textarea
        className="w-full h-60 p-2 border rounded"
        placeholder="Paste workflow JSON here..."
        value={workflow}
        onChange={(e) => setWorkflow(e.target.value)}
      />
      <button
        onClick={runWorkflow}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Running..." : "Run Workflow"}
      </button>

      {result && (
        <div className="bg-white p-4 border rounded mt-4">
          <h2 className="font-bold mb-2">Result:</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
