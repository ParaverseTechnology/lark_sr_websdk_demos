import { LarkEventType } from '../lark/lark_event_type';
import { LarkSR } from '../larksr';
export declare const PREX = "pxymessage";
export declare const LOG_ERROR_EVENT_TYPE: LarkEventType[];
export default class IframeHandler {
    larksr: LarkSR;
    constructor(larksr: LarkSR);
    listenParent(): void;
}
