import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-slate-50 shadow-lg rounded-md">
        <div className="text-center pt-4 font-semibold text-2xl">
          <h1>SignIn</h1>
        </div>
        <div className="px-4 pt-3 pb-8">
          <form className="flex flex-col">
            <label className="pt-2" htmlFor="email">
              Enter Your Email
            </label>
            <input
              className="w-full p-2 mt-1 border rounded-sm"
              type="email"
              placeholder="abc@gmail.com"
            />
            <label className="pt-4" htmlFor="password">
              Enter Your Password
            </label>
            <input
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
