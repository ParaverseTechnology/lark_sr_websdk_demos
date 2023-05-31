# 更新

## V3.2.30

> V3.2.30 仅支持服务端 [V3.2.3.1](https://www.pingxingyun.com/devCenter.html) 以上版本。
> [老版本 SDK Demo 下载](https://github.com/pingxingyun/lark_sr_websdk_demos/releases/tag/V3.2.10)

1. [添加像素流送支持](https://docs.unrealengine.com/4.27/zh-CN/SharingAndReleasing/PixelStreaming/PixelStreamingIntro/)。
2. 完善安全性, 添加 SDK ID 加密配置。
3. 移除 CreateLarkSRClientFromePXYHost，CreateLarkSRClientFromeAPI, CreateLarkSRClientFromeUrl 函数。直接使用 `new LarkSR(config: ILarkSRConfig)` 方式创建对象。

## V3.2.33

1. 添加智能语音相关接口支持

LarkSR 对象添加:

```typescript
/**
 * 开始智能语音对话文本输入
 * 应在只能语音为开始状态下开始输入
 * @param text 输入的文本
 * @returns 返回对话 ID
 */
public aiDmTextInput(text: string) {
/**
 * 开始智能语音对话语音输入，自动请求录音权限
 * 应在只能语音为开始状态下开始输入
 * @returns 成功返回对话id，失败返回异常
 */
public startAiDmVoiceInput() {

/**
 * 停止智能语音输入，通知语音引擎当前用户输入对话结束
 * @returns 返回当前对话的id
 */
public stopAiDmVoiceInput() {
```

LarkSR 添加如下事件:

```typescript
larksr.on('aivoicestatus', (e) => {
    // 智能语音服务状态
});

larksr.on('aivoiceasrresult', (e) => {
    // 智能语音转文字识别结果
});

larksr.on('aivoicedmresult', (e) => {
    // 智能语音对话结果
});
```

## V3.2.37

```typescript
/**
 * 设置是否强制横屏显示内容.
 * handelRootElementSize 必须设置为 true 才有作用。
 * 要注意强制横屏模式下网页的坐标系xy和视觉上相反，如果通过外部输入 input 事件。要注意调整
 * @param force 是否强制横屏
 */
setMobileForceLandScape(force: boolean): void;
```

## V3.2.311

新增麦克风输入接口。客户端打开后云端应用可直接通过读取声卡上的麦克风接收到音频。

> 该功能匹配的服务端版本最低为 V3.2.51
> 使用该功能要注意在后台应用管理中开启音频输入功能
> 注意要在连接成功之后打开媒体设备。即 `mediaPlayed` 之后调用才有效

```typescript
/**
 * 打开一个音频设备，要注意浏览器限制在 https 或者 localhost 下才能打开音频
 * @param deviceId 音频设备id，如果不传将打开默认设备。@see getConnectedAudioinputDevices
 * @returns
 */
openAudio(deviceId?: string);
/**
 * 关闭当前的音频设备
 * @returns
 */
closeAudio(): boolean | undefined;
/**
 * 返回已连接的音频设备列表，设备列表中的设备的 deviceId 可用来打开某个音频设备
 * @returns
 */
getConnectedAudioinputDevices(): Promise<MediaDeviceInfo[] | undefined>;
/**
 * 设置当前已开启的音频track是否启用状态
 * @param enable 是否启用
 * @returns
 */
setAudioEnable(enable: boolean): void | undefined;
```

larksr 配置项新增自动打开麦克风配置,在`new LarkSR({ ... 此处省略其他配置 ... audioInputAutoStart: true})` 时传入，

> 手动传入的 `audioInputAutoStart` 优先级高于后台配置

```javascript
/**
* 当启用音频输入功能，是否自动连入音频设备。
* 默认关闭。
* 需要注意默认打开的是系统中默认的音频设备。
*/
audioInputAutoStart?: boolean;
```

## V3.2.319

新增视频输入接口。客户端打开后云端应用可直接通过读取服务端的摄像头读取视频数据。

> 该功能匹配的服务端版本最低为 V3.2.61
> 使用该功能要注意在后台应用管理中开启视频输入功能
> 注意要在连接成功之后打开媒体设备。即 `mediaPlayed` 之后调用才有效

```typescript
/**
 * 打开一个视频设备，要注意浏览器限制在 https 或者 localhost 下才能打开视频
 * @param audio boolean 是否同时开启音频
 * @param cameraId 视频设备id，如果不传将打开默认设备。@see getConnectedVideoinputDevices
 * @returns Promise
 */
openVideo(audio?: boolean, cameraId?: string);
/**
 * 打开默认媒体设备，要注意浏览器限制在 https 或者 localhost 下
 * 如果需要指定特殊的媒体设备请单独使用 @see openAudio @see openVideo
 * @param video 是否包含视频
 * @param audio 是否包含音频
 * @returns Promise
 */
openDefaultMedia(video?: boolean, audio?: boolean)>;
/**
 * 返回已连接的视频设备
 * @returns Promise<MediaDeviceInfo[]>
 */
getConnectedVideoinputDevices();
/**
 * 设置当前已开启的视频track是否启用状态
 * @param enable 是否启用
 * @returns void
 */
setVideoEnable(enable: boolean);
```

larksr 配置项新增自动打开视频输入配置,在`new LarkSR({ ... 此处省略其他配置 ... videoInputAutoStart: true})` 时传入

> 手动传入的 `videoInputAutoStart` 优先级高于后台配置

```javascript
/**
 * 当启用视频输入功能，是否自动连入视频设备。
 * 默认关闭。
 * 需要注意默认打开的是系统中默认的视频设备。
 */
videoInputAutoStart?: boolean;
```

## V3.2.321

larksr 配置项新增默认放大手势和鼠标滚轮对应关系和是否使用触摸屏模式,在`new LarkSR({ ... 此处省略其他配置 ... mouseZoomDirection: 0， touchOperateMode: "mouse"})` 时传入

> 手动传入的配置优先级高于后台配置

```javascript
/**
 * mouseZoomDirection
 * 用于移动端捏合缩放操作与应用鼠标缩放的对应关系
 * 1:鼠标滚轮向上为放大，
 * 0:鼠标滚轮向下为放大(default)
 */
mouseZoomDirection?: number;
/**
 * 触摸指令模式，对应后台应用管理->应用编辑->移动端高级设置->触摸指令模式 优先级高于后台配置
 * 触摸指令，移动端的触摸指令对应为云端的触屏还是鼠标
 * 'touchScreen' | 'mouse'
 */
touchOperateMode?: 'touchScreen' | 'mouse';
```

captrueFrame 方法会将截图和通过返回值带出来

```javascript
/**
 * 采集一帧图像
 * @params data: any 抛出采集事件时抛出的附加data，比如采集的时间戳
 * @return { data: any, base64: base64string } 返回传入的 data 和采集的 base64 字符串
 */
captrueFrame(data: any)
```

新增销毁方法，要注意，销毁之后 larksr 对象不再可用

```javascript
/**
 * 从DOM种删除渲染组件，注意删除渲染组件之后将无法再次进入应用，所有状态将失效,不可恢复，只能重新new LarkSR
 */
destroy(): void;
```

添加操作类中的 keyboardhandler 开放访问，可用配置拦截哪些按键的默认行为

```javascript
// 设置键盘事件默认拦截浏览器默认行为。
// 在 preventKeys 中的将拦截，如果数组设置为空则全部不拦截
// 默认拦截 F1 F5 F12
larksr.op.keyboardHandler.preventKeys = [["F1", "F5", "F12"]];
```

操作类中添加 gestureHandler 公开访问,gestureHandler 处理将移动端触摸事件对应为鼠标事件的过程。

可用通过 gestureHandler 调节触摸事件触发参数

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

可用通过 gestureHandler 拦截触摸事件回调, 通过 `larksr.op.gestureHandler` 设置回调函数

## V3.2.322

1. 修复某些情况下后台设置的 LOGO 会闪一下默认 LOGO 的问题
2. 添加 `larksr.virtualCursorPosition` 和 `larksr.virtualCursorPositionRaw` (省略 larksr 对象创建代码) 获取当前虚拟鼠标或者触摸点的位置。

## V3.2.324

1. 修复 iOS 屏幕高度判断问题
2. 添加获取应用列表接口 `API.GetAppliList(server: string, params: any);`
3. 添加获取区域列表接口 `API.RegionList(server: string, params: any);`
4. 添加获取后台配置UI接口 `larksr.getTouchCtrMapping()`
5. 添加  `RTMP_STREAM_STATE  = "rtmpstreamstate"` 事件，返回云端直播推流事件
6. 添加 `RTMP_STREAM_ERROR = "rtmpstreamerror"` 事件，返回云端直播推流错误
7. 添加 `larksr.StartCloudLiveStreaming(params)` 接口，启动云端直播推流功能
8. 添加 `larksr.StopLiveStreaming()` 接口，关闭云端直播推流功能.

## V3.2.326

1. 截图接口 `captrueFrame(data: any, option?: { width: number; height: number;})` 添加 option 参数，可以设置截图的宽高
2. 添加 onlyHandleRootElementTransform 参数 `new LarkSR({ ... 此处省略其他配置 ... onlyHandleRootElementTransform: 0})`

```javascript
/**
* 是否只设置根的组件的旋转。只当 handleRootElementSize 为 true 时有效。设置根组件的旋转用于 mobileForceLandscape 模式。
* 默认为false，此时 SDK 会设置根组件的宽高,margin 0,padding 0
* 为true并且handleRootElementSize也为true时，只设置根组件的旋转属性，用于强制横屏模式以及强制横屏竖屏的切换。
* 要注意onlyHandleRootElementTransform开启成功时，要保证根节点的元素大小并且当根节点变化时应调用 resize 方法通知更新根节点的大小。
*/
onlyHandleRootElementTransform?: boolean;
```

## V3.2.327

1. 添加方法 `larksr.updateServerAddress(serverAddress: string)`,可在 `new LarkSR()` 之后再更新服务器地址。用于需要异步设服务器地址的情况。

```javascript
/**
* 单独设置服务器地址，作用同 config 中的 serverAddress 字段
* 在进入应用之前都可以更新。
* @param serverAddress 服务器地址，如 http://192.168.0.55:8181/
*/
updateServerAddress(serverAddress: string): void;
```

## V3.2.329

1. 添加自动播放参数参数 `new LarkSR({ ... 此处省略其他配置 ... autoPlay: true, showPlayButton: true})`

SDK 内部添加播放按钮 UI，当自动播放失败或者手动播放模式时会显示出来，用户点击之后才会播放。

自动播放模式下会尽可能直接播放不用手动点，包括可能静音播放。

```javascript
/**
* 是否自动播放。默认开启。
* 如果关闭，连接成功之后会有提示UI，用户手动触发。
* 开启自动播放时也不能保证所有浏览器自动播放成功，当播放失败或者浏览器不支持自动播放时，
* 也会显示播放按钮，用户点击播放按钮手动播放。
*/
autoPlay?: boolean;
/**
* 在播放失败或者手动播放模式下是否显示播放的按钮。
* 默认开启。要注意，如果关闭情况下要添加好提示或UI，引导用户点击播放。
* UI中要让用户触发 larksr.videoComponent.playVideo();
*/
showPlayButton?: boolean;
```

2. 添加语言配置参数 `new LarkSR({ ... 此处省略其他配置 ... language: true})`

```javascript
/**
* 语言设置,目前只支持种英文两种
* zh-CN 中文 en 英文
*/
language?: string;
```

3. 添加渲染资源不足事件，在 `larksr.connect` 方法和 `resourcenotenough` 事件时抛出。可以根据服务端返回的 code 码判断具体情况，提示用户或进行后续处理。

`connect` 方法返回的 Promise:

```javascript
/**
 * 连接云端渲染资源
 * @params appID 云端资源的 ID
 * @returns Promise 调用接口并校验授权通过返回成功并自动开始连接
 * Promise 返回的错误对象：
 * {
        // type 0 渲染资源不足导致的错误，1 其他错误, 可用 type == 0 判断是否是渲染资源不足类型的错误
        type: 0,

        // 渲染资源不足时的事件类型，其他情况可能不返回，比如网络错误
        eventType?：LarkSRClientEvent.RESOURCE_NOT_ENOUGH,

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
connect(params: {
    appliId: string;
    playerMode?: number;
    userType?: number;
    roomCode?: string;
    taskId?: string;
    clientMac?: string;
    groupId?: string;
    regionId?: string;
    targetServerIp?: string;
    appKey?: string;
    timestamp?: string;
    signature?: string;
}): Promise<void>;
```
 
或者单独监听 `resourcenotenough`:

```javascript
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
RESOURCE_NOT_ENOUGH = 'resourcenotenough',
```

```javascript
// 此处省略 larksr 创建过程
// 监听连接成功事件
larksr.on('resourcenotenough', function(e) { 
    console.log("LarkSRClientEvent RESOURCE_NOT_ENOUGH", e); 
});
```

## V3.2.331

1. 优化自动播放模式下播放按钮出现时机,添加载入超时设置 `new LarkSR({ ... 此处省略其他配置 ... playTimeout: 20 })`
2. 修复不支持 WebRTC 情况下未抛出错误事件的问题。对应错误码为 603, `error` 事件可能的错误码如下:

```javascript
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
ERROR              = 'error',
```

## V3.2.334

优化打开媒体通道实现流程，优化重复打开媒体设备或切换媒体设备效果。添加单独媒体上传通道（单独上传流程要求渲染服务器版本大于3290）。

1. 添加配置项， useSeparateMediaSharePeer，配置是否使用单独的媒体上传通道（摄像头麦克风上传）。默认开启，如果需要使用旧版本服务端应关闭该项。 `new LarkSR({ ... 此处省略其他配置 ... useSeparateMediaSharePeer: true })`
2. 添加 `pauseVideoSending/resumeVideoSending`,`pauseAudioSending/resumeAudioSending` 暂停和恢复摄像头或者麦克风上传。
3. 添加 `closeMediaChannel` 关闭单独的媒体上传通道。仅当 useSeparateMediaSharePeer 为 true 时有效。
4. `openVideo` 接口添加 `openVideo(audio?: boolean, cameraId?: string, width?: number, height?: number)`  宽高参数，限定打开摄像头设备的宽高

## V3.2.337

1. 配合服务端升级协议.
2. 修复其他问题.

## V3.3.342

1. 配合服务端升级，添加 `larksr.serverFeatures` 返回服务端支持特性
2. 移动端打开摄像头会根据屏幕旋转旋转摄像头画面方向
3. `openVideo` 接口可以传参数指定是否是前置摄像头 `openVideo(audio: boolean = false, cameraId: string = '', width: number = 0, height: number = 0, front?: boolean)`
4. 获取后台应用参数 `larksr.params.mobileKeyboardType`

## V3.2.343

1. 添加配置项  `new LarkSR({ ... 此处省略其他配置 ... enableCanvasRender: false })` 开启或关闭 canvas 渲染模式。默认关闭。要注意移动端开启 canvas 会消耗额外性能。
2. 优化显示效果。
3. 优化显示宽高计算方式。

> 已知问题: iOS 在关闭 canvas 模式下，忽略狂高比的拉伸模式无效。
