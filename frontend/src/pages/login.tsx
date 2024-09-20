import { SignIn, SignUp } from "@clerk/clerk-react";
export function Login() {
  return (
    <>
      <div className="auth-container">
        <h1>Welcome to Medium</h1>
        <div className="auth-options">
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </div>
      </div>
    </>
  );
}
