# Dev Branch Current Version 3.2.4-dev.0.1

> The Dev branch includes unreleased server-side features. Used for testing and debugging.

## New Features in 3.2.4-dev.0.1

> The following sample code assumes that the `larksr` object has been initialized and connected successfully.
> Test demo: https://github.com/ParaverseTechnology/lark_sr_websdk_demos/tree/gh-pages

(1). Added multi-channel media upload feature on the Web. Use `larksr.getMediaSharePeerConnection(index)` to get the media upload channel.

The index supports 0 - 5. The operations for opening media after obtaining the media channel are the same as the previous interface. The original interface is equivalent to `getMediaSharePeerConnection(0)`.

Usage example:

```javascript
larksr.getMediaSharePeerConnection(0).openVideo();
larksr.getMediaSharePeerConnection(0).closeVideo();
```

> When connected to older versions of the rendering server that do not support multi-channel uploads, only channel 0 will work.

(2). Get the connection status of a specific channel using `getStats`

```javascript
larksr.getMediaSharePeerConnection(0).getStats()
.then((res) => {
    console.log("state: ", res);
})
.catch((e) => {
    console.log("get state failed", e);
})
```

(3). Set the video codec for a specific connection channel using `preferVideoCode`

```javascript
larksr.getMediaSharePeerConnection(0).preferVideoCode = 'h264';
```

> If the current browser supports the specified video codec, it will be used preferentially. If not, the default codec will be used.
> The setting will take effect the next time the video is opened. The already opened video channel will not change.

(4). Set the video upload bitrate for a specific connection channel

```javascript
larksr.getMediaSharePeerConnection(0).codeRate = {
        start: 1000,
        min: 1000,
        max: 20000,
}
```

> The setting will take effect the next time the video is opened. The already opened video channel will not change.

(5). Media connection channels can listen to events individually, for example:

```javascript
larksr.getMediaSharePeerConnection(0).on("rtc_state_change", function(e) {
    console.log("ice state change", e);
});
```

(6). The opened or saved media channel object has a unique id, 0 - 5

```javascript
larksr.getMediaSharePeerConnection(0).id
```

(7). Force the use of canvas mode, and the video channel's canvas can rotate the image clockwise or counterclockwise.

Enable rotation:

```javascript
larksr.getMediaSharePeerConnection(0).forceRenderToCanvas = true;
```

Force clockwise rotation:

```javascript
larksr.getMediaSharePeerConnection(0).canvasRender.setRotate(true);
```

> The setting will take effect the next time the video is opened. The already opened video channel will not change.