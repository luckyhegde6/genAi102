import ollama from "ollama";

export async function queryLLM(prompt: string) {
  const response = await ollama.chat({
    model: "qwen3:4b",   // or gemma:4b, deepseek-r1:1.5b
    messages: [{ role: "user", content: prompt }]
  });
  return response.message?.content ?? "";
}
