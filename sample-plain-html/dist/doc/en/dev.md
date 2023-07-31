# Dev 分支 目前版本 3.2.4-dev.0.1

> Dev 分支包含未发布的服务端功能。测试联调使用。

## 3.2.4-dev.0.1 新增功能

> 以下示例代码假定 `larksr` 对象初始化并连接成功。
> 测试demo https://github.com/pingxingyun/lark_sr_websdk_demos/tree/gh-pages

(1). 新增多路 Web 端上传媒体功能。使用 `larksr.getMediaSharePeerConnection(index)` 获取上传媒体通道。

序号 index 支持 0 - 5, 获取媒体通道之后的打开媒体操作和之前的接口相同。原有的接口等同于 `getMediaSharePeerConnection(0)`

使用方式如

```javascript
larksr.getMediaSharePeerConnection(0).openVideo();
larksr.getMediaSharePeerConnection(0).closeVideo();
```

> 连接不支持多通道上传的老版本渲染服务器时，仅通道 0 起作用。

(2). 获取具体通道的连接状态 `getStats` 

```javascript
larksr.getMediaSharePeerConnection(0).getStats()
.then((res) => {
    console.log("state: ", res);
})
.catch((e) => {
    console.log("get state failed", e);
})
```

(3). 设置具体连接通道的视频编码 `preferVideoCode`

```javascript
larksr.getMediaSharePeerConnection(0).preferVideoCode = 'h264';
```

> 当当前浏览器支持所设定的视频编码时优先使用，如果不支持使用默认的编码方式
> 设置完成之后再次打开视频起效，已经打开的视频通不会有变化。

(4). 设置具体连接通道的视频上传码率

```javascript
larksr.getMediaSharePeerConnection(0).codeRate = {
        start: 1000,
        min: 1000,
        max: 20000,
}
```

> 设置完成之后再次打开视频起效，已经打开的视频通不会有变化。

(5). 媒体连接通道可以单独监听事件，如

```javascript
larksr.getMediaSharePeerConnection(0).on("rtc_state_change", function(e) {
    console.log("ice state change", e);
});
```

(6). 打开或保存下来的媒体通道对象有单独的id, 0 - 5

```javascript
larksr.getMediaSharePeerConnection(0).id
```

(7). 强制使用画布模式，视频通道的画布可以顺时针或者逆时针旋转画面

开启旋转

```javascript
larksr.getMediaSharePeerConnection(0).forceRenderToCanvas = true;
```

强制顺时针旋转

```javascript
larksr.getMediaSharePeerConnection(0).canvasRender.setRotate(true);
```

> 设置完成之后再次打开视频起效，已经打开的视频通不会有变化。