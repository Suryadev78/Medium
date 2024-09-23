import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL_BLOGS } from "../../config";
export function ReadBlogsComponent({}) {
  const [blog, setBlog] = useState<any>(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${BACKEND_URL_BLOGS}/${id}`)
      .then((res) => setBlog(res.data.blog))
      .catch((err) => alert(err.message));
  });
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div
        onClick={() => navigate("/blogs")}
        className="max-w-4xl w-full hover:cursor-pointer flex flex-col md:flex-row gap-4 p-4 border-b-2 border-gray-200"
      >
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
          <p className="text-gray-600 pb-1 text-sm">
            Posted on September 23, 2024
          </p>
          <p>{blog.content.slice(0, 300)}...</p>
        </div>
        <div className="flex-shrink-0">
          <h5 className="text-lg font-semibold mb-2">Author</h5>
          <div className="flex items-center">
            <div className="bg-slate-300 flex items-center justify-center font-semibold text-xl rounded-full w-12 h-12 mr-3">
              {blog.author && blog.author.length > 0 ? blog.author[0] : ""}
            </div>
            <div>
              <h2 className="text-xl font-bold">Jokester</h2>
              <p className="text-sm text-gray-700">
                Master of mirth, purveyor of puns, and keeper of the last laugh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
