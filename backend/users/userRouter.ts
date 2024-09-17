import { Hono } from "hono";
import { authMiddleware } from "../auth/auth";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const userRouter = new Hono();
const userInfo = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type userInfovalidate = z.infer<typeof userInfo>;

userRouter.post("/signup", async (c) => {
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
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return c.json(
      {
        message: "User created successfully",
        user,
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
