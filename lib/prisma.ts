import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

// Use globalThis to avoid TS errors in development
const prisma = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV === "development") globalThis.prisma = prisma

export default prisma