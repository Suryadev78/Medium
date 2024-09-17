import { Hono } from "hono";

const userRouter = new Hono();

userRouter.get("/", (c) => {
  return c.text("Hello Hono!");
});

export { userRouter };
