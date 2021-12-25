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

主要使用 LarkSR 对象实例，所有基本操作和事件通过该实例实现。创建该对象一般通过 `CreateLarkSRClientFromeAPI` 和 `CreateLarkSRClientFromeUrl` 函数创建 LarkSR 实例。

```typescript
/**
 * 通过调用后台接口获取云端应用参数
 * @param config 传入 config @see ILarkSRConfig
 * @param params 进入应用接口参数。appliId 为必填项
 * @returns Promise 创建 larksr client 是否成功
 */
export declare function CreateLarkSRClientFromeAPI(config: ILarkSRConfig, params: {
    appliId: string;
    playerMode?: number;
    userType?: number;
    roomCode?: string;
    taskId?: string;
}): Promise<LarkSR>;

/**
 * 通过从url参数中获取云端应用相关参数
 * @param config 传入 config @see ILarkSRConfig
 * @returns Promise 创建 larksr client 是否成功
 */
export declare function CreateLarkSRClientFromeUrl(config: ILarkSRConfig): Promise<LarkSR>;
```

## 手动创建

```typescript
/**
* LarkSR 客户端。所有操作和事件通过该类传递
* 注意，如果手动创建该类，要清楚参数的意义，一般只有调试等特殊情况才手动创建该类
* @see CreateLarkSRClientFromeAPI, CreateLarkSRClientFromeUrl
* @param config 本地配置，如果有 IAppliParams 相同的配置项，优先级最高
* @param params 云端应用参数等，通过后台接口或者url参数获取。
*/
constructor(config: ILarkSRConfig, params?: IAppliParams);
```

example:

```js
var client = new LarkSR({ 
    // 设置挂载显示的元素
    // 注意*不要*设置为 document.documentElement
    rootElement: document.getElementById('container'),
    // 服务器地址,实际使用中填写您的服务器地址
    // 如：http://222.128.6.137:8181/
    serverAddress: "Lark 服务器前台地址",
    // SDK ID 也可在 initSDKAuthCode 设置
    // authCode: '您的 SDK ID',
    // 测试载入背景图
    // loadingBgUrl: 'https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg',
});

// 授权码,验证成功之后才能调用 connect
client.initSDKAuthCode('您的 SDK ID')
.then(() => {
    // start connect;
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
### [LarkSR 事件](./functons.md)
