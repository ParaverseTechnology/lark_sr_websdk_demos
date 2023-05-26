# LarkSR 事件系统

在 LarkSR 整个生命周期内会抛出多种事件通知。使用方法类似:

```javascript
var larksr;

// create code
...

// 监听连接成功事件
larksr.on('connect', function(e) { 
    console.log("LarkSRClientEvent CONNECT", e); 
});
```

或者使用导出枚举值

```javascript
larksr.on(LarkSRClientEvent.TASK_CREATE_SUCCESS, (e) => { 
    console.log("LarkSRClientEvent TASK_CREATE_SUCCESS", e); 
});
```

其中 `LarkEvent = 'larkevent'`, `ERROR = 'error'`, `INFO = 'info'` 这三个事件中附加 code 字段，code 字段附加事件码：[event_codes](./event_codes.md)
[event_codes](./event_codes.md) 中的事件 code 值，在 LarkEvent 事件中都会抛出。

## 完整事件定义

```javascript
/**
 * LarkSR 实例完整事件定义
 */
declare const enum LarkSRClientEvent {
    /**
     * TASK 创建成功，返回 Task 相关信息
     */
    TASK_CREATE_SUCCESS = "taskcreatesuccess",
    /**
     * TASK 创建失败
     */
    TASK_CREATE_FAILED = "taskcreatefailed",
    /**
     * 渲染资源不足
      * {
            // 服务端返回的错误码，服务端请求正确返回时存在。需要注意渲染资源不足类型的错误码。
            // 可用 type == 0 判断是否是渲染资源不足类型的错误,再用 code 进行细节处理，或者只用 type == 0 进行处理。
            // 813=当前应用的运行数量已达到最大值：{0},请稍后再试
            // 814=同一appKey下的应用运行数量达到最大值：{0}，请稍后再试
            // 815=应用运行数量已达到最大授权并发数量，请稍后再试
            // 816=VR应用运行数量已达到最大授权并发数量，请稍后再试
            // 817=渲染资源不足，请稍后再试
            // 820=暂无活跃的GPU节点
            // 821=节点资源使用率已达到设置的阈值
            // 823=单节点运行应用数量已达到单节点最大授权并发数量，请稍后再试
            code?: 817,

            // 错误信息
            message:? "",
        }
     *
     */
    RESOURCE_NOT_ENOUGH = "resourcenotenough",
    /**
     * 连接渲染服务器成功 .
     */
    CONNECT = "connect",
    /**
     * 登录成功时触发，会返回当前用户id .
     */
    LOGIN_SUCCESS = "loginsuccess",
    /**
     * 无操作超时时触发 .
     */
    NO_OPERATION_TIMEOUT = "operatetimeout",
    /**
     * 连接关闭.
     */
    CLOSE = "close",
    /**
     * 云端应用关闭，但连接未关闭
     */
    APP_CLOSE = "appclose",
    /**
     * 获取到远端视频流 .
     */
    GOT_REMOTE_STREAM = "gotremotestream",
    /**
     * 获取到远端音频流 .
     */
    GOT_REMOTE_AUDIO_STREAM = "gotremoteaudiostream",
    /**
     * 视频加载成功，等待播放 .
     */
    MEDIA_LOADED = "meidaloaded",
    /**
     * 视频自动播放成功 .
     */
    MEDIA_PLAY_SUCCESS = "mediaplaysuccess",
    /**
     * 视频自动播放失败 .
     */
    MEDIA_PLAY_FAILED = "mediaplayfailed",
    /**
     * 自动播放声音失败，以静音模式播放 .
     */
    MEDIA_PLAY_MUTE = "meidaplaymute",
    /**
     * 云渲染连接状态改变 .
     */
    APPSTATE_CHANGE = "appstatechange",
    /**
     * 云端应用大小变化 .
     */
    APP_RESIZE = "appresize",
    /**
     * 云端应用鼠标模式变化时触发 .
     */
    APP_MOUSE_MODE = "appmousemode",
    /**
     * 云端应用鼠标状态变化 .
     */
    APP_CURSOR_MODE = "appcursormode",
    /**
     * 玩家列表 .
     */
    PLAYER_LIST = "playerlist",
    /**
     * 视频连接状态
     */
    PEERSTATUS_REPORT = "peerstatusreport",
    /**
     * 云端应用请求输入文字 .
     */
    APP_REQUEST_INPUT = "apprequestinput",
    /**
     * 云端应用请求手柄震动
     */
    APP_REQUEST_GAMEPAD_OUPUT = "apprequestgamepadoutput",
    /**
     * 截图成功.
     */
    CAPTURE_FRAME = "captureframe",
    /**
     * 数据通道打开 .
     */
    DATACHANNEL_OPEN = "datachannelopen",
    /**
     * 数据通道关闭 .
     */
    DATACHANNEL_CLOSE = "datachannelclose",
    /**
     * 数据通达收到文字消息 .
     * > V3.2.314 版本对应服务器版本和数据通道版本为 3.2.5.1 及以上
     */
    DATACHANNEL_TEXT = "datachanneltext",
    /**
     * 数据通道收到字节消息 .
     */
    DATACHANNEL_BINARY = "datachannelbinary",
    /**
     * 更详细的事件状态，主要用于向iframe外部抛出 .
     */
    LarkEvent = "larkevent",
    /**
     * 发生错误时抛出
     * type:     error
     * message: 错误消息
     * code:    可能的错误码如下, 错误码的具体定义 @see [./event_codes]
     *          // 连接服务器的websocket代理关闭
     *          LK_RENDER_SERVER_CLOSE                    : 102
     *          // 连接代理服务器的websocket关闭
     *          LK_PROXY_SERVER_CLOSE                     : 202
     *          // 检测版本失败，服务器和客户端的版本匹配。目前只有3.1和3.2大版本不匹配情况
     *          LK_VERSION_CHECK_FAILED                   : 301
     *          // 服务器返回创建Task失败
     *          TASK_NOTFOUND-TASK_NO_GPU_RESOURCE        : 401-404
     *          // 服务端启动流媒体失败
     *          LK_START_STREAM_PROCESS_START-FAILED-LK_START_STREAM_ENCODER_ERROR : 501-504
     *          // RTC 连接关闭
     *          LK_RTC_EVENT_PEERCONNECTION_CLOSED        : 601
     *          // RTC 连接出错
     *          LK_RTC_EVENT_PEERCONNECTION_ERROR         : 602
     *          // RTC 创建出错，一般为 浏览器不支持 webrtc
     *          LK_RTC_EVENT_PEERCONNECTION_CREATE_FAILED : 603
     *          // 服务器主动要求客户端退出
     *          LK_NOTIFY_CLIENT_LOGOUT_PLAYER_LOGOUT     : 800
     *          // 一人操作多人看房主退出
     *          LK_NOTIFY_CLIENT_LOGOUT_TASKOWNER_LOGOUT  : 801
     *
     */
    ERROR = "error",
    /**
     * 一般信息提示
     */
    INFO = "info",
    /**
     * 语音对话的状态
     */
    AI_VOICE_STATUS = "aivoicestatus",
    /**
     * 语音识别转文字的结果
     */
    AI_VOICE_ASR_RESULT = "aivoiceasrresult",
    /**
     * 对话返回的结果
     */
    AI_VOICE_DM_RESULT = "aivoicedmresult",
    /**
     * 对话出错详细信息
     */
    AI_VOICE_ERROR = "aivoiceerror",
    /**
     * 服务端 3.2.7.0 添加
     *
     */
    TOUCH_CTR_MAPPING = "touchctrmapping",
    /**
     * 服务端 3.2.7.0 添加
     * rtmp 直播推流状态
     */
    RTMP_STREAM_STATE = "rtmpstreamstate",
    /**
     * 服务端 3.2.7.0 添加
     * rtmp 直播推流出错
     */
    RTMP_STREAM_ERROR = "rtmpstreamerror"
}
```
