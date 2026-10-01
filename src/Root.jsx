import { StrictMode } from "react";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";

// Keep server markup and the browser's first render identical, including useId paths.
export function Root({ initialPath }) {
  return <StrictMode>
    <App initialPath={initialPath} />
    <Analytics mode={import.meta.env.DEV ? "development" : "production"} />
  </StrictMode>;
}
