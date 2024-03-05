"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.sendMessage = void 0;
const db_1 = __importDefault(require("../db/db"));
const index_1 = require("../index");
const sendMessage = async (req, res) => {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    let conversation;
    conversation = await db_1.default.conversation.findFirst({
        where: {
            AND: [
                { participant: { some: { id: receiverId } } },
                { participant: { some: { id: senderId } } }
            ]
        },
    });
    if (!conversation) {
        conversation = await db_1.default.conversation.create({
            data: {
                participant: {
                    connect: [{ id: senderId }, { id: receiverId }]
                }
            }
        });
    }
    const messageUpdate = await db_1.default.conversation.update({
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
    });
    const newMessage = messageUpdate?.message[0];
    const recevierSokectId = (0, index_1.getSokectId)(receiverId);
    const senderSokectId = (0, index_1.getSokectId)(senderId);
    if (recevierSokectId !== null || recevierSokectId) {
        index_1.io.to(recevierSokectId).emit('newMessage', newMessage);
    }
    index_1.io.to(senderSokectId).emit('myMessage', newMessage);
    res.status(201).json({ ok: true, message: "success", });
};
exports.sendMessage = sendMessage;
const getMessage = async (req, res) => {
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    const conversation = await db_1.default.conversation.findFirst({
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
    });
    res.status(200).json({
        ok: true,
        messsage: "success",
        data: conversation
    });
};
exports.getMessage = getMessage;
