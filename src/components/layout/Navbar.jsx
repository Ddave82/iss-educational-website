import { useEffect, useState } from "react";
import { localizePath, useI18n } from "../../lib/i18n.jsx";

export function Navbar({ currentPath }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, languages, localizedPath, t } = useI18n();

  useEffect(() => {
    setIsOpen(false);
  }, [currentPath, language]);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <a className="brand-mark" href={localizedPath("/")} aria-label="ISS Explorer home">
        <img className="brand-logo" src="/isseducationlogo.png" alt="" aria-hidden="true" />
        <span>{t.common.brand}</span>
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
        <span className="sr-only">{t.common.menu}</span>
      </button>
      <div className={`nav-links${isOpen ? " is-open" : ""}`} id="primary-menu">
        {t.nav.map((item) => (
          <a
            href={localizedPath(item.href)}
            key={item.href}
            aria-current={currentPath === item.href ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
        <div className="language-switcher" aria-label="Language switcher">
          {languages.map((item) => (
            <a
              className={item.code === language ? "is-active" : ""}
              href={localizePath(currentPath, item.code)}
              hrefLang={item.htmlLang}
              key={item.code}
              aria-current={item.code === language ? "true" : undefined}
            >
              <span aria-hidden="true">{item.flag}</span>
              <strong>{item.shortLabel}</strong>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
