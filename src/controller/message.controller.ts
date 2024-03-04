import { Request, Response } from "express";
import prisma from "../db/db";
import { getSokectId, io } from "../index";

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
    const messageUpdate = await prisma.conversation.update({
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
            message: {
                include: {
                    receiver: true,
                    sender: true
                },
                orderBy: {
                    createAt: 'desc'
                },
            }
        }
    })
    const newMessage = messageUpdate?.message[0]
    const recevierSokectId: string = getSokectId(receiverId)
    const senderSokectId: string = getSokectId(senderId)
    if (recevierSokectId !== null || recevierSokectId) {
        io.to(recevierSokectId).emit('newMessage', newMessage)
    }
    io.to(senderSokectId).emit('myMessage', newMessage)
    res.status(201).json({ ok: true, message: "success", });
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
                },
                orderBy: {
                    createAt: 'desc'
                }
            },
        },

    })

    res.status(200).json({
        ok: true,
        messsage: "success",
        data: conversation
    })
}

export { sendMessage, getMessage }