import ReactDOM from "react-dom/client";
import { Root } from "./Root";
import "./styles/index.css";
import "./styles/mission-control.css";

const root = document.getElementById("root");
const app = <Root initialPath={root.dataset.prerenderedPath} />;

if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
