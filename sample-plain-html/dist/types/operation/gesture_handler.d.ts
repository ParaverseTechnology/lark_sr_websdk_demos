import Operation from './operation';
import { GESTURE_TYPE } from './gesture';
import HandlerBase from './handler_base';
export default class GestureHandler extends HandlerBase {
    private gesture;
    private rootElement;
    private pressedMouseButtons;
    set mouseZoomDirection(direction: number);
    get mouseZoomDirection(): number;
    private _mouseZoomDirection;
    /**
     *
     */
    set tapLimitRadius(radius: number);
    /**
     *
     */
    set tapLimitTimeout(timeout: number);
    /**
     *
     */
    set relativeMouseMoveSpeed(speed: number);
    get relativeMouseMoveSpeed(): number;
    private _relativeMouseMoveSpeed;
    /**
     *
     */
    set gestureCallback(callback: null | ((event: {
        type: GESTURE_TYPE;
        x: number;
        y: number;
        rx: number;
        ry: number;
        edge: boolean;
        rawEvent: any;
    }) => void));
    get gestureCallback(): null | ((event: {
        type: GESTURE_TYPE;
        x: number;
        y: number;
        rx: number;
        ry: number;
        edge: boolean;
        rawEvent: any;
    }) => void);
    private _gestureCallback;
    constructor(rootElement: HTMLElement, op: Operation);
    startListening(): void;
    stopListening(): void;
    setRootElement(rootElement: HTMLElement): void;
    private onGesture;
    private releaseMouseButtons;
}
