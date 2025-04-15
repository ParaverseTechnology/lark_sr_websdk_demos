# LarkSR WebClient SDK

---

[English](./README.md) [中文](./README.zh_CN.md)

---

Develop webclient for LarkSR cloudrending or LarkSR VR monitor client. Free design UI and define operate.

For most common scene LarkSR default webclient, which is also developer with SDK same UI [ui-mobile-vue](./ui-mobile-vue/), access cloudrending 3D app without develop.

Links：

[Paraverse](https://www.paraverse.cc/)

[LarkSR Doc](https://www.pingxingyun.com/devCenter.html)

[Experience](https://www.paraverse.cc/)

SDK include:

* LarkSR restful request.
* CloudRending Video.
* Handle input, keyboard, gamepad, touchscreen.
* Scale mode.
* Fullscreen mode.
* Landscap mode.

### Notice

> SDK V3.2.30 only support server version above [V3.2.3.1](https://www.pingxingyun.com/devCenter.html)
> [Old verion SDK Demo](https://github.com/ParaverseTechnology/lark_sr_websdk_demos/releases/tag/V3.2.10)
> V3.2.314 server and datachannel above 3.2.5.1

## Quick Start

### install

1. npm

```cmd
npm i larksr_websdk
```

2. plain html

```html
<script src="larksr-web-sdk.min.js"></script>
```

### Use

Import websdk with plain html SDK under global object larksr_websdk.

Connect cloud resource and all event access with new LarkSR object.

> SDK default config html 100% height 100% width viewport. Auto handle input.

> SDK mainly contain loading page and cloud video page no other ui.efore start:

1. Lark SR server address, exp：http://222.128.6.137:8181/
2. SDK auth code，connect business@paraverse.cc
3. App id from Lark SR admin server applist.

```javascript
var client = new LarkSR({ 
    // root html element
    // WARNING not document.documentElement
    rootElement: document.getElementById('container'),
    // Sever address
    serverAddress: "Lark Sever address",
    // SDK ID or set by call initSDKAuthCode
    // authCode: 'your SDK ID',
});
```

Set sdk auth code.

```javascript
client.initSDKAuthCode('Your SDK ID')
.then(() => {
    // start connect;
    client.connect({
        // LarkSR cloud appid from LarkSR admin server.
        // doc
        // https://showdoc.pingxingyun.com/web/#/75/1697
        appliId: "appid from LarkSR admin"
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
// close connection.
// client.close();
// release DOM element.
// client.destroy();
```

## DEMO List

1. [sample-plain-html](./sample-plain-html/)
1. [sample-react](./sample-react/)
1. [sample-vue](./sample-vue/)
1. [sample-vue3](./sample-vue3/)
1. [ui-mobile-vue](./ui-mobile-vue/) default webclient ui.
1. [AI Voice to cloud demo](https://github.com/ParaverseTechnology/vh-webclient)

### Doc

[LarkSR WebClient SDK](https://ParaverseTechnology.github.io/en/webclient_sdk/)
