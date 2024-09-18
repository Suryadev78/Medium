import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogsRouter } from "../blogs/blogsRouter";
import { userRouter } from "../users/userRouter";
import { JWTPayload } from "hono/utils/jwt/types";
import { z } from "zod";
import { verify } from "hono/jwt";
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
    user: JWTPayload;
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
app.use("/api/v1/blogs/*", async (c, next) => {
  const token = await c.req.header("Authorization");
  if (token === null) {
    return c.json(
      {
        message: "token is required",
      },
      401
    );
  }
  try {
    const decoded = await verify(token ?? "", c.env.JWT_SECRET);
    if (!decoded) {
      return c.json(
        {
          message: "Unauthorized",
        },
        401
      );
    }
    console.log(decoded);
    await c.set("user", decoded);
    await next();
  } catch (e) {
    console.log(e);
    return c.json(
      {
        message: "Invalid token",
      },
      401
    );
  }
});

app.route("/api/v1/users", userRouter);
app.route("/api/v1/blogs", blogsRouter);

export default app;
