# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Bootstrap Essentials is a CSS/JS extension library for Bootstrap 3 (`bootstrap_version: 3.3.7`). It ships additional utility classes and a few small jQuery-style plugins. There is no application code and no test suite — the repo's job is to compile SCSS + JS sources into `dist/` and to publish the Jekyll-based documentation site under `docs/`.

## Common commands

```bash
npm install              # install Grunt + plugins (requires grunt-cli globally)
grunt                    # default pipeline: build everything into dist/ and mirror into docs/dist/
bundle install           # install Jekyll + plugins for the docs site
bundle exec jekyll serve --source docs   # preview the docs site locally
```

`npm test` is a placeholder that exits with an error — there are no tests.

## Build pipeline (Gruntfile.js)

The `default` task runs in this order:

`sass → autoprefixer → cssmin → concat → csscomb → csslint → uglify → copy`

- **sass**: compiles `scss/bootstrap-essentials.scss` → `dist/css/bootstrap-essentials.css` (expanded style).
- **autoprefixer**: targets the explicit browser list at the top of `Gruntfile.js` (Android 2.3+, Chrome 21+, Firefox 24+, IE 10+, iOS 6+, Opera 17+, Safari 6+). Keep that list in sync if browser targets change.
- **cssmin**: emits `dist/css/bootstrap-essentials.min.css` and also minifies `docs/assets/css/style.css` → `style.min.css` (the docs theme stylesheet is hand-authored, not Sass-compiled).
- **concat**: concatenates JS sources in a fixed order into `dist/js/bootstrap-essentials.js`. The configured order is `slide.js, scrollto.js, offcanvas.js, fileinput.js`, but `js/slide.js` does not exist in the repo — Grunt currently warns and continues. If you add or rename JS plugins, update `concat.bootstrap.src` in `Gruntfile.js`.
- **csscomb / csslint**: enforce ordering/lint rules from `scss/.csscomb.json` and `scss/.csslintrc`.
- **uglify**: builds `dist/js/bootstrap-essentials.min.js` and also minifies the docs `style-switcher.js`.
- **copy**: mirrors everything in `dist/` into `docs/dist/` so the Jekyll site serves the freshly built assets.

`jshint` is configured (`js/.jshintrc`) but is intentionally **not** in the default task list (commented out at the bottom of `Gruntfile.js`). Run it explicitly with `grunt jshint` if you want to lint JS.

## SCSS architecture

`scss/bootstrap-essentials.scss` is the single entry point and is just a list of `@import`s. Everything else is a partial (`_name.scss`). The relevant conventions:

- Vanilla Bootstrap variables are assumed to be imported **before** this file by the consumer; do not re-import Bootstrap here.
- `_variables.scss` and `_mixins.scss` must remain the first imports — every other partial may depend on them.
- Partials are grouped by purpose, with several grouped into subdirectories that have no index file: `buttons/`, `containers/`, `navbar/`, `text/`. Imports use the explicit subpath (e.g. `@import "buttons/circle";`).
- Some partials are present on disk but **deliberately commented out** of the entry file: `_timeline.scss`, `_agile-board.scss`, and `scss/buttons/_dim.scss`. Treat these as opt-in/experimental — don't assume they're shipped.
- When adding a new partial you must add an `@import` line to `scss/bootstrap-essentials.scss`; nothing autoloads it.

## JS plugins (`js/`)

Three small plugins, each self-contained: `offcanvas.js`, `scrollto.js`, `fileinput.js`. They follow the classic Bootstrap 3 jQuery-plugin pattern (IIFE, `$.fn.<name>`, `data-*` API) and assume jQuery + Bootstrap are loaded globally. New plugins should follow the same pattern and be added to `concat.bootstrap.src` in `Gruntfile.js`.

## Documentation site (`docs/`)

The `docs/` directory is a standalone Jekyll site published at `bootstrapessentials.com` (`docs/CNAME`). Layout:

- `_config.yml` — site config; **`current_version` and `bootstrap_version` are duplicated here** and must be updated alongside `package.json`/`bower.json` on a release.
- `_layouts/`, `_includes/`, `_data/`, `_plugins/` — standard Jekyll structure. `_includes/docs/` and `_includes/fulldocs/` hold the per-component fragments referenced from `components.html`, `css.html`, `javascript.html`, and `fulldocs/`.
- `assets/` — hand-written docs CSS/JS (the docs site does **not** consume the SCSS sources directly).
- `dist/` — generated; populated by the Grunt `copy:docs` task. Don't edit by hand; rerun `grunt`.

## Release / version bumps

A version change touches at least three files that must stay in sync:

- `package.json` → `version`
- `bower.json` (no `version` field today, but check before publishing)
- `docs/_config.yml` → `current_version` and the `download.*` URLs

After bumping, run `grunt` so `dist/` and `docs/dist/` are rebuilt with the new banner (the banner template in `Gruntfile.js` reads `pkg.version`).
