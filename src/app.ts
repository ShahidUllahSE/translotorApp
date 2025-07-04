import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // <-- Add this line

// import messageRoutes from "./routes/message.routes";
import translateRoutes from "./routes/translate.routes";
import userRoutes from "./routes/user.routes";
import chatRoutes from "./routes/chat.routes";

dotenv.config();

const app = express();

app.use(cors()); // <-- Enable CORS for all origins

app.use(express.json());

// Routes
// app.use("/api/messages", messageRoutes);
app.use("/api", translateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

export default app;
