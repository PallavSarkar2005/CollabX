import express from "express";

import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,

  baseURL: "https://openrouter.ai/api/v1",
});

router.post(
  "/chat",

  async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({
          error: "Prompt required",
        });
      }

      const completion = await client.chat.completions.create({
        model: "openai/gpt-oss-20b:free",

        messages: [
          {
            role: "system",

            content: `
                You are an expert AI coding assistant
                inside a collaborative IDE.

                Help users:
                - write code
                - debug code
                - explain code
                - optimize code
                - solve DSA problems

                Keep answers concise and developer-focused.
              `,
          },

          {
            role: "user",

            content: prompt,
          },
        ],
      });

      res.json({
        response: completion.choices[0].message.content,
      });
    } catch (error: any) {
      console.error("OpenRouter Error:", error);

      res.status(500).json({
        error: error?.message || "AI request failed",
      });
    }
  },
);

export default router;
