import { EventBase, LocalEvent } from '../event/event_base';
export declare enum WAITQUEUE_EVENT_TYPE {
    OPEN = 0,
    CLOSE = 1,
    ERROR = 2,
    TRY = 3,
    STAUTS = 4
}
export interface WaitQueueEvent extends LocalEvent<WAITQUEUE_EVENT_TYPE> {
    waitCount?: number;
}
export interface WaitQueueConfig {
    serverAddress: string;
    appliId: string;
    groupId?: string;
    targetServerIp?: string;
}
export default class WaitQueue extends EventBase<WAITQUEUE_EVENT_TYPE, WaitQueueEvent> {
    private get wsServer();
    private config;
    private connection;
    private keepAliveTimeout;
    private queueId;
    isOpen(): boolean;
    constructor(config: WaitQueueConfig);
    /**
     *
     */
    connect(): Promise<this>;
    /**
     *
     */
    close(): Promise<void>;
    private startKeepAlive;
    private stopKeepAlive;
}
