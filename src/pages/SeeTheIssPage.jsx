import { PassPredictionPanel } from "../components/PassPredictionPanel";
import { LivestreamSection } from "../components/sections/LivestreamSection";
import { FeatureCard } from "../components/ui/FeatureCard";
import { PageHero } from "../components/ui/PageHero";
import { SectionHeader } from "../components/ui/SectionHeader";

const viewingTips = [
  {
    title: "Best time to look",
    body: "Shortly after sunset or before sunrise."
  },
  {
    title: "What it looks like",
    body: "A bright, steady moving point of light."
  },
  {
    title: "What direction to look",
    body: "Use the pass prediction direction and watch the sky path."
  },
  {
    title: "What makes a good pass",
    body: "High above the horizon, several minutes long, and under clear skies."
  },
  {
    title: "What can block visibility",
    body: "Clouds, haze, buildings, trees, city glare, or Earth's shadow."
  },
  {
    title: "How it differs from aircraft",
    body: "It usually does not blink and moves smoothly."
  }
];

const visualGuideSteps = [
  "Bright dot",
  "Steady movement",
  "Disappears in shadow"
];

export function SeeTheIssPage() {
  return (
    <>
      <PageHero kicker="Viewing guide" title="See the ISS from Earth">
        Learn when and how to see the International Space Station from your
        location.
      </PageHero>

      <section className="content-section split-section">
        <div>
          <SectionHeader kicker="Pass lookup" title="Can you see it soon?">
            Enter your coordinates or use browser location permission to
            estimate visible ISS pass candidates for the next 48 hours.
          </SectionHeader>
          <p className="fine-print">
            Predictions use current TLE orbital data in the browser. They are
            educational estimates, not official viewing alerts. Re-check close
            to viewing time and use local sky conditions.
          </p>
          <div className="hero-actions">
            <a className="button-secondary" href="/tracker">
              Open live tracker
            </a>
          </div>
        </div>
        <article className="panel">
          <h2>Visible pass estimator</h2>
          <PassPredictionPanel />
        </article>
      </section>

      <section className="learning-section">
        <SectionHeader kicker="Observing tips" title="How to spot the station">
          Use the pass estimator first, then scan for a steady bright point
          moving across the predicted sky path.
        </SectionHeader>
        <div className="feature-grid">
          {viewingTips.map((tip) => (
            <FeatureCard title={tip.title} key={tip.title}>
              {tip.body}
            </FeatureCard>
          ))}
        </div>
        <div className="observation-strip" aria-label="Compact ISS viewing sequence">
          {visualGuideSteps.map((step, index) => (
            <span key={step}>
              {step}
              {index < visualGuideSteps.length - 1 ? <strong aria-hidden="true">→</strong> : null}
            </span>
          ))}
        </div>
      </section>

      <LivestreamSection
        title="Live station view"
        intro="Watch NASA's live ISS stream when available, then use the viewing guide to understand when the station might be visible from Earth."
        fallbackActions={[
          { label: "Open live tracker", href: "/tracker" },
          { label: "Explore NASA gallery", href: "/gallery" }
        ]}
      />
    </>
  );
}
