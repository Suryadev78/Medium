import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogsRouter } from "../blogs/blogsRouter";
import { userRouter } from "../users/userRouter";

type ExtendedPrismaClient = ReturnType<typeof extendPrismaClient>;

function extendPrismaClient(prisma: PrismaClient) {
  return prisma.$extends(withAccelerate());
}

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: ExtendedPrismaClient;
  };
}>();

app.use("*", async (c, next) => {
  const prisma = extendPrismaClient(
    new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    })
  );
  c.set("prisma", prisma);
  await next();
});

app.route("/api/v1/users", userRouter);
app.route("/api/v1/blogs", blogsRouter);

export default app;
