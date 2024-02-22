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


app.use('/api/v1', routers)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});