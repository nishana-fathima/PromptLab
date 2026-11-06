import { GoogleGenAI } from "@google/genai";
import { env } from "../src/config.js";

if (!env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured in backend-node/.env");

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
for await (const model of await ai.models.list()) {
  if (model.supportedActions?.includes("generateContent")) {
    console.log(`${model.name?.replace(/^models\//, "")}\t${model.displayName || ""}`);
  }
}
