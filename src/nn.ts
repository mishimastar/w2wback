import { writeFileSync } from 'fs';
import { Letters } from './alphabet';

export class Let {
    weight: number;

    constructor(public letter: string) {
        this.weight = 50;
    }

    increase(mult: number) {
        this.weight += 1 * mult;
    }

    reduce(mult: number) {
        this.weight -= 1 * mult;
    }
}

export class Generator {
    weights: Let[][];
    lastOut: number[];
    lastChanged: number;
    epoch: number;

    tEpoch2Len: number;

    badResCounter: number;
    goodResCounter: number;
    k: number;
    m: number;

    constructor(public strLen: number, public totalEpoch: number, public rewardSpeed: number) {
        this.weights = [];
        this.lastOut = [];
        this.lastChanged = 0;
        this.tEpoch2Len = Math.trunc(totalEpoch / 25);
        this.k = Math.pow(Letters.length, 1 / totalEpoch);
        this.m = Math.pow(Letters.length, -(1 / totalEpoch));
        this.epoch = 0;
        this.badResCounter = 0;
        this.goodResCounter = 0;
        for (let i = 0; i < strLen; i++) {
            this.lastOut.push(0);
            const buf: Let[] = [];
            for (const letter of Letters) buf.push(new Let(letter));

            buf.sort((a, b) => {
                if (a.weight > b.weight) return -1;
                if (a.weight < b.weight) return 1;
                return 0;
            });
            this.weights.push(buf);
        }
        // console.log(this.weights);
    }

    buildString() {
        let out = '';
        const dia = Math.pow(this.m, this.epoch) * Letters.length;
        // const dia = -Math.pow(this.k, this.epoch) + alph.length;
        // const dia = (alph.length * (this.tEpoch2Len - Math.trunc(this.epoch / this.strLen))) / this.tEpoch2Len;
        const index = Math.trunc(Math.random() * dia);
        // console.log('='.repeat(20), this.lastOut.join(','));

        for (let i = 0; i < this.weights.length; i++) {
            if (i === this.lastChanged) {
                out += this.weights[i]![index]!.letter;
                this.lastOut[i] = index;
                // console.log('lastChanged', this.lastOut.join(','), this.lastChanged, index);
            } else out += this.weights[i]![this.lastOut[i]!]!.letter;
        }
        this.lastChanged = this.lastChanged + 1 < this.weights.length ? this.lastChanged + 1 : 0;
        return out;
    }

    result(good: boolean) {
        if (good) {
            // console.log('Меня наградили!');
            this.goodResCounter++;
            const index = this.lastOut[this.lastChanged]!;
            this.weights[this.lastChanged]![index]!.increase(this.rewardSpeed);
        } else {
            // console.log('Мне дали по шее((');
            this.badResCounter++;
            const index = this.lastOut[this.lastChanged]!;
            this.weights[this.lastChanged]![index]!.increase(this.rewardSpeed);
        }
        for (const l of this.weights)
            l.sort((a, b) => {
                if (a.weight > b.weight) return -1;
                if (a.weight < b.weight) return 1;
                return 0;
            });
        this.epoch++;
        // console.log(this.weights);
    }

    stats() {
        console.log('bad:', this.badResCounter, 'good:', this.goodResCounter);
    }

    saveModel() {
        let out = '[';
        for (const node of this.weights) {
            let buf = '{';
            for (const l of node) buf += `"${l.letter}":${l.weight},`;
            buf += '},';
            out += buf;
        }
        out += ']';
        writeFileSync(`./weights_${this.weights.length}.json`, out);
    }
}

// const gen = new Generator(2);

// console.log(gen.buildString());
// console.log(gen.lastOut);
// console.log(gen.result(true));
