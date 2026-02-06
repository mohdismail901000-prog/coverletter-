import OpenAI from "openai";

export const openai = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: process.env.GITHUB_TOKEN,
});

export const MODEL_NAME = "gpt-4o"; // Using gpt-4o as a proxy for the requested high-quality model
