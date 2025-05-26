# 3.2.401

> The multimedia channel feature of version 3.2.401 is enabled on rendering server 3.2.2.0+.

## New Features in 3.2.401

> The following sample code assumes that the `larksr` object has been initialized and connected successfully.
> Test demo: https://github.com/ParaverseTechnology/lark_sr_websdk_demos/tree/gh-pages

(1). Added multi-channel media upload feature for the Web. Use `larksr.getMediaSharePeerConnection(index)` to get the media upload channel.

The index supports 0 - 5. The media operations after obtaining the media channel are the same as the previous interface. The original interface is equivalent to `getMediaSharePeerConnection(0)`.

Usage example:

```javascript
larksr.getMediaSharePeerConnection(0).openVideo();
larksr.getMediaSharePeerConnection(0).closeVideo();
```

> When connecting to an older version of the rendering server that does not support multi-channel upload, only channel 0 will work.

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

(3). Set the video encoding for a specific connection channel using `preferVideoCode`

```javascript
larksr.getMediaSharePeerConnection(0).preferVideoCode = 'h264';
```

> If the current browser supports the specified video encoding, it will be used preferentially. If not, the default encoding method will be used.
> The setting will take effect the next time the video is opened. The already opened video will not change.

(4). Set the video upload bitrate for a specific connection channel

```javascript
larksr.getMediaSharePeerConnection(0).codeRate = {
        start: 1000,
        min: 1000,
        max: 20000,
}
```

> The setting will take effect the next time the video is opened. The already opened video will not change.

(5). Media connection channels can listen to events separately, for example:

```javascript
larksr.getMediaSharePeerConnection(0).on("rtc_state_change", function(e) {
    console.log("ice state change", e);
});
```

(6). The opened or saved media channel object has a separate id, 0 - 5

```javascript
larksr.getMediaSharePeerConnection(0).id
```

(7). Force the use of canvas mode, the canvas of the video channel can rotate the screen clockwise or counterclockwise

Enable rotation

```javascript
larksr.getMediaSharePeerConnection(0).forceRenderToCanvas = true;
```

Force clockwise rotation

```javascript
larksr.getMediaSharePeerConnection(0).canvasRender.setRotate(true);
```

> The setting will take effect the next time the video is opened. The already opened video will not change.