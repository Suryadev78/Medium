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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full bg-white shadow-md">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-3xl text-gray-800 font-bold">Medium</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-gray-600 transition-colors duration-200">
              <TfiWrite className="text-gray-700" />
              <button
                onClick={() => navigate("/write-blogs/")}
                className="text-gray-700 hover:text-gray-900"
              >
                Write
              </button>
            </div>
            <button
              onClick={() => navigate("/user-blogs")}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Your Blogs
            </button>
            <button className="bg-gray-800 text-sm w-10 h-10 rounded-full text-white font-semibold hover:bg-gray-700 transition-colors duration-200"></button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 p-6 bg-white shadow-lg rounded-lg mt-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {blog.title}
          </h1>
          <p className="text-gray-600 pb-2 text-sm">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <div className="mt-6 text-gray-700 leading-relaxed">
            {blog.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 md:w-64">
          <div className="flex items-center mb-4 bg-gray-50 p-4 rounded-lg">
            <div className="bg-gray-300 flex items-center justify-center font-semibold text-xl rounded-full w-14 h-14 mr-4 text-gray-700">
              {blog.author.name[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {blog.author.name}
              </h2>
              <p className="text-sm text-gray-600">Author</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
