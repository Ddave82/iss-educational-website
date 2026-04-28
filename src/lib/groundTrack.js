import { geoContains } from "d3-geo";
import { feature } from "topojson-client";
import countriesAtlas from "world-atlas/countries-110m.json";

const COUNTRIES = feature(countriesAtlas, countriesAtlas.objects.countries);
const COUNTRY_NAME_OVERRIDES = {
  "Bosnia and Herz.": "Bosnia and Herzegovina",
  "Central African Rep.": "Central African Republic",
  "Dem. Rep. Congo": "Democratic Republic of the Congo",
  "Dominican Rep.": "Dominican Republic",
  "Eq. Guinea": "Equatorial Guinea",
  "Solomon Is.": "Solomon Islands",
  "S. Sudan": "South Sudan",
  "United States of America": "United States",
  "W. Sahara": "Western Sahara"
};

function formatCountryName(name) {
  return COUNTRY_NAME_OVERRIDES[name] || name;
}

export function lookupGroundTrack(latitude, longitude) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return "Not available";
  }

  const matchingCountry = COUNTRIES.features.find((countryFeature) =>
    geoContains(countryFeature, [longitude, latitude])
  );

  if (matchingCountry) {
    return formatCountryName(matchingCountry.properties.name);
  }

  return "Open ocean";
}
