import { EventBase, LocalEvent } from './event_base';
import GLOBAL_EVENT_TYPE from './events';
interface GlobalEvent extends LocalEvent<GLOBAL_EVENT_TYPE> {
}
declare class Global extends EventBase<GLOBAL_EVENT_TYPE, GlobalEvent> {
}
declare const Bus: Global;
export default Bus;
