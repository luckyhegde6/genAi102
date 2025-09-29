export type Task = {
  id: number;
  name: string;
  status: "running" | "success" | "failed";
  logs?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
