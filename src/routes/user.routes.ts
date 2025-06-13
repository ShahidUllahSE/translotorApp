import express from 'express';
import { registerUser, getUsers } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', registerUser);
router.get('/users', getUsers);

export default router;
