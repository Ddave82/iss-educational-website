import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Live Tracker", href: "/tracker" },
  { label: "Learn", href: "/learn" },
  { label: "See the ISS", href: "/see-the-iss" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Data", href: "/about-data" }
];

export function Navbar({ currentPath }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <a className="brand-mark" href="/" aria-label="ISS Explorer home">
        <span className="brand-orbit" />
        <span>ISS Explorer</span>
      </a>
      <button
        type="button"
        className="nav-menu-button"
        aria-controls="primary-menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
        <span className="sr-only">Menu</span>
      </button>
      <div className={`nav-links${isOpen ? " is-open" : ""}`} id="primary-menu">
        {navItems.map((item) => (
          <a
            href={item.href}
            key={item.href}
            aria-current={currentPath === item.href ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
