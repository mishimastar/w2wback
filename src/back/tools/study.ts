import { readFileSync, writeFileSync } from 'fs';
import { Matrix } from '../matrix';
import { Generator } from '../nn';
import { TreeDict } from '../tree';

const raw = readFileSync('./dictionary.txt', { encoding: 'utf-8' });
const arr = raw.split(',');
const filtered = new Set<string>();
for (const w of arr) if (w.length > 3) filtered.add(w.toLowerCase());

// const arr = JSON.parse(readFileSync('./ourCustomExtented2.json', { encoding: 'utf-8' }));

// const filtered = new Set<string>();

for (const word of arr) {
    if (!word || word.includes('-') || word.includes('.')) continue;
    filtered.add(word.trim());
}

const size = 5;

const tree = new TreeDict(filtered);
const steps = 500000;
const logSteps = 10000;
const Gen = new Generator(size ** 2, steps, 1);

let maxWords = 0;
let bestTable = '';
let bestStep = 0;

const results: number[] = [];
const resAvg: [number, number | string][] = [];

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
    matrix.dive(tree);
    const words = matrix.studyHowMuchWords();
    results.push(words);
    if (words > maxWords) {
        maxWords = words;
        bestTable = table;
        bestStep = i;
    }
    if (words > previousWords) Gen.result(true);
    if (words < previousWords) Gen.result(false);
    previousWords = words;
    if (i % logSteps === 0) {
        const avg = countAvg(logSteps, i, results);
        resAvg.push([i, avg]);
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
// Gen.saveModel();

let out = '';
for (let i = 0; i < results.length; i++) out += `${i},${results[i]}\n`;
writeFileSync('./data2.csv', out);
let out2 = '';
for (let i = 0; i < resAvg.length; i++) out2 += `${resAvg[i]![0]},${resAvg[i]![1]}\n`;
writeFileSync('./data3.csv', out2);
