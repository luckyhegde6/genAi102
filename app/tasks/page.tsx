"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Task = {
  id: number;
  name: string;
  status: string;
  createdAt: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.tasks || []);
    }
    fetchTasks();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-100">
              <td className="border p-2">
                <Link href={`/tasks/${task.id}`} className="text-blue-600 hover:underline">
                  {task.id}
                </Link>
              </td>
              <td className="border p-2">{task.name}</td>
              <td className="border p-2">{task.status}</td>
              <td className="border p-2">{new Date(task.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
