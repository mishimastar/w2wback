type Callback = (...args: any[]) => any;
type EventName = string;

export class EventEm {
    callbacks: Record<EventName, Set<Callback>>;

    constructor() {
        this.callbacks = Object.create(null);
    }

    on(ev: EventName, cb: Callback) {
        if (!this.callbacks[ev]) this.callbacks[ev] = new Set<Callback>();
        this.callbacks[ev]!.add(cb);
    }

    emit(ev: EventName, data: any) {
        let cbs = this.callbacks[ev];
        if (cbs) cbs.forEach((cb) => cb(data));
    }

    removeAllListeners(): void {
        this.callbacks = Object.create(null);
    }

    removeEventListener(ev: EventName, cb: Callback): void {
        if (!this.callbacks[ev]) return;
        if (!this.callbacks[ev]!.has(cb)) return;
        console.log(this.callbacks[ev]);
        this.callbacks[ev]!.delete(cb);
        console.log(this.callbacks[ev]);
    }
}
