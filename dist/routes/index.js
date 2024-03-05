"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const express_1 = require("express");
const authentication_1 = require("./authentication");
const message_route_1 = __importDefault(require("./message.route"));
const user_router_1 = __importDefault(require("./user.router"));
const routers = (0, express_1.Router)();
exports.routers = routers;
routers.use('/auth', authentication_1.authRoute);
routers.use('/message', message_route_1.default);
routers.use('/users', user_router_1.default);
