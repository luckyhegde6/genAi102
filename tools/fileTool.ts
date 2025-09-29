import { readFileSync, writeFileSync } from "fs";

export function fileRead(path: string): string {
  return readFileSync(path, "utf-8");
}

export function fileWrite(path: string, content: string): string {
  writeFileSync(path, content, "utf-8");
  return `Written to ${path}`;
}
