import Operation from './operation';
import HandlerBase from './handler_base';
export default class GestureHandler extends HandlerBase {
    private gesture;
    private rootElement;
    private pressedMouseButtons;
    constructor(rootElement: HTMLElement, op: Operation);
    startListening(): void;
    stopListening(): void;
    setRootElement(rootElement: HTMLElement): void;
    private onGesture;
    private releaseMouseButtons;
}
