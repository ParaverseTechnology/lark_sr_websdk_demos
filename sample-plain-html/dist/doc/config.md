# LarkSR 对象参数

创建 LarkSR 对象参数如下

```typescript
/**
 * 构造 LarkSR 参数
 */
interface ILarkSRConfig {
    /**
     * 必选项 根元素。组件会挂载到跟元素下面
     * 注意*不要*设置为 document.documentElement
     * 默认模式下会通过旋转根元素实现强制横屏模式。
     * @see handelRootElementSize
     * @see scaleMode
     */
    rootElement: HTMLElement;
    /**
     * 必选项 服务器地址. LarkServer 前台访问的地址
     * 如： http://192.168.0.55:8181/
     */
    serverAddress: string;
    /**
     * 可选项。 sdk 授权码。如果不在此处填，则必须在后续的实例里调用 initSDKAuthCode 初始化。
     */
    authCode?: string;
    /**
     * 可选项，授权是否成功
     *  @deprecated 目前不会回调该参数。如果SDK验证失败将在 connect 返回失败
     */
    authCodeCallback?: (isSuccess: boolean, e: any) => void;
    /**
     * 可选项，载入时的背景图片 url
     */
    loadingBgUrl?: string;
    /**
     * 可选项，是否同步传入根的组件的大小样式。
     * 默认开启，将跟组件大小设置为浏览器视口大小
     * 如果关闭，内部组件将按照传入的根元素大小去显示
     * 注意，当关闭时不会自动填充根元素，如果根元素高度为 0 将显示不出来。
     * 注意，当关闭时 mobileForceLandscape 将失去作用。
     */
    handelRootElementSize?: boolean;
    /**
     * 是否在sdk内部监听鼠标键盘等输入事件
     * 如果关闭需要手动发送输入事件
     * 注意关闭时全屏模式和锁定模式将失效,需要在sdk外部触发
     * @see fullScreenMode
     */
    handlInput?: boolean;
    /**
     * 当视频播自动放失败时是否尝试静音播放,静音播放时将抛出事件
     * 静音播放当用户操作屏幕时将尝试播放声音
     */
    mutePlayWhenFiled?: boolean;
    /**
     * 可选项，是否是 vr 监控类型。
     */
    isMonitor?: boolean;
    /**
     * 可选项，码率
     */
    codeRate?: number;
    /**
     * 可选项，帧率
     */
    frameRate?: number;
    /**
     * 可选项，音频帧率
     */
    audioCodeRate?: number;
    /**
     * 可选项，日志级别。默认为 warn
     */
    logLevel?: 'info' | 'warn' | 'error';
    /**
     * 可选项，载入超时时间. 默认为 60s。超过该事件停止载入
     */
    loadingTimeout?: number;
    /**
     * 可选项，是否自动同步剪贴板数据
     */
    syncLocalToCloudClipboard?: boolean;
    /**
     * 可选项，优选选择的视频编码格式
     */
    perferDecoder?: 'auto' | 'vp8' | 'vp9' | 'h264' | 'av1x';
    /**
     * 可选项，视频在容器中的缩放模式
     * 'contain' | 'fill_clip' | 'fill_stretch'
     * contain: 以应用原始尺寸的缩放
     * fill_clip: 裁剪模式，完全填充屏幕但保留宽高比
     * fill_stretch: 拉伸模式，完全填充屏幕但不保留宽高比
     */
    scaleMode?: ScaleMode;
    /**
     * 全屏模式
     *  0 -》 用户手动触发
     *  1 -》 首次点击进入触发
     *  2 -》 每次点击触发
     */
    fullScreenMode?: number;
    /**
     * 可选项，手机端的全屏模式，值同  fullScreenMode
     */
    mobileFullScreenMode?: number;
    /**
     * 可选项，手机端是否强制横屏
     */
    mobileForceLandscape?: boolean;
    /**
     * 渲染服务器外网端口映射
     * 格式为  key=[渲染服务器IP:PORT] value=[外网IP:PORT]
     * {
     *    "RENDER-A-IP:RENDER-A-PORT1": "PUBLIC-A-IP:PORT1",
     *    "RENDER-B-IP:RENDER-B-PORT1": "PUBLIC-A-IP:PORT2",
     *    "RENDER-C-IP:RENDER-C-PORT1": "PUBLIC-A-IP:PORT3",
     *    "RENDER-D-IP:RENDER-D-PORT1": "PUBLIC-B-IP:PORT1",
     *    "RENDER-E-IP:RENDER-E-PORT1": "PUBLIC-B-IP:PORT2",
     *    "RENDER-E-IP:RENDER-E-PORT2": "PUBLIC-C-IP:PORT1",
     * }
     */
    publicPortMapping?: PublicPortMapping;
    /**
     * 是否提示输入文字 APP_REQUEST_INPUT
     * 当服务端检测到输入法事件后会抛出事件，可在 web 层添加输入框，配合 inputText 发送文字到云端
     * 默认打开，当手动关闭时将不会抛出 APP_REQUEST_INPUT 事件
     */
    textInputEventPrompt?: boolean;

    /**
     * 当启用音频输入功能，是否自动连入音频设备。
     * 默认关闭。
     * 需要注意默认打开的时系统中默认的音频设备。
     */
    audioInputAutoStart?: boolean;

    /**
     * 当启用视频输入功能，是否自动连入视频设备。
     * 默认关闭。
     * 需要注意默认打开的是系统中默认的视频设备。
     */
    videoInputAutoStart?: boolean;
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
}
```
