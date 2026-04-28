const learningTopics = [
  {
    id: "what-is-the-iss",
    eyebrow: "What is the ISS?",
    title: "A science lab, home, and engineering project in orbit.",
    body:
      "The International Space Station is a large spacecraft where astronauts live and work. It is built from modules, solar arrays, robotic arms, and docking ports assembled over many missions.",
    facts: ["About 109 meters end to end", "Built by partner space agencies", "Visible from Earth after sunset or before sunrise"]
  },
  {
    id: "life-in-orbit",
    eyebrow: "Life in Orbit",
    title: "Daily routines change when everything floats.",
    body:
      "Crew members sleep in small crew quarters, exercise for bone and muscle health, share meals, maintain the station, and talk with mission control teams on Earth.",
    facts: ["Exercise is part of every workday", "Water and air are carefully recycled", "Astronauts use handrails to move around"]
  },
  {
    id: "science-in-microgravity",
    eyebrow: "Science in Microgravity",
    title: "The station lets experiments behave differently.",
    body:
      "On Earth, gravity pulls on fluids, flames, crystals, plants, and human bodies. In orbit, scientists can study those systems in new ways and use the results to improve technology and medicine.",
    facts: ["Human health research", "Materials and fluid physics", "Plant growth and biology"]
  },
  {
    id: "earth-from-space",
    eyebrow: "Earth from Space",
    title: "From the cupola, Earth becomes one connected planet.",
    body:
      "Astronauts photograph storms, glaciers, deserts, fires, cities, rivers, and auroras. Those views help people learn about weather, climate, and the fragile atmosphere we all share.",
    facts: ["Earth photography every day", "Auroras and lightning from above", "A thin atmosphere on the horizon"]
  }
];

export function LearningSection() {
  return (
    <section className="learning-section" id="learn">
      <div className="section-heading-wide">
        <span className="section-kicker">Learn and wonder</span>
        <h2>A station made for curious minds.</h2>
        <p>
          The ISS is not only a machine. It is a classroom, workshop, home, and
          international science platform that moves faster than any airplane.
        </p>
      </div>

      <div className="learning-grid">
        {learningTopics.map((topic) => (
          <article className="learning-card" key={topic.id}>
            <span className="section-kicker">{topic.eyebrow}</span>
            <h3>{topic.title}</h3>
            <p>{topic.body}</p>
            <ul>
              {topic.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
