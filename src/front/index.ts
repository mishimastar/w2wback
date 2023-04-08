import { TreeDict } from '../back/tree';
import { InteractiveButton } from './interactiveUnits';
import { Interface } from './interface';
import { PrimitiveDrawer } from './primitives';

class Menu {
    ongoingTouches: { identifier: number; pageX: number; pageY: number }[] = [];
    width!: number;
    height!: number;
    buttons = ['Играть 4х4', 'Играть 5x5', 'Играть 6х6', 'Улей 17'];
    stepH = 0;
    rectangles: InteractiveButton[] = [];
    #drawer: PrimitiveDrawer;

    constructor(public canvas2D: CanvasRenderingContext2D, public game: Game, drawer: PrimitiveDrawer) {
        this.#drawer = drawer;
    }

    #copyTouch = (touch: Touch) => ({ identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY });

    ongoingTouchIndexById = (idToFind: number) => {
        for (let i = 0; i < this.ongoingTouches.length; i++) {
            const id = this.ongoingTouches[i]!.identifier;

            if (id === idToFind) return i;
        }
        return -1;
    };

    handleStart = (evt: TouchEvent) => {
        evt.preventDefault();
        const touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            this.ongoingTouches.push(this.#copyTouch(touches[i]!));
            this.selectButton(touches[i]!);
        }
    };

    handleEnd = async (evt: TouchEvent) => {
        evt.preventDefault();
        const touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            let idx = this.ongoingTouchIndexById(touches[i]!.identifier);
            if (idx < 0) continue;
            this.ongoingTouches.splice(idx, 1); // remove it; we're done
            await this.checkConfirmation(touches[i]!);
        }
    };
    handleCancel = async (evt: TouchEvent) => {
        evt.preventDefault();
        const touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            let idx = this.ongoingTouchIndexById(touches[i]!.identifier);
            this.ongoingTouches.splice(idx, 1); // remove it; we're done
            await this.checkConfirmation(touches[i]!);
        }
    };

    resetButtons() {
        for (const n of this.rectangles) n.unselect();
    }

    async checkConfirmation(t: Touch) {
        for (const b of this.rectangles) {
            if (!this.touchMeetsButton(t, b)) continue;
            if (b.selected) {
                this.resetButtons();
                console.log('selected', b.letter);
                switch (b.letter) {
                    case 'Играть 4х4':
                        this.#loading();
                        await this.game.start(4);
                        break;
                    case 'Играть 5x5':
                        this.#loading();
                        await this.game.start(5);
                        break;
                    case 'Играть 6х6':
                        this.#loading();
                        await this.game.start(6);
                        break;

                    case 'Улей 17':
                        this.#loading();
                        await this.game.start(17);
                        break;

                    default:
                        break;
                }
                return;
            }
        }
        this.resetButtons();
    }

    touchMeetsButton = (t: Touch, r: InteractiveButton) => r.touchInside(t);

    selectButton(t: Touch) {
        for (const b of this.rectangles) {
            if (!this.touchMeetsButton(t, b)) continue;
            if (b.selected) return;
            b.select();
        }
    }

    setWH(w: number, h: number) {
        this.width = w;
        this.height = h;
    }

    #loading() {
        this.game.removeMenuHandlers();
        this.canvas2D.clearRect(0, 0, this.width, this.height);
        this.canvas2D.fillText('Генерирую!', Math.trunc(this.width / 2), Math.trunc(this.height / 2));
    }

    #menu() {
        this.rectangles = [];
        let y0 = this.stepH - 100;
        let y1 = this.stepH + 100;
        const x0 = Math.trunc(this.width * 0.2);
        const x1 = Math.trunc(this.width * 0.8);
        let mult = 0;
        for (const but of this.buttons) {
            this.rectangles.push(
                new InteractiveButton(
                    { ul: { x: x0, y: y0 + this.stepH * mult }, dr: { x: x1, y: y1 + this.stepH * mult } },
                    mult,
                    but,
                    { x: Math.trunc((x1 - x0) / 2) + x0, y: Math.trunc((y1 - y0) / 2) + y0 + this.stepH * mult },
                    this.#drawer
                )
            );
            mult++;
        }

        console.log('all', this.rectangles);
        for (const c of this.rectangles) c.draw();
    }

    drawMenu() {
        this.canvas2D.clearRect(0, 0, this.width, this.height);
        const stepH = Math.trunc(this.height / (this.buttons.length + 1));
        this.stepH = stepH;

        this.#menu();
    }
}

class Game {
    #canvasHTML: HTMLCanvasElement;
    #canvas: CanvasRenderingContext2D;
    #int!: Interface;
    // #dict!: TreeDict;
    #menu: Menu;
    #drawer: PrimitiveDrawer;
    // #padding = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.#canvasHTML = canvas;
        this.#canvas = this.#canvasHTML.getContext('2d')!;
        this.#drawer = new PrimitiveDrawer(this.#canvas);
        this.#menu = new Menu(this.#canvas, this, this.#drawer);
    }

    configure(width: number, height: number, font: string) {
        this.#canvasHTML.height = height;
        this.#canvasHTML.width = width;
        this.#canvasHTML.style.background = '#2b3043';
        this.#canvas.font = font;
        this.#menu.setWH(this.#canvasHTML.width, this.#canvasHTML.height);
        // this.#padding = padding;
    }

    async start(size: number) {
        const init = await LoadTable(size);
        console.log(init);

        // if (size <= 6) this.#canvasHTML.height = Math.trunc(this.#canvasHTML.height * (1 / size) * (size + 2));
        // else this.#canvasHTML.height = Math.trunc(this.#canvasHTML.width * 1.4);

        const tree = new TreeDict(new Set(init.dict));
        // this.#dict = tree;
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
        this.#int.registerTouchHandlers(this.#canvasHTML);
        this.#int.Start();
    }

    removeMenuHandlers() {
        this.#canvasHTML.removeEventListener('touchstart', this.#menu.handleStart);
        this.#canvasHTML.removeEventListener('touchend', this.#menu.handleEnd);
        this.#canvasHTML.removeEventListener('touchcancel', this.#menu.handleCancel);
    }

    drawMenu() {
        this.#canvasHTML.addEventListener('touchstart', this.#menu.handleStart);
        this.#canvasHTML.addEventListener('touchend', this.#menu.handleEnd);
        this.#canvasHTML.addEventListener('touchcancel', this.#menu.handleCancel);
        this.#menu.drawMenu();
    }
}

const LoadTable = async (size: number) => {
    const resp = await fetch('/gettable', { headers: { size: String(size) } });
    const out = await resp.json();
    return out as { table: string; dict: string[]; size: number };
};

async function startup() {
    const el = document.getElementById('canvas') as HTMLCanvasElement;
    if (!el) throw new Error('no canvas found!');

    const game = new Game(el);

    game.configure(window.innerWidth, window.innerHeight, '48px Arial');
    game.drawMenu();

    // game.start(init.table, 5);
}

document.addEventListener('DOMContentLoaded', startup);
