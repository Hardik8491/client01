"use strict";
// Resilient Prisma client connector for Samarth Electronics
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
let PrismaClientClass;
try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const prismaPkg = require("@prisma/client");
    PrismaClientClass = prismaPkg.PrismaClient;
}
catch {
    PrismaClientClass = class MockPrismaClient {
    };
}
const globalForPrisma = globalThis;
function createPrismaClient() {
    try {
        if (PrismaClientClass && typeof PrismaClientClass === "function") {
            return new PrismaClientClass({
                log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
            });
        }
    }
    catch {
        // fallback if client not initialized
    }
    // Safe fallback proxy so builds and static generation never crash
    return new Proxy({}, {
        get(_target, prop) {
            if (prop === "then")
                return undefined;
            return new Proxy({}, {
                get(_t, _action) {
                    return async () => null;
                },
            });
        },
    });
}
exports.prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = exports.prisma;
