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
var _LetterNode_instances, _LetterNode_end, _LetterNode_daughters, _LetterNode_markAsLast, _Tree_Tree;
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
//# sourceMappingURL=tree.js.map