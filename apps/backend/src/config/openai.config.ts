import { registerAs } from "@nestjs/config";

export interface OpenAIConfigType {
  apiKey: string;
}

export default registerAs(
  "openai",
  (): OpenAIConfigType => ({
    apiKey: process.env.OPENAI_API_KEY,
  }),
);
