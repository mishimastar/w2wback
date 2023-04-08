import { InteractiveButton } from './interactiveUnits';
import type { PrimitiveDrawer } from './primitives';
import type { EventBus } from './types';

export class Menu {
    ongoingTouches: { identifier: number; pageX: number; pageY: number }[] = [];
    width!: number;
    height!: number;
    buttons = ['Играть 4х4', 'Играть 5x5', 'Играть 6х6', 'Улей 17'];
    stepH = 0;
    rectangles: InteractiveButton[] = [];
    #drawer: PrimitiveDrawer;
    #eb: EventBus;

    constructor(public canvas2D: CanvasRenderingContext2D, drawer: PrimitiveDrawer, eb: EventBus) {
        this.#drawer = drawer;
        this.#eb = eb;
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
                        this.#eb.emit('startGame', 4);
                        break;
                    case 'Играть 5x5':
                        this.#loading();
                        this.#eb.emit('startGame', 5);

                        break;
                    case 'Играть 6х6':
                        this.#loading();
                        this.#eb.emit('startGame', 6);
                        break;

                    case 'Улей 17':
                        this.#loading();
                        this.#eb.emit('startGame', 17);
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
        this.canvas2D.clearRect(0, 0, this.width, this.height);
        this.canvas2D.fillText('Генерирую!', Math.trunc(this.width / 2), Math.trunc(this.height / 2));
    }

    #menu() {
        this.rectangles = [];
        let y0 = Math.trunc(this.stepH * 0.6);
        let y1 = Math.trunc(this.stepH * 1.4);
        const x0 = Math.trunc(this.width * 0.05);
        const x1 = Math.trunc(this.width * 0.95);
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

        this.canvas2D.font = `${Math.trunc(stepH * 0.45)}px Arial`;

        this.#menu();
    }
}
