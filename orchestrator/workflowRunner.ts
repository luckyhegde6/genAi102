import { PrismaClient } from "@prisma/client";
import { Logger } from "./logger";

// Tools
import { fileRead, fileWrite } from "../tools/fileTool";
import { llmQuery } from "../tools/llmTool";
import { httpGet } from "../tools/httpTool";
import { sqlQuery } from "../tools/sqlTool";

const prisma = new PrismaClient();

type Step = {
  id: string;
  type: string;
  params: Record<string, any>;
};

type Workflow = {
  name: string;
  steps: Step[];
};

export async function runWorkflow(workflow: Workflow) {
  const logger = new Logger();
  logger.log(`Workflow started: ${workflow.name}`);

  // 1. Create DB entry for the task
  const task = await prisma.task.create({
    data: {
      name: workflow.name,
      status: "running",
    },
  });

  const context: Record<string, any> = {};

  try {
    for (const step of workflow.steps) {
      let output: any;
      logger.log(`Running step ${step.id} (${step.type})...`);

      switch (step.type) {
        case "file.read":
          output = fileRead(step.params.path);
          break;

        case "file.write":
          output = fileWrite(step.params.path, context[step.params.input]);
          break;

        case "llm.query":
          // Replace placeholders {{stepId}} with previous outputs
          const prompt = step.params.prompt.replace(
            /{{(.*?)}}/g,
            (_, key) => context[key]?.toString() || ""
          );
          output = await llmQuery(prompt);
          break;

        case "http.get":
          output = await httpGet(step.params.url);
          break;

        case "sql.query":
          output = await sqlQuery(step.params.query);
          break;

        default:
          throw new Error(`Unknown step type: ${step.type}`);
      }

      // Save step result in context
      context[step.id] = output;

      // Log step output (truncate long outputs for DB safety)
      const preview = typeof output === "string" ? output.slice(0, 500) : JSON.stringify(output).slice(0, 500);
      logger.log(`Step ${step.id} output: ${preview}`);
    }

    // 2. Update DB entry as success
    await prisma.task.update({
      where: { id: task.id },
      data: {
        status: "success",
        logs: logger.getLogs(),
      },
    });

    logger.log("Workflow completed successfully.");
    return context;

  } catch (error: any) {
    logger.log(`Error: ${error.message}`);

    // 3. Update DB entry as failed
    await prisma.task.update({
      where: { id: task.id },
      data: {
        status: "failed",
        logs: logger.getLogs(),
      },
    });

    throw error;
  }
}
