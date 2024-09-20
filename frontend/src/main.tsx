import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
const publicKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!publicKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={publicKey} afterSignOutUrl="/login">
      <App />
    </ClerkProvider>
  </StrictMode>
);
