"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const authController_1 = require("../controller/authController");
const express_1 = require("express");
const authRoute = (0, express_1.Router)();
exports.authRoute = authRoute;
authRoute.post('/signup', authController_1.signup).post('/signin', authController_1.signin).get('/signout', authController_1.signout);
