"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const db_1 = __importDefault(require("../db/db"));
const getUsers = async (req, res) => {
    const { id: logedInUser } = req.user;
    const data = await db_1.default.user.findMany({
        where: {
            id: { not: logedInUser }
        },
        select: {
            id: true,
            email: true,
            name: true,
        },
    });
    res.status(200).json({ ok: true, message: "success", data });
};
exports.getUsers = getUsers;
