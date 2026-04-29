import { translations, useI18n } from "../../lib/i18n.jsx";

export const dataSources = translations.en.footer.dataSources;

export function Footer({ compact = false }) {
  const { localizedPath, t } = useI18n();

  return (
    <footer className={`source-section${compact ? " source-section-compact" : ""}`}>
      {!compact ? (
        <div className="footer-hero">
          <div>
            <span className="section-kicker">{t.footer.kicker}</span>
            <h2>{t.footer.title}</h2>
            <p>{t.footer.intro}</p>
          </div>
          <div className="footer-actions" aria-label="Footer shortcuts">
            {t.footer.actions.map((action) => (
              <a href={localizedPath(action.href)} key={action.href}>
                {action.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <div className="footer-lower">
        <div className="footer-link-row" aria-label="Footer navigation">
          {t.nav.slice(1).map((link) => (
            <a href={localizedPath(link.href)} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        {!compact ? (
          <div className="source-grid">
            {t.footer.dataSources.map((source) => (
              <a
                className="source-card"
                href={source.href}
                target="_blank"
                rel="noreferrer"
                key={source.href}
              >
                <strong>{source.label}</strong>
                <span>{source.description}</span>
              </a>
            ))}
          </div>
        ) : null}

        <p className="footer-note">{t.footer.note}</p>
      </div>
    </footer>
  );
}
