import Operation from './operation';
import { CloudLark } from '../protobuf/cloudlark';
import { Point } from '../common/interface';
import HandlerBase from './handler_base';
export default class MouseHandler extends HandlerBase {
    private localRenderCursorPosition;
    private preLockMouse;
    private isFocus;
    private rootElement;
    private subscribeUpdatePlayerListFromProtoAction;
    private pressedMouseButtons;
    constructor(rootElement: HTMLElement, op: Operation);
    resetLocalRendreMousePosition(p: Point): void;
    setRootElement(rootElement: HTMLElement): void;
    startListening(): void;
    setAppMouseMode(mode: CloudLark.IAppMouseMode): void;
    stopListening(): void;
    private onLockPointChange;
    initMouseMode(): void;
    private startListenMouse;
    private removeListenMouse;
    private startLockModeListening;
    private removeLockModeListening;
    private mouseListenerSetup;
    private onMouseenter;
    private isIFame;
    private setFocus;
    private onMouse;
    private onDoubleTap;
    private onContextmenu;
    private onMouseWheel;
    /**
     * 获取鼠标相对服务端的位置
     * @param event
     */
    private getMousePosition;
    private onWindowBlur;
    private onWindowFocus;
    private onWindowVisibilityChange;
    private releaseMouseButtons;
    private toastMsg;
}
