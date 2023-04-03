import type { LetterNode, Tree } from './tree';

import { readFileSync } from 'node:fs';

const raw = readFileSync('./dictionary.txt', { encoding: 'utf-8' });
const arr = raw.split(',');
const filtered = new Set<string>();
for (const w of arr) filtered.add(w.toLowerCase());

console.log(filtered);
console.log(filtered.size);
// const tree = new Tree(filtered);

const g17 = [
    [0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0]
];

export class Node {
    free: boolean;
    neighbours = new Map<number, Node>();

    constructor(public letter: string, public index: number) {
        this.free = true;
    }

    addNeighbour(node: Node) {
        this.neighbours.set(node.index, node);
    }

    markAsUsed() {
        this.free = false;
    }

    clearUsed() {
        this.free = true;
    }
}

// const Colors = new Map<number, string>([
//     [0, '\x1b[31m%s\x1b[0m'],
//     [1, '\x1b[32m%s\x1b[0m'],
//     [2, '\x1b[33m%s\x1b[0m'],
//     [3, '\x1b[34m%s\x1b[0m'],
//     [4, '\x1b[35m%s\x1b[0m']
// ]);

export class Graph17 {
    m: Node[] = [];

    resultLen = 0;
    result: string[] = [];
    unique = new Set<string>();
    resCoords: { i: number; j: number }[][] = [];

    responce: { score: number; word: string; schema: string }[] = [];

    constructor(public inp: string) {
        // console.log(inp);
        if (inp.length !== 17) throw new Error('not 17');

        for (let i = 0; i < inp.length; i++) this.m.push(new Node(inp[i]!, i));
        for (let j = 0; j < inp.length; j++) {
            const graphConfig = g17[j]!;
            for (let i = 0; i < graphConfig.length; i++) {
                if (!graphConfig[i]) continue;
                this.m[j]!.addNeighbour(this.m[i]!);
            }
        }
        // console.log(this.m);
    }

    studyHowMuch() {
        for (const resp of this.result) {
            const parsed = resp.split(',');
            const indexes: number[] = [];
            for (const d of parsed) indexes.push(Number(d));
            this.unique.add(this.#buildWordString(indexes));
        }
        return this.unique;
    }

    clearAll() {
        for (const node of this.m) node.clearUsed();
    }

    // canMove0 = (i: number, j: number) => (this.m[i] && this.m[i]![j + 1] && this.m[i]![j + 1]!.free ? true : false);
    // canMove45 = (i: number, j: number) =>
    //     this.m[i - 1] && this.m[i - 1]![j + 1] && this.m[i - 1]![j + 1]!.free ? true : false;
    // canMove90 = (i: number, j: number) => (this.m[i - 1] && this.m[i - 1]![j] && this.m[i - 1]![j]!.free ? true : false);
    // canMove135 = (i: number, j: number) =>
    //     this.m[i - 1] && this.m[i - 1]![j - 1] && this.m[i - 1]![j - 1]!.free ? true : false;
    // canMove180 = (i: number, j: number) => (this.m[i] && this.m[i]![j - 1] && this.m[i]![j - 1]!.free ? true : false);
    // canMove225 = (i: number, j: number) =>
    //     this.m[i + 1] && this.m[i + 1]![j - 1] && this.m[i + 1]![j - 1]!.free ? true : false;
    // canMove270 = (i: number, j: number) => (this.m[i + 1] && this.m[i + 1]![j] && this.m[i + 1]![j]!.free ? true : false);
    // canMove315 = (i: number, j: number) =>
    //     this.m[i + 1] && this.m[i + 1]![j + 1] && this.m[i + 1]![j + 1]!.free ? true : false;

    move(node: Node, previous: string, pointer: LetterNode | undefined): void {
        // console.log(i, j, previous, this.m[i]![j]!.letter, pointer);
        if (!pointer) return;
        node.markAsUsed();
        if (pointer.isLast()) this.result.push(`${previous},${node.index}`.slice(1));
        for (const n of node.neighbours.values())
            if (n.free) this.move(n, `${previous},${node.index}`, pointer.getDaughter(n.letter));

        node.clearUsed();

        return;
    }

    // moveNoRes(i: number, j: number, pointer: LetterNode | undefined): void {
    //     if (!pointer) return;
    //     this.m[i]![j]!.markAsUsed();
    //     if (pointer.isLast()) this.resultLen += 1;
    //     if (this.canMove0(i, j)) this.moveNoRes(i, j + 1, pointer.getDaughter(this.m[i]![j + 1]!.letter));
    //     if (this.canMove45(i, j)) this.moveNoRes(i - 1, j + 1, pointer.getDaughter(this.m[i - 1]![j + 1]!.letter));
    //     if (this.canMove90(i, j)) this.moveNoRes(i - 1, j, pointer.getDaughter(this.m[i - 1]![j]!.letter));
    //     if (this.canMove135(i, j)) this.moveNoRes(i - 1, j - 1, pointer.getDaughter(this.m[i - 1]![j - 1]!.letter));
    //     if (this.canMove180(i, j)) this.moveNoRes(i, j - 1, pointer.getDaughter(this.m[i]![j - 1]!.letter));
    //     if (this.canMove225(i, j)) this.moveNoRes(i + 1, j - 1, pointer.getDaughter(this.m[i + 1]![j - 1]!.letter));
    //     if (this.canMove270(i, j)) this.moveNoRes(i + 1, j, pointer.getDaughter(this.m[i + 1]![j]!.letter));
    //     if (this.canMove315(i, j)) this.moveNoRes(i + 1, j + 1, pointer.getDaughter(this.m[i + 1]![j + 1]!.letter));

    //     this.m[i]![j]!.clearUsed();

    //     return;
    // }

    dive(tree: Tree) {
        for (const node of this.m) {
            // console.log('first letter is', first);
            const branch = tree.getDaughter(node.letter);
            this.move(node, '', branch);
            this.clearAll();
        }
        // console.log(this.result);
        return this;
    }

    // divePerf(tree: Tree) {
    //     for (let i = 0; i < this.dimension; i++) {
    //         for (let j = 0; j < this.dimension; j++) {
    //             const first = this.m[i]![j]!;

    //             // console.log('first letter is', first);
    //             const branch = tree.getDaughter(first.letter);
    //             this.moveNoRes(i, j, branch);
    //             this.clearAll();
    //         }
    //     }
    //     return this.resultLen;
    // }

    // prepareRes() {
    //     for (const word of this.result) {
    //         const w: { i: number; j: number }[] = [];
    //         for (let i = 0; i < word.length; i += 2) {
    //             w.push({ i: Number(word[i]), j: Number(word[i + 1]) });
    //         }
    //         this.resCoords.push(w);
    //     }
    // }

    #buildWordString(word: number[]) {
        let out = '';
        for (const d of word) out += this.m[d]!.letter;
        return out;
    }

    // #calcWordScore(word: { i: number; j: number }[]) {
    //     let score = 0;
    //     let c2 = false;
    //     let c3 = false;
    //     for (let i = 0; i < word.length; i++) {
    //         const coords = word[i]!;
    //         const s = this.m[coords.i]![coords.j]!;
    //         if (s.c2) c2 = true;
    //         if (s.c3) c3 = true;
    //         score += (i + 1) * s.mul;
    //     }
    //     if (c2) score *= 2;
    //     if (c3) score *= 3;
    //     return score;
    // }

    drawSingleResult(word: number[]) {
        // const firstSymbol = word[0]!;
        const set = new Set<number>();
        for (const d of word) set.add(d);

        let out = `   ${this.m[0]?.letter}   ${this.m[1]?.letter}   
 ${this.m[2]?.letter}   ${this.m[3]?.letter}   ${this.m[4]?.letter}
   ${this.m[5]?.letter}   ${this.m[6]?.letter}
 ${this.m[7]?.letter}   ${this.m[8]?.letter}   ${this.m[9]?.letter}
   ${this.m[10]?.letter}   ${this.m[11]?.letter}
 ${this.m[12]?.letter}   ${this.m[13]?.letter}   ${this.m[14]?.letter}
   ${this.m[15]?.letter}   ${this.m[16]?.letter}\n${this.#buildWordString(word)}\n`;
        // for (let i = 0; i < this.dimension; i++) {
        //     for (let j = 0; j < this.dimension; j++) {
        //         out += ' ';
        //         if (firstSymbol.i === i && firstSymbol.j === j) {
        //             out += '\x1b[41m' + this.m[i]![j]!.letter.toUpperCase() + '\x1b[0m';
        //         } else if (map.has(i) && map.get(i)!.has(j)) {
        //             out += '\x1b[32m' + this.m[i]![j]!.letter.toUpperCase() + '\x1b[0m';
        //         } else {
        //             out += '\x1b[2m' + this.m[i]![j]!.letter + '\x1b[0m';
        //         }
        //     }
        //     if (i === 2) out += `     ${this.#buildWordString(word).toUpperCase()}    ${score}\n`;
        //     else out += '\n';
        // }

        // return out;
        console.log(out);
    }

    // calculateResponce() {
    //     this.prepareRes();
    //     const map = new Map<string, { score: number; schema: string }>();
    //     for (const word of this.resCoords) {
    //         const res = this.#buildWordString(word);
    //         const score = this.#calcWordScore(word);
    //         if (map.has(res) && map.get(res)!.score >= score) continue;
    //         const schema = this.drawSingleResult(word, score);
    //         map.set(res, { score, schema });
    //     }

    //     for (const [word, { schema, score }] of map) this.responce.push({ word, schema, score });
    //     this.responce.sort((a, b) => {
    //         if (a.score > b.score) return 1;
    //         if (a.score < b.score) return -1;
    //         return 0;
    //     });
    // }

    draw() {
        console.log('start draw');
        // this.calculateResponce();
        for (const resp of this.result) {
            const parsed = resp.split(',');
            const indexes: number[] = [];
            for (const d of parsed) indexes.push(Number(d));
            this.drawSingleResult(indexes);
        }
        console.log('end draw');
    }
}

// new Graph17('пкбсмоакрподмтосд').dive(tree).draw();
