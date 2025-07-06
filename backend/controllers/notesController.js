const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyCWwSzy-0ZvHDUEjGp4rVJe_1XwUcikTLk");

exports.generateNoteInsight = async (noteContent) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-pro-latest",
    });

    const prompt = `You're an assistant that provides insights based on notes. Here's the note: "${noteContent}". Summarize it or provide helpful suggestions.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("❌ Error generating AI note insight:", error.message);
    return "Sorry, I couldn't generate insights for this note.";
  }
};
