import type { Matrix } from './genetic';
import { Graph } from './graph';
import { Matrix as Searcher } from './matrix';
import type { TreeDict } from './tree';

export const Fitness = (matrix: Matrix, dict: TreeDict): number => {
    let table = '';
    for (const r of matrix) for (const l of r) table += l;

    return new Searcher(table, matrix.length).dive(dict).studyHowMuchWords();
};

export const FitnessGraph = (matrix: Matrix, dict: TreeDict): number => {
    let table = '';
    for (const r of matrix) for (const l of r) table += l;

    return new Graph(table).dive(dict).studyResult().words.size;
};
