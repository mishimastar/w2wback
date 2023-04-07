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
var _LetterNode_instances, _LetterNode_end, _LetterNode_daughters, _LetterNode_markAsLast, _Tree_Tree, _Preview_instances, _Preview_x, _Preview_y, _Preview_width, _Preview_height, _Preview_draw, _Stats_instances, _Stats_x, _Stats_y, _Stats_width, _Stats_height, _Stats_score, _Stats_totalWords, _Stats_solvedWords, _Stats_clear, _Stats_draw, _Touches_instances, _Touches_tableStr, _Touches_copyTouch, _Touches_compareCells, _Touches_table, _Touches_drawTable, _Touches_drawHive, _Menu_instances, _Menu_copyTouch, _Menu_loading, _Menu_menu, _Game_canvasHTML, _Game_canvas, _Game_touch, _Game_dict, _Game_menu, _Game_padding;
// function readTextFile(file: string) {
//     fetch(file)
//         .then((response) => response.text())
//         .then((text) => console.log(text));
// }
// readTextFile('file:///home/mishimastar/Documents/w2wsolver/dictionary.txt');
const ALPHA = (2 * Math.PI) / 6;
// 500/(3*( Math.cos((2 * Math.PI) / 6) + 1) +1)
// 90.9090909090909
const g17 = [
    [0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0]
];
const t4 = [
    [0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0]
];
const t5 = [
    [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0]
];
const t6 = [
    [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0]
];
const graphCfg = new Map([
    [4, t4],
    [5, t5],
    [6, t6],
    [17, g17]
]);
class LetterNode {
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
function drawHexagon(x, y, r, color, c) {
    c.beginPath();
    for (let i = 0; i < 6; i++)
        c.lineTo(x + r * Math.cos(ALPHA * i), y + r * Math.sin(ALPHA * i));
    c.fillStyle = color;
    c.fill();
    c.closePath();
    c.stroke();
}
// function drawGrid(width: number, height: number, r: number, c: CanvasRenderingContext2D) {
//     for (let y = r; y + r * Math.sin(ALPHA) < height; y += r * Math.sin(ALPHA))
//         for (
//             let x = r, j = 0;
//             x + r * (1 + Math.cos(ALPHA)) < width;
//             x += r * (1 + Math.cos(ALPHA)), y += (-1) ** j++ * r * Math.sin(ALPHA)
//         )
//             drawHexagon(x, y, r, '', c);
// }
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
        this.radius2 = Math.trunc(Math.pow((this.width / 2), 2));
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
class GraphNodeRect {
    constructor(index, letter, lx, ly, canvas, radius, x0, y0, x1, y1) {
        this.index = index;
        this.letter = letter;
        this.lx = lx;
        this.ly = ly;
        this.canvas = canvas;
        this.selected = false;
        this.neighbours = new Map();
        this.x0 = x0 !== null && x0 !== void 0 ? x0 : 0;
        this.y0 = y0 !== null && y0 !== void 0 ? y0 : 0;
        this.x1 = x1 !== null && x1 !== void 0 ? x1 : 0;
        this.y1 = y1 !== null && y1 !== void 0 ? y1 : 0;
        this.width = this.x1 - this.x0;
        this.height = this.y1 - this.y0;
        this.radius = radius !== null && radius !== void 0 ? radius : Math.trunc(this.width / 2);
        this.radius2 = radius ? Math.trunc(Math.pow(radius, 2)) : Math.trunc(Math.pow(this.radius, 2));
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
    hasNeighbour(index) {
        return this.neighbours.has(index);
    }
    addNeighbour(node) {
        this.neighbours.set(node.index, node);
    }
}
class GraphNodeHex {
    constructor(index, letter, lx, ly, canvas, radius, x0, y0, x1, y1) {
        this.index = index;
        this.letter = letter;
        this.lx = lx;
        this.ly = ly;
        this.canvas = canvas;
        this.selected = false;
        this.neighbours = new Map();
        this.x0 = x0 !== null && x0 !== void 0 ? x0 : 0;
        this.y0 = y0 !== null && y0 !== void 0 ? y0 : 0;
        this.x1 = x1 !== null && x1 !== void 0 ? x1 : 0;
        this.y1 = y1 !== null && y1 !== void 0 ? y1 : 0;
        this.width = this.x1 - this.x0;
        this.height = this.y1 - this.y0;
        this.radius = radius !== null && radius !== void 0 ? radius : Math.trunc(this.width / 2);
        this.radius2 = radius ? Math.trunc(Math.pow(radius, 2)) : Math.trunc(Math.pow(this.radius, 2));
    }
    draw() {
        drawHexagon(this.lx, this.ly, this.radius, '#525f94', this.canvas);
        drawLetter(this.letter, this.lx, this.ly, this.canvas);
    }
    select() {
        this.selected = true;
        drawHexagon(this.lx, this.ly, this.radius, '#ff4721', this.canvas);
        drawLetter(this.letter, this.lx, this.ly, this.canvas);
    }
    unselect() {
        this.selected = false;
        drawHexagon(this.lx, this.ly, this.radius, '#525f94', this.canvas);
        drawLetter(this.letter, this.lx, this.ly, this.canvas);
    }
    hasNeighbour(index) {
        return this.neighbours.has(index);
    }
    addNeighbour(node) {
        this.neighbours.set(node.index, node);
    }
}
class Touches {
    constructor(canvas2D, dict) {
        this.canvas2D = canvas2D;
        this.dict = dict;
        _Touches_instances.add(this);
        this.ongoingTouches = [];
        this.nodes = [];
        this.selectedNodes = [];
        this.solved = new Set();
        _Touches_tableStr.set(this, void 0);
        this.padding = 0;
        this.wordH = 0;
        this.wordW = 0;
        this.statsW = 0;
        this.statsH = 0;
        _Touches_copyTouch.set(this, (touch) => ({ identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY }));
        _Touches_compareCells.set(this, (c1, c2) => c1.index === c2.index);
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
            const touches = evt.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                this.ongoingTouches.push(__classPrivateFieldGet(this, _Touches_copyTouch, "f").call(this, touches[i]));
                this.selectRect(touches[i]);
            }
        };
        this.handleMove = (evt) => {
            evt.preventDefault();
            const touches = evt.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                const idx = this.ongoingTouchIndexById(touches[i].identifier);
                if (idx < 0)
                    continue;
                this.selectRect(touches[i]);
                this.ongoingTouches.splice(idx, 1, __classPrivateFieldGet(this, _Touches_copyTouch, "f").call(this, touches[i])); // swap in the new touch record
            }
        };
        this.handleEnd = (evt) => {
            evt.preventDefault();
            const touches = evt.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                let idx = this.ongoingTouchIndexById(touches[i].identifier);
                if (idx < 0)
                    continue;
                this.ongoingTouches.splice(idx, 1); // remove it; we're done
                this.countScore();
                this.resetRects();
            }
        };
        this.handleCancel = (evt) => {
            evt.preventDefault();
            const touches = evt.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                let idx = this.ongoingTouchIndexById(touches[i].identifier);
                this.ongoingTouches.splice(idx, 1); // remove it; we're done
                this.countScore();
                this.resetRects();
            }
        };
        this.touchMeetsCell = (t, r) => Math.pow((r.lx - t.pageX), 2) + Math.pow((r.ly - t.pageY), 2) <= r.radius2;
    }
    setWH(w, h) {
        this.width = w;
        this.height = h;
    }
    countScore() {
        let word = '';
        for (const cell of this.selectedNodes)
            word += cell.letter;
        console.log('tree', word, this.dict.hasWord(word));
        if (this.dict.hasWord(word) && !this.solved.has(word)) {
            let s = 0;
            for (let i = 1; i <= this.selectedNodes.length; i++)
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
    isNeighbour2Last(node) {
        const last = this.selectedNodes[this.selectedNodes.length - 1];
        if (!last)
            return true;
        return last.hasNeighbour(node.index);
    }
    selectRect(t) {
        for (const node of this.nodes) {
            if (this.touchMeetsCell(t, node)) {
                if (!this.isNeighbour2Last(node))
                    return;
                if (this.isPrevious(node)) {
                    this.selectedNodes.pop().unselect();
                    this.preview.removeLastLetter();
                }
                if (node.selected)
                    return;
                node.select();
                this.preview.addLetter(node.letter);
                this.selectedNodes.push(node);
            }
        }
    }
    isPrevious(c) {
        if (this.selectedNodes.length < 2)
            return false;
        if (__classPrivateFieldGet(this, _Touches_compareCells, "f").call(this, this.selectedNodes[this.selectedNodes.length - 2], c))
            return true;
        return false;
    }
    resetRects() {
        console.log('selected', this.selectedNodes);
        for (const n of this.selectedNodes)
            n.unselect();
        this.preview.erase();
        this.selectedNodes = [];
    }
    setPadding(padding) {
        this.padding = padding;
    }
    drawGame(table, steps) {
        if (steps <= 6)
            __classPrivateFieldGet(this, _Touches_instances, "m", _Touches_drawTable).call(this, table, steps);
        else
            __classPrivateFieldGet(this, _Touches_instances, "m", _Touches_drawHive).call(this, table, steps);
    }
}
_Touches_tableStr = new WeakMap(), _Touches_copyTouch = new WeakMap(), _Touches_compareCells = new WeakMap(), _Touches_instances = new WeakSet(), _Touches_table = function _Touches_table() {
    this.nodes = [];
    let y1 = this.stepH * 2;
    let y0 = this.stepH;
    let letCnt = 0;
    for (let i = 0; i < this.steps; i++) {
        let x0 = 0;
        let x1 = this.stepW;
        for (let j = 0; j < this.steps; j++) {
            this.nodes.push(new GraphNodeRect(letCnt, __classPrivateFieldGet(this, _Touches_tableStr, "f")[letCnt].toUpperCase(), Math.trunc((x1 - x0) / 2) + x0, Math.trunc((y1 - y0) / 2) + y0, this.canvas2D, undefined, x0 + this.padW, y0 + this.padH, x1 - this.padW, y1 - this.padH));
            x0 += this.stepW;
            x1 += this.stepW;
            letCnt++;
        }
        y1 += this.stepH;
        y0 += this.stepH;
    }
    console.log('all', this.nodes);
    for (let j = 0; j < __classPrivateFieldGet(this, _Touches_tableStr, "f").length; j++) {
        const graphConfig = graphCfg.get(this.steps)[j];
        for (let i = 0; i < graphConfig.length; i++) {
            if (!graphConfig[i])
                continue;
            this.nodes[j].addNeighbour(this.nodes[i]);
        }
    }
    for (const node of this.nodes)
        node.draw();
    // for (let i = 1; i < this.steps; i++) {
    //     this.drawLine(i * this.stepW, 0, i * this.stepW, this.height);
    //     this.drawLine(0, i * this.stepH, this.width, i * this.stepH);
    // }
}, _Touches_drawTable = function _Touches_drawTable(table, steps) {
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
}, _Touches_drawHive = function _Touches_drawHive(table, cells) {
    const outerRadius = Math.trunc(Math.min(this.width / (5 * (Math.cos(ALPHA) + 1) + 1), this.height / (5 * Math.sin(ALPHA) + 1)));
    console.log(outerRadius);
    console.log(table, cells);
    this.canvas2D.clearRect(0, 0, this.width, this.height);
    let y = outerRadius * 4.2;
    const order = [2, 0, 3, 1, 4, 7, 5, 8, 6, 9, 12, 10, 13, 11, 14, undefined, 15, undefined, 16, undefined];
    let cnt = 0;
    for (let x = outerRadius, j = 1; j < 6; x += outerRadius * (1 + Math.cos(ALPHA)), y += Math.pow((-1), j++) * outerRadius * Math.sin(ALPHA)) {
        this.nodes.push(new GraphNodeHex(order[cnt], table[order[cnt]].toUpperCase(), x, y, this.canvas2D, outerRadius * Math.sin(ALPHA)));
        cnt++;
    }
    y += outerRadius * 3 * Math.sin(ALPHA);
    for (let x = outerRadius, j = 1; j < 6; x += outerRadius * (1 + Math.cos(ALPHA)), y += Math.pow((-1), j++) * outerRadius * Math.sin(ALPHA)) {
        this.nodes.push(new GraphNodeHex(order[cnt], table[order[cnt]].toUpperCase(), x, y, this.canvas2D, outerRadius * Math.sin(ALPHA)));
        cnt++;
    }
    y += outerRadius * 3 * Math.sin(ALPHA);
    for (let x = outerRadius, j = 1; j < 6; x += outerRadius * (1 + Math.cos(ALPHA)), y += Math.pow((-1), j++) * outerRadius * Math.sin(ALPHA)) {
        this.nodes.push(new GraphNodeHex(order[cnt], table[order[cnt]].toUpperCase(), x, y, this.canvas2D, outerRadius * Math.sin(ALPHA)));
        cnt++;
    }
    y += outerRadius * 3 * Math.sin(ALPHA);
    for (let x = outerRadius, j = 1; j < 6; x += outerRadius * (1 + Math.cos(ALPHA)), y += Math.pow((-1), j++) * outerRadius * Math.sin(ALPHA)) {
        if (order[cnt] === undefined) {
            cnt++;
            continue;
        }
        this.nodes.push(new GraphNodeHex(order[cnt], table[order[cnt]].toUpperCase(), x, y, this.canvas2D, outerRadius * Math.sin(ALPHA)));
        cnt++;
    }
    this.canvas2D.font = `${Math.trunc(outerRadius * 0.8)}px Arial`;
    for (const node of this.nodes) {
        const graphConfig = graphCfg.get(cells)[node.index];
        // console.log(node.index, graphConfig);
        for (const n of this.nodes) {
            // console.log(node.index, graphConfig[node.index]);
            if (graphConfig[n.index] === 1)
                node.addNeighbour(n);
        }
    }
    this.preview = new Preview(this.width / 2, this.height / 10, this.canvas2D, 0, 0, this.width, this.height / 5);
    this.stats = new Stats(this.width / 2, (9 * this.height) / 10, this.canvas2D, 0, (4 * this.height) / 5, this.width, this.height / 5);
    this.stats.setTotalWords(this.dict.dictionary.size);
    for (const node of this.nodes)
        node.draw();
    // for (let y = 2 * outerRadius; y + outerRadius * Math.sin(ALPHA) < this.height; y += outerRadius * Math.sin(ALPHA)) {
    // }
    // const stepW = Math.trunc(this.width / steps);
    // const stepH = Math.trunc(this.width / steps);
    // this.steps = steps;
    // this.stepH = stepH;
    // this.stepW = stepW;
    // this.wordH = Math.trunc(stepH / 2);
    // this.wordW = Math.trunc(this.width / 2);
    // this.statsW = Math.trunc(this.width / 2);
    // this.statsH = this.height - Math.trunc(stepH / 2);
    // console.log(this.statsW, this.statsH, this.width, this.height);
    // this.preview = new Preview(this.wordW, this.wordH, this.canvas2D, 0, 0, this.width, stepH);
    // this.stats = new Stats(this.statsW, this.statsH, this.canvas2D, 0, stepH * (steps + 1), this.width, stepH);
    // this.stats.setTotalWords(this.dict.dictionary.size);
    // this.padH = stepH * (this.padding / 200);
    // this.padW = stepW * (this.padding / 200);
    // this.#tableStr = table;
    // console.log(`${Math.trunc((this.stepH - this.padH * 2) * 0.7)}px Arial`);
    // this.canvas2D.font = `${Math.trunc((this.stepH - this.padH * 2) * 0.7)}px Arial`;
    // this.#table();
};
class Menu {
    constructor(canvas2D, game) {
        this.canvas2D = canvas2D;
        this.game = game;
        _Menu_instances.add(this);
        this.ongoingTouches = [];
        this.buttons = ['Играть 4х4', 'Играть 5x5', 'Играть 6х6', 'Улей 17'];
        this.stepH = 0;
        this.rectangles = [];
        _Menu_copyTouch.set(this, (touch) => ({ identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY }));
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
            const touches = evt.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                this.ongoingTouches.push(__classPrivateFieldGet(this, _Menu_copyTouch, "f").call(this, touches[i]));
                this.selectButton(touches[i]);
            }
        };
        this.handleEnd = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const touches = evt.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                let idx = this.ongoingTouchIndexById(touches[i].identifier);
                if (idx < 0)
                    continue;
                this.ongoingTouches.splice(idx, 1); // remove it; we're done
                yield this.checkConfirmation(touches[i]);
            }
        });
        this.handleCancel = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const touches = evt.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                let idx = this.ongoingTouchIndexById(touches[i].identifier);
                this.ongoingTouches.splice(idx, 1); // remove it; we're done
                yield this.checkConfirmation(touches[i]);
            }
        });
        this.touchMeetsButton = (t, r) => t.pageX > r.x0 && t.pageX < r.x1 && t.pageY > r.y0 && t.pageY < r.y1;
    }
    resetButtons() {
        for (const n of this.rectangles)
            n.unselect();
    }
    checkConfirmation(t) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const b of this.rectangles) {
                if (!this.touchMeetsButton(t, b))
                    continue;
                if (b.selected) {
                    this.resetButtons();
                    console.log('selected', b.letter);
                    switch (b.letter) {
                        case 'Играть 4х4':
                            __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_loading).call(this);
                            yield this.game.start(4);
                            break;
                        case 'Играть 5x5':
                            __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_loading).call(this);
                            yield this.game.start(5);
                            break;
                        case 'Играть 6х6':
                            __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_loading).call(this);
                            yield this.game.start(6);
                            break;
                        case 'Улей 17':
                            __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_loading).call(this);
                            yield this.game.start(17);
                            break;
                        default:
                            break;
                    }
                    return;
                }
            }
            this.resetButtons();
        });
    }
    selectButton(t) {
        for (const b of this.rectangles) {
            if (!this.touchMeetsButton(t, b))
                continue;
            if (b.selected)
                return;
            b.select();
        }
    }
    setWH(w, h) {
        this.width = w;
        this.height = h;
    }
    drawMenu() {
        this.canvas2D.clearRect(0, 0, this.width, this.height);
        const stepH = Math.trunc(this.height / (this.buttons.length + 1));
        this.stepH = stepH;
        __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_menu).call(this);
    }
}
_Menu_copyTouch = new WeakMap(), _Menu_instances = new WeakSet(), _Menu_loading = function _Menu_loading() {
    this.game.removeMenuHandlers();
    this.canvas2D.clearRect(0, 0, this.width, this.height);
    this.canvas2D.fillText('Генерирую!', Math.trunc(this.width / 2), Math.trunc(this.height / 2));
}, _Menu_menu = function _Menu_menu() {
    this.rectangles = [];
    let y0 = this.stepH - 100;
    let y1 = this.stepH + 100;
    const x0 = Math.trunc(this.width * 0.2);
    const x1 = Math.trunc(this.width * 0.8);
    let mult = 0;
    for (const but of this.buttons) {
        this.rectangles.push(new Node(x0, y0 + this.stepH * mult, x1, y1 + this.stepH * mult, but, Math.trunc((x1 - x0) / 2) + x0, Math.trunc((y1 - y0) / 2) + y0 + this.stepH * mult, this.canvas2D));
        mult++;
    }
    console.log('all', this.rectangles);
    for (const c of this.rectangles)
        c.draw();
};
class Game {
    constructor(canvas) {
        _Game_canvasHTML.set(this, void 0);
        _Game_canvas.set(this, void 0);
        _Game_touch.set(this, void 0);
        _Game_dict.set(this, void 0);
        _Game_menu.set(this, void 0);
        _Game_padding.set(this, 0);
        __classPrivateFieldSet(this, _Game_canvasHTML, canvas, "f");
        __classPrivateFieldSet(this, _Game_canvas, __classPrivateFieldGet(this, _Game_canvasHTML, "f").getContext('2d'), "f");
        __classPrivateFieldSet(this, _Game_menu, new Menu(__classPrivateFieldGet(this, _Game_canvas, "f"), this), "f");
    }
    configure(sqrFieldSize, font, padding = 20) {
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").height = sqrFieldSize;
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").width = sqrFieldSize;
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").style.background = '#2b3043';
        __classPrivateFieldGet(this, _Game_canvas, "f").font = font;
        __classPrivateFieldGet(this, _Game_menu, "f").setWH(__classPrivateFieldGet(this, _Game_canvasHTML, "f").width, __classPrivateFieldGet(this, _Game_canvasHTML, "f").height);
        __classPrivateFieldSet(this, _Game_padding, padding, "f");
    }
    start(size) {
        return __awaiter(this, void 0, void 0, function* () {
            const init = yield LoadTable(size);
            console.log(init);
            if (size <= 6)
                __classPrivateFieldGet(this, _Game_canvasHTML, "f").height = Math.trunc(__classPrivateFieldGet(this, _Game_canvasHTML, "f").height * (1 / size) * (size + 2));
            else
                __classPrivateFieldGet(this, _Game_canvasHTML, "f").height = Math.trunc(__classPrivateFieldGet(this, _Game_canvasHTML, "f").width * 1.4);
            const tree = new Tree(new Set(init.dict));
            __classPrivateFieldSet(this, _Game_dict, tree, "f");
            __classPrivateFieldSet(this, _Game_touch, new Touches(__classPrivateFieldGet(this, _Game_canvas, "f"), __classPrivateFieldGet(this, _Game_dict, "f")), "f");
            __classPrivateFieldGet(this, _Game_touch, "f").setWH(__classPrivateFieldGet(this, _Game_canvasHTML, "f").width, __classPrivateFieldGet(this, _Game_canvasHTML, "f").height);
            __classPrivateFieldGet(this, _Game_touch, "f").setPadding(__classPrivateFieldGet(this, _Game_padding, "f"));
            __classPrivateFieldGet(this, _Game_canvasHTML, "f").addEventListener('touchstart', __classPrivateFieldGet(this, _Game_touch, "f").handleStart);
            __classPrivateFieldGet(this, _Game_canvasHTML, "f").addEventListener('touchend', __classPrivateFieldGet(this, _Game_touch, "f").handleEnd);
            __classPrivateFieldGet(this, _Game_canvasHTML, "f").addEventListener('touchcancel', __classPrivateFieldGet(this, _Game_touch, "f").handleCancel);
            __classPrivateFieldGet(this, _Game_canvasHTML, "f").addEventListener('touchmove', __classPrivateFieldGet(this, _Game_touch, "f").handleMove);
            __classPrivateFieldGet(this, _Game_touch, "f").drawGame(init.table, size);
        });
    }
    removeMenuHandlers() {
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").removeEventListener('touchstart', __classPrivateFieldGet(this, _Game_menu, "f").handleStart);
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").removeEventListener('touchend', __classPrivateFieldGet(this, _Game_menu, "f").handleEnd);
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").removeEventListener('touchcancel', __classPrivateFieldGet(this, _Game_menu, "f").handleCancel);
    }
    drawMenu() {
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").addEventListener('touchstart', __classPrivateFieldGet(this, _Game_menu, "f").handleStart);
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").addEventListener('touchend', __classPrivateFieldGet(this, _Game_menu, "f").handleEnd);
        __classPrivateFieldGet(this, _Game_canvasHTML, "f").addEventListener('touchcancel', __classPrivateFieldGet(this, _Game_menu, "f").handleCancel);
        __classPrivateFieldGet(this, _Game_menu, "f").drawMenu();
    }
}
_Game_canvasHTML = new WeakMap(), _Game_canvas = new WeakMap(), _Game_touch = new WeakMap(), _Game_dict = new WeakMap(), _Game_menu = new WeakMap(), _Game_padding = new WeakMap();
const LoadTable = (size) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fetch('/gettable', { headers: { size: String(size) } });
    const out = yield resp.json();
    return out;
});
function startup() {
    return __awaiter(this, void 0, void 0, function* () {
        const el = document.getElementById('canvas');
        if (!el)
            throw new Error('no canvas found!');
        const game = new Game(el);
        let sqr = Math.min(window.innerHeight, window.innerWidth);
        if (sqr > 1000)
            sqr = 1000;
        game.configure(sqr, '48px Arial');
        game.drawMenu();
        // game.start(init.table, 5);
    });
}
document.addEventListener('DOMContentLoaded', startup);
//# sourceMappingURL=index.js.map