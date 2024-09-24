import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL_BLOGS } from "../../config";
import { TfiWrite } from "react-icons/tfi";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export function ReadBlogsComponent() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${BACKEND_URL_BLOGS}/blog/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-slate-100 shadow-2xl">
        <div className="p-1 px-4 flex justify-between">
          <h1 className="text-2xl text-black font-semibold">Medium</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <TfiWrite className="text-black" />
              <button
                onClick={() => navigate("/write-blogs/" + blog.author.name)}
                className="text-black"
              >
                Write
              </button>
            </div>
            <button className="bg-gray-800 text-sm w-9 h-9 rounded-full text-white font-semibold">
              {blog.author.name[0].toUpperCase()}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
          <p className="text-gray-600 pb-1 text-sm">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-4">{blog.content}</p>
        </div>
        <div className="flex-shrink-0 md:w-64">
          <div className="flex items-center mb-4">
            <div className="bg-slate-300 flex items-center justify-center font-semibold text-xl rounded-full w-12 h-12 mr-3">
              {blog.author.name[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold">{blog.author.name}</h2>
              <p className="text-sm text-gray-700">Author</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
