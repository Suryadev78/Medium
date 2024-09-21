import { TfiWrite } from "react-icons/tfi";

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
      <div className="flex items-center">
        <div className="flex w-[70%] bg-slate-200 flex-col pt-4">
          <div className="flex gap-2">
            <button> + f0llowing</button>
            <button> + f0llowing</button>
          </div>
        </div>
      </div>
    </div>
  );
}
