import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Blogs } from "./pages/blogs";

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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
