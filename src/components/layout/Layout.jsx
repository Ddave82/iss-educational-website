import { BackToTopButton } from "../BackToTopButton";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout({ currentPath, children }) {
  return (
    <div className="site-shell">
      <Navbar currentPath={currentPath} />
      <main>{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
