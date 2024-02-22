import { Router } from "express";
import { authRoute } from "./authentication";
import messageRouter from "./message.route";
import userRouter from "./user.router";

const routers = Router()

routers.use('/auth', authRoute);
routers.use('/message', messageRouter);
routers.use('/users', userRouter)

export { routers }