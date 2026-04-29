export const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "medium"
});

export function createDateTimeFormatter(locale = "en-US") {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "medium"
  });
}

export function formatCoordinate(value, positiveLabel, negativeLabel, digits = 2, t) {
  if (!Number.isFinite(value)) {
    return t?.common.notAvailable || "Not available";
  }

  const direction = value >= 0 ? positiveLabel : negativeLabel;
  return `${Math.abs(value).toFixed(digits)} ${t?.common.degree || "deg"} ${direction}`;
}

export function formatMetric(value, suffix, digits = 1, locale = "en-US", t) {
  if (!Number.isFinite(value)) {
    return t?.common.notAvailable || "Not available";
  }

  return `${value.toLocaleString(locale, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  })} ${suffix}`;
}

export function formatWholeMetric(value, suffix, locale = "en-US", t) {
  if (!Number.isFinite(value)) {
    return t?.common.notAvailable || "Not available";
  }

  return `${value.toLocaleString(locale, {
    maximumFractionDigits: 0
  })} ${suffix}`;
}

export function formatTimestamp(timestamp, locale = "en-US", t) {
  if (!timestamp) {
    return t?.common.noUpdateYet || "No update yet";
  }

  return createDateTimeFormatter(locale).format(new Date(timestamp));
}

export function formatDataAge(timestamp, t) {
  if (!timestamp) {
    return t?.common.waitingForFirstUpdate || "Waiting for first update";
  }

  const ageSeconds = Math.max(0, Math.round((Date.now() - new Date(timestamp).getTime()) / 1000));

  if (ageSeconds < 60) {
    return t?.common.secondsOld?.(ageSeconds) || `${ageSeconds}s old`;
  }

  const ageMinutes = Math.round(ageSeconds / 60);
  return t?.common.minutesOld?.(ageMinutes) || `${ageMinutes} min old`;
}

export function formatHeading(heading, t) {
  if (!Number.isFinite(heading)) {
    return t?.common.notAvailable || "Not available";
  }

  const normalized = (heading + 360) % 360;
  const sectors = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const sector = sectors[Math.round(normalized / 45) % sectors.length];
  return `${normalized.toFixed(0)} ${t?.common.degree || "deg"} ${sector}`;
}

export function formatVisibility(visibility, t) {
  if (visibility === "daylight") {
    return t?.sidebar.visibility.daylight || "Sunlit";
  }

  if (visibility === "eclipsed") {
    return t?.sidebar.visibility.eclipsed || "In Earth's shadow";
  }

  return t?.sidebar.visibility.unknown || "Not available";
}

export function getStatusLabel(status, error, t) {
  if (status === "loading") {
    return t?.common.status.loading || "Connecting";
  }

  if (status === "stale") {
    return t?.common.status.stale || "Cached";
  }

  if (status === "offline") {
    return t?.common.status.offline || "Offline";
  }

  if (status === "partial") {
    return t?.common.status.partial || "Partial";
  }

  if (error) {
    return t?.common.status.partial || "Partial";
  }

  return t?.common.status.live || "Live";
}
