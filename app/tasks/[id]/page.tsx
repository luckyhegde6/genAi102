import { db } from "@/db/sqlite";
import { notFound } from "next/navigation";
import React from "react";

// server component: fetch logs from DB
export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const task = await db.task.findUnique({
    where: { id: Number(params.id) },
  });

  if (!task) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Task #{task.id} – {task.name}</h1>
      <div className="bg-gray-100 p-4 rounded border">
        <p><strong>Status:</strong> 
          <span className={`ml-2 px-2 py-1 rounded text-white ${
            task.status === "success" ? "bg-green-600" : task.status === "failed" ? "bg-red-600" : "bg-yellow-500"
          }`}>
            {task.status}
          </span>
        </p>
        <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(task.updatedAt).toLocaleString()}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Logs</h2>
        <pre className="bg-black text-green-300 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed">
          {task.logs || "No logs available."}
        </pre>
      </div>
    </div>
  );
}
