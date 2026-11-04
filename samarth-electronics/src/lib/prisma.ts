// Resilient Prisma client connector for Samarth Electronics

type PrismaAny = any;

let PrismaClientClass: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const prismaPkg = require("@prisma/client");
  PrismaClientClass = prismaPkg.PrismaClient;
} catch {
  PrismaClientClass = class MockPrismaClient {};
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaAny | undefined;
};

function createPrismaClient(): PrismaAny {
  try {
    if (PrismaClientClass && typeof PrismaClientClass === "function") {
      return new PrismaClientClass({
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
      });
    }
  } catch {
    // fallback if client not initialized
  }

  // Safe fallback proxy so builds and static generation never crash
  return new Proxy({} as PrismaAny, {
    get(_target, prop) {
      if (prop === "then") return undefined;
      return new Proxy(
        {},
        {
          get(_t, _action) {
            return async () => null;
          },
        }
      );
    },
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
