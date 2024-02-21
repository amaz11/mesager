import { signin, signup, signout } from "../controller/authController";
import { Router } from "express";

const authRoute = Router()

authRoute.post('/signup', signup).post('/signin', signin).get('/signout', signout)

export { authRoute }