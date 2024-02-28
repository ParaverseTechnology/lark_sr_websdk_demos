import { LocalEvent } from "@/event/event_base";
import { EventBase, LarkSR } from "@/larksr";
import { CloudLark } from '@/protobuf/cloudlark';
export declare enum WebCodecType {
    WebCodecTypeH264 = "h264",
    WebCodecTypeH265 = "h265",
    WebCodecTypeNone = "none"
}
export declare enum WEB_CODEC_EVENT_TYPE {
    PLAYED = 0
}
export interface WebCodecEvent extends LocalEvent<WEB_CODEC_EVENT_TYPE> {
    data?: any;
}
export default class WebCodec extends EventBase<WEB_CODEC_EVENT_TYPE, WebCodecEvent> {
    static AVC_High_PROFILE: string;
    static HEVC_MAIN_PROFILE: string;
    static checkSupport(codec: WebCodecType, width?: number, height?: number): Promise<boolean>;
    static toWebCodecType(cloudType: CloudLark.StreamVideoFrame.Codec | null | undefined): WebCodecType;
    static getProfileName(codec: WebCodecType): string;
    private larksr;
    private decoder;
    private codec;
    get width(): number;
    private _width;
    get height(): number;
    private _height;
    private canvas;
    private context;
    private frameData;
    private dataOffset;
    private firstFrame;
    get inited(): boolean;
    private _inited;
    private decodeCost;
    private decodeCosts;
    private renderCost;
    private renderCosts;
    private firstPackage;
    private packageCost;
    private packageCosts;
    private frameCount;
    private dataCount;
    private lastState;
    constructor(larksr: LarkSR);
    setCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void;
    init(frame: CloudLark.IStreamVideoFrame): Promise<boolean | undefined>;
    onStreamVideoFrame(frame: CloudLark.IStreamVideoFrame): Promise<void>;
    stats(): {
        fps: number;
        bitrateKbps: number;
        package: number;
        decode: number;
        render: number;
    };
    private checkConfig;
    private onFrameDecode;
    private onFrameError;
    private $emit;
    private createAppEvent;
}
