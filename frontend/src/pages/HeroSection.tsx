import { Navbar } from "../assets/components/Navbar";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex flex-col gap-6 justify-center items-center flex-grow px-4 sm:px-6 lg:px-8">
        <div className="scroll-m-20 text-2xl sm:text-3xl md:text-4xl text-white font-extrabold tracking-tight text-center">
          <h1>" Read, Reflect, and Grow with Our Curated Blogs "</h1>
        </div>
        <div className="text-white flex flex-col gap-4 justify-center items-center">
          <p className="text-sm sm:text-base md:text-lg text-center">
            A Place to read, write and deepen your understanding
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="bg-slate-100 rounded-xl px-4 sm:px-5 py-2 text-black text-sm sm:text-base hover:bg-slate-200 transition-colors duration-300"
          >
            Start Reading
          </button>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4 text-center text-xs sm:text-sm">
        <p>&copy; 2023 Medium Clone. All rights reserved.</p>
      </footer>
    </div>
  );
}
