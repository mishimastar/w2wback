import { readFileSync, writeFileSync } from 'fs';
import { Graph } from '../graph';
import { Generator } from '../nn2';
import { TreeDict } from '../tree';

const raw = readFileSync('./dictionary.txt', { encoding: 'utf-8' });
const arr = raw.split(',');
const filtered = new Set<string>();
for (const w of arr) filtered.add(w.toLowerCase());
// for (const w of arr) if (w.length > 3) filtered.add(w.toLowerCase());

for (const word of arr) {
    if (!word || word.includes('-') || word.includes('.')) continue;
    filtered.add(word.trim());
}

const size = 31;

const tree = new TreeDict(filtered);
const steps = 1000000;
const logSteps = 10000;
const Gen = new Generator(size, steps, 1, 3);

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
for (let i = 0; i <= steps; i++) {
    // if (i === 20) break;
    const table = Gen.buildString();
    // console.log(table);
    const graph = new Graph(table);
    graph.dive(tree);
    const words = graph.studyResult().words.size;
    results.push(words);
    if (words > maxWords) {
        maxWords = words;
        bestTable = table;
        bestStep = i;
    }
    if (words > previousWords) Gen.result(1);
    if (words < previousWords) Gen.result(-1);
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
