const NASA_SEARCH_URL = "https://images-api.nasa.gov/search";
const NASA_GALLERY_RESULT_COUNT = 18;

export const FALLBACK_MEDIA_ITEMS = [
  {
    id: "jsc2021e064215_alt",
    title: "International Space Station flyaround",
    description:
      "The station photographed after Crew Dragon Endeavour undocked and completed a flyaround.",
    imageUrl:
      "https://images-assets.nasa.gov/image/jsc2021e064215_alt/jsc2021e064215_alt~large.jpg?crop=faces%2Cfocalpoint&fit=clip&h=1173&w=1920",
    credit: "NASA / ESA / Thomas Pesquet",
    sourceUrl: "https://www.nasa.gov/international-space-station/space-station-gallery/"
  },
  {
    id: "iss065e242460",
    title: "Research inside the station",
    description:
      "Astronauts work near the Life Sciences Glovebox, where research can run in microgravity.",
    imageUrl: "https://www.nasa.gov/wp-content/uploads/2023/03/iss065e242460.jpg?w=1024",
    credit: "NASA",
    sourceUrl: "https://www.nasa.gov/international-space-station/space-station-gallery/"
  },
  {
    id: "iss060e000604",
    title: "Earth from orbit",
    description:
      "ISS crews photograph deserts, rivers, storms, cities, and coastlines from hundreds of kilometers above Earth.",
    imageUrl: "https://www.nasa.gov/wp-content/uploads/2023/03/iss060e000604.jpg?w=1024",
    credit: "NASA",
    sourceUrl: "https://www.nasa.gov/international-space-station/space-station-gallery/"
  },
  {
    id: "iss064e055946",
    title: "Airglow and the Milky Way",
    description:
      "A thin line of atmosphere glows below the stars in a view photographed from the station.",
    imageUrl: "https://www.nasa.gov/wp-content/uploads/2023/03/iss064e055946.jpg?w=1041",
    credit: "NASA",
    sourceUrl: "https://www.nasa.gov/international-space-station/space-station-gallery/"
  }
];

function compactText(text, maxLength = 170) {
  if (!text) {
    return "";
  }

  const normalizedText = text.replace(/\s+/g, " ").trim();

  if (normalizedText.length <= maxLength) {
    return normalizedText;
  }

  return `${normalizedText.slice(0, maxLength - 1).trim()}...`;
}

function stripNasaCaptionPrefix(text) {
  return text
    .replace(/^[a-z0-9_-]+\s*\([^)]*\)\s*---\s*/i, "")
    .replace(/^[a-z0-9_-]+\s*[-–]\s*/i, "")
    .trim();
}

function createReadableTitle(data) {
  const rawTitle = data.title || "";
  const rawDescription = data.description || data.description_508 || "";
  const technicalTitlePattern = /^(iss|jsc|s\d|as\d|sts|expedition)[a-z0-9_-]*$/i;

  if (rawTitle && !technicalTitlePattern.test(rawTitle.trim())) {
    return compactText(rawTitle, 78);
  }

  const cleanedDescription = stripNasaCaptionPrefix(rawDescription);
  const firstSentence = cleanedDescription.split(/[.!?]\s+/)[0];

  return compactText(firstSentence || rawTitle || "International Space Station image", 78);
}

function resolvePreviewLink(item) {
  return item.links?.find((link) => link.render === "image")?.href;
}

function resolveCredit(data) {
  if (data.photographer) {
    return data.photographer;
  }

  if (data.secondary_creator) {
    return data.secondary_creator;
  }

  if (data.center) {
    return `NASA / ${data.center}`;
  }

  return "NASA Image and Video Library";
}

function normalizeMediaItem(item) {
  const data = item.data?.[0] || {};
  const imageUrl = resolvePreviewLink(item);
  const id = data.nasa_id || imageUrl;

  if (!id || !imageUrl || !data.title) {
    return null;
  }

  return {
    id,
    title: createReadableTitle(data),
    description: compactText(stripNasaCaptionPrefix(data.description || data.description_508)),
    imageUrl,
    credit: resolveCredit(data),
    sourceUrl: `https://images.nasa.gov/details/${encodeURIComponent(id)}`
  };
}

function normalizeImageIdentity(imageUrl) {
  try {
    const url = new URL(imageUrl);
    url.search = "";
    return url.toString().toLowerCase();
  } catch {
    return imageUrl.split("?")[0].toLowerCase();
  }
}

function dedupeMediaItems(items) {
  const seenKeys = new Set();

  return items.filter((item) => {
    const identityKeys = [
      item.id?.toLowerCase(),
      normalizeImageIdentity(item.imageUrl)
    ].filter(Boolean);
    const hasDuplicate = identityKeys.some((key) => seenKeys.has(key));

    if (hasDuplicate) {
      return false;
    }

    identityKeys.forEach((key) => seenKeys.add(key));
    return true;
  });
}

export async function fetchIssMedia({ signal } = {}) {
  const params = new URLSearchParams({
    q: "International Space Station astronauts Earth science",
    media_type: "image",
    page_size: "24"
  });
  const response = await fetch(`${NASA_SEARCH_URL}?${params.toString()}`, {
    signal,
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`NASA media request failed: ${response.status}`);
  }

  const payload = await response.json();
  const items = payload.collection?.items || [];
  const normalizedItems = dedupeMediaItems(
    items.map(normalizeMediaItem).filter(Boolean)
  );

  if (normalizedItems.length < 4) {
    return dedupeMediaItems(FALLBACK_MEDIA_ITEMS);
  }

  return normalizedItems.slice(0, NASA_GALLERY_RESULT_COUNT);
}
