import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-semibold text-gray-800">
                Medium Clone
              </span>
            </div>
            <div className="flex  items-center">
              <img
                src="/Medium/frontend/public/1718366612733.jpg"
                alt="Suryadev Pandey"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="text-sm text-gray-500">
                Built by Suryadev Pandey
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-gray-900 mb-8">
          Read, Reflect, and Grow with Our Curated Blogs
        </h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          A place to read, write, and deepen your understanding
        </p>
        <button
          onClick={() => navigate("/blogs")}
          className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Start Reading
        </button>
      </main>
      <footer className="bg-gray-100 py-4">
        <p className="text-center text-gray-600 text-sm">
          &copy; 2023 Medium Clone. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
