import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import { decode, sign, verify } from "hono/jwt";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

const userInfo = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type userInfovalidate = z.infer<typeof userInfo>;

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });
  const payload: userInfovalidate = await c.req.json();
  if (!payload) {
    return c.json(
      {
        message: "Payload is required",
      },
      400
    );
  }
  try {
    const { name, email, password } = payload;
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist) {
      return c.json({
        message: "User already exist",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(
      {
        message: "User created successfully",
        user,
        token,
      },
      201
    );
  } catch (error) {
    console.log(error);
    return c.json({
      message: "User creation failed",
    });
  }
});

userRouter.post("/login", authMiddleware, async (c) => {});

export { userRouter };
