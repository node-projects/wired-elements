# @node-projects/wired-elements

[![npm version](https://img.shields.io/npm/v/@node-projects/wired-elements)](https://www.npmjs.com/package/@node-projects/wired-elements)
[![npm downloads](https://img.shields.io/npm/dm/@node-projects/wired-elements)](https://www.npmjs.com/package/@node-projects/wired-elements)
[![Component showcase](https://github.com/node-projects/wired-elements/actions/workflows/pages.yml/badge.svg?branch=master)](https://github.com/node-projects/wired-elements/actions/workflows/pages.yml)
[![Publish release package](https://github.com/node-projects/wired-elements/actions/workflows/publish-release.yml/badge.svg)](https://github.com/node-projects/wired-elements/actions/workflows/publish-release.yml)
[![MIT license](https://img.shields.io/github/license/node-projects/wired-elements)](https://github.com/node-projects/wired-elements/blob/master/LICENSE)

Hand-drawn web components for wireframes, prototypes, and interfaces with a sketchbook feel.

This is the **node-projects fork** of [Wired Elements](https://github.com/rough-stuff/wired-elements), published as `@node-projects/wired-elements`. It fixes ES module import paths, uses Lit 3 and `@node-projects/roughjs` 5, and supports use in [Web Component Designer](https://github.com/node-projects/web-component-designer).

**[Live component showcase](https://node-projects.github.io/wired-elements/)** · **[Component API](https://github.com/node-projects/wired-elements/tree/master/docs)** · **[GitHub releases](https://github.com/node-projects/wired-elements/releases)**

## Try it

The [showcase](https://node-projects.github.io/wired-elements/) includes all 26 elements in 23 interactive examples, with category filters, search, and copyable HTML. It builds from this repository's source and bundles its dependencies, including unpublished changes when run locally.

You can also [open this package in Web Component Designer](https://node-projects.github.io/web-component-designer-demo/index.html?npm=%40node-projects%2Fwired-elements&loadAllImports&html=%3Cwired-button%3EHello%3C%2Fwired-button%3E).

## Install

```sh
npm install @node-projects/wired-elements
```

## Usage

Import the elements you need into your application's JavaScript entry point:

```js
import '@node-projects/wired-elements/lib/wired-button.js';
import '@node-projects/wired-elements/lib/wired-input.js';
```

Then use them in HTML:

```html
<wired-input placeholder="Enter your name"></wired-input>
<wired-button elevation="2">Say hello</wired-button>
```

To register the main collection at once:

```js
import '@node-projects/wired-elements';
```

The calendar has a separate entry point:

```js
import '@node-projects/wired-elements/lib/wired-calendar.js';
```

Use a bundler or a browser import map to resolve the package's npm dependencies. The local showcase demonstrates a bundled browser setup.

These are standard custom elements: use them in plain HTML and JavaScript or in frameworks that support web components. See the [component documentation](https://github.com/node-projects/wired-elements/tree/master/docs) for properties, events, and CSS custom properties. Use the scoped `@node-projects/wired-elements` package when adapting upstream examples.

## Components

| Category | Elements |
| --- | --- |
| Actions | [button](docs/wired-button.md), [fab](docs/wired-fab.md), [icon-button](docs/wired-icon-button.md), [link](docs/wired-link.md) |
| Inputs | [input](docs/wired-input.md), [textarea](docs/wired-textarea.md), [search-input](docs/wired-search-input.md), [checkbox](docs/wired-checkbox.md), [toggle](docs/wired-toggle.md), [radio and radio-group](docs/wired-radio-group.md), [combo](docs/wired-combo.md), [listbox](docs/wired-listbox.md), [item](docs/wired-item.md), [slider](docs/wired-slider.md), [calendar](docs/wired-calendar.md) |
| Layout | [card](docs/wired-card.md), [tabs and tab](docs/wired-tabs.md), [divider](docs/wired-divider.md), [dialog](docs/wired-dialog.md) |
| Feedback | [progress](docs/wired-progress.md), [progress-ring](docs/wired-progress-ring.md), [spinner](docs/wired-spinner.md) |
| Media | [image](docs/wired-image.md), [video](docs/wired-video.md) |

All element names use the `wired-` prefix, such as `<wired-checkbox>`.

## Develop locally

```sh
npm ci
npm run build
```

The TypeScript build writes the library and type declarations to `lib/`.

### Run the showcase

```sh
npm run preview:site
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). The showcase uses Wired controls and a locally bundled handwritten font. The video example accepts a local file that stays in your browser.

`npm run build:site` builds the library and writes the static showcase to `_site/`. Asset URLs are relative so the site works under the repository's GitHub Pages path.

### GitHub Pages

The [Component showcase workflow](.github/workflows/pages.yml) validates pull requests and deploys pushes to `master`. It can also be run manually from the Actions tab. The repository's **Settings → Pages → Build and deployment** must use **GitHub Actions** as the source.

## Publish a release

Publish a GitHub release with an exact version tag such as `v3.2.0` or `3.2.0`. The [Publish release package workflow](.github/workflows/publish-release.yml):

1. Checks out the release tag's commit.
2. Sets the package and lockfile version for the build without creating a version commit.
3. Builds the library and creates one npm tarball.
4. Publishes that tarball to npmjs.com and attaches the same `.tgz` file to the GitHub release.

SemVer prereleases and releases marked as prereleases on GitHub use the `next` npm tag; stable releases use `latest`.

### Publishing authentication

npm trusted publishing is configured for `node-projects/wired-elements` and the workflow filename `publish-release.yml`. The workflow authenticates through GitHub Actions OIDC and needs no npm token secret. If this configuration needs to be recreated, a maintainer can use an authenticated npm CLI with 2FA:

```sh
npx --yes --package=npm@12.2.2 npm trust github @node-projects/wired-elements \
  --repo=node-projects/wired-elements --file=publish-release.yml --allow-publish --yes
```

### Retry an existing release

Select **Actions → Publish release package → Run workflow** on `master`, and enter the original tag in `release_tag`. This also works for tags created before the workflow existed.

If npm already has the version with identical integrity, the workflow skips publishing and retries the GitHub asset upload. Existing assets with the same filename are replaced. A version already published with different contents fails; create a new release version when package contents change.

The pack metadata reader accepts both npm 11's array output and npm 12's object keyed by package name. Check the format handling, version validation, prerelease tags, and retries with:

```sh
node --test scripts/release-package.test.mjs
```

## Credits and license

Originally created by [Preet Shihn](https://github.com/pshihn). Built with [Lit](https://lit.dev/) and [Rough.js](https://roughjs.com/), with this fork using [@node-projects/roughjs](https://www.npmjs.com/package/@node-projects/roughjs).

Released under the [MIT License](LICENSE). Copyright © 2021 Preet Shihn.
