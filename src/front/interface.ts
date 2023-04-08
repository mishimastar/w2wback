import type { TreeDict } from '../back/tree';
import { EventEm } from './ee';
import { GameField, Preview, Stats } from './interfaceUnits';
import type { PrimitiveDrawer } from './primitives';
import type { Dot, EventBus, InterfaceConfig, IntUnitConfig } from './types';

const CalculateUnitConfigs = (width: number, height: number): InterfaceConfig => {
    const previewUL: Dot = { x: 0, y: 0 };
    const pgUL: Dot = { x: 0, y: Math.trunc(height * 0.15) };
    const statsUL: Dot = { x: 0, y: Math.trunc(height * 0.85) };
    const stats: IntUnitConfig = { ul: statsUL, width: width, height: Math.trunc(height * 0.15) };
    const preview: IntUnitConfig = { ul: previewUL, width: width, height: Math.trunc(height * 0.15) };
    const playground: IntUnitConfig = { ul: pgUL, width: width, height: Math.trunc(height * 0.7) };
    return { stats, preview, playground };
};

export class Interface {
    #table: string;
    #dict: TreeDict;
    #eb: EventBus;
    #drawer: PrimitiveDrawer;
    configs: InterfaceConfig;
    playground: GameField;
    preview: Preview;
    stats: Stats;
    #steps: number;

    constructor(table: string, steps: number, dict: TreeDict, drawer: PrimitiveDrawer, width: number, height: number) {
        this.#table = table;
        this.#steps = steps;
        this.#dict = dict;
        this.#eb = new EventEm() as unknown as EventBus;
        this.#drawer = drawer;
        this.configs = CalculateUnitConfigs(width, height);
        console.log(this.configs);
        this.playground = new GameField(this.#table, this.#drawer, this.#dict, this.#eb, this.configs.playground);
        this.preview = new Preview(this.#drawer, this.configs.preview);
        this.stats = new Stats(this.#drawer, this.configs.stats);

        this.#eb.on('updateScore', this.stats.updateScore);
        this.#eb.on('addLetter', this.preview.addLetter);
        this.#eb.on('removeLetter', this.preview.removeLastLetter);
        this.#eb.on('eraseWord', this.preview.erase);
    }

    registerTouchHandlers(htmlc: HTMLCanvasElement) {
        this.playground.registerTouchHandlers(htmlc);
    }

    Start() {
        this.stats.setTotalWords(this.#dict.size);
        this.playground.start(this.#table, this.#steps);
        this.preview.erase();
    }

    onResize = () => {
        this.configs = CalculateUnitConfigs(window.innerWidth, window.innerHeight);

        this.playground.configure(this.configs.playground);
        this.stats.configure(this.configs.stats);
        this.preview.configure(this.configs.preview);
    };

    // configurePreview() {
    //     this.wordH = Math.trunc(this.stepH / 2);
    //     this.wordW = Math.trunc(this.width / 2);
    //     this.preview = new Preview(this.drawer, { x: 0, y: 0 }, this.width, this.stepH);
    // }

    // configureStats() {
    //     if (!this.stats)
    //         this.stats = new Stats(this.drawer, { x: 0, y: this.stepH * (this.steps + 1) }, this.width, this.stepH);
    //     else this.stats.configure({ x: 0, y: this.stepH * (this.steps + 1) }, this.width, this.stepH);
    // }
}
