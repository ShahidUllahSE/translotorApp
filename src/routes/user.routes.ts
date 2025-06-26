import express from 'express';
import { registerUser, getUsers, getUserById } from '../controllers/user.controller';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Get all users
router.get('/users', getUsers);

// Get user by ID
router.get('/users/:id', getUserById);

export default router;
