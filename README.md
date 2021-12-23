# LarkSR WebClient 接入 SDK

SDK 适用于自定义 LarkSR 云渲 Web 客户端或者自定义 VR 监控画面客户端的二次开发，自定义 UI 和操作逻辑等。有较高的灵活性。

对于不需要二次开发，或者简单修改，可以参照使用 iframe 的接入方式，将标准 Web 客户端网页嵌入到系统中去。

参考连接：

[平行云产品介绍](https://www.pingxingyun.com/index.html)

[LarkSR 系统部署和文档](https://www.pingxingyun.com/devCenter.html)

[即刻体验](https://www.pingxingyun.com/experience/experience.html)

SDK 功能包括:

* 处理后台请求和接口
* 云渲染视频拉取显示
* 输入方式包括鼠标，键盘，手柄，触摸, 并提供输入接口和控制内部输入方式开启接口
* 显示和缩放模式，默认以浏览器视口为容器大小, 视频窗口保留宽高比并且不会拉伸完全显示。并可配置
* 处理全屏模式，并可配置
* 自动处理横屏模式，手机端强制横屏模式，并可配置

## 快速接入

### 安装

1. npm 方式

```cmd
npm i larksr_websdk
```

2. 直接引入

```html
<script src="larksr-web-sdk.min.js"></script>
```

### 使用

使用前应准备好

1. Lark 服务器前台可访问的地址, 如：http://222.128.6.137:8181/
2. SDK 授权码，联系 business@pingxingyun.com 获取,注意是 SDK 本身的授权码，不是服务器上的授权
3. 系统中获取的应用 ID,如 http://222.128.6.137:8181/ 系统下的 879408743551336448

```javascript
var client;
// 直接调用进入应用接口创建实例，自动配置连接云端资源
larksr_websdk.CreateLarkSRClientFromeAPI({
        // 设置挂载显示的元素
        // 注意*不要*设置为 document.documentElement
        rootElement: document.getElementById('container'),
        // 服务器地址,实际使用中填写您的服务器地址
        // 如：http://222.128.6.137:8181/
        serverAddress: "Lark 服务器前台地址",
        // 授权码
        authCode: '您的 SDK 授权码',
        // 测试载入背景图
        // loadingBgUrl: 'https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg',
    }, {
        // 要使用的云端资源的应用 ID，从后云雀后台接口获取
        // 参考查询应用一栏文档
        // https://www.pingxingyun.com/online/api3_2.html?id=476
        // 如 222.128.6.137:8181 系统下的 879408743551336448 应用
        appliId: "应用ID"
    })
    .then((res) => {
        console.log('enter appli success', res);
        // 创建成返回 LarkSR 实例
        client = res;
        // 开始流程
        client.start();
    })
    .catch((e) => {
        // 创建失败返回错误
        console.error('enter appli falied', e);
    });
```

SDK 加载成功之后，非模块模式下，SDK 挂载为全局对象 larksr_websdk。

连接云端资源，管理生命周期和事件等主要在 LarkSR 对象下。通过调用 CreateLarkSRClientFromeAPI 配置后台请求参数，创建 LarkSR 对象实例。

> 默认情况下自动连接云端资源，将容器设置为浏览器视口高度，并配置网页 100% 宽高显示。SDK 内部自动处理按键输入输出。

> SDK 只包含 loading，内部不包含其他 UI。主要目的时二次开发云渲染客户端自定义 UI 使用。

## 参考 DEMO 和文档

1. `sample-plain-html` 直接引用
2. `sample-react` 在 react 中使用
3. `sample-vue` 在 vue 中使用
4. `ui-mobile-vue` 带基本 UI 的 Demo, 包括手机端的菜单，摇杆，虚拟鼠标，虚拟键盘等。

### 文档

[使用 LarkSR 对象](./sample-plain-html/dist/doc/index.md)

[配置参数](./sample-plain-html/dist/doc/config.md)

[方法](./sample-plain-html/dist/doc/functions.md)

[抛出事件](./sample-plain-html/dist/doc/events.md)