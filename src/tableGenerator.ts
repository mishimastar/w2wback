import { Generator } from './nn2';
import { Matrix as Searcher } from './matrix';
import type { TreeDict } from './tree';
import { MatrixPopulation } from './genetic';
import { Fitness, FitnessGraph } from './fitnessFunc';
import { Graph } from './graph';

const cfgs = new Map<number, { enough: number; epoch: number }>([
    [4, { enough: 140, epoch: 200000 }],
    [5, { enough: 180, epoch: 100000 }],
    [17, { enough: 100, epoch: 100000 }],
    [6, { enough: 250, epoch: 120000 }]
]);

export class TableGenerators {
    constructor(public tree: TreeDict) {}

    nn2 = (size: number) => {
        const cfg = cfgs.get(size)!;
        const steps = cfg.epoch;
        const s06 = Math.trunc((steps * 2) / 3);
        const enough = cfg.enough;
        const enough08 = Math.trunc(cfg.enough * 0.8);

        const Gen = new Generator(size ** 2, steps, 1, 3);

        let maxWords = 0;
        let bestTable = '';
        let bestStep = 0;

        const results: number[] = [];

        // console.log('enough', enough, '80%', enough08);
        // console.log('steps', steps, '66%', s06);
        let previousWords = 0;
        for (let i = 0; i < steps; i++) {
            const table = Gen.buildString();
            const matrix = new Searcher(table, size);
            matrix.dive(this.tree);
            const words = matrix.studyHowMuchWords();
            results.push(words);
            if (words > maxWords) {
                maxWords = words;
                bestTable = table;
                bestStep = i;
            }
            if (maxWords >= enough || (i >= s06 && maxWords >= enough08)) {
                console.log('ITERRUPT', table, 'words:', words, 'bestTable:', bestTable, 'maxWords:', maxWords, 'STEP:', i);
                return bestTable;
            }
            if (words > previousWords) Gen.result(2);
            if (words < previousWords) Gen.result(-1.5);
            previousWords = words;
        }

        console.log('RESULT     maxWords:', maxWords, 'bestTable:', bestTable, 'STEPS:', steps, 'best step:', bestStep);
        Gen.stats();
        return bestTable;
    };

    genetic = (size: number, population: number = 16) => {
        const cfg = cfgs.get(size)!;
        const steps = 200;
        const s06 = Math.trunc((steps * 2) / 3);
        const enough = cfg.enough;
        const enough08 = Math.trunc(cfg.enough * 0.8);

        const Gen = new MatrixPopulation(population, size, Fitness, this.tree);

        let maxWords = 0;
        let bestTable = '';
        let bestStep = 0;

        const results: number[] = [];

        for (let i = 0; i < steps; i++) {
            Gen.applyGeneticOperators();

            const t = Gen.getBestMatrixFromPopulation();
            const score = t.getScore();
            const m = t.matrix;
            let table = '';
            for (const r of m) for (const l of r) table += l;
            if (score > maxWords) {
                maxWords = score;
                bestTable = table;
                bestStep = i;
            }

            results.push(score);
            if (score > maxWords) {
                maxWords = score;
                bestTable = table;
                bestStep = i;
            }
            if (maxWords >= enough || (i >= s06 && maxWords >= enough08)) {
                console.log('ITERRUPT', table, 'words:', score, 'bestTable:', bestTable, 'maxWords:', maxWords, 'STEP:', i);
                return bestTable;
            }
        }

        console.log('RESULT   maxWords:', maxWords, 'bestTable:', bestTable, 'STEPS:', steps, 'best step:', bestStep);
        return bestTable;
    };

    geneticGraph = (size: number, population: number = 16) => {
        const cfg = cfgs.get(size)!;
        const steps = 200;
        const s06 = Math.trunc((steps * 2) / 3);
        const enough = cfg.enough;
        const enough08 = Math.trunc(cfg.enough * 0.8);

        const Gen = new MatrixPopulation(population, size, FitnessGraph, this.tree);

        let maxWords = 0;
        let bestTable = '';
        let bestStep = 0;

        const results: number[] = [];

        for (let i = 0; i < steps; i++) {
            Gen.applyGeneticOperators();

            const t = Gen.getBestMatrixFromPopulation();
            const score = t.getScore();
            const m = t.matrix;
            let table = '';
            for (const r of m) for (const l of r) table += l;
            if (score > maxWords) {
                maxWords = score;
                bestTable = table;
                bestStep = i;
            }

            results.push(score);
            if (score > maxWords) {
                maxWords = score;
                bestTable = table;
                bestStep = i;
            }
            if (maxWords >= enough || (i >= s06 && maxWords >= enough08)) {
                console.log('ITERRUPT', table, 'words:', score, 'bestTable:', bestTable, 'maxWords:', maxWords, 'STEP:', i);
                return bestTable;
            }
        }

        console.log('RESULT   maxWords:', maxWords, 'bestTable:', bestTable, 'STEPS:', steps, 'best step:', bestStep);
        return bestTable;
    };

    nn2Graph = (size: number) => {
        const cfg = cfgs.get(size)!;
        const steps = cfg.epoch;
        const s06 = Math.trunc((steps * 2) / 3);
        const enough = cfg.enough;
        const enough08 = Math.trunc(cfg.enough * 0.8);

        const Gen = new Generator(size, steps, 1, 3);

        let maxWords = 0;
        let bestTable = '';
        let bestStep = 0;

        const results: number[] = [];

        let previousWords = 0;
        for (let i = 0; i <= steps; i++) {
            const table = Gen.buildString();
            const graph = new Graph(table);
            graph.dive(this.tree);
            const words = graph.studyResult().words.size;
            results.push(words);
            if (words > maxWords) {
                maxWords = words;
                bestTable = table;
                bestStep = i;
            }
            if (maxWords >= enough || (i >= s06 && maxWords >= enough08)) {
                console.log('ITERRUPT', table, 'words:', words, 'bestTable:', bestTable, 'maxWords:', maxWords, 'STEP:', i);
                return bestTable;
            }
            if (words > previousWords) Gen.result(1);
            if (words < previousWords) Gen.result(-1);
            previousWords = words;
        }

        console.log('RESULT     maxWords:', maxWords, 'bestTable:', bestTable, 'STEPS:', steps, 'best step:', bestStep);
        Gen.stats();
        return bestTable;
    };
}
