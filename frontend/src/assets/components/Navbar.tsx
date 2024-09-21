export function Navbar() {
  return (
    <div className="p-1 flex justify-between">
      <h1 className="text-2xl text-white font-semibold">Medium</h1>
      <div className="flex gap-5">
        <button className="text-white">Signin</button>
        <button className="bg-slate-100 py-2 px-3 text-sm rounded-2xl text-black font-semibold">
          Get Started
        </button>
      </div>
    </div>
  );
}
