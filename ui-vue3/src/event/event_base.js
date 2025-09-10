export class EventBase {
    constructor() {
        this.listeners = new Map();
    }
    on(type, callback, self) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        const callbacks = this.listeners.get(type);
        if (callbacks !== undefined) {
            callbacks.push({
                callback,
                target: self ? self : this 
            });
            this.listeners.set(type, callbacks);
        }
    }
    off(type, callback, self) { 
        if (!this.listeners.has(type)) {
            return;
        }
        const target = self ? self : this;
        const stack = this.listeners.get(type);
        if (stack !== undefined) {
            for (let i = 0, l = stack.length; i < l; i++) {
                if (stack[i].callback === callback && stack[i].target === target) {
                    stack.splice(i, 1);
                    return;
                }
            }
        }
    }
    emit(event, ...params) {
        if (!this.listeners.has(event.type)) {
            return;
        }
        const stack = this.listeners.get(event.type);
        if (stack !== undefined) {
            for (let i = 0, l = stack.length; i < l; i++) {
                event.target = stack[i].target;
                stack[i].callback.call(stack[i].target, event, ...params);
            }
        }
    }
} 