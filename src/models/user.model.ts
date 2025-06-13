import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // preferredLanguage removed – or make it optional:
  // preferredLanguage: { type: String }
});

export const User = mongoose.model('User', userSchema);
