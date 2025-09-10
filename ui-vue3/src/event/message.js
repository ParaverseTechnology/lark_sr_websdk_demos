import LocalizationLoader from '../localization/loader';

export class Msglevel {
    static get INFO() {
        return LocalizationLoader.message.info;
    }
    static get WARING() {
        return LocalizationLoader.message.waring;
    }
    static get ERROR() {
        return LocalizationLoader.message.error;
    }
}

export class Msg {
    /**
     * peerconnection messages
     */ 
    // 视频连接中...
    static get CONNECT_WEBRTC() {
        return LocalizationLoader.message.connectWebRTC;
    }
    // 视频流已断开连接
    static get ICE_FAILED() {
        return LocalizationLoader.message.iceFailed;
    }
    static get ICE_SUCCESS() {
        return LocalizationLoader.message.iceSuccess;
    }
    // 视频链接已关闭
    static get WEBRTC_HANGUP() {
        return LocalizationLoader.message.webRTCHangUp;
    }
    /**
     * app server messages 
     */
    // 连接应用失败，请检查网络
    static get CONNECT_WS_ERR() {
        return LocalizationLoader.message.connectWsErr;
    }
    // 客户端已启动
    static get CONNECT_WS_ERR_1() {
        return LocalizationLoader.message.connectWsErr1;
    }
    // 已关闭应用连接
    static get CONNECT_WS_CLOSE() {
        return LocalizationLoader.message.connectWsClose;
    }
    // 客户端未认证
    static get APP_LOGIN_ERR_1() {
        return LocalizationLoader.message.appLoginErr1;
    }
    // 客户端重复登录
    static get APP_LOGIN_ERR_2() {
        return LocalizationLoader.message.appLoginErr2;
    }
    // 连接应用服务器失败
    static get CONNECT_APP_ERR() {
        return LocalizationLoader.message.connectAppErr;
    }
    // 连接应用服务器失败
    static get CONNECT_APP_ERR2() {
        return LocalizationLoader.message.connectAppErr2;
    }
    // 信令超时
    static get SIGNALING_APP_TIMEOUT() {
        return LocalizationLoader.message.signalingAppTimeout;
    }
    //
    static get REMOTE_APP_FAILED() {
       return LocalizationLoader.message.remoteAppFailed; 
    }
    // 
    static get REMOTE_APP_CLOSE() {
        return LocalizationLoader.message.remoteAppClose;
    }
    /**
     * control message
     */
    // 重新连接中...
    static get REFRESH() {
        return LocalizationLoader.message.refresh;
    }
    // 应用结束
    static get COURSE_OVER() {
        return LocalizationLoader.message.courseOver;
    }
    // 确认退出应用
    static get COURSE_QUIT() {
        return LocalizationLoader.message.courseOuit;
    }
    /**
     * 开启横屏
     */
    // 请开启横屏浏览
    static get ORIENTATION() {
        return LocalizationLoader.message.orientation;
    }
    /**
     * 请求相对鼠标模式
     */
    // 独占鼠标模式请点击锁定鼠标按钮。
    static get REQUEST_LOCK_MOUSE() {
        return LocalizationLoader.message.requestLockMouse;
    }
    /**
     * 进入独占模式
     */ 
    // 进入独占鼠标模式，按 ESC 退出。
    static get LOCK_MOUSE() {
        return LocalizationLoader.message.lockMouse;
    }
    /**
     * 输入参数错误
     */
    static get PARAM_ERROR() {
        return LocalizationLoader.message.paramError;
    }
    /**
     * 
     */
    static get LOAD_CONFIG_FAILED() {
        return LocalizationLoader.message.loadConfigFailed;
    }
    /**
     * 
     */
    static get TOKEN_EXPIRED() {
        return LocalizationLoader.message.tokenExpired;
    }
    /**
     *  浏览器需要用户确认播放视频
     */
    static get REQUEST_PLAY_VIDEO() {
        return LocalizationLoader.message.requestPlayVideo;
    }
    /**
     * 无操作超时
     */
    static get NO_OPERATION_TIMEOUT() {
        return LocalizationLoader.message.noOperationTimeout;
    }
}
