export const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "medium"
});

export function formatCoordinate(value, positiveLabel, negativeLabel, digits = 2) {
  if (!Number.isFinite(value)) {
    return "Not available";
  }

  const direction = value >= 0 ? positiveLabel : negativeLabel;
  return `${Math.abs(value).toFixed(digits)} deg ${direction}`;
}

export function formatMetric(value, suffix, digits = 1) {
  if (!Number.isFinite(value)) {
    return "Not available";
  }

  return `${value.toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  })} ${suffix}`;
}

export function formatWholeMetric(value, suffix) {
  if (!Number.isFinite(value)) {
    return "Not available";
  }

  return `${value.toLocaleString("en-US", {
    maximumFractionDigits: 0
  })} ${suffix}`;
}

export function formatTimestamp(timestamp) {
  if (!timestamp) {
    return "No update yet";
  }

  return DATE_TIME_FORMATTER.format(new Date(timestamp));
}

export function formatDataAge(timestamp) {
  if (!timestamp) {
    return "Waiting for first update";
  }

  const ageSeconds = Math.max(0, Math.round((Date.now() - new Date(timestamp).getTime()) / 1000));

  if (ageSeconds < 60) {
    return `${ageSeconds}s old`;
  }

  const ageMinutes = Math.round(ageSeconds / 60);
  return `${ageMinutes} min old`;
}

export function formatHeading(heading) {
  if (!Number.isFinite(heading)) {
    return "Not available";
  }

  const normalized = (heading + 360) % 360;
  const sectors = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const sector = sectors[Math.round(normalized / 45) % sectors.length];
  return `${normalized.toFixed(0)} deg ${sector}`;
}

export function formatVisibility(visibility) {
  if (visibility === "daylight") {
    return "Sunlit";
  }

  if (visibility === "eclipsed") {
    return "In Earth's shadow";
  }

  return "Not available";
}

export function getStatusLabel(status, error) {
  if (status === "loading") {
    return "Connecting";
  }

  if (status === "stale") {
    return "Cached";
  }

  if (status === "offline") {
    return "Offline";
  }

  if (error) {
    return "Partial";
  }

  return "Live";
}
