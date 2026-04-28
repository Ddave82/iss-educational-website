import { LivestreamSection } from "../components/sections/LivestreamSection";
import { MediaGallery } from "../components/sections/MediaGallery";
import { PageHero } from "../components/ui/PageHero";

export function GalleryPage() {
  const galleryFilters = [
    "Earth views",
    "Crew",
    "Experiments",
    "Station interior",
    "Spacewalks"
  ];

  return (
    <>
      <PageHero kicker="NASA imagery" title="ISS Gallery">
        Explore real NASA imagery of the station, Earth views, astronauts,
        research, and station operations.
      </PageHero>
      <section className="content-section gallery-filter-section" aria-label="Gallery categories">
        <div className="gallery-filter-chips">
          {galleryFilters.map((filter) => (
            <span key={filter}>{filter}</span>
          ))}
        </div>
      </section>
      <MediaGallery
        title="NASA images and station visuals."
        intro="The gallery loads NASA Image and Video Library results when available and falls back to curated NASA station imagery if the API cannot be reached."
      />
      <LivestreamSection />
    </>
  );
}
