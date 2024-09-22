import { TfiWrite } from "react-icons/tfi";
import { ReadBlogsComponent } from "../assets/components/ReadBlogs";

export function Blogs() {
  return (
    <div>
      <div className=" bg-slate-100 shadow-2xl">
        <div className="p-1 px-4 flex justify-between">
          <h1 className="text-2xl text-black font-semibold"> Medium</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <div className="text-black">
                <TfiWrite />
              </div>
              <div>
                <button className="text-black"> Write</button>
              </div>
            </div>
            <button className="bg-gray-800  text-sm w-9 h-9 rounded-full text-white font-semibold">
              A
            </button>
          </div>
        </div>
      </div>
      <ReadBlogsComponent author="Jokester" />
    </div>
  );
}
