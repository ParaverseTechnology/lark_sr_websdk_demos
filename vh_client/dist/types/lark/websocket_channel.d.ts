import { EventBase, LocalEvent } from '../event/event_base';
import * as Msg from '../protobuf/cloudlark';
import { LarkSR } from '../larksr';
export declare enum CHANNEL_EVENT_TYPE {
    OPEN = 0,
    CLOSE = 1,
    ERROR = 2,
    CLIENT_MSG = 3
}
export interface ChannelEvent extends LocalEvent<CHANNEL_EVENT_TYPE> {
    data?: Msg.CloudLark.ToClientMessage;
}
export interface WebscocketConfig {
    serverAddress: string;
    ip: string;
    port: string;
    path?: string;
}
export default class WebsocketChannel extends EventBase<CHANNEL_EVENT_TYPE, ChannelEvent> {
    private get wsServer();
    private config;
    private connection;
    private keepAliveTimeout;
    private larksr;
    constructor(config: WebscocketConfig, larksr: LarkSR);
    /**
     *
     */
    connect(): Promise<this>;
    /**
     *
     */
    close(): Promise<void>;
    sendMsg(msg: Msg.CloudLark.ToServerMessage): void;
    sendBuffer(data: ArrayBuffer): void;
    isOpen(): boolean;
    private startKeepAlive;
    private stopKeepAlive;
    /**
     *
     */
    private onMessage;
    private onOpen;
    /**
     *
     * @param e
     */
    private onWSError;
    /**
     *
     * @param e
     */
    private onWSClose;
    private $emit;
    private createEvent;
}
