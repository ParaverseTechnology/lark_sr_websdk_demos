import LocalizationBase from './base';

export default class Message extends LocalizationBase {
    constructor() {
        super();
        this.mType = 'message';
    }

    getLevel(name) {
        if (this.mLoaded) {
            return this.mData.level[name];
        } 
        return '';
    }

    getMessage(name) {
        if (this.mLoaded) {
            return this.mData.msg[name];
        } 
        return '';
    }

    get info() { return this.getLevel('INFO'); }

    get waring() { return this.getLevel('WARING'); } 

    get error() { return this.getLevel('ERROR'); }

    get connectWebRTC() { return this.getMessage('CONNECT_WEBRTC'); }

    get iceFailed() { return this.getMessage('ICE_FAILED'); }

    get iceSuccess() { return this.getMessage('ICE_SUCCESS'); }

    get webRTCHangUp() { return this.getMessage('WEBRTC_HANGUP'); }

    get connectWsErr() { return this.getMessage('CONNECT_WS_ERR'); }

    get connectWsErr1() { return this.getMessage('CONNECT_WS_ERR_1'); } 

    get connectWsClose() { return this.getMessage('CONNECT_WS_CLOSE'); }

    get appLoginErr1() { return this.getMessage('APP_LOGIN_ERR_1'); }

    get appLoginErr2() { return this.getMessage('APP_LOGIN_ERR_2'); }

    get connectAppErr() { return this.getMessage('CONNECT_APP_ERR'); }

    get connectAppErr2() { return this.getMessage('CONNECT_APP_ERR2'); }

    get signalingAppTimeout() { return this.getMessage('SIGNALING_APP_TIMEOUT'); }

    get remoteAppFailed() { return this.getMessage('REMOTE_APP_FAILED'); } 

    get remoteAppClose() { return this.getMessage('REMOTE_APP_CLOSE'); }

    get refresh() { return this.getMessage('REFRESH');}

    get courseOver() { return this.getMessage('COURSE_OVER');}

    get courseOuit() { return this.getMessage('COURSE_QUIT');}

    get orientation() { return this.getMessage('ORIENTATION');}

    get requestLockMouse() { return this.getMessage('REQUEST_LOCK_MOUSE');}

    get lockMouse() { return this.getMessage('LOCK_MOUSE'); }

    get paramError() { return this.getMessage('PARAM_ERROR'); }

    get loadConfigFailed() { return this.getMessage('LOAD_CONFIG_FAILED');} 

    get tokenExpired() { return this.getMessage('TOKEN_EXPIRED');}

    get requestPlayVideo() { return this.getMessage('REQUEST_PLAY_VIDEO');}

    // login result.
    get loginSuccess() { return this.getMessage('LOGIN_SUCESS');}
    get loginErrorCourseNotStart() { return this.getMessage('LOGIN_ERROR_COURSE_NOTATSTART');}
    get loginErrorCourseNotexist() { return this.getMessage('LOGIN_ERROR_COURSE_NOTEXIST');} 
    get loginErrorCourseTimeout() { return this.getMessage('LOGIN_ERROR_COURSE_TIMEOUT');}
    get loginErrorMediaNotReady() { return this.getMessage('LOGIN_ERROR_MEDIA_NOTREADY');}
    get loginErrorSessionExist() { return this.getMessage('LOGIN_ERROR_SESSION_EXIST');}
    get loginErrorValiduser() { return this.getMessage('LOGIN_ERROR_VALIDUSER');} 
    get loginErrorSafedogNotfound() { return this.getMessage('LOGIN_ERROR_SAFEDOG_NOTFOUND');} 
    get loginErrorSafedogTimeout() { return this.getMessage('LOGIN_ERROR_SAFEDOG_TIMEOUT');}
    get loginErrorUnknown() { return this.getMessage('LOGIN_ERROR_UNKNOWN');}
    get loginErrorEmpty() { return this.getMessage('LOGIN_ERROR_EMPTY');} 
    get appLoginTimeout() { return this.getMessage('APP_LOGIN_TIMOUT');}
    get appLoginMessageErr() { return this.getMessage('APP_LOGIN_MESSAGE_ERR');}
    get connectToAppServerTimeout() { return this.getMessage('CONNECT_TO_APP_SERVER_TIMEOUT');}
    get appStartStreamTimeout() { return this.getMessage('APP_START_STREAM_TIMEOUT');} 
    get noOperationTimeout() { return this.getMessage('NO_OPERATION_TIMEOUT');}

    //
    // 连接应用服务器事件
    //
    get RENDER_SERVER_CONNECTED() { return this.getMessage('RENDER_SERVER_CONNECTED'); }
    get RENDER_SERVER_FAILED() { return this.getMessage('RENDER_SERVER_FAILED'); }
    get RENDER_SERVER_CLOSE() { return this.getMessage('RENDER_SERVER_CLOSE'); }
    get RENDER_SERVER_ERROR() { return this.getMessage('RENDER_SERVER_ERROR'); }
    //
    // 连接 websocket 代理服务器事件
    //
    get PROXY_SERVER_CONNECTED() { return this.getMessage('PROXY_SERVER_CONNECTED'); }
    get PROXY_SERVER_FAILED() { return this.getMessage('PROXY_SERVER_FAILED'); }
    get PROXY_SERVER_CLOSE() { return this.getMessage('PROXY_SERVER_CLOSE'); }
    get PROXY_SERVER_ERROR() { return this.getMessage('PROXY_SERVER_ERROR'); }
    //
    // 版本检测
    //
    get VERSION_CHECK_SUCCESS() { return this.getMessage('VERSION_CHECK_SUCCESS'); }
    get VERSION_CHECK_FAILED() { return this.getMessage('VERSION_CHECK_FAILED'); }
    //
    // task 检测
    //
    get taskSuccess() { return this.getMessage('TASK_SUCCESS');}
    get taskError() { return this.getMessage('TASK_ERROR');}
    get taskNotFound() { return this.getMessage('TASK_NOTFOUND');}
    get taskServerError() { return this.getMessage('TASK_SERVER_ERROR');}
    get taskAppWrongParam() { return this.getMessage('TASK_APP_WRONGPARAM');}
    get taskNoGpuResource() { return this.getMessage('TASK_NO_GPU_RESOURCE');}

    //
    // 启动流媒体
    //
    get startSuccess() { return this.getMessage('START_SUCCESS');}
    get startFailed() { return this.getMessage('START_FAILED');}
    get startStreamProcessStartFailed() { return this.getMessage('START_STREAM_PROCESS_START_FAILED');} 
    get startStreamProcessStartTimeout() { return this.getMessage('START_STREAM_PROCESS_START_TIMEOUT');}
    get startStreamNotStreaming() { return this.getMessage('START_STREAM_NOT_STREAMING');} 
    get startStreamEncodeError() { return this.getMessage('START_STREAM_ENCODER_ERROR'); }
    get connectToAdmin() { return this.getMessage('CONNECT_TO_ADMIN'); }

    //
    // RTC 事件
    //
    get RTC_EVENT_PEERCONNECTION_CONNECTED() { return this.getMessage('RTC_EVENT_PEERCONNECTION_CONNECTED'); }
    get RTC_EVENT_PEERCONNECTION_CLOSED() { return this.getMessage('RTC_EVENT_PEERCONNECTION_CLOSED'); }
    get RTC_EVENT_PEERCONNECTION_ERROR() { return this.getMessage('RTC_EVENT_PEERCONNECTION_ERROR'); }

    //
    // 加载视频流
    //
    get VIDEO_LOADED() { return this.getMessage('VIDEO_LOADED'); }

    get RTC_RETRY_CONNECTION() { return this.getMessage('RTC_RETRY_CONNECTION'); }

    //
    get LK_NOTIFY_CLIENT_LOGOUT_PLAYER_LOGOUT() { return this.getMessage('LK_NOTIFY_CLIENT_LOGOUT_PLAYER_LOGOUT'); }

    get LK_NOTIFY_CLIENT_LOGOUT_TASKOWNER_LOGOUT() { return this.getMessage('LK_NOTIFY_CLIENT_LOGOUT_TASKOWNER_LOGOUT'); }

    // 
    get LK_APP_PROCESS_NOTIFI_APP_QUIT() { return this.getMessage('LK_APP_PROCESS_NOTIFI_APP_QUIT'); }

    // 载入超时
    get LK_LOADING_TIMEOUT() { return this.getMessage('LK_LOADING_TIMEOUT'); }
}