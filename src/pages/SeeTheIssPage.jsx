import { PassPredictionPanel } from "../components/PassPredictionPanel";
import { FeatureCard } from "../components/ui/FeatureCard";
import { PageHero } from "../components/ui/PageHero";
import { SectionHeader } from "../components/ui/SectionHeader";

const viewingTips = [
  {
    title: "Best time to look",
    body: "Look shortly after sunset or before sunrise. Your sky should be dark while the station is still lit by the Sun."
  },
  {
    title: "Why it looks bright",
    body: "The station reflects sunlight from its structure and solar arrays, so it can look like a bright moving star."
  },
  {
    title: "Why not every night",
    body: "A visible pass needs the right orbit path, a dark local sky, and sunlight on the station."
  },
  {
    title: "What direction to look",
    body: "Pass predictions list where the station appears and disappears. Higher passes are usually easier to spot."
  },
  {
    title: "What makes a good pass",
    body: "A good pass is high above the horizon, lasts several minutes, and happens when clouds and city glare are limited."
  }
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
            estimates, not official viewing alerts.
          </p>
        </div>
        <article className="panel">
          <h2>Visible pass estimator</h2>
          <PassPredictionPanel />
        </article>
      </section>

      <section className="learning-section">
        <SectionHeader kicker="Observing tips" title="How to spot the station">
          The ISS does not blink like an airplane. It glides steadily across the
          sky and usually disappears when it enters Earth's shadow.
        </SectionHeader>
        <div className="feature-grid">
          {viewingTips.map((tip) => (
            <FeatureCard title={tip.title} key={tip.title}>
              {tip.body}
            </FeatureCard>
          ))}
        </div>
      </section>
    </>
  );
}
