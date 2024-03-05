"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = exports.signin = exports.signup = void 0;
const db_1 = __importDefault(require("../db/db"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = require("../secret");
const signup = async (req, res) => {
    const { email, password, conPassword, name } = req.body;
    if (!email || !password || !conPassword || !name) {
        return res.status(406).json({ ok: false, message: "Fill the form" });
    }
    const user = await db_1.default.user.findUnique({
        where: {
            email
        }
    });
    if (user) {
        return res.status(406).json({ ok: false, message: "User alrady exits" });
    }
    if (password !== conPassword) {
        return res.status(406).json({ ok: false, message: "Password don't match" });
    }
    const bycryctPassword = await (0, bcryptjs_1.hash)(password, 10);
    const data = await db_1.default.user.create({
        data: {
            email,
            name,
            password: bycryctPassword
        },
        select: {
            id: true,
            email: true,
            name: true
        }
    });
    return res.status(201).json({ ok: true, message: "success", data });
};
exports.signup = signup;
const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(406).json({ ok: false, message: "Fill the form" });
    }
    const user = await db_1.default.user.findUnique({
        where: {
            email
        },
    });
    if (!user) {
        return res.status(401).json({ ok: false, message: "Invalid Information" });
    }
    const passwordComparer = await (0, bcryptjs_1.compare)(password, user.password);
    if (!passwordComparer) {
        res.status(401).json({ ok: false, message: "Invalid Information" });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, secret_1.JWT_SECRET_KEY, { expiresIn: "2d" });
    const userWithOutPassword = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    return res.status(200).json({ ok: true, message: "success", data: userWithOutPassword, token });
};
exports.signin = signin;
const signout = async (req, res) => {
    return res.send(200).json({ ok: true, message: 'success' });
};
exports.signout = signout;
