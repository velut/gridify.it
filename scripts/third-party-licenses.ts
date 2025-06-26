import fs from 'node:fs/promises';

await fs.rename('static/third-party-licenses.txt', 'build/third-party-licenses.txt');
