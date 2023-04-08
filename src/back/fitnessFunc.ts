import type { Matrix } from './genetic';
import { Graph } from './graph';
import { Matrix as Searcher } from './matrix';
import type { TreeDict } from './tree';

export const Fitness = (matrix: Matrix, dict: TreeDict): { words: number; score: number; reason: number } => {
    let table = '';
    for (const r of matrix) for (const l of r) table += l;

    const words = new Searcher(table, matrix.length).dive(dict).studyHowMuchWords();

    return { words, score: 0, reason: 0 };
};

export const FitnessGraph = (matrix: Matrix, dict: TreeDict): { words: number; score: number; reason: number } => {
    let table = '';
    for (const r of matrix) for (const l of r) table += l;
    const { words, score, reason } = new Graph(table).dive(dict).studyResult();
    // console.log(words.size, score);
    return { score, words: words.size, reason };
};
