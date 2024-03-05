"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protectedRote_1 = require("../middleware/protectedRote");
const user_controller_1 = require("../controller/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get('/', protectedRote_1.protectedRoute, user_controller_1.getUsers);
exports.default = userRouter;
