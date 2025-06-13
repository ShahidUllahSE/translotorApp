import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import messageRoutes from "./routes/message.routes";
import translateRoutes from "./routes/translate.routes";
import userRoutes from "./routes/user.routes";
import chatRoutes from "./routes/chat.routes";

dotenv.config();

const app = express();
app.use(express.json());
// app.use("/api/messages", messageRoutes);
app.use("/api", translateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);

export default app;
// 684c58cf28a966c235f6a51b
// 684c58e528a966c235f6a51e