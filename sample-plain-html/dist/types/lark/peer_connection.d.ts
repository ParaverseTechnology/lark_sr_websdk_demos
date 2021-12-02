import { EventBase, LocalEvent } from '../event/event_base';
import * as Input from '../protobuf/cloudlark';
import { LarkSR } from '../larksr';
export declare enum IceState {
    DISCONNECT = 1,
    BAD = 2,
    CONNECT = 3,
    GOOD = 4
}
export declare enum WEBRTC_EVENT_TYPE {
    GOT_REMOTE_STREAM = 0,
    ICE_STATE_CHANGE = 1,
    LK_APP_RESIZE = 2,
    LK_APP_MOUSE_MODE = 3,
    LK_APP_PLAER_LIST = 4,
    LK_APP_REQUEST_TEXT = 5,
    LK_DATA_CHANNEL_RENDERSERVER_TEXT_MESSAGE = 6,
    LK_DATA_CHANNEL_RENDERSERVER_BINARY_MESSAGE = 7,
    LK_DATA_CHANNEL_RENDERSERVER_OPEN = 8,
    LK_DATA_CHANNEL_RENDERSERVER_CLOSE = 9,
    NET_STATE = 10,
    SYNC_CURSORSTYLE = 11,
    BAD_NETWORK = 12,
    ERROR = 13,
    RTC_SDP = 14,
    RTC_ICECANDIDATE = 15
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
}
export default class PeerConnection extends EventBase<WEBRTC_EVENT_TYPE, WebRTCEvent> {
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
    constructor(larksr: LarkSR, config: WebRTCConfig);
    create(): void;
    createOffer(): void;
    close(): void;
    onRemoteDescription(des: RTCSessionDescriptionInit): void;
    onReceiveCandidate(candateInit: RTCIceCandidateInit | null): void;
    startNetTest(): void;
    stopNetTest(): void;
    sendInput(input: Input.CloudLark.ClientInput): void;
    sendBuffer(buffer: ArrayBuffer): void;
    sendToAppTextMsg(msg: string): void;
    sendToAppBinaryMsg(binary: Uint8Array): void;
    changeOperater(uid: number): void;
    inputText(txt: string): void;
    private getStats;
    private getStateChrome;
    private onBadNetWork;
    private onDataChannelMessage;
    private onCreateOfferSuccess;
    private onIceCandidate;
    private onIceStateChange;
    private gotRemoteStream;
    private addIceCandidate;
    private iceStateChange;
    private $emit;
    private createEvent;
}
