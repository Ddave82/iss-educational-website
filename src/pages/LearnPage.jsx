import { Accordion } from "../components/ui/Accordion";
import { InfoTip } from "../components/ui/InfoTip";
import { PageHero } from "../components/ui/PageHero";
import { learningQuestions } from "../lib/learningQuestions";

const moduleContent = {
  "what-is-the-iss": {
    icon: "ISS",
    keyIdea:
      "The International Space Station is a large spacecraft where astronauts live, work, and do science in orbit around Earth.",
    paragraphs: [
      <>
        The ISS is a real spacecraft, not a building in the sky. It travels
        around Earth while crews live inside it for months at a time.
      </>,
      <>
        It is also a science laboratory. Astronauts use the station to study
        how people, plants, fluids, materials, and equipment behave in space.
      </>,
      <>
        The station is made from connected{" "}
        <InfoTip label="Pressurized module">
          A pressurized module is a sealed room with air where astronauts can
          live and work without wearing a spacesuit.
        </InfoTip>{" "}
        pressurized modules,{" "}
        <InfoTip label="Solar array">
          A solar array is a large panel that turns sunlight into electricity
          for station systems.
        </InfoTip>{" "}
        solar arrays, docking ports, robotic arms, radiators, and external
        equipment.
      </>
    ],
    whyItMatters:
      "The ISS shows how engineering, science, and international teamwork can keep people living safely in orbit for long periods.",
    facts: [
      "It is a laboratory in space.",
      "It orbits Earth many times per day.",
      "It has modules, solar arrays, docking ports, radiators, and external equipment."
    ],
    action: { label: "Open Live Tracker", href: "/tracker" }
  },
  "how-fast-is-the-iss": {
    icon: "90m",
    keyIdea:
      "The ISS moves fast enough to circle Earth roughly every 90 minutes.",
    paragraphs: [
      <>
        The station travels at orbital{" "}
        <InfoTip label="Velocity">
          Velocity means speed in a direction. The station's velocity keeps
          changing direction as it follows its orbit.
        </InfoTip>{" "}
        velocity. It is much faster than an airplane and crosses oceans and
        continents in minutes.
      </>,
      <>
        It is not fixed above one city. Its{" "}
        <InfoTip label="Ground track">
          Ground track is the path on Earth directly below the station as it
          moves through orbit.
        </InfoTip>{" "}
        ground track shifts because Earth rotates underneath while the station
        keeps moving around the planet.
      </>,
      <>
        The exact speed and{" "}
        <InfoTip label="Altitude">
          Altitude is the station's height above Earth's surface.
        </InfoTip>{" "}
        altitude are part of the live{" "}
        <InfoTip label="Telemetry">
          Telemetry is measurement data sent or calculated from a spacecraft or
          tracking system.
        </InfoTip>{" "}
        shown in the tracker. These values change slightly as the orbit is
        maintained.
      </>
    ],
    whyItMatters:
      "Knowing the speed helps explain why the ISS can pass over your sky quickly and why crews see many sunrises each day.",
    facts: [
      "One orbit takes roughly 90 minutes.",
      "The ISS completes about 16 orbits per day.",
      "The path over Earth changes from orbit to orbit."
    ],
    action: { label: "Track current speed", href: "/tracker" }
  },
  "why-does-it-not-fall": {
    icon: "FALL",
    keyIdea:
      "Gravity pulls on the ISS, but its forward speed makes it keep missing the ground.",
    paragraphs: [
      <>
        The ISS does not stay up because gravity disappears. Gravity still
        pulls on the station and everything inside it.
      </>,
      <>
        The key is{" "}
        <InfoTip label="Orbit">
          Orbit is a curved path around Earth. An object in orbit is falling
          while moving sideways fast enough to keep missing the surface.
        </InfoTip>
        . The station is constantly falling toward Earth, but it also moves
        forward so fast that Earth curves away beneath it.
      </>,
      <>
        That balance of falling and forward motion is why the ISS keeps moving
        around Earth instead of dropping straight down.
      </>
    ],
    whyItMatters:
      "Orbit is one of the most important ideas in spaceflight. It explains satellites, crewed spacecraft, and how the tracker map changes.",
    facts: [
      "Gravity still acts on the ISS.",
      "The station is falling around Earth.",
      "Forward speed keeps it missing the ground."
    ],
    action: { label: "See the orbit path", href: "/tracker" }
  },
  "why-do-astronauts-float": {
    icon: "MG",
    keyIdea:
      "Astronauts float because the ISS and everything inside it are in continuous free fall together.",
    paragraphs: [
      <>
        Floating inside the station is not true zero gravity. Gravity is still
        present in orbit, but the station, astronauts, tools, food, and water
        are all falling together.
      </>,
      <>
        This creates{" "}
        <InfoTip label="Microgravity">
          Microgravity is not zero gravity. It is the near-weightless feeling
          created when everything falls together around Earth.
        </InfoTip>
        , where people and objects seem weightless because there is no floor
        pushing up on them the way it does on Earth.
      </>,
      <>
        Astronauts use handrails, foot loops, and careful routines so floating
        is useful instead of chaotic.
      </>
    ],
    whyItMatters:
      "Microgravity changes human bodies and experiments, which is why the station is valuable for science and why crews must exercise every day.",
    facts: [
      "Microgravity is not true zero gravity.",
      "Everything inside falls around Earth together.",
      "The effect makes people and objects float."
    ],
    action: { label: "Learn about station science", href: "/learn#what-science-happens-there" }
  },
  "what-happens-inside": {
    icon: "24h",
    keyIdea:
      "Inside the ISS, astronauts live through highly planned days of science, maintenance, exercise, meals, sleep, and communication with Earth.",
    paragraphs: [
      <>
        Crew members sleep in small crew quarters, eat carefully prepared food,
        and use equipment designed for a floating environment.
      </>,
      <>
        They spend much of the day running experiments, repairing equipment,
        checking station systems, and talking with mission control teams on
        Earth.
      </>,
      <>
        Exercise is part of the workday because muscles and bones weaken in{" "}
        <InfoTip label="Microgravity">
          Microgravity is the near-weightless condition created when the
          station and everything inside it fall together around Earth.
        </InfoTip>
        .
      </>
    ],
    whyItMatters:
      "The station is both a home and a workplace, so daily routines are designed to keep crews healthy and the spacecraft operating safely.",
    facts: [
      "Astronauts sleep, eat, exercise, work, and communicate with Earth.",
      "Maintenance is part of station life.",
      "Daily routines are carefully scheduled."
    ],
    action: { label: "Open teacher activities", href: "/teachers" },
    visualItems: ["Sleep", "Eat", "Exercise", "Science", "Repair", "Talk to Earth"]
  },
  "what-science-happens-there": {
    icon: "LAB",
    keyIdea:
      "The ISS lets scientists study systems that behave differently when gravity is greatly reduced.",
    paragraphs: [
      <>
        Research on the station includes biology, human health, physics,
        fluids, materials, plant growth, Earth observation, and technology
        testing.
      </>,
      <>
        In microgravity, flames, liquids, cells, crystals, and muscles can
        behave differently. Scientists use those differences to ask questions
        that are difficult to study on Earth.
      </>,
      <>
        The station also looks back at Earth, helping people observe storms,
        coastlines, cities, fires, glaciers, and the atmosphere.
      </>
    ],
    whyItMatters:
      "ISS research helps prepare future space missions and can also improve medicine, materials, technology, and Earth observation.",
    facts: [
      "Human health research studies bodies in space.",
      "Plant and biology experiments test life in microgravity.",
      "Earth observation connects space science to our planet."
    ],
    action: { label: "Explore NASA imagery", href: "/gallery" },
    visualItems: ["Biology", "Human health", "Physics", "Fluids", "Materials", "Plants", "Earth", "Technology"]
  },
  "how-do-spacecraft-dock": {
    icon: "DOCK",
    keyIdea:
      "Crew and cargo spacecraft connect to docking ports on the ISS with careful guidance and precise control.",
    paragraphs: [
      <>
        Visiting spacecraft bring astronauts, food, water, experiments,
        equipment, and supplies. Some vehicles carry crew, while others are
        built mainly for cargo.
      </>,
      <>
        A{" "}
        <InfoTip label="Docking">
          Docking is when a spacecraft carefully connects to a port on the
          station so crew or cargo can transfer safely.
        </InfoTip>{" "}
        approach must be slow and accurate. The spacecraft lines up with a
        docking port, connects mechanically, and then the connection is checked
        before hatches open.
      </>,
      <>
        Docking ports are part of the station's traffic system. They let the
        ISS receive visitors and supplies without landing back on Earth.
      </>
    ],
    whyItMatters:
      "Docking keeps the station supplied and makes crew rotation possible, turning the ISS into a continuously operating outpost.",
    facts: [
      "Crew and cargo spacecraft visit the ISS.",
      "Docking ports connect vehicles to the station.",
      "Docking is precise and carefully controlled."
    ],
    action: { label: "See station visuals", href: "/gallery" }
  },
  "what-are-spacewalks": {
    icon: "EVA",
    keyIdea:
      "A spacewalk is work outside the station in a spacesuit.",
    paragraphs: [
      <>
        A spacewalk is also called an{" "}
        <InfoTip label="EVA">
          EVA means extravehicular activity: work done outside a spacecraft in
          a spacesuit.
        </InfoTip>
        . During an EVA, astronauts leave the safety of the station's inside
        modules.
      </>,
      <>
        Spacewalks are used for repairs, upgrades, inspections, equipment
        installation, and some experiments. Astronauts are connected to the
        station and supported by teams on Earth.
      </>,
      <>
        EVAs are carefully planned because they are difficult and dangerous.
        Spacesuits must provide oxygen, cooling, communication, pressure, and
        protection.
      </>
    ],
    whyItMatters:
      "Spacewalks let crews maintain and improve the station when robotic arms or internal repairs are not enough.",
    facts: [
      "EVA means extravehicular activity.",
      "Astronauts work outside in spacesuits.",
      "Spacewalks support repairs, upgrades, inspections, and experiments."
    ],
    action: { label: "Open NASA gallery", href: "/gallery" }
  }
};

const quizItems = [
  {
    title: "Why do astronauts float inside the ISS?",
    content: <p>They float because the station and everything inside it are falling around Earth together.</p>
  },
  {
    title: "Is microgravity the same as zero gravity?",
    content: <p>No. Gravity is still present; microgravity describes the near-weightless effect of continuous free fall.</p>
  },
  {
    title: "How long does one ISS orbit take?",
    content: <p>Roughly 90 minutes.</p>
  },
  {
    title: "Why does the ISS not fall to Earth?",
    content: <p>It is falling, but its forward speed keeps it missing the ground.</p>
  },
  {
    title: "What are solar arrays used for?",
    content: <p>They turn sunlight into electricity for station systems and experiments.</p>
  },
  {
    title: "What does EVA mean?",
    content: <p>EVA means extravehicular activity, usually called a spacewalk.</p>
  },
  {
    title: "Why do astronauts exercise every day?",
    content: <p>Exercise helps protect muscles and bones that weaken in microgravity.</p>
  },
  {
    title: "What do docking ports do?",
    content: <p>They let visiting spacecraft connect safely to the station.</p>
  }
];

const continueLinks = [
  { label: "Open Live Tracker", href: "/tracker" },
  { label: "See the ISS from Earth", href: "/see-the-iss" },
  { label: "Teacher resources", href: "/teachers" },
  { label: "Explore NASA Gallery", href: "/gallery" }
];

function LearningPathCards() {
  return (
    <div className="learn-path-grid">
      {learningQuestions.map((question, index) => (
        <a className="learn-path-card" href={question.href} key={question.id}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{question.title}</strong>
          <p>{question.teaser}</p>
        </a>
      ))}
    </div>
  );
}

function VisualSupport({ module }) {
  if (module.visualItems?.length) {
    return (
      <div className="learn-visual-grid" aria-label="Related learning examples">
        {module.visualItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    );
  }

  return (
    <div className="learn-visual" aria-hidden="true">
      <span>{module.icon}</span>
    </div>
  );
}

function LearningSection({ question }) {
  const module = moduleContent[question.id];

  return (
    <section className="learn-module" id={question.id}>
      <div className="learn-module-header">
        <div>
          <span className="section-kicker">Learning question</span>
          <h2>{question.title}</h2>
        </div>
        <VisualSupport module={module} />
      </div>

      <div className="key-idea-card">
        <span>Key idea</span>
        <p>{module.keyIdea}</p>
      </div>

      <div className="learn-copy">
        {module.paragraphs.map((paragraph, index) => (
          <p key={`${question.id}-${index}`}>{paragraph}</p>
        ))}
      </div>

      <div className="learn-support-grid">
        <article className="mini-fact-card">
          <h3>Mini facts</h3>
          <ul>
            {module.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </article>
        <article className="why-card">
          <h3>Why it matters</h3>
          <p>{module.whyItMatters}</p>
          {module.action ? (
            <a className="card-link" href={module.action.href}>
              {module.action.label}
            </a>
          ) : null}
        </article>
      </div>
    </section>
  );
}

export function LearnPage() {
  return (
    <>
      <PageHero
        kicker="Learning Modules"
        title="Learn About the ISS"
        actions={
          <div className="learn-hero-chips" aria-label="Learning page summary">
            <span>8 questions</span>
            <span>Beginner friendly</span>
            <span>10-15 min read</span>
            <span>Student-friendly</span>
          </div>
        }
      >
        Simple explanations about orbit, microgravity, station life, science,
        spacecraft docking, and spacewalks.
      </PageHero>

      <section className="content-section learn-path-overview">
        <div className="section-heading-wide">
          <span className="section-kicker">Learning path</span>
          <h2>Choose a question and start there.</h2>
          <p>
            Each card links to the matching section below, so students can read
            in order or jump straight to the idea they need.
          </p>
        </div>
        <LearningPathCards />
      </section>

      <section className="content-section learn-guide-layout">
        <aside className="learn-toc" aria-label="Learning table of contents">
          <span className="section-kicker">Contents</span>
          <nav>
            {learningQuestions.map((question, index) => (
              <a href={question.href} key={question.id}>
                <span>{index + 1}</span>
                {question.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="learn-article">
          {learningQuestions.map((question) => (
            <LearningSection question={question} key={question.id} />
          ))}

          <section className="learn-quiz-section" id="check-your-understanding">
            <div className="section-heading-wide">
              <span className="section-kicker">Quick quiz</span>
              <h2>Check your understanding</h2>
              <p>
                Open each question to check the core ideas from the learning
                modules.
              </p>
            </div>
            <Accordion items={quizItems} />
          </section>
        </article>
      </section>

      <section className="content-section continue-section">
        <div className="section-heading-wide compact-heading">
          <span className="section-kicker">Continue exploring</span>
          <h2>Next steps after the learning guide.</h2>
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
