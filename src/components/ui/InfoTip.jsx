import { useEffect, useId, useRef, useState } from "react";
import { useI18n } from "../../lib/i18n.jsx";

export function InfoTip({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const wrapperRef = useRef(null);
  const { t } = useI18n();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <span
      className="info-tip"
      ref={wrapperRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        className="info-tip-trigger"
        aria-label={t.common.moreAbout(label)}
        aria-describedby={isOpen ? id : undefined}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        i
      </button>
      {isOpen ? (
        <span className="info-tip-popover" id={id} role="tooltip">
          <span>{children}</span>
          <button
            type="button"
            className="info-tip-close"
            aria-label={t.common.dismissInformation}
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </span>
      ) : null}
    </span>
  );
}
