import CloudlarkEvent, { CloudlarkEventType } from '@/vrMonitor/cloudlark_event_type';
import Log from '@/utils/log';

export const PREX = 'pxymessage';

export default class IframePoster {
    static IsIframe() {
        return self !== top;
    }
    static PostMsg(type, data) {
        Log.info("Post msg code:" + type + ". msg:" + CloudlarkEvent.GetEventMessageByType(type));
        if (this.IsIframe() && parent != null) {
            parent.postMessage({
                prex: PREX,
                type, 
                data,
                message: CloudlarkEvent.GetEventMessageByType(type),
            }, '*');
        }        
    }
}
