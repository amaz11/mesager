"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protectedRote_1 = require("../middleware/protectedRote");
const message_controller_1 = require("../controller/message.controller");
const express_1 = require("express");
const messageRouter = (0, express_1.Router)();
messageRouter.post('/send/:id', protectedRote_1.protectedRoute, message_controller_1.sendMessage).get("/:id", protectedRote_1.protectedRoute, message_controller_1.getMessage);
exports.default = messageRouter;
