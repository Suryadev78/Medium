import { Link } from "react-router-dom";
import { SignupSidebar } from "../assets/components/signup-sidebar";
import { useState } from "react";
export function Signup() {
  type SignUpInputs = {
    name: string;
    email: string;
    password: string;
  };
  const [postInputs, setPostInputs] = useState<SignUpInputs>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2">
        <div className="h-screen bg-slate-100 flex justify-center items-center ">
          <div className="w-80  bg-white rounded-md  ">
            <div className="flex flex-col items-center mt-3">
              <h2 className="text-2xl font-semibold">Create an account</h2>
            </div>
            <div className="pt-1">
              <p className="text-center text-base text-slate-500">
                Already have an account? <Link to={"/login"}>Login</Link>
              </p>
            </div>
            <div>
              <form className="flex flex-col  pl-2">
                <label className="font-semibold mt-2" htmlFor="firstName">
                  Username
                </label>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPostInputs({ ...postInputs, name: e.target.value });
                  }}
                  required
                  className="w-5/6 p-1 mt-1 border rounded-sm"
                  type="text"
                  placeholder="Username"
                />
                <label className="font-semibold mt-2" htmlFor="username">
                  Email
                </label>
                <input
                  required
                  className="w-5/6 p-1 mt-1 rounded-sm border"
                  type="text"
                  placeholder="abc@example.com"
                />
                <label className="font-semibold mt-2" htmlFor="password">
                  Password
                </label>

                <input
                  required
                  className="w-5/6 p-1 mt-1 rounded-sm border"
                  type="password"
                  placeholder="******"
                />
                <div className="flex justify-center items-center mt-4">
                  <button
                    type="submit"
                    className="bg-gray-950 w-5/6 rounded-md text-white font-semibold p-1"
                  >
                    Signup
                  </button>
                </div>
              </form>
            </div>
            <div className="text-sm flex pb-3 justify-center items-center mt-5">
              Already have an account? <Link to={"/login"}>Login</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <SignupSidebar />
      </div>
    </div>
  );
}
