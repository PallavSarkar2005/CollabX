import express from "express";

import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,

  baseURL: "https://openrouter.ai/api/v1",
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt required",
      });
    }

    const completion = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content || "No response";

    res.json({ reply });
  } catch (error: any) {
    console.log("AI ROUTE ERROR:", error);

    res.status(500).json({
      error: "AI failed",
    });
  }
});

export default router;
