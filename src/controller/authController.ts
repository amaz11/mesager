import { Request, Response } from "express";
import prisma from "../db/db"
import { hash, compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "../secret";

const signup = async (req: Request, res: Response) => {
    const { email, password, conPassword, name } = req.body
    if (!email || !password || !conPassword || !name) {

        return res.status(406).json({ ok: false, message: "Fill the form" })
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (user) {
        return res.status(406).json({ ok: false, message: "User alrady exits" })
    }

    if (password !== conPassword) {
        return res.status(406).json({ ok: false, message: "Password don't match" })
    }

    const bycryctPassword = await hash(password, 10)
    const data = await prisma.user.create({
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
    })

    return res.status(201).json({ ok: true, message: "success", data })
}

const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(406).json({ ok: false, message: "Fill the form" })
    }
    const user = await prisma.user.findUnique({
        where: {
            email
        },
    })

    if (!user) {
        return res.status(401).json({ ok: false, message: "Invalid Information" })
    }
    const passwordComparer = await compare(password, user!.password)
    if (!passwordComparer) {
        res.status(401).json({ ok: false, message: "Invalid Information" })
    }
    const token = jwt.sign({ id: user!.id }, JWT_SECRET_KEY, { expiresIn: "2d" })
    const userWithOutPassword = {
        id: user!.id,
        email: user!.email,
        name: user!.name,
    }
    return res.status(200).json({ ok: true, message: "success", data: userWithOutPassword, token })
}

const signout = async (req: Request, res: Response) => {
    return res.send(200).json({ ok: true, message: 'success' })
}


export { signup, signin, signout }