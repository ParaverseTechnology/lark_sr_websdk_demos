export interface WebGLBufferInfo {
    position: WebGLBuffer | null;
    textureCoord: WebGLBuffer | null;
    indices: WebGLBuffer | null;
}
export default class WebGlUtils {
    static fullScreenVertices: number[];
    static fullscreenTextureCoords: number[];
    static fullscreenIndices: number[];
    static fullscreenVsSource: string;
    static fullscreenFsSource: string;
    static initfullScreenBuffers(gl: WebGLRenderingContext): WebGLBufferInfo;
    static initTexture(gl: WebGLRenderingContext, source?: TexImageSource | null, width?: number, height?: number, internalFormat?: number): WebGLTexture | null;
    static updateTexture(gl: WebGLRenderingContext, texture: WebGLTexture, video: TexImageSource): void;
    static initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram;
    static loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader;
    static setPositionAttribute(gl: WebGLRenderingContext, positionBuffer: WebGLBuffer, vertexPositionAttr: number, numComponents?: number, stride?: number, offset?: number): void;
    static setTextureAttribute(gl: WebGLRenderingContext, textureCoordBuffers: WebGLBuffer, textureCoordAttr: number, numComponents?: number, stride?: number, offset?: number): void;
}
export declare class FullScreenGlRender {
    get inited(): boolean;
    private _inited;
    get canvas(): HTMLCanvasElement | null;
    private _canvas;
    get video(): HTMLVideoElement | null;
    private _video;
    get gl(): WebGLRenderingContext | null;
    private _gl;
    get shaderProgram(): WebGLProgram | null;
    private _shaderProgram;
    vertexPosition: number;
    textureCoord: number;
    uSampler: WebGLUniformLocation | null;
    buffers: WebGLBufferInfo | null;
    texture: WebGLTexture | null;
    drawFrames: number;
    playing: boolean;
    timeupdate: boolean;
    copyVideo: boolean;
    startInternal: boolean;
    constructor();
    init(canvas: HTMLCanvasElement, video: HTMLVideoElement): boolean;
    private checkReady;
    startCanvasRender(): void;
    stopCanvasRender(): void;
    draw(viewportX?: number, viewportY?: number, viewportWidth?: number, viewPortHeight?: number): void;
    updateVideo(video: HTMLVideoElement): void;
}
