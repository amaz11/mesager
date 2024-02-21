import { protectedRoute } from "../middleware/protectedRote";
import { sendMessage } from "../controller/message.controller";
import { Router } from "express";

const messageRouter = Router()

messageRouter.post('/send/:id', protectedRoute, sendMessage)

export default messageRouter