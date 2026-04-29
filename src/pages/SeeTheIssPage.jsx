import { PassPredictionPanel } from "../components/PassPredictionPanel";
import { LivestreamSection } from "../components/sections/LivestreamSection";
import { FeatureCard } from "../components/ui/FeatureCard";
import { PageHero } from "../components/ui/PageHero";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useI18n } from "../lib/i18n.jsx";

export function SeeTheIssPage() {
  const { localizedPath, t } = useI18n();

  return (
    <>
      <PageHero kicker={t.see.kicker} title={t.see.title}>
        {t.see.intro}
      </PageHero>

      <section className="content-section split-section">
        <div>
          <SectionHeader kicker={t.see.lookupKicker} title={t.see.lookupTitle}>
            {t.see.lookupIntro}
          </SectionHeader>
          <p className="fine-print">{t.see.finePrint}</p>
          <div className="hero-actions">
            <a className="button-secondary" href={localizedPath("/tracker")}>
              {t.see.trackerLink}
            </a>
          </div>
        </div>
        <article className="panel">
          <h2>{t.see.estimatorTitle}</h2>
          <PassPredictionPanel />
        </article>
      </section>

      <section className="learning-section">
        <SectionHeader kicker={t.see.tipsKicker} title={t.see.tipsTitle}>
          {t.see.tipsIntro}
        </SectionHeader>
        <div className="feature-grid">
          {t.see.tips.map((tip) => (
            <FeatureCard title={tip.title} key={tip.title}>
              {tip.body}
            </FeatureCard>
          ))}
        </div>
        <div className="observation-strip" aria-label={t.see.sequenceAria}>
          {t.see.sequence.map((step, index) => (
            <span key={step}>
              {step}
              {index < t.see.sequence.length - 1 ? <strong aria-hidden="true">→</strong> : null}
            </span>
          ))}
        </div>
      </section>

      <LivestreamSection
        title={t.tracker.liveTitle}
        intro={t.see.liveIntro}
        fallbackActions={t.see.fallback}
      />
    </>
  );
}
