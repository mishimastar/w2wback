import { TreeDict } from '../back/tree';
import { EventEm } from './ee';
import { Interface } from './interface';
import { Menu } from './menu';
import { PrimitiveDrawer } from './primitives';
import { LoadTable } from './requests';
import type { EventBus } from './types';

export class Game {
    #canvasHTML: HTMLCanvasElement;
    #canvas: CanvasRenderingContext2D;
    #int!: Interface;
    #menu: Menu;
    #drawer: PrimitiveDrawer;
    #eb: EventBus;

    constructor(canvas: HTMLCanvasElement) {
        this.#canvasHTML = canvas;
        this.#canvas = this.#canvasHTML.getContext('2d')!;
        this.#drawer = new PrimitiveDrawer(this.#canvas);
        this.#eb = new EventEm() as unknown as EventBus;
        this.#eb.on('startGame', (size) => {
            this.removeMenuHandlers();
            this.start(size);
        });
        this.#menu = new Menu(this.#canvas, this.#drawer, this.#eb);
    }

    configure(width: number, height: number) {
        this.#canvasHTML.height = height;
        this.#canvasHTML.width = width;
        this.#canvasHTML.style.background = '#2b3043';
        this.#canvas.font = '48px Arial';
        this.#menu.setWH(this.#canvasHTML.width, this.#canvasHTML.height);
    }

    start = async (size: number) => {
        const init = await LoadTable(size);
        console.log(init);

        const tree = new TreeDict(new Set(init.dict));
        console.log(this.#canvasHTML.width, this.#canvasHTML.height);
        this.#int = new Interface(
            init.table,
            size > 6 ? 5 : size,
            tree,
            this.#drawer,
            this.#canvasHTML.width,
            this.#canvasHTML.height
        );

        window.addEventListener('resize', () => {
            this.#canvasHTML.width = window.innerWidth;
            this.#canvasHTML.height = window.innerHeight;
            this.#int.onResize();
        });
        this.#int.registerHandlers(this.#canvasHTML);
        this.#int.Start();
    };

    removeMenuHandlers() {
        this.#canvasHTML.removeEventListener('touchstart', this.#menu.handleStart);
        this.#canvasHTML.removeEventListener('touchend', this.#menu.handleEnd);
        this.#canvasHTML.removeEventListener('touchcancel', this.#menu.handleCancel);
        this.#canvasHTML.removeEventListener('mousedown', this.#menu.handleMouseStart);
        this.#canvasHTML.removeEventListener('mouseup', this.#menu.handleMouseEnd);
        this.#canvasHTML.removeEventListener('mouseleave', this.#menu.handleMouseCancel);
    }

    drawMenu() {
        this.#canvasHTML.addEventListener('touchstart', this.#menu.handleStart);
        this.#canvasHTML.addEventListener('touchend', this.#menu.handleEnd);
        this.#canvasHTML.addEventListener('touchcancel', this.#menu.handleCancel);
        this.#canvasHTML.addEventListener('mousedown', this.#menu.handleMouseStart);
        this.#canvasHTML.addEventListener('mouseup', this.#menu.handleMouseEnd);
        this.#canvasHTML.addEventListener('mouseleave', this.#menu.handleMouseCancel);
        this.#menu.drawMenu();
    }
}
