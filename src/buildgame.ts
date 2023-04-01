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

const genTable = () => {
    const steps = 1000000;
    const logSteps = 10000;
    const Gen = new Generator(25, steps, 1);

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
        const matrix = new Matrix(table, 5);
        const words = matrix.divePerf(tree);
        results.push(words);
        if (words > maxWords) {
            maxWords = words;
            bestTable = table;
            bestStep = i;
            if (words > 220) {
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

export const BuildGame = (): { table: string; dict: string[] } => {
    const table = genTable();
    // const table = 'лсоиаопмртэртомоснезпруип';
    const matrix = new Matrix(table, 5, [0, 1], [4, 3], [1, 3], [0, 2]);
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
