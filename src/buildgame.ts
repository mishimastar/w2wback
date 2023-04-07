import { readFileSync } from 'node:fs';
import { Graph } from './graph';
import { TableGenerators } from './tableGenerator';
import { TreeDict } from './tree';

const raw = readFileSync('./dictionary.txt', { encoding: 'utf-8' });
const arr = raw.split(',');
const filtered = new Set<string>();
const filtered2 = new Set<string>();
for (const w of arr) if (w.length > 3) filtered.add(w);
for (const w of arr) filtered2.add(w);

const tree = new TreeDict(filtered);
const treeWithShort = new TreeDict(filtered2);

const generate = new TableGenerators(tree);

export const BuildGame = (size: number): { table: string; dict: string[] } => {
    let table: string;
    const dict: string[] = [];
    if (size <= 6) {
        table = generate.geneticGraph(size);
    } else {
        table = generate.nn2Graph(size);
    }

    const graph = new Graph(table);
    const { words } = graph.dive(treeWithShort).studyResult();
    for (const resp of words) dict.push(resp);
    return { table, dict };
};
