"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSokectId = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: ['http://localhost:5173/'],
        methods: ["GET", "POST"],
    }
});
const userSocketMap = {};
exports.io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    const userId = socket.handshake.query.userId;
    if (userId !== undefined)
        userSocketMap[`${userId}`] = socket.id;
    // io.emit() is used to send events to all the connected clients
    exports.io.emit('getOnlineUser', Object.keys(userSocketMap));
    console.log(userSocketMap);
    //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        delete userSocketMap[`${userId}`];
        exports.io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
const getSokectId = (recevierId) => {
    return userSocketMap[`${recevierId}`];
};
exports.getSokectId = getSokectId;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send(200).json('Welcome');
});
app.use('/api/v1', routes_1.routers);
server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
