# LarkSR WebClient SDK

Develop webclient for LarkSR cloudrending or LarkSR VR monitor client. Free design UI and define operate.

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
> [Old verion SDK Demo](https://github.com/pingxingyun/lark_sr_websdk_demos/releases/tag/V3.2.10)
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
2. SDK auth code，connect business@pingxingyun.com or register https://www.pingxingyun.com/console/#/
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
    // test backgroud url
    // loadingBgUrl: 'https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg',
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
        // https://www.pingxingyun.com/online/api3_2.html?id=476
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

### Doc

[LarkSR WebClient SDK](https://pingxingyun.github.io/en/webclient_sdk/)


## Index

### [Config](./config.md)
### [LarkSR functions](./functions.md)
### [LarkSR events](./events.md)
### [LarkSR event codes](./event_codes.md)
### [LarkSR member varibales](./member_variables.md)
### [SDK ID encryption](./sdkid_encryption.md)
### [Multi media share](./multi_media_3_2_401.md)
### [SDK Update](./update.md)
