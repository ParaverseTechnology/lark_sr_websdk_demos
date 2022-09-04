import { EventBase, LocalEvent } from '../event/event_base';
import * as Msg from '../protobuf/cloudlark';
import { LarkSR } from '../larksr';
export declare enum PROXY_EVENT_TYPE {
    OPEN = 0,
    CLOSE = 1,
    ERROR = 2,
    CLIENT_MSG = 3
}
export interface ProxyEvent extends LocalEvent<PROXY_EVENT_TYPE> {
    data?: Msg.CloudLark.ToClientMessage;
}
export interface ProxyConfig {
    serverAddress: string;
    appServer: string;
    appPort: string;
}
export declare const PROXY_PATH = "websocket";
export default class WebsocketProxy extends EventBase<PROXY_EVENT_TYPE, ProxyEvent> {
    private get wsServer();
    private config;
    private connection;
    private keepAliveTimeout;
    private larksr;
    constructor(config: ProxyConfig, larksr: LarkSR);
    /**
     *
     */
    connect(): Promise<this>;
    /**
     *
     */
    close(): Promise<void>;
    isOpen(): boolean;
    sendMsg(msg: Msg.CloudLark.ToServerMessage): void;
    sendBuffer(data: ArrayBuffer): void;
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
