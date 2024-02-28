# LarkSR 对象成员变量

LarkSR 对象成员变量,注意以下划线开头的变量为内部使用私有变量或只读成员变量，不建议修改直接使用。

> 以下代码中 larksr 为创建好的 LarkSR 对象实例。省略创建过程。

```javascript
let larksr;

...// create code.
```

## 视频组件

1. `videoComponent` 视频组件

```javascript
// 获取播放的 <video /> 视频元素
larksr.videoComponent.getVideo();
// 播放视频，async 方法播放失败抛出异常
larksr.videoComponent.playVideo();
// 停止视频播放
larksr.videoComponent.stopVideo();
// 播放视频声音，取消静音播放
larksr.videoComponent.sountPlayout();
// 截取一帧，返回 base64，并抛出截图成功事件
larksr.videoComponent.captrueFrame(data);
```

2. `videoElement`  html `video` 视频元素本身

```javascript
larksr.videoElement;
```

3. 控制显示元素

```javascript
// 是否显示移动端触摸点
larksr.isEnableTouchPoint = false;
// 是否显示载入画面时底部文字
larksr.isEnableLoadingStateBar = false;
```

```javascript
// 设置缩放模式
larksr.scaleMode = ScaleMode.CONTAIN_APP;
```

4. 虚拟鼠标和触摸点

```javascript
/**
 * 虚拟鼠标的当前位置,相对于整体容器
 */
larksr.virtualCursorPosition
/**
 * 虚拟鼠标的当前位置,内部缩放容器，与实际显示虚拟鼠标 CSS 样式相同
 */
larksr.virtualCursorPositionRaw
```

例：

下面示例代码使用 react 演示点击一个按钮，同步一个外层的元素和虚拟鼠标的位置

```javascript
// ....
// 省略 react 创建代码
export default class App extends React.Component {
    private state: any = {
        pointPosition: {
            x: 0,
            y: 0,
        }
    };
    // ....
    // 此处省略 larksr 创建过程等其他代码
    render() {
        return (
            <div>
                // ...
                // 省略其他元素
                <div style={{
                        zIndex: 1000,
                        position: 'absolute', 
                        left: this.state.pointPosition.x, 
                        top: this.state.pointPosition.y,
                        backgroundColor: "red",
                        width: 50,
                        height: 50,
                        borderRadius: "50%"
                    }}>
                </div>
                <button style={{pointerEvents: "all"}} 
                    onClick={()=>{
                        // 获取虚拟鼠标的位置
                        console.log("touch point", this.larksr.virtualCursorPosition);
                        // 同步虚拟鼠标的位置
                        this.setState({
                            pointPosition: this.larksr.virtualCursorPosition,
                        })
                    }}
                    >
                    touchPoint
                </button>
            </div>
        )
    }
}
```

## 配置参数

```javascript
// `config` IAppliParams传入的 ILarkSRConfig 对象
larksr.config;
//  `params` 构造函数中传入的 IAppliParams 对象
larksr.params;
```

## 用户模式

```javascript
// `playerModeType` 当前的玩家模式;
larksr.playerModeType;
// `userType` 当前用户类型;
larksr.userType;
// 当前是否是交互模式，交互默认即可以操作的模式
larksr.isInteractiveMode;
// 是否是观看者模式
larksr.isObMode;
```

## 当前 app 的状态

```javascript
larksr.appState;
```

具体状态值如下:

```javascript
export enum APP_STATE {
    BEFORE_CREATE = 0,
    INITED,
    WEBSOCKET_CHANNEL_OPEN,
    LOGIN_SUCCESS,
    RTC_CONNECTED,
    MEDIA_LOADED,
    MEDIA_PLAYED,
    RTC_RETRY,
    APP_RETRY,
    BEFORE_DESTORY,
    WEBSOCKET_CLOSED,
    RTC_CLOSED,
    DESTROYED,
}
```

可通过事件 `APPSTATE_CHANGE = 'appstatechange'` 监听 APP_STATE 的变化

```javascript
// create code
...

// 监听连接成功事件
larksr.on('appstatechange', function(e) { 
    console.log("appstatechange", e); 
});
```

## 云端画面是否准备好

```javascript
// 云端画面是否准备好，准备好后才可以发送输入事件
larksr.remoteScreenReady
```

## 当前的屏幕状态

```javascript
// 通知视口改变或者需要重新计算显示属性
larksr.screenState.resize();
// 当前云端 APP 的大小
larksr.screenState.appSize;
// 当前云端 APP 的鼠标状态
larksr.screenState.appMouseMode;
// 当前渲染容器的大小
larksr.screenState.viewPort;
// 强制横屏模式
larksr.screenState.screenOrientation;
// 缩放模式
larksr.screenState.scaleMode;
// 是否全屏状态
larksr.screenState.isFullScreen;
// 是否锁定鼠标状态
larksr.screenState.isLockMouse;
// 云端应用的鼠标样式
larksr.screenState.cursorStyle;
// 初始化鼠标模式
larksr.screenState.initCursorMode;
// 是否是手机模式
larksr.screenState.isMobile;
// 是否渲染本地鼠标
larksr.screenState.isLocalRenderMouse;
// 是否锁定鼠标
larksr.screenState.isLockMosue;
```

监听 screenState 的状态改变，事件码为 `0`。当 SDK 内部或者外部触发了 `screenState.resize()` 之后调用。

```javascript
larksr.screenState.on(0, () => {
    console.log("screen state resize", larksr.screenState.screenOrientation);
});
```

## 操作类实例

```javascript
// 开始监听,默认情况下自动开始
larksr.op.startListening();
// 结束监听输入事件.
larksr.op.stopListenling();
// 开启或关闭鼠标输入事件
larksr.op.setMouseEnable(enable: boolean);
// 开启或关闭键盘输入事件
larksr.op.setKeyboardEnable(enable: boolean);
// 开启或关闭手柄输入事件
larksr.op.setGamepadEnable(enable: boolean);
// 开启或关闭触摸屏幕输入事件
larksr.op.setTouchEnable(enable: boolean);
```

### 操作类中的 keyboardhandler

```javascript
// 设置键盘事件默认拦截浏览器默认行为。
// 在 preventKeys 中的将拦截，如果数组设置为空则全部不拦截
// 默认拦截 F1 F5 F12
larksr.op.keyboardHandler.preventKeys = [["F1", "F5", "F12"]];
```

### 操作类中的 gestureHandler

gestureHandler 处理将移动端触摸事件对应为鼠标事件的过程。

#### 调节触摸事件触发参数

```javascript
// 触摸事件在对应为鼠标事件中，提供的鼠标相对移动的速度。
// 即 rx = （pxNew-pxOld） * relativeMouseMoveSpeed
//    ry = （pyNew-pyOld）* relativeMouseMoveSpeed
// 可能会影响使用相对移动（rawInput）判断的云端应用的效果
larksr.op.gestureHandler.relativeMouseMoveSpeed = 2;
// 触摸模拟为鼠标事件时，模拟点击的判断范围。
// 实际的鼠标事件点击时一般不会移动，而触摸操作基本上一定会触发移动事件
// 如果要模拟PC上的击事件，比如单击或双击，在鼠标按下和抬起之间不应再插入鼠标移动
// 当触发移动事件时，超出该判断范围才发送移动事件。
// 注意，修改该值可能会导致云端应用上判断单击或双击失败，如果云端应用不包含类似操作基本影响不大
larksr.op.gestureHandler.tapLimitRadius = 20;
// 在该时间范围下将尝试发送单机按下事件，修改该值可能会导致单机事件的触发成功率
larksr.op.gestureHandler.tapLimitTimeout = 100;
```

#### 拦截触摸事件回调

可以通过拦截触摸事件回调的方式，设置具体的触摸事件和鼠标事件的对应关系。

> 通过 larksr.op.gestureHandler.gestureCallback 设置回调函数
> 下面例子中的 GESTURE_TYPE 为 SDK 导出的手势事件类型，如果用 amd 方式引入的 SDK，所有导出类型均在 larksr_websdk 全局对象下。
> 如果是使用其他方式引入 SDK，如 improt 方式导入 `import { GESTURE_TYPE } from 'larksr_websdk'`
> 以下示例代码忽略 larksr 创建等过程

```javascript
// 参数 event 有如下字段
// event : {
//      type: GESTURE_TYPE; 手势事件的类型
//      x: number;          转换为云端的坐标 x
//      y: number;          转换为云端的坐标 y
//      rx: number;         转换为云端的坐标 rx
//      ry: number;         转换为云端的坐标 ry
//      edge: boolean;      是否到触摸边缘
//      rawEvent: any;      未转换为云端坐标的触摸事件
//    }
// 
larksr.op.gestureHandler.gestureCallback = (event) => {
    console.log(event);
    const p = event;
    switch (event.type) {
    // 单只触摸开始移动鼠标到当前位置
    case GESTURE_TYPE.SINGLE_FINGER_TOUCH_START:
        larksr.mouseMove(p.x, p.y, p.rx, p.ry);
        break;
    // 单指单击 -》左键单击
    case GESTURE_TYPE.SINGLE_FINGER_TAP:
        larksr.mouseTap(p.x, p.y, CloudLark.MouseKey.LEFT);
        break;
    // 单指按下 -》 移动鼠标, 按下鼠标
    case GESTURE_TYPE.SINGLE_FINGER_TAP_DOWN:
        // move mouse first
        larksr.mouseMove(p.x, p.y, p.rx, p.ry);
        // sync tap down
        larksr.mouseDown(p.x, p.y, CloudLark.MouseKey.LEFT);
        break;
    // 单指抬起 -》 移动鼠标， 抬起鼠标
    case GESTURE_TYPE.SINGLE_FINGER_TAP_UP:
        // move mouse first
        larksr.moseMove(p.x, p.y, p.rx, p.ry);
        // sync tap down
        larksr.mouseUp(p.x, p.y, CloudLark.MouseKey.LEFT);
        break;
    // 单指滑动 -》 移动鼠标
    case GESTURE_TYPE.SINGLE_FINGER_SWIPE:
        larksr.moseMove(p.x, p.y, p.rx, p.ry);
        break;
    // 单指开始滑动 -》 鼠标左键按下
    case GESTURE_TYPE.SINGLE_FINGER_SWIPE_START:
        // sync tap down
        larksr.mouseDown(p.x, p.y, CloudLark.MouseKey.LEFT);
        break;
    // 单指滑动结束 -》 鼠标左键抬起
    case GESTURE_TYPE.SINGLE_FINGER_SWIPE_END:
        larksr.mouseUp(p.x, p.y, CloudLark.MouseKey.LEFT);
        break;
    // 双指单击 -》 鼠标右键单击
    case GESTURE_TYPE.DOUBLE_FINGER_TAP:
        larksr.mouseTap(p.x, p.y, CloudLark.MouseKey.RIGHT);
        break;
    // 双指按下 -》 移动鼠标
    case GESTURE_TYPE.DOUBLE_FINGER_TAP_DOWN:
        // move mouse first
        larksr.moseMove(p.x, p.y, p.rx, p.ry);
        // 抬起所有
        // sync tap down
        larksr.mouseDown(p.x, p.y, CloudLark.MouseKey.RIGHT);
        break;
    case GESTURE_TYPE.DOUBLE_FINGER_TAP_UP:
        // move mouse first
        larksr.moseMove(p.x, p.y, p.rx, p.ry);
        // sync tap up
        larksr.mouseUp(p.x, p.y, CloudLark.MouseKey.RIGHT);
        break;
    // 双指移动 -》 滚动滚轮
    case GESTURE_TYPE.DOUBLE_FINGER_SWIPE:
        // move mouse mid
        // this.$emitMouseWheel(p.x, p.y, e.motion.y);
        larksr.moseMove(p.x, p.y, p.rx, p.ry);
        break;
    case GESTURE_TYPE.DOUBLE_FINGER_EXPAND: 
        // windows 消息 deltaY 上是 +120 下是 -120
                // 双指扩展向外滑动
                // 滚轮向下移动
        // move mouse mid
        larksr.mouseWheel(p.x, p.y, 120);
        break;
    case GESTURE_TYPE.DOUBLE_FINGER_SHRINK:
        // windows 消息 deltaY 上是 +120 下是 -120
                // 双指向内滑动
                // 滚轮向上移动
        larksr.mouseWheel(p.x, p.y,  -120);
        break;
    case GESTURE_TYPE.DOUBLE_FINGER_SWIPE_END:
        // sync tap up
        larksr.mouseUp(p.x, p.y, CloudLark.MouseKey.RIGHT);
        break;
    // 三指单击 -》 鼠标中键单击
    case GESTURE_TYPE.TRIPLE_FINGER_TAP:
        larksr.mouseTap(p.x, p.y, CloudLark.MouseKey.MIDDLE);
        break;
    // 三指滑动 -》 移动鼠标
    case GESTURE_TYPE.TRIPLE_FINGER_SWIPE:
        larksr.mouseMove(p.x, p.y, p.rx, p.ry);
        break;
    // 三指滑动按下 -》 鼠标中键按下
    case GESTURE_TYPE.TRIPLE_FINGER_SWIPE_START:
        larksr.mouseMove(p.x, p.y, p.rx, p.ry);
        //
        larksr.mouseDown(p.x, p.y, CloudLark.MouseKey.MIDDLE);
        break;
    // 三指滑动按下 -》 鼠标中键抬起
    case GESTURE_TYPE.TRIPLE_FINGER_SWIPE_END:
        // sync tap up
        larksr.mouseUp(p.x, p.y, CloudLark.MouseKey.MIDDLE);
        break;
    // 所有手指抬起
    case GESTURE_TYPE.RELEASE:
        break;
    default:
        break;
    }
};
```

## 全屏锁屏

```javascript
// 进入全屏模式
larksr.fullScreen.launchFullScreen();
// 退出全屏模式
larksr.fullScreen.exitFullscreen();
// 锁定鼠标
larksr.lockPointer.lockPointer();
// 释放鼠标
larksr.lockPointer.exitPointerLock();
```

## 其他状态

```typescript
/**
 * 当前云端应用窗口大小
 */
larksr.currentAppSize;

/**
 * 同步客户端视口大小状态
 */
larksr.syncClientViewport;

/**
 * 服务端支持功能列表
 */
larksr.serverFeatures;

/**
 * 服务端状态：编码延时，渲染延时等
 */
larksr.serverStatics;
```
