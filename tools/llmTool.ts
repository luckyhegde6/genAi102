import ollama from "ollama";

export async function llmQuery(prompt: string, model = "qwen3:4b") {
  const response = await ollama.chat({
    model,
    messages: [{ role: "user", content: prompt }],
  });

  return response.message?.content ?? "";
}
