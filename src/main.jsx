import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import "./styles/index.css";
import "./styles/mission-control.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Analytics mode={import.meta.env.DEV ? "development" : "production"} />
  </React.StrictMode>
);
