import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Blogs } from "./pages/blogs";
import { CreateBlog } from "./pages/CreateBlog";
import Login from "./pages/login";
import { HeroSection } from "./pages/HeroSection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />}>
              {" "}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/" element={<HeroSection />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
