import { GoogleGenAI } from "@google/genai";
import { env } from "~/config";

/**
 * Google GenAI client instance.
 */
export const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
