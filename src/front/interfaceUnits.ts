import type { TreeDict } from '../back/tree';
import { GameHive, GameTable } from './fields';
import type { PrimitiveDrawer } from './primitives';
import type { Dot, EventBus, IntUnitConfig } from './types';

export class Preview {
    word = '';

    #width: number;
    #height: number;
    #drawer: PrimitiveDrawer;
    #ul: Dot;
    #center: Dot;

    constructor(drawer: PrimitiveDrawer, unitcfg: IntUnitConfig) {
        this.#ul = unitcfg.ul;
        this.#width = unitcfg.width;
        this.#height = unitcfg.height;
        this.#center = { x: Math.trunc(this.#ul.x + this.#width / 2), y: Math.trunc(this.#ul.y + this.#height / 2) };
        this.#drawer = drawer;
    }

    #clear() {
        this.#drawer.clearRect(this.#ul, this.#width, this.#height);
    }

    #draw() {
        this.#clear();
        this.#drawer.letter(this.word, this.#center);
    }

    addLetter = (letter: string) => {
        this.word += letter;
        this.#draw();
    };

    removeLastLetter = () => {
        this.word = this.word.slice(0, this.word.length - 1);
        this.#draw();
    };

    erase = () => {
        this.word = '';
        this.#draw();
    };

    configure(unitcfg: IntUnitConfig) {
        this.#ul = unitcfg.ul;
        this.#width = unitcfg.width;
        this.#height = unitcfg.height;
        this.#center = { x: Math.trunc(this.#ul.x + this.#width / 2), y: Math.trunc(this.#ul.y + this.#height / 2) };
        this.#draw();
    }
}

export class Stats {
    #stats = '';

    #width: number;
    #height: number;
    #score = 0;
    #totalWords = 0;
    #solvedWords = 0;
    #ul: Dot;
    #center: Dot;
    #drawer: PrimitiveDrawer;

    constructor(drawer: PrimitiveDrawer, unitcfg: IntUnitConfig) {
        this.#ul = unitcfg.ul;
        this.#width = unitcfg.width;
        this.#height = unitcfg.height;
        this.#center = { x: Math.trunc(this.#ul.x + this.#width / 2), y: Math.trunc(this.#ul.y + this.#height / 2) };
        this.#drawer = drawer;
    }

    #clear() {
        this.#drawer.clearRect(this.#ul, this.#width, this.#height);
    }

    #draw() {
        this.#clear();
        this.#stats = `${this.#score}    ${this.#solvedWords} / ${this.#totalWords}`;
        this.#drawer.letter(this.#stats, this.#center);
    }

    updateScore = (incr: number) => {
        this.#score += incr;
        this.#solvedWords++;
        this.#draw();
    };

    setTotalWords(total: number) {
        this.#totalWords = total;
        this.#draw();
    }

    configure(unitcfg: IntUnitConfig) {
        this.#ul = unitcfg.ul;
        this.#width = unitcfg.width;
        this.#height = unitcfg.height;
        this.#center = { x: Math.trunc(this.#ul.x + this.#width / 2), y: Math.trunc(this.#ul.y + this.#height / 2) };
        this.#draw();
    }
}

export class GameField {
    game: GameTable | GameHive;
    // #drawer: PrimitiveDrawer;

    #unitcfg: IntUnitConfig;

    constructor(table: string, drawer: PrimitiveDrawer, tree: TreeDict, eb: EventBus, unitcfg: IntUnitConfig) {
        // this.#drawer = drawer;
        this.#unitcfg = unitcfg;
        if ([16, 25, 36].includes(table.length)) this.game = new GameTable(tree, drawer, eb, unitcfg);
        else this.game = new GameHive(tree, drawer, eb, unitcfg);
    }

    configure(unitcfg: IntUnitConfig) {
        this.#unitcfg = unitcfg;
        this.game.configure(this.#unitcfg);
    }

    start(table: string, steps: number) {
        this.game.drawGame(table, steps);
    }

    registerTouchHandlers(htmlc: HTMLCanvasElement) {
        htmlc.addEventListener('touchstart', this.game.handleStart);
        htmlc.addEventListener('touchend', this.game.handleEnd);
        htmlc.addEventListener('touchcancel', this.game.handleCancel);
        htmlc.addEventListener('touchmove', this.game.handleMove);
    }

    registerMouseHandlers(htmlc: HTMLCanvasElement) {
        htmlc.addEventListener('mousedown', this.game.handleMouseStart);
        htmlc.addEventListener('mouseup', this.game.handleMouseEnd);
        htmlc.addEventListener('mouseleave', this.game.handleMouseCancel);
        htmlc.addEventListener('mousemove', this.game.handleMouseMove);
    }
}
