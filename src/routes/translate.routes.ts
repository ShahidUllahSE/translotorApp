// src/routes/translate.routes.ts
import express from 'express';
import { translateHandler } from '../controllers/translate.controller';

const router = express.Router();

router.post('/translate', translateHandler);

export default router;
