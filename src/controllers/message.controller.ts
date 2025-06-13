// import { Request, Response } from "express";
// import Message from "../models/message.model";
// import User from "../models/user.model";
// import { translateText } from "../utils/translate"; // LibreTranslate

// // POST /api/messages/send
// export const sendMessage = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { sender, receiver, message, preferredLanguage } = req.body;

//     if (!sender || !receiver || !message || !preferredLanguage) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     console.log("Translating message...");
//     const translatedText =
//       preferredLanguage === "en"
//         ? message
//         : await translateText(message, preferredLanguage, "en");

//     console.log(`Translated: ${message} -> ${translatedText}`);

//     // Save sender's language preference (optional)
//     await User.findOneAndUpdate(
//       { username: sender },
//       { preferredLanguage },
//       { upsert: true, new: true }
//     );

//     const newMessage = await Message.create({
//       sender,
//       receiver,
//       originalText: message,
//       translatedText,
//       originalLanguage: "en",
//       translatedLanguage: preferredLanguage,
//     });

//     res.status(201).json(newMessage);
//   } catch (err: any) {
//     console.error("Message send failed:", err.message);
//     res.status(500).json({ error: "Message send failed", detail: err.message });
//   }
// };

// // GET /api/messages/received?username=userB
// export const getReceivedMessages = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { username } = req.query;

//     if (!username) {
//       return res.status(400).json({ error: "Username is required" });
//     }

//     const messages = await Message.find({ receiver: username });

//     const simplifiedMessages = messages.map((msg) => ({
//       sender: msg.sender,
//       originalText: msg.originalText,
//       translatedText: msg.translatedText,
//       originalLanguage: msg.originalLanguage,
//       translatedLanguage: msg.translatedLanguage,
//     }));

//     res.status(200).json(simplifiedMessages);
//   } catch (err: any) {
//     console.error("Failed to fetch messages:", err.message);
//     res.status(500).json({ error: "Failed to fetch messages", detail: err.message });
//   }
// };
