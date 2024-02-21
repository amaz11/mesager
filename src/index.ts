import express, { Express } from "express";
import dotenv from "dotenv";
import { routers } from "./routes";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// app.get("/", async (req: Request, res: Response) => {
//     const user = await prisma.user.create({
//         data: {
//             email: 'amaz@gmail.com',
//             name: 'amaz'
//         }
//     })
//     res.status(201).json({ ok: true, message: 'success', data: user });
// });

app.use('/api/v1', routers)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});