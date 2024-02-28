import { EventBase, LocalEvent } from '../event/event_base';
import * as Msg from '../protobuf/cloudlark';
import WebSocektChannel from './websocket_channel';
import WebsocketProxy from './websocket_proxy';
import { LarkSR } from '../larksr';
import PixelStreamingWebsocketChannel from './test_pixel_streaming';
import { RECORDER_STATE } from './recoder';
import PeerConnectionMediaShare from './peer_connection_media_share';
import WebCodec from './webcodec';
export declare enum APP_STATE {
    BEFORE_CREATE = 0,
    INITED = 1,
    WEBSOCKET_CHANNEL_OPEN = 2,
    LOGIN_SUCCESS = 3,
    RTC_CONNECTED = 4,
    MEDIA_LOADED = 5,
    MEDIA_PLAYED = 6,
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
    REMOTE_AUDIO_STREAM = 6,
    SYNC_CURSORSTYLE = 7,
    APP_STATE_CHANGE = 8,
    NET_STATE = 9,
    LK_APP_RESIZE = 10,
    LK_APP_MOUSE_MODE = 11,
    LK_APP_PLAER_LIST = 12,
    LK_APP_REQUEST_TEXT = 13,
    LK_DATA_CHANNEL_RENDERSERVER_TEXT_MESSAGE = 14,
    LK_DATA_CHANNEL_RENDERSERVER_BINARY_MESSAGE = 15,
    LK_DATA_CHANNEL_RENDERSERVER_OPEN = 16,
    LK_DATA_CHANNEL_RENDERSERVER_CLOSE = 17,
    AI_VOICE_STATUS = 18,
    AI_VOICE_ASR_RESULT = 19,
    AI_VOICE_DM_RESULT = 20,
    AI_VOICE_ERROR = 21,
    RTMP_STREAM_STATE = 22,
    RTMP_STREAM_ERROR = 23,
    RTC_RETRY_SUCCESS = 24,
    AerialViewStatus = 25,
    AerialViewScreen = 26
}
export interface AppEvent extends LocalEvent<APP_EVENT_TYPE> {
    data?: any;
    state: APP_STATE;
}
export default class Application extends EventBase<APP_EVENT_TYPE, AppEvent> {
    MAX_MEDIA_SHARE_PEERCONNECTION: number;
    private websocketChannel;
    private websocketProxy;
    private testPixelStreaming;
    private peerConnection;
    getMediaSharePeerConnection(index: number): PeerConnectionMediaShare;
    private mediaSharePeerConnectionImp;
    get peerConnectionCreated(): boolean;
    get state(): APP_STATE;
    set state(state: APP_STATE);
    private _state;
    get audioDeviceId(): string | null | undefined;
    get audioTrack(): MediaStreamTrack | null | undefined;
    get videoDeviceId(): string | null | undefined;
    get videoTrack(): MediaStreamTrack | null | undefined;
    get audioPaused(): boolean | undefined;
    get videoPaused(): boolean | undefined;
    get serverFeatures(): Msg.CloudLark.INotifyFeatures | null | undefined;
    get serverStatics(): Msg.CloudLark.IServerStatics | null | undefined;
    private get sharePeerConnection();
    private retryTime;
    private larksr;
    get voiceId(): number;
    get recodeState(): RECORDER_STATE;
    private recoder;
    private rtcConfig;
    get currentAppSize(): Msg.CloudLark.IAppResize | null | undefined;
    get webcodecDecoder(): WebCodec;
    private _webcodecDecoder;
    constructor(larksr: LarkSR);
    init(): void;
    initSharePc(): void;
    initPc(): void;
    releasePc(): void;
    releaseSharePc(): void;
    closeSharePc(): void;
    clear(): void;
    changeOperater(uid: number): void;
    inputText(text: string): void;
    sendTextToDataChannel(text: string): void;
    sendBinaryToDataChannel(binary: Uint8Array): void;
    sendReStartApplication(): void;
    sendApplicationSize(width: number, height: number): void;
    startAerialview(viewbox: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, interval: number | undefined, thumbnailWidth: 120, thumbnailHeight: 120): void;
    updateAerialview(viewbox: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    stopAerialview(): void;
    sendShowDebugLayout(open: boolean): void;
    sendVideoBitrateKbps(bitrateKbps: number): void;
    sendVideoFps(fps: number): void;
    aiDmTextInput(text: string): number;
    startAiDmVoiceInput(): Promise<number>;
    stopAiDmVoiceInput(): number;
    private onRecoderData;
    start(): Promise<void>;
    connect(): Promise<PixelStreamingWebsocketChannel> | Promise<WebsocketProxy> | Promise<WebSocektChannel> | undefined;
    sendKeepAlive(): void | undefined;
    disConnect(): void;
    closeRtc(): void;
    versionCheck(): void;
    task(): void;
    startSteam(): Promise<void>;
    startMonitorSteam(): void;
    restart(): void;
    restartApp(): void;
    rtcOffer(): Promise<void>;
    setAnswer(sdp: string): void;
    setIce(sdpMlineindex: number, sdpmid: string, candidate: string): void;
    sendInput(input: Msg.CloudLark.ClientInput, needRemoteScreen?: boolean): void;
    sendInputBuffer(buffer: ArrayBuffer): void;
    private sendToWebsocektChannelBuffer;
    private sendToWebsocektChannelMsg;
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
    private onAudioRemoteStream;
    private onRtcError;
    private onRtcInfo;
    private onRtmpStreamingState;
    private onRtmpStreamingError;
    private onIceStateChange;
    retryPeerconnection(): void;
    private onAerialViewStatus;
    private onAerialViewScreen;
    private onVideoFrame;
    private onShareMediaError;
    private onShareMediaInfo;
    private onShareMediaOffer;
    private onShareMediaIce;
    setAudioEnable(enable: boolean): any;
    setVideoEnable(enable: boolean): any;
    setShareEnable(enable: boolean): any;
    stopLocalAudio(): any;
    stopLocalVideo(): any;
    stopLocalShare(): any;
    pauseAudioSending(): any;
    resumeAudioSending(): any;
    pauseVideoSending(): any;
    resumeVideoSending(): any;
    closeAudio(): any;
    closeVideo(): any;
    closeShare(): any;
    openAudio(deviceId?: string): Promise<any>;
    openVideo(audio?: boolean, cameraId?: string, width?: number, height?: number, front?: boolean): Promise<any>;
    openDefaultMedia(video?: boolean, audio?: boolean): Promise<any>;
    openShareMediaDevice(): Promise<any>;
    getConnectedAudioinputDevices(): Promise<any>;
    getConnectedAudioOutputDevices(): Promise<any>;
    getConnectedVideoinputDevices(): Promise<any>;
    getConnectedDevices(type: MediaDeviceKind): Promise<any>;
    openAudioDevice(deviceId: string, kind?: "audioinput" | "audiooutput"): Promise<any>;
    openCamera(cameraId: string, minWidth?: number, minHeight?: number, audio?: boolean, front?: boolean): Promise<any>;
    openUserMeida(constraints?: MediaStreamConstraints, reset?: boolean): Promise<any>;
    addMediaTrack(track: MediaStreamTrack, ...streams: MediaStream[]): boolean | undefined;
    removeMediaTrack(track: RTCRtpSender): any;
    requestUserMediaPermission(constraints?: MediaStreamConstraints): any;
    StartCloudLiveStreaming(params: Msg.CloudLark.IRtmp_Start): Promise<void> | undefined;
    StopLiveStreaming(): void | undefined;
    private onPeerConnectionDisconnect;
    private onBadNetwork;
    private onPixelStreamingPlayerList;
    private onPixelStreamingDataChannelState;
    private onPixelStreamingDataChannelData;
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
    private onAiVoiceStatus;
    private onAiVoiceAsrResult;
    private onAiVoiceDMResult;
    private onAiVoiceError;
    appStateChange(state: APP_STATE): void;
    private infoMsg;
    private errorMsg;
    private toastMsg;
    private $emit;
    private createAppEvent;
}
