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
    if (!conversation) {
        conversation = await prisma.conversation.create({
            data: {
                participant: {
                    connect: [{ id: senderId }, { id: receiverId }]
                }
            }


        })
    }
    const data = await prisma.conversation.update({
        where: {
            id: conversation?.id,
        },
        data: {
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

const getMessage = async (req: Request, res: Response) => {
    const { id: receiverId } = req.params
    const senderId = (req as any).user.id
    const conversation = await prisma.conversation.findFirst({
        where: {
            AND: [
                { participant: { some: { id: receiverId } } },
                { participant: { some: { id: senderId } } }
            ]
        },
        include: {
            message: {
                include: {
                    receiver: true,
                    sender: true
                }
            }
        }
    })

    res.status(200).json({
        ok: true,
        messsage: "success",
        data: conversation
    })
}

export { sendMessage, getMessage }