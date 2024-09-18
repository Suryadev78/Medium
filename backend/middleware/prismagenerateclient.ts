// import { Hono } from "hono";
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

// // Update the type definition
// type ExtendedPrismaClient = ReturnType<typeof getPrismaClient>;

// function getPrismaClient(url: string) {
//   return new PrismaClient({
//     datasourceUrl: url,
//   }).$extends(withAccelerate());
// }

// export const prismagenerateclient = new Hono<{
//   Bindings: {
//     DATABASE_URL: string;
//   };
//   Variables: {
//     prisma: ExtendedPrismaClient;
//   };
// }>();

// prismagenerateclient.use(async (c, next) => {
//   const prisma = getPrismaClient(c.env.DATABASE_URL);
//   c.set("prisma", prisma);
//   await next();
// });
