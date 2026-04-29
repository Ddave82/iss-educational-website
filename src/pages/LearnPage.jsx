import { useEffect, useMemo, useState } from "react";
import { InfoTip } from "../components/ui/InfoTip";
import { PageHero } from "../components/ui/PageHero";
import { useI18n } from "../lib/i18n.jsx";
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

const danishLearnModules = {
  "what-is-the-iss": {
    keyIdea: "Den Internationale Rumstation er et stort rumfartøj, hvor astronauter bor, arbejder og laver forskning i kredsløb om Jorden.",
    paragraphs: [
      "ISS er et rigtigt rumfartøj, ikke en bygning på himlen. Den kredser om Jorden, mens besætninger bor i den i måneder ad gangen.",
      "Den er også et forskningslaboratorium. Astronauter bruger stationen til at undersøge, hvordan mennesker, planter, væsker, materialer og udstyr opfører sig i rummet.",
      "Stationen består af sammenkoblede trykmoduler, solpaneler, dockingporte, robotarme, radiatorer og udvendigt udstyr."
    ],
    whyItMatters: "ISS viser, hvordan ingeniørkunst, forskning og internationalt samarbejde kan holde mennesker sikkert boende i kredsløb i lang tid.",
    supportTitle: "Vidste du det?",
    facts: ["Den er et laboratorium i rummet.", "Den kredser om Jorden mange gange om dagen.", "Den har moduler, solpaneler, dockingporte, radiatorer og udvendigt udstyr."],
    action: "Åbn live-tracker"
  },
  "how-fast-is-the-iss": {
    keyIdea: "ISS bevæger sig hurtigt nok til at kredse om Jorden omtrent hvert 90. minut.",
    paragraphs: [
      "Stationen flyver med orbital hastighed. Den er meget hurtigere end et fly og krydser oceaner og kontinenter på få minutter.",
      "Den står ikke stille over én by. Dens jordspor flytter sig, fordi Jorden drejer under den.",
      "Den præcise hastighed og højde er en del af live-telemetrien i trackeren og ændrer sig lidt, når banen vedligeholdes."
    ],
    whyItMatters: "Hastigheden forklarer, hvorfor ISS kan passere hurtigt over himlen, og hvorfor besætningen ser mange solopgange hver dag.",
    supportTitle: "Hurtigt faktum",
    facts: ["Ét kredsløb tager cirka 90 minutter.", "ISS gennemfører omkring 16 kredsløb om dagen.", "Ruten over Jorden ændrer sig fra kredsløb til kredsløb."],
    action: "Følg aktuel hastighed"
  },
  "why-does-it-not-fall": {
    keyIdea: "Tyngdekraften trækker i ISS, men dens fremadrettede hastighed får den til hele tiden at ramme ved siden af Jorden.",
    paragraphs: [
      "ISS bliver ikke oppe, fordi tyngdekraften forsvinder. Tyngdekraften trækker stadig i stationen og alt indeni.",
      "Nøglen er kredsløb: Stationen falder konstant mod Jorden, men bevæger sig sidelæns så hurtigt, at Jorden krummer væk under den.",
      "Balancen mellem fald og fremadbevægelse holder ISS rundt om Jorden i stedet for lige ned."
    ],
    whyItMatters: "Kredsløb er en af de vigtigste idéer i rumfart. Det forklarer satellitter, bemandede rumfartøjer og trackerens skiftende kort.",
    supportTitle: "Almindelig misforståelse",
    facts: ["Tyngdekraften virker stadig på ISS.", "Stationen falder rundt om Jorden.", "Fremadrettet hastighed får den til at ramme ved siden af."],
    action: "Se kredsløbsruten"
  },
  "why-do-astronauts-float": {
    keyIdea: "Astronauter svæver, fordi ISS og alt indeni er i kontinuerligt frit fald sammen.",
    paragraphs: [
      "At svæve i stationen er ikke ægte nul tyngdekraft. Tyngdekraften er stadig til stede i kredsløb.",
      "Mikrogravitation opstår, fordi stationen, astronauter, værktøj, mad og vand falder rundt om Jorden sammen.",
      "Astronauter bruger håndlister, fodløkker og faste rutiner, så svævning bliver nyttig i stedet for kaotisk."
    ],
    whyItMatters: "Mikrogravitation ændrer menneskekroppe og eksperimenter. Derfor er stationen værdifuld for forskning, og besætningen træner hver dag.",
    supportTitle: "Almindelig misforståelse",
    facts: ["Mikrogravitation er ikke ægte nul tyngdekraft.", "Alt indeni falder rundt om Jorden sammen.", "Effekten får mennesker og ting til at svæve."],
    action: "Lær om stationsforskning"
  },
  "what-happens-inside": {
    keyIdea: "Inde i ISS har astronauter planlagte dage med forskning, vedligeholdelse, træning, måltider, søvn og kontakt med Jorden.",
    paragraphs: [
      "Besætningsmedlemmer sover i små kabiner, spiser nøje forberedt mad og bruger udstyr designet til et svævende miljø.",
      "En stor del af dagen går med eksperimenter, reparationer, systemtjek og samtaler med missionskontrol på Jorden.",
      "Træning er en del af arbejdsdagen, fordi muskler og knogler svækkes i mikrogravitation."
    ],
    whyItMatters: "Stationen er både hjem og arbejdsplads, så rutiner holder besætningen sund og rumfartøjet sikkert i drift.",
    supportTitle: "Hvorfor det betyder noget",
    facts: ["Astronauter sover, spiser, træner, arbejder og taler med Jorden.", "Vedligeholdelse er en del af stationslivet.", "Dagsrutiner er nøje planlagt."],
    action: "Åbn live-tracker",
    visualItems: ["Søvn", "Mad", "Træning", "Forskning", "Reparation", "Kontakt Jorden"]
  },
  "what-science-happens-there": {
    keyIdea: "ISS lader forskere undersøge systemer, der opfører sig anderledes, når tyngdekraften er stærkt reduceret.",
    paragraphs: [
      "Forskning på stationen omfatter biologi, menneskers sundhed, fysik, væsker, materialer, plantevækst, Jordobservation og teknologitest.",
      "I mikrogravitation kan flammer, væsker, celler, krystaller og muskler opføre sig anderledes end på Jorden.",
      "Stationen ser også tilbage på Jorden og hjælper med at observere storme, kyster, byer, brande, gletsjere og atmosfæren."
    ],
    whyItMatters: "ISS-forskning forbereder fremtidige rummissioner og kan forbedre medicin, materialer, teknologi og Jordobservation.",
    supportTitle: "Hvorfor det betyder noget",
    facts: ["Sundhedsforskning studerer kroppe i rummet.", "Plante- og biologiforsøg tester liv i mikrogravitation.", "Jordobservation forbinder rumforskning med vores planet."],
    action: "Udforsk NASA-billeder",
    visualItems: ["Biologi", "Sundhed", "Fysik", "Væsker", "Materialer", "Planter", "Jorden", "Teknologi"]
  },
  "how-do-spacecraft-dock": {
    keyIdea: "Besætnings- og fragtrumfartøjer kobler til ISS-dockingporte med omhyggelig styring og præcis kontrol.",
    paragraphs: [
      "Besøgende rumfartøjer bringer astronauter, mad, vand, eksperimenter, udstyr og forsyninger.",
      "En dockingtilgang skal være langsom og præcis. Rumfartøjet retter sig ind, kobler mekanisk til, og forbindelsen kontrolleres.",
      "Dockingporte er stationens trafiksystem og gør det muligt at modtage besøgende og forsyninger uden at lande på Jorden."
    ],
    whyItMatters: "Docking holder stationen forsynet og gør besætningsskift mulige, så ISS kan være en permanent arbejdsstation.",
    supportTitle: "Hurtigt faktum",
    facts: ["Besætnings- og fragtrumfartøjer besøger ISS.", "Dockingporte forbinder fartøjer med stationen.", "Docking er præcis og nøje kontrolleret."],
    action: "Se stationsbilleder"
  },
  "what-are-spacewalks": {
    keyIdea: "En rumvandring er arbejde uden for stationen i en rumdragt.",
    paragraphs: [
      "En rumvandring kaldes også EVA. Astronauter forlader stationens sikre indvendige moduler.",
      "Rumvandringer bruges til reparationer, opgraderinger, inspektioner, installation af udstyr og enkelte eksperimenter.",
      "EVA'er planlægges nøje, fordi de er svære og farlige. Rumdragter skal give ilt, køling, kommunikation, tryk og beskyttelse."
    ],
    whyItMatters: "Rumvandringer lader besætninger vedligeholde og forbedre stationen, når robotarme eller indvendige reparationer ikke er nok.",
    supportTitle: "Hvorfor det betyder noget",
    facts: ["EVA betyder extravehicular activity.", "Astronauter arbejder udenfor i rumdragter.", "Rumvandringer understøtter reparationer, opgraderinger, inspektioner og eksperimenter."],
    action: "Åbn NASA-galleri"
  }
};

function getLearnText(language) {
  const translated = translatedLearnContent[language];

  if (!translated) {
    return {
      questions: learningQuestions,
      modules: moduleContent,
      challengeQuestions,
      quizItems,
      continueLinks,
      resultTiers: null,
      hero: {
        kicker: "Learning Modules",
        title: "Learn About the ISS",
        intro: "Explore orbit, speed, microgravity, station life, science, docking, and spacewalks.",
        chips: ["8 learning modules", "Beginner friendly", "10-15 min", "Includes quick quiz"],
        start: "Start learning",
        quiz: "Jump to quiz",
        note: "Read the modules or test yourself right away."
      },
      overview: {
        kicker: "Learning path",
        title: "Choose your first mission question.",
        intro: "Use the mission map to jump between modules. Mark a module as learned when you finish it."
      },
      ui: {
        learned: "Learned",
        openModule: "Open module",
        learningQuestion: "Learning question",
        keyIdea: "Key idea",
        miniFacts: "Mini facts",
        whyItMatters: "Why it matters",
        marked: "Marked as learned. This module now counts toward your mission progress.",
        markPrompt: "Finished this module? Mark it so your Mission Path updates.",
        markButton: "Mark as learned",
        missionPath: "Mission path",
        progress: (count, total) => `${count} / ${total} modules marked as learned`,
        progressHint: "Use each module's Mark as learned button to complete it.",
        done: "Done",
        reset: "Reset progress",
        checkpointKicker: "Mission checkpoint",
        checkpointTitle: "Ready for a quick challenge?",
        checkpointIntro: "Test what you know about orbit, microgravity, speed, and life on the station.",
        sixQuestions: "6 questions",
        instantFeedback: "Instant feedback",
        finalRank: "Final rank",
        startQuiz: "Start mini quiz",
        quickKicker: "Quick challenge",
        quickTitle: "Orbit check-in",
        quickIntro: "Try these before the final quiz. Each tap gives immediate feedback.",
        trueLabel: "True",
        falseLabel: "False",
        answered: (count, total) => `${count} / ${total} answered`,
        miniQuizKicker: "Mini quiz",
        miniQuizTitle: "Mini Quiz: Are you ready for orbit?",
        miniQuizIntro: "Answer one question at a time and get instant feedback as you go.",
        questionOf: (current, total) => `Question ${current} of ${total}`,
        score: (score) => `Score: ${score}`,
        correct: "Correct",
        notQuite: "Not quite",
        showResult: "Show result",
        nextQuestion: "Next question",
        finalResult: "Final result",
        correctCount: (score, total) => `${score} / ${total} correct`,
        hideReview: "Hide review",
        reviewAnswers: "Review answers",
        tryAgain: "Try again",
        reviewModules: "Review learning modules",
        openTracker: "Open Live Tracker",
        yourAnswer: "Your answer",
        correctAnswer: "Correct answer",
        continueKicker: "Continue exploring",
        continueTitle: "Next steps after the learning guide."
      }
    };
  }

  const localizedQuestions = learningQuestions.map((question, index) => ({
    ...question,
    title: translated.questions[index][0],
    teaser: translated.questions[index][1],
    category: translated.questions[index][2]
  }));
  const localizedModules = Object.fromEntries(
    Object.entries(moduleContent).map(([id, module]) => {
      const translatedModule = translated.modules[id];

      return [
        id,
        {
          ...module,
          ...translatedModule,
          action: module.action
            ? {
                ...module.action,
                label: translatedModule.action
              }
            : undefined
        }
      ];
    })
  );
  const localizedChallengeQuestions = translated.challengeQuestions.map(
    ([prompt, answer, feedback]) => ({ prompt, answer, feedback })
  );
  const localizedQuizItems = translated.quizItems.map(
    ([question, choices, correctIndex, explanation]) => ({
      question,
      choices,
      correctIndex,
      explanation
    })
  );
  const localizedContinueLinks = continueLinks.map((link, index) => ({
    ...link,
    label: translated.continueLinks[index]
  }));

  return {
    ...translated,
    questions: localizedQuestions,
    modules: localizedModules,
    challengeQuestions: localizedChallengeQuestions,
    quizItems: localizedQuizItems,
    continueLinks: localizedContinueLinks
  };
}

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

const translatedLearnContent = {
  de: {
    hero: {
      kicker: "Lernmodule",
      title: "Über die ISS lernen",
      intro: "Erkunde Orbit, Geschwindigkeit, Mikrogravitation, Stationsleben, Wissenschaft, Andocken und Weltraumspaziergänge.",
      chips: ["8 Lernmodule", "Für Einsteiger", "10-15 Min.", "Mit Kurzquiz"],
      start: "Lernen starten",
      quiz: "Zum Quiz springen",
      note: "Lies die Module oder teste dich direkt."
    },
    overview: {
      kicker: "Lernpfad",
      title: "Wähle deine erste Missionsfrage.",
      intro: "Nutze die Missionskarte, um zwischen Modulen zu springen. Markiere ein Modul als gelernt, wenn du fertig bist."
    },
    ui: {
      learned: "Gelernt",
      openModule: "Modul öffnen",
      learningQuestion: "Lernfrage",
      keyIdea: "Kernidee",
      miniFacts: "Mini-Fakten",
      whyItMatters: "Warum es wichtig ist",
      marked: "Als gelernt markiert. Dieses Modul zählt jetzt zu deinem Missionsfortschritt.",
      markPrompt: "Mit diesem Modul fertig? Markiere es, damit dein Missionspfad aktualisiert wird.",
      markButton: "Als gelernt markieren",
      missionPath: "Missionspfad",
      progress: (count, total) => `${count} / ${total} Module als gelernt markiert`,
      progressHint: "Nutze in jedem Modul die Taste Als gelernt markieren.",
      done: "Fertig",
      reset: "Fortschritt zurücksetzen",
      checkpointKicker: "Missions-Checkpoint",
      checkpointTitle: "Bereit für eine kurze Herausforderung?",
      checkpointIntro: "Teste, was du über Orbit, Mikrogravitation, Geschwindigkeit und Leben auf der Station weißt.",
      sixQuestions: "6 Fragen",
      instantFeedback: "Sofortiges Feedback",
      finalRank: "Endrang",
      startQuiz: "Miniquiz starten",
      quickKicker: "Schnelltest",
      quickTitle: "Orbit-Check-in",
      quickIntro: "Probiere diese Fragen vor dem finalen Quiz. Jede Auswahl gibt sofort Feedback.",
      trueLabel: "Wahr",
      falseLabel: "Falsch",
      answered: (count, total) => `${count} / ${total} beantwortet`,
      miniQuizKicker: "Miniquiz",
      miniQuizTitle: "Miniquiz: Bist du bereit für den Orbit?",
      miniQuizIntro: "Beantworte eine Frage nach der anderen und bekomme direkt Feedback.",
      questionOf: (current, total) => `Frage ${current} von ${total}`,
      score: (score) => `Punkte: ${score}`,
      correct: "Richtig",
      notQuite: "Nicht ganz",
      showResult: "Ergebnis anzeigen",
      nextQuestion: "Nächste Frage",
      finalResult: "Endergebnis",
      correctCount: (score, total) => `${score} / ${total} richtig`,
      hideReview: "Auswertung ausblenden",
      reviewAnswers: "Antworten prüfen",
      tryAgain: "Erneut versuchen",
      reviewModules: "Lernmodule wiederholen",
      openTracker: "Live-Tracker öffnen",
      yourAnswer: "Deine Antwort",
      correctAnswer: "Richtige Antwort",
      continueKicker: "Weiter erkunden",
      continueTitle: "Nächste Schritte nach dem Lernführer."
    },
    questions: [
      ["Was ist die ISS?", "Ein großes Raumfahrzeug, in dem Astronauten leben, arbeiten und forschen.", "Grundlagen"],
      ["Wie schnell ist die ISS?", "Sie umrundet die Erde mit Orbitgeschwindigkeit ungefähr alle 90 Minuten.", "Geschwindigkeit"],
      ["Warum fällt die ISS nicht herunter?", "Sie fällt um die Erde herum und bewegt sich schnell genug, um den Boden zu verfehlen.", "Orbit"],
      ["Warum schweben Astronauten?", "Astronauten schweben, weil alles in der Station gemeinsam fällt.", "Mikrogravitation"],
      ["Was passiert in der ISS?", "Crewmitglieder schlafen, essen, trainieren, reparieren Systeme und führen Experimente aus.", "Leben"],
      ["Welche Wissenschaft passiert dort?", "Mikrogravitation hilft, Körper, Materialien, Pflanzen, Flüssigkeiten und die Erde zu untersuchen.", "Wissenschaft"],
      ["Wie docken Raumfahrzeuge an?", "Crew- und Frachtraumfahrzeuge verbinden sich präzise mit Andockports der Station.", "Andocken"],
      ["Was sind Weltraumspaziergänge?", "Astronauten verlassen die Station in Raumanzügen für Reparaturen, Inspektionen und Upgrades.", "EVA"]
    ],
    modules: {
      "what-is-the-iss": {
        keyIdea: "Die Internationale Raumstation ist ein großes Raumfahrzeug, in dem Astronauten im Orbit um die Erde leben, arbeiten und forschen.",
        paragraphs: [
          "Die ISS ist ein echtes Raumfahrzeug, kein Gebäude am Himmel. Sie umrundet die Erde, während Crews monatelang in ihr leben.",
          "Sie ist auch ein Wissenschaftslabor. Astronauten untersuchen dort, wie Menschen, Pflanzen, Flüssigkeiten, Materialien und Geräte im All reagieren.",
          "Die Station besteht aus verbundenen Druckmodulen, Solarpaneelen, Andockports, Roboterarmen, Radiatoren und Außengeräten."
        ],
        whyItMatters: "Die ISS zeigt, wie Ingenieurkunst, Wissenschaft und internationale Zusammenarbeit Menschen lange sicher im Orbit leben lassen.",
        supportTitle: "Wusstest du schon?",
        facts: ["Sie ist ein Labor im All.", "Sie umrundet die Erde viele Male pro Tag.", "Sie hat Module, Solarpaneele, Andockports, Radiatoren und Außengeräte."],
        action: "Live-Tracker öffnen"
      },
      "how-fast-is-the-iss": {
        keyIdea: "Die ISS bewegt sich schnell genug, um die Erde ungefähr alle 90 Minuten zu umrunden.",
        paragraphs: [
          "Die Station fliegt mit Orbitgeschwindigkeit. Sie ist viel schneller als ein Flugzeug und überquert Ozeane und Kontinente in Minuten.",
          "Sie steht nicht fest über einer Stadt. Ihre Bodenspur verschiebt sich, weil sich die Erde unter ihr dreht.",
          "Exakte Geschwindigkeit und Höhe sind Teil der Live-Telemetrie im Tracker und ändern sich leicht durch Orbitpflege."
        ],
        whyItMatters: "Die Geschwindigkeit erklärt, warum die ISS schnell über deinen Himmel zieht und die Crew viele Sonnenaufgänge pro Tag sieht.",
        supportTitle: "Schneller Fakt",
        facts: ["Ein Orbit dauert etwa 90 Minuten.", "Die ISS schafft ungefähr 16 Orbits pro Tag.", "Der Pfad über der Erde ändert sich von Orbit zu Orbit."],
        action: "Aktuelle Geschwindigkeit verfolgen"
      },
      "why-does-it-not-fall": {
        keyIdea: "Die Schwerkraft zieht an der ISS, aber ihre Vorwärtsgeschwindigkeit lässt sie den Boden immer verfehlen.",
        paragraphs: [
          "Die ISS bleibt nicht oben, weil die Schwerkraft verschwindet. Die Schwerkraft wirkt weiterhin auf die Station und alles darin.",
          "Der Schlüssel ist der Orbit: Die Station fällt ständig zur Erde, bewegt sich aber seitwärts so schnell, dass die Erde unter ihr wegkrümmt.",
          "Dieses Gleichgewicht aus Fallen und Vorwärtsbewegung hält die ISS im Umlauf statt sie gerade nach unten fallen zu lassen."
        ],
        whyItMatters: "Orbit ist eine der wichtigsten Ideen der Raumfahrt. Er erklärt Satelliten, bemannte Raumfahrzeuge und die wechselnde Trackerkarte.",
        supportTitle: "Häufiger Irrtum",
        facts: ["Schwerkraft wirkt weiter auf die ISS.", "Die Station fällt um die Erde herum.", "Vorwärtsgeschwindigkeit lässt sie den Boden verfehlen."],
        action: "Orbitpfad ansehen"
      },
      "why-do-astronauts-float": {
        keyIdea: "Astronauten schweben, weil die ISS und alles darin gemeinsam im freien Fall sind.",
        paragraphs: [
          "Schweben in der Station ist keine echte Schwerelosigkeit. Schwerkraft ist im Orbit noch vorhanden.",
          "Mikrogravitation entsteht, weil Station, Menschen, Werkzeuge, Nahrung und Wasser gemeinsam um die Erde fallen.",
          "Astronauten nutzen Handläufe, Fußschlaufen und Routinen, damit Schweben nützlich statt chaotisch ist."
        ],
        whyItMatters: "Mikrogravitation verändert Körper und Experimente. Darum ist die Station wertvoll für Forschung und Crews trainieren täglich.",
        supportTitle: "Häufiger Irrtum",
        facts: ["Mikrogravitation ist nicht echte Nullgravitation.", "Alles im Inneren fällt gemeinsam um die Erde.", "Der Effekt lässt Menschen und Objekte schweben."],
        action: "Stationswissenschaft lernen"
      },
      "what-happens-inside": {
        keyIdea: "In der ISS folgen Astronauten geplanten Tagen mit Forschung, Wartung, Training, Mahlzeiten, Schlaf und Kommunikation mit der Erde.",
        paragraphs: [
          "Crewmitglieder schlafen in kleinen Crewquartieren, essen vorbereitete Nahrung und nutzen Ausrüstung für eine schwebende Umgebung.",
          "Ein großer Teil des Tages besteht aus Experimenten, Reparaturen, Systemchecks und Gesprächen mit Missionskontrollteams.",
          "Training gehört zum Arbeitstag, weil Muskeln und Knochen in Mikrogravitation schwächer werden."
        ],
        whyItMatters: "Die Station ist Zuhause und Arbeitsplatz zugleich. Routinen halten Crews gesund und das Raumfahrzeug sicher in Betrieb.",
        supportTitle: "Warum es wichtig ist",
        facts: ["Astronauten schlafen, essen, trainieren, arbeiten und sprechen mit der Erde.", "Wartung gehört zum Stationsleben.", "Tagesabläufe sind genau geplant."],
        action: "Live-Tracker öffnen",
        visualItems: ["Schlafen", "Essen", "Training", "Wissenschaft", "Reparatur", "Zur Erde sprechen"]
      },
      "what-science-happens-there": {
        keyIdea: "Die ISS lässt Wissenschaftler Systeme untersuchen, die sich bei stark reduzierter Schwerkraft anders verhalten.",
        paragraphs: [
          "Forschung auf der Station umfasst Biologie, Gesundheit, Physik, Flüssigkeiten, Materialien, Pflanzenwachstum, Erdbeobachtung und Technologietests.",
          "In Mikrogravitation verhalten sich Flammen, Flüssigkeiten, Zellen, Kristalle und Muskeln anders.",
          "Die Station blickt auch zurück zur Erde und hilft, Stürme, Küsten, Städte, Feuer, Gletscher und Atmosphäre zu beobachten."
        ],
        whyItMatters: "ISS-Forschung bereitet zukünftige Missionen vor und kann Medizin, Materialien, Technologie und Erdbeobachtung verbessern.",
        supportTitle: "Warum es wichtig ist",
        facts: ["Gesundheitsforschung untersucht Körper im All.", "Pflanzen- und Biologieexperimente testen Leben in Mikrogravitation.", "Erdbeobachtung verbindet Raumfahrt mit unserem Planeten."],
        action: "NASA-Bilder erkunden",
        visualItems: ["Biologie", "Gesundheit", "Physik", "Flüssigkeiten", "Materialien", "Pflanzen", "Erde", "Technologie"]
      },
      "how-do-spacecraft-dock": {
        keyIdea: "Crew- und Frachtraumfahrzeuge verbinden sich mit sorgfältiger Führung und präziser Kontrolle mit Andockports der ISS.",
        paragraphs: [
          "Besuchende Raumfahrzeuge bringen Astronauten, Nahrung, Wasser, Experimente, Ausrüstung und Vorräte.",
          "Ein Andockanflug muss langsam und genau sein. Das Raumfahrzeug richtet sich aus, verbindet mechanisch und die Verbindung wird geprüft.",
          "Andockports sind Teil des Verkehrssystems der Station und ermöglichen Besuche und Versorgung ohne Landung auf der Erde."
        ],
        whyItMatters: "Andocken versorgt die Station und ermöglicht Crewwechsel. So bleibt die ISS ein dauerhaft arbeitender Außenposten.",
        supportTitle: "Schneller Fakt",
        facts: ["Crew- und Frachtraumfahrzeuge besuchen die ISS.", "Andockports verbinden Fahrzeuge mit der Station.", "Andocken ist präzise und streng kontrolliert."],
        action: "Stationsbilder ansehen"
      },
      "what-are-spacewalks": {
        keyIdea: "Ein Weltraumspaziergang ist Arbeit außerhalb der Station in einem Raumanzug.",
        paragraphs: [
          "Ein Weltraumspaziergang heißt auch EVA. Astronauten verlassen dabei die sicheren Innenmodule der Station.",
          "EVAs dienen Reparaturen, Upgrades, Inspektionen, Installation von Ausrüstung und einigen Experimenten.",
          "Sie sind sorgfältig geplant, weil sie schwierig und gefährlich sind. Raumanzüge liefern Sauerstoff, Kühlung, Kommunikation, Druck und Schutz."
        ],
        whyItMatters: "Weltraumspaziergänge ermöglichen Wartung und Verbesserungen, wenn Roboterarme oder Innenreparaturen nicht ausreichen.",
        supportTitle: "Warum es wichtig ist",
        facts: ["EVA bedeutet Außenbordeinsatz.", "Astronauten arbeiten draußen in Raumanzügen.", "Weltraumspaziergänge unterstützen Reparaturen, Upgrades, Inspektionen und Experimente."],
        action: "NASA-Galerie öffnen"
      }
    },
    challengeQuestions: [
      ["Wahr oder falsch: Die ISS schwebt, weil es keine Schwerkraft gibt.", false, "Falsch. Schwerkraft ist weiterhin vorhanden. Die Station und alles darin fallen gemeinsam."],
      ["Wahr oder falsch: Die ISS schafft einen Orbit in ungefähr 90 Minuten.", true, "Wahr. Dieser schnelle Orbit lässt ihre Bodenspur rasch wechseln."],
      ["Wahr oder falsch: Die ISS bleibt den ganzen Tag über derselben Stadt.", false, "Falsch. Die Erde dreht sich unter ihr, während die Station um den Planeten fliegt."]
    ],
    quizItems: [
      ["Warum schweben Astronauten in der ISS?", ["Weil es im Orbit keine Schwerkraft gibt", "Weil Station und alles darin gemeinsam fallen", "Weil Luft sie nach oben drückt"], 1, "Schwerkraft ist vorhanden. Astronauten schweben, weil Station, Menschen und Objekte gemeinsam um die Erde fallen."],
      ["Wie lange dauert ein ISS-Orbit?", ["Etwa 9 Minuten", "Etwa 90 Minuten", "Etwa 9 Stunden"], 1, "Die ISS umrundet die Erde ungefähr alle 90 Minuten, also etwa 16 Mal pro Tag."],
      ["Warum fällt die ISS nicht gerade zur Erde?", ["Ihre Vorwärtsgeschwindigkeit lässt sie den Boden verfehlen", "Solarpaneele halten sie oben", "Sie ist außerhalb der Erdschwerkraft"], 0, "Die Station fällt, aber ihre Vorwärtsbewegung trägt sie um die Erde herum."],
      ["Was machen Solarpaneele?", ["Strom erzeugen", "Künstliche Schwerkraft machen", "Die Station wie Flügel steuern"], 0, "Solarpaneele wandeln Sonnenlicht in Strom für Stationssysteme und Experimente um."],
      ["Was ist Andocken?", ["Ein Weltraumspaziergang außerhalb der ISS", "Ein Raumfahrzeug verbindet sich mit der Station", "Ein Teleskop macht Erdaufnahmen"], 1, "Andocken lässt Crew- und Frachtraumfahrzeuge sicher mit der Station verbinden."],
      ["Was bedeutet EVA?", ["Erdbeobachtungswinkel", "Außenbordeinsatz", "Notfallfahrzeug-Ankunft"], 1, "EVA bedeutet extravehicular activity, meist Weltraumspaziergang genannt."]
    ],
    resultTiers: [
      ["ISS-Neuling", "Du hast die ersten Teile. Wiederhole Orbit und Mikrogravitation und versuche es erneut."],
      ["Orbit-Explorer", "Starker Fortschritt. Du verstehst die großen Ideen hinter der Station."],
      ["Stationsspezialist", "Ausgezeichnet. Du kannst die ISS wie ein Missionsguide erklären."]
    ],
    continueLinks: ["ISS live verfolgen", "ISS von der Erde sehen", "NASA-Galerie erkunden", "Über die Daten"]
  },
  da: {
    hero: {
      kicker: "Læringsmoduler",
      title: "Lær om ISS",
      intro: "Udforsk kredsløb, hastighed, mikrogravitation, livet på stationen, forskning, docking og rumvandringer.",
      chips: ["8 læringsmoduler", "Begyndervenlig", "10-15 min", "Med hurtig quiz"],
      start: "Start læring",
      quiz: "Hop til quiz",
      note: "Læs modulerne eller test dig selv med det samme."
    },
    overview: {
      kicker: "Læringssti",
      title: "Vælg dit første missionsspørgsmål.",
      intro: "Brug missionskortet til at hoppe mellem moduler. Markér et modul som lært, når du er færdig."
    },
    ui: {
      learned: "Lært",
      openModule: "Åbn modul",
      learningQuestion: "Læringsspørgsmål",
      keyIdea: "Hovedidé",
      miniFacts: "Mini-fakta",
      whyItMatters: "Hvorfor det betyder noget",
      marked: "Markeret som lært. Modulet tæller nu med i din missionsfremgang.",
      markPrompt: "Færdig med modulet? Markér det, så din missionssti opdateres.",
      markButton: "Markér som lært",
      missionPath: "Missionssti",
      progress: (count, total) => `${count} / ${total} moduler markeret som lært`,
      progressHint: "Brug hvert moduls Markér som lært-knap for at gennemføre det.",
      done: "Klar",
      reset: "Nulstil fremgang",
      checkpointKicker: "Missionscheckpoint",
      checkpointTitle: "Klar til en hurtig udfordring?",
      checkpointIntro: "Test hvad du ved om kredsløb, mikrogravitation, hastighed og livet på stationen.",
      sixQuestions: "6 spørgsmål",
      instantFeedback: "Øjeblikkelig feedback",
      finalRank: "Slutrang",
      startQuiz: "Start mini-quiz",
      quickKicker: "Hurtig udfordring",
      quickTitle: "Orbit check-in",
      quickIntro: "Prøv disse før den afsluttende quiz. Hvert tryk giver straks feedback.",
      trueLabel: "Sandt",
      falseLabel: "Falsk",
      answered: (count, total) => `${count} / ${total} besvaret`,
      miniQuizKicker: "Mini-quiz",
      miniQuizTitle: "Mini-quiz: Er du klar til kredsløb?",
      miniQuizIntro: "Svar på ét spørgsmål ad gangen og få straks feedback.",
      questionOf: (current, total) => `Spørgsmål ${current} af ${total}`,
      score: (score) => `Score: ${score}`,
      correct: "Korrekt",
      notQuite: "Ikke helt",
      showResult: "Vis resultat",
      nextQuestion: "Næste spørgsmål",
      finalResult: "Slutresultat",
      correctCount: (score, total) => `${score} / ${total} korrekte`,
      hideReview: "Skjul gennemgang",
      reviewAnswers: "Gennemgå svar",
      tryAgain: "Prøv igen",
      reviewModules: "Gennemgå læringsmoduler",
      openTracker: "Åbn live-tracker",
      yourAnswer: "Dit svar",
      correctAnswer: "Korrekt svar",
      continueKicker: "Udforsk videre",
      continueTitle: "Næste skridt efter læringsguiden."
    },
    questions: [
      ["Hvad er ISS?", "Et stort rumfartøj hvor astronauter bor, arbejder og forsker.", "Grundlag"],
      ["Hvor hurtigt flyver ISS?", "Den kredser om Jorden cirka hvert 90. minut med orbital hastighed.", "Hastighed"],
      ["Hvorfor falder ISS ikke ned?", "Den falder rundt om Jorden, mens den bevæger sig hurtigt nok til at ramme ved siden af.", "Kredsløb"],
      ["Hvorfor svæver astronauter?", "Astronauter svæver, fordi alt inde i stationen falder sammen.", "Mikrogravitation"],
      ["Hvad sker der inde i ISS?", "Besætningen sover, spiser, træner, reparerer systemer og udfører eksperimenter.", "Liv"],
      ["Hvilken forskning foregår der?", "Mikrogravitation hjælper forskere med at studere kroppe, materialer, planter, væsker og Jorden.", "Forskning"],
      ["Hvordan docker rumfartøjer?", "Besætnings- og fragtrumfartøjer kobler præcist til stationens dockingporte.", "Docking"],
      ["Hvad er rumvandringer?", "Astronauter forlader stationen i rumdragter for reparationer, inspektioner og opgraderinger.", "EVA"]
    ],
    modules: danishLearnModules,
    challengeQuestions: [
      ["Sandt eller falsk: ISS svæver, fordi der ikke er tyngdekraft.", false, "Falsk. Tyngdekraften er stadig til stede. Stationen og alt indeni falder sammen."],
      ["Sandt eller falsk: ISS fuldfører et kredsløb på cirka 90 minutter.", true, "Sandt. Det hurtige kredsløb får jordsporet til at skifte hurtigt."],
      ["Sandt eller falsk: ISS bliver over den samme by hele dagen.", false, "Falsk. Jorden drejer under stationen, mens den kredser om planeten."]
    ],
    quizItems: [
      ["Hvorfor svæver astronauter inde i ISS?", ["Fordi der ikke er tyngdekraft i kredsløb", "Fordi stationen og alt indeni falder sammen", "Fordi luften presser dem opad"], 1, "Tyngdekraften er stadig til stede. Astronauter svæver, fordi stationen, mennesker og ting falder rundt om Jorden sammen."],
      ["Hvor lang tid tager ét ISS-kredsløb?", ["Cirka 9 minutter", "Cirka 90 minutter", "Cirka 9 timer"], 1, "ISS kredser om Jorden cirka hvert 90. minut, omtrent 16 kredsløb om dagen."],
      ["Hvorfor falder ISS ikke lige ned på Jorden?", ["Dens fremadrettede hastighed får den til at ramme ved siden af", "Solpanelerne holder den oppe", "Den er uden for Jordens tyngdekraft"], 0, "Stationen falder, men dens fremadrettede bevægelse bærer den rundt om Jorden."],
      ["Hvad gør solpaneler?", ["Producerer elektricitet", "Laver kunstig tyngdekraft", "Styrer stationen som vinger"], 0, "Solpaneler omdanner sollys til elektricitet til stationens systemer og eksperimenter."],
      ["Hvad er docking?", ["En rumvandring uden for ISS", "Et rumfartøj kobler sig til stationen", "Et teleskop tager billeder af Jorden"], 1, "Docking gør det muligt for besætnings- og fragtrumfartøjer at koble sikkert til stationen."],
      ["Hvad betyder EVA?", ["Earth viewing angle", "Extravehicular activity", "Emergency vehicle arrival"], 1, "EVA betyder extravehicular activity, normalt kaldet en rumvandring."]
    ],
    resultTiers: [
      ["ISS-rookie", "Du har de første brikker. Gennemgå kredsløb og mikrogravitation, og prøv igen."],
      ["Orbit-udforsker", "Stærk fremgang. Du forstår de store idéer bag stationen."],
      ["Stationsspecialist", "Fremragende. Du kan forklare ISS som en missionsguide."]
    ],
    continueLinks: ["Følg ISS live", "Se ISS fra Jorden", "Udforsk NASA-galleri", "Om data"]
  }
};

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

function LearningPathCards({ questions, activeId, learnedIds, localizedPath, ui }) {
  return (
    <div className="learn-path-grid">
      {questions.map((question, index) => (
        <a
          className={`learn-path-card${question.id === activeId ? " is-active" : ""}${learnedIds.has(question.id) ? " is-complete" : ""}`}
          href={localizedPath(question.href)}
          key={question.id}
        >
          <div className="learn-path-card-top">
            <span>{question.category}</span>
            <strong aria-hidden="true">{String(index + 1).padStart(2, "0")}</strong>
          </div>
          <h3>{question.title}</h3>
          <p>{question.teaser}</p>
          <small>{learnedIds.has(question.id) ? ui.learned : ui.openModule}</small>
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

function LearningSection({ question, module, isLearned, onMarkLearned, ui, localizedPath }) {

  return (
    <section className="learn-module" id={question.id}>
      <div className="learn-module-header">
        <div>
          <span className="section-kicker">{ui.learningQuestion}</span>
          <h2>{question.title}</h2>
        </div>
        <VisualSupport module={module} />
      </div>

      <div className="key-idea-card">
        <span>{ui.keyIdea}</span>
        <p>{module.keyIdea}</p>
      </div>

      <div className="learn-copy">
        {module.paragraphs.map((paragraph, index) => (
          <p key={`${question.id}-${index}`}>{paragraph}</p>
        ))}
      </div>

      <div className="learn-support-grid">
        <article className="mini-fact-card">
          <h3>{ui.miniFacts}</h3>
          <ul>
            {module.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </article>
        <article className="why-card">
          <h3>{module.supportTitle || ui.whyItMatters}</h3>
          <p>{module.whyItMatters}</p>
          {module.action ? (
            <a className="card-link" href={localizedPath(module.action.href)}>
              {module.action.label}
            </a>
          ) : null}
        </article>
      </div>

      <div className="module-complete-row">
        <p>{isLearned ? ui.marked : ui.markPrompt}</p>
        <button type="button" className={isLearned ? "button-secondary" : "button-primary"} onClick={onMarkLearned}>
          {isLearned ? ui.learned : ui.markButton}
        </button>
      </div>
    </section>
  );
}

function LearningPathSidebar({ questions, activeId, learnedIds, onResetProgress, localizedPath, ui }) {
  const learnedCount = learnedIds.size;

  return (
    <aside className="learn-toc" aria-label="Learning path">
      <span className="section-kicker">{ui.missionPath}</span>
      <strong className="learn-progress-text">
        {ui.progress(learnedCount, questions.length)}
      </strong>
      <small>{ui.progressHint}</small>
      <div className="learn-progress-track" aria-hidden="true">
        <span style={{ width: `${(learnedCount / questions.length) * 100}%` }} />
      </div>
      <nav>
        {questions.map((question, index) => (
          <a
            className={`${question.id === activeId ? "is-active" : ""}${learnedIds.has(question.id) ? " is-complete" : ""}`}
            href={localizedPath(question.href)}
            key={question.id}
            aria-current={question.id === activeId ? "location" : undefined}
          >
            <span>{learnedIds.has(question.id) ? ui.done : index + 1}</span>
            {question.title}
          </a>
        ))}
      </nav>
      <button type="button" className="learn-reset-button" onClick={onResetProgress}>
        {ui.reset}
      </button>
    </aside>
  );
}

function QuizCheckpoint({ ui }) {
  return (
    <section className="content-section quiz-checkpoint" aria-labelledby="quiz-checkpoint-title">
      <div>
        <span className="section-kicker">{ui.checkpointKicker}</span>
        <h2 id="quiz-checkpoint-title">{ui.checkpointTitle}</h2>
        <p>{ui.checkpointIntro}</p>
      </div>
      <div className="quiz-checkpoint-card">
        <strong>{ui.sixQuestions}</strong>
        <span>{ui.instantFeedback}</span>
        <span>{ui.finalRank}</span>
        <a className="button-primary" href="#quiz">
          {ui.startQuiz}
        </a>
      </div>
    </section>
  );
}

function FragmentWithChallenge({ question, module, index, isLearned, onMarkLearned, challengeQuestions, ui, localizedPath }) {
  return (
    <>
      <LearningSection question={question} module={module} isLearned={isLearned} onMarkLearned={onMarkLearned} ui={ui} localizedPath={localizedPath} />
      {index === 2 ? <QuickChallenge challengeQuestions={challengeQuestions} ui={ui} /> : null}
    </>
  );
}

function QuickChallenge({ challengeQuestions, ui }) {
  const [answers, setAnswers] = useState({});
  const answeredCount = Object.keys(answers).length;

  return (
    <section className="quick-challenge" id="quick-challenge">
      <div>
        <span className="section-kicker">{ui.quickKicker}</span>
        <h2>{ui.quickTitle}</h2>
        <p>{ui.quickIntro}</p>
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
                    {value ? ui.trueLabel : ui.falseLabel}
                  </button>
                ))}
              </div>
              {answer !== undefined ? <p>{question.feedback}</p> : null}
            </article>
          );
        })}
      </div>
      <span className="challenge-progress">{ui.answered(answeredCount, challengeQuestions.length)}</span>
    </section>
  );
}

function getResultTier(score, resultTiers) {
  if (resultTiers) {
    const tier = score <= 2 ? resultTiers[0] : score <= 4 ? resultTiers[1] : resultTiers[2];

    return {
      title: tier[0],
      message: tier[1]
    };
  }

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

function MiniQuiz({ quizItems, resultTiers, ui, localizedPath }) {
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
  const result = getResultTier(score, resultTiers);

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
        <span className="section-kicker">{ui.miniQuizKicker}</span>
        <h2>{ui.miniQuizTitle}</h2>
        <p>{ui.miniQuizIntro}</p>
      </div>

      <div className="quiz-progress-row">
        <span>{ui.questionOf(Math.min(answeredQuestions + 1, quizItems.length), quizItems.length)}</span>
        <strong>{ui.score(score)}</strong>
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
                {selectedIndex === currentQuestion.correctIndex ? ui.correct : ui.notQuite}
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
                {isLastQuestion ? ui.showResult : ui.nextQuestion}
              </button>
            </div>
          ) : null}
        </article>
      ) : (
        <article className="quiz-result-card">
          <span className="section-kicker">{ui.finalResult}</span>
          <h3>{result.title}</h3>
          <strong>{ui.correctCount(score, quizItems.length)}</strong>
          <p>{result.message}</p>
          <div className="hero-actions">
            <button type="button" className="button-secondary" onClick={() => setShowReview((value) => !value)}>
              {showReview ? ui.hideReview : ui.reviewAnswers}
            </button>
            <button type="button" className="button-secondary" onClick={handleReset}>
              {ui.tryAgain}
            </button>
            <a className="button-secondary" href="#what-is-the-iss">
              {ui.reviewModules}
            </a>
            <a className="button-primary" href={localizedPath("/tracker")}>
              {ui.openTracker}
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
                    <p>{ui.yourAnswer}: {item.choices[answerIndex]}</p>
                    <p>{ui.correctAnswer}: {item.choices[item.correctIndex]}</p>
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
  const { language, localizedPath } = useI18n();
  const learnText = useMemo(() => getLearnText(language), [language]);
  const questions = learnText.questions;
  const ui = learnText.ui;
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

    questions.forEach((question) => {
      const section = document.getElementById(question.id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [questions]);

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
        kicker={learnText.hero.kicker}
        title={learnText.hero.title}
        actions={
          <div className="learn-hero-actions">
            <div className="learn-hero-chips" aria-label="Learning page summary">
              {learnText.hero.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
            <div className="hero-actions">
              <a className="button-primary" href="#what-is-the-iss">
                {learnText.hero.start}
              </a>
              <a className="button-secondary" href="#quiz">
                {learnText.hero.quiz}
              </a>
            </div>
            <p className="learn-hero-note">{learnText.hero.note}</p>
          </div>
        }
      >
        {learnText.hero.intro}
      </PageHero>

      <section className="content-section learn-path-overview">
        <div className="section-heading-wide">
          <span className="section-kicker">{learnText.overview.kicker}</span>
          <h2>{learnText.overview.title}</h2>
          <p>{learnText.overview.intro}</p>
        </div>
        <LearningPathCards questions={questions} activeId={activeModuleId} learnedIds={learnedModuleIds} localizedPath={localizedPath} ui={ui} />
      </section>

      <QuizCheckpoint ui={ui} />

      <section className="content-section learn-guide-layout">
        <LearningPathSidebar
          questions={questions}
          activeId={activeModuleId}
          learnedIds={learnedModuleIds}
          onResetProgress={resetProgress}
          localizedPath={localizedPath}
          ui={ui}
        />

        <article className="learn-article">
          {questions.map((question, index) => (
            <FragmentWithChallenge
              question={question}
              module={learnText.modules[question.id]}
              index={index}
              isLearned={learnedModuleIds.has(question.id)}
              onMarkLearned={() => markModuleLearned(question.id)}
              challengeQuestions={learnText.challengeQuestions}
              ui={ui}
              localizedPath={localizedPath}
              key={question.id}
            />
          ))}
        </article>

        <div className="learn-full-width">
          <MiniQuiz quizItems={learnText.quizItems} resultTiers={learnText.resultTiers} ui={ui} localizedPath={localizedPath} />
        </div>
      </section>

      <section className="content-section continue-section">
        <div className="section-heading-wide compact-heading">
          <span className="section-kicker">{ui.continueKicker}</span>
          <h2>{ui.continueTitle}</h2>
        </div>
        <div className="continue-grid">
          {learnText.continueLinks.map((link) => (
            <a className="continue-card" href={localizedPath(link.href)} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
