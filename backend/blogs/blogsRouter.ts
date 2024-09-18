import { Hono } from "hono";
import { JWTPayload } from "hono/utils/jwt/types";
// import { authMiddleware } from "../middleware/auth";

const blogsRouter = new Hono<{
  Variables: {
    user: JWTPayload;
  };
}>();

blogsRouter.get("/bulk", async (c) => {
  const { user } = c.get("user");
  console.log(user);
  return c.json({
    message: "Blogs fetched successfully",
    user: c.get("user"),
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
