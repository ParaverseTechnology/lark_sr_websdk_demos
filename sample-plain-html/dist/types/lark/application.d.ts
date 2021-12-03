import { EventBase, LocalEvent } from '../event/event_base';
import * as Msg from '../protobuf/cloudlark';
import WebSocektChannel from './websocket_channel';
import WebsocketProxy from './websocket_proxy';
import { LarkSR } from '../larksr';
export declare enum APP_STATE {
    BEFORE_CREATE = 0,
    INITED = 1,
    WEBSOCKET_CHANNEL_OPEN = 2,
    LOGIN_SUCCESS = 3,
    RTC_CONNECTED = 4,
    MEDIA_LOADED = 5,
    MEDIA_PLAED = 6,
    RTC_RETRY = 7,
    APP_RETRY = 8,
    BEFORE_DESTORY = 9,
    WEBSOCKET_CLOSED = 10,
    RTC_CLOSED = 11,
    DESTROYED = 12
}
export declare enum APP_EVENT_TYPE {
    CONNECT = 0,
    LOGIN = 1,
    ERROR = 2,
    INFO = 3,
    APP_CLOSE = 4,
    REMOTE_STREAM = 5,
    SYNC_CURSORSTYLE = 6,
    APP_STATE_CHANGE = 7,
    NET_STATE = 8,
    LK_APP_RESIZE = 9,
    LK_APP_MOUSE_MODE = 10,
    LK_APP_PLAER_LIST = 11,
    LK_APP_REQUEST_TEXT = 12,
    LK_DATA_CHANNEL_RENDERSERVER_TEXT_MESSAGE = 13,
    LK_DATA_CHANNEL_RENDERSERVER_BINARY_MESSAGE = 14,
    LK_DATA_CHANNEL_RENDERSERVER_OPEN = 15,
    LK_DATA_CHANNEL_RENDERSERVER_CLOSE = 16
}
export interface AppEvent extends LocalEvent<APP_EVENT_TYPE> {
    data?: any;
    state: APP_STATE;
}
export default class Application extends EventBase<APP_EVENT_TYPE, AppEvent> {
    private websocketChannel;
    private websocketProxy;
    private peerConnection;
    get state(): APP_STATE;
    set state(state: APP_STATE);
    private _state;
    private retryTime;
    private larksr;
    constructor(larksr: LarkSR);
    init(): void;
    initPc(): void;
    releasePc(): void;
    clear(): void;
    changeOperater(uid: number): void;
    inputText(text: string): void;
    sendTextToDataChannel(text: string): void;
    sendBinaryToDataChannel(binary: Uint8Array): void;
    start(): Promise<void>;
    connect(): Promise<WebsocketProxy> | Promise<WebSocektChannel> | undefined;
    disConnect(): void;
    closeRtc(): void;
    versionCheck(): void;
    task(): void;
    startSteam(): void;
    startMonitorSteam(): void;
    restart(): void;
    restartApp(): void;
    rtcOffer(): void;
    setAnswer(sdp: string): void;
    setIce(candidate: string): void;
    sendInput(input: Msg.CloudLark.ClientInput): void;
    private onChannelOpen;
    private onClose;
    private onChannelMsg;
    private onVersionCheckResponse;
    private onTaskResponse;
    private onStartStreamResponse;
    private onStartMonitorResponse;
    private onWebRtcOfferAnswer;
    private onWebRtcIcecandidate;
    private onWebRtcError;
    private onAppProcess;
    private onLogout;
    private onLocalSdp;
    private onLoacalIce;
    private onRemoteStream;
    private onRtcError;
    private onIceStateChange;
    retryPeerconnection(): void;
    private onPeerConnectionDisconnect;
    private onBadNetwork;
    private onCursorStyle;
    private onAppResize;
    private onAppMouseMode;
    private onAppPlayerList;
    private onAppRequestText;
    private onDataChannelText;
    private onDataChannelBinary;
    private onDataChannelOpen;
    private onDataChannelClose;
    private onPeerConnectionState;
    appStateChange(state: APP_STATE): void;
    private infoMsg;
    private errorMsg;
    private toastMsg;
    private $emit;
    private createAppEvent;
}
