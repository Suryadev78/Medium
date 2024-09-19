import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { JWTPayload } from "hono/utils/jwt/types";
import {
  blogCreationInput,
  blogUpdateInput,
  blogDeleteInput,
} from "@suryadev78220/common";

const blogsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    prisma: PrismaClient;
    user: JWTPayload;
  };
}>();

blogsRouter.get("/bulk", async (c) => {
  const { user } = c.get("user");
  const prisma = c.get("prisma");
  console.log(user);
  const blogs = await prisma.blog.findMany();
  return c.json({
    message: "Blogs fetched successfully",
    blogs,
    user: user,
  });
});

blogsRouter.get("/search", async (c) => {
  const prisma = c.get("prisma");
  const query = c.req.query("q") || "";

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return c.json({
      message: "Blogs fetched successfully",
      query: query,
      blogs,
    });
  } catch (e) {
    console.error("Search error:", e);
    return c.json({ message: "Failed to search blogs", e }, 500);
  }
});

// To use this search endpoint:
// 1. Make a GET request to /search
// 2. Include the search term as a query parameter: ?q=your_search_term
// Example: GET /search?q=technology
// This will search for blogs with "technology" in the title or content

blogsRouter.put("/blog/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = c.get("prisma");
  const payload = await c.req.json();
  const isPayloadValid = blogUpdateInput.safeParse(payload);
  if (!isPayloadValid.success) {
    return c.json(
      {
        message: "Invalid Inputs",
      },
      400
    );
  }
  const { title, content } = isPayloadValid.data;
  try {
    const updatedBlog = await prisma.blog.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
      },
    });
    return c.json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (e) {
    console.log(e);
    return c.json({
      message: "Failed to update blog",
    });
  }
});

blogsRouter.post("/blog", async (c) => {
  const prisma = c.get("prisma");
  const payload = await c.req.json();
  const isPayloadValid = blogCreationInput.safeParse(payload);
  if (!isPayloadValid.success) {
    return c.json(
      {
        message: "Invalid Inputs",
      },
      400
    );
  }
  const { title, content } = isPayloadValid.data;
  const user = c.get("user") as { id: number };
  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
    });
    return c.json(
      {
        message: "Blog created successfully",
        blog,
      },
      201
    );
  } catch (e) {
    console.log(e);
    return c.json(
      {
        message: "Failed to create blog",
      },
      500
    );
  }
});

blogsRouter.put("/blog/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = await c.get("prisma");
  const payload = await c.req.json();
  const isPayloadValid = blogUpdateInput.safeParse(payload);
  if (!isPayloadValid.success) {
    return c.json(
      {
        message: "Invalid Inputs",
      },
      400
    );
  }
  const { title, content } = isPayloadValid.data;
  try {
    const updatedBlog = await prisma.blog.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
      },
    });
    return c.json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (e) {
    console.log(e);
    return c.json(
      {
        message: "Failed to update blog",
      },
      500
    );
  }
});

blogsRouter.delete("/blog/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = c.get("prisma");
  const isIdValid = blogDeleteInput.safeParse(id);
  if (!isIdValid.success) {
    return c.json(
      {
        message: "Invalid Inputs",
      },
      400
    );
  }
  try {
    const deletedBlog = await prisma.blog.delete({
      where: {
        id: parseInt(id),
      },
    });
    return c.json({
      message: "Blog deleted successfully",
      blog: deletedBlog,
    });
  } catch (e) {
    console.log(e);
    return c.json(
      {
        message: "Failed to delete blog",
      },
      500
    );
  }
});

export { blogsRouter };
