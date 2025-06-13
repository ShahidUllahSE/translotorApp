import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalText: { type: String, required: true },
    translatedText: { type: String, required: true },
    sourceLang: { type: String, required: true },
    targetLang: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);
