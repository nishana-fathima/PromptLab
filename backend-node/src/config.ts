import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env") });

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1).default("mongodb://127.0.0.1:27017/promptlab"),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),
  JWT_ACCESS_SECRET: z.string().min(32).default("promptlab-development-access-secret-change-me"),
  JWT_REFRESH_SECRET: z.string().min(32).default("promptlab-development-refresh-secret-change-me"),
  AI_PROVIDER: z.literal("gemini").default("gemini"),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default("gemini-3.1-flash-lite"),
  MAX_AI_EXECUTIONS_PER_DAY: z.coerce.number().int().positive().default(100),
});

export const env = schema.parse(process.env);
export const geminiConfigured = env.AI_PROVIDER === "gemini" && Boolean(env.GEMINI_API_KEY?.trim());

if (env.NODE_ENV === "production" && (
  env.JWT_ACCESS_SECRET.includes("development") ||
  env.JWT_REFRESH_SECRET.includes("development")
)) {
  throw new Error("JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be configured in production");
}
