import axios from "axios";

export const askAI = async (prompt: string) => {
  const response = await axios.post(
    "http://localhost:5000/api/ai/chat",

    { prompt },
  );

  return response.data.response;
};
