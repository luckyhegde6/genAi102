export type WorkflowStep = {
  id: string;                          // unique step id
  type: "file.read" | "file.write" | "llm.query" | "http.get" | "sql.query"; 
  params: Record<string, any>;         // step-specific config
};

export type Workflow = {
  name: string;                        // human-readable name
  steps: WorkflowStep[];
};
