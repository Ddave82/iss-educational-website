import { useEffect, useMemo, useState } from "react";
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
    supportTitle: "Did you know?",
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
    supportTitle: "Fast fact",
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
    supportTitle: "Common misconception",
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
    supportTitle: "Common misconception",
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
    supportTitle: "Why it matters",
    facts: [
      "Astronauts sleep, eat, exercise, work, and communicate with Earth.",
      "Maintenance is part of station life.",
      "Daily routines are carefully scheduled."
    ],
    action: { label: "Open Live Tracker", href: "/tracker" },
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
    supportTitle: "Why it matters",
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
    supportTitle: "Fast fact",
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
    supportTitle: "Why it matters",
    facts: [
      "EVA means extravehicular activity.",
      "Astronauts work outside in spacesuits.",
      "Spacewalks support repairs, upgrades, inspections, and experiments."
    ],
    action: { label: "Open NASA gallery", href: "/gallery" }
  }
};

const challengeQuestions = [
  {
    prompt: "True or false: the ISS floats because there is no gravity.",
    answer: false,
    feedback:
      "False. Gravity is still present. The station and everything inside it are falling together."
  },
  {
    prompt: "True or false: the ISS completes one orbit in roughly 90 minutes.",
    answer: true,
    feedback:
      "True. That fast orbit is why its ground track changes quickly."
  },
  {
    prompt: "True or false: the ISS stays above the same city all day.",
    answer: false,
    feedback:
      "False. Earth rotates underneath while the station moves around the planet."
  }
];

const quizItems = [
  {
    question: "Why do astronauts float inside the ISS?",
    choices: [
      "Because there is no gravity in orbit",
      "Because the station and everything inside it fall together",
      "Because air pushes them upward"
    ],
    correctIndex: 1,
    explanation:
      "Gravity is still present. Astronauts float because the station, people, and objects inside all fall around Earth together."
  },
  {
    question: "How long does one ISS orbit take?",
    choices: ["About 9 minutes", "About 90 minutes", "About 9 hours"],
    correctIndex: 1,
    explanation:
      "The ISS circles Earth roughly every 90 minutes, which is about 16 orbits per day."
  },
  {
    question: "Why does the ISS not fall straight to Earth?",
    choices: [
      "Its forward speed keeps it missing the ground",
      "Solar panels hold it up",
      "It is outside Earth's gravity"
    ],
    correctIndex: 0,
    explanation:
      "The station is falling, but its forward motion keeps carrying it around Earth."
  },
  {
    question: "What do solar arrays do?",
    choices: [
      "Generate electricity",
      "Make artificial gravity",
      "Steer the station like wings"
    ],
    correctIndex: 0,
    explanation:
      "Solar arrays turn sunlight into electricity for station systems and experiments."
  },
  {
    question: "What is docking?",
    choices: [
      "A spacewalk outside the ISS",
      "A spacecraft connecting to the station",
      "A telescope taking Earth photos"
    ],
    correctIndex: 1,
    explanation:
      "Docking lets crew and cargo spacecraft connect to the station safely."
  },
  {
    question: "What does EVA mean?",
    choices: [
      "Earth viewing angle",
      "Extravehicular activity",
      "Emergency vehicle arrival"
    ],
    correctIndex: 1,
    explanation:
      "EVA means extravehicular activity, usually called a spacewalk."
  }
];

const continueLinks = [
  { label: "Track the ISS live", href: "/tracker" },
  { label: "See the ISS from Earth", href: "/see-the-iss" },
  { label: "Explore NASA Gallery", href: "/gallery" },
  { label: "About the data", href: "/about-data" }
];

const LEARN_PROGRESS_STORAGE_KEY = "iss-explorer-learn-progress";

function readStoredLearnProgress() {
  if (typeof window === "undefined") {
    return new Set();
  }

  try {
    const storedIds = JSON.parse(
      window.localStorage.getItem(LEARN_PROGRESS_STORAGE_KEY) || "[]"
    );

    return new Set(
      storedIds.filter((id) =>
        learningQuestions.some((question) => question.id === id)
      )
    );
  } catch {
    return new Set();
  }
}

function LearningPathCards({ activeId, learnedIds }) {
  return (
    <div className="learn-path-grid">
      {learningQuestions.map((question, index) => (
        <a
          className={`learn-path-card${question.id === activeId ? " is-active" : ""}${learnedIds.has(question.id) ? " is-complete" : ""}`}
          href={question.href}
          key={question.id}
        >
          <div className="learn-path-card-top">
            <span>{question.category}</span>
            <strong aria-hidden="true">{String(index + 1).padStart(2, "0")}</strong>
          </div>
          <h3>{question.title}</h3>
          <p>{question.teaser}</p>
          <small>{learnedIds.has(question.id) ? "Learned" : "Open module"}</small>
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

function LearningSection({ question, isLearned, onMarkLearned }) {
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
          <h3>{module.supportTitle || "Why it matters"}</h3>
          <p>{module.whyItMatters}</p>
          {module.action ? (
            <a className="card-link" href={module.action.href}>
              {module.action.label}
            </a>
          ) : null}
        </article>
      </div>

      <div className="module-complete-row">
        <p>{isLearned ? "Marked as learned. This module now counts toward your mission progress." : "Finished this module? Mark it so your Mission Path updates."}</p>
        <button type="button" className={isLearned ? "button-secondary" : "button-primary"} onClick={onMarkLearned}>
          {isLearned ? "Learned" : "Mark as learned"}
        </button>
      </div>
    </section>
  );
}

function LearningPathSidebar({ activeId, learnedIds, onResetProgress }) {
  const learnedCount = learnedIds.size;

  return (
    <aside className="learn-toc" aria-label="Learning path">
      <span className="section-kicker">Mission path</span>
      <strong className="learn-progress-text">
        {learnedCount} / {learningQuestions.length} modules marked as learned
      </strong>
      <small>Use each module's Mark as learned button to complete it.</small>
      <div className="learn-progress-track" aria-hidden="true">
        <span style={{ width: `${(learnedCount / learningQuestions.length) * 100}%` }} />
      </div>
      <nav>
        {learningQuestions.map((question, index) => (
          <a
            className={`${question.id === activeId ? "is-active" : ""}${learnedIds.has(question.id) ? " is-complete" : ""}`}
            href={question.href}
            key={question.id}
            aria-current={question.id === activeId ? "location" : undefined}
          >
            <span>{learnedIds.has(question.id) ? "Done" : index + 1}</span>
            {question.title}
          </a>
        ))}
      </nav>
      <button type="button" className="learn-reset-button" onClick={onResetProgress}>
        Reset progress
      </button>
    </aside>
  );
}

function QuizCheckpoint() {
  return (
    <section className="content-section quiz-checkpoint" aria-labelledby="quiz-checkpoint-title">
      <div>
        <span className="section-kicker">Mission checkpoint</span>
        <h2 id="quiz-checkpoint-title">Ready for a quick challenge?</h2>
        <p>
          Test what you know about orbit, microgravity, speed, and life on the
          station.
        </p>
      </div>
      <div className="quiz-checkpoint-card">
        <strong>6 questions</strong>
        <span>Instant feedback</span>
        <span>Final rank</span>
        <a className="button-primary" href="#quiz">
          Start mini quiz
        </a>
      </div>
    </section>
  );
}

function FragmentWithChallenge({ question, index, isLearned, onMarkLearned }) {
  return (
    <>
      <LearningSection question={question} isLearned={isLearned} onMarkLearned={onMarkLearned} />
      {index === 2 ? <QuickChallenge /> : null}
    </>
  );
}

function QuickChallenge() {
  const [answers, setAnswers] = useState({});
  const answeredCount = Object.keys(answers).length;

  return (
    <section className="quick-challenge" id="quick-challenge">
      <div>
        <span className="section-kicker">Quick challenge</span>
        <h2>Orbit check-in</h2>
        <p>
          Try these before the final quiz. Each tap gives immediate feedback.
        </p>
      </div>
      <div className="challenge-grid">
        {challengeQuestions.map((question, index) => {
          const answer = answers[index];
          const isCorrect = answer === question.answer;

          return (
            <article
              className={`challenge-card${answer !== undefined ? isCorrect ? " is-correct" : " is-incorrect" : ""}`}
              key={question.prompt}
            >
              <h3>{question.prompt}</h3>
              <div className="challenge-actions">
                {[true, false].map((value) => (
                  <button
                    type="button"
                    className={answer === value ? "is-selected" : ""}
                    onClick={() =>
                      setAnswers((current) => ({
                        ...current,
                        [index]: value
                      }))
                    }
                    key={String(value)}
                  >
                    {value ? "True" : "False"}
                  </button>
                ))}
              </div>
              {answer !== undefined ? <p>{question.feedback}</p> : null}
            </article>
          );
        })}
      </div>
      <span className="challenge-progress">{answeredCount} / {challengeQuestions.length} answered</span>
    </section>
  );
}

function getResultTier(score) {
  if (score <= 2) {
    return {
      title: "ISS Rookie",
      message: "You have the first pieces. Review orbit and microgravity, then try again."
    };
  }

  if (score <= 4) {
    return {
      title: "Orbit Explorer",
      message: "Strong progress. You understand the big ideas behind the station."
    };
  }

  return {
    title: "Station Specialist",
    message: "Excellent work. You can explain the ISS like a mission guide."
  };
}

function MiniQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const currentQuestion = quizItems[currentIndex];
  const selectedIndex = answers[currentIndex];
  const answeredQuestions = Object.keys(answers).length;
  const isLastQuestion = currentIndex === quizItems.length - 1;
  const score = useMemo(
    () =>
      Object.entries(answers).reduce((total, [questionIndex, answerIndex]) => {
        return total + (quizItems[Number(questionIndex)].correctIndex === answerIndex ? 1 : 0);
      }, 0),
    [answers]
  );
  const result = getResultTier(score);

  function handleAnswer(answerIndex) {
    if (selectedIndex !== undefined) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [currentIndex]: answerIndex
    }));
  }

  function handleReset() {
    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setShowReview(false);
  }

  return (
    <section className="learn-quiz-section gamified-quiz" id="quiz">
      <div className="section-heading-wide">
        <span className="section-kicker">Mini quiz</span>
        <h2>Mini Quiz: Are you ready for orbit?</h2>
        <p>
          Answer one question at a time and get instant feedback as you go.
        </p>
      </div>

      <div className="quiz-progress-row">
        <span>Question {Math.min(answeredQuestions + 1, quizItems.length)} of {quizItems.length}</span>
        <strong>Score: {score}</strong>
      </div>
      <div className="quiz-progress-track" aria-hidden="true">
        <span style={{ width: `${(answeredQuestions / quizItems.length) * 100}%` }} />
      </div>

      {!isFinished ? (
        <article className="quiz-play-card">
          <h3>{currentQuestion.question}</h3>
          <div className="quiz-choice-grid">
            {currentQuestion.choices.map((choice, index) => {
              const isSelected = selectedIndex === index;
              const isCorrect = currentQuestion.correctIndex === index;
              const showResult = selectedIndex !== undefined;

              return (
                <button
                  type="button"
                  className={`quiz-choice${isSelected ? " is-selected" : ""}${showResult && isCorrect ? " is-correct" : ""}${showResult && isSelected && !isCorrect ? " is-incorrect" : ""}`}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  key={choice}
                >
                  {choice}
                </button>
              );
            })}
          </div>
          {selectedIndex !== undefined ? (
            <div className="quiz-feedback" role="status">
              <strong>
                {selectedIndex === currentQuestion.correctIndex ? "Correct" : "Not quite"}
              </strong>
              <p>{currentQuestion.explanation}</p>
              <button
                type="button"
                className="button-primary"
                onClick={() =>
                  isLastQuestion
                    ? setIsFinished(true)
                    : setCurrentIndex((index) => Math.min(index + 1, quizItems.length - 1))
                }
              >
                {isLastQuestion ? "Show result" : "Next question"}
              </button>
            </div>
          ) : null}
        </article>
      ) : (
        <article className="quiz-result-card">
          <span className="section-kicker">Final result</span>
          <h3>{result.title}</h3>
          <strong>{score} / {quizItems.length} correct</strong>
          <p>{result.message}</p>
          <div className="hero-actions">
            <button type="button" className="button-secondary" onClick={() => setShowReview((value) => !value)}>
              {showReview ? "Hide review" : "Review answers"}
            </button>
            <button type="button" className="button-secondary" onClick={handleReset}>
              Try again
            </button>
            <a className="button-secondary" href="#what-is-the-iss">
              Review learning modules
            </a>
            <a className="button-primary" href="/tracker">
              Open Live Tracker
            </a>
          </div>
          {showReview ? (
            <div className="quiz-review-list">
              {quizItems.map((item, index) => {
                const answerIndex = answers[index];
                const isCorrect = answerIndex === item.correctIndex;

                return (
                  <article className={isCorrect ? "is-correct" : "is-incorrect"} key={item.question}>
                    <h4>{item.question}</h4>
                    <p>Your answer: {item.choices[answerIndex]}</p>
                    <p>Correct answer: {item.choices[item.correctIndex]}</p>
                    <small>{item.explanation}</small>
                  </article>
                );
              })}
            </div>
          ) : null}
        </article>
      )}
    </section>
  );
}

export function LearnPage() {
  const [activeModuleId, setActiveModuleId] = useState(learningQuestions[0].id);
  const [learnedModuleIds, setLearnedModuleIds] = useState(readStoredLearnProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        LEARN_PROGRESS_STORAGE_KEY,
        JSON.stringify([...learnedModuleIds])
      );
    } catch {
      // Progress still works for the current session if browser storage is blocked.
    }
  }, [learnedModuleIds]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveModuleId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6]
      }
    );

    learningQuestions.forEach((question) => {
      const section = document.getElementById(question.id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  function markModuleLearned(moduleId) {
    setLearnedModuleIds((current) => {
      if (current.has(moduleId)) {
        return current;
      }

      const next = new Set(current);
      next.add(moduleId);
      return next;
    });
  }

  function resetProgress() {
    setLearnedModuleIds(new Set());
  }

  return (
    <>
      <PageHero
        compact
        kicker="Learning Modules"
        title="Learn About the ISS"
        actions={
          <div className="learn-hero-actions">
            <div className="learn-hero-chips" aria-label="Learning page summary">
              <span>8 learning modules</span>
              <span>Beginner friendly</span>
              <span>10-15 min</span>
              <span>Includes quick quiz</span>
            </div>
            <div className="hero-actions">
              <a className="button-primary" href="#what-is-the-iss">
                Start learning
              </a>
              <a className="button-secondary" href="#quiz">
                Jump to quiz
              </a>
            </div>
            <p className="learn-hero-note">Read the modules or test yourself right away.</p>
          </div>
        }
      >
        Explore orbit, speed, microgravity, station life, science, docking, and
        spacewalks.
      </PageHero>

      <section className="content-section learn-path-overview">
        <div className="section-heading-wide">
          <span className="section-kicker">Learning path</span>
          <h2>Choose your first mission question.</h2>
          <p>
            Use the mission map to jump between modules. Mark a module as
            learned when you finish it.
          </p>
        </div>
        <LearningPathCards activeId={activeModuleId} learnedIds={learnedModuleIds} />
      </section>

      <QuizCheckpoint />

      <section className="content-section learn-guide-layout">
        <LearningPathSidebar
          activeId={activeModuleId}
          learnedIds={learnedModuleIds}
          onResetProgress={resetProgress}
        />

        <article className="learn-article">
          {learningQuestions.map((question, index) => (
            <FragmentWithChallenge
              question={question}
              index={index}
              isLearned={learnedModuleIds.has(question.id)}
              onMarkLearned={() => markModuleLearned(question.id)}
              key={question.id}
            />
          ))}
        </article>

        <div className="learn-full-width">
          <MiniQuiz />
        </div>
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
