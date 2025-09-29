import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import fs from "fs";
import path from "path";

export default function ApiDocs() {
  console.log("Loading API docs...");
  console.log(process.cwd());
  const filePath = path.join(process.cwd(), "docs/openapi.json");
  const spec = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return <SwaggerUI spec={spec} />;
}
