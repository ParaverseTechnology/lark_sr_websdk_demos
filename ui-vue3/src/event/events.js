import { 
    LocalEvent,
} from './event_base';

export const GLOBAL_EVENT_TYPE = {
    /**
     * video 元素已挂载
     */
    MOUNTED: 1,
    /**
     * 打开 socket 
     */
    SOCKET_OPEN: 2,
    /**
     * 消息窗口
     */
    ALERT: 3,
    /**
     * 获取远程视频流
     */
    GOT_REMOTE_STREAM: 4,
    /**
     * 视频流加载成功
     */
    LOADEDMETADATA: 5,
    /**
     * 重设config
     */
    RECONFIG: 6,
    /**
     * 开始点对点连接
     */
    STARTPC: 7,
    /**
     * 连接失败
     */
    PC_FAILED: 8,
    /**
     * 结束点对点连接
     */
    STOPPC: 9,
    /**
     * 结束点对点连接
     */
    RTSP_SUCCESS: 10,
    // --------------------------------------------------------------------------
    /**
     * 刷新连接
     */
    REFRESH: 11,
    /**
     * 开始计时
     */
    START_TIMER: 12,
    /**
     * 计时结束 结束应用
     */
    COURSE_OVER: 13,
    /**
     * 退出
     */
    QUIT: 14,
    // --------------------------------------------------------------------------
    /**
     * 虚拟按键按下事件
     */
    VIRTUALKEYDOWN: 15,
    /**
     * 虚拟按键抬起
     */
    VIRTUALKEYUP: 16,
    /**
     * 摇杆事件
     */
    RACKER: 17,
    /**
     * 虚拟鼠标移动
     */
    VIRTUALMOUSE: 18,
    /**
     * 虚拟鼠标触摸点移动
     */
    VIRTUALMOUSE_POINTER: 19,
    /**
     * 
     */
    VIRTUALMOUSE_DOWN: 20,
    /**
     * 
     */
    VIRTUALMOUSE_UP: 21,
    /**
     * 虚拟摇杆监听右键菜单
     */
    VIRTUALCONTEXTMENU: 22,
    /**
     * 虚拟摇杆左键事件
     */
    VIRTUALMOUSELEFT: 23,
    /**
     * 虚拟滚轮滚动
     */
    VIRTUALWHEEL: 24,
    /**
     * 虚拟tap
     */
    VIRTUALTAP: 25,
    /**
     * 虚拟鼠标按钮
     */
    VIRTUALMOUSE_BUTTON: 26,
    /**
     *  鼠标指针移动
     */
    CURSOR_MOVE: 27,
    /**
     *  鼠标变化
     */
    APP_CURSOR_CHANGE: 28,
    // 全屏变化
    FULL_SCREEN_CHANGE: 29,
    // 云端应用窗口准备完成
    REMOTE_SCREEN_READY: 30,
} 


export function createGlobalEvent(type, target) {
    return {
        type,
        target
    };
}

export default GLOBAL_EVENT_TYPE;