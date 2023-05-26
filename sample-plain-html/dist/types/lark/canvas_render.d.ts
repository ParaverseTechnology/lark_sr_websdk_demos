import ScreenState from '@/screen_state';
export default class CanvasRender {
    get canvas(): HTMLCanvasElement | null;
    private set canvas(value);
    private _canvas;
    private context;
    private width;
    private height;
    private video;
    private drawFrames;
    private stream;
    private screenState;
    private hasDeviceOrientationEvent;
    private alpha;
    private beta;
    private gamma;
    private isFront;
    private currentRotateClock;
    constructor(screenState: ScreenState);
    init(stream: MediaStream): Promise<HTMLCanvasElement>;
    draw(): void;
    stopDrawing(): void;
    clear(): void;
    setRotate(clock: boolean): void;
    clearRotate(): void;
    setupRotateWithDeivce(): void;
    private checkFront;
}
