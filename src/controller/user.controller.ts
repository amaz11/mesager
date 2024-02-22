import { Request, Response } from "express"
import prisma from "../db/db"

const getUsers = async (req: Request, res: Response) => {
    const { id: logedInUser } = (req as any).user
    const data = await prisma.user.findMany({
        where: {
            id: { not: logedInUser }
        },
        select: {
            id: true,
            email: true,
            name: true,
        },

    }
    )
    res.status(200).json({ ok: true, message: "success", data })
}

export { getUsers }