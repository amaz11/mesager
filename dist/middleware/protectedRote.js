"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const secret_1 = require("../secret");
const db_1 = __importDefault(require("../db/db"));
// headers.authorization.split(" ")[1]
const protectedRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split("Bearer ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }
        const decoded = jwt.verify(token, secret_1.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        const user = await db_1.default.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                email: true,
                name: true,
            }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.protectedRoute = protectedRoute;
