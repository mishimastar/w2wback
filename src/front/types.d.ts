export type Dot = { x: number; y: number };
export type Rectangle = { ul: Dot; dr: Dot };
export type IntUnitConfig = { ul: Dot; width: number; height: number };
export type InterfaceConfig = { stats: IntUnitConfig; preview: IntUnitConfig; playground: IntUnitConfig };

export interface EventBus extends EventEm {
    on(ev: 'updateScore', cb: (score: number) => void): this;
    on(ev: 'removeLetter', cb: () => void): this;
    on(ev: 'addLetter', cb: (letter: string) => void): this;
    on(ev: 'eraseWord', cb: () => void): this;

    emit(ev: 'updateScore', score: number): void;
    emit(ev: 'removeLetter'): void;
    emit(ev: 'addLetter', letter: string): void;
    emit(ev: 'eraseWord'): void;
}
