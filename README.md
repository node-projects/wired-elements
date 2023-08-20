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

Demo of all components is available at [wiredjs.com](https://wiredjs.com/showcase.html).

## Credits

wired-elements was built using [RoughJS](https://roughjs.com/) and [Lit](https://lit.dev/).

## License
[MIT License](https://github.com/node-projects/wired-elements/blob/master/LICENSE) (c) [Preet Shihn](https://twitter.com/preetster)
