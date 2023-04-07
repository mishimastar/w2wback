import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { Matrix } from '../matrix';
import { TreeDict } from '../tree';

const raw = readFileSync('./dictionary.txt', { encoding: 'utf-8' });
const arr = raw.split(',');
const filtered = new Set<string>();
for (const w of arr) filtered.add(w.toLowerCase());

console.log(filtered);
console.log(filtered.size);
const tree = new TreeDict(filtered);
const folder = './tables5/';

const out = readdirSync('./tables5/');
const set = new Set<string>();
const map = new Map<number, string[]>();
const wordMap = new Map<string, number>();
const wordLenMap = new Map<number, number>();

const bufArr: string[] = [];
for (const file of out) {
    const buf = JSON.parse(readFileSync(`${folder}${file}`, { encoding: 'utf-8' })) as string[];
    for (const str of buf) {
        set.add(str);
        bufArr.push(str);
    }
}

console.log('unique:', set.size, 'total:', bufArr.length);

for (const table of set) {
    const matrix = new Matrix(table, 5);
    matrix.dive(tree);
    const words = matrix.studyWords();
    if (map.has(words.size)) {
        map.get(words.size)!.push(table);
    } else {
        map.set(words.size, [table]);
    }
    for (const w of words) {
        if (wordMap.has(w)) {
            const buf = wordMap.get(w)! + 1;
            wordMap.set(w, buf);
        } else wordMap.set(w, 1);

        if (wordLenMap.has(w.length)) {
            const buf = wordLenMap.get(w.length)! + 1;
            wordLenMap.set(w.length, buf);
        } else wordLenMap.set(w.length, 1);
    }
}

console.log(map.size);

console.log(wordMap.size);
const wordMapArr = Array.from(wordMap);
wordMapArr.sort((a, b) => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    return 0;
});
console.log(wordMapArr);

console.log(wordLenMap);

writeFileSync(`./${set.size}.json`, JSON.stringify([...set]));
