import { protectedRoute } from "../middleware/protectedRote";
import { getMessage, sendMessage } from "../controller/message.controller";
import { Router } from "express";

const messageRouter = Router()

messageRouter.post('/send/:id', protectedRoute, sendMessage).get("/:id", protectedRoute, getMessage)

export default messageRouter