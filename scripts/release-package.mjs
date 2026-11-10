import { execFileSync } from 'node:child_process';
import { appendFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { basename, isAbsolute, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const registry = 'https://registry.npmjs.org';

export function versionFromTag(tag) {
  const version = tag?.replace(/^v/, '');
  const number = '(?:0|[1-9][0-9]*)';
  const identifier = '(?:0|[1-9][0-9]*|[0-9]*[a-zA-Z-][0-9a-zA-Z-]*)';
  const pattern = new RegExp(`^${number}\\.${number}\\.${number}(?:-${identifier}(?:\\.${identifier})*)?(?:\\+[0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*)?$`);
  if (!version || !pattern.test(version)) {
    throw new Error('Release tag must be an exact SemVer version, optionally prefixed with v (for example v3.2.0).');
  }
  // npm normalizes away build metadata, so reject it rather than publish a different version.
  if (version.includes('+')) throw new Error('npm release versions must not contain build metadata.');
  return version;
}

export function distTag(version, prerelease) {
  return prerelease || version.includes('-') ? 'next' : 'latest';
}

export function packMetadata(output, pkg) {
  const result = JSON.parse(output);
  // npm <=11 returns an array. npm 12 returns an object keyed by package name.
  const packages = Array.isArray(result) ? result
    : result && typeof result === 'object' ? (result.filename ? [result] : Object.values(result)) : [];
  if (packages.length !== 1) throw new Error('Expected exactly one packed package.');
  const metadata = packages[0];
  if (metadata?.name !== pkg.name || metadata.version !== pkg.version) {
    throw new Error('Packed package name or version does not match package.json.');
  }
  if (typeof metadata.filename !== 'string' || basename(metadata.filename) !== metadata.filename || !metadata.filename.endsWith('.tgz')) {
    throw new Error('Invalid package tarball filename.');
  }
  if (typeof metadata.integrity !== 'string' || !metadata.integrity.startsWith('sha512-')) {
    throw new Error('Packed package is missing its SHA-512 integrity.');
  }
  const files = new Set(metadata.files?.map(file => file.path));
  for (const entry of [pkg.main, pkg.module, pkg.types]) {
    if (entry && !files.has(entry.replace(/^\.\//, ''))) {
      throw new Error(`Built package entry point is missing from the tarball: ${entry}`);
    }
  }
  return metadata;
}

export function shouldPublish(existing, integrity) {
  if (!existing) return true;
  if (existing.dist?.integrity !== integrity) {
    throw new Error('This npm version already exists with different package contents. Create a new release version.');
  }
  return false;
}

function npm(args, capture = false) {
  return execFileSync('npm', args, { encoding: 'utf8', stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit' });
}

function output(values) {
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, Object.entries(values).map(([key, value]) => `${key}=${value}\n`).join(''));
  }
}

async function main(command) {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  if (command === 'version') {
    const version = versionFromTag(process.env.RELEASE_TAG);
    npm(['version', version, '--no-git-tag-version', '--allow-same-version', '--ignore-scripts']);
    console.log(`Release package: ${pkg.name}@${version}`);
  } else if (command === 'pack') {
    const directory = resolve(process.env.PACK_DIRECTORY || '.release-package');
    mkdirSync(directory, { recursive: true });
    const metadata = packMetadata(npm(['pack', '--json', '--pack-destination', directory], true), pkg);
    const tarball = resolve(directory, metadata.filename);
    if (!statSync(tarball).isFile()) throw new Error('npm pack did not produce a tarball.');
    output({ tarball, integrity: metadata.integrity, dist_tag: distTag(pkg.version, process.env.RELEASE_PRERELEASE === 'true') });
    console.log(`Packed ${pkg.name}@${pkg.version}: ${tarball}`);
  } else if (command === 'publish') {
    const { TARBALL: tarball, PACK_INTEGRITY: integrity, NPM_TAG: tag } = process.env;
    if (!tarball || !isAbsolute(tarball) || !integrity || !['latest', 'next'].includes(tag)) {
      throw new Error('Missing tarball, integrity, or distribution tag from the pack step.');
    }
    const response = await fetch(`${registry}/${encodeURIComponent(pkg.name)}/${encodeURIComponent(pkg.version)}`);
    if (response.status !== 404 && !response.ok) {
      throw new Error(`Unable to check the npm registry: HTTP ${response.status}.`);
    }
    const existing = response.status === 404 ? null : await response.json();
    if (shouldPublish(existing, integrity)) {
      npm(['publish', tarball, '--access', 'public', '--tag', tag, '--provenance', `--registry=${registry}`]);
    } else {
      console.log(`${pkg.name}@${pkg.version} already exists with matching integrity; continuing the release upload.`);
    }
  } else {
    throw new Error('Expected command: version, pack, or publish.');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await main(process.argv[2]);
}
