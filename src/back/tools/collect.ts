import { writeFileSync } from 'fs';
import { TableGenerators } from '../tableGenerator';
import { readFileSync } from 'node:fs';
import { TreeDict } from '../tree';

const raw = readFileSync('./dictionary.txt', { encoding: 'utf-8' });
const arr = raw.split(',');
const filtered = new Set<string>();
for (const w of arr) if (w.length > 3) filtered.add(w);
// for (const w of arr) filtered.add(w.toLowerCase());

const IWANT = 20000000;
const tSize = 5;
const splitSize = 100;
const buf = new Set<string>();
const tree = new TreeDict(filtered);

const generate = new TableGenerators(tree);

const commonStart = performance.now();

for (let i = 0; i < IWANT; i++) {
    const start = performance.now();
    const table = generate.geneticGraph(tSize);
    console.log(
        i,
        table,
        'spent:',
        performance.now() - start,
        'speed:',
        ((i + 1) * 3600000) / (performance.now() - commonStart),
        'table per hour'
    );
    if (buf.size === splitSize) {
        writeFileSync(`./tables${tSize}/${i}.json`, JSON.stringify([...buf]));
        buf.clear();
    }
    buf.add(table);
}
