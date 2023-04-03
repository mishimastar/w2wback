import { readFileSync } from 'node:fs';

const arr = readFileSync('./dictionary.txt', { encoding: 'utf-8' }).split(',');

const filtered = new Set<string>();

for (const word of arr) {
    if (!word || word.includes('-') || word.includes('.')) continue;
    filtered.add(word.trim());
}

const wordLenMap = new Map<number, number>();

console.log('unique words:', filtered.size);

const map = new Map<string, number>();

for (const w of filtered) {
    for (const symbol of w) {
        if (map.has(symbol)) {
            const buf = map.get(symbol)!;
            map.set(symbol, buf + 1);
        } else map.set(symbol, 1);
    }
    if (wordLenMap.has(w.length)) {
        const buf = wordLenMap.get(w.length)! + 1;
        wordLenMap.set(w.length, buf);
    } else wordLenMap.set(w.length, 1);
}

console.log(map);

const res = Array.from(map);

res.sort((a, b) => {
    if (a[1] > b[1]) return 1;
    if (a[1] < b[1]) return -1;
    return 0;
});

const o = Array.from(wordLenMap);
o.sort((a, b) => {
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
});

console.log(res);
for (const p of o) console.log(p);
