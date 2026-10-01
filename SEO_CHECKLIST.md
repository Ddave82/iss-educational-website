# Search visibility

Production domain: `https://iss-education.online`

## Implemented

- `npm run build` creates 21 complete HTML pages (seven routes in English, German and Danish), plus a noindex 404 page.
- Every page has its own title, description, canonical URL, Open Graph/Twitter metadata, language and reciprocal hreflang links in the initial HTML.
- The actual React page content, internal navigation and structured data are available without JavaScript. React hydrates that same markup; live telemetry, crew updates and interactive tools then load in the browser.
- Live data is deliberately not frozen into a deployment. The build does not depend on NASA or telemetry services being available.
- `dist/sitemap.xml` is generated from the routing definitions. It contains every canonical page and all language alternatives; it does not invent modification dates.
- Vercel serves the generated files using clean URLs and redirects trailing slashes, the `/en` aliases, old teacher routes and the default production Vercel domain to their canonical destinations.
- Unknown URLs retain an HTTP 404 response and receive a noindex page. Existing API functions remain separate from HTML routing.
- The build includes 24 checks covering initial content, metadata, internal links, structured data, sitemap completeness and error-page configuration. `npm test` checks the astronomy and source-data functionality.

## Google Search Console: account setup

1. Add `iss-education.online` as a **Domain property** at https://search.google.com/search-console and complete the DNS verification Google supplies. If it is already verified, use the existing property.
2. Submit `https://iss-education.online/sitemap.xml` under **Sitemaps**.
3. Inspect `/de`, `/de/tracker`, `/de/station`, `/de/learn` and `/de/see-the-iss`; use the live test and request indexing for the most important pages after deployment. The sitemap also covers the English and Danish pages.
4. Check **Page indexing** for errors and **Performance / Search results** for impressions, queries, clicks and click-through rate. Compare complete periods, allowing time for Google to crawl the new HTML.
5. Review real Core Web Vitals once sufficient field data exists. A successful build is not a Lighthouse score or a guarantee of ranking.

DNS verification and Search Console submission require the owner's account. They are not performed by a Git push.
Vercel Analytics measures visits after installation; Search Console separately measures visibility and clicks in Google Search.

## Maintenance

Add pages to `routePaths` and provide localized metadata in `src/lib/i18n.jsx`.
Update the expected route set in `tests/seo-build.check.mjs` when intentionally adding pages.
Run `npm run build` before deployment; do not run the prerender script against an already rendered output.
`npm run preview` previews the generated content. Production HTTP redirects and 404 statuses must also be checked on Vercel.
