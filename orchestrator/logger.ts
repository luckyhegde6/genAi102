export class Logger {
  private logs: string[] = [];

  log(message: string) {
    const entry = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getLogs() {
    return this.logs.join("\n");
  }
}
