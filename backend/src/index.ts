import { Hono } from "hono";
import { blogsRouter } from "../blogs/blogsRouter";
import { userRouter } from "../users/userRouter";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";

const app = new Hono();
// type Env = {
//   DATABASE_URL: string;
// };

app.route("/api/v1/users", userRouter);
app.route("/api/v1/blogs", blogsRouter);

export const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

export default app;
