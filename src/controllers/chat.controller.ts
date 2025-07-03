import { Request, Response } from 'express';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { translateText } from '../services/translate.service';

// export const sendMessage = async (req: Request, res: Response):Promise<any> => {
//   try {
//     const { senderId, receiverId, text, sourceLang, targetLang } = req.body;

//     if (!senderId || !receiverId || !text || !sourceLang || !targetLang) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     /* (optional) confirm the users exist */
//     const [sender, receiver] = await Promise.all([
//       User.findById(senderId),
//       User.findById(receiverId),
//     ]);
//     if (!sender || !receiver)
//       return res.status(404).json({ error: 'Sender or receiver not found' });

//     // translate to the language requested in the body
//     const translatedText = await translateText(text, sourceLang, targetLang);

//     const message = new Message({
//       senderId,
//       receiverId,
//       originalText: text,
//       translatedText,
//       sourceLang,
//       targetLang,
//     });

//     await message.save();
//     res.status(201).json(message);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to send message' });
//   }
// };


interface AuthenticatedRequest extends Request {
  user?: { userId: string; email: string };
}

export const sendMessage = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
  try {
    const { receiverId, text, sourceLang } = req.body;

    const senderId = req.user?.userId;
    if (!senderId || !receiverId || !text || !sourceLang) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [sender, receiver] = await Promise.all([
      User.findById(senderId),
      User.findById(receiverId),
    ]);

    if (!sender || !receiver)
      return res.status(404).json({ error: 'Sender or receiver not found' });

    // Determine translation language based on receiver location
    let targetLang: string;
    const location = receiver.location?.toLowerCase() || '';

    if (location.includes('peshawar')) {
      targetLang = 'ps'; // Pashto
    } else if (location.includes('rawalpindi') || location.includes('islamabad')) {
      targetLang = 'pa'; // Punjabi
    } else if (location.includes('sindh')) {
      targetLang = 'sd'; // Sindhi
    } else {
      targetLang = 'ur'; // Urdu
    }

    const translatedText = await translateText(text, sourceLang, targetLang);

    const message = new Message({
      senderId,
      receiverId,
      originalText: text,
      translatedText,
      sourceLang,
      targetLang,
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
};


/* unchanged */
export const getConversation = async (req: Request, res: Response) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
};


export const getSentMessages = async (req: Request, res: Response) => {
    const { userId } = req.params;
  
    try {
      const messages = await Message.find({ senderId: userId }).sort({ createdAt: -1 });
      res.json(messages);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch sent messages' });
    }
  };
  
// src/controllers/message.controller.ts

export const getReceivedMessages = async (req: Request, res: Response):Promise<any> => {
    const { userId } = req.params;
  
    try {
      const messages = await Message.find({ receiverId: userId }).populate('senderId');
      return res.json(messages);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };
  