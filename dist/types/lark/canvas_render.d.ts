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
    constructor(screenState: ScreenState);
    init(stream: MediaStream): Promise<HTMLCanvasElement>;
    draw(): void;
    stopDrawing(): void;
    clear(): void;
    setRotate(): void;
    clearRotate(): void;
}
