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
     * @see handleRootElementSize
     * @see scaleMode
     */
    rootElement: HTMLElement;
    /**
     * 可选项 服务器地址. LarkServer 前台访问的地址
     * 如： http://192.168.0.55:8181/
     * 当使用托管服务时服务器地址自动分配,可留空。
     * 使用托管服务时@see CreateLarkSRClientFromePXYHost @see larksr.connectWithPxyHost
     */
    serverAddress?: string;
    /**
     * 可选项。 sdk 授权码。如果不在此处填，则必须在后续的实例里调用 initSDKAuthCode 初始化。
     */
    authCode?: string;
    /**
     * 可选项，授权是否成功
     * @deprecated 目前不会回调该参数。如果SDK验证失败将在 connect 返回失败
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
    handleRootElementSize?: boolean;
    /**
     * 同 handleRootElementSize
     */
    handelRootElementSize?: boolean;
    /**
     * 是否只设置根的组件的旋转。只当 handleRootElementSize 为 true 时有效。设置根组件的旋转用于 mobileForceLandscape 模式。
     * 默认为false，此时 SDK 会设置根组件的宽高,margin 0,padding 0
     * 为true并且handleRootElementSize也为true时，只设置根组件的旋转属性，用于强制横屏模式以及强制横屏竖屏的切换。
     * 要注意onlyHandleRootElementTransform开启成功时，要保证根节点的元素大小并且当根节点变化时应调用 resize 方法通知更新根节点的大小。
     */
    onlyHandleRootElementTransform?: boolean;
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
    mutePlayWhenFailed?: boolean;
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
    preferDecoder?: 'auto' | 'vp8' | 'vp9' | 'h264' | 'h265' | 'hevc' | 'av1x';
    /**
     * 可选项，视频在容器中的缩放模式
     * ScaleMode: 'contain' | 'fill_clip' | 'fill_stretch'
     * contain: 以应用原始尺寸的缩放
     * fill_clip: 裁剪模式，完全填充屏幕但保留宽高比
     * fill_stretch: 拉伸模式，完全填充屏幕但不保留宽高比
     * 对应后台应用管理->应用编辑->通用高级设置->窗口初始显示方式,该配置优先级高于后台配置
     */
    scaleMode?: ScaleMode;
    /**
     * 全屏模式
     *  0 -》 用户手动触发
     *  1 -》 首次点击进入触发
     *  2 -》 每次点击触发
     * 对应后台应用管理->应用编辑->通用高级设置->全屏模式,该配置优先级高于后台配置
     */
    fullScreenMode?: number;
    /**
     * 可选项，手机端的全屏模式，值同  fullScreenMode
     * 对应后台应用管理->应用编辑->移动端高级设置->全屏模式,该配置优先级高于后台配置
     */
    mobileFullScreenMode?: number;
    /**
     * 可选项，手机端是否强制横屏
     * 对应后台应用管理->应用编辑->移动端高级设置->手机端时是否强制横屏,该配置优先级高于后台配置
     */
    mobileForceLandscape?: boolean;
    /**
     * 可选项
     * 初始化鼠标模式, 0 自动判断 1 锁定 2 非锁定
     * 对应后台应用管理->应用编辑->通用高级设置->初始化鼠标模式,该配置优先级高于后台配置
     */
    initCursorMode?: boolean;
    /**
     * 可选项
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
     * 可选项
     * 是否提示输入文字 APP_REQUEST_INPUT
     * 当服务端检测到输入法事件后会抛出事件，可在 web 层添加输入框，配合 inputText 发送文字到云端
     * 默认打开，当手动关闭时将不会抛出 APP_REQUEST_INPUT 事件
     */
    textInputEventPrompt?: boolean;
    /**
     * 可选项
     * 当启用音频输入功能，是否自动连入音频设备。
     * 默认关闭。
     * 需要注意默认打开的是系统中默认的音频设备。
     */
    audioInputAutoStart?: boolean;
    /**
     * 可选项
     * 当启用视频输入功能，是否自动连入视频设备。
     * 默认关闭。
     * 需要注意默认打开的是系统中默认的视频设备。
     */
    videoInputAutoStart?: boolean;
    /**
     * 可选项
     * mouseZoomDirection
     * 用于移动端捏合缩放操作与应用鼠标缩放的对应关系
     * 1:鼠标滚轮向上为放大，
     * 0:鼠标滚轮向下为放大(default)
     */
    mouseZoomDirection?: number;
    /**
     * 可选项
     * 触摸指令，移动端的触摸指令对应为云端的触屏还是鼠标
     * 'touchScreen' | 'mouse'
     * 触摸指令模式，对应后台应用管理->应用编辑->移动端高级设置->触摸指令模式 优先级高于后台配置
     */
    touchOperateMode?: 'touchScreen' | 'mouse';
    /**
     * 可选项
     * 优先使用渲染服务器点对点连接外网ip
     * 如果配置将覆盖后台设置的 preferPublicIp 参数
     */
    preferPublicIp?: string;
    /**
     * 可选项
     * 是否自动播放。默认开启。
     * 如果关闭，连接成功之后会有提示UI，用户手动触发。
     * 开启自动播放时也不能保证所有浏览器自动播放成功，当播放失败或者浏览器不支持自动播放时，
     * 也会显示播放按钮，用户点击播放按钮手动播放。
     */
    autoPlay?: boolean;
    /**
     * 可选项
     * 在播放失败或者手动播放模式下是否显示播放的按钮。
     * 默认开启。要注意，如果关闭情况下要添加好提示或UI，引导用户点击播放。
     * UI中要让用户触发 larksr.videoComponent.playVideo();
     */
    showPlayButton?: boolean;
    /**
     * 可选项
     * 语言设置,目前只支持种英文两种,默认中文
     * zh-CN 中文 en 英文
     */
    language?: string;
    /**
     * 点对点连接成功，但未接收到视频流或未播放成功超时时间。自动播放模式下超时会弹出提示按钮。
     * 默认 20S
     */
    playTimeout?: number;
    /**
     * 是否使用新版摄像头/麦克风协议
     * 单独上传流程要求渲染服务器版本大于3290）
     */
    useSeparateMediaSharePeer?: boolean;
    /**
     * 是否启用 canvas 渲染. 默认关闭
     * 要注意移动端开启 canvas 会消耗额外性能。
     * 已知问题: iOS 在关闭 canvas 模式下，忽略狂高比的拉伸模式无效。推荐使用 initResolutionType，适应客户端窗口分辨率
    */
    enableCanvasRender?: boolean;
    /**
     * 强制使用canvs2d模式，默认优先使用 webgl
     */
    forceCanvas2d?: boolean;
    /**
     * 可选项
     * loading页载入Logo版本
     */
    loadingLogoVersion?: string;
    /**
     * 初始化分辨率方式
     * 1:适应客户端窗口】和【0:应用默认分辨率】,默认值：0
     * 此处配置优先级大于管理后台配置
     */
    initResolutionType?: number;
}
```
