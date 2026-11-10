# Info

This is a fork of the wired repo to fix es6 imports, also updates all Librarys and makes the Library usable in webcomponents Designer.

# wired-elements 👉 [wiredjs.com](https://wiredjs.com)
Wired Elements is a series of basic UI Elements that have a hand drawn look. These can be used for wireframes, mockups, or just the fun hand-drawn look. 

![alt Preview](https://i.imgur.com/qttPllg.png)


## Try now
Play with wired-elements:

[Wired Elements in Designer](https://node-projects.github.io/web-component-designer-demo/index.html?npm=@node-projects/wired-elements&loadAllImports&html=%3Cwired-button%20style=%22position:absolute;left:39px;top:28px;%22%3EHallo%3C/wired-button%3E%20%3Cwired-combo%20style=%22position:absolute;left:51px;top:109px;%22%3E%3C/wired-combo%3E%20%3Cwired-checkbox%20style=%22position:absolute;left:41px;top:184px;%22%3Echeck%3C/wired-checkbox%3E%20%3Cwired-video%20src=%22https://archive.org/download/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.mp4%22%20style=%22position:absolute;left:211px;top:28px;%22%3E%3C/wired-video%3E)

[Wired Elements](https://codesandbox.io/s/wired-elements-vanilla-4bpny)

#### Try it with a framework

[Wired Elements in React](https://codesandbox.io/s/xrll5wyl8w)

[Wired Elements in Vue](https://codesandbox.io/s/vj389y9375)

[Wired Elements in Svelte](https://codesandbox.io/s/wired-elements-svelte-4hfkb)


## Install

The package (wired-elements) exports all components in the **_wired_** category. List of all wired elements can be found [here](https://github.com/node-projects/wired-elements/tree/master/src).

Add wired-elements to your project:
```
npm i @node-projects/wired-elements
```


Or load the ES module directly through unpkg

```html
<script type="module" src="https://unpkg.com/@node-projects/wired-elements?module"></script>
```


## Usage

Import into your module script:
```javascript
import { WiredButton, WiredInput } from "@node-projects/wired-elements"
```

or 

```javascript
import { WiredButton } from '@node-projects/wired-elements/lib/wired-button.js';
import { WiredInput } from '@node-projects/wired-elements/lib/wired-input.js';
```

#### Use it in your HTML:
```html
<wired-input placeholder="Enter name"></wired-input>
<wired-button>Click Me</wired-button>
```

Learn about web components [here](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

## Component API

To view details of each component - properties, events, css-properties, etc, are provided in the [docs folder](https://github.com/node-projects/wired-elements/tree/master/docs).

## Demo

Our component showcase is prepared for [GitHub Pages](https://node-projects.github.io/wired-elements/), with live examples of all 26 elements, category filters, search, and copyable HTML.

### Run the showcase locally

```sh
npm ci
npm run preview:site
```

Open http://127.0.0.1:4173. The showcase bundles the components from this checkout and their dependencies, so it also previews unpublished changes without a CDN. The video example accepts a local file; it does not upload it.

`npm run build:site` builds the library and writes the static site to `_site/`. All asset URLs are relative so the site works under the repository's GitHub Pages path.

### Publish on GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. The **Component showcase** workflow builds pull requests for validation and deploys pushes to `master`. After the initial commit and push, it can also be run manually from the Actions tab. Its deployment summary contains the published URL.

The original upstream showcase is available at [wiredjs.com](https://wiredjs.com/showcase.html).

## Release packages

Publish a GitHub release with an exact version tag such as `v3.2.0` or `3.2.0`. The **Publish release package** workflow checks out that tag's commit, sets the package and lockfile version for the build without creating a version commit, builds the library, and packs it once. It publishes that tarball to npmjs.com and attaches the same `.tgz` file to the GitHub release. SemVer prereleases and releases marked as prereleases on GitHub use the `next` npm tag; stable releases use `latest`.

The workflow uses npm trusted publishing (GitHub Actions OIDC), with no npm token secret. Its trusted publisher is configured for `node-projects/wired-elements` and the workflow filename `publish-release.yml`. A maintainer can configure it using an authenticated npm CLI with 2FA:

```sh
npx --yes --package=npm@12.2.2 npm trust github @node-projects/wired-elements \
  --repo=node-projects/wired-elements --file=publish-release.yml --allow-publish --yes
```

To retry an existing published release, select **Actions → Publish release package → Run workflow** on `master`, and enter the original release tag in `release_tag`. This also works for releases whose source tag predates this workflow. If npm already has the version with identical integrity, the workflow skips publishing and retries the GitHub asset upload. A version already published with different contents fails instead of replacing it. Existing assets with the same filename are replaced during upload. npm package versions are immutable; publish a new release version when package contents change.

The pack metadata reader accepts npm 11's array output and npm 12's package-name-keyed object output. Run `node --test scripts/release-package.test.mjs` to check both formats, version validation, prerelease tags, and retry behavior.

## Credits

wired-elements was built using [RoughJS](https://roughjs.com/) and [Lit](https://lit.dev/).

## License
[MIT License](https://github.com/node-projects/wired-elements/blob/master/LICENSE) (c) [Preet Shihn](https://twitter.com/preetster)
