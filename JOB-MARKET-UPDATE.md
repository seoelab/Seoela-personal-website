# Job market website update

## Framework integration

The homepage uses a native Wowchemy landing page (`content/_index.md`) with a custom block at `layouts/partials/blocks/job-market.html`. The previous standalone `layouts/index.html` has been removed. Wowchemy owns the document, navigation, footer, asset compilation, and page routing.

- Author details, circular portrait, education, and profile links: `content/authors/admin/`.
- Navigation: `config/_default/menus.yaml`.
- Scoped styles: `assets/scss/custom.scss`.
- Cycling cities and attributed Morabaraba rules: `data/job_market.yaml`.
- Teaching appointments: `data/teaching.yaml`.
- Course description and complete supplied schedule: `data/econ_e303.yaml`.
- Teaching page: `content/teaching-experience/index.md` → `/teaching/`.
- Course page: `content/courses/econ-e303/index.md` → `/teaching/econ-e303/`.
- Printable syllabus excerpt: `content/course-syllabi/econ-e303-spring2026/index.md` → `/teaching/econ-e303/syllabus/`.
- Native single-page extension: `layouts/page/single.html`, retaining Wowchemy page header/footer.
- Reusable data-driven tables: `layouts/shortcodes/`.

## Content notes

The supplied Strava embed and token are preserved exactly; this is a public embed token. Ride caption uses the provided Minneapolis / 2023 description. The embed’s own metadata may differ and should be checked against your intended ride. City spellings normalized to Bemidji and Morgantown.

The full syllabus PDF was not provided. The syllabus link opens an explicitly labeled printable description-and-schedule excerpt; no missing PDF link is fabricated. Add the full PDF under `static/uploads/` and link it from the course page when available.

The existing CV is unchanged. Review its currency before publishing. The Fall 2024 and Spring 2026 offerings link to the same course page; the supplied schedule is explicitly labeled Spring 2026.

## Deploy

Merge these files into the existing Git project and use the existing Netlify deployment process. Hugo Extended 0.111.3 is retained in `netlify.toml`. No remote Git changes or live deployment have been made.

## Validation

Successfully built with Hugo Extended 0.111.3 using the original module dependencies. Browser checks passed for all four page routes, five teaching entries, 17 schedule rows, eight collapsible Morabaraba rule sections, the circular portrait, and all five profile links. Mobile widths showed no page-wide overflow. The self-contained preview was tested through teaching → course → syllabus navigation. External Strava content did not render in the test browser, so the remote embed remains unverified; the exact supplied embed and direct activity link are included.

## INEGI and research additions

The INEGI guide is maintained in `content/inegi/index.md` and linked in the main menu and homepage. It distinguishes code submission from physical laboratory access and links the provided Spanish operating rules. The IU agreement statement is based on the site owner's supplied information. Official location announcements also identify Aguascalientes; the guide does not incorrectly imply all laboratories are in Mexico City. The six-month deadline is marked for confirmation because the supplied rules do not establish it universally. Three new work-in-progress records are stored under `content/publication/`; homepage titles and statuses are read directly from their front matter. No fourth project was added because no fourth title was supplied.

## Research catalogue

`/research/` groups one publication, the JMP as the sole working paper, six works in progress, four policy reports, two media items, and research support. Publication front matter controls categories and homepage selection; `layouts/partials/research-entry.html` supplies paper links and expandable abstracts. The homepage retains the JMP card plus the publication and two selected draft projects. Media and support are in `data/research_extras.yaml`. The research-support record is the named Spring 2019 Boise State research award documented in the supplied CV; no grant amount has been invented.
