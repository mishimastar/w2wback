import { readFileSync } from 'node:fs';
import { Graph17 } from './linkedGraph';
import { Matrix } from './matrix';
import { Generator } from './nn2';
import { Tree } from './tree';

const raw = readFileSync('./dictionary.txt', { encoding: 'utf-8' });
const arr = raw.split(',');
const filtered = new Set<string>();
// for (const w of arr) if (w.length >= 3) filtered.add(w.toLowerCase());
for (const w of arr) filtered.add(w.toLowerCase());

console.log(filtered);
console.log(filtered.size);
const tree = new Tree(filtered);

const cfgs = new Map<number, { enough: number; epoch: number }>([
    [4, { enough: 100, epoch: 200000 }],
    [5, { enough: 130, epoch: 100000 }],
    [17, { enough: 80, epoch: 100000 }],
    [6, { enough: 200, epoch: 120000 }]
]);

// const countAvg = (last: number, iteration: number, res: number[]) => {
//     if (iteration === 0) return res[0]!;
//     let sum = 0;
//     for (let i = iteration; i > res.length - last - 1; i--) sum += res[i]!;
//     return (sum / last).toFixed(4);
// };

export const genTable = (size: number) => {
    const cfg = cfgs.get(size)!;
    const steps = cfg.epoch;
    const s06 = Math.trunc((steps * 2) / 3);
    const enough = cfg.enough;
    const enough08 = Math.trunc(cfg.enough * 0.8);

    const Gen = new Generator(size ** 2, steps, 1, 3);

    let maxWords = 0;
    let bestTable = '';
    let bestStep = 0;

    const results: number[] = [];

    // console.log('enough', enough, '80%', enough08);
    // console.log('steps', steps, '66%', s06);
    let previousWords = 0;
    for (let i = 0; i < steps; i++) {
        const table = Gen.buildString();
        const matrix = new Matrix(table, size);
        matrix.dive(tree);
        const words = matrix.studyHowMuchWords();
        results.push(words);
        if (words > maxWords) {
            maxWords = words;
            bestTable = table;
            bestStep = i;
        }
        if (maxWords >= enough || (i >= s06 && maxWords >= enough08)) {
            console.log('ITERRUPT', table, 'words:', words, 'maxWords:', maxWords, 'bestTable:', bestTable, 'STEP:', i);
            return bestTable;
        }
        if (words > previousWords) Gen.result(2);
        if (words < previousWords) Gen.result(-1.5);
        previousWords = words;
    }

    console.log('RESULT     maxWords:', maxWords, 'bestTable:', bestTable, 'STEPS:', steps, 'best step:', bestStep);
    Gen.stats();
    return bestTable;
};

export const genGraph = (size: number) => {
    const cfg = cfgs.get(size)!;
    const steps = cfg.epoch;
    const s06 = Math.trunc((steps * 2) / 3);
    const enough = cfg.enough;
    const enough08 = Math.trunc(cfg.enough * 0.8);

    const Gen = new Generator(size, steps, 1, 3);

    let maxWords = 0;
    let bestTable = '';
    let bestStep = 0;

    const results: number[] = [];

    // console.log('enough', enough, '80%', enough08);
    // console.log('steps', steps, '66%', s06);
    let previousWords = 0;
    for (let i = 0; i <= steps; i++) {
        // if (i === 20) break;
        const table = Gen.buildString();
        // console.log(table);
        const graph = new Graph17(table);
        graph.dive(tree);
        const words = graph.studyHowMuch().size;
        results.push(words);
        if (words > maxWords) {
            maxWords = words;
            bestTable = table;
            bestStep = i;
        }
        if (maxWords >= enough || (i >= s06 && maxWords >= enough08)) {
            console.log('ITERRUPT', table, 'words:', words, 'maxWords:', maxWords, 'bestTable:', bestTable, 'STEP:', i);
            return bestTable;
        }
        if (words > previousWords) Gen.result(1);
        if (words < previousWords) Gen.result(-1);
        previousWords = words;
    }

    console.log('RESULT     maxWords:', maxWords, 'bestTable:', bestTable, 'STEPS:', steps, 'best step:', bestStep);
    Gen.stats();
    return bestTable;
};

export const BuildGame = (size: number): { table: string; dict: string[] } => {
    let table: string;
    const dict: string[] = [];
    if (size <= 6) {
        table = genTable(size);
        const matrix = new Matrix(table, size);
        matrix.dive(tree);
        matrix.calculateResponce();
        for (const resp of matrix.responce) dict.push(resp.word);
    } else {
        table = genGraph(size);
        const graph = new Graph17(table);
        const res = graph.dive(tree).studyHowMuch();
        for (const resp of res) dict.push(resp);
    }
    // const table = 'лсоиаопмртэртомоснезпруип';
    // console.log(matrix.m);
    // console.log(matrix.result.length);

    // matrix.draw();
    // console.log(matrix.responce.length);
    return { table, dict };
};
