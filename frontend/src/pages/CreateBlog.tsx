import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { BACKEND_URL_BLOGS } from "../config";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Blog {
  title: string;
  content: string;
}

export function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<Blog["title"]>("");
  const [content, setContent] = useState<Blog["content"]>("");

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }

  const handlePublish = async () => {
    try {
      if (title === "" || content === "") {
        toast.error("Please fill in all fields");
        return;
      }
      const response = await axios.post(
        `${BACKEND_URL_BLOGS}/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 201) {
        toast.success("Blog published successfully");
        navigate(`/read-blogs/${response.data.blog.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to publish blog");
    }
  };

  return (
    <div>
      <ToastContainer />
      <nav>
        <div className="flex justify-between pr-10 pl-10 pt-2 pb-2 items-center">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold ">Medium</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0 ">Draft</h1>
          <Button
            onClick={handlePublish}
            variant="contained"
            className="w-full sm:w-auto bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
          >
            Publish
          </Button>
        </header>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full text-3xl sm:text-4xl font-bold mb-4 p-4 focus:outline-none border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your story..."
          className="w-full min-h-[300px] sm:min-h-[500px] border border-gray-300 rounded-md p-4 shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
      </div>
    </div>
  );
}
