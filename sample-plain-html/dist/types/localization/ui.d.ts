import LocalizationBase from './base';
export default class UI extends LocalizationBase {
    protected mType: string;
    private getButton;
    private getNotice;
    get status(): string;
    get mouseMode(): string;
    get mouseModeAuto(): string;
    get mosueModeLock(): string;
    get scale(): string;
    get scaleToNormal(): string;
    get lock(): string;
    get fullScreen(): string;
    get exit(): string;
    get setup(): string;
    get show(): string;
    get hide(): string;
    get hideVMouse(): string;
    get showVMouse(): string;
    get hideVKeyboard(): string;
    get showVKeyboard(): string;
    get playerMode(): string;
    get playerModeNormal(): string;
    get playerModeInteractive(): string;
    get userType(): string;
    get userTypeObserver(): string;
    get userTypePlayer(): string;
    get requireNickName(): string;
    get requireInputChinese(): string;
    get buttonSubmit(): string;
    get buttonCancle(): string;
    get buttonInput(): string;
    get buttonClose(): string;
    get buttonBack(): string;
    get browserVersion(): string;
    get browserUnsupport(): string;
    get foundError(): string;
    get start(): string;
    get remainMin(): string;
    get firstPersion(): string;
    get requestWebsite(): string;
    get lockMouse(): string;
    get hideControllerBar(): string;
    get hideControllerBarShotCut(): string;
    get showControllerBar(): string;
    get showControllerBarShotCut(): string;
    get releaseMouse(): string;
    get badNetwork(): string;
    get INITED(): string;
    get WEBSOCKET_CHANNEL_OPEN(): string;
    get LOGIN_SUCCESS(): string;
    get RTC_CONNECTED(): string;
    get MEDIA_LOADED(): string;
    get SYNC_APP(): string;
    get RTC_RETRY(): string;
    get APP_RETRY(): string;
    get APP_RETRY_CONFIRM(): string;
    get START(): string;
    get PLAY_FAILED(): string;
}
