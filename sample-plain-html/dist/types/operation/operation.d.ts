import { CloudLark } from '../protobuf/cloudlark';
import { LocalEvent, EventBase } from '../event/event_base';
import { Point } from '../common/interface';
import { LarkSR } from '../larksr';
export declare const enum OPREATION_EVENT_TYPE {
    Input = 0,
    NoOperationTimeout = 1,
    ClipboardText = 2,
    CursorMove = 3
}
export interface OperationEvent extends LocalEvent<OPREATION_EVENT_TYPE> {
    input?: CloudLark.ClientInput;
    data?: any;
    cursorPoint?: Point;
}
export default class Operation extends EventBase<OPREATION_EVENT_TYPE, OperationEvent> {
    private gestureHandler;
    private keyboardHandler;
    private mouseHandler;
    private gamepadHandler;
    private touchHandler;
    private _startListen;
    set enableParse(enable: boolean);
    get enableParse(): boolean;
    private _enableParse;
    private _lastOperationTimestampMs;
    private operationTimeout;
    get lastOperationTimestampMs(): number;
    updateOperation(): void;
    setRootElement(rootElement: HTMLElement): void;
    get startListen(): boolean;
    get larksr(): LarkSR;
    private _larksr;
    get screenState(): import("../screen_state").default;
    get fullScreen(): import("../larksr").FullScreen;
    get lockPointer(): import("../larksr").LockPointer;
    get mouseZoomDirection(): number;
    set mouseZoomDirection(direction: number);
    constructor(rootElement: HTMLElement, larksr: LarkSR);
    setMouseEnable(enable: boolean): void;
    setKeyboardEnable(enable: boolean): void;
    setGamepadEnable(enable: boolean): void;
    setTouchEnable(enable: boolean): void;
    setGestureEnable(enable: boolean): void;
    resetLocalRendreMousePosition(): void;
    setAppMouseMode(mode: CloudLark.IAppMouseMode): void;
    resetAppMouseLockState(): void;
    startListening(): void;
    stopListenling(): void;
    private startOperationCheck;
    private stopOperationTimeoutCheck;
    private onPaste;
    createEvent(type: OPREATION_EVENT_TYPE, input?: CloudLark.ClientInput): OperationEvent;
    $emitMoseMove(PosX: number, PosY: number, DeltaX: number, DeltaY: number): void;
    $emitMouseTap(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
    $emitMouseDown(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
    $emitMouseUp(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
    $emitMouseWheel(PosX: number, PosY: number, Delata: number): void;
    $emitKeyDown(key: number, isRepeat: boolean): void;
    $emitKeyUp(key: number): void;
    $emitGamepadButtonDown(userIndex: number, button: number, isRepeat: boolean): void;
    $emitGamepadButtonUp(userIndex: number, button: number): void;
    $emitGamepadTrigger(userIndex: number, isleft: boolean, value: number): void;
    $emitJoystick(userIndex: number, thumblx: number, thumbly: number, thumbrx: number, thumbry: number): void;
    $emitTouchDown(id: number, x: number, y: number): void;
    $emitTouchMove(id: number, x: number, y: number): void;
    $emitTouchUp(id: number, x: number, y: number): void;
    $emitInputEvent(input: CloudLark.IClientInput): void;
    $emitNoOperationTimeoutEvent(): void;
    $emitCursorMove(p: Point): void;
}
