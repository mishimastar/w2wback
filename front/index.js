// import { rawDictionary } from './dict.js';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LetterNode_instances, _LetterNode_end, _LetterNode_daughters, _LetterNode_markAsLast, _Tree_Tree, _Preview_instances, _Preview_x, _Preview_y, _Preview_width, _Preview_height, _Preview_draw, _Stats_instances, _Stats_x, _Stats_y, _Stats_width, _Stats_height, _Stats_score, _Stats_totalWords, _Stats_solvedWords, _Stats_clear, _Stats_draw, _Touches_instances, _Touches_tableStr, _Touches_table, _Game_canvasHTML, _Game_canvas, _Game_touch, _Game_dict;
// function readTextFile(file: string) {
//     fetch(file)
//         .then((response) => response.text())
//         .then((text) => console.log(text));
// }
// readTextFile('file:///home/mishimastar/Documents/w2wsolver/dictionary.txt');
export class LetterNode {
    constructor(letter, last) {
        _LetterNode_instances.add(this);
        _LetterNode_end.set(this, void 0);
        _LetterNode_daughters.set(this, new Map());
        this.letter = letter;
        __classPrivateFieldSet(this, _LetterNode_end, last, "f");
    }
    info() {
        console.log(this.letter, __classPrivateFieldGet(this, _LetterNode_end, "f"));
    }
    addDaughter(letter, last) {
        var _a;
        if (__classPrivateFieldGet(this, _LetterNode_daughters, "f").has(letter)) {
            if (last)
                __classPrivateFieldGet((_a = __classPrivateFieldGet(this, _LetterNode_daughters, "f").get(letter)), _LetterNode_instances, "m", _LetterNode_markAsLast).call(_a);
        }
        else {
            __classPrivateFieldGet(this, _LetterNode_daughters, "f").set(letter, new LetterNode(letter, last));
        }
        return __classPrivateFieldGet(this, _LetterNode_daughters, "f").get(letter);
    }
    isLast() {
        return __classPrivateFieldGet(this, _LetterNode_end, "f");
    }
    getDaughter(letter) {
        return __classPrivateFieldGet(this, _LetterNode_daughters, "f").get(letter);
    }
    getAsObject() {
        const d = [];
        for (const dau of __classPrivateFieldGet(this, _LetterNode_daughters, "f").values())
            d.push(dau.getAsObject());
        return { l: this.letter, end: __classPrivateFieldGet(this, _LetterNode_end, "f"), d };
    }
}
_LetterNode_end = new WeakMap(), _LetterNode_daughters = new WeakMap(), _LetterNode_instances = new WeakSet(), _LetterNode_markAsLast = function _LetterNode_markAsLast() {
    __classPrivateFieldSet(this, _LetterNode_end, true, "f");
};
export class Tree {
    constructor(dictionary) {
        this.dictionary = dictionary;
        _Tree_Tree.set(this, new Map());
        const firstSymbols = new Set();
        for (const word of dictionary)
            firstSymbols.add(word[0]);
        for (const s of firstSymbols)
            __classPrivateFieldGet(this, _Tree_Tree, "f").set(s, new LetterNode(s, false));
        for (const word of dictionary) {
            // if (!word.startsWith('а')) continue;
            const lastIndex = word.length - 1;
            let pointer = __classPrivateFieldGet(this, _Tree_Tree, "f").get(word[0]);
            for (let i = 1; i < word.length; i++) {
                pointer = pointer.addDaughter(word[i], i === lastIndex);
            }
        }
    }
    hasWord(word) {
        if (word.length === 0)
            return false;
        let pointer = __classPrivateFieldGet(this, _Tree_Tree, "f").get(word[0]);
        if (!pointer)
            return false;
        const lastIndex = word.length - 1;
        for (let i = 1; i < word.length; i++) {
            pointer = pointer.getDaughter(word[i]);
            if (!pointer)
                return false;
            if (i === lastIndex)
                return pointer.isLast();
        }
        return false;
    }
    getDaughter(letter) {
        return __classPrivateFieldGet(this, _Tree_Tree, "f").get(letter);
    }
    getAsObject() {
        const daughters = [];
        // for (const d of this.#Tree.values()) {
        // }
        const d = __classPrivateFieldGet(this, _Tree_Tree, "f").get('а');
        daughters.push(d.getAsObject());
        return daughters;
    }
}
_Tree_Tree = new WeakMap();
const drawRect = (x0, y0, w, h, color, c) => {
    c.beginPath();
    c.rect(x0, y0, w, h);
    c.fillStyle = color;
    c.fill();
};
const drawLetter = (letter, lx, ly, c) => {
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillStyle = '#fcfefa';
    c.fillText(letter, lx, ly);
};
class Preview {
    constructor(xw, yw, c, x, y, width, height) {
        this.xw = xw;
        this.yw = yw;
        this.c = c;
        _Preview_instances.add(this);
        this.word = '';
        _Preview_x.set(this, void 0);
        _Preview_y.set(this, void 0);
        _Preview_width.set(this, void 0);
        _Preview_height.set(this, void 0);
        __classPrivateFieldSet(this, _Preview_x, x, "f");
        __classPrivateFieldSet(this, _Preview_y, y, "f");
        __classPrivateFieldSet(this, _Preview_width, width, "f");
        __classPrivateFieldSet(this, _Preview_height, height, "f");
    }
    clear() {
        this.c.clearRect(__classPrivateFieldGet(this, _Preview_x, "f"), __classPrivateFieldGet(this, _Preview_y, "f"), __classPrivateFieldGet(this, _Preview_width, "f"), __classPrivateFieldGet(this, _Preview_height, "f"));
    }
    addLetter(letter) {
        this.word += letter;
        __classPrivateFieldGet(this, _Preview_instances, "m", _Preview_draw).call(this);
    }
    removeLastLetter() {
        this.word = this.word.slice(0, this.word.length - 1);
        __classPrivateFieldGet(this, _Preview_instances, "m", _Preview_draw).call(this);
    }
    erase() {
        this.word = '';
        __classPrivateFieldGet(this, _Preview_instances, "m", _Preview_draw).call(this);
    }
}
_Preview_x = new WeakMap(), _Preview_y = new WeakMap(), _Preview_width = new WeakMap(), _Preview_height = new WeakMap(), _Preview_instances = new WeakSet(), _Preview_draw = function _Preview_draw() {
    this.clear();
    drawLetter(this.word, this.xw, this.yw, this.c);
};
class Stats {
    constructor(xw, yw, c, x, y, width, height) {
        this.xw = xw;
        this.yw = yw;
        this.c = c;
        _Stats_instances.add(this);
        this.word = '';
        _Stats_x.set(this, void 0);
        _Stats_y.set(this, void 0);
        _Stats_width.set(this, void 0);
        _Stats_height.set(this, void 0);
        _Stats_score.set(this, 0);
        _Stats_totalWords.set(this, 0);
        _Stats_solvedWords.set(this, 0);
        __classPrivateFieldSet(this, _Stats_x, x, "f");
        __classPrivateFieldSet(this, _Stats_y, y, "f");
        __classPrivateFieldSet(this, _Stats_width, width, "f");
        __classPrivateFieldSet(this, _Stats_height, height, "f");
    }
    updateScore(incr) {
        var _a;
        __classPrivateFieldSet(this, _Stats_score, __classPrivateFieldGet(this, _Stats_score, "f") + incr, "f");
        __classPrivateFieldSet(this, _Stats_solvedWords, (_a = __classPrivateFieldGet(this, _Stats_solvedWords, "f"), _a++, _a), "f");
        __classPrivateFieldGet(this, _Stats_instances, "m", _Stats_draw).call(this);
    }
    setTotalWords(total) {
        __classPrivateFieldSet(this, _Stats_totalWords, total, "f");
        __classPrivateFieldGet(this, _Stats_instances, "m", _Stats_draw).call(this);
    }
}
_Stats_x = new WeakMap(), _Stats_y = new WeakMap(), _Stats_width = new WeakMap(), _Stats_height = new WeakMap(), _Stats_score = new WeakMap(), _Stats_totalWords = new WeakMap(), _Stats_solvedWords = new WeakMap(), _Stats_instances = new WeakSet(), _Stats_clear = function _Stats_clear() {
    this.c.clearRect(__classPrivateFieldGet(this, _Stats_x, "f"), __classPrivateFieldGet(this, _Stats_y, "f"), __classPrivateFieldGet(this, _Stats_width, "f"), __classPrivateFieldGet(this, _Stats_height, "f"));
}, _Stats_draw = function _Stats_draw() {
    __classPrivateFieldGet(this, _Stats_instances, "m", _Stats_clear).call(this);
    this.word = `${__classPrivateFieldGet(this, _Stats_score, "f")}    ${__classPrivateFieldGet(this, _Stats_solvedWords, "f")} / ${__classPrivateFieldGet(this, _Stats_totalWords, "f")}`;
    drawLetter(this.word, this.xw, this.yw, this.c);
};
class Node {
    constructor(x0, y0, x1, y1, letter, lx, ly, canvas) {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.letter = letter;
        this.lx = lx;
        this.ly = ly;
        this.canvas = canvas;
        this.selected = false;
        this.width = x1 - x0;
        this.height = y1 - y0;
    }
    draw() {
        drawRect(this.x0, this.y0, this.width, this.height, '#525f94', this.canvas);
        drawLetter(this.letter, this.lx, this.ly, this.canvas);
    }
    select() {
        this.selected = true;
        drawRect(this.x0, this.y0, this.width, this.height, '#ff4721', this.canvas);
        drawLetter(this.letter, this.lx, this.ly, this.canvas);
    }
    unselect() {
        this.selected = false;
        drawRect(this.x0, this.y0, this.width, this.height, '#525f94', this.canvas);
        drawLetter(this.letter, this.lx, this.ly, this.canvas);
    }
}
class Touches {
    constructor(canvas2D, dict) {
        this.canvas2D = canvas2D;
        this.dict = dict;
        _Touches_instances.add(this);
        this.ongoingTouches = [];
        this.rectangles = [];
        this.selectedRectangles = [];
        this.solved = new Set();
        _Touches_tableStr.set(this, void 0);
        this.padding = 0;
        this.wordH = 0;
        this.wordW = 0;
        this.statsW = 0;
        this.statsH = 0;
        this.copyTouch = (touch) => ({ identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY });
        this.compareCells = (c1, c2) => c1.x0 === c2.x0 && c1.x1 === c2.x1 && c1.y0 === c2.y0 && c1.y1 === c2.y1;
        this.ongoingTouchIndexById = (idToFind) => {
            for (let i = 0; i < this.ongoingTouches.length; i++) {
                const id = this.ongoingTouches[i].identifier;
                if (id === idToFind)
                    return i;
            }
            return -1;
        };
        this.handleStart = (evt) => {
            evt.preventDefault();
            // this.log('touchstart.');
            const touches = evt.changedTouches;
            // console.log('start touches len', touches.length);
            for (let i = 0; i < touches.length; i++) {
                // this.log(`touchstart: ${i}.`);
                this.ongoingTouches.push(this.copyTouch(touches[i]));
                this.selectRect(touches[i]);
            }
        };
        this.handleMove = (evt) => {
            evt.preventDefault();
            const touches = evt.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                const idx = this.ongoingTouchIndexById(touches[i].identifier);
                if (idx >= 0) {
                    this.selectRect(touches[i]);
                    this.ongoingTouches.splice(idx, 1, this.copyTouch(touches[i])); // swap in the new touch record
                }
            }
        };
        this.handleEnd = (evt) => {
            evt.preventDefault();
            // this.log('touchend');
            const touches = evt.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                // const color = this.colorForTouch(touches[i]!);
                let idx = this.ongoingTouchIndexById(touches[i].identifier);
                if (idx >= 0) {
                    this.ongoingTouches.splice(idx, 1); // remove it; we're done
                    this.countScore();
                    this.resetRects();
                }
            }
        };
        this.handleCancel = (evt) => {
            evt.preventDefault();
            // this.log('touchcancel.');
            const touches = evt.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                let idx = this.ongoingTouchIndexById(touches[i].identifier);
                this.ongoingTouches.splice(idx, 1); // remove it; we're done
                this.countScore();
                this.resetRects();
            }
        };
        this.touchMeetsCell = (t, r) => t.pageX > r.x0 && t.pageX < r.x1 && t.pageY > r.y0 && t.pageY < r.y1;
    }
    setWH(w, h) {
        this.width = w;
        this.height = h;
    }
    countScore() {
        let word = '';
        for (const cell of this.selectedRectangles)
            word += cell.c.letter;
        console.log('tree', word, this.dict.hasWord(word.toLowerCase()));
        if (this.dict.hasWord(word.toLowerCase()) && !this.solved.has(word)) {
            let s = 0;
            for (let i = 1; i <= this.selectedRectangles.length; i++)
                s += i;
            this.stats.updateScore(s);
            this.solved.add(word);
        }
    }
    drawLine(x0, y0, x1, y1) {
        this.canvas2D.beginPath();
        this.canvas2D.moveTo(x0, y0);
        this.canvas2D.lineTo(x1, y1);
        this.canvas2D.lineWidth = 4;
        this.canvas2D.stroke();
    }
    isNeighbour2Last(i, j) {
        const last = this.selectedRectangles[this.selectedRectangles.length - 1];
        // console.log(last, i, j);
        if (!last)
            return true;
        if (last.i + 1 === i && last.j === j)
            return true;
        if (last.i - 1 === i && last.j === j)
            return true;
        if (last.i === i && last.j + 1 === j)
            return true;
        if (last.i === i && last.j - 1 === j)
            return true;
        if (last.i - 1 === i && last.j - 1 === j)
            return true;
        if (last.i + 1 === i && last.j - 1 === j)
            return true;
        if (last.i + 1 === i && last.j + 1 === j)
            return true;
        if (last.i - 1 === i && last.j + 1 === j)
            return true;
        return false;
    }
    selectRect(t) {
        let j = 0;
        for (const row of this.rectangles) {
            let i = 0;
            for (const r of row) {
                if (this.touchMeetsCell(t, r)) {
                    if (!this.isNeighbour2Last(i, j))
                        return;
                    if (this.isPrevious(r)) {
                        this.selectedRectangles.pop().c.unselect();
                        this.preview.removeLastLetter();
                    }
                    if (r.selected)
                        return;
                    r.select();
                    this.preview.addLetter(r.letter);
                    this.selectedRectangles.push({ c: r, i, j });
                }
                i++;
            }
            j++;
        }
    }
    isPrevious(c) {
        if (this.selectedRectangles.length < 2)
            return false;
        if (this.compareCells(this.selectedRectangles[this.selectedRectangles.length - 2].c, c))
            return true;
        return false;
    }
    resetRects() {
        console.log('selected', this.selectedRectangles);
        for (const n of this.selectedRectangles)
            n.c.unselect();
        this.preview.erase();
        this.selectedRectangles = [];
    }
    setPadding(padding) {
        this.padding = padding;
    }
    drawTable(table, steps) {
        this.canvas2D.clearRect(0, 0, this.width, this.height);
        const stepW = Math.trunc(this.width / steps);
        const stepH = Math.trunc(this.width / steps);
        this.steps = steps;
        this.stepH = stepH;
        this.stepW = stepW;
        this.wordH = Math.trunc(stepH / 2);
        this.wordW = Math.trunc(this.width / 2);
        this.statsW = Math.trunc(this.width / 2);
        this.statsH = this.height - Math.trunc(stepH / 2);
        console.log(this.statsW, this.statsH, this.width, this.height);
        this.preview = new Preview(this.wordW, this.wordH, this.canvas2D, 0, 0, this.width, stepH);
        this.stats = new Stats(this.statsW, this.statsH, this.canvas2D, 0, stepH * (steps + 1), this.width, stepH);
        this.stats.setTotalWords(this.dict.dictionary.size);
        this.padH = stepH * (this.padding / 200);
        this.padW = stepW * (this.padding / 200);
        __classPrivateFieldSet(this, _Touches_tableStr, table, "f");
        console.log(`${Math.trunc((this.stepH - this.padH * 2) * 0.7)}px Arial`);
        this.canvas2D.font = `${Math.trunc((this.stepH - this.padH * 2) * 0.7)}px Arial`;
        __classPrivateFieldGet(this, _Touches_instances, "m", _Touches_table).call(this);
    }
}
_Touches_tableStr = new WeakMap(), _Touches_instances = new WeakSet(), _Touches_table = function _Touches_table() {
    this.rectangles = [];
    let y1 = this.stepH * 2;
    let y0 = this.stepH;
    let letCnt = 0;
    for (let i = 0; i < this.steps; i++) {
        const buf = [];
        let x0 = 0;
        let x1 = this.stepW;
        for (let j = 0; j < this.steps; j++) {
            buf.push(new Node(x0 + this.padW, y0 + this.padH, x1 - this.padW, y1 - this.padH, __classPrivateFieldGet(this, _Touches_tableStr, "f")[letCnt].toUpperCase(), Math.trunc((x1 - x0) / 2) + x0, Math.trunc((y1 - y0) / 2) + y0, this.canvas2D));
            x0 += this.stepW;
            x1 += this.stepW;
            letCnt++;
        }
        this.rectangles.push(buf);
        y1 += this.stepH;
        y0 += this.stepH;
    }
    console.log('all', this.rectangles);
    for (const row of this.rectangles)
        for (const c of row)
            c.draw();
    // for (let i = 1; i < this.steps; i++) {
    //     this.drawLine(i * this.stepW, 0, i * this.stepW, this.height);
    //     this.drawLine(0, i * this.stepH, this.width, i * this.stepH);
    // }
};
class Game {
    constructor(canvas, dict) {
        _Game_canvasHTML.set(this, void 0);
        _Game_canvas.set(this, void 0);
        _Game_touch.set(this, void 0);
        _Game_dict.set(this, void 0);
        __classPrivateFieldSet(this, _Game_canvasHTML, canvas, "f");
        __classPrivateFieldSet(this, _Game_canvas, __classPrivateFieldGet(this, _Game_canvasHTML, "f").getContext('2d'), "f");
        __classPrivateFieldSet(this, _Game_dict, dict, "f");
        __classPrivateFieldSet(this, _Game_touch, new Touches(__classPrivateFieldGet(this, _Game_canvas, "f"), __classPrivateFieldGet(this, _Game_dict, "f")), "f");
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").addEventListener('touchstart', __classPrivateFieldGet(this, _Game_touch, "f").handleStart);
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").addEventListener('touchend', __classPrivateFieldGet(this, _Game_touch, "f").handleEnd);
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").addEventListener('touchcancel', __classPrivateFieldGet(this, _Game_touch, "f").handleCancel);
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").addEventListener('touchmove', __classPrivateFieldGet(this, _Game_touch, "f").handleMove);
    }
    configure(sqrFieldSize, font, padding = 20) {
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").height = Math.trunc(sqrFieldSize * 1.4);
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").width = sqrFieldSize;
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").style.background = '#2b3043';
        __classPrivateFieldGet(this, _Game_canvas, "f").font = font;
        __classPrivateFieldGet(this, _Game_touch, "f").setWH(__classPrivateFieldGet(this, _Game_canvasHTML, "f").width, __classPrivateFieldGet(this, _Game_canvasHTML, "f").height);
        __classPrivateFieldGet(this, _Game_touch, "f").setPadding(padding);
    }
    start(table, size) {
        __classPrivateFieldGet(this, _Game_touch, "f").drawTable(table, size);
    }
}
_Game_canvasHTML = new WeakMap(), _Game_canvas = new WeakMap(), _Game_touch = new WeakMap(), _Game_dict = new WeakMap();
const LoadTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fetch('/gettable');
    const out = yield resp.json();
    return out;
});
function startup() {
    return __awaiter(this, void 0, void 0, function* () {
        const el = document.getElementById('canvas');
        if (!el)
            throw new Error('no canvas found!');
        const init = yield LoadTable();
        const tree = new Tree(new Set(init.dict));
        const game = new Game(el, tree);
        let sqr = Math.min(window.innerHeight, window.innerWidth);
        if (sqr > 1000)
            sqr = 1000;
        game.configure(sqr, '48px Arial');
        game.start(init.table, 5);
    });
}
document.addEventListener('DOMContentLoaded', startup);
//# sourceMappingURL=index.js.map