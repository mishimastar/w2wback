// import { writeFileSync } from 'fs';

const alph = [
    'а',
    'б',
    'в',
    'г',
    'д',
    'е',
    'ж',
    'з',
    'и',
    'й',
    'к',
    'л',
    'м',
    'н',
    'о',
    'п',
    'р',
    'с',
    'т',
    'у',
    'ф',
    'х',
    'ц',
    'ч',
    'ш',
    'щ',
    'ъ',
    'ы',
    'ь',
    'э',
    'ю',
    'я'
];

export class Let {
    weight: number;

    constructor(public letter: string) {
        this.weight = 50;
        // this.weight = Math.random() * 100;
    }

    increase(mult: number) {
        this.weight += 1 * mult;
    }

    reduce(mult: number) {
        this.weight -= 1 * mult;
    }
}

export class SelLet {
    weight: number;

    constructor(public letters: Let[], public index: number) {
        this.weight = 50;
    }

    increase(mult: number) {
        this.weight += 1 * mult;
    }

    reduce(mult: number) {
        this.weight -= 1 * mult;
    }

    sort() {
        this.letters.sort((a, b) => {
            if (a.weight > b.weight) return -1;
            if (a.weight < b.weight) return 1;
            return 0;
        });
    }
}

export class Generator {
    #weights: SelLet[];
    #lastOut: number[];
    #lastChangedPos: number;
    #epoch: number;

    tEpoch2Len: number;

    #badResCounter: number;
    #goodResCounter: number;
    k: number;
    m: number;
    kPos: number;
    mPos: number;
    rewardSpeed: number;
    #timeToReduceSpeed: number;
    // #lastChanged: number;

    constructor(public strLen: number, public totalEpoch: number, rewardSpeed: number, public booster: number) {
        this.#weights = [];
        this.#lastOut = [];
        this.#lastChangedPos = 0;
        // this.#lastChanged = 0;
        this.rewardSpeed = rewardSpeed * this.booster;
        this.#timeToReduceSpeed = Math.trunc(totalEpoch / 4);

        this.tEpoch2Len = Math.trunc(totalEpoch / 25);
        this.k = Math.pow(alph.length, 1 / totalEpoch);
        this.kPos = Math.pow(strLen, 1 / totalEpoch);
        this.m = Math.pow(alph.length, -(1 / totalEpoch));
        this.mPos = Math.pow(strLen, -(1 / totalEpoch));
        // console.log('k', this.k, 'kpos', this.kPos, 'm', this.m, 'mpos', this.mPos);
        this.#epoch = 0;
        this.#badResCounter = 0;
        this.#goodResCounter = 0;
        for (let i = 0; i < strLen; i++) {
            this.#lastOut.push(0);
            const buf: Let[] = [];
            for (const letter of alph) buf.push(new Let(letter));

            buf.sort((a, b) => {
                if (a.weight > b.weight) return -1;
                if (a.weight < b.weight) return 1;
                return 0;
            });
            this.#weights.push(new SelLet(buf, i));
        }
        this.#weights.sort((a, b) => {
            if (a.weight > b.weight) return -1;
            if (a.weight < b.weight) return 1;
            return 0;
        });
        // console.log(this.#weights);
    }

    buildString() {
        let out: string[] = [];
        // const dia = Math.pow(this.mPos, this.#epoch) * this.strLen;
        const diaInPos = Math.pow(this.m, this.#epoch) * alph.length;
        // const diaInPos = (alph.length * (this.tEpoch2Len - Math.trunc(this.#epoch / this.strLen))) / this.tEpoch2Len;
        // const diaInPos = -Math.pow(this.k, this.#epoch) + alph.length;
        const dia = -Math.pow(this.kPos, this.#epoch) + this.strLen;
        const index = Math.trunc(Math.random() * dia);
        const indexInPos = Math.trunc(Math.random() * diaInPos);
        this.#lastChangedPos = index;
        // this.#lastChanged = indexInPos;
        // console.log('='.repeat(20), this.lastOut.join(','));
        // console.log('dia', dia, 'diaInPos', diaInPos);
        // console.log(
        //     'changing',
        //     this.#lastChangedPos,
        //     'letter to',
        //     this.#weights[this.#lastChangedPos]!.letters[this.#lastChanged]!.letter
        // );

        for (let i = 0; i < this.#weights.length; i++) {
            const pos = this.#weights[i]!;
            if (i === index) {
                out[pos.index] = pos.letters[indexInPos]!.letter;
                this.#lastOut[pos.index] = indexInPos;
            } else out[pos.index] = pos.letters[this.#lastOut[pos.index]!]!.letter;
            // console.log('lastChanged', this.lastOut.join(','), this.lastChanged, index);
        }
        // if (this.#epoch % 10000 === 0) console.log(Math.trunc(dia), Math.trunc(diaInPos));
        if (this.#epoch >= this.#timeToReduceSpeed) this.rewardSpeed = Math.trunc(this.rewardSpeed / this.booster);
        this.#epoch++;
        return out.join('');
    }

    result(changed: number) {
        if (changed > 0) {
            // console.log('Меня наградили!');
            this.#goodResCounter++;
            const index = this.#lastOut[this.#lastChangedPos]!;
            // this.#weights[this.#lastChangedPos]!.letters[index]!.increase(this.rewardSpeed);
            for (const w of this.#weights) {
                if (w.index !== this.#lastChangedPos) continue;

                w.increase(this.rewardSpeed * changed);
                w.letters[index]!.increase(this.rewardSpeed * changed);
            }

            // this.#weights[this.#lastChangedPos]!.increase(this.rewardSpeed);
        } else {
            // console.log('Мне дали по шее((');
            this.#badResCounter++;
            const index = this.#lastOut[this.#lastChangedPos]!;
            for (const w of this.#weights) {
                if (w.index !== this.#lastChangedPos) continue;

                w.reduce(this.rewardSpeed * Math.abs(changed));
                w.letters[index]!.reduce(this.rewardSpeed * Math.abs(changed));
            }
        }

        for (const l of this.#weights) l.sort();
        this.#weights.sort((a, b) => {
            if (a.weight > b.weight) return -1;
            if (a.weight < b.weight) return 1;
            return 0;
        });
        // this.#epoch++;
        // if (this.#epoch % 1 === 0) {
        //     const out = [];
        //     for (const w of this.#weights) out.push(w.weight);
        //     console.log(out);
        // }

        // console.log(this.#weights);
    }

    stats() {
        console.log('bad:', this.#badResCounter, 'good:', this.#goodResCounter);
    }

    // saveModel() {
    //     let out = '[';
    //     for (const node of this.#weights) {
    //         let buf = '{';
    //         for (const l of node) buf += `"${l.letter}":${l.weight},`;
    //         buf += '},';
    //         out += buf;
    //     }
    //     out += ']';
    //     writeFileSync(`./weights_${this.#weights.length}.json`, out);
    // }
}

// const gen = new Generator(2);

// console.log(gen.buildString());
// console.log(gen.lastOut);
// console.log(gen.result(true));
