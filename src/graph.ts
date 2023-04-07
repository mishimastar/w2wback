import type { LetterNode, TreeDict } from './tree';
import { GraphConfigs } from './graphCfg';

export class GraphNode {
    free: boolean;
    neighbours = new Map<number, GraphNode>();

    constructor(public letter: string, public index: number) {
        this.free = true;
    }

    addNeighbour(node: GraphNode) {
        this.neighbours.set(node.index, node);
    }

    markAsUsed() {
        this.free = false;
    }

    clearUsed() {
        this.free = true;
    }
}

export class Graph {
    m: GraphNode[] = [];

    result: string[] = [];
    unique = new Set<string>();

    constructor(public inp: string) {
        if (!GraphConfigs.has(inp.length)) throw new Error('no config for that graph', { cause: { inp, len: inp.length } });

        const cfg = GraphConfigs.get(inp.length)!;

        for (let i = 0; i < inp.length; i++) this.m.push(new GraphNode(inp[i]!, i));
        for (const node of this.m) {
            const graphConfig = cfg[node.index]!;
            for (let i = 0; i < graphConfig.length; i++) {
                if (!graphConfig[i]) continue;
                node.addNeighbour(this.m[i]!);
            }
        }
    }

    studyResult(): { words: Set<string>; score: number; reason: number } {
        let score = 0;
        let reason = 0;
        for (const resp of this.result) {
            const indexes = resp.split(',').map((d) => Number(d));
            this.unique.add(this.#buildWordString(indexes));
        }
        for (const word of this.unique) {
            if (word.length >= 8) reason += this.#calcWordScore(word.length);
            score += this.#calcWordScore(word.length);
        }
        return { words: this.unique, score, reason };
    }

    clearAll = () => this.m.map((node) => node.clearUsed());

    move(node: GraphNode, previous: string, pointer: LetterNode | undefined): void {
        if (!pointer) return;
        node.markAsUsed();
        if (pointer.isLast()) this.result.push(`${previous},${node.index}`.slice(1));
        for (const n of node.neighbours.values())
            if (n.free) this.move(n, `${previous},${node.index}`, pointer.getDaughter(n.letter));

        node.clearUsed();

        return;
    }

    dive(tree: TreeDict) {
        for (const node of this.m) {
            const branch = tree.getDaughter(node.letter);
            this.move(node, '', branch);
            this.clearAll();
        }
        return this;
    }

    #buildWordString(word: number[]) {
        let out = '';
        for (const d of word) out += this.m[d]!.letter;
        return out;
    }

    #calcWordScore(wordLen: number) {
        let score = 0;
        for (let i = 0; i < wordLen; i++) score += i + 1;
        return score;
    }
}

//     drawSingleResult(word: number[]) {
//         // const firstSymbol = word[0]!;
//         const set = new Set<number>();
//         for (const d of word) set.add(d);

//         let out = `   ${this.m[0]?.letter}   ${this.m[1]?.letter}
//  ${this.m[2]?.letter}   ${this.m[3]?.letter}   ${this.m[4]?.letter}
//    ${this.m[5]?.letter}   ${this.m[6]?.letter}
//  ${this.m[7]?.letter}   ${this.m[8]?.letter}   ${this.m[9]?.letter}
//    ${this.m[10]?.letter}   ${this.m[11]?.letter}
//  ${this.m[12]?.letter}   ${this.m[13]?.letter}   ${this.m[14]?.letter}
//    ${this.m[15]?.letter}   ${this.m[16]?.letter}\n${this.#buildWordString(word)}\n`;

//         console.log(out);
//     }

// draw() {
//     console.log('start draw');
//     // this.calculateResponce();
//     for (const resp of this.result) {
//         const parsed = resp.split(',');
//         const indexes: number[] = [];
//         for (const d of parsed) indexes.push(Number(d));
//         this.drawSingleResult(indexes);
//     }
//     console.log('end draw');
// }

// new Graph17('пкбсмоакрподмтосд').dive(tree).draw();
