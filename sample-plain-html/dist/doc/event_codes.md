# 事件码

在 `LarkEvent = 'larkevent'`, `ERROR = 'error'`, `INFO = 'info'` 这三个事件中附加 code 字段，具体值即下面 LarkEventType。
在 LarkEvent 事件中可能会抛出所有的事件码。

LarkEventType 事件码还用于 iframe poster 使用方式时的监听事件码。iframe 嵌入客户端并使用事件码参考 demo: [larkwebclient-iframe-demos](https://github.com/pingxingyun/larkwebclient-iframe-demos)

```typescript
//
// 客户端统一事件代码。
//
export enum LarkEventType {
    // 网页客户端载入成功（3.1.8.1添加）
    LK_WEB_CLIENT_LOAD_SUCCESS                       = 1,
    // 进入应用接口调用
    LK_TASK_CREATE_SUCCESS                           = 10,
    LK_TASK_CREATE_FAILED                            = 11,
    // 渲染资源不足
    LK_RESOURCE_NOT_ENOUGH                           = 12,
    // 同步应用中
    LK_TASK_SYNC_APP                                 = 20,
    // 同步 task 失败（3.1.8.1添加）
    LK_TASK_SYNC_APP_FAILED                          = 21,
    //
    // 连接应用服务器事件。直连渲染服务器时抛出
    // 消息来源：websocket 连接事件
    //
    // 连接渲染服务器成功
    LK_RENDER_SERVER_CONNECTED                       = 100,
    // 连接渲染服务器失败
    LK_RENDER_SERVER_FAILED                          = 101,
    // 与渲染服务器连接关闭
    LK_RENDER_SERVER_CLOSE                           = 102,
    // 与渲染服务器连接出错
    LK_RENDER_SERVER_ERROR                           = 103,

    //
    // 连接 websocket 代理服务器事件
    // 消息来源：websocekt proxy 连接事件
    //
    // 连接代理服务器成功
    LK_PROXY_SERVER_CONNECTED                        = 200,
    // 连接代理服务器失败
    LK_PROXY_SERVER_FAILED                           = 201,
    // 与代理服务器连接关闭
    LK_PROXY_SERVER_CLOSE                            = 202,
    // 与代理服务器连接出错
    LK_PROXY_SERVER_ERROR                            = 203,

    //
    // 版本检测 
    // 消息来源：服务端协议返回 ToClientMessage->VersionCheckResponse
    //
    // 版本检测成功
    LK_VERSION_CHECK_SUCCESS                         = 300,
    // 版本检测失败
    LK_VERSION_CHECK_FAILED                          = 301,

    //
    // task 检测 
    // 消息来源： 服务端协议返回 ToClientMessage->TaskResponse
    //
    // 请求 Task 成功
    LK_TASK_SUCCESS                                  = 400,
    // 未发现 Task
    LK_TASK_NOTFOUND                                 = 401,
    // 服务器端错误
    LK_TASK_SERVER_ERROR                             = 402,
    // 应用参数错误
    LK_TASK_APP_WRONGPARAM                           = 403,
    // Task 获取成功，但是没有可分配的显卡
    LK_TASK_NO_GPU_RESOURCE                          = 404,

    //
    // 启动流媒体
    // 消息来源： 服务端协议返回 ToClientMessage->StartStreamResponse
    //
    // 启动流媒体成功
    LK_START_STREAM_SUCCESS                           = 500,
    // 启动流媒体出错
    LK_START_STREAM_PROCESS_START_FAILED              = 501,
    // 启动流媒体超时
    LK_START_STREAM_PROCESS_START_TIMEOUT             = 502,
    // 启动流媒体未串流
    LK_START_STREAM_NOT_STREAMING                     = 503,
    // 启动流媒体编码错误
    LK_START_STREAM_ENCODER_ERROR                     = 504,

    //
    // RTC 事件
    // 消息来源：webrtc 连接事件和 ToClientMessage->WebrtcError
    //
    // RTC 连接成功
    LK_RTC_EVENT_PEERCONNECTION_CONNECTED             = 600,
    // RTC 连接关闭
    LK_RTC_EVENT_PEERCONNECTION_CLOSED                = 601,
    // RTC 连接出错
    LK_RTC_EVENT_PEERCONNECTION_ERROR                 = 602,
    // RTC 创建出错，一般为 浏览器不支持 webrtc
    // 3.2.0.14 新增
    LK_RTC_EVENT_PEERCONNECTION_CREATE_FAILED         = 603,
    // RTC 状态上报（rtt 码率等）  3.1.1.8 新增
    LK_RTC_EVENT_PEERCONNECTION_STATE                 = 610,
    // RTC 重连                   3.1.6.2 新增
    LK_RTC_EVENT_PEERCONNECTION_RETRY                 = 611,

    //
    // 加载视频流
    // 消息来源：浏览器或原生组件 3.1.6.2 修复
    //
    LK_VIDEO_LOADED                                  = 700,
    // 视频播放自动播放失败，请求手动触发 (3.1.8.2)
    LK_VIDEO_PLAY_FAILED                             = 701,
    // 获取到云端视频流但未开始播放 (3.1.8.3)
    LK_GOT_REMOTE_STREAM                             = 710,
    // 获取到云端视频流但未开始播放 (3.2.13.0)
    LK_VIDEO_PLAY_SUCCSS                             = 711,

    //
    // 服务端主动退出
    // 消息来源：后台协议 NotifyClientLogout
    //
    LK_NOTIFY_CLIENT_LOGOUT_PLAYER_LOGOUT            = 800,
    // 一人操作多人看房主退出
    LK_NOTIFY_CLIENT_LOGOUT_TASKOWNER_LOGOUT         = 801,

    //
    // 服务端推送云端应用事件
    // 消息来源：后台协议 AppProcessNotification
    //
    LK_APP_PROCESS_NOTIFI_APP_QUIT                   = 900,
    // 无操作超时（3.1.8.1添加）
    LK_NO_OPERATION_TIMEOUT                          = 901,
    // 载入作超时（3.1.8.8添加）
    LK_LOADING_TIMEOUT                               = 902,
    // 云端应用大小变换
    // 3.1.1.8 新增
    LK_APP_RESIZE                                    = 910,
    // 云端应用鼠标模式变化
    // 3.1.1.8 新增
    LK_APP_MOUSE_MODE                                = 911,
    // 获取到玩家列表
    // 3.1.1.10 新增
    LK_APP_PLAER_LIST                                = 912,
    // APP 请求输入文字
    LK_APP_REQUEST_TEXT                              = 913,
    // sdk new
    // 云端鼠标样式
    LK_APP_CURSOR_STYLE                              = 914,
    // 用户主动点击关闭按钮
    LK_USER_REQUEST_QUIT                             = 920,
    // 本地网页的 resize 事件
    LK_UI_RESIZE                                     = 930,

    //
    // XR 相关事件
    //
    // 启动VR流媒体启动成功
    LK_STARTVRSTREAM_SUCCESS                            = 1000,
    // 启动VR流媒体过程失败
    LK_STARTVRSTREAM_START_PROCESS_FAILED               = 1001,
    // 启动VR流媒体驱动超时
    LK_STARTVRSTREAM_START_DRIVER_RUNTIME_TIMEOUT       = 1002,
    // 启动VR流媒体 udp 端口出错
    LK_STARTVRSTREAM_START_DRIVER_RUNTIME_UDPPORT_ERROR = 1003,
    // 启动VR流媒体 udp 编码出错
    LK_STARTVRSTREAM_START_DRIVER_RUNTIME_ENCODER_ERROR = 1004,

    //
    // ui相关事件通知
    // 
    // 警告框弹出（3.1.8.1添加）
    LK_WEBCLIENT_NOTIFY_ALERT                           = 1100,
    // 确认框弹出（3.1.8.1添加）
    LK_WEBCLIENT_NOTIFY_CONFIRM                         = 1101,
    //
    LK_WEBCLIENT_TOAST_MSG                              = 1102,

    // 用户操作触发事件
    // 用户截图 (3.1.8.3)
    LK_USER_CAPTURE_FRAME                               = 2000,
    // 用户截图并附带数据 (3.1.8.8)
    LK_USER_CAPTURE_FRAME_WITH_EXTRA_DATA               = 2001,

    // 外部请求截图 (3.1.8.3)
    LK_REQUEST_CAPTURE_FRAME                            = 3000,
    // 外部请求截图并附带数据 (3.1.8.8)
    LK_REQUEST_CAPTURE_FRAME_WITH_EXTRA_DATA            = 3001,

    //
    // iframe 外部发送给 web 客户端消息
    //
    // 操作
    // 鼠标操作
    LK_IFRAME_POSTER_OPERATE_MOUSE_MOVE               = 10000,
    LK_IFRAME_POSTER_OPERATE_MOUSE_DOWN               = 10001,
    LK_IFRAME_POSTER_OPERATE_MOUSE_UP                 = 10002,
    LK_IFRAME_POSTER_OPERATE_MOUSE_WHEEL              = 10003,
    // 键盘操作
    LK_IFRAME_POSTER_OPERATE_KEY_DOWN                 = 10010,
    LK_IFRAME_POSTER_OPERATE_KEY_UP                   = 10011,
    // 触摸操作
    LK_IFRAME_POSTER_OPERATE_TOUCH_DOWN               = 10020,
    LK_IFRAME_POSTER_OPERATE_TOUCH_MOVE               = 10021,
    LK_IFRAME_POSTER_OPERATE_TOUCH_UP                 = 10022,
    // 摇杆操作
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_BUTTON_DOWN      = 10030,
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_BUTTON_UP        = 10031,
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_TRIGGER_VALUE    = 10032,
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_JOYSTICK_STATES  = 10033,
    // 麦克风操作打开或关闭默认麦克风
    LK_IFRAME_POSTER_OPENAUDIO_INPUT                  = 10040,
    LK_IFRAME_POSTER_CLOSE_AUDIO_INPUT                = 10041,

    // 功能
    // 设置鼠标模式，锁定模式和非锁定模式
    LK_IFRAME_POSTER_FUNC_MOUSE_MODE                  = 10100,
    // 设置缩放模式
    LK_IFRAME_POSTER_FUNC_SCALE_MODE                  = 10101,
    // 重新启动云端应用（3.1.8.1添加）
    LK_IFRAME_POSTER_FUNC_RESTART_CLOUD_APP           = 10102,
    // 微信浏览器加载成功事件 （3.1.8.1添加）
    LK_IFRAME_POSTER_FUNC_WX_JS_BRIDGE_READY          = 10103,
    // 请求播放视频 (当视频组件播放失败需要用户触发
    // 但禁用客户端内部 alert 时调用)
    LK_IFRAME_POSTER_FUNC_REQUEST_PLAY_VIDEO          = 10104,

    // 控制 ui 
    // 是否显示桌面端控制栏
    LK_IFRAME_POSTER_UI_CONTROLLER_BAR                = 10200,
    // 是否显示玩家列表
    LK_IFRAME_POSTER_UI_PLAYER_LIST                   = 10201,
    // 是否显示分享模式下分享 url
    LK_IFRAME_POSTER_UI_PLAYER_SHARE_URL              = 10202,
    // 是否显示手机端控制球
    LK_IFRAME_POSTER_UI_MOBILE_CONTROL_BALL           = 10203,
    // 是否显示手机端摇杆
    LK_IFRMAE_POSTER_UI_MOBILE_JOYSTICK               = 10204,
    // 是否显示手机端虚拟键盘
    LK_IFRAME_POSTER_UI_MOBILE_VIRTUAL_KEYBOARD       = 10205,
    // 是否显示手机端虚拟鼠标
    LK_IFRAME_POSTER_UI_MOBILE_VIRTUAL_MOUSE          = 10206,
    // 是否显示手机端菜单
    LK_IFRAME_POSTER_UI_MOBILE_MENU                   = 10207,
    // 是否手机端强制横屏
    LK_IFRAME_POSTER_UI_MOBILE_FORCE_LANDSCAPE        = 10208,
    // 是否显示触摸点
    LK_IFRAME_POSTER_UI_MOBILE_TOUCH_POINT            = 10209,
    // 设置 Toast 显示级别（3.1.8.1添加）
    LK_IFRAME_POSTER_UI_TOAST_LEVEL                   = 10210,
    // 设置 Alert 是否显示（3.1.8.1添加）
    LK_IFRAME_POSTER_UI_ALERT                         = 10211,
    // 设置 Confirm 是否显示（3.1.8.1添加）
    LK_IFRAME_POSTER_UI_CONFIRM                       = 10212,
    

    //
    // iframe 外部接收 web 客户端消息 from datachannel 
    //
    LK_DATA_CHANNEL_ESTABLISHED                        = 20000,
    LK_DATA_CHANNEL_RETYING                            = 20001,
    LK_DATA_CHANNEL_CLOSE                              = 20002,
    LK_DATA_CHANNEL_ERROR                              = 20003,
    LK_DATA_CHANNEL_BINARY_MESSAGE                     = 20004,
    LK_DATA_CHANNEL_TEXT_MESSAGE                       = 20005,
    //
    // iframe 外部发送给 web 客户端 to datachannel 
    //
    LK_RE_CONNECT_DATA_CHANNEL                         = 20100,
    LK_CLOSE_DATA_CHANNEL                              = 20101,
    LK_DATA_CHANNEL_SEND_TEXT                          = 20102,
    LK_DATA_CHANNEL_SEND_BINARY                        = 20103,
    //
    // iframe 外部接收 web 客户端消息  from datachannel-renderserver
    //
    LK_DATA_CHANNEL_RENDERSERVER_OPEN                  = 20200,
    LK_DATA_CHANNEL_RENDERSERVER_CLOSE                 = 20201,
    LK_DATA_CHANNEL_RENDERSERVER_BINARY_MESSAGE        = 20202,
    LK_DATA_CHANNEL_RENDERSERVER_TEXT_MESSAGE          = 20203,
    //
    // iframe 外部发送给 web 客户端 to datachannel 
    //
    LK_DATA_CHANNEL_RENDERSERVER_SEND_TEXT            = 20300,
    LK_DATA_CHANNEL_RENDERSERVER_SEND_BINARY          = 20301,
}
```
