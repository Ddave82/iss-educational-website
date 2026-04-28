import { Accordion } from "../components/ui/Accordion";
import { FeatureCard } from "../components/ui/FeatureCard";
import { PageHero } from "../components/ui/PageHero";
import { SectionHeader } from "../components/ui/SectionHeader";

const quizItems = [
  ["How long does one ISS orbit take?", "Roughly 90 minutes."],
  ["Why do astronauts float?", "They and the station are falling around Earth together."],
  ["Can we see the ISS from Earth?", "Yes, when the sky is dark and the station is sunlit."],
  ["Is microgravity the same as no gravity?", "No. Gravity is still present in orbit."],
  ["Why does the ISS need solar panels?", "Solar arrays generate electricity for station systems and experiments."],
  ["Does the ISS stay above one city?", "No. It moves around Earth while Earth rotates below."],
  ["What is docking?", "Docking is when a spacecraft connects to the station."],
  ["What is an EVA?", "An EVA is a spacewalk outside a spacecraft."],
  ["Why do astronauts exercise?", "Exercise helps protect muscles and bones in microgravity."],
  ["What kind of science happens on the ISS?", "Biology, physics, medicine, materials, technology, and Earth observation."]
];

const quizAccordion = quizItems.map(([question, answer]) => ({
  title: question,
  content: <p>{answer}</p>
}));

export function TeachersPage() {
  return (
    <>
      <PageHero kicker="Classroom resources" title="ISS Teacher Resources">
        Lesson ideas, quiz questions, and classroom activities for learning
        about the International Space Station.
      </PageHero>

      <section className="content-section readable-section">
        <SectionHeader kicker="30-minute lesson" title="Live orbit lesson plan">
          A compact activity for teachers, parents, and homeschool groups.
        </SectionHeader>
        <div className="lesson-grid">
          <FeatureCard title="Age range">Upper elementary through early high school.</FeatureCard>
          <FeatureCard title="Learning goals" facts={[
            "Describe the ISS as a laboratory in orbit",
            "Explain orbit as falling around Earth",
            "Connect microgravity to free fall",
            "Read basic live telemetry"
          ]} />
          <FeatureCard title="Materials needed" facts={[
            "Projector or shared screen",
            "Student notebooks",
            "Timer",
            "Optional globe or ball"
          ]} />
        </div>
        <article className="panel lesson-plan">
          <h2>Step-by-step activity</h2>
          <ol>
            <li>Open the live tracker and ask students where the ISS is now.</li>
            <li>Record latitude, longitude, ground track, speed, and last update.</li>
            <li>Explain orbit as falling around Earth with forward speed.</li>
            <li>Discuss microgravity and why astronauts float.</li>
            <li>Check the tracker again and compare how far the station moved.</li>
          </ol>
          <h3>Discussion questions</h3>
          <ul>
            <li>Why does the station move over different places?</li>
            <li>Why can it be visible at sunset but not all night?</li>
            <li>What science question would you send to the ISS?</li>
          </ul>
        </article>
      </section>

      <section className="content-section readable-section">
        <SectionHeader kicker="Quiz" title="ISS knowledge check">
          Use these as warmups, exit tickets, or review questions.
        </SectionHeader>
        <Accordion items={quizAccordion} />
      </section>

      <section className="content-section split-section">
        <article className="panel">
          <span className="section-kicker">Classroom activity</span>
          <h2>Track the ISS for one orbit</h2>
          <p>
            Have students record the station position every 10-15 minutes for
            about 90 minutes. They should note the ground track, speed, and
            whether the station is sunlit or in shadow.
          </p>
          <p>
            Afterward, discuss how much of Earth the station crossed, why the
            track curves, and how a fast orbit can still be predictable.
          </p>
        </article>
        <article className="panel worksheet-card">
          <span className="section-kicker">Printable</span>
          <h2>Worksheet coming soon</h2>
          <p>
            A printable worksheet can be generated later from this activity.
            For now, students can use a notebook table with time, latitude,
            longitude, ground track, and one observation.
          </p>
        </article>
      </section>
    </>
  );
}
