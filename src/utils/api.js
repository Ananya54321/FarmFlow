import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const fetchGeminiResponse = async (prompt) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        params: { key: API_KEY },
        headers: { "Content-Type": "application/json" },
      }
    );

    // Extract the generated text from the response
    const generatedText = response.data.candidates[0].content.parts[0].text;
    return generatedText;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    throw error;
  }
};
