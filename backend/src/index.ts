import { Hono } from "hono";
import { blogsRouter } from "../blogs/blogsRouter";
import { userRouter } from "../users/userRouter";

const app = new Hono();

app.route("/api/v1/users", userRouter);
app.route("/api/v1/blogs", blogsRouter);

export default app;
