import { EventBase, LocalEvent } from '../event/event_base';
import * as Input from '../protobuf/cloudlark';
import { LarkSR } from '../larksr';
import { MediaShareInterface, RTCMediaTrackBinding } from './media_share_interface';
import { CloudLark } from '@/protobuf/cloudlark';
import WebCodec from './webcodec';
export declare enum IceState {
    DISCONNECT = 1,
    BAD = 2,
    CONNECT = 3,
    GOOD = 4
}
export declare enum WEBRTC_EVENT_TYPE {
    GOT_REMOTE_STREAM = 0,
    GOT_REMOTE_AUDIO_STREAM = 1,
    ICE_STATE_CHANGE = 2,
    LK_APP_RESIZE = 3,
    LK_APP_MOUSE_MODE = 4,
    LK_APP_PLAER_LIST = 5,
    LK_APP_REQUEST_TEXT = 6,
    LK_DATA_CHANNEL_RENDERSERVER_TEXT_MESSAGE = 7,
    LK_DATA_CHANNEL_RENDERSERVER_BINARY_MESSAGE = 8,
    LK_DATA_CHANNEL_RENDERSERVER_OPEN = 9,
    LK_DATA_CHANNEL_RENDERSERVER_CLOSE = 10,
    LK_RTC_EVENT_PEERCONNECTION_STATE = 11,
    NET_STATE = 12,
    SYNC_CURSORSTYLE = 13,
    BAD_NETWORK = 14,
    ERROR = 15,
    RTC_SDP = 16,
    RTC_ICECANDIDATE = 17,
    AI_VOICE_STATUS = 18,
    AI_VOICE_ASR_RESULT = 19,
    AI_VOICE_DM_RESULT = 20,
    AI_VOICE_ERROR = 21,
    RTMP_STREAM_STATE = 22,
    RTMP_STREAM_ERROR = 23,
    INFO = 24,
    AerialViewStatus = 25,
    AerialViewScreen = 26,
    VideoFrame = 27,
    TooltipInfo = 28
}
export interface GoogleBitRate {
    start: number;
    min: number;
    max: number;
}
export interface WebRTCEvent extends LocalEvent<WEBRTC_EVENT_TYPE> {
    data?: any;
}
export declare enum OfferModeType {
    VP8 = 1,
    VP9 = 2,
    H264 = 3,
    DEFAULT = 4
}
export interface WebRTCConfig {
    serverIP: string;
    preferPubOutIp: string;
    codeRate?: number;
    network: 'local' | 'public';
}
export interface AggregatedStats {
    timestamp: number;
    bytesReceived: number;
    framesDecoded: number;
    packetsLost: number;
    bytesReceivedStart: number;
    framesDecodedStart: number;
    timestampStart: number;
    bitrate: number;
    lowBitrate: number;
    highBitrate: number;
    avgBitrate: number;
    framerate: number;
    lowFramerate: number;
    highFramerate: number;
    avgframerate: number;
    framesDropped: number;
    framesReceived: number;
    framesDroppedPercentage: number;
    frameHeight: number;
    frameWidth: number;
    frameHeightStart: number;
    frameWidthStart: number;
    currentRoundTripTime: number;
    packetsLostPerc: number;
    avgDecodeDelay: number;
    avgProcessDelay: number;
    serverStatics: Input.CloudLark.IServerStatics | null;
}
export default class PeerConnection extends EventBase<WEBRTC_EVENT_TYPE, WebRTCEvent> implements MediaShareInterface {
    private config;
    private pc;
    private dataChannel;
    private offerOptions;
    private pcConfig;
    private netTestTimeout;
    private aggregatedStats;
    private lastThrowBadNetork;
    private lastPacktetsLost;
    private lastPacktetsReceived;
    private larksr;
    private audioStream;
    private videoStream;
    get audioDeviceId(): string | undefined;
    get audioTrack(): MediaStreamTrack | undefined;
    get videoDeviceId(): string | undefined;
    get videoTrack(): MediaStreamTrack | undefined;
    get audioPaused(): boolean;
    get videoPaused(): boolean;
    private audioBinding;
    private videoBinding;
    private readonly sendStream;
    private sdpCreateSuccess;
    private canvasRender;
    get serverFeatures(): CloudLark.INotifyFeatures | null;
    private _serverFeatures;
    get serverStatics(): CloudLark.IServerStatics | null;
    private _serverStatics;
    get currentAppSize(): CloudLark.IAppResize | null;
    private _currentAppSize;
    private webcodec;
    constructor(larksr: LarkSR, config: WebRTCConfig, webcodec: WebCodec);
    create(streams?: MediaStream | undefined | null, config?: CloudLark.IRTCConfiguration | null | undefined): Promise<void>;
    createOffer(): void;
    close(): void;
    setAudioEnable(enable: boolean): void;
    setVideoEnable(enable: boolean): void;
    setShareEnable(enable: boolean): void;
    stopLocalAudio(): void;
    stopLocalVideo(): void;
    stopLocalShare(): void;
    pauseAudioSending(): false | undefined;
    resumeAudioSending(): false | undefined;
    pauseVideoSending(): false | undefined;
    resumeVideoSending(): false | undefined;
    closeAudio(): false | undefined;
    closeVideo(): false | undefined;
    closeShare(): false | undefined;
    private stopLocalTrackBing;
    openAudio(deviceId?: string): Promise<{
        streams: MediaStream;
        rtcRtpSenders: RTCMediaTrackBinding[];
    }>;
    openVideo(audio?: boolean, cameraId?: string, width?: number, height?: number, front?: boolean): Promise<{
        streams: MediaStream;
        rtcRtpSenders: RTCMediaTrackBinding[];
    }>;
    openDefaultMedia(video?: boolean, audio?: boolean): Promise<{
        streams: MediaStream;
        rtcRtpSenders: RTCMediaTrackBinding[];
    }>;
    openShareMediaDevice(): Promise<void>;
    getConnectedAudioinputDevices(): Promise<MediaDeviceInfo[]>;
    getConnectedAudioOutputDevices(): Promise<MediaDeviceInfo[]>;
    getConnectedVideoinputDevices(): Promise<MediaDeviceInfo[]>;
    getConnectedDevices(type: MediaDeviceKind): Promise<MediaDeviceInfo[]>;
    openAudioDevice(deviceId: string, kind?: "audioinput" | "audiooutput"): Promise<{
        streams: MediaStream;
        rtcRtpSenders: RTCMediaTrackBinding[];
    }>;
    openCamera(cameraId: string, width?: number, height?: number, audio?: boolean, front?: boolean): Promise<{
        streams: MediaStream;
        rtcRtpSenders: RTCMediaTrackBinding[];
    }>;
    openUserMeida(constraints?: MediaStreamConstraints, reset?: boolean): Promise<{
        streams: MediaStream;
        rtcRtpSenders: RTCMediaTrackBinding[];
    }>;
    private resumeOrCreateBinding;
    addMediaTrack(track: MediaStreamTrack, ...streams: MediaStream[]): boolean;
    removeMediaTrack(track: RTCRtpSender): boolean;
    requestUserMediaPermission(constraints?: MediaStreamConstraints): Promise<unknown>;
    /**
     * 接收到sdp
     * @param des sdp
     */
    onRemoteDescription(des: RTCSessionDescriptionInit): void;
    onReceiveCandidate(candateInit: RTCIceCandidateInit): void;
    startNetTest(): void;
    stopNetTest(): void;
    sendInput(input: Input.CloudLark.ClientInput, needRemoteScreen?: boolean): void;
    sendBuffer(buffer: ArrayBuffer): void;
    sendToAppTextMsg(msg: string): void;
    sendToAppBinaryMsg(binary: Uint8Array): void;
    StartCloudLiveStreaming(params: Input.CloudLark.IRtmp_Start): Promise<void>;
    StopLiveStreaming(): void;
    changeOperater(uid: number): void;
    inputText(txt: string): void;
    private getStats;
    private getStateChrome;
    private onBadNetWork;
    private onDataChannelMessage;
    private onCreateOfferSuccess;
    private onIceCandidate;
    private onIceStateChange;
    private ontrack;
    private addIceCandidate;
    private iceStateChange;
    private $emit;
    private createEvent;
}
