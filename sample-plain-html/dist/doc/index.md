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

> 注意，如果手动创建该类，要清楚参数的意义，一般只有调试等特殊情况才手动创建该类

```typescript
/**
* LarkSR 客户端。所有操作和事件通过该类传递
* 注意，如果手动创建该类，要清楚参数的意义，一般只有调试等特殊情况才手动创建该类
* @see CreateLarkSRClientFromeAPI, CreateLarkSRClientFromeUrl
* @param config 本地配置，如果有 IAppliParams 相同的配置项，优先级最高
* @param params 云端应用参数等，通过后台接口或者url参数获取。
*/
constructor(config: ILarkSRConfig, params: IAppliParams);
```

## 文档目录

### [参数配置](./config.md)
### [LarkSR 对象方法](./functons.md)
### [LarkSR 事件](./functons.md)
