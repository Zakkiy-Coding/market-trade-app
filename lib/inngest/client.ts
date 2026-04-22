import { Inngest } from "inngest";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is required for Inngest AI functions");
}

export const inngest = new Inngest({
    id: "zaktradeapp",
    ai: { gemini: { apiKey: GEMINI_API_KEY } },
    eventKey: process.env.INNGEST_EVENT_KEY,
    env: process.env.INNGEST_ENV
})