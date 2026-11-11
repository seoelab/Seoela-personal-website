# Job-market restyle: Wowchemy overlay

This zip contains **only the files that change**, laid out exactly like your repository.
Unzip it over the repo root, review `git status`, and commit. Nothing outside the listed paths is touched.

The site stays a native Wowchemy site (Hugo modules, `wowchemy-hugo-themes` v5.7.1): the Wowchemy navbar,
footer, page templates, URLs, search, and day/night switch are all still in use. The design is layered on with
SCSS, one JavaScript file, two head/body hooks, and a few layout overrides.

Tested with Hugo extended 0.111.3 (the version in `netlify.toml`): full build, 0 errors, no JavaScript console errors.

## 1. Files to overwrite (they exist in your repo today)

| File | What changed |
|---|---|
| `assets/scss/custom.scss` | Entire design system (tokens, navbar, footer, home, research, teaching, prose pages, dark mode, print, reduced motion). Wowchemy compiles this automatically. **Replaces your current file.** If you had your own rules in it, merge them back at the bottom. |
| `config/_default/menus.yaml` | Navbar: Research, Teaching, Background, INEGI data, Beyond economics, Contact; CV button on the right. |
| `config/_default/params.yaml` | Two lines only: `theme_night: job-market-dark` and `show_day_night: true`. |
| `data/themes/job-market.toml` | New light palette for Wowchemy's theme engine. |
| `layouts/partials/blocks/job-market.html` | Home page block (hero, facts, research, teaching, education, INEGI, beyond economics, contact). |
| `layouts/page/single.html` | Page header + optional "on this page" contents for `type: page` pages (INEGI, Teaching, E-303, etc.). |
| `layouts/shortcodes/research-catalogue.html` | Research page: search, type tabs, expand-all abstracts. Reads `?type=report` etc. |
| `layouts/shortcodes/course-schedule.html` | E-303 schedule as an accordion. |
| `content/teaching-experience/index.md` | Intro paragraph plus the new `teaching-tabs` shortcode. |
| `content/publication/proaire/index.md` | Your file, with a `presentations:` block added (see section 4). Nothing else in it changed. |

## 2. Files added (new)

- `assets/js/job-market.js` and `assets/js/job-market-masks.js` — behaviour (fixed trade-route background, cyclist progress bar, page transitions, search/tabs, copy buttons, map).
- `data/themes/job-market-dark.toml` — dark palette, used by Wowchemy's own Light / Dark / Automatic switch.
- `data/cycling_map.yaml` — the cities (name, lon, lat) that appear as pins and chips. Add a city by adding three lines.
- `layouts/partials/hooks/head-end/job-market.html` — Google Fonts (Source Serif 4 + Inter).
- `layouts/partials/hooks/body-end/job-market.html` — icon sprite and the bundled script.
- `layouts/partials/jm/` — `clean.html`, `course.html`, `entry.html`, `presentations.html`, `research-items.html`.
- `layouts/shortcodes/teaching-tabs.html` — Indiana University / Boise State tabs.

## 3. Files you can delete (now unused; deleting is optional and harmless)

- `layouts/partials/research-entry.html`
- `layouts/shortcodes/teaching-table.html`
- `layouts/shortcodes/jm.html`
- `JOB-MARKET-UPDATE.md` (describes the previous layout)

`course-description.html` is still used by the E-303 pages, so keep it. `data/job_market.yaml` is still used
for the Morabaraba rules; its `cycling_cities` list is no longer read (the map reads `data/cycling_map.yaml`).

## 4. Day-to-day editing

- **Presentations** live in each paper's front matter. They only appear when the list is present:

  ```yaml
  presentations:
    - venue: RIDGE Forum
      scheduled: true        # upcoming talk; the year is hidden
    - venue: BREAD Conference
      year: 2026
  ```

  They show on the home page (job-market paper) and on the Research page. Remove the block to hide them.
- **Dark mode** is Wowchemy's own switch (moon icon, top right): Light / Dark / Automatic.
- **Home entries** are chosen with `home: true` in a publication or project, as before.
- **Replay the intro animation** by opening `/?intro=1`.
- **Strava ride map** is a placeholder that loads from Strava when the visitor is online.

## 5. Things to know

- Google Fonts is loaded from Google. To self-host instead, delete the `<link>` tags in
  `layouts/partials/hooks/head-end/job-market.html` and add the font files under `static/`.
- Emails on the home page are base64-encoded in the HTML and assembled by JavaScript (spam protection).
- Everything animated respects `prefers-reduced-motion`; the print stylesheet hides the background and navigation.
- Wowchemy's author profile (`content/authors/admin/`) still feeds the portrait, bio, and profile links, so edit those there.
