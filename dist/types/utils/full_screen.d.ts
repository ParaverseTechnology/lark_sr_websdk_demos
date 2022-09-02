import { EventBase, LocalEvent } from '../event/event_base';
export declare const enum FullScreenEventType {
    FullScreenChange = 0,
    FullScreenFailed = 1
}
export interface FullScreenEvent extends LocalEvent<FullScreenEventType> {
    isFullScreen: boolean;
    error: any;
}
/**
 * 全屏显示
 */
export default class FullScreen extends EventBase<FullScreenEventType, FullScreenEvent> {
    get isFullScreen(): boolean;
    element: HTMLElement;
    private _isFullScreen;
    constructor();
    startListening(): void;
    stopListening(): void;
    private fullscreenChange;
    private fullscreenError;
    launchFullScreen(): void;
    exitFullscreen(): void;
    private createEvent;
}
