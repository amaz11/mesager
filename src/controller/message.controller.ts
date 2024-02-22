import { Request, Response } from "express";
import prisma from "../db/db";
const sendMessage = async (req: Request, res: Response) => {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = (req as any).user.id
    let conversation
    conversation = await prisma.conversation.findFirst({
        where: {
            AND: [
                { participant: { some: { id: receiverId } } },
                { participant: { some: { id: senderId } } }
            ]
        },
    })

    const data = await prisma.conversation.upsert({
        where: {
            id: conversation!.id,
        },
        create: {
            participant: {
                connect: [{ id: senderId }, { id: receiverId }]
            }
        },
        update: {
            message: {
                create: {
                    message,
                    receiverId,
                    senderId
                }
            }
        },
        include: {
            message: true
        }
    })

    res.status(201).json({ ok: true, message: "success", data });
}

export { sendMessage }