import Operation from './operation';
import HandlerBase from './handler_base';
export default class KeyboardHandler extends HandlerBase {
    private needSyncKeyState;
    private fistSyncKeyState;
    private pressedKeys;
    /**
     * 设置需要阻止默认行为的按键列表
     * @param keys - 需要阻止默认行为的按键列表
     */
    set preventKeys(keys: string[]);
    /**
     * 获取需要阻止默认行为的按键列表
     * @returns 需要阻止默认行为的按键列表
     */
    get preventKeys(): string[];
    /**
     * 需要阻止默认行为的按键列表
     */
    private _preventKeys;
    /**
     * 设置需要跳过的按键列表
     * @param keys - 需要跳过的按键列表
     */
    set skipKeys(keys: string[]);
    /**
     * 获取需要跳过的按键列表
     * @returns 需要跳过的按键列表
     */
    get skipKeys(): string[];
    /**
     * 需要跳过的按键列表
     */
    private _skipKeys;
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
    releaseKeys(): void;
}
