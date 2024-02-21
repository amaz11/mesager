import { Request, Response } from "express";
import prisma from "../db/db";
const sendMessage = async (req: Request, res: Response) => {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = (req as any).user.id
    let conversation
    conversation = await prisma.conversation.findMany({
        where: {
            userId: {
                hasSome: [senderId, receiverId]
            }
        }
    })

    if (!conversation) {
        conversation = await prisma.conversation.create({
            data: {
                participant: {
                    connect: [{ id: senderId }, { id: receiverId }]
                }
            }
        })
    }
    res.status(201).json("message send");
}

export { sendMessage }