import axios from "axios";

export const translateText = async (
  text: string,
  targetLang: string,
  sourceLang: string
): Promise<string> => {
  try {
    const response = await axios.post(
      "https://libretranslate.com/translate", // or .de if that works
      {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );

    return response.data.translatedText;
  } catch (err: any) {
    console.error("Translation failed:", err?.response?.data || err.message);
    return text; // fallback to original text
  }
};
