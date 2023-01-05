# LarkSR 对象成员方法

LarkSR 对象成员方法主要分为以下三类

## 控制流程方法，包括启动，关闭，重启，注册授权码等。

```typescript
/**
* 单独设置服务器地址，作用同 config 中的 serverAddress 字段
* 在进入应用之前都可以更新。
* @param serverAddress 服务器地址，如 http://192.168.0.55:8181/
*/
updateServerAddress(serverAddress: string): void;
/**
 *
 * @param id sdk id 初始化sdkid
 * @returns
 */
initSDKAuthCode(id: string): Promise<void>;
/**
 * 使用平行云托管平台时，使用 connectWithPxyHost 连接云端应用
 * 托管平台 https://www.pingxingyun.com/console/#/
 * @param params 同 connect 方法
 * @return 同 connect 方法
 */
connectWithPxyHost(params: {
    appliId: string;
    playerMode?: number;
    userType?: number;
    roomCode?: string;
    taskId?: string;
    regionId?: string;
    groupId?: string;
}): Promise<void>;
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
} | any): Promise<void>;
/**
 * 重新开始云渲染流程
 */
restart(): void;
/**
 * 重新启动云端应用
 */
restartApp(): void;
/**
 * 主动关闭连接
 */
close(): void;
```

## 输入输出相关方法，包括鼠标，键盘，手柄，触摸

```typescript
/**
 * 切换当前操作者
 * @param uid 用户id
 */
changeOperater(uid: number): void;
/**
 * 向云端应用发送文字。当云端应用出现输入框时，可以将本地文本填写进去.
 * @param text 文字
 */
inputText(text: string): void;
/**
 * 操作相关事件
 * 所有事件坐标相对于云端应用，不相对于网页
 * CloudLark.IClientInput 是所有操作指令接口对象的合集
 * 可以单独使用下面 moseMove 等接口
 * @param input 操作指令
 */
sendInput(input: CloudLark.IClientInput): void;
/**
 * 向云端发送鼠标移动事件
 * 事件坐标相对于云端应用，不相对于网页
 * 计算方式可以参考  https://github.com/pingxingyun/lark_sr_websdk_demos 例子中 v_cursor.vue getVMouseTouchPosition 方法
 * 原理是通过 LarkSR 对象的成员 screenState.operateScale 获取相对的缩放，
 * 本地坐标 X larksr.screenState.operateScale.scaleX / scaleY 即可得到相对云端的坐标
 *
 * @param PosX 相对云端鼠标 X 点坐标
 * @param PosY 相对云端鼠标 Y 点坐标
 * @param DeltaX 相对云端鼠标 X 轴移动距离
 * @param DeltaY 相对云端鼠标 X 轴移动距离
 */
mouseMove(PosX: number, PosY: number, DeltaX: number, DeltaY: number): void;
/**
 * 向云端发送鼠标移动事件
 * 事件坐标相对于云端应用，不相对于网页
 * 计算方式可以参考  https://github.com/pingxingyun/lark_sr_websdk_demos 例子中 v_cursor.vue getVMouseTouchPosition 方法
 * 原理是通过 LarkSR 对象的成员 screenState.operateScale 获取相对的缩放，
 * 本地坐标 X larksr.screenState.operateScale.scaleX / scaleY 即可得到相对云端的坐标
 *
 * @param PosX 相对云端鼠标 X 点坐标
 * @param PosY 相对云端鼠标 Y 点坐标
 * @param DeltaX 相对云端鼠标 X 轴移动距离
 * @param DeltaY 相对云端鼠标 X 轴移动距离
 */
moseMove(PosX: number, PosY: number, DeltaX: number, DeltaY: number): void;
/**
 * 向云端发送鼠标单击事件
 * X Y 坐标计算方式同 mouseMove
 *
 * @param PosX 相对云端鼠标 X 点坐标
 * @param PosY 相对云端鼠标 Y 点坐标
 * @param key  LEFT = 0,RIGHT = 1, MIDDLE = 2
 */
mouseTap(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
/**
 * 向云端发送鼠标按下事件
 * X Y 坐标计算方式同 mouseMove
 *
 * @param PosX 相对云端鼠标 X 点坐标
 * @param PosY 相对云端鼠标 Y 点坐标
 * @param key  LEFT = 0,RIGHT = 1, MIDDLE = 2
 */
mouseDown(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
/**
 * 向云端发送鼠标抬起事件
 * X Y 坐标计算方式同 mouseMove
 *
 * @param PosX 相对云端鼠标 X 点坐标
 * @param PosY 相对云端鼠标 Y 点坐标
 * @param key  LEFT = 0,RIGHT = 1, MIDDLE = 2
 */
mouseUp(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
/**
 * 向云端发送鼠标滚轮事件
 * X Y 坐标计算方式同 mouseMove
 *
 * @param PosX 相对云端鼠标 X 点坐标
 * @param PosY 相对云端鼠标 Y 点坐标
 * @param Delata  120/-120 鼠标滚轮滚动的数值
 */
mouseWheel(PosX: number, PosY: number, Delata: number): void;
/**
 * 向云端发送键盘按键按下事件
 * @param key KeyboardEvent.code 字段，具体内容参考 Chrome https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
 * @param isRepeat KeyboardEvent.repeat 字段，参考https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat
 * @returns 是否发送成功，如果key参数传递错误可能发送失败
 */
keyDown(key: string, isRepeat: boolean): void;
/**
 * 向云端发送键盘按键抬起事件
 * @param key KeyboardEvent.code 字段，具体内容参考 Chrome https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
 * @returns 是否发送成功，如果key参数传递错误可能发送失败
 */
keyUp(key: string): void;
 /**
 * 手柄接口消息按照 windows xbox 360 手柄标准定义，即包含 xbox 360 手柄的功能，如按钮，摇杆，扳机键。windows 上最多支持4个手柄，
 * 当前版本服务端只处理1个手柄，后续会放开多个手柄的支持。接口中发送的按键值为对应的 windows 中定义的按键值。
 * 向云端发送手柄按钮按下事件
 * 參考 js 中获取手柄事件，参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
 * @param userIndex 手柄的索引,硬件设备索引 0-3. 第一个连接的手柄为0，第二个为1，以此类推。
 * @param button 按鍵 @see https://docs.microsoft.com/en-us/windows/win32/api/xinput/ns-xinput-xinput_gamepad
 * export const enum XINPUT_BUTTONS {
 *       XINPUT_GAMEPAD_DPAD_UP        = 0x0001,
 *       XINPUT_GAMEPAD_DPAD_DOWN      = 0x0002,
 *       XINPUT_GAMEPAD_DPAD_LEFT      = 0x0004,
 *       XINPUT_GAMEPAD_DPAD_RIGHT     = 0x0008,
 *       XINPUT_GAMEPAD_START          = 0x0010,
 *       XINPUT_GAMEPAD_BACK           = 0x0020,
 *       XINPUT_GAMEPAD_LEFT_THUMB     = 0x0040,
 *       XINPUT_GAMEPAD_RIGHT_THUMB    = 0x0080,
 *       XINPUT_GAMEPAD_LEFT_SHOULDER  = 0x0100,
 *       XINPUT_GAMEPAD_RIGHT_SHOULDER = 0x0200,
 *       XINPUT_GAMEPAD_A              = 0x1000,
 *       XINPUT_GAMEPAD_B              = 0x2000,
 *       XINPUT_GAMEPAD_X              = 0x4000,
 *       XINPUT_GAMEPAD_Y              = 0x8000,
 *       XINPUT_UNKNOWN                = -1,
 *   }
 * @param isRepeat 是否重复按下
 * @returns
 */
gamepadButtonDown(userIndex: number, button: number, isRepeat: boolean): void;
/**
 * 向云端发送手柄按钮抬起事件
 * 參考 https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
 * @param userIndex 手柄的索引
 * @param button 按鍵
 * @returns
 */
gamepadButtonUp(userIndex: number, button: number): void;
/**
 * 向云端发送手柄按trigger键事件
 * 參考 https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
 * @param userIndex 手柄的索引
 * @param isleft 是否是左trigger
 * @param value trigger的值 扳机键的值 0-255
 * @returns
 */
gamepadTrigger(userIndex: number, isleft: boolean, value: number): void;
/**
 * 向云端发送手柄按摇杆的值，即 axes 值
 * win      MAX
 *           |
 *  MIN-------------MAX
 *          |
 *         MIN
 * js 中获取硬件手柄參考 https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
 * @param userIndex 手柄的索引
 * @param thumblx 左摇杆 X 值，-32767 到 32767
 * @param thumbly 左摇杆 Y 值，-32767 到 32767
 * @param thumbrx 右摇杆 X 值，-32767 到 32767
 * @param thumbry 右摇杆 Y 值，-32767 到 32767
 * @returns
 */
joystick(userIndex: number, thumblx: number, thumbly: number, thumbrx: number, thumbry: number): void;
/**
 * 向云端发送触摸按下事件
 * 坐标位置与 mouseMove 相同，相对与云端的鼠标移动位置
 * @param id 手指的id
 * @param x 相对云端的x轴坐标
 * @param y 相对云端的y轴坐标
 * @returns
 */
touchDown(id: number, x: number, y: number): void;
/**
 * 向云端发送触摸移动事件
 * 坐标位置与 mouseMove 相同，相对与云端的鼠标移动位置
 * @param id 手指的id
 * @param x 相对云端的x轴坐标
 * @param y 相对云端的y轴坐标
 * @returns
 */
touchMove(id: number, x: number, y: number): void;
/**
 * 向云端发送触摸抬起事件
 * 坐标位置与 mouseMove 相同，相对与云端的鼠标移动位置
 * @param id 手指的id
 * @param x 相对云端的x轴坐标
 * @param y 相对云端的y轴坐标
 * @returns
 */
touchUp(id: number, x: number, y: number): void;
/**
 * 字符串转换为输入的鼠标按键值
 * @param button 'left' | 'mid' | 'right'
 * @returns  LEFT = 0,RIGHT = 1,MIDDLE = 2
 */
getMouseButtonType(button: 'left' | 'mid' | 'right'): CloudLark.MouseKey;
```

## 数据通道扩展，向云端应用数据通道发送数据

```typescript
/**
 * 发送文字消息给数据通道
 * 注意 云端应用要继承数据通道功能
 * > V3.2.314 版本对应服务器版本和数据通道版本为 3.2.5.1 及以上
 * @param text 文字
 */
sendTextToDataChannel(text: string): void;
/**
 * 发送字节消息给数据通道
 * 注意 云端应用要继承数据通道功能
 * @param binary 字节消息
 */
sendBinaryToDataChannel(binary: Uint8Array): void;
```

## 智能语音相关接口

```typescript
/**
* 开始智能语音对话文本输入
* 应在只能语音为开始状态下开始输入
* @param text 输入的文本
* @returns 返回对话 ID
*/
aiDmTextInput(text: string): number;
/**
* 开始智能语音对话语音输入，自动请求录音权限
* 应在只能语音为开始状态下开始输入
* @returns 成功返回对话id，失败返回异常
*/
startAiDmVoiceInput(): Promise<number>;
/**
* 停止智能语音输入，通知语音引擎当前用户输入对话结束
* @returns 返回当前对话的id
*/
stopAiDmVoiceInput(): number;
```

LarkSR 添加如下事件来获取智能语音服务状态:

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

## 麦克风输入接口

客户端打开后云端应用可直接通过读取声卡上的麦克风接收到音频。

> 该功能匹配的服务端版本最低为 V3.2.51
> 使用该功能要注意在后台开启语音输入功能
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
 * 暂停发送音频
 * @returns
 */
pauseAudioSending(): any;
/**
 * 恢复发送音频
 * @returns
 */
resumeAudioSending(): any;
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

/**
 * 请求浏览器打开媒体并且打开上传到服务器通道。
 * 要注意的是在服务器连接成功之后请求打开
 * @param constraints 参考 navigator.mediaDevices.getUserMedia(constraints)
 * @param reset 是否重制媒体通道。true 的情况下重制整个 peerconnection
 * @returns 打开的通道的绑定信息。管理媒体通道如关闭暂停或恢复使用。
 */
openUserMedia(constraints?: MediaStreamConstraints, reset?: boolean): Promise<any>;
```

larksr 配置项自动打开麦克风配置,在`new LarkSR({ ... 此处省略其他配置 ... audioInputAutoStart: true})` 时传入，

> 手动传入的 `audioInputAutoStart` 优先级高于后台配置

```javascript
/**
* 当启用音频输入功能，是否自动连入音频设备。
* 默认关闭。
* 需要注意默认打开的是系统中默认的音频设备。
*/
audioInputAutoStart?: boolean;
```

## 视频输入接口

客户端打开后云端应用可直接通过读取服务端的摄像头读取视频数据。

> 该功能匹配的服务端版本最低为 V3.2.61
> 使用该功能要注意在后台应用管理中开启视频输入功能
> 注意要在连接成功之后打开媒体设备。即 `mediaPlayed` 之后调用才有效

```typescript
/**
 * 打开一个视频设备，要注意浏览器限制在 https 或者 localhost 下才能打开视频
 * @param audio boolean 是否同时开启音频
 * @param cameraId 视频设备id，如果不传将打开默认设备。@see getConnectedVideoinputDevices
 * @param width 限制打开设备的宽
 * @param height 限制打开设备的高
 * @returns Promise
 */
openVideo(audio?: boolean, cameraId?: string, width?: number, height?: number): Promise<any>;
/**
 * 打开摄像头设备
 * @param cameraId 摄像头设备ID，@see getConnectedVideoinputDevices
 * @param minWidth 限制打开设备的宽
 * @param minHeight 限制打开设备的高
 * @returns @see openUserMedia
 */
openCamera(cameraId: string, minWidth?: number, minHeight?: number): Promise<any>;
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

/**
 * 暂停发送视频
 * @returns
 */
pauseVideoSending(): any;
/**
 * 恢复发送视频
 * @returns
 */
resumeVideoSending(): any;

/**
 * 关闭当前已打开的视频设备
 * @returns
 */
closeVideo(): any;
/**
 * 关闭当前已打开的共享设备如共享的标签页等
 * @returns
 */
closeShare(): any;
/**
 * 请求浏览器打开媒体并且打开上传到服务器通道。
 * 要注意的是在服务器连接成功之后请求打开
 * @param constraints 参考 navigator.mediaDevices.getUserMedia(constraints)
 * @param reset 是否重制媒体通道。true 的情况下重制整个 peerconnection
 * @returns 打开的通道的绑定信息。管理媒体通道如关闭暂停或恢复使用。
 */
openUserMedia(constraints?: MediaStreamConstraints, reset?: boolean): Promise<any>;
```

larksr 配置项自动打开视频输入配置,在`new LarkSR({ ... 此处省略其他配置 ... videoInputAutoStart: true})` 时传入

> 手动传入的 `videoInputAutoStart` 优先级高于后台配置

```javascript
/**
 * 当启用视频输入功能，是否自动连入视频设备。
 * 默认关闭。
 * 需要注意默认打开的是系统中默认的视频设备。
 */
videoInputAutoStart?: boolean;
```

## 云端直播推流功能

> 服务端 3.2.7.0 添加， 要注意使用云端直播推流功能要在后台应用管理中开启该功能

```javascript
/**
* 启动云端推流功能
* @param params {
*  // rtmp push url 必须填
*  path: "",
*  //rtmp push key
*  key: "",
*  // 推流的宽
*  width: 1280,
*  // 推流的高
*  height: 720,
*  framerate: 30,
*  // kbps
*  bitrate: 1024 * 2,
*  // 是否支持断线重连
*  reconnect: true,
*  //最大重连次数
*  reconnectRetries: 3,
*  //是否串流麦克风(语音输入支持的情况)
*  voice: audioInput,
* }
* @returns Promise
*/
StartCloudLiveStreaming(params: CloudLark.IRtmp_Start): Promise<void> | undefined;
/**
* 关闭云端推流功能
* @returns
*/
StopLiveStreaming(): void | undefined;
```

云端直播的相关状态参考 `RTMP_STREAM_STATE` 和 `RTMP_STREAM_ERROR` 两个事件

```javascript
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
```

## 其他

```typescript
/**
 * 采集一帧图像
 * @params data: any 抛出采集事件时抛出的附加data，比如采集的时间戳
 * @params option:  { width: number, height: number } 截图的宽高，如果未设置则使用云端应用窗口的宽高
 * @return { data: any, base64: base64string } 返回传入的 data 和采集的 base64 字符串
 */
captrueFrame(data: any, option?: { width: number; height: number;})

/**
 * 设置是否强制横屏显示内容.
 * handelRootElementSize 必须设置为 true 才有作用。
 * 要注意强制横屏模式下网页的坐标系xy和视觉上相反，如果通过外部输入 input 事件。要注意调整
 * @param force 是否强制横屏
 */
setMobileForceLandScape(force: boolean): void;
/**
 * 从DOM种删除渲染组件，注意删除渲染组件之后将无法再次进入应用，所有状态将失效,不可恢复，只能重新new LarkSR
 */
destroy(): void;
```
