import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// Factory function to create a PrismaClient instance extended with Accelerate
const prismaClientSingleton = () => {
  // Create a new PrismaClient instance
  const prismaClient = new PrismaClient();

  // Extend the PrismaClient instance with Prisma Accelerate
  const prismaWithAccelerate = prismaClient.$extends(withAccelerate());

  return prismaWithAccelerate;
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

// Use the extended Prisma client with Accelerate or create a new one if it doesn't exist
const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

// Reassign the Prisma client in global scope in non-production environments
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
