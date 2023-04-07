import { readFileSync } from 'node:fs';
import { Graph } from './graph';
import { TableGenerators } from './tableGenerator';
import { TreeDict } from './tree';

const raw = readFileSync('./dictionary.txt', { encoding: 'utf-8' });
const arr = raw.split(',');
const filtered = new Set<string>();
for (const w of arr) if (w.length > 3) filtered.add(w);
// for (const w of arr) filtered.add(w.toLowerCase());

const tree = new TreeDict(filtered);

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
    const { words } = graph.dive(tree).studyResult();
    for (const resp of words) dict.push(resp);
    return { table, dict };
};
