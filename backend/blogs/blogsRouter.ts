import { Hono } from "hono";
// import { authMiddleware } from "../middleware/auth";

const blogsRouter = new Hono();

blogsRouter.get("/bulk", async (c) => {
  return c.json({
    message: "Blogs fetched successfully",
  });
});

blogsRouter.post("/blog", async (c) => {
  const { payload } = await c.req.json();
  const { title, content } = payload;
});

blogsRouter.put("/blog/:id", async (c) => {
  const { id } = c.req.param();
});

blogsRouter.delete("/blog/:id", async (c) => {});

export { blogsRouter };
