import { FeatureCard } from "../components/ui/FeatureCard";
import { PageHero } from "../components/ui/PageHero";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useI18n } from "../lib/i18n.jsx";

export function AboutDataPage() {
  const { t } = useI18n();

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
