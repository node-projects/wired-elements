import assert from 'node:assert/strict';
import { test } from 'node:test';
import { distTag, packMetadata, shouldPublish, versionFromTag } from './release-package.mjs';

const pkg = { name: '@node-projects/wired-elements', version: '3.2.0', main: 'lib/wired-elements.js', types: 'lib/wired-elements.d.ts' };
const metadata = {
  name: pkg.name, version: pkg.version,
  filename: 'node-projects-wired-elements-3.2.0.tgz', integrity: 'sha512-example',
  files: [{ path: pkg.main }, { path: pkg.types }]
};

test('normalizes npm 11 arrays and npm 12 package-keyed pack output', () => {
  for (const result of [[metadata], { [pkg.name]: metadata }, metadata]) {
    assert.deepEqual(packMetadata(JSON.stringify(result), pkg), metadata);
  }
});

test('rejects ambiguous, mismatched, unsafe, and unbuilt tarballs before publishing', () => {
  for (const result of [[], null, [metadata, metadata], { other: { ...metadata, version: '1.0.0' } },
    [{ ...metadata, filename: '../package.tgz' }], [{ ...metadata, files: [] }], [{ ...metadata, integrity: undefined }]]) {
    assert.throws(() => packMetadata(JSON.stringify(result), pkg));
  }
});

test('takes exact versions from release tags without accepting version ranges or npm shortcuts', () => {
  for (const version of ['0.0.0', '3.2.0', '3.2.0-beta.1', '3.2.0-0', '3.2.0-alpha-1']) {
    assert.equal(versionFromTag(version), version);
    assert.equal(versionFromTag(`v${version}`), version);
  }
  for (const tag of [undefined, 'latest', 'patch', '^3.2.0', '3.2', '03.2.0', 'v3.2.0-beta.01', '3.2.0+build.1', '3.2.0\n', '$(touch /tmp/unsafe)']) {
    assert.throws(() => versionFromTag(tag));
  }
});

test('prereleases do not replace latest', () => {
  assert.equal(distTag('3.2.0', false), 'latest');
  assert.equal(distTag('3.2.0-beta.1', false), 'next');
  assert.equal(distTag('3.2.0', true), 'next');
});

test('retries skip identical published packages but reject changed contents', () => {
  assert.equal(shouldPublish(null, metadata.integrity), true);
  assert.equal(shouldPublish({ dist: { integrity: metadata.integrity } }, metadata.integrity), false);
  assert.throws(() => shouldPublish({ dist: { integrity: 'sha512-different' } }, metadata.integrity));
});
