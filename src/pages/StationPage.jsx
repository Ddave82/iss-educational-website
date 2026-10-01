import { PageHero } from "../components/ui/PageHero";
import { StationBrief } from "../components/sections/StationBrief.jsx";
import { useI18n } from "../lib/i18n.jsx";
import { missionCopy } from "../lib/missionCopy.js";

export function StationPage() {
  const { language } = useI18n();
  const copy = missionCopy[language];
  return <><PageHero kicker={copy.kicker} title={copy.title}>{copy.intro}</PageHero>
    <nav className="station-jump-links content-section" aria-label={copy.nav}><a href="#crew">01 / {copy.crewTitle}</a><a href="#research">02 / {copy.researchTitle}</a><a href="#station-news">03 / {copy.newsTitle}</a></nav>
    <StationBrief />
  </>;
}
