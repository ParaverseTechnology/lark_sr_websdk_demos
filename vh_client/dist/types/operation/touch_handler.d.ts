import Operation from './operation';
import HandlerBase from './handler_base';
export default class TouchHandler extends HandlerBase {
    private root;
    private touchId;
    private touchMap;
    constructor(rootElement: HTMLElement, op: Operation);
    startListening(): void;
    stopListening(): void;
    private onTouch;
}
