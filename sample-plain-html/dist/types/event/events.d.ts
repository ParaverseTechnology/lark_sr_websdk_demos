import { LocalEvent } from './event_base';
export declare enum GLOBAL_EVENT_TYPE {
    /**
     * video 元素已挂载
     */
    MOUNTED = 1,
    /**
     * 打开 socket
     */
    SOCKET_OPEN = 2,
    /**
     * 消息窗口
     */
    ALERT = 3,
    /**
     * 获取远程视频流
     */
    GOT_REMOTE_STREAM = 4,
    /**
     * 视频流加载成功
     */
    LOADEDMETADATA = 5,
    /**
     * 重设config
     */
    RECONFIG = 6,
    /**
     * 开始点对点连接
     */
    STARTPC = 7,
    /**
     * 连接失败
     */
    PC_FAILED = 8,
    /**
     * 结束点对点连接
     */
    STOPPC = 9,
    /**
     * 结束点对点连接
     */
    RTSP_SUCCESS = 10,
    /**
     * 刷新连接
     */
    REFRESH = 11,
    /**
     * 开始计时
     */
    START_TIMER = 12,
    /**
     * 计时结束 结束应用
     */
    COURSE_OVER = 13,
    /**
     * 退出
     */
    QUIT = 14,
    /**
     * 虚拟按键按下事件
     */
    VIRTUAL_KEY_DOWN = 15,
    /**
     * 虚拟按键抬起
     */
    VIRTUAL_KEY_UP = 16,
    /**
     * 摇杆事件
     */
    JOY_STICK_MOUSE_MOVE = 17,
    /**
     * 虚拟鼠标移动
     */
    VIRTUAL_MOUSE_MOVE = 18,
    /**
     * 虚拟鼠标触摸点移动
     */
    VIRTUAL_MOUSE_POINTER = 19,
    /**
     *
     */
    VIRTUAL_MOUSE_DOWN = 20,
    /**
     *
     */
    VIRTUAL_MOUSE_UP = 21,
    /**
     * 虚拟滚轮滚动
     */
    VIRTUAL_MOUSE_WHEEL = 22,
    /***
     * pc鼠标事件转发
     */
    MOUSE_MOVE = 23,
    MOUSE_WHEEL = 24,
    MOUSE_DOWN = 25,
    MOUSE_UP = 26,
    /**
     *  鼠标指针移动
     */
    CURSOR_MOVE = 27,
    /**
     *  鼠标变化
     */
    APP_CURSOR_CHANGE = 28,
    FULL_SCREEN_CHANGE = 29,
    REMOTE_SCREEN_READY = 30,
    DISPATCH_CONTROLLER = 31,
    LK_RE_CONNECT_DATA_CHANNEL = 32,
    LK_CLOSE_DATA_CHANNEL = 33,
    LK_DATA_CHANNEL_SEND_TEXT = 34,
    LK_DATA_CHANNEL_SEND_BINARY = 35,
    LK_DATA_CHANNEL_SEND_VIEW_PORT = 36,
    LK_DATA_CHANNEL_SEND_CLIENT_INFO = 37,
    LK_DATA_CHANNEL_RENDERSERVER_SEND_TEXT = 38,
    LK_DATA_CHANNEL_RENDERSERVER_SEND_BINARY = 39,
    INPUT_TEXT = 40,
    SET_VOLUME = 41,
    LK_IFRAME_POSTER_FUNC_RESTART_CLOUD_APP = 42,
    LK_IFRAME_POSTER_FUNC_WX_JS_BRIDGE_READY = 43,
    LK_REQUEST_CAPTURE_FRAME = 44,
    LK_REQUEST_CAPTURE_FRAME_WITH_EXTRA_DATA = 45
}
export declare type GlobalEvent = LocalEvent<GLOBAL_EVENT_TYPE>;
export declare function createGlobalEvent(type: GLOBAL_EVENT_TYPE, target?: any): GlobalEvent;
export default GLOBAL_EVENT_TYPE;
