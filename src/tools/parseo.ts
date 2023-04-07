import { readFileSync } from 'node:fs';

const raw = readFileSync('./dictionary.txt', { encoding: 'utf-8' });

const filtered = new Set(raw.split(','));

console.log(filtered);
