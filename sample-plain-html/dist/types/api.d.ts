import { ILarkSRConfig } from './larksr';
import { AppliParams } from './appli_params';
export interface UTLockInfo {
    checkUtLockMessage: string;
    checkUtLockResult: boolean;
    remainMinutes: number;
}
export interface GetTaskResult {
    adminViewer: number;
    appKey: string;
    appliId: string;
    appliType: number;
    city: string;
    clientIp: string;
    country: string;
    createDate: string;
    dcs: number;
    limitMaxFps: number;
    offScreen: number;
    playerListToggle: number;
    playerMode: number;
    province: string;
    publicIp: string;
    reserveFlag: number;
    serverId: string;
    serverIp: string;
    shareUrl: string;
    startAt: string;
    startParam: string;
    startProcType: number;
    status: number;
    taskId: string;
    updateDate: string;
    useGamepad: number;
    wm: number;
}
export interface StartAppInfo {
    appliId: string;
    appliType: number;
    appliName: string;
    taskId: string;
    renderServerIp: string;
    wsProxy: string;
    preferPublicIp: string;
    renderServerPort: number;
    initCursorMode: number;
    rttLimit: string;
    touchOperateMode: string;
    fullScreenMode: number;
    mobileForceLandscape: number;
    mobileFullScreenMode: number;
    language: string;
    noOperationTimeout: string;
    serverId: string;
    network: string;
    playerListToggle: number;
    bgColor: string;
    logLevel: string;
    mobileVirtualJoystick: number;
    initWinSize: number;
    taskStatus: number;
    mouseZoomDirection: number;
    useGamepad: number;
    rttLimitInterval: string;
    playerMode?: number;
    userType?: number;
    roomCode?: string;
    nickName?: string;
    nickname?: string;
    appKey?: string;
    groupId?: string;
}
export default class API {
    static CheckUTLockInfoPath: string;
    static GetTaskPATH: string;
    static ClientLogErrorPath: string;
    static GetStartInfoPath: string;
    private static PocHostApplGetUrl;
    private static TaskInfoClientStartedPath;
    private static PortMappingListPath;
    static HostAppliGetUrl(params: {
        appliId: string;
        playerMode?: number;
        userType?: number;
        roomCode?: string;
        taskId?: string;
    }): Promise<{
        host: string;
        origin: string;
        params: {
            appliId: string;
            appKey: string;
            timestamp: string;
            signature: string;
        };
    }>;
    static GetStartInfo(serverAddress: string, params: {
        sdkId: string;
        appliId: string;
        playerMode?: number;
        userType?: number;
        roomCode?: string;
        taskId?: string;
        clientMac?: string;
        groupId?: string;
        regionId?: string;
        targetServerIp?: string;
        appKey?: string;
        timestamp?: string;
        signature?: string;
    }): Promise<StartAppInfo>;
    static CheckUTLockInfo(config: ILarkSRConfig): Promise<UTLockInfo>;
    static GetTask(config: ILarkSRConfig, taskid: string): Promise<GetTaskResult>;
    static LogError(errorCode: number, errorMsg: string, params: string, config: ILarkSRConfig): void;
    static ClientInfo(config: ILarkSRConfig, params: AppliParams): void;
    static TaskInfoClientStarted(config: ILarkSRConfig, params: AppliParams): void;
    static PortMappingList(config: ILarkSRConfig): Promise<unknown>;
    static joinParam(params: any): string;
}
