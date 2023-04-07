import { Letters } from './alphabet';
import type { TreeDict } from './tree';

export type Matrix = string[][];
export type FitnessFunction = (matrix: Matrix, tree: TreeDict) => number;

export class Table {
    score: number | undefined;

    #analFunc: FitnessFunction;
    #tree: TreeDict;

    constructor(public matrix: Matrix, fitnessFunction: FitnessFunction, tree: TreeDict) {
        this.#analFunc = fitnessFunction;
        this.#tree = tree;
    }

    getScore(): number {
        if (this.score === undefined) {
            this.score = this.#analFunc(this.matrix, this.#tree);
        }
        return this.score;
    }

    resetScore() {
        this.score = undefined;
    }
}

export class MatrixPopulation {
    mutationProbability = 0.05;
    crossoverProbability = 0.7;
    selectionProbability = 0.8;
    elitismPercentage = 0.1;
    private population: Table[];
    private fitnessFunction: FitnessFunction;

    constructor(
        public populationSize: number,
        public dimension: number,
        fitnessFunction: FitnessFunction,
        public tree: TreeDict
    ) {
        this.fitnessFunction = fitnessFunction;
        this.population = [];

        // генерируем случайную популяцию
        for (let i = 0; i < populationSize; i++) {
            this.population.push(new Table(this.generateRandomMatrix(), fitnessFunction, tree));
        }
        this.population.sort((a, b) => b.getScore() - a.getScore());
    }

    // генерация случайной матрицы
    private generateRandomMatrix(): Matrix {
        // массив букв, которые будут использоваться при генерации матрицы

        const matrix: Matrix = [];

        // заполняем матрицу случайными буквами
        for (let i = 0; i < this.dimension; i++) {
            matrix.push([]);
            for (let j = 0; j < this.dimension; j++) {
                const randomIndex = Math.floor(Math.random() * Letters.length);
                matrix[i]![j] = Letters[randomIndex]!;
            }
        }

        return matrix;
    }

    // генетический оператор селекции
    private selection(): [Table, Table] {
        // выбираем случайные две матрицы из популяции
        const randomIndex1 = Math.floor(Math.random() * this.population.length);
        const randomIndex2 = Math.floor(Math.random() * this.population.length);

        return [this.population[randomIndex1]!, this.population[randomIndex2]!];
    }

    // генетический оператор селекции
    private selectParents(selectionProbability: number, numberOfParents: number): Table[] {
        const parents: Table[] = [];

        for (let i = 0; i < numberOfParents; i++) {
            // выбираем случайные две матрицы из популяции
            const [p1, p2] = this.selection();

            // выбираем матрицу с большим значением функции приспособленности
            if (Math.random() < selectionProbability) {
                parents.push(p1.getScore() > p2.getScore() ? p1 : p2);
            } else {
                parents.push(p1, p2);
            }
        }

        return parents;
    }

    private mutate(offspring: Table[], mutationProbability: number): void {
        for (const table of offspring) {
            for (const row of table.matrix) {
                for (let i = 0; i < row.length; i++) {
                    if (Math.random() < mutationProbability) {
                        const randomIndex = Math.floor(Math.random() * Letters.length);
                        row[i] = Letters[randomIndex]!;
                        table.resetScore();
                    }
                }
            }
        }
    }

    private crossover(parents: Table[], crossoverProbability: number): Table[] {
        const offspring: Table[] = [];

        for (let i = 0; i < parents.length; i += 2) {
            const parent1 = parents[i]!;
            const parent2 = parents[i + 1];
            if (!parent2) {
                offspring.push(parent1);
                return offspring;
            }

            // проверяем вероятность кроссовера
            if (Math.random() < crossoverProbability) {
                const crossoverPoint = Math.floor(Math.random() * parent1.matrix.length);

                // создаем двух потомков
                const offspring1: Matrix = [];
                const offspring2: Matrix = [];

                // копируем первую часть родителя 1 в потомка 1
                for (let j = 0; j < crossoverPoint; j++) {
                    offspring1.push([...parent1.matrix[j]!]);
                }

                // копируем вторую часть родителя 2 в потомка 1
                for (let j = crossoverPoint; j < parent2.matrix.length; j++) {
                    offspring1.push([...parent2.matrix[j]!]);
                }

                // копируем первую часть родителя 2 в потомка 2
                for (let j = 0; j < crossoverPoint; j++) {
                    offspring2.push([...parent2.matrix[j]!]);
                }

                // копируем вторую часть родителя 1 в потомка 2
                for (let j = crossoverPoint; j < parent1.matrix.length; j++) {
                    offspring2.push([...parent1.matrix[j]!]);
                }

                offspring.push(
                    new Table(offspring1, this.fitnessFunction, this.tree),
                    new Table(offspring2, this.fitnessFunction, this.tree)
                );
            } else {
                // если кроссовер не произошел, добавляем родителей в потомков
                offspring.push(parent1, parent2);
            }
        }

        return offspring;
    }

    applyGeneticOperators(): Table[] {
        const elitismCount = Math.floor(this.elitismPercentage * this.populationSize);

        // Выполняем селекцию, кроссовер и мутацию на оставшейся части популяции
        const selectedParents = this.selectParents(this.selectionProbability, this.populationSize - elitismCount);
        const offspring = this.crossover(selectedParents, this.crossoverProbability);
        this.mutate(offspring, this.mutationProbability);

        // Оставляем лучшие особи из предыдущей популяции
        const sortedPopulation = this.population.sort((a, b) => b.getScore() - a.getScore());
        const elite = sortedPopulation.slice(0, elitismCount);

        // Составляем новую популяцию из лучших особей предыдущей популяции и потомков
        const newPopulation = elite.concat(offspring);

        // Заменяем старую популяцию новой и возвращаем её
        this.population = newPopulation;
        return newPopulation;
    }

    getBestMatrixFromPopulation(): Table {
        return this.population[0]!;
    }
}

// const populationSize = 20;
// const mutationProbability = 0.05;
// const crossoverProbability = 0.7;
// const selectionProbability = 0.8;
// const elitismPercentage = 0.1;
// const numberOfElites = Math.floor(elitismPercentage * populationSize);
// const numberOfParents = populationSize - numberOfElites;
// const matrixPopulation = new MatrixPopulation(populationSize, 5, getMatrixFitness);
// let bestMatrix: Matrix | null = null;
// let bestTable = '';
// let bestScore = 0;
// let bestStep = 0;

// for (let i = 0; i < 100; i++) {
//     matrixPopulation.applyGeneticOperators();

//     const [m, score] = matrixPopulation.getBestMatrixFromPopulation();
//     let table = '';
//     for (const r of m) for (const l of r) table += l;
//     if (score > bestScore) {
//         bestScore = score;
//         bestTable = table;
//         bestMatrix = m;
//         bestStep = i;
//     }
//     console.log(i, table, score, 'best:', bestTable, bestScore);
// }

// console.log(bestStep, bestTable, bestScore, bestMatrix);
