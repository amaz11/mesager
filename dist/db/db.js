"use strict";
// import { PrismaClient } from '@prisma/client'
Object.defineProperty(exports, "__esModule", { value: true });
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
// export const prisma =
//   globalForPrisma.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
const client_1 = require("@prisma/client");
const prismaClientSingleton = () => {
    return new client_1.PrismaClient();
};
const prisma = globalThis.prisma ?? prismaClientSingleton();
exports.default = prisma;
if (process.env.NODE_ENV !== 'production')
    globalThis.prisma = prisma;
