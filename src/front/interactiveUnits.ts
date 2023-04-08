import { HEXALPHA } from '../constants/angles';
import type { PrimitiveDrawer } from './primitives';
import type { Dot, Rectangle } from './types';

export interface InteractiveUnit {
    index: number;
    selected: boolean;
    letter: string;
    draw(): void;
    select(): void;
    unselect(): void;
    touchInside(touch: Touch | MouseEvent): boolean;
    hasNeighbour(index: number): boolean;
    addNeighbour(node: InteractiveUnit): void;
}

export class InteractiveButton implements InteractiveUnit {
    #width: number;
    #height: number;
    #rect: Rectangle;
    #letterDot: Dot;

    selected = false;

    constructor(rect: Rectangle, public index: number, public letter: string, ldot: Dot, public drawer: PrimitiveDrawer) {
        this.#width = rect.dr.x - rect.ul.x;
        this.#height = rect.dr.y - rect.ul.y;
        this.#rect = rect;
        this.#letterDot = ldot;
    }

    hasNeighbour(_index: number): boolean {
        throw new Error('Method not implemented.');
    }
    addNeighbour(_node: InteractiveUnit): void {
        throw new Error('Method not implemented.');
    }

    draw() {
        this.drawer.rect(this.#rect.ul, this.#width, this.#height, '#525f94');
        this.drawer.letter(this.letter, this.#letterDot);
    }

    select() {
        this.selected = true;
        this.drawer.rect(this.#rect.ul, this.#width, this.#height, '#ff4721');
        this.drawer.letter(this.letter, this.#letterDot);
    }

    unselect() {
        this.selected = false;
        this.drawer.rect(this.#rect.ul, this.#width, this.#height, '#525f94');
        this.drawer.letter(this.letter, this.#letterDot);
    }

    #dotInside(dot: Dot): boolean {
        if (dot.x > this.#rect.ul.x && dot.x < this.#rect.dr.x && dot.y > this.#rect.ul.y && dot.y < this.#rect.dr.y)
            return true;
        else return false;
    }

    touchInside = (touch: Touch | MouseEvent): boolean => this.#dotInside({ x: touch.pageX, y: touch.pageY });
}

export class InteractiveRect implements InteractiveUnit {
    #width: number;
    #height: number;
    #radius2: number;
    #rect: Rectangle;

    selected = false;

    neighbours = new Map<number, InteractiveRect>();
    #letterDot: Dot;

    constructor(rect: Rectangle, public index: number, public letter: string, ldot: Dot, public drawer: PrimitiveDrawer) {
        this.#rect = rect;
        this.#width = this.#rect.dr.x - this.#rect.ul.x;
        this.#height = this.#rect.dr.y - this.#rect.ul.y;
        this.#radius2 = Math.trunc(Math.trunc(this.#width / 2) ** 2);
        this.#letterDot = ldot;
    }

    draw() {
        this.drawer.rect(this.#rect.ul, this.#width, this.#height, '#525f94');
        this.drawer.letter(this.letter, this.#letterDot);
    }

    select() {
        this.selected = true;
        this.drawer.rect(this.#rect.ul, this.#width, this.#height, '#ff4721');
        this.drawer.letter(this.letter, this.#letterDot);
    }

    unselect() {
        this.selected = false;
        this.drawer.rect(this.#rect.ul, this.#width, this.#height, '#525f94');
        this.drawer.letter(this.letter, this.#letterDot);
    }

    hasNeighbour(index: number) {
        return this.neighbours.has(index);
    }

    addNeighbour(node: InteractiveRect) {
        this.neighbours.set(node.index, node);
    }

    #dotInside = (dot: Dot): boolean =>
        (this.#letterDot.x - dot.x) ** 2 + (this.#letterDot.y - dot.y) ** 2 <= this.#radius2;

    touchInside = (touch: Touch): boolean => this.#dotInside({ x: touch.pageX, y: touch.pageY });
}

export class InteractiveHex implements InteractiveUnit {
    #radius: number;
    #radius2: number;

    selected = false;

    neighbours = new Map<number, InteractiveHex>();
    #letterDot: Dot;

    constructor(public index: number, public letter: string, ldot: Dot, public drawer: PrimitiveDrawer, radius: number) {
        this.#radius = radius;
        this.#radius2 = Math.trunc((this.#radius * Math.sin(HEXALPHA)) ** 2);
        this.#letterDot = ldot;
    }

    draw() {
        this.drawer.hexagon(this.#letterDot, this.#radius, '#525f94');
        this.drawer.letter(this.letter, this.#letterDot);
    }

    select() {
        this.selected = true;
        this.drawer.hexagon(this.#letterDot, this.#radius, '#ff4721');
        this.drawer.letter(this.letter, this.#letterDot);
    }

    unselect() {
        this.selected = false;
        this.drawer.hexagon(this.#letterDot, this.#radius, '#525f94');
        this.drawer.letter(this.letter, this.#letterDot);
    }

    hasNeighbour(index: number) {
        return this.neighbours.has(index);
    }

    addNeighbour(node: InteractiveHex) {
        this.neighbours.set(node.index, node);
    }

    #dotInside = (dot: Dot): boolean =>
        (this.#letterDot.x - dot.x) ** 2 + (this.#letterDot.y - dot.y) ** 2 <= this.#radius2;

    touchInside = (touch: Touch): boolean => this.#dotInside({ x: touch.pageX, y: touch.pageY });
}
