import { EventBase, LocalEvent } from '../event/event_base';
export declare enum RECORDER_STATE {
    READY = 0,
    RECORDING = 1
}
export declare const RECODER_DEFAULT_CONFIG: {
    sampleRate: number;
    sampleBits: number;
    bufferSize: number;
};
/**
 * LarkSR 实例会发出的事件
 */
export declare enum RecodeEventType {
    DATA = 0
}
/**
 * LarkSR 发出的事件
 */
export interface RecodeEvent extends LocalEvent<RecodeEventType> {
    voiceId: number;
    sliceId: number;
    data: Uint8Array;
}
export default class Recorder extends EventBase<RecodeEventType, RecodeEvent> {
    get state(): RECORDER_STATE;
    private _state;
    private ctx;
    private sampleRate;
    private sampleBits;
    private recorder;
    private source;
    private stream;
    private buffer;
    private bufferSize;
    get voiceId(): number;
    updateVoiceId(): number;
    private _voiceId;
    constructor({ bufferSize, sampleRate, sampleBits, }?: {
        sampleRate: number;
        sampleBits: number;
        bufferSize: number;
    });
    start(): Promise<number>;
    pause(): void;
    clear(): void;
    /**
     * @deprecated
     * @returns
     */
    private getRecord;
    private merge;
    private compress;
    private encodeToPCM;
}
