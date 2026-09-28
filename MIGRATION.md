# Windows-safe source update

The archive extracts into `site/`. Extract it to a short location such as `C:\Web\site`.

Only source file paths were shortened. The original public URLs are explicitly retained in each moved page's `url` front matter, and Hugo template references point to the new paths. This preserves bookmarks, publication links, and page-bundle asset locations.

## Applying to an existing repository

Use the complete source tree in this archive. If copying into an existing working checkout, remove the OLD directories listed below after copying their replacement directories. Do not leave both copies: they represent the same pages and can generate conflicting URLs. Preserve the checkout's `.git` directory and review changes before committing.

If uploading through GitHub's website, upload the replacement files on your review branch, then delete the corresponding old files/directories on that branch before merging. Uploading files alone does not delete old paths. The existing remote repository's invalid `head-end ` path must also be renamed or removed there before Windows can clone it.

| Old directory | Replacement |
| --- | --- |
| `content/publication/connecting-markets-evaluating-the-effect-of-mexicos-national-infrastructure-program-on-international-trade` | `content/publication/connecting-markets` |
| `content/publication/energy-prices-pollution-and-competitiveness-effects-of-mexico’s-energy-tax-reform` | `content/publication/energy-reform` |
| `content/publication/impact-of-air-quality-regulations-on-entrepreneurial-activity` | `content/publication/air-quality-entry` |
| `content/publication/impact-of-environmental-regulations-on-exporting-firms-in-mexico` | `content/publication/proaire` |
| `content/publication/the-effect-of-homeownership-on-unemployment-rate-a-nonlinear-panel-ardl-analysis` | `content/publication/homeownership` |
| `content/publication/minimum-wage-tax-incentives-informality` | `content/publication/border-informality` |
| `content/publication/disrupted-routes-missing-relationships` | `content/publication/transport-shocks` |
| `content/project/a-closer-look-at-idaho’s-financial-activities-sector-in-the-past-decade-a-shift-share-analysis` | `content/project/idaho-finance` |
| `content/project/idaho’s-center-of-population-continues-westward-shift` | `content/project/idaho-population` |
| `content/project/idaho-beef-industry-showing-marked-recovery` | `content/project/idaho-beef` |
| `content/event/https-www-idahostatesman-com-news-rebuild-article246402705-html` | `content/event/idaho-housing` |
| `content/slides/econ-b-251-fundamentals-of-economics-for-business-i` | `content/slides/econ-b251` |
| `content/slides/econ-e-303-survey-of-international-economics` | `content/slides/econ-e303` |
| `layouts/partials/hooks/head-end ` | `layouts/partials/hooks/head-end` |
