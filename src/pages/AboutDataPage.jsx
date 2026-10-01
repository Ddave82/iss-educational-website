import { missionCopy } from "../lib/missionCopy.js";
import { FeatureCard } from "../components/ui/FeatureCard";
import { PageHero } from "../components/ui/PageHero";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useI18n } from "../lib/i18n.jsx";

export function AboutDataPage() {
  const { t, language } = useI18n();
  const copy = missionCopy[language];

  return (
    <>
      <PageHero kicker={t.about.kicker} title={t.about.title}>
        {t.about.intro}
      </PageHero>

      <section className="content-section">
        <SectionHeader kicker={t.about.sourcesKicker} title={t.about.sourcesTitle}>
          {t.about.sourcesIntro}
        </SectionHeader>
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
      </section>

      <section className="content-section station-data-notes">
        <h2>{copy.dataTitle}</h2><p>{copy.dataBody}</p><p>{copy.orbitData}</p>
        <div className="source-grid">
          <a className="source-card" href="https://www.nasa.gov/blogs/spacestation/feed/" target="_blank" rel="noreferrer">NASA Station RSS ↗</a>
          <a className="source-card" href="https://www.nasa.gov/blogs/spacestation/feed/?category_name=iss-research" target="_blank" rel="noreferrer">NASA Research RSS ↗</a>
          <a className="source-card" href="https://github.com/corquaid/international-space-station-APIs" target="_blank" rel="noreferrer">People in Space ↗</a>
          <a className="source-card" href="https://earthobservatory.nasa.gov/images/79765/night-lights-2012-flat-map" target="_blank" rel="noreferrer">NASA Earth at Night · 2012 ↗</a>
        </div>
      </section>
      <section className="learning-section">
        <SectionHeader kicker={t.about.limitsKicker} title={t.about.limitsTitle}>
          {t.about.limitsIntro}
        </SectionHeader>
        <div className="feature-grid">
          {t.about.notes.map((note) => (
            <FeatureCard title={note.title} key={note.title}>
              {note.body}
            </FeatureCard>
          ))}
        </div>
      </section>
    </>
  );
}
