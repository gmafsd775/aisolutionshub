import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

try {
  const p = sessionStorage.getItem("spa-redirect");
  sessionStorage.removeItem("spa-redirect");
  if (p && p.startsWith("/") && !p.includes("//") && !p.includes("\\")) {
    window.history.replaceState(null, "", p);
  }
} catch {
  /* storage unavailable */
}

createRoot(document.getElementById("root")!).render(<App />);
