import { 
    EventBase, 
}                        from './event_base';

import GLOBAL_EVENT_TYPE from './events';

class Global extends EventBase {
}

// bus
const Bus = new Global();

export default Bus;