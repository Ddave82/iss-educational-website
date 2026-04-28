const timelineEvents = [
  {
    year: "1998",
    title: "First modules launched",
    detail: "Zarya launched on Nov. 20, followed by Unity on Dec. 4."
  },
  {
    year: "Nov. 2, 2000",
    title: "First long-duration crew",
    detail: "Expedition 1 arrived and began continuous human presence in orbit."
  },
  {
    year: "2011",
    title: "Assembly completed",
    detail: "NASA and partners completed station assembly in fall 2011."
  },
  {
    year: "2025",
    title: "25 years inhabited",
    detail: "The ISS marked 25 years of continuous human presence."
  }
];

const glossaryTerms = [
  {
    term: "Orbit",
    definition: "A curved path around Earth. The ISS falls around Earth instead of falling down."
  },
  {
    term: "Microgravity",
    definition: "A near-weightless environment where people and experiments float."
  },
  {
    term: "Docking",
    definition: "When a spacecraft carefully connects to the station."
  },
  {
    term: "Module",
    definition: "A station room or section built for living, working, storage, or science."
  },
  {
    term: "Solar array",
    definition: "A wide panel that turns sunlight into electricity for the station."
  }
];

const scienceCards = [
  {
    title: "Cold Atom Lab",
    type: "Quantum physics",
    body:
      "A facility on the ISS chills atoms to extremely low temperatures so scientists can study quantum behavior in microgravity.",
    href: "https://science.nasa.gov/mission/cold-atom-laboratory/"
  },
  {
    title: "Protein crystal growth",
    type: "Medicine",
    body:
      "Protein crystals can grow larger and more uniformly in microgravity, helping researchers study structures used in drug development.",
    href: "https://www.nasa.gov/missions/station/iss-research/creating-new-and-better-drugs-with-protein-crystal-growth-experiments/"
  },
  {
    title: "Tissue chips",
    type: "Human health",
    body:
      "Small devices with living cells mimic human tissues, helping researchers study disease and test drugs in space.",
    href: "https://www.nasa.gov/missions/station/tissue-chips-investigate-diseases-test-drugs-on-the-space-station/"
  }
];

const scaleItems = [
  {
    label: "ISS end-to-end",
    value: "356 ft / 109 m",
    width: "100%"
  },
  {
    label: "Football field incl. end zones",
    value: "360 ft / 110 m",
    width: "100%"
  },
  {
    label: "Airbus A380 wingspan",
    value: "262 ft / 80 m",
    width: "73%"
  }
];

export function ExplorerSection() {
  return (
    <section className="explorer-section" id="explore">
      <div className="section-heading-wide">
        <span className="section-kicker">Explore deeper</span>
        <h2>See it, scale it, and speak space.</h2>
        <p>
          The station is not just a dot on a map. It is a real spacecraft you
          can sometimes spot in the sky, a giant structure, and a working lab.
        </p>
      </div>

      <div className="explorer-grid">
        <article className="spot-card">
          <span className="section-kicker">Spot the Station</span>
          <h3>Look up after sunset or before sunrise.</h3>
          <p>
            The ISS can look like a bright, fast-moving star. NASA's Spot the
            Station tool helps you find sighting times for your location.
          </p>
          <a
            className="spot-cta"
            href="https://spotthestation.nasa.gov/"
            target="_blank"
            rel="noreferrer"
          >
            Find sighting times
          </a>
        </article>

        <article className="scale-card">
          <span className="section-kicker">ISS scale</span>
          <h3>Almost a football field across.</h3>
          <div className="scale-bars" aria-label="ISS size comparison">
            {scaleItems.map((item) => (
              <div className="scale-row" key={item.label}>
                <div className="scale-row-header">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
                <div className="scale-track">
                  <span style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="timeline-panel">
        <div className="section-heading-wide compact-heading">
          <span className="section-kicker">Timeline</span>
          <h2>From first pieces to 25 years in orbit.</h2>
        </div>
        <div className="timeline-grid">
          {timelineEvents.map((event) => (
            <article className="timeline-item" key={event.year}>
              <strong>{event.year}</strong>
              <h3>{event.title}</h3>
              <p>{event.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="learning-grid extras-grid">
        <article className="glossary-card">
          <span className="section-kicker">Space words</span>
          <h3>Mini glossary for young explorers.</h3>
          <dl className="glossary-list">
            {glossaryTerms.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.definition}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="science-card">
          <span className="section-kicker">Real station science</span>
          <h3>Experiments that use microgravity.</h3>
          <div className="science-list">
            {scienceCards.map((card) => (
              <a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                key={card.title}
              >
                <span>{card.type}</span>
                <strong>{card.title}</strong>
                <p>{card.body}</p>
              </a>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
