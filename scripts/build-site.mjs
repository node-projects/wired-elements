import { build } from 'esbuild';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

await rm('_site', { recursive: true, force: true });
await mkdir('_site', { recursive: true });
await cp('site', '_site', { recursive: true, filter: (path) => !path.endsWith('.js') });
await mkdir('_site/fonts', { recursive: true });
await cp('node_modules/@fontsource/patrick-hand/files/patrick-hand-latin-400-normal.woff2', '_site/fonts/patrick-hand-latin-400-normal.woff2');
await cp('node_modules/@fontsource/patrick-hand/LICENSE', '_site/fonts/LICENSE');
await build({
  entryPoints: ['site/showcase.js'],
  outfile: '_site/showcase.js',
  bundle: true,
  format: 'esm',
  target: ['es2020'],
  minify: true,
  sourcemap: true,
  // These modules register custom elements as a side effect.
  treeShaking: false
});
await writeFile('_site/.nojekyll', '');
console.log('Showcase built in _site/');
