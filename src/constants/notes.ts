export const Notes = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88];

const calcNote = (index: number) => {
    let out = -1;
    for (let i = 0; i < index; i++) {
        out += 1;
        if (out === 7) out = 0;
    }
    return out;
};

export const GetNote = (i: number): number => {
    console.log(i, calcNote(i), Notes[calcNote(i)]! * 2 ** Math.trunc(i / 8));

    return Notes[calcNote(i)]! * 2 ** Math.trunc(i / 8);
};
