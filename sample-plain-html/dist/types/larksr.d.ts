import { EventBase, LocalEvent } from './event/event_base';
import Application, { APP_STATE } from './lark/application';
import { AppliParams, AppliParamsUtils, IAppliParams, LoadAppliParamsStartAppInfo } from './appli_params';
import { LarkEventType } from './lark/lark_event_type';
import API from './api';
import ScreenState from './screen_state';
import Operation from './operation/operation';
import { CloudLark } from './protobuf/cloudlark';
import { KEYMAP } from './operation/keymap';
import FullScreen from './utils/full_screen';
import LockPointer from './utils/lock_pointer';
import ScaleMode from './utils/scale_mode';
import Capabilities from './utils/capabilities';
declare const enum PlayerModeType {
    Normal = 0,
    Interactive = 1,
    MutiPlayer = 2
}
declare const enum UserType {
    Observer = 0,
    Player = 1
}
interface LarkSREvent extends LocalEvent<LarkEventType> {
    data?: any;
    message: string;
}
interface ILarkSRConfig {
    rootElement: HTMLElement;
    serverAddress: string;
    authCode?: string;
    authCodeCallback?: (isSuccess: boolean, e: any) => void;
    isMonitor?: boolean;
    codeRate?: number;
    frameRate?: number;
    audioCodeRate?: number;
    logLevel?: 'info' | 'warn' | 'error';
    loadingTimeout?: number;
    syncLocalToCloudClipboard?: boolean;
    perferDecoder?: 'auto' | 'vp8' | 'vp9' | 'h264' | 'av1x';
    scaleMode?: ScaleMode;
    /**
     * 全屏模式
     *  0 -》 用户手动触发
     *  1 -》 首次点击进入触发
     *  2 -》 每次点击触发
     */
    fullScreenMode?: number;
    mobileFullScreenMode?: number;
    mobileForceLandscape?: boolean;
}
declare class LarkSR extends EventBase<LarkEventType, LarkSREvent> {
    static EnterAppli(config: ILarkSRConfig, params: {
        appliId: string;
        playerMode?: number;
        userType?: number;
        roomCode?: string;
        taskId?: string;
    }): Promise<LarkSR>;
    get params(): IAppliParams;
    private _params;
    get playerModeType(): PlayerModeType;
    get userType(): UserType;
    get isObMode(): boolean;
    get isInteractiveMode(): boolean;
    get appState(): APP_STATE;
    get app(): Application;
    private _app;
    get remoteScreenReady(): boolean;
    set remoteScreenReady(ready: boolean);
    private _remoteScreenReady;
    get screenState(): ScreenState;
    private _screenState;
    get op(): Operation;
    private _op;
    private iframeHandler;
    get fullScreen(): FullScreen;
    private _fullScreen;
    get lockPointer(): LockPointer;
    private _lockPointer;
    private view;
    get rootElement(): HTMLElement;
    private _rootElement;
    get serverAddress(): string;
    private _serverAddress;
    get serverIp(): string;
    get config(): ILarkSRConfig;
    private _config;
    private loadingTimeout;
    private sdkAuth;
    constructor(config: ILarkSRConfig, params: IAppliParams);
    initSDKAuthCode(id: string): Promise<void>;
    start(): Promise<void>;
    restart(): void;
    restartApp(): void;
    changeOperater(uid: number): void;
    inputText(text: string): void;
    sendTextToDataChannel(text: string): void;
    sendBinaryToDataChannel(binary: Uint8Array): void;
    postMsg(type: LarkEventType, data?: any, msg?: string): void;
    /**
     *  退出当前页面
     */
    quit(): void;
    sendInput(input: CloudLark.IClientInput): void;
    moseMove(PosX: number, PosY: number, DeltaX: number, DeltaY: number): void;
    mouseTap(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
    mouseDown(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
    mouseUp(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
    mouseWheel(PosX: number, PosY: number, Delata: number): void;
    keyDown(key: string, isRepeat: boolean): void;
    keyUp(key: string): void;
    gamepadButtonDown(userIndex: number, button: number, isRepeat: boolean): void;
    gamepadButtonUp(userIndex: number, button: number): void;
    gamepadTrigger(userIndex: number, isleft: boolean, value: number): void;
    joystick(userIndex: number, thumblx: number, thumbly: number, thumbrx: number, thumbry: number): void;
    touchDown(id: number, x: number, y: number): void;
    touchMove(id: number, x: number, y: number): void;
    touchUp(id: number, x: number, y: number): void;
    getMouseButtonType(button: 'left' | 'mid' | 'right'): CloudLark.MouseKey;
    $emit(type: LarkEventType, data?: any, message?: string): void;
    private createEvent;
    private taskProcess;
    private startProcess;
    private onAppStateChange;
    private onGotRemoteStream;
    private onCursorStyle;
    private onAppResize;
    private onAppMouseMode;
    private onAppPlayerList;
    private onAppRequestText;
    private onDataChannelText;
    private onDataChannelBinary;
    private onDataChannelOpen;
    private onDataChannelClose;
    private onOperationTimeout;
    private onOperationInput;
}
export { LarkSR, ILarkSRConfig, PlayerModeType, UserType, LarkSREvent, AppliParams, AppliParamsUtils, LoadAppliParamsStartAppInfo, EventBase, LocalEvent, API, Operation, Capabilities, ScaleMode, KEYMAP, CloudLark, FullScreen, LockPointer, };
