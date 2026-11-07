export const SITE_URL = "https://damha577.com";

export function absoluteSiteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}