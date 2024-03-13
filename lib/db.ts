import { PrismaClient } from "@prisma/client";
// declare a global variable for prisma CLient called prisma 
declare global {
    var prisma: PrismaClient | undefined;
}
//in production mode we look for globalThis.prisma if it is not there we create a new instance of prisma

export const db = globalThis.prisma || new PrismaClient();
//if we are in development or in any other mode we will assign  globalThis.prisma to db

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// we do this because hot reload  in development mode every time we will save a file  new prisma instance will be
//created and we will have memory leak and globalThis will not be  effected by hot reload 
