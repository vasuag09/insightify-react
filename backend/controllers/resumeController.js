// backend/controllers/resumeController.js
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCWwSzy-0ZvHDUEjGp4rVJe_1XwUcikTLk");

exports.parseResume = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const data = await pdfParse(fileBuffer);
    const extractedText = data.text;

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-latest" });

    const prompt = `Extract structured job-related fields like name, email, skills, experience, education, etc. from this resume:\n\n${extractedText} and return **only a JSON object**, no explanation or formatting.`;

    const result = await model.generateContent(prompt);
    const parsedText = result.response.text();

    res.json({ summary: parsedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to parse resume", error: err.message });
  }
};
