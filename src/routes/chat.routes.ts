import express from 'express';
import { sendMessage, getConversation, getSentMessages } from '../controllers/chat.controller';
import { getReceivedMessages } from '../controllers/chat.controller';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/conversation/:user1/:user2', getConversation);
router.get('/messages/sent/:userId', getSentMessages);
router.get('/messages/received/:userId', getReceivedMessages);

export default router;
