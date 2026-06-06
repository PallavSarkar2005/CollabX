import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { v4 as uuid } from "uuid";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { sourceCode, language } = req.body;

    if (!sourceCode || !language) {
      return res.status(400).json({
        stderr: "Code and language are required",
      });
    }

    const jobId = uuid();

    const tempDir = path.join(process.cwd(), "temp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    let filePath = "";
    let command = "";

    switch (language) {
      case "javascript":
        filePath = path.join(tempDir, `${jobId}.js`);
        fs.writeFileSync(filePath, sourceCode);
        command = `node "${filePath}"`;
        break;

      case "typescript":
        filePath = path.join(tempDir, `${jobId}.ts`);
        fs.writeFileSync(filePath, sourceCode);
        command = `npx ts-node "${filePath}"`;
        break;

      case "python":
        filePath = path.join(tempDir, `${jobId}.py`);
        fs.writeFileSync(filePath, sourceCode);
        command = `python "${filePath}"`;
        break;

      case "java":
        filePath = path.join(tempDir, "Main.java");
        fs.writeFileSync(filePath, sourceCode);

        command = `cd /d "${tempDir}" && javac Main.java && java Main`;
        break;

      default:
        return res.status(400).json({
          stderr: `${language} is not supported yet`,
        });
    }

    exec(
      command,
      {
        timeout: 10000,
      },
      (error, stdout, stderr) => {
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          const classFile = path.join(tempDir, "Main.class");

          if (fs.existsSync(classFile)) {
            fs.unlinkSync(classFile);
          }
        } catch (cleanupError) {
          console.log("Cleanup Error:", cleanupError);
        }

        if (error) {
          return res.json({
            stderr: stderr || error.message,
          });
        }

        return res.json({
          stdout: stdout || "Program executed successfully.",
        });
      },
    );
  } catch (error: any) {
    return res.status(500).json({
      stderr: error.message || "Execution failed",
    });
  }
});

export default router;
