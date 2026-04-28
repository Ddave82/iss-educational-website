import { Accordion } from "../components/ui/Accordion";
import { InfoTip } from "../components/ui/InfoTip";
import { PageHero } from "../components/ui/PageHero";

const learningItems = [
  {
    title: "What is the ISS?",
    content: (
      <>
        <p>
          The International Space Station is a large spacecraft where astronauts
          live and work. It is also a science laboratory, an engineering test
          platform, and a symbol of international cooperation.
        </p>
        <p>
          The station is made from pressurized modules{" "}
          <InfoTip label="Pressurized module">
            A pressurized module is a sealed room with air where astronauts can
            work without a spacesuit.
          </InfoTip>
          , solar arrays, docking ports, radiators, robotic arms, and equipment
          mounted outside.
        </p>
      </>
    )
  },
  {
    title: "Orbit and speed",
    info: "Orbit is a curved path around Earth.",
    content: (
      <p>
        The ISS moves very fast. It circles Earth roughly every 90 minutes and
        is not floating still above one place. Its path across the ground shifts
        as Earth rotates underneath.
      </p>
    )
  },
  {
    title: "Why does the ISS not fall down?",
    content: (
      <p>
        The station is falling toward Earth, but it also has a huge forward
        speed. That forward motion keeps it missing the ground, so it keeps
        falling around Earth. That is orbital motion.
      </p>
    )
  },
  {
    title: "Microgravity",
    info: "Microgravity is not zero gravity.",
    content: (
      <p>
        Astronauts float because the station and everything inside it are in
        continuous free fall together. Gravity is still present in orbit; it is
        just not felt as normal weight inside the station.
      </p>
    )
  },
  {
    title: "Life inside the station",
    content: (
      <ul className="learning-list">
        <li>Sleeping bags attach to walls so astronauts do not drift away.</li>
        <li>Meals are prepared carefully so crumbs and liquids stay controlled.</li>
        <li>Exercise helps protect muscles and bones during long missions.</li>
        <li>Crew members work with mission control and talk with people on Earth.</li>
      </ul>
    )
  },
  {
    title: "Science and experiments",
    content: (
      <p>
        The station supports biology, physics, medicine, materials research,
        technology demonstrations, and Earth observation. Microgravity changes
        how fluids, flames, cells, crystals, and human bodies behave.
      </p>
    )
  },
  {
    title: "Spacewalks and docking",
    content: (
      <p>
        A spacewalk is also called an EVA{" "}
        <InfoTip label="EVA">
          EVA means extravehicular activity: work done outside a spacecraft in
          a spacesuit.
        </InfoTip>
        . Crews use EVAs for maintenance and upgrades. Visiting spacecraft dock{" "}
        <InfoTip label="Docking">
          Docking is when a spacecraft carefully connects to the station.
        </InfoTip>{" "}
        to bring crew, supplies, experiments, and equipment.
      </p>
    )
  }
];

export function LearnPage() {
  return (
    <>
      <PageHero kicker="Learning modules" title="Learn About the ISS">
        Simple explanations about orbit, microgravity, station life,
        experiments, spacewalks, and docking.
      </PageHero>
      <section className="content-section readable-section">
        <Accordion items={learningItems} />
      </section>
    </>
  );
}
