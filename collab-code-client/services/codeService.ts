import axios from "axios";

export const runCode = async (code: string, language: string) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/code/run",

      {
        code,
        language,
      },
    );

    return response.data;
  } catch (error: any) {
    console.error(error);

    return {
      stdout: "",

      stderr: "Execution failed",
    };
  }
};
