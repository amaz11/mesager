import { Router } from "express";
import { protectedRoute } from "../middleware/protectedRote";
import { getUsers } from "../controller/user.controller";

const userRouter = Router()

userRouter.get('/', protectedRoute, getUsers)

export default userRouter