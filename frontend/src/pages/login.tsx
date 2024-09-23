import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL_USERS } from "../config";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginInputs>();
  type LoginInputs = {
    email: string;
    password: string;
  };
  async function loginInfo(data: LoginInputs) {
    try {
      const response = await axios.post(`${BACKEND_URL_USERS}/login`, data);
      if (response) {
        console.log(response);
        localStorage.setItem("token", response.data.token);

        // Set token expiration time to 1 hour from now
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds
        localStorage.setItem("tokenExpiration", expirationTime.toString());

        // Set up a timer to remove the token after 1 hour
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          // Optionally, redirect to login page
          navigate("/login");
        }, 60 * 60 * 1000); // 1 hour in milliseconds

        navigate("/blogs");
      } else {
        alert("An error occurred while logging in");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert("Invalid Credentials");
      }
      console.error(error);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-slate-50 shadow-lg rounded-md">
        <div className="text-center pt-4 font-semibold text-2xl">
          <h1>SignIn</h1>
        </div>
        <div className="px-4 pt-3 pb-8">
          <form className="flex flex-col" onSubmit={handleSubmit(loginInfo)}>
            <label className="pt-2" htmlFor="email">
              Enter Your Email
            </label>
            <input
              {...register("email")}
              className="w-full p-2 mt-1 border rounded-sm"
              type="email"
              placeholder="abc@gmail.com"
            />
            <label className="pt-4" htmlFor="password">
              Enter Your Password
            </label>
            <input
              {...register("password")}
              className="w-full p-2 mt-1 border rounded-sm"
              type="password"
              placeholder="password"
            />
            <div className="flex justify-center pt-6">
              <button className="w-full p-2 bg-gray-950 text-white mt-1 border rounded-md">
                Login
              </button>
            </div>
          </form>
          <p className="pt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-600 hover:underline">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
