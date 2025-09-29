import type { NextApiRequest, NextApiResponse } from "next";
import { runWorkflow } from "../../orchestrator/workflowRunner";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const workflow = req.body;
    const result = await runWorkflow(workflow);
    res.status(200).json({ success: true, result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
