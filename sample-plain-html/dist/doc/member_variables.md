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
larksr.isEnableTouchPonit = false;
// 是否显示载入画面时底部文字
larksr.isEnableLoadingStateBar = false;
```

```javascript
// 设置缩放模式
larksr.scaleMode = ScaleMode.CONTAIN_APP;
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
    MEDIA_PLAED,
    RTC_RETRY,
    APP_RETRY,
    BEFORE_DESTORY,
    WEBSOCKET_CLOSED,
    RTC_CLOSED,
    DESTROYED,
}
```

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
