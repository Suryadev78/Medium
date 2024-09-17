import { Hono } from "hono";
import { authMiddleware } from "../auth/auth";

const blogsRouter = new Hono();

blogsRouter.get("/blogs/bulk", authMiddleware, async (c) => {});

blogsRouter.post("/blog", authMiddleware, async (c) => {
  const { payload } = await c.req.json();
  const { title, content } = payload;
});

blogsRouter.put("/blog/:id", authMiddleware, async (c) => {
  const { id } = c.req.param();
});

blogsRouter.delete("/blog/:id", authMiddleware, async (c) => {
  const { id } = c.req.param();
});

export { blogsRouter };
