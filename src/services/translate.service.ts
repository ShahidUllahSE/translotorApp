// src/services/translate.service.ts
const translateModule = require('@vitalets/google-translate-api');

export const translateText = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  try {
    const result = await translateModule.translate(text, { from: sourceLang, to: targetLang });
    return result.text;
  } catch (error: any) {
    console.error('Translation error:', error.message || error);
    throw new Error('Translation failed');
  }
};





// const translate = require('@vitalets/google-translate-api');

// export const translateText = async (
//   text: string,
//   sourceLang: string,
//   targetLang: string
// ): Promise<string> => {
//   try {
//     const result = await translate(text, { from: sourceLang, to: targetLang });
//     return result.text;
//   } catch (error: any) {
//     console.error('Translation error:', error.message);
//     throw new Error('Translation failed');
//   }
// };
