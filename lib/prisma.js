import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "production"
        ? ["error"] // ✅ Only log errors in production
        : ["query", "error"], // ✅ Log queries & errors in dev
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
