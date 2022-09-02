import { EventBase, LocalEvent } from '../event/event_base';
export declare const enum LockPointerEventType {
    LockPointChange = 0,
    LockPointFailed = 1
}
export interface LockPointerEvent extends LocalEvent<LockPointerEventType> {
    isLockPointer: boolean;
    error: any;
}
export default class LockPointer extends EventBase<LockPointerEventType, LockPointerEvent> {
    get isLockPointer(): boolean;
    private _isLockPointer;
    element: HTMLElement;
    constructor(element: HTMLElement);
    listenLockChange(): void;
    removeListenLockChange(): void;
    lockPointer(): void;
    requestLockPointer(): void;
    exitPointerLock(): void;
    private pointerlockChange;
    private lockscreenFailed;
    private createEvent;
}
