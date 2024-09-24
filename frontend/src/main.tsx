import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const publicKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!publicKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

createRoot(document.getElementById("root")!).render(<App />);
