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
blogsRouter.get("/blog/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = c.get("prisma");
  try {
    const Blog = await prisma.blog.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return c.json({
      message: "Blog fetched successfully",
      blog: Blog,
    });
  } catch (e) {
    console.log(e);
    return c.json({
      message: "Failed to fetch blog",
    });
  }
});

blogsRouter.get("/user-blogs", async (c) => {
  const user = c.get("user");
  const prisma = c.get("prisma");
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: user.id as unknown as number,
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
      message: "User's blogs fetched successfully",
      blogs,
    });
  } catch (e) {
    console.log(e);
    return c.json({
      message: "Failed to fetch user's blogs",
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
