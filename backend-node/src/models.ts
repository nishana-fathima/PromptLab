import { Schema, model } from "mongoose";

const variableSchema = new Schema({ name: { type: String, required: true }, description: String }, { _id: false });
const promptSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, title: { type: String, required: true, trim: true },
  description: { type: String, default: "" }, content: { type: String, required: true }, category: { type: String, default: "General", index: true },
  tags: { type: [String], default: [] }, variables: { type: [variableSchema], default: [] }, visibility: { type: String, enum: ["private", "public"], default: "private" },
}, { timestamps: true });
promptSchema.index({ owner: 1, updatedAt: -1 });
promptSchema.index({ title: "text", content: "text", tags: "text" });

const userSchema = new Schema({ email: { type: String, required: true, unique: true, lowercase: true, index: true }, passwordHash: { type: String, required: true }, name: { type: String, required: true } }, { timestamps: true });
const versionSchema = new Schema({ prompt: { type: Schema.Types.ObjectId, ref: "Prompt", required: true, index: true }, version: Number, content: String, changeDescription: String, updatedBy: { type: Schema.Types.ObjectId, ref: "User" } }, { timestamps: true });
const executionSchema = new Schema({ owner: { type: Schema.Types.ObjectId, ref: "User", index: true }, prompt: { type: Schema.Types.ObjectId, ref: "Prompt" }, provider: String, model: String, input: String, output: String, status: { type: String, enum: ["completed", "failed"], required: true }, tokenUsage: { input: Number, output: Number, total: Number }, durationMs: Number, error: String }, { timestamps: true });
executionSchema.index({ owner: 1, createdAt: -1 });
const comparisonSchema = new Schema({ owner: { type: Schema.Types.ObjectId, index: true }, leftPrompt: Schema.Types.ObjectId, rightPrompt: Schema.Types.ObjectId, input: String, results: Schema.Types.Mixed }, { timestamps: true });
const categorySchema = new Schema({ owner: { type: Schema.Types.ObjectId, index: true }, name: { type: String, required: true }, color: String }, { timestamps: true });
const settingsSchema = new Schema({ owner: { type: Schema.Types.ObjectId, unique: true }, dailyLimit: { type: Number, default: 100 } }, { timestamps: true });

export const User = model("User", userSchema);
export const Prompt = model("Prompt", promptSchema);
export const PromptVersion = model("PromptVersion", versionSchema);
export const AIExecution = model("AIExecution", executionSchema);
export const PromptComparison = model("PromptComparison", comparisonSchema);
export const PromptCategory = model("PromptCategory", categorySchema);
export const UserSettings = model("UserSettings", settingsSchema);
