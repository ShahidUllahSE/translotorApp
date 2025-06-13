// src/controllers/translate.controller.ts
import { Request, Response } from 'express';
import { translateText } from '../services/translate.service';

export const translateHandler = async (req: Request, res: Response): Promise<any> => {
  const { text, sourceLang, targetLang } = req.body;

  if (!text || !sourceLang || !targetLang) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const translated = await translateText(text, sourceLang, targetLang);
    return res.json({ translated });
  } catch (error) {
    return res.status(500).json({ error: 'Translation failed' });
  }
};