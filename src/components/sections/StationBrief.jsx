import { useEffect, useRef, useState } from "react";
import { useStationBrief } from "../../hooks/useStationBrief.js";
import { useI18n } from "../../lib/i18n.jsx";
import { missionCopy } from "../../lib/missionCopy.js";
import { recentExperiments } from "../../lib/experiments.js";

function dateLabel(value, language, withTime = false) {
  if (!value || !Number.isFinite(Date.parse(value))) return "—";
  return new Intl.DateTimeFormat(language, { dateStyle: "medium", ...(withTime ? { timeStyle: "short" } : {}) }).format(new Date(value));
}

function SourceStatus({ section, copy, language }) {
  return <span className={`source-status source-status-${section?.status || "unavailable"}`}>
    <i aria-hidden="true" />{copy[section?.status || "unavailable"]}
    {section?.fetchedAt && <span> · {copy.fetched}: {dateLabel(section.fetchedAt, language, true)}</span>}
  </span>;
}

function Portrait({ person }) {
  const [failed, setFailed] = useState(false);
  return <div className="crew-portrait">
    {person.image && !failed ? <img src={person.image} alt={person.name} loading="lazy" decoding="async" onError={() => setFailed(true)} /> : <span aria-label={person.name}>{person.name.split(" ").map(part => part[0]).slice(0, 2).join("")}</span>}
    <span className="crew-agency">{person.agency}</span>
  </div>;
}

function CrewCard({ person, copy, language }) {
  const duration = person.arrivedAt ? Math.max(0, Math.floor((Date.now() - Date.parse(person.arrivedAt)) / 86400000)) : null;
  return <article className="crew-card">
    <Portrait person={person} />
    <div className="crew-card-body">
      <span className="crew-role">{copy[person.role] || copy.crew}</span>
      <h3>{person.name}</h3>
      <p className="crew-mission">{person.spacecraft || "ISS"}</p>
      <dl className="crew-dates">
        <div><dt>{person.arrivedAt ? copy.arrived : copy.launched}</dt><dd>{dateLabel(person.arrivedAt || person.launchedAt, language)}</dd></div>
        {duration !== null && <div><dt>{copy.days}</dt><dd>{duration}</dd></div>}
      </dl>
      <div className="crew-links">
        {person.profileUrl && <a href={person.profileUrl} target="_blank" rel="noreferrer">{copy.profile} ↗</a>}
        {person.imageSource && <a href={person.imageSource} target="_blank" rel="noreferrer" title={person.imageCredit}>{copy.credit}</a>}
      </div>
    </div>
  </article>;
}

function ReportCard({ report, copy, language }) {
  const [imageFailed, setImageFailed] = useState(false);
  return <article className="station-report">
    {report.image && !imageFailed && <figure><img src={report.image} alt={report.imageAlt || ""} onError={() => setImageFailed(true)} loading="lazy" decoding="async" /><figcaption>{report.imageCredit}</figcaption></figure>}
    <div className="station-report-body"><span className="report-date">NASA · <time dateTime={report.publishedAt}>{dateLabel(report.publishedAt, language)}</time></span>
      <h3 lang="en">{report.title}</h3><p lang="en">{report.summary}{report.summary.length >= 330 ? "…" : ""}</p>
      <a href={report.url} target="_blank" rel="noreferrer">{copy.read}</a>
    </div>
  </article>;
}

export function StationBrief({ compact = false }) {
  const { language, localizedPath } = useI18n();
  const copy = missionCopy[language];
  const { data, loading, refresh } = useStationBrief();
  const initialAnchorHandled = useRef(false);
  useEffect(() => {
    if (compact || loading || initialAnchorHandled.current) return;
    initialAnchorHandled.current = true;
    const id = window.location.hash.slice(1);
    if (["crew", "research", "station-news"].includes(id)) {
      window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" }));
    }
  }, [compact, loading]);
  const crew = data.crew?.data;
  const research = data.research?.data || [];
  const news = data.news?.data || [];
  const highlights = recentExperiments(research);

  if (compact) return <section className="station-teaser content-section" aria-labelledby="station-teaser-title">
    <div className="station-teaser-copy"><span className="section-kicker">{copy.kicker}</span><h2 id="station-teaser-title">{copy.brief}</h2><p>{copy.briefIntro}</p>
      <a className="button-primary" href={localizedPath("/station")}>{copy.open} ↗</a>
    </div>
    <div className="station-teaser-live">
      <div className="station-teaser-crew"><div className="crew-avatar-stack">{crew?.members.slice(0, 4).map(person => <Portrait key={person.name} person={person} />)}</div>
        <div><strong>{crew ? `${crew.members.length}` : "—"}</strong><span>{copy.people}</span></div>
      </div>
      <SourceStatus section={data.crew} copy={copy} language={language} />
      <div className="station-teaser-dispatch"><span className="section-kicker">NASA / {copy.newsTitle}</span>
        {news[0] ? <><a href={news[0].url} target="_blank" rel="noreferrer" lang="en">{news[0].title} ↗</a><time dateTime={news[0].publishedAt}>{dateLabel(news[0].publishedAt, language)}</time></> : <p>{loading ? copy.loading : copy.noNews}</p>}
      </div>
    </div>
  </section>;

  return <div className="station-content">
    <section className="content-section station-crew-section" id="crew">
      <div className="station-section-header"><div><span className="section-kicker">01 / {crew ? `${copy.expedition} ${crew.expedition}` : "ISS"}</span><h2>{copy.crewTitle}</h2><p>{copy.crewIntro}</p></div>
        <button className="button-secondary" type="button" onClick={refresh} disabled={loading}>{loading ? copy.loading : copy.retry} ↻</button>
      </div>
      <SourceStatus section={data.crew} copy={copy} language={language} />
      {crew ? <><p className="crew-confirmation">{crew.official ? copy.onboard : copy.community} · <a href={crew.sourceUrl} target="_blank" rel="noreferrer">{copy.source} ↗</a></p>
        <div className="crew-grid">{crew.members.map(person => <CrewCard key={person.name} person={person} copy={copy} language={language} />)}</div>
        <p className="station-footnote">{copy.crewNote} <a href={crew.supplementalUrl} target="_blank" rel="noreferrer">People in Space ↗</a></p>
      </> : <p className="station-empty" role="status">{loading ? copy.loading : copy.noCrew}</p>}
    </section>

    <section className="content-section research-section" id="research">
      <div className="station-section-header"><div><span className="section-kicker">02 / SCIENCE</span><h2>{copy.researchTitle}</h2><p>{copy.researchIntro}</p></div><a className="text-link" href="https://science.nasa.gov/mission/station/research-explorer/" target="_blank" rel="noreferrer">NASA Research Explorer ↗</a></div>
      <SourceStatus section={data.research} copy={copy} language={language} />
      {highlights.length > 0 && <div className="experiment-grid">{highlights.map((item, index) => <article className="experiment-card" key={item.id}>
        <div className="experiment-top"><span>{item.category[language]}</span><span className="experiment-number">0{index + 1}</span></div>
        <span className="experiment-name">{item.title}</span><h3>{item[language].title}</h3><p>{item[language].about}</p>
        <dl><div><dt>{copy.why}</dt><dd>{item[language].why}</dd></div><div><dt>{copy.benefit}</dt><dd>{item[language].benefit}</dd></div></dl>
        <a className="experiment-source" href={item.report.url} target="_blank" rel="noreferrer">{copy.reportedAt}: {dateLabel(item.report.publishedAt, language)} · NASA ↗</a>
      </article>)}</div>}
      <p className="station-footnote">{copy.researchNote}</p>
      <p className="original-language">{copy.original}</p>
      {research.length ? <div className="station-report-grid">{research.slice(0, 3).map(report => <ReportCard key={report.url} report={report} copy={copy} language={language} />)}</div> : <p className="station-empty" role="status">{loading ? copy.loading : copy.noResearch}</p>}
    </section>

    <section className="content-section" id="station-news">
      <div className="station-section-header"><div><span className="section-kicker">03 / DISPATCHES</span><h2>{copy.newsTitle}</h2><p>{copy.newsIntro}</p></div></div>
      <SourceStatus section={data.news} copy={copy} language={language} />
      <p className="original-language">{copy.original}</p>
      {news.length ? <div className="station-report-grid">{news.slice(0, 3).map(report => <ReportCard key={report.url} report={report} copy={copy} language={language} />)}</div> : <p className="station-empty" role="status">{loading ? copy.loading : copy.noNews}</p>}
    </section>
  </div>;
}
