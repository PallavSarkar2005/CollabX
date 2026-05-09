import express from "express";

import fs from "fs";

import path from "path";

import { exec } from "child_process";

import { v4 as uuid } from "uuid";

const router = express.Router();

router.post(
  "/run",

  async (req, res) => {
    try {
      const { code, language } = req.body;

      const jobId = uuid();

      const tempDir = path.join(__dirname, "../../temp");

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      let filePath = "";

      let command = "";

      if (language === "javascript") {
        filePath = path.join(tempDir, `${jobId}.js`);

        fs.writeFileSync(filePath, code);

        command = `node "${filePath}"`;
      } else if (language === "java") {
        const className = "Main";

        filePath = path.join(tempDir, `${className}.java`);

        fs.writeFileSync(filePath, code);

        command = `cd "${tempDir}" && javac ${className}.java && java ${className}`;
      } else {
        return res.status(400).json({
          stderr: "Language not supported yet",
        });
      }

      exec(
        command,

        (error, stdout, stderr) => {
          try {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          } catch {}

          if (error) {
            return res.json({
              stderr: stderr || error.message,
            });
          }

          return res.json({
            stdout,
          });
        },
      );
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        stderr: "Execution failed",
      });
    }
  },
);

export default router;
