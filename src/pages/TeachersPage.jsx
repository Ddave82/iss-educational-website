import { PageHero } from "../components/ui/PageHero";
import { SectionHeader } from "../components/ui/SectionHeader";

const overviewCards = [
  {
    title: "Lesson duration",
    body: "30 minutes, with optional 60-90 minute extension."
  },
  {
    title: "Best for",
    body: "Upper elementary, middle school, homeschool groups, and beginner space lessons."
  },
  {
    title: "Students will learn",
    body: "Orbit, microgravity, live telemetry, station life, and space science."
  },
  {
    title: "Use with",
    body: "Projector, notebooks, the live tracker, and optional printed worksheet."
  }
];

const learningGoals = [
  "Describe the ISS as a laboratory in orbit",
  "Explain that orbit means falling around Earth",
  "Explain why astronauts float in microgravity",
  "Read simple live telemetry such as latitude, longitude, speed, altitude, and last updated",
  "Discuss why the ISS does not stay above one city"
];

const materials = [
  "Projector or shared screen",
  "Access to the Live Tracker page",
  "Student notebooks or worksheet",
  "Timer",
  "Optional globe or ball",
  "Optional printed quiz"
];

const lessonTimeline = [
  {
    time: "0-5 min",
    title: "Hook",
    prompt: "Where do you think the ISS is right now?",
    note: "Collect quick guesses before opening the tracker. Let students name continents, oceans, or countries."
  },
  {
    time: "5-10 min",
    title: "Open the tracker",
    prompt: "Find the current position, altitude, speed, and last updated time.",
    note: "Point out that the data updates and that the station is not fixed above one place."
  },
  {
    time: "10-15 min",
    title: "Orbit explanation",
    prompt: "The ISS is falling around Earth, not floating still above it.",
    note: "Use a ball or quick sketch to show forward motion plus falling around a curved planet."
  },
  {
    time: "15-20 min",
    title: "Microgravity",
    prompt: "Why do astronauts float if gravity still exists?",
    note: "Emphasize that the station and everything inside it are falling together."
  },
  {
    time: "20-25 min",
    title: "Student observation",
    prompt: "Write down latitude, longitude, altitude, speed, visibility, and last updated.",
    note: "Ask students to copy numbers carefully and include units where shown."
  },
  {
    time: "25-30 min",
    title: "Discussion",
    prompt: "What changed while we watched? Could we see it from our location tonight?",
    note: "Connect movement, visibility, and ground track back to the live data."
  }
];

const worksheetQuestions = [
  "Where do you think the ISS is right now?",
  "How fast do you think it travels?",
  "Can we see it from Earth?"
];

const thinkQuestions = [
  "Why does the ISS not stay above one city?",
  "Why do astronauts float?",
  "Why is exercise important in space?",
  "What science question would you send to the ISS?"
];

const quizItems = [
  {
    question: "How long does one ISS orbit take?",
    answer: "Roughly 90 minutes.",
    explanation: "The ISS completes about 16 orbits per day, so students may see the tracker position change quickly."
  },
  {
    question: "Why do astronauts float inside the ISS?",
    answer: "Because the ISS and everything inside it are falling around Earth together.",
    explanation: "This is called microgravity. Gravity is still present, but the station, astronauts, and objects inside all fall together."
  },
  {
    question: "Is microgravity the same as zero gravity?",
    answer: "No. Gravity is still present in orbit.",
    explanation: "Microgravity describes the near-weightless effect created by continuous free fall."
  },
  {
    question: "Can people see the ISS from Earth?",
    answer: "Yes, when the sky is dark and the station is sunlit.",
    explanation: "The ISS can look like a bright moving star shortly after sunset or before sunrise."
  },
  {
    question: "Why does the ISS need solar arrays?",
    answer: "Solar arrays generate electricity.",
    explanation: "They turn sunlight into power for station systems, experiments, communications, and daily operations."
  },
  {
    question: "Does the ISS stay above one city?",
    answer: "No. It moves around Earth while Earth rotates underneath.",
    explanation: "This is why the ground track changes and the station passes over many different places."
  },
  {
    question: "What is docking?",
    answer: "Docking is when a spacecraft connects to the station.",
    explanation: "Crew and cargo spacecraft dock to bring people, food, experiments, equipment, and supplies."
  },
  {
    question: "What does EVA mean?",
    answer: "Extravehicular activity.",
    explanation: "An EVA is a spacewalk, when astronauts work outside the station in spacesuits."
  },
  {
    question: "Why do astronauts exercise every day?",
    answer: "To protect muscles and bones in microgravity.",
    explanation: "Without regular exercise, the body loses strength faster in the near-weightless environment."
  },
  {
    question: "What kind of science happens on the ISS?",
    answer: "Biology, human health, physics, fluids, materials, plants, Earth observation, and technology testing.",
    explanation: "Microgravity gives researchers a different environment for studying systems that behave differently in space."
  }
];

const discussionGroups = [
  {
    level: "Beginner",
    questions: [
      "What surprised you about the ISS?",
      "Why do you think astronauts need a schedule?"
    ]
  },
  {
    level: "Intermediate",
    questions: [
      "Why does the ISS move over different parts of Earth?",
      "Why is microgravity useful for experiments?"
    ]
  },
  {
    level: "Advanced",
    questions: [
      "What problems would engineers need to solve on a space station?",
      "How could data from the ISS help people on Earth?"
    ]
  }
];

const adaptCards = [
  {
    title: "For younger students",
    items: [
      "Focus on visuals",
      "Use the tracker map",
      "Draw the ISS path",
      "Use simple words: fast, orbit, float, Earth"
    ]
  },
  {
    title: "For older students",
    items: [
      "Calculate approximate distance traveled in 10 minutes",
      "Compare altitude and speed",
      "Discuss orbital motion",
      "Research one ISS experiment"
    ]
  },
  {
    title: "For homeschool",
    items: [
      "Split into two short sessions",
      "Combine with drawing, model building, or night-sky observation",
      "Use the worksheet as portfolio evidence"
    ]
  },
  {
    title: "For groups",
    items: [
      "Telemetry reader",
      "Map observer",
      "Timekeeper",
      "Question leader",
      "Note taker"
    ]
  }
];

const extensionIdeas = [
  "Build a simple paper ISS model",
  "Draw the ISS orbit around Earth",
  "Compare ISS speed to an airplane",
  "Research one astronaut",
  "Watch NASA station footage",
  "Write a postcard from the ISS",
  "Create a mini presentation about microgravity",
  "Track the ISS again later and compare positions"
];

const continueLinks = [
  { label: "Open Live Tracker", href: "/tracker" },
  { label: "Learn the basics", href: "/learn" },
  { label: "See the ISS from Earth", href: "/see-the-iss" },
  { label: "Explore NASA Gallery", href: "/gallery" }
];

function printWorksheet() {
  window.print();
}

function InfoListCard({ title, items }) {
  return (
    <article className="teacher-card">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export function TeachersPage() {
  return (
    <>
      <PageHero
        kicker="Classroom Resources"
        title="ISS Teacher Resources"
        actions={
          <div className="teacher-hero-actions">
            <div className="teacher-hero-chips" aria-label="Teacher resource summary">
              <span>30-minute lesson</span>
              <span>Ages 8-14</span>
              <span>No signup needed</span>
              <span>Works with live tracker</span>
              <span>Homeschool friendly</span>
            </div>
            <div className="hero-actions">
              <a className="button-primary" href="#lesson-plan">
                Start lesson plan
              </a>
              <a className="button-secondary" href="/tracker">
                Open live tracker
              </a>
              <a className="button-secondary" href="#worksheet">
                Print worksheet
              </a>
            </div>
          </div>
        }
      >
        Ready-to-use lesson ideas, quiz questions, worksheets, and live tracking
        activities for learning about the International Space Station.
      </PageHero>

      <section className="content-section teacher-overview">
        <SectionHeader
          kicker="Quick overview"
          title="Everything you need for a short ISS lesson"
        >
          Use this page as a teaching pack: start with the live tracker, guide
          students through orbit and microgravity, then finish with a worksheet
          or quiz.
        </SectionHeader>
        <div className="teacher-overview-grid">
          {overviewCards.map((card) => (
            <article className="teacher-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section teacher-anchor" id="lesson-plan">
        <SectionHeader kicker="30-minute lesson" title="30-minute live orbit lesson plan">
          A practical plan for classrooms, homeschool groups, science clubs, or
          family learning.
        </SectionHeader>
        <div className="lesson-summary-grid">
          <article className="teacher-card">
            <h3>Age range</h3>
            <p>Ages 8-14 / upper elementary to middle school.</p>
          </article>
          <article className="teacher-card">
            <h3>Duration</h3>
            <p>30 minutes.</p>
          </article>
          <article className="teacher-card">
            <h3>Group format</h3>
            <p>Classroom, homeschool, science club, or family learning.</p>
          </article>
          <InfoListCard title="Learning goals" items={learningGoals} />
          <InfoListCard title="Materials needed" items={materials} />
        </div>
      </section>

      <section className="content-section teacher-anchor" id="classroom-flow">
        <SectionHeader kicker="Teaching script" title="Step-by-step activity">
          Use this timeline as a classroom script. The prompts are written so a
          teacher or parent can run the activity without extra prep.
        </SectionHeader>
        <div className="teacher-timeline">
          {lessonTimeline.map((step) => (
            <article className="teacher-timeline-step" key={step.time}>
              <strong>{step.time}</strong>
              <div>
                <h3>{step.title}</h3>
                <p>{step.prompt}</p>
                <span>Teacher note: {step.note}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section teacher-anchor" id="track-one-orbit">
        <div className="teacher-split">
          <div>
            <SectionHeader kicker="Live activity" title="Track the ISS for one orbit">
              One ISS orbit takes roughly 90 minutes. Students can track the
              station at the beginning, middle, and end of a class period or
              across a longer lesson.
            </SectionHeader>
            <div className="teacher-card">
              <h3>Activity setup</h3>
              <ul>
                <li>Open the live tracker.</li>
                <li>Record the current time and live telemetry.</li>
                <li>Return after 10, 20, or 30 minutes.</li>
                <li>Compare the station's new position.</li>
                <li>Discuss why the ground track shifted.</li>
              </ul>
              <a className="button-primary" href="/tracker">
                Open Live Tracker
              </a>
            </div>
          </div>
          <article className="teacher-card observation-card">
            <h3>Observation table</h3>
            <p>Students can copy this table into notebooks or the worksheet.</p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Altitude</th>
                    <th>Speed</th>
                    <th>Over land/ocean</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((row) => (
                    <tr key={row}>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="button-secondary print-button" type="button" onClick={printWorksheet}>
              Print activity
            </button>
          </article>
        </div>
      </section>

      <section className="content-section teacher-anchor" id="worksheet">
        <SectionHeader kicker="Printable" title="ISS Live Tracker Worksheet">
          Print this section for students or use it as a notebook template.
        </SectionHeader>
        <div className="worksheet-actions">
          <button className="button-primary print-button" type="button" onClick={printWorksheet}>
            Print worksheet
          </button>
          <a className="button-secondary" href="/tracker">
            Open live tracker
          </a>
        </div>
        <article className="printable-worksheet" aria-label="ISS Live Tracker Worksheet">
          <header>
            <h2>ISS Live Tracker Worksheet</h2>
            <div className="worksheet-line-grid">
              <span>Student name:</span>
              <span>Date:</span>
            </div>
          </header>

          <section>
            <h3>Part 1 - Before watching</h3>
            {worksheetQuestions.map((question) => (
              <label className="worksheet-line" key={question}>
                {question}
                <span />
              </label>
            ))}
          </section>

          <section>
            <h3>Part 2 - Live data</h3>
            <div className="worksheet-data-grid">
              {[
                "Current latitude",
                "Current longitude",
                "Altitude",
                "Speed",
                "Last updated",
                "Visibility/daylight status",
                "Is it over land or ocean?"
              ].map((label) => (
                <label key={label}>
                  {label}
                  <span />
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3>Part 3 - Think about it</h3>
            {thinkQuestions.map((question) => (
              <label className="worksheet-line" key={question}>
                {question}
                <span />
              </label>
            ))}
          </section>

          <section>
            <h3>Part 4 - Draw</h3>
            <p>Draw Earth, the ISS, and the station's path around Earth.</p>
            <div className="drawing-box" aria-label="Drawing area" />
          </section>
        </article>
      </section>

      <section className="content-section teacher-anchor" id="quiz">
        <SectionHeader kicker="Quiz" title="ISS knowledge check">
          Use these questions as warmups, exit tickets, review questions, or a
          quick homeschool check-in.
        </SectionHeader>
        <div className="quiz-grid">
          {quizItems.map((item, index) => (
            <details className="quiz-card" key={item.question}>
              <summary>
                <span>{index + 1}</span>
                {item.question}
              </summary>
              <div>
                <strong>Short answer: {item.answer}</strong>
                <p>Teacher explanation: {item.explanation}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="content-section teacher-anchor" id="answer-key">
        <SectionHeader kicker="Teacher reference" title="Answer key">
          A compact version for checking student work quickly.
        </SectionHeader>
        <div className="answer-key-list">
          {quizItems.map((item, index) => (
            <article className="teacher-card" key={item.question}>
              <span>{index + 1}</span>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section teacher-anchor" id="discussion">
        <SectionHeader kicker="Discussion" title="Discussion questions">
          Choose questions by difficulty or assign groups different levels.
        </SectionHeader>
        <div className="teacher-overview-grid">
          {discussionGroups.map((group) => (
            <InfoListCard title={group.level} items={group.questions} key={group.level} />
          ))}
        </div>
      </section>

      <section className="content-section teacher-anchor" id="extensions">
        <SectionHeader kicker="Adapt and extend" title="Adapt the lesson">
          Adjust the activity for age, setting, time, and student confidence.
        </SectionHeader>
        <div className="teacher-overview-grid">
          {adaptCards.map((card) => (
            <InfoListCard title={card.title} items={card.items} key={card.title} />
          ))}
        </div>
        <article className="teacher-card extension-card">
          <h3>Extension activities</h3>
          <div className="extension-chip-grid">
            {extensionIdeas.map((idea) => (
              <span key={idea}>{idea}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="content-section continue-section">
        <div className="section-heading-wide compact-heading">
          <span className="section-kicker">Continue exploring</span>
          <h2>Keep the lesson moving.</h2>
        </div>
        <div className="continue-grid">
          {continueLinks.map((link) => (
            <a className="continue-card" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
