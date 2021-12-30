/**
 * fcx@pingxingyun.com
 * www.pingxingyun.com
 */
import { EventBase, LocalEvent } from './event/event_base';
import Application, { APP_STATE } from './lark/application';
import { AppliParams, AppliParamsUtils, IAppliParams, LoadAppliParamsFromUrl, LoadAppliParamsStartAppInfo } from './appli_params';
import { LarkEventType } from './lark/lark_event_type';
import API from './api';
import ScreenState from './screen_state';
import Operation from './operation/operation';
import { CloudLark } from './protobuf/cloudlark';
import { KEYMAP, VirtualKey } from './operation/keymap';
import FullScreen from './utils/full_screen';
import LockPointer from './utils/lock_pointer';
import ScaleMode from './utils/scale_mode';
import Capabilities from './utils/capabilities';
declare const enum PlayerModeType {
    /**
     * 普通模式
     */
    Normal = 0,
    /**
     * 交互模式（可以一人操作多人看）
     */
    Interactive = 1,
    /**
     * 多人互动模式 (多人可操作)
     */
    MutiPlayer = 2
}
/**
 * 当前用户的身份
 */
declare const enum UserType {
    /**
     * 观看者
     */
    Observer = 0,
    /**
     * 操作者
     */
    Player = 1
}
/**
 * LarkSR 实例会发出的事件
 */
declare enum LarkSRClientEvent {
    /**
     * 连接渲染服务器成功 .
     */
    CONNECT = "connect",
    /**
     * 登录成功时触发，会返回当前用户id .
     */
    LOGIN_SUCCESS = "loginsuccess",
    /**
     * 无操作超时时触发 .
     */
    NO_OPERATION_TIMEOUT = "operatetimeout",
    /**
     * 连接关闭.
     */
    CLOSE = "close",
    /**
     * 云端应用关闭，但连接未关闭
     */
    APP_CLOSE = "appclose",
    /**
     * 获取到远端视频流 .
     */
    GOT_REMOTE_STREAM = "gotremotesteam",
    /**
     * 视频加载成功，等待播放 .
     */
    MEDIA_LOADED = "meidaloaded",
    /**
     * 视频自动播放成功 .
     */
    MEDIA_PLAY_SUCCESS = "mediaplaysuccess",
    /**
     * 视频自动播放失败 .
     */
    MEDIA_PLAY_FAILED = "mediaplayfailed",
    /**
     * 自动播放声音失败，以静音模式播放 .
     */
    MEDIA_PLAY_MUTE = "meidaplaymute",
    /**
     * 云渲染连接状态改变 .
     */
    APPSTATE_CHANGE = "appstatechange",
    /**
     * 云端应用大小变化 .
     */
    APP_RESIZE = "appresize",
    /**
     * 云端应用鼠标模式变化时触发 .
     */
    APP_MOUSE_MODE = "appmousemode",
    /**
     * 云端应用鼠标状态变化 .
     */
    APP_CURSOR_MODE = "appcursormode",
    /**
     * 玩家列表 .
     */
    PLAYER_LIST = "playerlist",
    /**
     * 视频连接状态
     */
    PEERSTATUS_REPORT = "peerstatusreport",
    /**
     * 云端应用请求输入文字 .
     */
    APP_REQUEST_INPUT = "apprequestinput",
    /**
     * 云端应用请求手柄震动
     */
    APP_REQUEST_GAMEPAD_OUPUT = "apprequestgamepadoutput",
    /**
     * 截图成功.
     */
    CAPTURE_FRAME = "captureframe",
    /**
     * 数据通道打开 .
     */
    DATACHANNEL_OPEN = "datachannelopen",
    /**
     * 数据通道关闭 .
     */
    DATACHANNEL_CLOSE = "datachannelclose",
    /**
     * 数据通达收到文字消息 .
     */
    DATACHANNEL_TEXT = "datachanneltext",
    /**
     * 数据通道收到字节消息 .
     */
    DATACHANNEL_BINARY = "datachannelbinary",
    /**
     * 更详细的事件状态，主要用于向iframe外部抛出 .
     */
    LarkEvent = "larkevent",
    /**
     * 发生错误时抛出
     */
    ERROR = "error",
    /**
     * 一般信息提示
     */
    INFO = "info"
}
/**
 * LarkSR 发出的事件
 */
interface LarkSREvent extends LocalEvent<LarkSRClientEvent> {
    data?: any;
    message?: string;
    code?: number;
    larkevent?: LarkEventType;
}
/**
 * 构造 LarkSR 参数
 */
interface ILarkSRConfig {
    /**
     * 必选项 根元素。组件会挂载到跟元素下面
     * 注意*不要*设置为 document.documentElement
     * 默认模式下会通过旋转根元素实现强制横屏模式。
     * @see handelRootElementSize
     * @see scaleMode
     */
    rootElement: HTMLElement;
    /**
     * 可选项 服务器地址. LarkServer 前台访问的地址
     * 如： http://192.168.0.55:8181/
     * 当使用托管服务时服务器地址自动分配,可留空。
     * 使用托管服务时@see CreateLarkSRClientFromePXYHost @see larksr.connectWithPxyHost
     */
    serverAddress?: string;
    /**
     * 可选项。 sdk 授权码。如果不在此处填，则必须在后续的实例里调用 initSDKAuthCode 初始化。
     */
    authCode?: string;
    /**
     * 可选项，授权是否成功
     */
    authCodeCallback?: (isSuccess: boolean, e: any) => void;
    /**
     * 可选项，载入时的背景图片 url
     */
    loadingBgUrl?: string;
    /**
     * 可选项，是否同步传入根的组件的大小样式。
     * 默认开启，将跟组件大小设置为浏览器视口大小
     * 如果关闭，内部组件将按照传入的根元素大小去显示
     * 注意，当关闭时不会自动填充根元素，如果根元素高度为 0 将显示不出来。
     * 注意，当关闭时 mobileForceLandscape 将失去作用。
     */
    handelRootElementSize?: boolean;
    /**
     * 是否在sdk内部监听鼠标键盘等输入事件
     * 如果关闭需要手动发送输入事件
     * 注意关闭时全屏模式和锁定模式将失效,需要在sdk外部触发
     * @see fullScreenMode
     */
    handlInput?: boolean;
    /**
     * 当视频播自动放失败时是否尝试静音播放,静音播放时将抛出事件
     * 静音播放当用户操作屏幕时将尝试播放声音
     */
    mutePlayWhenFiled?: boolean;
    /**
     * 可选项，是否是 vr 监控类型。
     */
    isMonitor?: boolean;
    /**
     * 可选项，码率
     */
    codeRate?: number;
    /**
     * 可选项，帧率
     */
    frameRate?: number;
    /**
     * 可选项，音频帧率
     */
    audioCodeRate?: number;
    /**
     * 可选项，日志级别。默认为 warn
     */
    logLevel?: 'info' | 'warn' | 'error';
    /**
     * 可选项，载入超时时间. 默认为 60s。超过该事件停止载入
     */
    loadingTimeout?: number;
    /**
     * 可选项，是否自动同步剪贴板数据
     */
    syncLocalToCloudClipboard?: boolean;
    /**
     * 可选项，优选选择的视频编码格式
     */
    perferDecoder?: 'auto' | 'vp8' | 'vp9' | 'h264' | 'av1x';
    /**
     * 可选项，视频在容器中的缩放模式
     *
     */
    scaleMode?: ScaleMode;
    /**
     * 全屏模式
     *  0 -》 用户手动触发
     *  1 -》 首次点击进入触发
     *  2 -》 每次点击触发
     */
    fullScreenMode?: number;
    /**
     * 可选项，手机端的全屏模式，值同  fullScreenMode
     */
    mobileFullScreenMode?: number;
    /**
     * 可选项，手机端是否强制横屏
     */
    mobileForceLandscape?: boolean;
    /**
     * 初始化鼠标模式, true 锁定，false 非锁定
     */
    initCursorMode?: boolean;
}
/**
 * 通过平行云托管平台创建客户端并启动应用
 * @param config 传入 config @see ILarkSRConfig
 * @param params 进入应用接口参数。appliId 为必填项
 * @returns Promise 创建 larksr client 是否成功
 */
export declare function CreateLarkSRClientFromePXYHost(config: ILarkSRConfig, params: {
    appliId: string;
    playerMode?: number;
    userType?: number;
    roomCode?: string;
    taskId?: string;
    nickname?: string;
}): Promise<LarkSR>;
/**
 * 通过调用后台接口获取云端应用参数
 * @param config 传入 config @see ILarkSRConfig
 * @param params 进入应用接口参数。appliId 为必填项
 * @returns Promise 创建 larksr client 是否成功
 */
export declare function CreateLarkSRClientFromeAPI(config: ILarkSRConfig, params: {
    appliId: string;
    playerMode?: number;
    userType?: number;
    roomCode?: string;
    taskId?: string;
    nickname?: string;
}): Promise<LarkSR>;
/**
 * 通过从url参数中获取云端应用相关参数
 * @param config 传入 config @see ILarkSRConfig
 * @returns Promise 创建 larksr client 是否成功
 */
export declare function CreateLarkSRClientFromeUrl(config: ILarkSRConfig): Promise<LarkSR>;
declare class LarkSR extends EventBase<LarkSRClientEvent, LarkSREvent> {
    /**
     * 应用参数，构建时传入
     */
    get params(): AppliParams;
    private _params;
    /**
     * 当前的玩家模式，
     */
    get playerModeType(): PlayerModeType;
    /**
     * 用户类型
     * @see UserType
     */
    get userType(): UserType;
    /**
     * 是否是观看者模式
     */
    get isObMode(): boolean;
    /**
     * 当前是否是交互模式，交互默认即可以操作的模式
     */
    get isInteractiveMode(): boolean;
    get isPixelStreaming(): boolean;
    /**
     * 当前 app 的状态
     */
    get appState(): APP_STATE;
    get app(): Application;
    private _app;
    /**
     * 云端画面是否准备好，准备好后才可以发送输入事件
     */
    get remoteScreenReady(): boolean;
    set remoteScreenReady(ready: boolean);
    private _remoteScreenReady;
    /**
     * 当前的屏幕状态
     * @see ScreenState
     */
    get screenState(): ScreenState;
    private _screenState;
    /**
     * 当前的输入控制
     * @see Operation
     */
    get op(): Operation;
    private _op;
    /**
     * 像素流送输入控制
     */
    private pixelInput;
    private iframeHandler;
    get fullScreen(): FullScreen;
    private _fullScreen;
    get lockPointer(): LockPointer;
    private _lockPointer;
    private _view;
    /**
     * 视频元素
     */
    get videoElement(): HTMLVideoElement;
    /**
     * 视频显示组件
     */
    get videoComponent(): any;
    /**
     * 视频显示组件的父容器
     */
    get containerElement(): any;
    /**
     *
     */
    get viewportElement(): any;
    get rootElement(): HTMLElement;
    private _rootElement;
    get serverAddress(): string;
    get serverIp(): string;
    get config(): ILarkSRConfig;
    private _config;
    private loadingTimeout;
    private sdkAuth;
    /**
     * 后台分配的用户id
     */
    get uid(): number;
    private _uid;
    /**
     * @returns 是否是 Task的拥有者
     */
    isTaskOwner(): boolean;
    _isTaskOwner: boolean;
    /**
     * LarkSR 客户端。所有操作和事件通过该类传递
     * 注意，如果手动创建该类，要清楚参数的意义，一般只有调试等特殊情况才手动创建该类
     * @see CreateLarkSRClientFromeAPI, CreateLarkSRClientFromeUrl
     * @param config 本地配置，如果有 IAppliParams 相同的配置项，优先级最高
     * @param params [可选参数] 云端应用参数等，通过后台接口或者url参数获取。
     */
    constructor(config: ILarkSRConfig, params?: IAppliParams);
    /**
     *
     * @param id sdk id 初始化sdkid
     * @returns
     */
    initSDKAuthCode(id: string): Promise<void>;
    connectWithPxyHost(params: {
        appliId: string;
        playerMode?: number;
        userType?: number;
        roomCode?: string;
        taskId?: string;
    }): Promise<void>;
    /**
     * 连接云端渲染资源
     * @params appID 云端资源的 ID
     * @returns Promise 调用接口并校验授权通过返回成功并自动开始连接
     */
    connect(params: {
        appliId: string;
        playerMode?: number;
        userType?: number;
        roomCode?: string;
        taskId?: string;
        nickname?: string;
        appKey?: string;
        timestamp?: string;
        signature?: string;
    }): Promise<void>;
    /**
     * 手动重设进入应用参数
     * @param params
     */
    setAppliParams(params: IAppliParams): void;
    /**
     * 开始云渲染流程
     * 启动时应用参数不能为空，包括 taskID，appServer，appPort
     * @returns 是否成功。主要校验授权码是否成功
     */
    start(): Promise<void>;
    /**
     * 重新开始云渲染流程
     */
    restart(): void;
    /**
     * 重新启动云端应用
     */
    restartApp(): void;
    /**
     * 主动关闭连接
     */
    close(): void;
    /**
     * 切换当前操作者
     * @param uid 用户id
     */
    changeOperater(uid: number): void;
    /**
     * 向云端应用发送文字。当云端应用出现输入框时，可以将本地文本填写进去.
     * @param text 文字
     */
    inputText(text: string): void;
    /**
     * 发送文字消息给数据通道
     * 注意 云端应用要继承数据通道功能
     * @param text 文字
     */
    sendTextToDataChannel(text: string): void;
    /**
     * 发送字节消息给数据通道
     * 注意 云端应用要继承数据通道功能
     * @param binary 字节消息
     */
    sendBinaryToDataChannel(binary: Uint8Array): void;
    /**
     * 手动向iframe外抛出事件
     * 注意一般只在用 iframe 二次集成时才用到
     * @param type
     * @param data
     * @param msg
     */
    postMsg(type: LarkEventType, data?: any, msg?: string): void;
    /**
     *  退出当前页面
     * 注意如果是微信内会调用 WeixinJSBridge 的 close window 方法
     * 可以不使用该方法退出页面
     */
    quit(): void;
    /**
     * 操作相关事件
     * 所有事件坐标相对于云端应用，不相对于网页
     * @param input 操作指令
     */
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
    $emitError(message?: string, code?: number): void;
    $emitInfo(message?: string, code?: number): void;
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
export { LarkSR, ILarkSRConfig, PlayerModeType, UserType, LarkSREvent, LarkEventType, LarkSRClientEvent, AppliParams, AppliParamsUtils, LoadAppliParamsFromUrl, LoadAppliParamsStartAppInfo, EventBase, API, Operation, Capabilities, ScaleMode, VirtualKey, KEYMAP, CloudLark, FullScreen, LockPointer, };
