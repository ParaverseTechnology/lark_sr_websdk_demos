import Operation from './operation';
import HandlerBase from './handler_base';
export default class KeyboardHandler extends HandlerBase {
    private needSyncKeyState;
    private fistSyncKeyState;
    private pressedKeys;
    constructor(op: Operation);
    startListening(): void;
    stopListening(): void;
    private onLockPointChange;
    private keyboardListenerSetup;
    private onKeyDown;
    private onKeyUp;
    private onWindowBlur;
    private onWindowFocus;
    private onWindowVisibilityChange;
    private releaseKeys;
}
