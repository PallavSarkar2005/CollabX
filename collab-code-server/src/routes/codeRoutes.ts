import express from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { v4 as uuid } from "uuid";

const router = express.Router();

const execAsync = promisify(exec);

router.post("/run", async (req, res) => {
  let filePath = "";
  let classFile = "";

  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        stderr: "Code and language are required",
      });
    }

    const jobId = uuid();

    const tempDir = path.join(process.cwd(), "temp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    let command = "";

    switch (language) {
      case "javascript":
        filePath = path.join(tempDir, `${jobId}.js`);

        fs.writeFileSync(filePath, code);

        command = `node "${filePath}"`;
        break;

      case "python":
        filePath = path.join(tempDir, `${jobId}.py`);

        fs.writeFileSync(filePath, code);

        command = `python "${filePath}"`;
        break;

      case "java": {
        const className = `Main${jobId.replace(/-/g, "")}`;

        const javaCode = code.replace(
          /public\s+class\s+Main/g,
          `public class ${className}`,
        );

        filePath = path.join(tempDir, `${className}.java`);

        classFile = path.join(tempDir, `${className}.class`);

        fs.writeFileSync(filePath, javaCode);

        command = `cd "${tempDir}" && javac "${className}.java" && java ${className}`;

        break;
      }

      default:
        return res.status(400).json({
          stderr: `${language} is not supported`,
        });
    }

    const { stdout, stderr } = await execAsync(command, {
      timeout: 5000,
      maxBuffer: 1024 * 1024,
    });

    return res.json({
      stdout,
      stderr,
    });
  } catch (error: any) {
    return res.status(500).json({
      stderr: error.stderr || error.message || "Execution failed",
    });
  } finally {
    try {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      if (classFile && fs.existsSync(classFile)) {
        fs.unlinkSync(classFile);
      }
    } catch {}
  }
});

export default router;
