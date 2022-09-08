export declare enum LarkEventType {
    LK_WEB_CLIENT_LOAD_SUCCESS = 1,
    LK_TASK_CREATE_SUCCESS = 10,
    LK_TASK_CREATE_FAILED = 11,
    LK_RESOURCE_NOT_ENOUGH = 12,
    LK_TASK_SYNC_APP = 20,
    LK_TASK_SYNC_APP_FAILED = 21,
    LK_RENDER_SERVER_CONNECTED = 100,
    LK_RENDER_SERVER_FAILED = 101,
    LK_RENDER_SERVER_CLOSE = 102,
    LK_RENDER_SERVER_ERROR = 103,
    LK_PROXY_SERVER_CONNECTED = 200,
    LK_PROXY_SERVER_FAILED = 201,
    LK_PROXY_SERVER_CLOSE = 202,
    LK_PROXY_SERVER_ERROR = 203,
    LK_VERSION_CHECK_SUCCESS = 300,
    LK_VERSION_CHECK_FAILED = 301,
    LK_TASK_SUCCESS = 400,
    LK_TASK_NOTFOUND = 401,
    LK_TASK_SERVER_ERROR = 402,
    LK_TASK_APP_WRONGPARAM = 403,
    LK_TASK_NO_GPU_RESOURCE = 404,
    LK_START_STREAM_SUCCESS = 500,
    LK_START_STREAM_PROCESS_START_FAILED = 501,
    LK_START_STREAM_PROCESS_START_TIMEOUT = 502,
    LK_START_STREAM_NOT_STREAMING = 503,
    LK_START_STREAM_ENCODER_ERROR = 504,
    LK_RTC_EVENT_PEERCONNECTION_CONNECTED = 600,
    LK_RTC_EVENT_PEERCONNECTION_CLOSED = 601,
    LK_RTC_EVENT_PEERCONNECTION_ERROR = 602,
    LK_RTC_EVENT_PEERCONNECTION_CREATE_FAILED = 603,
    LK_RTC_EVENT_PEERCONNECTION_STATE = 610,
    LK_RTC_EVENT_PEERCONNECTION_RETRY = 611,
    LK_VIDEO_LOADED = 700,
    LK_VIDEO_PLAY_FAILED = 701,
    LK_GOT_REMOTE_STREAM = 710,
    LK_VIDEO_PLAY_SUCCSS = 711,
    LK_NOTIFY_CLIENT_LOGOUT_PLAYER_LOGOUT = 800,
    LK_NOTIFY_CLIENT_LOGOUT_TASKOWNER_LOGOUT = 801,
    LK_APP_PROCESS_NOTIFI_APP_QUIT = 900,
    LK_NO_OPERATION_TIMEOUT = 901,
    LK_LOADING_TIMEOUT = 902,
    LK_APP_RESIZE = 910,
    LK_APP_MOUSE_MODE = 911,
    LK_APP_PLAER_LIST = 912,
    LK_APP_REQUEST_TEXT = 913,
    LK_APP_CURSOR_STYLE = 914,
    LK_USER_REQUEST_QUIT = 920,
    LK_UI_RESIZE = 930,
    LK_STARTVRSTREAM_SUCCESS = 1000,
    LK_STARTVRSTREAM_START_PROCESS_FAILED = 1001,
    LK_STARTVRSTREAM_START_DRIVER_RUNTIME_TIMEOUT = 1002,
    LK_STARTVRSTREAM_START_DRIVER_RUNTIME_UDPPORT_ERROR = 1003,
    LK_STARTVRSTREAM_START_DRIVER_RUNTIME_ENCODER_ERROR = 1004,
    LK_WEBCLIENT_NOTIFY_ALERT = 1100,
    LK_WEBCLIENT_NOTIFY_CONFIRM = 1101,
    LK_WEBCLIENT_TOAST_MSG = 1102,
    LK_USER_CAPTURE_FRAME = 2000,
    LK_USER_CAPTURE_FRAME_WITH_EXTRA_DATA = 2001,
    LK_REQUEST_CAPTURE_FRAME = 3000,
    LK_REQUEST_CAPTURE_FRAME_WITH_EXTRA_DATA = 3001,
    LK_IFRAME_POSTER_OPERATE_MOUSE_MOVE = 10000,
    LK_IFRAME_POSTER_OPERATE_MOUSE_DOWN = 10001,
    LK_IFRAME_POSTER_OPERATE_MOUSE_UP = 10002,
    LK_IFRAME_POSTER_OPERATE_MOUSE_WHEEL = 10003,
    LK_IFRAME_POSTER_OPERATE_KEY_DOWN = 10010,
    LK_IFRAME_POSTER_OPERATE_KEY_UP = 10011,
    LK_IFRAME_POSTER_OPERATE_TOUCH_DOWN = 10020,
    LK_IFRAME_POSTER_OPERATE_TOUCH_MOVE = 10021,
    LK_IFRAME_POSTER_OPERATE_TOUCH_UP = 10022,
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_BUTTON_DOWN = 10030,
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_BUTTON_UP = 10031,
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_TRIGGER_VALUE = 10032,
    LK_IFRAME_POSTER_OPERATE_GAMEPAD_JOYSTICK_STATES = 10033,
    LK_IFRAME_POSTER_OPENAUDIO_INPUT = 10040,
    LK_IFRAME_POSTER_CLOSE_AUDIO_INPUT = 10041,
    LK_IFRAME_POSTER_FUNC_MOUSE_MODE = 10100,
    LK_IFRAME_POSTER_FUNC_SCALE_MODE = 10101,
    LK_IFRAME_POSTER_FUNC_RESTART_CLOUD_APP = 10102,
    LK_IFRAME_POSTER_FUNC_WX_JS_BRIDGE_READY = 10103,
    LK_IFRAME_POSTER_FUNC_REQUEST_PLAY_VIDEO = 10104,
    LK_IFRAME_POSTER_UI_CONTROLLER_BAR = 10200,
    LK_IFRAME_POSTER_UI_PLAYER_LIST = 10201,
    LK_IFRAME_POSTER_UI_PLAYER_SHARE_URL = 10202,
    LK_IFRAME_POSTER_UI_MOBILE_CONTROL_BALL = 10203,
    LK_IFRMAE_POSTER_UI_MOBILE_JOYSTICK = 10204,
    LK_IFRAME_POSTER_UI_MOBILE_VIRTUAL_KEYBOARD = 10205,
    LK_IFRAME_POSTER_UI_MOBILE_VIRTUAL_MOUSE = 10206,
    LK_IFRAME_POSTER_UI_MOBILE_MENU = 10207,
    LK_IFRAME_POSTER_UI_MOBILE_FORCE_LANDSCAPE = 10208,
    LK_IFRAME_POSTER_UI_MOBILE_TOUCH_POINT = 10209,
    LK_IFRAME_POSTER_UI_TOAST_LEVEL = 10210,
    LK_IFRAME_POSTER_UI_ALERT = 10211,
    LK_IFRAME_POSTER_UI_CONFIRM = 10212,
    LK_DATA_CHANNEL_ESTABLISHED = 20000,
    LK_DATA_CHANNEL_RETYING = 20001,
    LK_DATA_CHANNEL_CLOSE = 20002,
    LK_DATA_CHANNEL_ERROR = 20003,
    LK_DATA_CHANNEL_BINARY_MESSAGE = 20004,
    LK_DATA_CHANNEL_TEXT_MESSAGE = 20005,
    LK_RE_CONNECT_DATA_CHANNEL = 20100,
    LK_CLOSE_DATA_CHANNEL = 20101,
    LK_DATA_CHANNEL_SEND_TEXT = 20102,
    LK_DATA_CHANNEL_SEND_BINARY = 20103,
    LK_DATA_CHANNEL_RENDERSERVER_OPEN = 20200,
    LK_DATA_CHANNEL_RENDERSERVER_CLOSE = 20201,
    LK_DATA_CHANNEL_RENDERSERVER_BINARY_MESSAGE = 20202,
    LK_DATA_CHANNEL_RENDERSERVER_TEXT_MESSAGE = 20203,
    LK_DATA_CHANNEL_RENDERSERVER_SEND_TEXT = 20300,
    LK_DATA_CHANNEL_RENDERSERVER_SEND_BINARY = 20301
}
export default class LarkEvent {
    static GetEventMessageByType(type: LarkEventType): string;
}
