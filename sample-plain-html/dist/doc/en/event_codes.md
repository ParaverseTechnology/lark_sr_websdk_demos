# Event Codes

The `code` field is attached to the events `LarkEvent = 'larkevent'`, `ERROR = 'error'`, `INFO = 'info'`. The specific values are listed below as `LarkEventType`.
All event codes may be thrown in the `LarkEvent` event.

The `LarkEventType` event codes are also used for listening to event codes when using the iframe poster method. For iframe embedding client and using event codes, refer to the demo: [larkwebclient-iframe-demos](https://github.com/ParaverseTechnology/larkwebclient-iframe-demos)

```typescript
//
// Unified client event codes.
//
export enum LarkEventType {
    // Web client loaded successfully (added in 3.1.8.1)
    LK_WEB_CLIENT_LOAD_SUCCESS                       = 1,
    // Enter application interface call
    LK_TASK_CREATE_SUCCESS                           = 10,
    LK_TASK_CREATE_FAILED                            = 11,
    // Insufficient rendering resources
    LK_RESOURCE_NOT_ENOUGH                           = 12,
    // Synchronizing application
    LK_TASK_SYNC_APP                                 = 20,
    // Sync task failed (added in 3.1.8.1)
    LK_TASK_SYNC_APP_FAILED                          = 21,
    //
    // Connect to application server events. Thrown when directly connecting to the rendering server
    // Message source: websocket connection events
    //
    // Connected to rendering server successfully
    LK_RENDER_SERVER_CONNECTED                       = 100,
    // Failed to connect to rendering server
    LK_RENDER_SERVER_FAILED                          = 101,
    // Connection to rendering server closed
    LK_RENDER_SERVER_CLOSE                           = 102,
    // Connection to rendering server error
    LK_RENDER_SERVER_ERROR                           = 103,

    //
    // Connect to websocket proxy server events
    // Message source: websocket proxy connection events
    //
    // Connected to proxy server successfully
    LK_PROXY_SERVER_CONNECTED                        = 200,
    // Failed to connect to proxy server
    LK_PROXY_SERVER_FAILED                           = 201,
    // Connection to proxy server closed
    LK_PROXY_SERVER_CLOSE                            = 202,
    // Connection to proxy server error
    LK_PROXY_SERVER_ERROR                            = 203,

    //
    // Version check
    // Message source: server protocol response ToClientMessage->VersionCheckResponse
    //
    // Version check successful
    LK_VERSION_CHECK_SUCCESS                         = 300,
    // Version check failed
    LK_VERSION_CHECK_FAILED                          = 301,

    //
    // Task check
    // Message source: server protocol response ToClientMessage->TaskResponse
    //
    // Request task successful
    LK_TASK_SUCCESS                                  = 400,
    // Task not found
    LK_TASK_NOTFOUND                                 = 401,
    // Server error
    LK_TASK_SERVER_ERROR                             = 402,
    // Application parameter error
    LK_TASK_APP_WRONGPARAM                           = 403,
    // Task obtained successfully, but no GPU resources available
    LK_TASK_NO_GPU_RESOURCE                          = 404,

    //
    // Start streaming
    // Message source: server protocol response ToClientMessage->StartStreamResponse
    //
    // Start streaming successful
    LK_START_STREAM_SUCCESS                           = 500,
    // Start streaming process failed
    LK_START_STREAM_PROCESS_START_FAILED              = 501,
    // Start streaming timeout
    LK_START_STREAM_PROCESS_START_TIMEOUT             = 502,
    // Not streaming
    LK_START_STREAM_NOT_STREAMING                     = 503,
    // Streaming encoder error
    LK_START_STREAM_ENCODER_ERROR                     = 504,

    //
    // RTC events
    // Message source: webrtc connection events and ToClientMessage->WebrtcError
    //
    // RTC connection successful
    LK_RTC_EVENT_PEERCONNECTION_CONNECTED             = 600,
    // RTC connection closed
    LK_RTC_EVENT_PEERCONNECTION_CLOSED                = 601,
    // RTC connection error
    LK_RTC_EVENT_PEERCONNECTION_ERROR                 = 602,
    // RTC creation error, usually due to browser not supporting webrtc
    // Added in 3.2.0.14
    LK_RTC_EVENT_PEERCONNECTION_CREATE_FAILED         = 603,
    // RTC state report (rtt, bitrate, etc.) Added in 3.1.1.8
    LK_RTC_EVENT_PEERCONNECTION_STATE                 = 610,
    // RTC retry Added in 3.1.6.2
    LK_RTC_EVENT_PEERCONNECTION_RETRY                 = 611,

    //
    // Load video stream
    // Message source: browser or native component Fixed in 3.1.6.2
    //
    LK_VIDEO_LOADED                                  = 700,
    // Video autoplay failed, request manual trigger (3.1.8.2)
    LK_VIDEO_PLAY_FAILED                             = 701,
    // Received cloud video stream but not started playing (3.1.8.3)
    LK_GOT_REMOTE_STREAM                             = 710,
    // Received cloud video stream and started playing (3.2.13.0)
    LK_VIDEO_PLAY_SUCCSS                             = 711,

    //
    // Server-initiated logout
    // Message source: backend protocol NotifyClientLogout
    //
    LK_NOTIFY_CLIENT_LOGOUT_PLAYER_LOGOUT            = 800,
    // Host logout in multi-viewer mode
    LK_NOTIFY_CLIENT_LOGOUT_TASKOWNER_LOGOUT         = 801,

    //
    // Server pushes cloud application events
    // Message source: backend protocol AppProcessNotification
    //
    LK_APP_PROCESS_NOTIFI_APP_QUIT                   = 900,
    // No operation timeout (added in 3.1.8.1)
    LK_NO_OPERATION_TIMEOUT                          = 901,
    // Loading timeout (added in 3.1.8.8)
    LK_LOADING_TIMEOUT                               = 902,
    // Cloud application size change
    // Added in 3.1.1.8
    LK_APP_RESIZE                                    = 910,
    // Cloud application mouse mode change
    // Added in 3.1.1.8
    LK_APP_MOUSE_MODE                                = 911,
    // Received player list
    // Added in 3.1.1.10
    LK_APP_PLAER_LIST                                = 912,
    // APP requests text input
    LK_APP_REQUEST_TEXT                              = 913,
    // sdk new
    // Cloud mouse style
    LK_APP_CURSOR_STYLE                              = 914,
    // User manually clicked close button
    LK_USER_REQUEST_QUIT                             = 920,
    // Local webpage resize event
    LK_UI_RESIZE                                     = 930,

    //
    // XR related events
    //
    // Start VR streaming successful
    LK_STARTVRSTREAM_SUCCESS                            = 1000,
    // Start VR streaming process failed
    LK_STARTVRSTREAM_START_PROCESS_FAILED               = 1001,
    // Start VR streaming driver timeout
    LK_STARTVRSTREAM_START_DRIVER_RUNTIME_TIMEOUT       = 1002,
    // Start VR streaming UDP port error
    LK_STARTVRSTREAM_START_DRIVER_RUNTIME_UDPPORT_ERROR = 1003,
    // Start VR streaming UDP encoder error
    LK_STARTVRSTREAM_START_DRIVER_RUNTIME_ENCODER_ERROR = 1004,

    //
    // UI related event notifications
    // 
    // Alert box popup (added in 3.1.8.1)
    LK_WEBCLIENT_NOTIFY_ALERT                           = 1100,
    // Confirm box popup (added in 3.1.8.1)
    LK_WEBCLIENT_NOTIFY_CONFIRM                         = 1101,
    //
    LK_WEBCLIENT_TOAST_MSG                              = 1102,

    // User operation triggered events
    // User screenshot (3.1.8.3)
    LK_USER_CAPTURE_FRAME                               = 2000,
    // User screenshot with extra data (3.1.8.8)
    LK_USER_CAPTURE_FRAME_WITH_EXTRA_DATA               = 2001,

    // External request for screenshot (3.1.8.3)
    LK_REQUEST_CAPTURE_FRAME                            = 3000,
    // External request for screenshot with extra data (3.1.8.8)
    LK_REQUEST_CAPTURE_FRAME_WITH_EXTRA_DATA            = 3001,

    //
    // iframe external messages to web client
    //
    // Operations
    // Mouse operations
    LK_IFRAME_POSTER_OPERATE_MOUSE_MOVE               = 10000,
    LK_IFRAME_POSTER_OPERATE_MOUSE_DOWN               = 10001,
    LK_IFRAME_POSTER_OPERATE_MOUSE_UP                 = 10002,
    LK_IFRAME_POSTER_OPERATE_MOUSE_WHEEL              = 10003,
    // Keyboard operations
    LK_IFRAME_POSTER_OPERATE_KEY_DOWN                 = 10010,
    LK_IFRAME_POSTER_OPERATE_KEY_UP                   = 10011,
    // Touch operations
    LK_IFRAME_POSTER_OPERATE_TOUCH_DOWN               = 10020,
    LK_IFRAME_POSTER_OPERATE_TOUCH_MOVE               = 10021,
    LK_IFRAME_POSTER_OPERATE_TOUCH_UP                 = 10022,
    // Joystick operations
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_BUTTON_DOWN      = 10030,
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_BUTTON_UP        = 10031,
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_TRIGGER_VALUE    = 10032,
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_JOYSTICK_STATES  = 10033,
    // Microphone operations to open or close the default microphone
    LK_IFRAME_POSTER_OPENAUDIO_INPUT                  = 10040,
    LK_IFRAME_POSTER_CLOSE_AUDIO_INPUT                = 10041,

    // Functions
    // Set mouse mode, lock mode and unlock mode
    LK_IFRAME_POSTER_FUNC_MOUSE_MODE                  = 10100,
    // Set scale mode
    LK_IFRAME_POSTER_FUNC_SCALE_MODE                  = 10101,
    // Restart cloud application (added in 3.1.8.1)
    LK_IFRAME_POSTER_FUNC_RESTART_CLOUD_APP           = 10102,
    // WeChat browser load success event (added in 3.1.8.1)
    LK_IFRAME_POSTER_FUNC_WX_JS_BRIDGE_READY          = 10103,
    // Request to play video (when video component playback fails and requires user trigger
    // but client internal alert is disabled)
    LK_IFRAME_POSTER_FUNC_REQUEST_PLAY_VIDEO          = 10104,

    // Control UI 
    // Whether to display the desktop control bar
    LK_IFRAME_POSTER_UI_CONTROLLER_BAR                = 10200,
    // Whether to display the player list
    LK_IFRAME_POSTER_UI_PLAYER_LIST                   = 10201,
    // Whether to display the share URL in share mode
    LK_IFRAME_POSTER_UI_PLAYER_SHARE_URL              = 10202,
    // Whether to display the mobile control ball
    LK_IFRAME_POSTER_UI_MOBILE_CONTROL_BALL           = 10203,
    // Whether to display the mobile joystick
    LK_IFRMAE_POSTER_UI_MOBILE_JOYSTICK               = 10204,
    // Whether to display the mobile virtual keyboard
    LK_IFRAME_POSTER_UI_MOBILE_VIRTUAL_KEYBOARD       = 10205,
    // Whether to display the mobile virtual mouse
    LK_IFRAME_POSTER_UI_MOBILE_VIRTUAL_MOUSE          = 10206,
    // Whether to display the mobile menu
    LK_IFRAME_POSTER_UI_MOBILE_MENU                   = 10207,
    // Whether to force landscape mode on mobile
    LK_IFRAME_POSTER_UI_MOBILE_FORCE_LANDSCAPE        = 10208,
    // Whether to display touch points
    LK_IFRAME_POSTER_UI_MOBILE_TOUCH_POINT            = 10209,
    // Set Toast display level (added in 3.1.8.1)
    LK_IFRAME_POSTER_UI_TOAST_LEVEL                   = 10210,
    // Set Alert display (added in 3.1.8.1)
    LK_IFRAME_POSTER_UI_ALERT                         = 10211,
    // Set Confirm display (added in 3.1.8.1)
    LK_IFRAME_POSTER_UI_CONFIRM                       = 10212,
    

    //
    // iframe external messages to web client from datachannel 
    //
    LK_DATA_CHANNEL_ESTABLISHED                        = 20000,
    LK_DATA_CHANNEL_RETYING                            = 20001,
    LK_DATA_CHANNEL_CLOSE                              = 20002,
    LK_DATA_CHANNEL_ERROR                              = 20003,
    LK_DATA_CHANNEL_BINARY_MESSAGE                     = 20004,
    LK_DATA_CHANNEL_TEXT_MESSAGE                       = 20005,
    //
    // iframe external messages to web client to datachannel 
    //
    LK_RE_CONNECT_DATA_CHANNEL                         = 20100,
    LK_CLOSE_DATA_CHANNEL                              = 20101,
    LK_DATA_CHANNEL_SEND_TEXT                          = 20102,
    LK_DATA_CHANNEL_SEND_BINARY                        = 20103,
    //
    // iframe external messages to web client from datachannel-renderserver
    //
    LK_DATA_CHANNEL_RENDERSERVER_OPEN                  = 20200,
    LK_DATA_CHANNEL_RENDERSERVER_CLOSE                 = 20201,
    LK_DATA_CHANNEL_RENDERSERVER_BINARY_MESSAGE        = 20202,
    LK_DATA_CHANNEL_RENDERSERVER_TEXT_MESSAGE          = 20203,
    //
    // iframe external messages to web client to datachannel 
    //
    LK_DATA_CHANNEL_RENDERSERVER_SEND_TEXT            = 20300,
    LK_DATA_CHANNEL_RENDERSERVER_SEND_BINARY          = 20301,
}
```
