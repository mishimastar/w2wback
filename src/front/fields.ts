import type { TreeDict } from '../back/tree';
import { GraphConfigs } from '../constants/graphCfg';
import { HEXALPHA } from '../constants/angles';
import { InteractiveHex, InteractiveRect, InteractiveUnit } from './interactiveUnits';
import type { PrimitiveDrawer } from './primitives';
import type { Dot, EventBus, IntUnitConfig } from './types';

class GameAbstract {
    #ongoingTouches: { identifier: number; pageX: number; pageY: number }[] = [];
    #mouseDown: boolean;
    #eventBus: EventBus;
    protected width: number;
    protected height: number;
    protected stepH!: number;
    protected stepW!: number;
    protected steps!: number;
    protected padH!: number;
    protected padW!: number;

    protected nodes: InteractiveUnit[] = [];
    #selectedNodes: InteractiveUnit[] = [];

    #solved = new Set<string>();
    protected tableStr!: string;
    #padding = 20;
    ul: Dot;

    constructor(public dict: TreeDict, public drawer: PrimitiveDrawer, eb: EventBus, unitcfg: IntUnitConfig) {
        this.#eventBus = eb;
        this.width = unitcfg.width;
        this.height = unitcfg.height;
        this.ul = unitcfg.ul;

        this.#mouseDown = false;
    }

    configure(unitcfg: IntUnitConfig) {
        this.width = unitcfg.width;
        this.height = unitcfg.height;
        this.ul = unitcfg.ul;
        this.#draw();
    }

    #copyTouch = (touch: Touch) => ({ identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY });
    #compareCells = (c1: InteractiveUnit, c2: InteractiveUnit) => c1.index === c2.index;

    #ongoingTouchIndexById = (idToFind: number) => {
        for (let i = 0; i < this.#ongoingTouches.length; i++) {
            const id = this.#ongoingTouches[i]!.identifier;

            if (id === idToFind) return i;
        }
        return -1;
    };

    handleMouseMove = (event: MouseEvent) => {
        if (!this.#mouseDown) return;
        this.#selectCell(event);
    };

    handleMouseStart = (event: MouseEvent) => {
        this.#mouseDown = true;
        this.#selectCell(event);
    };

    handleMouseEnd = (_event: MouseEvent) => {
        this.#mouseDown = false;
        this.#countScore();
        this.#resetCells();
    };

    handleMouseCancel = (_event: MouseEvent) => {
        this.#mouseDown = false;
        this.#countScore();
        this.#resetCells();
    };

    handleStart = (evt: TouchEvent) => {
        evt.preventDefault();
        const touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            this.#ongoingTouches.push(this.#copyTouch(touches[i]!));
            this.#selectCell(touches[i]!);
        }
    };
    handleMove = (evt: TouchEvent) => {
        evt.preventDefault();
        const touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const idx = this.#ongoingTouchIndexById(touches[i]!.identifier);
            if (idx < 0) continue;
            this.#selectCell(touches[i]!);
            this.#ongoingTouches.splice(idx, 1, this.#copyTouch(touches[i]!)); // swap in the new touch record
        }
    };
    handleEnd = (evt: TouchEvent) => {
        evt.preventDefault();
        const touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            let idx = this.#ongoingTouchIndexById(touches[i]!.identifier);
            if (idx < 0) continue;
            this.#ongoingTouches.splice(idx, 1); // remove it; we're done
            this.#countScore();
            this.#resetCells();
        }
    };
    handleCancel = (evt: TouchEvent) => {
        evt.preventDefault();
        const touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            let idx = this.#ongoingTouchIndexById(touches[i]!.identifier);
            this.#ongoingTouches.splice(idx, 1); // remove it; we're done
            this.#countScore();
            this.#resetCells();
        }
    };

    #countScore() {
        let word = '';
        for (const cell of this.#selectedNodes) word += cell.letter;
        console.log('tree', word, this.dict.hasWord(word));
        if (this.dict.hasWord(word) && !this.#solved.has(word)) {
            let s = 0;
            for (let i = 1; i <= this.#selectedNodes.length; i++) s += i;
            this.#solved.add(word);
            this.#eventBus.emit('updateScore', s);
        }
    }

    #touchMeetsCell = (t: Touch | MouseEvent, r: InteractiveUnit) => r.touchInside(t);

    #isNeighbour2Last(node: InteractiveUnit) {
        const last = this.#selectedNodes[this.#selectedNodes.length - 1];
        if (!last) return true;
        return last.hasNeighbour(node.index);
    }

    #selectCell(t: Touch | MouseEvent) {
        for (const node of this.nodes) {
            if (this.#touchMeetsCell(t, node)) {
                if (!this.#isNeighbour2Last(node)) return;
                if (this.#isPrevious(node)) {
                    this.#selectedNodes.pop()!.unselect();
                    this.#eventBus.emit('removeLetter');
                }
                if (node.selected) return;

                node.select();
                this.#eventBus.emit('addLetter', node.letter);

                this.#selectedNodes.push(node);
            }
        }
    }

    #isPrevious(c: InteractiveUnit) {
        if (this.#selectedNodes.length < 2) return false;
        if (this.#compareCells(this.#selectedNodes[this.#selectedNodes.length - 2]!, c)) return true;
        return false;
    }

    #resetCells() {
        console.log('selected', this.#selectedNodes);
        for (const n of this.#selectedNodes) n.unselect();
        this.#eventBus.emit('eraseWord');
        this.#selectedNodes = [];
    }

    calcNodes() {
        //
    }

    #drawNodes() {
        for (const node of this.nodes) node.draw();
    }

    setPadding(padding: number) {
        this.#padding = padding;
    }

    #draw() {
        this.drawer.clearRect(this.ul, this.width, this.height);
        const smallest = Math.min(this.width, this.height);
        this.stepH = Math.trunc(smallest / this.steps);
        this.stepW = Math.trunc(smallest / this.steps);

        this.padH = this.stepH * (this.#padding / 200);
        this.padW = this.stepW * (this.#padding / 200);
        console.log(`${Math.trunc((this.stepH - this.padH * 2) * 0.7)}px Arial`);
        this.drawer.setFont(`${Math.trunc((this.stepH - this.padH * 2) * 0.7)}px Arial`);
        this.calcNodes();
        this.#drawNodes();
    }

    drawGame(table: string, steps: number) {
        this.tableStr = table;
        this.steps = steps;
        this.#draw();
    }
}

export class GameTable extends GameAbstract {
    constructor(public dict: TreeDict, public drawer: PrimitiveDrawer, eb: EventBus, unitcfg: IntUnitConfig) {
        super(dict, drawer, eb, unitcfg);
    }

    calcNodes() {
        this.nodes = [];
        const required = this.steps * this.stepH;
        console.log(required, this.width, this.height);
        const padH = Math.trunc((this.height - required) / 2);
        const padW = Math.trunc((this.width - required) / 2);
        let y0 = padH + this.ul.y;
        let y1 = padH + this.ul.y + this.stepH;
        let letCnt = 0;
        for (let i = 0; i < this.steps; i++) {
            let x0 = padW + this.ul.x;
            let x1 = padW + this.ul.x + this.stepW;
            for (let j = 0; j < this.steps; j++) {
                this.nodes.push(
                    new InteractiveRect(
                        { ul: { x: x0 + this.padW, y: y0 + this.padH }, dr: { x: x1 - this.padW, y: y1 - this.padH } },
                        letCnt,
                        this.tableStr[letCnt]!,
                        { x: Math.trunc((x1 - x0) / 2) + x0, y: Math.trunc((y1 - y0) / 2) + y0 },
                        this.drawer
                    )
                );
                x0 += this.stepW;
                x1 += this.stepW;
                letCnt++;
            }
            y1 += this.stepH;
            y0 += this.stepH;
        }
        console.log('all', this.nodes);
        for (let j = 0; j < this.tableStr.length; j++) {
            const graphConfig = GraphConfigs.get(this.steps ** 2)![j]!;
            for (let i = 0; i < graphConfig.length; i++) {
                if (!graphConfig[i]) continue;
                this.nodes[j]!.addNeighbour(this.nodes[i]!);
            }
        }
    }
}

export class GameHive extends GameAbstract {
    constructor(public dict: TreeDict, public drawer: PrimitiveDrawer, eb: EventBus, unitcfg: IntUnitConfig) {
        super(dict, drawer, eb, unitcfg);
    }

    calcNodes() {
        this.nodes = [];
        const outerRadius = Math.trunc(
            Math.min(this.width / (5 * (Math.cos(HEXALPHA) + 1) + 1), this.height / (5 * Math.sin(HEXALPHA) + 1))
        );
        const required = Math.max(5 * outerRadius * (1 + Math.cos(HEXALPHA)), outerRadius * 8);
        console.log(required, this.width, this.height);
        const padH = Math.trunc((this.height - required) / 2);
        const padW = Math.trunc((this.width - required) / 2);
        console.log(outerRadius);
        console.log(this.tableStr);

        let y = padH + this.ul.y + outerRadius * (Math.sin(HEXALPHA) + 1);
        const order = [2, 0, 3, 1, 4, 7, 5, 8, 6, 9, 12, 10, 13, 11, 14, undefined, 15, undefined, 16, undefined];
        let cnt = 0;
        for (
            let x = outerRadius + this.ul.x + padW, j = 1;
            j < 6;
            x += outerRadius * (1 + Math.cos(HEXALPHA)), y += (-1) ** j++ * outerRadius * Math.sin(HEXALPHA)
        ) {
            this.nodes.push(
                new InteractiveHex(
                    order[cnt]!,
                    this.tableStr[order[cnt]!]!,
                    { x, y },
                    this.drawer,
                    outerRadius * Math.sin(HEXALPHA)
                )
            );
            cnt++;
        }
        y += outerRadius * 3 * Math.sin(HEXALPHA);
        for (
            let x = outerRadius + this.ul.x + padW, j = 1;
            j < 6;
            x += outerRadius * (1 + Math.cos(HEXALPHA)), y += (-1) ** j++ * outerRadius * Math.sin(HEXALPHA)
        ) {
            this.nodes.push(
                new InteractiveHex(
                    order[cnt]!,
                    this.tableStr[order[cnt]!]!,
                    { x, y },
                    this.drawer,
                    outerRadius * Math.sin(HEXALPHA)
                )
            );
            cnt++;
        }
        y += outerRadius * 3 * Math.sin(HEXALPHA);
        for (
            let x = outerRadius + this.ul.x + padW, j = 1;
            j < 6;
            x += outerRadius * (1 + Math.cos(HEXALPHA)), y += (-1) ** j++ * outerRadius * Math.sin(HEXALPHA)
        ) {
            this.nodes.push(
                new InteractiveHex(
                    order[cnt]!,
                    this.tableStr[order[cnt]!]!,
                    { x, y },
                    this.drawer,
                    outerRadius * Math.sin(HEXALPHA)
                )
            );
            cnt++;
        }
        y += outerRadius * 3 * Math.sin(HEXALPHA);
        for (
            let x = outerRadius + this.ul.x + padW, j = 1;
            j < 6;
            x += outerRadius * (1 + Math.cos(HEXALPHA)), y += (-1) ** j++ * outerRadius * Math.sin(HEXALPHA)
        ) {
            if (order[cnt] === undefined) {
                cnt++;
                continue;
            }
            this.nodes.push(
                new InteractiveHex(
                    order[cnt]!,
                    this.tableStr[order[cnt]!]!,
                    { x, y },
                    this.drawer,
                    outerRadius * Math.sin(HEXALPHA)
                )
            );
            cnt++;
        }

        for (const node of this.nodes) {
            const graphConfig = GraphConfigs.get(this.tableStr.length)![node.index]!;
            // console.log(node.index, graphConfig);
            for (const n of this.nodes) {
                // console.log(node.index, graphConfig[node.index]);
                if (graphConfig[n.index] === 1) node.addNeighbour(n);
            }
        }
    }
}
