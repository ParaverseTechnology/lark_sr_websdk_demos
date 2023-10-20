import { EventBase, LocalEvent } from '../event/event_base';
import { LarkSR } from '../larksr';
import { MediaShareInterface, RTCMediaTrackBinding } from './media_share_interface';
import { CloudLark } from '@/protobuf/cloudlark';
import CanvasRender from './canvas_render';
export declare enum WEBRTC_MEDIA_SHARE_EVENT_TYPE {
    RTC_SDP = "rtc_sdp",
    RTC_ICECANDIDATE = "rtc_icecandidate",
    ICE_STATE_CHANGE = "rtc_state_change",
    ERROR = "rtc_error",
    INFO = "rtc_info"
}
export interface WebRTCMediaShareEvent extends LocalEvent<WEBRTC_MEDIA_SHARE_EVENT_TYPE> {
    data?: any;
    id: number;
}
export interface WebRTCConfig {
    serverIP: string;
    preferPubOutIp: string;
}
export interface AggregatedSendStats {
    timestamp: number;
    bytesSent: number;
    framesEncoded: number;
    packetsLost: number;
    bytesSentStart: number;
    framesEncodedStart: number;
    timestampStart: number;
    bitrate: number;
    lowBitrate: number;
    highBitrate: number;
    avgBitrate: number;
    framerate: number;
    lowFramerate: number;
    highFramerate: number;
    avgframerate: number;
    framesSent: number;
    frameHeight: number;
    frameWidth: number;
    frameHeightStart: number;
    frameWidthStart: number;
    currentRoundTripTime: number;
    packetsLostPerc: number;
}
export default class PeerConnectionMediaShare extends EventBase<WEBRTC_MEDIA_SHARE_EVENT_TYPE, WebRTCMediaShareEvent> implements MediaShareInterface {
    get audioDeviceId(): string | undefined;
    get audioTrack(): MediaStreamTrack | undefined;
    get videoDeviceId(): string | undefined;
    get videoTrack(): MediaStreamTrack | undefined;
    get audioPaused(): boolean;
    get videoPaused(): boolean;
    private larksr;
    private offerOptions;
    private _pcConfig;
    set pcConfig(config: CloudLark.IRTCConfiguration | null | undefined);
    get pcConfig(): CloudLark.IRTCConfiguration | null | undefined;
    private pc;
    private audioBinding;
    private videoBinding;
    private sdpCreateSuccess;
    private readonly sendStream;
    get canvasRender(): CanvasRender;
    private _canvasRender;
    private netTestTimeout;
    get aggregatedStats(): AggregatedSendStats | null;
    private set aggregatedStats(value);
    private _aggregatedStats;
    private lastThrowBadNetork;
    private lastPacktetsLost;
    private lastPacktetsReceived;
    set preferVideoCode(code: 'auto' | 'vp8' | 'vp9' | 'h264' | 'h265' | 'hevc' | 'av1x');
    get preferVideoCode(): 'auto' | 'vp8' | 'vp9' | 'h264' | 'h265' | 'hevc' | 'av1x';
    private _preferDecoder;
    set codeRate(codeRate: {
        start: number;
        min: number;
        max: number;
    });
    get codeRate(): {
        start: number;
        min: number;
        max: number;
    };
    private _codeRate;
    get id(): number;
    private _id;
    set forceRenderToCanvas(force: boolean);
    get forceRenderToCanvas(): boolean;
    private _forceRenderToCanvas;
    constructor(larksr: LarkSR, id: number);
    create(config?: CloudLark.IRTCConfiguration | null | undefined): Promise<void>;
    createOffer(): void;
    close(): void;
    getStats(): Promise<AggregatedSendStats>;
    getStateChrome(): Promise<AggregatedSendStats>;
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
    private addIceCandidate;
    private onCreateOfferSuccess;
    private onIceCandidate;
    private onIceStateChange;
    private iceStateChange;
    private $emit;
    private createEvent;
}
