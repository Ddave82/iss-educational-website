import { LivestreamSection } from "../components/sections/LivestreamSection";
import { MediaGallery } from "../components/sections/MediaGallery";
import { PageHero } from "../components/ui/PageHero";
import { useI18n } from "../lib/i18n.jsx";

export function GalleryPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero kicker={t.gallery.kicker} title={t.gallery.title}>
        {t.gallery.intro}
      </PageHero>
      <MediaGallery
        title={t.gallery.mediaTitle}
        intro={t.gallery.mediaIntro}
      />
      <LivestreamSection />
    </>
  );
}
