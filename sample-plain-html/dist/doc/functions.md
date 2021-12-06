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
 * 开始云渲染流程
 * @returns 是否成功。主要校验授权码是否成功
 */
start(): Promise<void>;
/**
 * 重新开始云渲染流程
 */
restart(): void;
/**
 * 重新启动云端应用
 */
restartApp(): void;
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
 * @param input 操作指令
 */
sendInput(input: CloudLark.IClientInput): void;
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
