import * as Msg from '../protobuf/cloudlark';
import { LarkEventType } from './lark_event_type';
export declare const MESSAGE_MAGIC = 538317090;
export declare const PIXEL_STREAMING_MESSAGE_MAGIC = 539037986;
export default class Message {
    static emptyMsg(isPixelStreaming?: boolean): Msg.CloudLark.ToServerMessage;
    static versionCheckRequest(isPixelStreaming: boolean): Msg.CloudLark.ToServerMessage;
    static taskRequest(taskid: string, isInteractiveMode: boolean, isObMode: boolean, nickName: string, isPixelStreaming: boolean): Msg.CloudLark.ToServerMessage;
    static startStreamReqeuest(request: Msg.CloudLark.IStartStreamRequest, isPixelStreaming: boolean): Msg.CloudLark.ToServerMessage;
    static startMonitorStreamReqeuest(request: Msg.CloudLark.IVrMonitorRequest): Msg.CloudLark.ToServerMessage;
    static rtcOfferMsg(type: string, sdp: string): Msg.CloudLark.ToServerMessage;
    static iceMsg(sdpmid: string, sdpMlineindex: number, candidate: string): Msg.CloudLark.ToServerMessage;
    static restartApp(): Msg.CloudLark.ToServerMessage;
    static getTaskResponseMsg(ressponse: Msg.CloudLark.TaskResponse.Response): string;
    static getStartStreamResponseMsg(ressponse: Msg.CloudLark.StartStreamResponse.Response): string;
    static getCloudlarkTaskEvent(ressponse: Msg.CloudLark.TaskResponse.Response): LarkEventType;
    static getCloudlarkStartStreamEvent(ressponse: Msg.CloudLark.StartStreamResponse.Response): LarkEventType;
    static getCloudlarkTaskEventMsg(type: LarkEventType): string;
    static getCloudlarkStartStreamingEventMsg(type: LarkEventType): string;
}
