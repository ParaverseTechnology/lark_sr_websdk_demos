import { EventBase, LocalEvent } from '../event/event_base';
import { LarkSR } from '../larksr';
import { MediaShareInterface, RTCMediaTrackBinding } from './media_share_interface';
import { CloudLark } from '@/protobuf/cloudlark';
export declare enum WEBRTC_MEDIA_SHARE_EVENT_TYPE {
    RTC_SDP = 0,
    RTC_ICECANDIDATE = 1,
    ICE_STATE_CHANGE = 2,
    ERROR = 3,
    INFO = 4
}
export interface WebRTCMediaShareEvent extends LocalEvent<WEBRTC_MEDIA_SHARE_EVENT_TYPE> {
    data?: any;
}
export interface WebRTCConfig {
    serverIP: string;
    preferPubOutIp: string;
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
    constructor(larksr: LarkSR);
    create(config?: CloudLark.IRTCConfiguration | null | undefined): Promise<void>;
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
    openVideo(audio?: boolean, cameraId?: string, width?: number, height?: number): Promise<{
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
    openCamera(cameraId: string, width?: number, height?: number, audio?: boolean): Promise<{
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
    requestUserMediaPermission(constraints?: MediaStreamConstraints): Promise<MediaStream>;
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
