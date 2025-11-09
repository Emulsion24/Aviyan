import { PrismaClient } from "@prisma/client";



export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"], // 🧩 Only log errors in production
  });

// ✅ Prevent re-instantiation during hot reloads in dev
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
