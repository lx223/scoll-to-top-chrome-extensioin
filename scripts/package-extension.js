import { mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import bestzip from 'bestzip';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = resolve(root, 'dist');
const zipDir = resolve(root, 'build', 'zip');
const crxDir = resolve(root, 'build', 'crx');
const zipPath = resolve(zipDir, 'scroll-to-top.zip');
const crxPath = resolve(crxDir, 'scroll-to-top.crx');
const keyPath = resolve(root, 'key.pem');

async function main() {
  if (!existsSync(dist)) {
    console.error('dist/ not found. Run vite build first.');
    process.exit(1);
  }

  mkdirSync(zipDir, { recursive: true });
  mkdirSync(crxDir, { recursive: true });

  await bestzip({
    destination: zipPath,
    source: '*',
    cwd: dist,
  });
  console.log('Created', zipPath);

  if (existsSync(keyPath)) {
    await new Promise((resolvePromise, reject) => {
      const proc = spawn(
        'npx',
        ['crx3', '-p', keyPath, '-o', crxPath, dist],
        { stdio: 'inherit', cwd: root, shell: true }
      );
      proc.on('close', (code) =>
        code === 0 ? resolvePromise() : reject(new Error(`crx3 exited ${code}`))
      );
      proc.on('error', reject);
    });
    console.log('Created', crxPath);
  } else {
    console.log('Skipping .crx (key.pem not found). Zip is ready for loading unpacked.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
