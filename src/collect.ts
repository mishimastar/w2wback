import { writeFileSync } from 'fs';
import { genTable } from './buildgame';

const IWANT = 20000000;
const tSize = 6;
const splitSize = 10;
const buf = new Set<string>();

const commonStart = performance.now();

for (let i = 0; i < IWANT; i++) {
    const start = performance.now();
    const table = genTable(tSize);
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
        writeFileSync(`./tables${tSize}/${i + 1}.json`, JSON.stringify([...buf]));
        buf.clear();
    }
    buf.add(table);
}
