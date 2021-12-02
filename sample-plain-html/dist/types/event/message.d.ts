export declare class Msglevel {
    static get INFO(): string;
    static get WARING(): string;
    static get ERROR(): string;
}
export declare class Msg {
    /**
     * peerconnection messages
     */
    static get CONNECT_WEBRTC(): string;
    static get ICE_FAILED(): string;
    static get ICE_SUCCESS(): string;
    static get WEBRTC_HANGUP(): string;
    /**
     * app server messages
     */
    static get CONNECT_WS_ERR(): string;
    static get CONNECT_WS_ERR_1(): string;
    static get CONNECT_WS_CLOSE(): string;
    static get APP_LOGIN_ERR_1(): string;
    static get APP_LOGIN_ERR_2(): string;
    static get CONNECT_APP_ERR(): string;
    static get CONNECT_APP_ERR2(): string;
    static get SIGNALING_APP_TIMEOUT(): string;
    static get REMOTE_APP_FAILED(): string;
    static get REMOTE_APP_CLOSE(): string;
    /**
     * control message
     */
    static get REFRESH(): string;
    static get COURSE_OVER(): string;
    static get COURSE_QUIT(): string;
    /**
     * 开启横屏
     */
    static get ORIENTATION(): string;
    /**
     * 请求相对鼠标模式
     */
    static get REQUEST_LOCK_MOUSE(): string;
    /**
     * 进入独占模式
     */
    static get LOCK_MOUSE(): string;
    /**
     * 输入参数错误
     */
    static get PARAM_ERROR(): string;
    /**
     *
     */
    static get LOAD_CONFIG_FAILED(): string;
    /**
     *
     */
    static get TOKEN_EXPIRED(): string;
    /**
     *  浏览器需要用户确认播放视频
     */
    static get REQUEST_PLAY_VIDEO(): string;
    /**
     * 无操作超时
     */
    static get NO_OPERATION_TIMEOUT(): string;
    /**
     * 超过载入时间
     */
    static get LK_LOADING_TIMEOUT(): string;
}
