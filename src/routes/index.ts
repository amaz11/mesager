import { Router } from "express";
import { authRoute } from "./authentication";
import messageRouter from "./message.route";

const routers = Router()

routers.use('/auth', authRoute);
routers.use('/message', messageRouter);

export { routers }