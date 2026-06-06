import { Request, Response } from "express";
import axios from "axios";

export const askAI = async (req: Request, res: Response) => {
  try {
    const { action, code, language } = req.body;

    let prompt = "";

    switch (action) {
      case "explain":
        prompt = `Explain this ${language} code:\n\n${code}`;
        break;

      case "debug":
        prompt = `Find bugs in this ${language} code and provide fixes:\n\n${code}`;
        break;

      case "optimize":
        prompt = `Optimize this ${language} code for performance and readability:\n\n${code}`;
        break;

      case "review":
        prompt = `Review this ${language} code like a senior software engineer. Mention strengths, weaknesses, and improvements:\n\n${code}`;
        break;

      case "tests":
        prompt = `Generate test cases for this ${language} code:\n\n${code}`;
        break;

      default:
        prompt = code;
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      },
    );

    const text =
      response.data?.choices?.[0]?.message?.content || "No response generated.";

    return res.status(200).json({
      success: true,
      response: text,
    });
  } catch (error: any) {
    console.error("AI Error:", error?.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "AI request failed",
    });
  }
};
