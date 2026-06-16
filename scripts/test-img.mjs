import { experimental_generateImage as generateImage, generateText } from "ai";

const candidates = [
  { kind: "image", model: "google/imagen-4.0-fast-generate-001" },
  { kind: "image", model: "openai/gpt-image-1-mini" },
  { kind: "text", model: "google/gemini-2.5-flash-image" },
];

for (const c of candidates) {
  try {
    if (c.kind === "image") {
      const r = await generateImage({
        model: c.model,
        prompt: "A red apple on a white table, product photo",
      });
      console.log(`OK  ${c.model} -> ${r.images?.length ?? 0} imagem(ns)`);
    } else {
      const r = await generateText({
        model: c.model,
        prompt: "A red apple on a white table, product photo",
        maxRetries: 0,
      });
      const img = r.files?.find((f) => f.mediaType?.startsWith("image/"));
      console.log(`${img ? "OK " : "VAZIO"} ${c.model}`);
    }
  } catch (e) {
    console.log(`FALHA ${c.model}: ${String(e.message).slice(0, 90)}`);
  }
}
