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
