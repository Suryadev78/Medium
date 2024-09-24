import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL_BLOGS } from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
}

export function UserBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const deleteBlog = async (blogid: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.delete(
        `${BACKEND_URL_BLOGS}/blog/${blogid}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response) {
        setBlogs(blogs.filter((blog) => blog.id !== blogid));
        toast.success("Blog deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting blog");
    }
  };

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${BACKEND_URL_BLOGS}/user-blogs`, {
          headers: {
            Authorization: token,
          },
        });
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't written any blogs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-semibold mb-2 truncate">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.content}
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-0">
                <button
                  onClick={() => navigate(`/read-blogs/${blog.id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
                >
                  Read More
                </button>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
