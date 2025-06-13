import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const registerUser = async (req: Request, res: Response):Promise<any> => {
  try {
    const { username, preferredLanguage } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username already exists' });

    const user = new User({ username, preferredLanguage });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};
