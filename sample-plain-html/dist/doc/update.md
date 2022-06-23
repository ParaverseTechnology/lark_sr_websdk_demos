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
 * 注意不包含音频，如果需要同时打开默认的视频和音频请 @see openDefaultMedia
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
