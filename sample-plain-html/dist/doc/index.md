#

## 安装

1. npm 方式

```cmd
npm i larksr_websdk
```

2. 直接引入

```html
<script src="larksr-web-sdk.min.js"></script>
```

> 直接引入模式下 SDK 挂载为全局对象 larksr_websdk。

## 使用

### 注意

> V3.2.30 开始仅支持服务端 [V3.2.3.1](https://www.pingxingyun.com/devCenter.html) 以上版本。
> [老版本 SDK Demo 下载](https://github.com/pingxingyun/lark_sr_websdk_demos/releases/tag/V3.2.10)

## 创建 LarkSR 实例

```typescript
/**
* LarkSR 客户端。所有操作和事件通过该类传递
* @param config 本地配置, 优先级最高
*/
constructor(config: ILarkSRConfig);
```

example:

```js
var client = new LarkSR({ 
    // 设置挂载显示的元素
    // 注意*不要*设置为 document.documentElement
    rootElement: document.getElementById('container'),
    // 服务器地址,实际使用中填写您的服务器地址
    // 如：http://222.128.6.137:8181/
    // 当使用平行云托管服务时服务器地址自动分配,可留空。
    // larksr.connectWithPxyHost 进入应用
    serverAddress: "Lark 服务器前台地址",
    // SDK ID 也可在 initSDKAuthCode 设置
    authCode: '您的 SDK ID',
    // 测试载入背景图
    // loadingBgUrl: 'https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg',
});

// start connect;
// 使用平行云托管服务时，用 connectWithPxyHost 进入应用并自动分配服务器.
client.connect({
    // 要使用的云端资源的应用 ID，从后云雀后台接口获取
    // 参考查询应用一栏文档
    // https://www.pingxingyun.com/online/api3_2.html?id=476
    // 如 222.128.6.137:8181 系统下的 879408743551336448 应用
    appliId: "应用ID"
})
.then(() => {
    console.log('enter success');
})
.catch((e) => {
    console.error(e);
}); 
// ...
// 主动关闭并清理资源
// client.close();
```

## 文档目录

### [参数配置](./config.md)
### [LarkSR 对象方法](./functons.md)
### [LarkSR 事件](./events.md)
### [LarkSR 对象成员](./member_variables.md)
### [SDK ID 加密](./sdkid_encryption.md)
### [SDK 更新](./update.md)
