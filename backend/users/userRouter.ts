import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import { sign } from "hono/jwt";
import { signInInput, signupInput } from "@suryadev78220/common";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: PrismaClient;
  };
}>();

async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

async function comparePassword(password: string, hashedPassword: string) {
  const inputhash = await hashPassword(password);
  return inputhash === hashedPassword;
}

const userInfo = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type userInfovalidate = z.infer<typeof userInfo>;

userRouter.post("/signup", async (c) => {
  const prisma = c.get("prisma");

  const body = await c.req.json();
  const payload = signupInput.safeParse(body);
  if (!payload.success) {
    return c.json(
      {
        message: "Invalid Inputs",
        errors: payload.error.errors,
      },
      400
    );
  }
  try {
    const { name, email, password } = payload.data;
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist) {
      return c.json(
        {
          message: "User already exists",
        },
        400
      );
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
    console.error("Error in signup route:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
});

userRouter.post("/login", async (c) => {
  const prisma = c.get("prisma");
  const payload = await c.req.json();
  const payloadData = signInInput.safeParse(payload);
  if (!payloadData.success) {
    return c.json(
      {
        message: "Invalid Inputs",
      },
      400
    );
  }
  const { email, password } = payloadData.data;
  if (!email || !password) {
    return c.json(
      {
        message: "Invalid Inputs",
      },
      400
    );
  }
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExists) {
      return c.json(
        {
          message: "User not found",
        },
        404
      );
    }
    const isPasswordValid = await comparePassword(
      password,
      userExists.password
    );
    if (!isPasswordValid) {
      return c.json(
        {
          message: "Invalid password",
        },
        401
      );
    } else {
      const token = await sign({ id: userExists.id }, c.env.JWT_SECRET);
      return c.json(
        {
          message: "User logged in successfully",
          user: {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
          },
          token,
        },
        200
      );
    }
  } catch (error) {
    console.error("Error in login route:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
});
export { userRouter };
