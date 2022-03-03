import { ViewPort } from "./common/interface";
import { IAppliParams } from "./appli_params";
import { CloudLark } from "./protobuf/cloudlark";
import ScaleMode from "./utils/scale_mode";
import { LocalEvent, EventBase } from './event/event_base';
import { LarkSR } from "./larksr";
export interface ContainerSize {
    marginTop: number;
    marginLeft: number;
    width: number;
    height: number;
}
export interface ContainerStyle {
    marginTop: string;
    marginLeft: string;
    width: string;
    height: string;
    cursor: any;
}
export declare type ScreenOrientation = 'portrait' | 'landscape';
export declare enum CursorType {
    ARROW = 0,
    IBEAM = 1,
    WAIT = 2,
    CROSS = 3,
    SIZENWSE = 4,
    SIZENESW = 5,
    SIZEWE = 6,
    SIZENS = 7,
    SIZEALL = 8,
    NO = 9,
    HAND = 10,
    CUSTOM = 11,
    DEFAULT = 1000
}
export interface SyncCursorStyle {
    type: CursorType;
    hotX: number;
    hotY: number;
    width: number;
    height: number;
    customBase64: string;
}
export declare const enum SCREEN_EVENT_TYPE {
    ReSize = 0
}
export interface ScreenEvent extends LocalEvent<SCREEN_EVENT_TYPE> {
    container: ContainerSize;
    viewPort: ViewPort;
}
export default class ScreenState extends EventBase<SCREEN_EVENT_TYPE, ScreenEvent> {
    get appSize(): CloudLark.IAppResize;
    set appSize(size: CloudLark.IAppResize);
    private _appSize;
    get viewPort(): ViewPort;
    private _viewPort;
    get viewPortStyle(): string;
    get orientationIndexStyle(): {
        width: string;
        height: string;
        top: string;
        left: string;
        transform: string;
        transformOrigin: string;
        backgroundColor: string;
    } | {
        width: string;
        height: string;
        transform: string;
        transformOrigin: string;
        backgroundColor: string;
        top?: undefined;
        left?: undefined;
    };
    get container(): ContainerSize;
    private _container;
    get containerStyle(): string;
    get screenOrientation(): ScreenOrientation;
    private _screenOrientation;
    get scaleMode(): ScaleMode;
    set scaleMode(scaleMode: ScaleMode);
    private _scaleMode;
    get isFullScreen(): boolean;
    private _isFullScreen;
    get cursorStyle(): SyncCursorStyle;
    set cursorStyle(style: SyncCursorStyle);
    private _cursorStyle;
    private get cursorCSSStyle();
    get appMouseMode(): CloudLark.IAppMouseMode;
    set appMouseMode(mode: CloudLark.IAppMouseMode);
    private _appMouseMode;
    get operateScale(): {
        scaleX: number;
        scaleY: number;
    };
    get initCursorMode(): boolean;
    set initCursorMode(mode: boolean);
    private _initCursorMode;
    get isMobile(): boolean;
    private _isMobile;
    get isLocalRenderMouse(): boolean | null | undefined;
    get isLockMosue(): boolean | null | undefined;
    get rootElement(): HTMLElement;
    private _rootElement;
    private mobileForceLandScape;
    private bgColor;
    private handelRootElementSize;
    private larksr;
    constructor(rootElement: HTMLElement, params: IAppliParams, larksr: LarkSR, handelRootElementSize?: boolean);
    reset(params: IAppliParams): void;
    setMobileForceLandScape(force: boolean): void;
    resize(): void;
}
