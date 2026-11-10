import '../lib/wired-elements.js';
import '../lib/wired-calendar.js';

const plus = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/></svg>';
const demos = [
  ['button', 'Actions', 'An everyday action with a little extra lift.', '<wired-button elevation="2">Click me</wired-button>\n<wired-button disabled>Disabled</wired-button>'],
  ['fab', 'Actions', 'A floating action, ready for your next idea.', `<wired-fab aria-label="Add an item">${plus}</wired-fab>`],
  ['icon-button', 'Actions', 'A small canvas for an iconic action.', `<wired-icon-button aria-label="Add an item">${plus}</wired-icon-button>`],
  ['link', 'Actions', 'Take the scenic route to somewhere new.', '<wired-link href="https://github.com/node-projects/wired-elements">Explore the source ↗</wired-link>'],
  ['input', 'Inputs', 'A blank space for a name, an idea, anything.', '<wired-input placeholder="What’s your name?" aria-label="Your name"></wired-input>'],
  ['textarea', 'Inputs', 'Give your thoughts a little more room.', '<wired-textarea placeholder="A few notes to get started…" rows="3" aria-label="Notes"></wired-textarea>'],
  ['search-input', 'Inputs', 'Every good discovery starts with a search.', '<wired-search-input placeholder="Look for something" aria-label="Demo search"></wired-search-input>'],
  ['checkbox', 'Inputs', 'The small satisfaction of checking it off.', '<wired-checkbox checked>Sketch something new</wired-checkbox>\n<wired-checkbox>Make it happen</wired-checkbox>'],
  ['toggle', 'Inputs', 'A tiny switch with plenty of personality.', '<wired-toggle aria-label="Enable creative mode" checked></wired-toggle><span>Creative mode</span>'],
  ['radio', 'Inputs', 'One choice. A circle of possibilities.', '<wired-radio-group selected="paper" aria-label="Drawing surface">\n  <wired-radio name="paper">Paper</wired-radio>\n  <wired-radio name="canvas">Canvas</wired-radio>\n</wired-radio-group>'],
  ['combo', 'Inputs', 'A neat little dropdown of possibilities.', '<wired-combo selected="olive" aria-label="Choose a color">\n  <wired-item value="olive">Olive green</wired-item>\n  <wired-item value="ink">Ink blue</wired-item>\n  <wired-item value="ochre">Warm ochre</wired-item>\n</wired-combo>'],
  ['listbox', 'Inputs', 'Lay out the options. Pick your favorite.', '<wired-listbox selected="sketch" aria-label="Choose a tool">\n  <wired-item value="sketch">Sketch</wired-item>\n  <wired-item value="draw">Draw</wired-item>\n  <wired-item value="build">Build</wired-item>\n</wired-listbox>'],
  ['slider', 'Inputs', 'Find just the right amount of everything.', '<wired-slider value="62" aria-label="Progress amount"></wired-slider><output>62%</output>'],
  ['calendar', 'Inputs', 'Make a little time for your next big thing.', '<wired-calendar initials locale="en-GB" aria-label="Choose a date"></wired-calendar>'],
  ['card', 'Layout', 'A hand-drawn home for your content.', '<wired-card elevation="3"><h3>Note to self</h3><p>Good ideas start with a rough draft.</p></wired-card>'],
  ['tabs', 'Layout', 'A few different sides of the same story.', '<wired-tabs selected="sketch">\n  <wired-tab name="sketch" label="Sketch"><p>Start with a rough idea.</p></wired-tab>\n  <wired-tab name="build" label="Build"><p>Bring your idea to life.</p></wired-tab>\n  <wired-tab name="share" label="Share"><p>Put something good into the world.</p></wired-tab>\n</wired-tabs>'],
  ['divider', 'Layout', 'A simple line. A fresh start.', '<div class="divider-demo"><p>One thought.</p><wired-divider></wired-divider><p>And the next.</p></div>'],
  ['dialog', 'Layout', 'A moment to pause and say something.', '<wired-button id="open-dialog">Open dialog</wired-button>\n<wired-dialog id="demo-dialog">\n  <div class="dialog-content"><h2>A little hello.</h2><p>Here’s a space for something worth a pause.</p><wired-button id="close-dialog">Got it</wired-button></div>\n</wired-dialog>'],
  ['progress', 'Feedback', 'Every little step gets you closer.', '<wired-progress value="62" min="0" max="100"></wired-progress><span>Connected to the slider above</span>'],
  ['progress-ring', 'Feedback', 'Progress, with a different point of view.', '<wired-progress-ring value="62" showLabelAsPercent></wired-progress-ring>'],
  ['spinner', 'Feedback', 'Something good is coming around.', '<wired-spinner spinning duration="1500"></wired-spinner><wired-button id="spinner-toggle">Pause</wired-button>'],
  ['image', 'Media', 'A rough frame for a lovely little view.', '<wired-image src="./sketch.svg" elevation="3" aria-label="Illustration of green mountains beneath a golden sun"></wired-image>'],
  ['video', 'Media', 'Choose a local video to try the sketchy player. Your file stays in your browser.', '<wired-video id="demo-video" hidden playsinline aria-label="Your video preview"></wired-video><label class="video-upload">Try your own video<input id="video-file" type="file" accept="video/*"></label>']
];

const gallery = document.querySelector('#gallery');
for (const [name, category, description, markup] of demos) {
  const article = document.createElement('article');
  article.className = 'component';
  article.id = `wired-${name}`;
  article.dataset.category = category;
  article.dataset.search = `${name} ${category} ${description} ${markup.replace(/<[^>]+>/g, ' ')}`.toLowerCase();
  article.innerHTML = `<div class="component-heading"><span class="category">${category}</span><wired-link class="permalink" href="#wired-${name}" aria-label="Link to wired-${name}">↗</wired-link></div><h3>wired-${name}</h3><p class="description">${description}</p><div class="demo">${markup}</div><details><summary>HTML example</summary><div class="code-actions"><wired-link href="https://github.com/node-projects/wired-elements/blob/master/docs/wired-${name}.md">API docs ↗</wired-link><wired-button class="copy">Copy HTML</wired-button></div><pre><code></code></pre></details>`;
  article.querySelector('code').textContent = markup;
  article.querySelector('.copy').addEventListener('click', async (event) => {
    const copyButton = event.currentTarget;
    try {
      await navigator.clipboard.writeText(markup);
      copyButton.textContent = 'Copied!';
      setTimeout(() => { copyButton.textContent = 'Copy HTML'; }, 1800);
    } catch {
      document.querySelector('#announcement').textContent = 'Copy unavailable. Select the HTML example and copy it manually.';
    }
  });
  gallery.append(article);
}

let category = 'All';
function filter() {
  const query = document.querySelector('#search').value.trim().toLowerCase();
  let count = 0;
  for (const article of gallery.children) {
    article.hidden = !((category === 'All' || article.dataset.category === category) && article.dataset.search.includes(query));
    if (!article.hidden) {
      count++;
      // Components need to redraw after returning from display:none.
      requestAnimationFrame(() => article.querySelectorAll('*').forEach(el => el.wiredRender?.(true)));
    }
  }
  document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'example' : 'examples'} · 26 elements, including radio-group, item, and tab`;
  document.querySelector('#empty').hidden = count !== 0;
}
const search = document.querySelector('#search');
search.addEventListener('input', filter);
search.updateComplete.then(() => {
  search.input?.setAttribute('aria-label', 'Find a component');
  // The built-in clear button changes the value without firing an input event.
  search.shadowRoot.querySelector('button').addEventListener('click', filter);
});
document.querySelectorAll('.filters [data-category]').forEach(button => button.addEventListener('click', () => {
  category = button.dataset.category;
  document.querySelectorAll('.filters [data-category]').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  filter();
}));
filter();

document.querySelector('#idea-button').addEventListener('click', () => {
  document.querySelector('#idea-result').textContent = 'Let’s make it happen!';
});
gallery.querySelectorAll('wired-button:not([id]), wired-fab, wired-icon-button').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#announcement').textContent = `You clicked ${button.localName}.`;
}));
const slider = document.querySelector('wired-slider');
slider.addEventListener('change', () => {
  document.querySelector('output').textContent = `${slider.value}%`;
  document.querySelector('wired-progress').value = slider.value;
  document.querySelector('wired-progress-ring').value = slider.value;
});
const dialog = document.querySelector('#demo-dialog');
const openDialog = document.querySelector('#open-dialog');
const closeDialog = document.querySelector('#close-dialog');
// Keep the modal out of the accessibility tree while it is closed.
dialog.inert = true;
dialog.setAttribute('role', 'dialog');
dialog.setAttribute('aria-modal', 'true');
dialog.setAttribute('aria-label', 'A little hello');
openDialog.addEventListener('click', () => {
  dialog.inert = false;
  dialog.open = true;
  closeDialog.focus();
});
function close() { dialog.open = false; dialog.inert = true; openDialog.focus(); }
closeDialog.addEventListener('click', close);
document.addEventListener('keydown', event => {
  if (!dialog.open) return;
  if (event.key === 'Escape') close();
  if (event.key === 'Tab') { event.preventDefault(); closeDialog.focus(); }
});
document.querySelector('#spinner-toggle').addEventListener('click', event => {
  const spinner = document.querySelector('wired-spinner');
  spinner.spinning = !spinner.spinning;
  event.currentTarget.textContent = spinner.spinning ? 'Pause' : 'Spin';
});
let videoUrl;
document.querySelector('#video-file').addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;
  if (videoUrl) URL.revokeObjectURL(videoUrl);
  videoUrl = URL.createObjectURL(file);
  document.querySelector('#demo-video').src = videoUrl;
  document.querySelector('#demo-video').hidden = false;
});
// IDs created by JavaScript are not present during the browser's initial anchor scroll.
if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView());

// Font metrics affect the hand-drawn outlines as well as the text.
document.fonts.ready.then(() => {
  document.querySelectorAll('*').forEach(element => element.wiredRender?.(true));
});
