import { TfiWrite } from "react-icons/tfi";
import axios from "axios";
import { BACKEND_URL_BLOGS } from "../config";
import { useEffect, useState } from "react";
import { BlogsComponent } from "../assets/components/Blogs";
import { useNavigate } from "react-router-dom";

interface Blog {
  id: string;
  author: string;
  title: string;
  content: string;
  createdAt?: string;
}

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchBlogs() {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BACKEND_URL_BLOGS}/bulk`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setBlogs(response.data.blogs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs. Please try again later.");
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, [navigate]);

  const SkeletonBlog = () => (
    <div className="max-w-2xl mx-auto my-4 p-4 border border-gray-200 rounded-md">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );

  return (
    <div>
      <div
        onClick={() => navigate("/login")}
        className="bg-slate-100 shadow-2xl"
      >
        <div className="p-1 px-4 flex justify-between">
          <h1 className="text-2xl text-black font-semibold">Medium</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <TfiWrite className="text-black" />
              <button className="text-black">Write</button>
            </div>
            <button className="bg-gray-800 text-sm w-9 h-9 rounded-full text-white font-semibold">
              A
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <>
          <SkeletonBlog />
          <SkeletonBlog />
          <SkeletonBlog />
        </>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-semibold text-red-500">{error}</h1>
        </div>
      ) : blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogsComponent
            id={blog.id}
            key={blog.id}
            author={blog.author}
            title={blog.title}
            content={blog.content}
            date={blog.createdAt ?? ""}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-semibold">No blogs found</h1>
        </div>
      )}
    </div>
  );
}
