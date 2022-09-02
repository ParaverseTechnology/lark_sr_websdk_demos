import { LarkSR } from '@/larksr';
import { LocalEvent, EventBase } from '../event/event_base';
export declare const MessageType: {
    /**********************************************************************/
    IFrameRequest: number;
    RequestQualityControl: number;
    MaxFpsRequest: number;
    AverageBitrateRequest: number;
    StartStreaming: number;
    StopStreaming: number;
    LatencyTest: number;
    RequestInitialSettings: number;
    /**********************************************************************/
    UIInteraction: number;
    Command: number;
    KeyDown: number;
    KeyUp: number;
    KeyPress: number;
    MouseEnter: number;
    MouseLeave: number;
    MouseDown: number;
    MouseUp: number;
    MouseMove: number;
    MouseWheel: number;
    TouchStart: number;
    TouchEnd: number;
    TouchMove: number;
    GamepadButtonPressed: number;
    GamepadButtonReleased: number;
    GamepadAnalog: number;
};
export declare const enum PIXEL_STREAMING_EVENT_TYPE {
    InputBuffer = 0
}
export interface PixelStreamingEvent extends LocalEvent<PIXEL_STREAMING_EVENT_TYPE> {
    intpuBuffer?: ArrayBuffer;
}
export declare const ControlSchemeType: {
    LockedMouse: number;
    HoveringMouse: number;
};
export default class PixelStreamingInput extends EventBase<PIXEL_STREAMING_EVENT_TYPE, PixelStreamingEvent> {
    private playerElementClientRect;
    private normalizeAndQuantizeUnsigned;
    private normalizeAndQuantizeSigned;
    private unquantizeAndDenormalizeUnsigned;
    private larksr;
    private inputOptions;
    get startListen(): boolean;
    private _startListen;
    constructor(larksr: LarkSR);
    registerInputs(videoElement: HTMLVideoElement): void;
    setupMouseAndFreezeFrame(playerElement: HTMLElement, videoElement: HTMLVideoElement): void;
    emitUIInteraction(descriptor: any): ArrayBuffer;
    emitCommand(descriptor: any): ArrayBuffer;
    requestInitialSettings(): void;
    requestQualityControl(): void;
    emitMouseMove(x: number, y: number, deltaX: number, deltaY: number): void;
    emitMouseDown(button: number, x: number, y: number): void;
    emitMouseUp(button: number, x: number, y: number): void;
    emitMouseWheel(delta: number, x: number, y: number): void;
    releaseMouseButtons(buttons: number, x: number, y: number): void;
    pressMouseButtons(buttons: number, x: number, y: number): void;
    registerMouseEnterAndLeaveEvents(playerElement: HTMLElement): void;
    registerLockedMouseEvents(playerElement: HTMLElement): void;
    registerHoveringMouseEvents(playerElement: HTMLVideoElement): void;
    registerTouchEvents(playerElement: HTMLVideoElement): void;
    isKeyCodeBrowserKey(keyCode: number): boolean;
    getKeyCode(e: KeyboardEvent): number;
    registerKeyboardEvents(): void;
    setupHtmlEvents(): void;
    gamepadConnectHandler(e: any): void;
    gamepadDisconnectHandler(e: any): void;
    emitControllerAxisMove(controllerIndex: any, axisIndex: number, analogValue: number): void;
    emitControllerButtonPressed(controllerIndex: any, buttonIndex: number, isRepeat: number): void;
    emitControllerButtonReleased(controllerIndex: any, buttonIndex: number): void;
    scanGamepads(): void;
    updateStatus(): void;
    setupNormalizeAndQuantize(playerElement: HTMLElement, videoElement: HTMLVideoElement): void;
    emitDescriptor(messageType: number, descriptor: any): ArrayBuffer;
    sendInputData(data: ArrayBuffer): void;
}
