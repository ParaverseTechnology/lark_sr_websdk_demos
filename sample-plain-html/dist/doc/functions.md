# LarkSR 对象成员方法

LarkSR 对象成员方法主要分为以下三类

## 控制流程方法，包括启动，关闭，重启，注册授权码等。

```typescript
/**
 *
 * @param id sdk id 初始化sdkid
 * @returns
 */
initSDKAuthCode(id: string): Promise<void>;
/**
 * 连接云端渲染资源
 * @params appID 云端资源的 ID
 * @returns Promise 调用接口并校验授权通过返回成功并自动开始连接
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

## 其他

```typescript
/**
* 采集一帧图像
*/
captrueFrame(data: any)
/**
 * 设置是否强制横屏显示内容.
 * handelRootElementSize 必须设置为 true 才有作用。
 * 要注意强制横屏模式下网页的坐标系xy和视觉上相反，如果通过外部输入 input 事件。要注意调整
 * @param force 是否强制横屏
 */
setMobileForceLandScape(force: boolean): void;
```
