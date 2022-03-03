import ScaleMode from './utils/scale_mode';
import { StartAppInfo } from './api';
import { ILarkSRConfig } from './larksr';
export interface IAppliParams {
    /**
     * appserver 的ip地址
     */
    appServer: string;
    /**
     * appserver 的端口号
     */
    appPort: string;
    /**
     * appli type
     */
    appliType: number;
    /**
     * 是否使用 websocket 代理
     */
    wsProxy: boolean;
    /**
     * 优先使用的外网ip. 用在webrtc ice处替换为高优先级的ip
     */
    preferPubOutIp: string;
    /**
     * taskid
     */
    taskid: string;
    /**
     * 当前应用名称
     */
    appliName: string;
    /**
     * @deprecated
     * 应用的宽高。现在云端自动获取宽高
     */
    width: number;
    /**
     * @deprecated
     * 应用的宽高。现在云端自动获取宽高
     */
    height: number;
    /**
     * 缩放模式
     */
    scaleMode: ScaleMode;
    /**
     * 日志级别
     * @default 'warn'
     */
    logLevel: 'info' | 'warn' | 'error';
    /**
     * 无操作时间。超时断开连接.
     */
    noOperationTimeout: number;
    /**
     * 是否显示右下角的水印。
     */
    waterMark: boolean;
    /**
     * 检测的rtt值，rtt超过该值将提示用户网络环境差
     */
    rttLimit: number;
    /**
     * 检测的丢包率。丢包率超过该值提示用户网络环境差
     */
    packetLostLimit: number;
    /**
     * 丢包率和rtt提示的时间间隔。
     */
    rttLimitInterval: number;
    /**
     * 码率. 用在在创建 webrtc sdp时替换为此码率。
     */
    codeRate: number;
    /**
     * audio code rate
     * https://stackoverflow.com/questions/33649283/how-to-set-up-sdp-for-high-quality-opus-audio
     * a=fmtp:111 minptime=10;useinbandfec=1; stereo=1; maxaveragebitrate=510000
     */
    audioCodeRate: number;
    /**
     * 帧率，在登录task时传给后端。
     */
    frameRate: number;
    /**
     * 网络状态，影响 webrtc offer 创建时最低码率。
     */
    network: 'local' | 'public';
    /**
     * 使用的语言，目前只支持英语和中文。
     */
    language: string;
    /**
     * 初始的鼠标锁定模式
     * false：非锁定模式
     * true：锁定模式
     */
    initCursorMode: boolean;
    /**
     * 背景颜色
     */
    bgColor: string;
    /**
     * 全屏模式
     *  0 -》 用户手动触发
     *  1 -》 首次点击进入触发
     *  2 -》 每次点击触发
     */
    fullScreenMode: number;
    /**
     * 手机端全屏模式
     *  0 -》 用户手动触发
     *  1 -》 首次点击进入触发
     *  2 -》 每次点击触发
     */
    mobileFullScreenMode: number;
    /**
     * 一人操作多人看 0 普通模式 1 交互模式（可以一人操作多人看）
     * 2 多人互动模式，鼠标键盘都放开
     */
    playerMode: number;
    /**
     * 用户类型 number
     * 所有者:1  观察者:0;
     */
    userType: number;
    /**
     * 用户昵称
     */
    nickname: string;
    /**
     * 口令:8位唯一码,写入TaskInfo. 房间code，备用。
     */
    roomCode: string;
    /**
     * debug task. 跳过task检测
     */
    debugTask: boolean;
    /**
     * debug webserver
     */
    debugWebServer: string;
    /**
     * laoding timeout
     * 5 * 60
     */
    loadingTimeout: number;
    /**
     * share url
     */
    shareUrl: boolean;
    /**
     * 是否强制横屏
     */
    mobileForceLandscape: boolean;
    /**
     * 移动端初始化初始化是否显示手柄
     */
    mobileVirtualJoystick: boolean;
    /**
     * mouseZoomDirection
     * 用于移动端捏合缩放操作与应用鼠标缩放的对应关系
     * 1:鼠标滚轮向上为放大，
     * 0:鼠标滚轮向下为放大(default)
     */
    mouseZoomDirection: number;
    /**
     * 初始是否显示玩家列表
     */
    showPlayerList: boolean;
    /**
     * 优先使用的解码器
     */
    perferDecoder: 'auto' | 'vp8' | 'vp9' | 'h264' | 'av1x';
    /**
     * 触摸操作对应的操作方式，触摸屏还是鼠标
     */
    touchOperateMode: 'touchScreen' | 'mouse';
    /**
     * appid
     */
    appliId: string;
    /**
     *
     */
    syncLocalToCloudClipboard: boolean;
    enableRttIcon: boolean;
    enableSoundRequire: boolean;
    toastLevel: number;
    appKey: string;
    groupId: string;
}
export declare enum AppliType {
    DESKTOP = 1,
    SHARED = 2,
    PIXEL_STREAMING = 13,
    VR = 3,
    VR_STEAM = 5,
    NV_VR = 6,
    XR = 7,
    PXY_AR = 9,
    NV_AR = 11
}
export declare class AppliParams implements IAppliParams {
    appServer: string;
    appPort: string;
    appliType: AppliType;
    wsProxy: boolean;
    preferPubOutIp: string;
    taskid: string;
    appliName: string;
    width: number;
    height: number;
    scaleMode: ScaleMode;
    logLevel: 'info' | 'warn' | 'error';
    noOperationTimeout: number;
    waterMark: boolean;
    rttLimit: number;
    packetLostLimit: number;
    rttLimitInterval: number;
    codeRate: number;
    audioCodeRate: number;
    frameRate: number;
    network: 'local' | 'public';
    language: string;
    initCursorMode: boolean;
    bgColor: string;
    fullScreenMode: number;
    mobileFullScreenMode: number;
    playerMode: number;
    userType: number;
    nickname: string;
    roomCode: string;
    debugTask: boolean;
    debugWebServer: string;
    loadingTimeout: number;
    shareUrl: boolean;
    mobileForceLandscape: boolean;
    mobileVirtualJoystick: boolean;
    mouseZoomDirection: number;
    showPlayerList: boolean;
    perferDecoder: 'auto' | 'vp8' | 'vp9' | 'h264' | 'av1x';
    touchOperateMode: 'touchScreen' | 'mouse';
    appliId: string;
    syncLocalToCloudClipboard: boolean;
    enableRttIcon: boolean;
    enableSoundRequire: boolean;
    toastLevel: number;
    appKey: string;
    groupId: string;
    static copyAndCreate(params?: IAppliParams): AppliParams;
    static setUpWithSDKConfig(params: IAppliParams, config: ILarkSRConfig): AppliParams;
}
export declare function CreateAppliParams(): IAppliParams;
export declare class AppliParamsUtils {
    static getScaleMode(init: number | null | undefined): string;
    static getNetwork(init: number | null | undefined): 'local' | 'public';
    static getLogLevel(level: string | null | undefined): 'info' | 'warn';
    static getBoolOption(option: string | null | undefined | boolean, emptyValue?: boolean): boolean;
    static getNumberBoolOption(option: string | null | undefined | number, emptyValue?: boolean): boolean;
    static getStringOption(option: string | null | undefined, emptyValue?: string): string;
    static getIntOption(option: string | null | undefined, emptyValue?: number): number;
    static getBgColor(option: string | null | undefined): string;
}
/**
 * WARNING 服务器端返回数据随机性较大，统一在该函数里做兼容处理
 * 服务器端可能随意修改字段名称或值，需要注意测试
 * @param startAppInfo
 * @returns
 */
export declare function LoadAppliParamsFromUrl(): IAppliParams;
/**
 * WARNING 服务器端返回数据随机性较大，统一在该函数里做兼容处理
 * 服务器端可能随意修改字段名称或值，需要注意测试
 * @param startAppInfo
 * @returns
 */
export declare function LoadAppliParamsStartAppInfo(startAppInfo: StartAppInfo): IAppliParams;
