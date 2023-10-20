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
import Recorder from './lark/recoder';
import { GESTURE_TYPE } from './operation/gesture';
declare enum PlayerModeType {
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
declare enum UserType {
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
     * TASK 创建成功，返回 Task 相关信息
     */
    TASK_CREATE_SUCCESS = "taskcreatesuccess",
    /**
     * TASK 创建失败
     */
    TASK_CREATE_FAILED = "taskcreatefailed",
    /**
     * 渲染资源不足
      * {
            // 服务端返回的错误码，服务端请求正确返回时存在。需要注意渲染资源不足类型的错误码。
            // 可用 type == 0 判断是否是渲染资源不足类型的错误,再用 code 进行细节处理，或者只用 type == 0 进行处理。
            // 813=当前应用的运行数量已达到最大值：{0},请稍后再试
            // 814=同一appKey下的应用运行数量达到最大值：{0}，请稍后再试
            // 815=应用运行数量已达到最大授权并发数量，请稍后再试
            // 816=VR应用运行数量已达到最大授权并发数量，请稍后再试
            // 817=渲染资源不足，请稍后再试
            // 820=暂无活跃的GPU节点
            // 821=节点资源使用率已达到设置的阈值
            // 823=单节点运行应用数量已达到单节点最大授权并发数量，请稍后再试
            code?: 817,

            // 错误信息
            message:? "",
        }
     *
     */
    RESOURCE_NOT_ENOUGH = "resourcenotenough",
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
    GOT_REMOTE_STREAM = "gotremotestream",
    /**
     * 获取到远端音频流 .
     */
    GOT_REMOTE_AUDIO_STREAM = "gotremoteaudiostream",
    /**
     * 视频加载成功
     */
    MEDIA_LOADED = "meidaloaded",
    MEDIA_LOADED2 = "medialoaded",
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
     * > V3.2.314 版本对应服务器版本和数据通道版本为 3.2.5.1 及以上
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
     * type:     error
     * message: 错误消息
     * code:    可能的错误码如下, 错误码的具体定义 @see [./event_codes]
     *          // 连接服务器的websocket代理关闭
     *          LK_RENDER_SERVER_CLOSE                    : 102
     *          // 连接代理服务器的websocket关闭
     *          LK_PROXY_SERVER_CLOSE                     : 202
     *          // 检测版本失败，服务器和客户端的版本匹配。目前只有3.1和3.2大版本不匹配情况
     *          LK_VERSION_CHECK_FAILED                   : 301
     *          // 服务器返回创建Task失败
     *          TASK_NOTFOUND-TASK_NO_GPU_RESOURCE        : 401-404
     *          // 服务端启动流媒体失败
     *          LK_START_STREAM_PROCESS_START-FAILED-LK_START_STREAM_ENCODER_ERROR : 501-504
     *          // RTC 连接关闭
     *          LK_RTC_EVENT_PEERCONNECTION_CLOSED        : 601
     *          // RTC 连接出错
     *          LK_RTC_EVENT_PEERCONNECTION_ERROR         : 602
     *          // RTC 创建出错，一般为 浏览器不支持 webrtc
     *          LK_RTC_EVENT_PEERCONNECTION_CREATE_FAILED : 603
     *          // 服务器主动要求客户端退出
     *          LK_NOTIFY_CLIENT_LOGOUT_PLAYER_LOGOUT     : 800
     *          // 一人操作多人看房主退出
     *          LK_NOTIFY_CLIENT_LOGOUT_TASKOWNER_LOGOUT  : 801
     *
     */
    ERROR = "error",
    /**
     * 一般信息提示
     */
    INFO = "info",
    /**
     * 语音对话的状态
     */
    AI_VOICE_STATUS = "aivoicestatus",
    /**
     * 语音识别转文字的结果
     */
    AI_VOICE_ASR_RESULT = "aivoiceasrresult",
    /**
     * 对话返回的结果
     */
    AI_VOICE_DM_RESULT = "aivoicedmresult",
    /**
     * 对话出错详细信息
     */
    AI_VOICE_ERROR = "aivoiceerror",
    /**
     * 服务端 3.2.7.0 添加
     *
     */
    TOUCH_CTR_MAPPING = "touchctrmapping",
    /**
     * 服务端 3.2.7.0 添加
     * rtmp 直播推流状态
     */
    RTMP_STREAM_STATE = "rtmpstreamstate",
    /**
     * 服务端 3.2.7.0 添加
     * rtmp 直播推流出错
     */
    RTMP_STREAM_ERROR = "rtmpstreamerror",
    /**
     * 服务端 3.2.2.x 添加
     * 鸟瞰模式背景缩略图
     */
    AERIAL_VIEW_SCREEN = "aerialviewscreen"
}
/**
 * LarkSR 发出的事件
 */
interface LarkSREvent extends LocalEvent<LarkSRClientEvent> {
    data?: any;
    message?: string;
    code?: number;
    larkevent?: LarkEventType;
    rawData?: any;
}
declare type PublicPortMapping = {
    [key: string]: string;
};
/**
 * 构造 LarkSR 参数
 */
interface ILarkSRConfig {
    /**
     * 必选项 根元素。组件会挂载到跟元素下面
     * 注意*不要*设置为 document.documentElement
     * 默认模式下会通过旋转根元素实现强制横屏模式。
     * @see handleRootElementSize
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
     * @deprecated 目前不会回调该参数。如果SDK验证失败将在 connect 返回失败
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
    handleRootElementSize?: boolean;
    /**
     * 同 handleRootElementSize
     */
    handelRootElementSize?: boolean;
    /**
     * 是否只设置根的组件的旋转。只当 handleRootElementSize 为 true 时有效。设置根组件的旋转用于 mobileForceLandscape 模式。
     * 默认为false，此时 SDK 会设置根组件的宽高,margin 0,padding 0
     * 为true并且handleRootElementSize也为true时，只设置根组件的旋转属性，用于强制横屏模式以及强制横屏竖屏的切换。
     * 要注意onlyHandleRootElementTransform开启成功时，要保证根节点的元素大小并且当根节点变化时应调用 resize 方法通知更新根节点的大小。
     */
    onlyHandleRootElementTransform?: boolean;
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
    mutePlayWhenFailed?: boolean;
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
    preferDecoder?: 'auto' | 'vp8' | 'vp9' | 'h264' | 'h265' | 'hevc' | 'av1x';
    /**
     * 可选项，视频在容器中的缩放模式
     * ScaleMode: 'contain' | 'fill_clip' | 'fill_stretch'
     * contain: 以应用原始尺寸的缩放
     * fill_clip: 裁剪模式，完全填充屏幕但保留宽高比
     * fill_stretch: 拉伸模式，完全填充屏幕但不保留宽高比
     * 对应后台应用管理->应用编辑->通用高级设置->窗口初始显示方式,该配置优先级高于后台配置
     */
    scaleMode?: ScaleMode;
    /**
     * 全屏模式
     *  0 -》 用户手动触发
     *  1 -》 首次点击进入触发
     *  2 -》 每次点击触发
     * 对应后台应用管理->应用编辑->通用高级设置->全屏模式,该配置优先级高于后台配置
     */
    fullScreenMode?: number;
    /**
     * 可选项，手机端的全屏模式，值同  fullScreenMode
     * 对应后台应用管理->应用编辑->移动端高级设置->全屏模式,该配置优先级高于后台配置
     */
    mobileFullScreenMode?: number;
    /**
     * 可选项，手机端是否强制横屏
     * 对应后台应用管理->应用编辑->移动端高级设置->手机端时是否强制横屏,该配置优先级高于后台配置
     */
    mobileForceLandscape?: boolean;
    /**
     * 可选项
     * 初始化鼠标模式, true 锁定，false 非锁定
     * 对应后台应用管理->应用编辑->通用高级设置->初始化鼠标模式,该配置优先级高于后台配置
     */
    initCursorMode?: boolean;
    /**
     * 可选项
     * 渲染服务器外网端口映射
     * 格式为  key=[渲染服务器IP:PORT] value=[外网IP:PORT]
     * {
     *    "RENDER-A-IP:RENDER-A-PORT1": "PUBLIC-A-IP:PORT1",
     *    "RENDER-B-IP:RENDER-B-PORT1": "PUBLIC-A-IP:PORT2",
     *    "RENDER-C-IP:RENDER-C-PORT1": "PUBLIC-A-IP:PORT3",
     *    "RENDER-D-IP:RENDER-D-PORT1": "PUBLIC-B-IP:PORT1",
     *    "RENDER-E-IP:RENDER-E-PORT1": "PUBLIC-B-IP:PORT2",
     *    "RENDER-E-IP:RENDER-E-PORT2": "PUBLIC-C-IP:PORT1",
     * }
     */
    publicPortMapping?: PublicPortMapping;
    /**
     * 可选项
     * 是否提示输入文字 APP_REQUEST_INPUT
     * 当服务端检测到输入法事件后会抛出事件，可在 web 层添加输入框，配合 inputText 发送文字到云端
     * 默认打开，当手动关闭时将不会抛出 APP_REQUEST_INPUT 事件
     */
    textInputEventPrompt?: boolean;
    /**
     * 可选项
     * 当启用音频输入功能，是否自动连入音频设备。
     * 默认关闭。
     * 需要注意默认打开的是系统中默认的音频设备。
     */
    audioInputAutoStart?: boolean;
    /**
     * 可选项
     * 当启用视频输入功能，是否自动连入视频设备。
     * 默认关闭。
     * 需要注意默认打开的是系统中默认的视频设备。
     */
    videoInputAutoStart?: boolean;
    /**
     * 可选项
     * mouseZoomDirection
     * 用于移动端捏合缩放操作与应用鼠标缩放的对应关系
     * 1:鼠标滚轮向上为放大，
     * 0:鼠标滚轮向下为放大(default)
     */
    mouseZoomDirection?: number;
    /**
     * 可选项
     * 触摸指令，移动端的触摸指令对应为云端的触屏还是鼠标
     * 'touchScreen' | 'mouse'
     * 触摸指令模式，对应后台应用管理->应用编辑->移动端高级设置->触摸指令模式 优先级高于后台配置
     */
    touchOperateMode?: 'touchScreen' | 'mouse';
    /**
     * 可选项
     * 优先使用渲染服务器点对点连接外网ip
     * 如果配置将覆盖后台设置的 preferPublicIp 参数
     */
    preferPublicIp?: string;
    /**
     * 可选项
     * 是否自动播放。默认开启。
     * 如果关闭，连接成功之后会有提示UI，用户手动触发。
     * 开启自动播放时也不能保证所有浏览器自动播放成功，当播放失败或者浏览器不支持自动播放时，
     * 也会显示播放按钮，用户点击播放按钮手动播放。
     */
    autoPlay?: boolean;
    /**
     * 可选项
     * 在播放失败或者手动播放模式下是否显示播放的按钮。
     * 默认开启。要注意，如果关闭情况下要添加好提示或UI，引导用户点击播放。
     * UI中要让用户触发 larksr.videoComponent.playVideo();
     */
    showPlayButton?: boolean;
    /**
     * 可选项
     * 语言设置,目前支持中文简体、中文繁体、英文三种,默认中文简体
     * zh-CN 中文简体 zh-TW 中文繁体 en 英文
     */
    language?: string;
    /**
     * 点对点连接成功，但未接收到视频流或未播放成功超时时间。自动播放模式下超时会弹出提示按钮。
     * 默认 20S
     */
    playTimeout?: number;
    /**
     * 是否使用新版摄像头/麦克风协议
     * 单独上传流程要求渲染服务器版本大于3290）
     */
    useSeparateMediaSharePeer?: boolean;
    /**
     * 是否启用 canvas 渲染. 默认关闭
     */
    enableCanvasRender?: boolean;
    /**
     * 强制使用canvs2d模式，默认优先使用 webgl
     */
    forceCanvas2d?: boolean;
    /**
     * 可选项
     * loading页载入Logo版本
     */
    loadingLogoVersion?: string;
    /**
     * 初始化分辨率方式
     * 1:适应客户端窗口】和【0:应用默认分辨率】,默认值：0
     * 此处配置优先级大于管理后台配置
     */
    initResolutionType?: number;
}
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
    onFirstAppsize(width: number, height: number): void;
    /**
     * 当前的屏幕状态
     * @see ScreenState
     */
    get screenState(): ScreenState;
    private _screenState;
    /**
     * 动态设置scalemode
     */
    set scaleMode(scaleMode: ScaleMode);
    get mouseZoomDirection(): number;
    /**
     * 动态设置滚轮和缩放手势对应关系
     */
    set mouseZoomDirection(direction: number);
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
     * 音频元素
     */
    get audioElement(): HTMLAudioElement;
    /**
     * 是否有单独的音频流
     */
    get isSeprateAudioTrack(): any;
    /**
     * 视频显示组件的父容器
     */
    get containerElement(): any;
    /**
     *
     */
    get viewportElement(): any;
    /**
     * 是否显示移动端触摸点
     */
    set isEnableTouchPonit(enable: boolean);
    set isEnableTouchPoint(enable: boolean);
    /**
     * 设置是否使用canvas渲染画面。
     * iOS/Mac下默认开启.在 iOS/Mac下关闭canvas渲染可能导致样式问题异常显示。
     */
    set enableCanvasRender(enable: boolean);
    /**
     * 获取是否使用canvas渲染画面。
     * iOS/Mac下默认开启.在 iOS/Mac下关闭canvas渲染可能导致样式问题异常显示。
     */
    get enableCanvasRender(): boolean;
    /**
     * 虚拟鼠标的当前位置,相对于整体容器
     */
    get virtualCursorPosition(): {
        x: any;
        y: any;
    };
    /**
     * 虚拟鼠标的当前位置,内部缩放容器，与实际显示虚拟鼠标 CSS 样式相同
     */
    get virtualCursorPositionRaw(): {
        x: any;
        y: any;
    };
    /**
     * 是否显示载入画面时底部文字
     */
    set isEnableLoadingStateBar(enable: boolean);
    get rootElement(): HTMLElement;
    private _rootElement;
    get serverAddress(): string;
    get serverIp(): string;
    get config(): ILarkSRConfig;
    private _config;
    private loadingTimeout;
    /**
     * 后台分配的用户id
     */
    get uid(): number;
    private _uid;
    /**
     * 云端应用是否是预启动状态
     */
    get isPreStart(): boolean;
    private _isPreStart;
    /**
     * @returns 是否是 Task的拥有者
     */
    isTaskOwner(): boolean;
    _isTaskOwner: boolean;
    /**
     * true：锁定模式 false：非锁定模式
     */
    set initCursorMode(mode: boolean);
    get initCursorMode(): boolean;
    /**
     * 当前打开的音频设备 ID，如果打开时没指定为空
     */
    get audioDeviceId(): string | null | undefined;
    /**
     * 当前打开音频的track对象，未打开状态为空
     */
    get audioTrack(): MediaStreamTrack | null | undefined;
    /**
     * 当前打开视频设备 ID，如果打开时没指定特设备id为空
     */
    get videoDeviceId(): string | null | undefined;
    /**
     * 当前打开视频track对象，未打开状态为空
     */
    get videoTrack(): MediaStreamTrack | null | undefined;
    /**
     * 音频通道是否暂停
     */
    get audioPaused(): boolean | undefined;
    /**
     * 视频通道是否暂停
     */
    get videoPaused(): boolean | undefined;
    /**
     * 获取媒体通道，后续可以调用媒体通道的相关接口，如打开摄像头等
     * 原有 larksr 对象中的媒体通道相当于序号 0
     * @param index 媒体上传通道序号 0 - 5
     * @returns
     */
    getMediaSharePeerConnection(index: number): import("./lark/peer_connection_media_share").default;
    /**
     * 服务器支持的功能列表
     */
    get serverFeatures(): CloudLark.INotifyFeatures | null | undefined;
    get serverStatics(): CloudLark.IServerStatics | null | undefined;
    /**
     * 动态设置码率 单位 kbps
     * @param bitrateKbps
     */
    setVideoBitrateKbps(bitrateKbps: number): void;
    /**
     * 动态设置帧率
     */
    setVideoFps(fps: number): void;
    /**
     * 动态设置云端 debug 窗口
     */
    setCloudDebugLayout(open: boolean): void;
    /**
     * 重启云端应用
     */
    restartCloudApp(): void;
    /**
     * 设置云端应用大小
     */
    setCloudAppSize(width: number, height: number): void;
    /**
     * 当前云端应用窗口大小
     */
    get currentAppSize(): CloudLark.IAppResize | null | undefined;
    /**
     * 开始鸟瞰模式
     */
    startAerialview(viewbox: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, interval: number | undefined, thumbnailWidth: 120, thumbnailHeight: 120): void;
    /**
     * 更新鸟瞰模式区域
     */
    updateAerialview(viewbox: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    /**
     * 停止鸟瞰模式区域
     */
    stopAerialview(): void;
    get syncClientViewport(): boolean;
    set syncClientViewport(sync: boolean);
    /**
     * LarkSR 客户端。所有操作和事件通过该类传递
     * @param config 本地配置，优先级最高
     */
    constructor(config: ILarkSRConfig);
    /**
     * 单独设置服务器地址，作用同 config 中的 serverAddress 字段
     * 在进入应用之前都可以更新。
     * @param serverAddress 服务器地址，如 http://192.168.0.55:8181/
     */
    updateServerAddress(serverAddress: string): void;
    /**
     * 单独设置sdk授权码，目前总会返回成功 promise，具体验证失败将在 connectWithPxyHost 或 connect 返回
     * @param id sdk id 初始化sdkid
     * @returns
     */
    initSDKAuthCode(id: string): Promise<void>;
    /**
     * 使用平行云托管平台时，使用 connectWithPxyHost 连接云端应用
     * 托管平台 https://www.pingxingyun.com/console/#/
     * @param params 同 connect 方法
     * @return 同 connect 方法
     */
    connectWithPxyHost(params: {
        appliId: string;
        playerMode?: number;
        userType?: number;
        authCode?: string;
        taskId?: string;
        regionId?: string;
        groupId?: string;
    }): Promise<void>;
    /**
     * 连接云端渲染资源
     * @params appID 云端资源的 ID
     * @returns Promise 调用接口并校验授权通过返回成功并自动开始连接
     * Promise 返回的错误对象：
     * {
            // type 0 渲染资源不足导致的错误，1 其他错误, 可用 type == 0 判断是否是渲染资源不足类型的错误
            type: 0,

            // 渲染资源不足时的事件类型，其他情况可能不返回，比如网络错误
            eventType?：LarkSRClientEvent.RESOURCE_NOT_ENOUGH,

            // 服务端返回的错误码，服务端请求正确返回时存在。需要注意渲染资源不足类型的错误码。
            // 可用 type == 0 判断是否是渲染资源不足类型的错误,再用 code 进行细节处理，或者只用 type == 0 进行处理。
            // 813=当前应用的运行数量已达到最大值：{0},请稍后再试
            // 814=同一appKey下的应用运行数量达到最大值：{0}，请稍后再试
            // 815=应用运行数量已达到最大授权并发数量，请稍后再试
            // 816=VR应用运行数量已达到最大授权并发数量，请稍后再试
            // 817=渲染资源不足，请稍后再试
            // 820=暂无活跃的GPU节点
            // 821=节点资源使用率已达到设置的阈值
            // 823=单节点运行应用数量已达到单节点最大授权并发数量，请稍后再试
            code?: 817,

            // 错误信息
            message:? "",
       }
     *
     */
    connect(params: {
        appliId: string;
        playerMode?: number;
        userType?: number;
        authCode?: string;
        taskId?: string;
        clientMac?: string;
        groupId?: string;
        regionId?: string;
        targetServerIp?: string;
        appKey?: string;
        timestamp?: string;
        signature?: string;
    } | any): Promise<void>;
    /**
     * 用户手动填昵称，需要在 start 或 connect 之前设置才能生效。
     */
    setNickname(nickname: string): void;
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
     * 从DOM种删除渲染组件，注意删除渲染组件之后将无法再次进入应用，所有状态将失效,不可恢复，只能重新new LarkSR
     */
    destroy(): void;
    /**
     * 设置是否强制横屏显示内容.
     * handleRootElementSize 必须设置为 true 才有作用。
     * 要注意强制横屏模式下网页的坐标系xy和视觉上相反，如果通过外部输入 input 事件。要注意调整
     * @param force 是否强制横屏
     */
    setMobileForceLandScape(force: boolean): void;
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
     * 开始智能语音对话文本输入
     * 应在只能语音为开始状态下开始输入
     * @param text 输入的文本
     * @returns 返回对话 ID
     */
    aiDmTextInput(text: string): number;
    /**
     * 开始智能语音对话语音输入，自动请求录音权限
     * 应在只能语音为开始状态下开始输入
     * @returns 成功返回对话id，失败返回异常
     */
    startAiDmVoiceInput(): Promise<number>;
    /**
     * 停止智能语音输入，通知语音引擎当前用户输入对话结束
     * @returns 返回当前对话的id
     */
    stopAiDmVoiceInput(): number;
    /**
     * 发送文字消息给数据通道
     * 注意 云端应用要继承数据通道功能
     * > V3.2.314 版本对应服务器版本和数据通道版本为 3.2.5.1 及以上
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
    resetAppMouseLockState(): void;
    /**
     * 采集一帧图像
     * @params data: any 抛出采集事件时抛出的附加data，比如采集的时间戳
     * @params option:  { width: number, height: number } 截图的宽高，如果未设置则使用云端应用窗口的宽高
     * @return { data: any, base64: base64string } 返回传入的 data 和采集的 base64 字符串
     */
    captrueFrame(data: any, option?: {
        width: number;
        height: number;
    } | null | undefined): {
        data: any;
        base64: any;
    };
    /**
     * 操作相关事件
     * 所有事件坐标相对于云端应用，不相对于网页
     * CloudLark.IClientInput 是所有操作指令接口对象的合集
     * 可以单独使用下面 moseMove 等接口
     * @param input 操作指令
     */
    sendInput(input: CloudLark.IClientInput): void;
    /**
     * 向云端发送鼠标移动事件
     * 事件坐标相对于云端应用，不相对于网页
     * 计算方式可以参考  https://github.com/pingxingyun/lark_sr_websdk_demos 例子中 v_cursor.vue getVMouseTouchPosition 方法
     * 原理是通过 LarkSR 对象的成员 screenState.operateScale 获取相对的缩放，
     * 本地坐标 X larksr.screenState.operateScale.scaleX / scaleY 即可得到相对云端的坐标
     *
     * @param PosX 相对云端鼠标 X 点坐标
     * @param PosY 相对云端鼠标 Y 点坐标
     * @param DeltaX 相对云端鼠标 X 轴移动距离
     * @param DeltaY 相对云端鼠标 X 轴移动距离
     */
    mouseMove(PosX: number, PosY: number, DeltaX: number, DeltaY: number): void;
    /**
     * 向云端发送鼠标移动事件
     * 事件坐标相对于云端应用，不相对于网页
     * 计算方式可以参考  https://github.com/pingxingyun/lark_sr_websdk_demos 例子中 v_cursor.vue getVMouseTouchPosition 方法
     * 原理是通过 LarkSR 对象的成员 screenState.operateScale 获取相对的缩放，
     * 本地坐标 X larksr.screenState.operateScale.scaleX / scaleY 即可得到相对云端的坐标
     *
     * @param PosX 相对云端鼠标 X 点坐标
     * @param PosY 相对云端鼠标 Y 点坐标
     * @param DeltaX 相对云端鼠标 X 轴移动距离
     * @param DeltaY 相对云端鼠标 X 轴移动距离
     */
    moseMove(PosX: number, PosY: number, DeltaX: number, DeltaY: number): void;
    /**
     * 向云端发送鼠标单击事件
     * X Y 坐标计算方式同 mouseMove
     *
     * @param PosX 相对云端鼠标 X 点坐标
     * @param PosY 相对云端鼠标 Y 点坐标
     * @param key  LEFT = 0,RIGHT = 1, MIDDLE = 2
     */
    mouseTap(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
    /**
     * 向云端发送鼠标按下事件
     * X Y 坐标计算方式同 mouseMove
     *
     * @param PosX 相对云端鼠标 X 点坐标
     * @param PosY 相对云端鼠标 Y 点坐标
     * @param key  LEFT = 0,RIGHT = 1, MIDDLE = 2
     */
    mouseDown(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
    /**
     * 向云端发送鼠标抬起事件
     * X Y 坐标计算方式同 mouseMove
     *
     * @param PosX 相对云端鼠标 X 点坐标
     * @param PosY 相对云端鼠标 Y 点坐标
     * @param key  LEFT = 0,RIGHT = 1, MIDDLE = 2
     */
    mouseUp(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
    /**
     * 向云端发送鼠标滚轮事件
     * X Y 坐标计算方式同 mouseMove
     *
     * @param PosX 相对云端鼠标 X 点坐标
     * @param PosY 相对云端鼠标 Y 点坐标
     * @param Delata  120/-120 鼠标滚轮滚动的数值
     */
    mouseWheel(PosX: number, PosY: number, Delata: number): void;
    /**
     * 向云端发送键盘按键按下事件
     * @param key KeyboardEvent.code 字段，具体内容参考 Chrome https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
     * @param isRepeat KeyboardEvent.repeat 字段，参考https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat
     * @returns 是否发送成功，如果key参数传递错误可能发送失败
     */
    keyDown(key: string, isRepeat: boolean): void;
    /**
     * 向云端发送键盘按键抬起事件
     * @param key KeyboardEvent.code 字段，具体内容参考 Chrome https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
     * @returns 是否发送成功，如果key参数传递错误可能发送失败
     */
    keyUp(key: string): void;
    /**
     * 手柄接口消息按照 windows xbox 360 手柄标准定义，即包含 xbox 360 手柄的功能，如按钮，摇杆，扳机键。windows 上最多支持4个手柄，
     * 当前版本服务端只处理1个手柄，后续会放开多个手柄的支持。接口中发送的按键值为对应的 windows 中定义的按键值。
     * 向云端发送手柄按钮按下事件
     * 參考 js 中获取手柄事件，参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
     * @param userIndex 手柄的索引,硬件设备索引 0-3. 第一个连接的手柄为0，第二个为1，以此类推。
     * @param button 按鍵 @see https://docs.microsoft.com/en-us/windows/win32/api/xinput/ns-xinput-xinput_gamepad
     * export const enum XINPUT_BUTTONS {
     *       XINPUT_GAMEPAD_DPAD_UP        = 0x0001,
     *       XINPUT_GAMEPAD_DPAD_DOWN      = 0x0002,
     *       XINPUT_GAMEPAD_DPAD_LEFT      = 0x0004,
     *       XINPUT_GAMEPAD_DPAD_RIGHT     = 0x0008,
     *       XINPUT_GAMEPAD_START          = 0x0010,
     *       XINPUT_GAMEPAD_BACK           = 0x0020,
     *       XINPUT_GAMEPAD_LEFT_THUMB     = 0x0040,
     *       XINPUT_GAMEPAD_RIGHT_THUMB    = 0x0080,
     *       XINPUT_GAMEPAD_LEFT_SHOULDER  = 0x0100,
     *       XINPUT_GAMEPAD_RIGHT_SHOULDER = 0x0200,
     *       XINPUT_GAMEPAD_A              = 0x1000,
     *       XINPUT_GAMEPAD_B              = 0x2000,
     *       XINPUT_GAMEPAD_X              = 0x4000,
     *       XINPUT_GAMEPAD_Y              = 0x8000,
     *       XINPUT_UNKNOWN                = -1,
     *   }
     * @param isRepeat 是否重复按下
     * @returns
     */
    gamepadButtonDown(userIndex: number, button: number, isRepeat: boolean): void;
    /**
     * 向云端发送手柄按钮抬起事件
     * 參考 https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
     * @param userIndex 手柄的索引
     * @param button 按鍵
     * @returns
     */
    gamepadButtonUp(userIndex: number, button: number): void;
    /**
     * 向云端发送手柄按trigger键事件
     * 參考 https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
     * @param userIndex 手柄的索引
     * @param isleft 是否是左trigger
     * @param value trigger的值 扳机键的值 0-255
     * @returns
     */
    gamepadTrigger(userIndex: number, isleft: boolean, value: number): void;
    /**
     * 向云端发送手柄按摇杆的值，即 axes 值
     * win      MAX
     *           |
     *  MIN-------------MAX
     *          |
     *         MIN
     * js 中获取硬件手柄參考 https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
     * @param userIndex 手柄的索引
     * @param thumblx 左摇杆 X 值，-32767 到 32767
     * @param thumbly 左摇杆 Y 值，-32767 到 32767
     * @param thumbrx 右摇杆 X 值，-32767 到 32767
     * @param thumbry 右摇杆 Y 值，-32767 到 32767
     * @returns
     */
    joystick(userIndex: number, thumblx: number, thumbly: number, thumbrx: number, thumbry: number): void;
    /**
     * 向云端发送触摸按下事件
     * 坐标位置与 mouseMove 相同，相对与云端的鼠标移动位置
     * @param id 手指的id,当前触摸事件按下手指的 id，同一个手指 id 相同。id 应每次触摸增加。即 touchdown 时 +1，
     * touch move 和 touch up 时保持。当前手指未离开，又有新的手指 touchdown 时再 +1 获得新的 id
     * @param x 相对云端的x轴坐标
     * @param y 相对云端的y轴坐标
     * @returns
     */
    touchDown(id: number, x: number, y: number): void;
    /**
     * 向云端发送触摸移动事件
     * 坐标位置与 mouseMove 相同，相对与云端的鼠标移动位置
     * @param id 手指的id
     * @param x 相对云端的x轴坐标
     * @param y 相对云端的y轴坐标
     * @returns
     */
    touchMove(id: number, x: number, y: number): void;
    /**
     * 向云端发送触摸抬起事件
     * 坐标位置与 mouseMove 相同，相对与云端的鼠标移动位置
     * @param id 手指的id
     * @param x 相对云端的x轴坐标
     * @param y 相对云端的y轴坐标
     * @returns
     */
    touchUp(id: number, x: number, y: number): void;
    /**
     * 字符串转换为输入的鼠标按键值
     * @param button 'left' | 'mid' | 'right'
     * @returns  LEFT = 0,RIGHT = 1,MIDDLE = 2
     */
    getMouseButtonType(button: 'left' | 'mid' | 'right'): CloudLark.MouseKey;
    /**
     * 媒体采集相关
     */
    /**
     * 设置当前已开启的音频track是否启用状态
     * @param enable 是否启用
     * @returns
     */
    setAudioEnable(enable: boolean): any;
    /**
     * 设置当前已开启的视频track是否启用状态
     * @param enable 是否启用
     * @returns
     */
    setVideoEnable(enable: boolean): any;
    setShareEnable(enable: boolean): any;
    /**
     * 停止本地音频轨道
     * @returns
     */
    stopLocalAudio(): any;
    /**
     * 停止本地已打开的视频轨道
     * @returns
     */
    stopLocalVideo(): any;
    /**
     * 停止本地共享轨道
     * @returns
     */
    stopLocalShare(): any;
    /**
     * 暂停发送音频
     * @returns
     */
    pauseAudioSending(): any;
    /**
     * 恢复发送音频
     * @returns
     */
    resumeAudioSending(): any;
    /**
     * 暂停发送视频
     * @returns
     */
    pauseVideoSending(): any;
    /**
     * 恢复发送视频
     * @returns
     */
    resumeVideoSending(): any;
    /**
     * 关闭当前的音频设备
     * @returns
     */
    closeAudio(): any;
    /**
     * 关闭当前已打开的视频设备
     * @returns
     */
    closeVideo(): any;
    /**
     * 关闭当前已打开的共享设备如共享的标签页等
     * @returns
     */
    closeShare(): any;
    /**
     * 关闭整个媒体上传连接。再次使用时重新打开。
     * @returns
     */
    closeMediaChannel(): void;
    /**
     * 打开一个音频设备，要注意浏览器限制在 https 或者 localhost 下才能打开音频
     * @param deviceId 音频设备id，如果不传将打开默认设备。@see getConnectedAudioinputDevices
     * @returns Promise
     */
    openAudio(deviceId?: string): Promise<any>;
    /**
     * 打开一个视频设备，要注意浏览器限制在 https 或者 localhost 下才能打开视频
     * @param audio boolean 是否同时开启音频
     * @param cameraId 视频设备id，如果不传将打开默认设备。@see getConnectedVideoinputDevices
     * @returns Promise
     */
    openVideo(audio?: boolean, cameraId?: string, width?: number, height?: number, front?: boolean): Promise<any>;
    /**
     * 打开默认媒体设备，要注意浏览器限制在 https 或者 localhost 下
     * 如果需要指定特殊的媒体设备请单独使用 @see openAudio @see openVideo
     * @param video 是否包含视频
     * @param audio 是否包含音频
     * @returns Promise
     */
    openDefaultMedia(video?: boolean, audio?: boolean): Promise<any>;
    /**
     * 打开共享设备，浏览器可共享窗口，标签页等
     * @returns Promise
     */
    openShareMediaDevice(): Promise<any>;
    /**
     * 返回已连接的音频设备列表，设备列表中的设备的 deviceId 可用来打开某个音频设备
     * @returns Promise<MediaDeviceInfo[]>
     */
    getConnectedAudioinputDevices(): Promise<any>;
    getConnectedAudioOutputDevices(): Promise<any>;
    /**
     * 返回已连接的视频设备
     * @returns Promise<MediaDeviceInfo[]>
     */
    getConnectedVideoinputDevices(): Promise<any>;
    /**
     * 获取所有连接的摄像头麦克风设备信息
     * @param type *"audioinput" | "audiooutput" | "videoinput"*
     * @returns Promise<MediaDeviceInfo[]>
     */
    getConnectedDevices(type: MediaDeviceKind): Promise<any>;
    /**
     * 打开麦克风设备
     * @param deviceId 麦克风设备 ID， @see getConnectedAudioOutputDevices
     * @param kind “audioinput”
     * @returns @see this.openUserMedia
     */
    openAudioDevice(deviceId: string, kind?: "audioinput" | "audiooutput"): Promise<any>;
    /**
     * 打开摄像头设备
     * @param cameraId 摄像头设备ID，@see getConnectedVideoinputDevices
     * @param minWidth 限制打开设备的宽
     * @param minHeight 限制打开设备的高
     * @returns @see openUserMedia
     */
    openCamera(cameraId: string, minWidth?: number, minHeight?: number, audio?: boolean, front?: boolean): Promise<any>;
    /**
     * 请求浏览器打开媒体并且打开上传到服务器通道。
     * 要注意的是在服务器连接成功之后请求打开
     * @param constraints 参考 navigator.mediaDevices.getUserMedia(constraints)
     * @param reset 是否重制媒体通道。true 的情况下重制整个 peerconnection
     * @returns 打开的通道的绑定信息。管理媒体通道如关闭暂停或恢复使用。
     */
    openUserMedia(constraints?: MediaStreamConstraints, reset?: boolean): Promise<any>;
    openUserMeida(constraints?: MediaStreamConstraints, reset?: boolean): Promise<any>;
    /**
     * 添加媒体轨道
     * 一般情况下使用 @see openUserMedia
     * @param track
     * @param streams
     * @returns
     */
    addMediaTrack(track: MediaStreamTrack, ...streams: MediaStream[]): boolean | undefined;
    /**
     * 移除某个媒体轨道。一般为  openUserMedia 打开的通道。
     * 一般使用 @see closeVideo closeAudio 或 @see pauseAudioSending pauseVideoSending
     * @param track @see openUserMedia 返回值
     * @returns
     */
    removeMediaTrack(track: RTCRtpSender): any;
    /**
     * 请求媒体设备权限，相当于 navigator.mediaDevices.getUserMedia(constraints)
     * @param constraints
     * @returns
     */
    requestUserMediaPermission(constraints?: MediaStreamConstraints): any;
    /**
     * 启动云端推流功能
     * @param params {
     *  // rtmp push url 必须填
     *  path: "",
     *  //rtmp push key
     *  key: "",
     *  // 推流的宽
     *  width: 1280,
     *  // 推流的高
     *  height: 720,
     *  framerate: 30,
     *  // kbps
     *  bitrate: 1024 * 2,
     *  // 是否支持断线重连
     *  reconnect: true,
     *  //最大重连次数
     *  reconnectRetries: 3,
     *  //是否串流麦克风(语音输入支持的情况)
     *  voice: audioInput,
     * }
     * @returns Promise
     */
    StartCloudLiveStreaming(params: CloudLark.IRtmp_Start): Promise<void> | undefined;
    /**
     * 关闭云端推流功能
     * @returns
     */
    StopLiveStreaming(): void | undefined;
    /**
     * 获取当前服务器应用手柄配置
     * @param appliId 应用id，传空为当前应用
     * @returns
     */
    getTouchCtrMapping(appliId?: string): Promise<unknown>;
    $emit(type: LarkEventType, data?: any, message?: string): void;
    $emitError(message?: string, code?: number): void;
    $emitInfo(message?: string, code?: number): void;
    private createEvent;
    private setupListener;
    private taskProcess;
    private startProcess;
    private onAppStateChange;
    private onRTCRetrySuccess;
    private onGotRemoteStream;
    private onGotRemoteAudioStream;
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
    private setCanvasMode;
}
export { LarkSR, ILarkSRConfig, PlayerModeType, UserType, LarkSREvent, LarkEventType, LarkSRClientEvent, AppliParams, AppliParamsUtils, LoadAppliParamsFromUrl, LoadAppliParamsStartAppInfo, EventBase, API, Operation, Capabilities, ScaleMode, VirtualKey, KEYMAP, CloudLark, FullScreen, LockPointer, Recorder, GESTURE_TYPE, };
