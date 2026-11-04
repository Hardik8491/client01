import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  } catch {
    // Return safe fallback proxy if database is not yet migrated/generated
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        if (prop === "then") return undefined;
        return () =>
          new Proxy(
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
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
