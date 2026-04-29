import { useEffect, useState } from "react";
import { useI18n } from "../lib/i18n.jsx";

const SHOW_AFTER_PX = 720;

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    function updateVisibility() {
      setIsVisible(window.scrollY > SHOW_AFTER_PX);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <button
      type="button"
      className={`back-to-top${isVisible ? " is-visible" : ""}`}
      onClick={handleClick}
      aria-label={t.common.backToTop}
    >
      ↑
    </button>
  );
}
