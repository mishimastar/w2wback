import { readFileSync } from 'node:fs';
import { Matrix } from './matrix';
import { Generator } from './nn';
import { Tree } from './tree';

const raw = readFileSync('./dictionary.txt', { encoding: 'utf-8' });
const arr = raw.split(',');
const filtered = new Set<string>();
for (const w of arr) filtered.add(w.toLowerCase());

console.log(filtered);
console.log(filtered.size);
const tree = new Tree(filtered);

const cfgs = new Map<number, { enough: number; epoch: number }>([
    [5, { enough: 300, epoch: 250000 }],
    [6, { enough: 400, epoch: 400000 }]
]);

const genTable = (size: number) => {
    const cfg = cfgs.get(size)!;
    const steps = cfg.epoch;
    const enough = cfg.enough;
    const logSteps = 10000;
    const Gen = new Generator(size ** 2, steps, 1);

    let maxWords = 0;
    let bestTable = '';
    let bestStep = 0;

    const results: number[] = [];

    const countAvg = (last: number, iteration: number, res: number[]) => {
        if (iteration === 0) return res[0]!;
        let sum = 0;
        for (let i = iteration; i > res.length - last - 1; i--) sum += res[i]!;
        return (sum / last).toFixed(4);
    };

    let previousWords = 0;
    for (let i = 0; i < steps; i++) {
        const table = Gen.buildString();
        const matrix = new Matrix(table, size);
        const words = matrix.divePerf(tree);
        results.push(words);
        if (words > maxWords) {
            maxWords = words;
            bestTable = table;
            bestStep = i;
            if (words > enough) {
                console.log(
                    table,
                    'words:',
                    words,
                    'maxWords:',
                    maxWords,
                    'bestTable:',
                    bestTable,
                    'STEP:',
                    i,
                    'avg:',
                    countAvg(logSteps, i, results)
                );
                return table;
            }
        }
        if (words > previousWords) Gen.result(true);
        if (words < previousWords) Gen.result(false);
        previousWords = words;
        if (i % logSteps === 0) {
            console.log(
                table,
                'words:',
                words,
                'maxWords:',
                maxWords,
                'bestTable:',
                bestTable,
                'STEP:',
                i,
                'avg:',
                countAvg(logSteps, i, results)
            );
        }
    }

    console.log('RESULT     maxWords:', maxWords, 'bestTable:', bestTable, 'STEPS:', steps, 'best step:', bestStep);
    Gen.stats();
    return bestTable;
};

export const BuildGame = (size: number): { table: string; dict: string[] } => {
    const table = genTable(size);
    // const table = 'лсоиаопмртэртомоснезпруип';
    const matrix = new Matrix(table, size);
    // console.log(matrix.m);
    matrix.dive(tree);
    // console.log(matrix.result.length);

    matrix.calculateResponce();
    const dict: string[] = [];
    for (const resp of matrix.responce) dict.push(resp.word);
    // matrix.draw();
    // console.log(matrix.responce.length);
    return { table, dict };
};
