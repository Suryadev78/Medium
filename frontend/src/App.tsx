import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/signup";
import { CreateBlog } from "./pages/CreateBlog";
import Login from "./pages/login";
import { HeroSection } from "./pages/HeroSection";
import { Blogs } from "./pages/blogs";
import { ReadBlogsComponent } from "./assets/components/ReadBlogs";
import { UserBlogs } from "./assets/components/userblogs";
function App() {
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
            <Route path="/write-blogs/" element={<CreateBlog />} />
            <Route path="/" element={<HeroSection />} />
            <Route path="/user-blogs" element={<UserBlogs />} />
            <Route path="/read-blogs/:id" element={<ReadBlogsComponent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
