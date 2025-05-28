# LarkSR Event System

Throughout the lifecycle of LarkSR, various event notifications will be thrown. The usage is similar to:

```javascript
var larksr;

// create code
...

// Listen for the connection success event
larksr.on('connect', function(e) { 
    console.log("LarkSRClientEvent CONNECT", e); 
});
```

Or use the exported enum values

```javascript
larksr.on(LarkSRClientEvent.TASK_CREATE_SUCCESS, (e) => { 
    console.log("LarkSRClientEvent TASK_CREATE_SUCCESS", e); 
});
```

The `LarkEvent = 'larkevent'`, `ERROR = 'error'`, `INFO = 'info'` events have an attached code field, which includes event codes: [event_codes](./event_codes.md)
The event code values in [event_codes](./event_codes.md) will be thrown in the LarkEvent event.

## Complete Event Definitions

```javascript
/**
 * Complete event definitions for LarkSR instance
 */
declare const enum LarkSRClientEvent {
    /**
     * TASK creation successful, returns Task related information
     */
    TASK_CREATE_SUCCESS = "taskcreatesuccess",
    /**
     * TASK creation failed
     */
    TASK_CREATE_FAILED = "taskcreatefailed",
    /**
     * Insufficient rendering resources
     * {
            // Error code returned by the server, present when the server request is correct. Pay attention to the error codes for insufficient rendering resources.
            // Use type == 0 to determine if it is an insufficient rendering resource error, then use code for detailed handling, or just use type == 0 for handling.
            // 813=The current number of running applications has reached the maximum: {0}, please try again later
            // 814=The number of running applications under the same appKey has reached the maximum: {0}, please try again later
            // 815=The number of running applications has reached the maximum authorized concurrency, please try again later
            // 816=The number of running VR applications has reached the maximum authorized concurrency, please try again later
            // 817=Insufficient rendering resources, please try again later
            // 820=No active GPU nodes
            // 821=Node resource usage has reached the set threshold
            // 823=The number of running applications on a single node has reached the maximum authorized concurrency, please try again later
            code?: 817,

            // Error message
            message:? "",
        }
     *
     */
    RESOURCE_NOT_ENOUGH = "resourcenotenough",
    /**
     * Successfully connected to the rendering server.
     */
    CONNECT = "connect",
    /**
     * Triggered when login is successful, returns the current user id.
     */
    LOGIN_SUCCESS = "loginsuccess",
    /**
     * Triggered when there is no operation timeout.
     */
    NO_OPERATION_TIMEOUT = "operatetimeout",
    /**
     * Connection closed.
     */
    CLOSE = "close",
    /**
     * Cloud application closed, but connection not closed
     */
    APP_CLOSE = "appclose",
    /**
     * Received remote video stream.
     */
    GOT_REMOTE_STREAM = "gotremotestream",
    /**
     * Received remote audio stream.
     */
    GOT_REMOTE_AUDIO_STREAM = "gotremoteaudiostream",
    /**
     * Video loaded successfully, waiting to play.
     */
    MEDIA_LOADED = "meidaloaded",
    /**
     * Video autoplay successful.
     */
    MEDIA_PLAY_SUCCESS = "mediaplaysuccess",
    /**
     * Video autoplay failed.
     */
    MEDIA_PLAY_FAILED = "mediaplayfailed",
    /**
     * Autoplay sound failed, playing in mute mode.
     */
    MEDIA_PLAY_MUTE = "meidaplaymute",
    /**
     * Cloud rendering connection state changed.
     */
    APPSTATE_CHANGE = "appstatechange",
    /**
     * Cloud application size changed.
     */
    APP_RESIZE = "appresize",
    /**
     * Triggered when the cloud application mouse mode changes.
     */
    APP_MOUSE_MODE = "appmousemode",
    /**
     * Cloud application mouse state changed.
     */
    APP_CURSOR_MODE = "appcursormode",
    /**
     * Player list.
     */
    PLAYER_LIST = "playerlist",
    /**
     * Video connection status
     */
    PEERSTATUS_REPORT = "peerstatusreport",
    /**
     * Cloud application requests text input.
     */
    APP_REQUEST_INPUT = "apprequestinput",
    /**
     * Cloud application requests gamepad vibration
     */
    APP_REQUEST_GAMEPAD_OUPUT = "apprequestgamepadoutput",
    /**
     * Screenshot successful.
     */
    CAPTURE_FRAME = "captureframe",
    /**
     * Data channel opened.
     */
    DATACHANNEL_OPEN = "datachannelopen",
    /**
     * Data channel closed.
     */
    DATACHANNEL_CLOSE = "datachannelclose",
    /**
     * Data channel received text message.
     * > V3.2.314 version corresponds to server version and data channel version 3.2.5.1 and above
     */
    DATACHANNEL_TEXT = "datachanneltext",
    /**
     * Data channel received binary message.
     */
    DATACHANNEL_BINARY = "datachannelbinary",
    /**
     * More detailed event status, mainly used for throwing to the outside of the iframe.
     */
    LarkEvent = "larkevent",
    /**
     * Thrown when an error occurs
     * type:     error
     * message: Error message
     * code:    Possible error codes are as follows, the specific definition of error codes @see [./event_codes]
     *          // Websocket proxy to the server closed
     *          LK_RENDER_SERVER_CLOSE                    : 102
     *          // Websocket proxy to the proxy server closed
     *          LK_PROXY_SERVER_CLOSE                     : 202
     *          // Version check failed, server and client version mismatch. Currently only 3.1 and 3.2 major version mismatch
     *          LK_VERSION_CHECK_FAILED                   : 301
     *          // Server returned Task creation failed
     *          TASK_NOTFOUND-TASK_NO_GPU_RESOURCE        : 401-404
     *          // Server failed to start streaming
     *          LK_START_STREAM_PROCESS_START-FAILED-LK_START_STREAM_ENCODER_ERROR : 501-504
     *          // RTC connection closed
     *          LK_RTC_EVENT_PEERCONNECTION_CLOSED        : 601
     *          // RTC connection error
     *          LK_RTC_EVENT_PEERCONNECTION_ERROR         : 602
     *          // RTC creation error, usually due to browser not supporting webrtc
     *          LK_RTC_EVENT_PEERCONNECTION_CREATE_FAILED : 603
     *          // Server actively requests client to exit
     *          LK_NOTIFY_CLIENT_LOGOUT_PLAYER_LOGOUT     : 800
     *          // Host exits in multi-viewer mode
     *          LK_NOTIFY_CLIENT_LOGOUT_TASKOWNER_LOGOUT  : 801
     *
     */
    ERROR = "error",
    /**
     * General information prompt
     */
    INFO = "info",
    /**
     * Voice dialogue status
     */
    AI_VOICE_STATUS = "aivoicestatus",
    /**
     * Voice recognition to text result
     */
    AI_VOICE_ASR_RESULT = "aivoiceasrresult",
    /**
     * Dialogue return result
     */
    AI_VOICE_DM_RESULT = "aivoicedmresult",
    /**
     * Detailed information on dialogue errors
     */
    AI_VOICE_ERROR = "aivoiceerror",
    /**
     * Added in server 3.2.7.0
     *
     */
    TOUCH_CTR_MAPPING = "touchctrmapping",
    /**
     * Added in server 3.2.7.0
     * RTMP live stream status
     */
    RTMP_STREAM_STATE = "rtmpstreamstate",
    /**
     * Added in server 3.2.7.0
     * RTMP live stream error
     */
    RTMP_STREAM_ERROR = "rtmpstreamerror"
}
```
