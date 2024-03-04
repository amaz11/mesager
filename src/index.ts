import express, { Express } from "express";
import dotenv from "dotenv";
import { routers } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors"
import http from "http";
import { Server } from "socket.io";
dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();

const server = http.createServer(app)
export const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173/'],
        methods: ["GET", "POST"],
    }
})

const userSocketMap: any = {}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id)
    const userId = socket.handshake.query.userId

    if (userId !== undefined) userSocketMap[`${userId}`] = socket.id

    // io.emit() is used to send events to all the connected clients
    io.emit('getOnlineUser', Object.keys(userSocketMap))
    console.log(userSocketMap);

    //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        delete userSocketMap[`${userId}`];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export const getRecevierSokectId = (recevierId: string) => {
    return userSocketMap[`${recevierId}`]
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())


app.use('/api/v1', routers)



server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});