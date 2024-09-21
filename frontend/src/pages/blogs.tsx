import { TfiWrite } from "react-icons/tfi";
export function Blogs() {
  return (
    <div>
      <div className="h-full bg-gray-900 shadow-2xl">
        <div className="p-2 flex justify-between">
          <h1 className="text-2xl text-white font-semibold"> Medium</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <div className="text-white">
                <TfiWrite />
              </div>
              <div>
                <button className="text-white"> Write</button>
              </div>
            </div>
            <button className="bg-slate-100  text-sm w-9 h-9 rounded-full text-black font-semibold">
              A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
