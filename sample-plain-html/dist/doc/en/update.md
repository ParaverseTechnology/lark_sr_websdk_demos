# Update

## V3.2.30

> V3.2.30 only supports server versions [V3.2.3.1](https://www.pingxingyun.com/devCenter.html) and above.
> [Download old version SDK Demo](https://github.com/ParaverseTechnology/lark_sr_websdk_demos/releases/tag/V3.2.10)

1. [Added Pixel Streaming support](https://docs.unrealengine.com/4.27/en-US/SharingAndReleasing/PixelStreaming/PixelStreamingIntro/).
2. Improved security by adding SDK ID encryption configuration.
3. Removed the functions CreateLarkSRClientFromePXYHost, CreateLarkSRClientFromeAPI, and CreateLarkSRClientFromeUrl. Use `new LarkSR(config: ILarkSRConfig)` to create objects directly.

## V3.2.33

1. Added intelligent voice-related interface support

LarkSR object additions:

```typescript
/**
 * Start intelligent voice dialogue text input
 * Should start input when intelligent voice is in the start state
 * @param text Input text
 * @returns Returns dialogue ID
 */
public aiDmTextInput(text: string) {
/**
 * Start intelligent voice dialogue voice input, automatically request recording permission
 * Should start input when intelligent voice is in the start state
 * @returns Returns dialogue ID on success, throws an exception on failure
 */
public startAiDmVoiceInput() {

/**
 * Stop intelligent voice input, notify the voice engine that the current user input dialogue has ended
 * @returns Returns the current dialogue ID
 */
public stopAiDmVoiceInput() {
```

LarkSR added the following events:

```typescript
larksr.on('aivoicestatus', (e) => {
    // Intelligent voice service status
});

larksr.on('aivoiceasrresult', (e) => {
    // Intelligent voice to text recognition result
});

larksr.on('aivoicedmresult', (e) => {
    // Intelligent voice dialogue result
});
```

## V3.2.37

```typescript
/**
 * Set whether to force landscape display content.
 * handelRootElementSize must be set to true to take effect.
 * Note that in forced landscape mode, the coordinate system of the webpage is opposite to the visual one. If input events are passed through external input, adjustments should be made.
 * @param force Whether to force landscape
 */
setMobileForceLandScape(force: boolean): void;
```

## V3.2.311

Added microphone input interface. After the client is turned on, the cloud application can directly receive audio by reading the microphone on the sound card.

> The minimum server version that matches this feature is V3.2.51
> To use this feature, enable the audio input function in the background application management
> Note that the media device should be turned on after the connection is successful. That is, it is only effective after calling `mediaPlayed`

```typescript
/**
 * Turn on an audio device. Note that the browser restricts opening audio only under https or localhost.
 * @param deviceId Audio device ID. If not provided, the default device will be opened. @see getConnectedAudioinputDevices
 * @returns
 */
openAudio(deviceId?: string);
/**
 * Turn off the current audio device
 * @returns
 */
closeAudio(): boolean | undefined;
/**
 * Return the list of connected audio devices. The device ID in the device list can be used to open a specific audio device.
 * @returns
 */
getConnectedAudioinputDevices(): Promise<MediaDeviceInfo[] | undefined>;
/**
 * Set whether the currently enabled audio track is enabled
 * @param enable Whether to enable
 * @returns
 */
setAudioEnable(enable: boolean): void or undefined;
```

LarkSR configuration item added automatic microphone configuration. Pass in `new LarkSR({ ... other configurations omitted ... audioInputAutoStart: true})`,

> Manually passed `audioInputAutoStart` has a higher priority than background configuration

```javascript
/**
* When the audio input function is enabled, whether to automatically connect to the audio device.
* Default is off.
* Note that the default is to open the default audio device in the system.
*/
audioInputAutoStart?: boolean;
```

## V3.2.319

Added video input interface. After the client is turned on, the cloud application can directly receive video data by reading the camera on the server.

> The minimum server version that matches this feature is V3.2.61
> To use this feature, enable the video input function in the background application management
> Note that the media device should be turned on after the connection is successful. That is, it is only effective after calling `mediaPlayed`

```typescript
/**
 * Turn on a video device. Note that the browser restricts opening video only under https or localhost.
 * @param audio boolean Whether to enable audio at the same time
 * @param cameraId Video device ID. If not provided, the default device will be opened. @see getConnectedVideoinputDevices
 * @returns Promise
 */
openVideo(audio?: boolean, cameraId?: string);
/**
 * Turn on the default media device. Note that the browser restricts opening only under https or localhost.
 * If you need to specify a special media device, please use @see openAudio @see openVideo separately
 * @param video Whether to include video
 * @param audio Whether to include audio
 * @returns Promise
 */
openDefaultMedia(video?: boolean, audio?: boolean)>;
/**
 * Return the list of connected video devices
 * @returns Promise<MediaDeviceInfo[]>
 */
getConnectedVideoinputDevices();
/**
 * Set whether the currently enabled video track is enabled
 * @param enable Whether to enable
 * @returns void
 */
setVideoEnable(enable: boolean);
```

LarkSR configuration item added automatic video input configuration. Pass in `new LarkSR({ ... other configurations omitted ... videoInputAutoStart: true})`,

> Manually passed `videoInputAutoStart` has a higher priority than background configuration

```javascript
/**
 * When the video input function is enabled, whether to automatically connect to the video device.
 * Default is off.
 * Note that the default is to open the default video device in the system.
 */
videoInputAutoStart?: boolean;
```

## V3.2.321

LarkSR configuration item added default zoom gesture and mouse wheel correspondence and whether to use touch screen mode. Pass in `new LarkSR({ ... other configurations omitted ... mouseZoomDirection: 0, touchOperateMode: "mouse"})`,

> Manually passed configuration has a higher priority than background configuration

```javascript
/**
 * mouseZoomDirection
 * Used for the correspondence between pinch zoom operation on mobile and mouse zoom in the application
 * 1: Mouse wheel up to zoom in,
 * 0: Mouse wheel down to zoom in (default)
 */
mouseZoomDirection?: number;
/**
 * Touch instruction mode, corresponding to the background application management->application editing->mobile advanced settings->touch instruction mode. Has a higher priority than background configuration
 * Touch instruction, the touch instruction on the mobile corresponds to the touch screen or mouse on the cloud
 * 'touchScreen' | 'mouse'
 */
touchOperateMode?: 'touchScreen' | 'mouse';
```

The captrueFrame method will bring out the screenshot through the return value

```javascript
/**
 * Capture a frame of image
 * @params data: any Additional data thrown when the capture event is thrown, such as the capture timestamp
 * @return { data: any, base64: base64string } Returns the input data and the captured base64 string
 */
captrueFrame(data: any)
```

Added destroy method. Note that after destruction, the larksr object is no longer available

```javascript
/**
 * Remove the rendering component from the DOM. Note that after deleting the rendering component, you will not be able to enter the application again. All states will be invalid and cannot be restored. You can only re-new LarkSR
 */
destroy(): void;
```

Added keyboardhandler in the operation class for open access. You can configure which keys' default behavior to intercept

```javascript
// Set the default interception of browser default behavior for keyboard events.
// The ones in preventKeys will be intercepted. If the array is set to empty, none will be intercepted
// Default intercepts F1 F5 F12
larksr.op.keyboardHandler.preventKeys = [["F1", "F5", "F12"]];
```

Added gestureHandler in the operation class for open access. gestureHandler handles the process of mapping touch events on mobile to mouse events.

You can adjust the touch event trigger parameters through gestureHandler

```javascript
// The speed of the mouse relative movement provided when the touch event is mapped to the mouse event.
// That is, rx = (pxNew-pxOld) * relativeMouseMoveSpeed
// ry = (pyNew-pyOld) * relativeMouseMoveSpeed
// May affect the effect of cloud applications that use relative movement (rawInput) judgment
larksr.op.gestureHandler.relativeMouseMoveSpeed = 2;
// When the touch event is simulated as a mouse event, the judgment range of the simulated click.
// Actual mouse events generally do not move when clicked, while touch operations will basically trigger move events
// If you want to simulate click events on a PC, such as single or double click, no mouse move should be inserted between mouse down and up
// When the move event is triggered, the move event is sent only when it exceeds this judgment range.
// Note that modifying this value may cause the cloud application to fail to judge single or double clicks. If the cloud application does not include similar operations, it will not have much impact
larksr.op.gestureHandler.tapLimitRadius = 20;
// Within this time range, a single click down event will be attempted. Modifying this value may affect the success rate of triggering single click events
larksr.op.gestureHandler.tapLimitTimeout = 100;
```

You can intercept touch event callbacks through gestureHandler. Set the callback function through `larksr.op.gestureHandler`

## V3.2.322

1. Fixed the issue where the background set LOGO would flash the default LOGO in some cases
2. Added `larksr.virtualCursorPosition` and `larksr.virtualCursorPositionRaw` (larksr object creation code omitted) to get the current position of the virtual mouse or touch point.

## V3.2.324

1. Fixed iOS screen height judgment issue
2. Added get application list interface `API.GetAppliList(server: string, params: any);`
3. Added get region list interface `API.RegionList(server: string, params: any);`
4. Added get background configuration UI interface `larksr.getTouchCtrMapping()`
5. Added `RTMP_STREAM_STATE = "rtmpstreamstate"` event, returns cloud live streaming event
6. Added `RTMP_STREAM_ERROR = "rtmpstreamerror"` event, returns cloud live streaming error
7. Added `larksr.StartCloudLiveStreaming(params)` interface, start cloud live streaming function
8. Added `larksr.StopLiveStreaming()` interface, close cloud live streaming function.

## V3.2.326

1. The screenshot interface `captrueFrame(data: any, option?: { width: number; height: number;})` added option parameter, which can set the width and height of the screenshot
2. Added onlyHandleRootElementTransform parameter `new LarkSR({ ... other configurations omitted ... onlyHandleRootElementTransform: 0})`

```javascript
/**
* Whether to only set the rotation of the root component. Only effective when handleRootElementSize is true. Setting the rotation of the root component is used for mobileForceLandscape mode.
* Default is false. At this time, the SDK will set the width and height of the root component, margin 0, padding 0
* When true and handleRootElementSize is also true, only the rotation attribute of the root component is set, which is used for forced landscape mode and forced landscape and portrait switching.
* Note that when onlyHandleRootElementTransform is successfully enabled, the size of the root element should be ensured, and when the root element changes, the resize method should be called to notify the update of the root element size.
*/
onlyHandleRootElementTransform?: boolean;
```

## V3.2.327

1. Added method `larksr.updateServerAddress(serverAddress: string)`, which can update the server address after `new LarkSR()`. Used for situations where the server address needs to be set asynchronously.

```javascript
/**
* Set the server address separately, the same effect as the serverAddress field in the config
* Can be updated before entering the application.
* @param serverAddress Server address, such as http://192.168.0.55:8181/
*/
updateServerAddress(serverAddress: string): void;
```

## V3.2.329

1. Added autoplay parameter `new LarkSR({ ... other configurations omitted ... autoPlay: true, showPlayButton: true})`

The SDK internally adds a play button UI. When autoplay fails or in manual play mode, it will be displayed. The user needs to click to play.

In autoplay mode, it will try to play directly without manual click, including possibly playing muted.

```javascript
/**
* Whether to autoplay. Default is on.
* If turned off, there will be a prompt UI after the connection is successful, and the user needs to trigger it manually.
* When autoplay is enabled, it cannot guarantee that all browsers will autoplay successfully. When playback fails or the browser does not support autoplay,
* the play button will also be displayed, and the user needs to click the play button to play manually.
*/
autoPlay?: boolean;
/**
* Whether to display the play button when playback fails or in manual play mode.
* Default is on. Note that if it is turned off, you need to add prompts or UI to guide the user to click to play.
* In the UI, the user needs to trigger larksr.videoComponent.playVideo();
*/
showPlayButton?: boolean;
```

2. Added language configuration parameter `new LarkSR({ ... other configurations omitted ... language: true})`

```javascript
/**
* Language setting, currently only supports Chinese and English
* zh-CN Chinese en English
*/
language?: string;
```

3. Added rendering resource insufficient event, thrown when `larksr.connect` method and `resourcenotenough` event. You can judge the specific situation based on the code returned by the server, prompt the user or perform subsequent processing.

`connect` method returns a Promise:

```javascript
/**
 * Connect to cloud rendering resources
 * @params appID Cloud resource ID
 * @returns Promise Call the interface and verify the authorization to return success and automatically start the connection
 * Promise returns an error object:
 * {
        // type 0 Rendering resource insufficient error, 1 Other errors, can use type == 0 to judge whether it is a rendering resource insufficient error
        type: 0,

        // Event type when rendering resources are insufficient, other situations may not return, such as network errors
        eventType?：LarkSRClientEvent.RESOURCE_NOT_ENOUGH,

        // Error code returned by the server, exists when the server request is correct. Note the error code for rendering resource insufficiency.
        // Can use type == 0 to judge whether it is a rendering resource insufficient error, and then use code for detailed processing, or only use type == 0 for processing.
        // 813=The number of running applications has reached the maximum value: {0}, please try again later
        // 814=The number of running applications under the same appKey has reached the maximum value: {0}, please try again later
        // 815=The number of running applications has reached the maximum authorized concurrency, please try again later
        // 816=The number of running VR applications has reached the maximum authorized concurrency, please try again later
        // 817=Rendering resources are insufficient, please try again later
        // 820=No active GPU nodes
        // 821=Node resource usage has reached the set threshold
        // 823=The number of running applications on a single node has reached the maximum authorized concurrency, please try again later
        code?: 817,

        // Error message
        message:? "",
    }
*
*/
connect(params: {
    appliId: string;
    playerMode?: number;
    userType?: number;
    roomCode?: string;
    taskId?: string;
    clientMac?: string;
    groupId?: string;
    regionId?: string;
    targetServerIp?: string;
    appKey?: string;
    timestamp?: string;
    signature?: string;
}): Promise<void>;
```
 
Or listen to `resourcenotenough` separately:

```javascript
/**
 * Rendering resources are insufficient
    * {
    // Error code returned by the server, exists when the server request is correct. Note the error code for rendering resource insufficiency.
    // Can use type == 0 to judge whether it is a rendering resource insufficient error, and then use code for detailed processing, or only use type == 0 for processing.
    // 813=The number of running applications has reached the maximum value: {0}, please try again later
    // 814=The number of running applications under the same appKey has reached the maximum value: {0}, please try again later
    // 815=The number of running applications has reached the maximum authorized concurrency, please try again later
    // 816=The number of running VR applications has reached the maximum authorized concurrency, please try again later
    // 817=Rendering resources are insufficient, please try again later
    // 820=No active GPU nodes
    // 821=Node resource usage has reached the set threshold
    // 823=The number of running applications on a single node has reached the maximum authorized concurrency, please try again later
    code?: 817,

    // Error message
    message:? "",
}
* 
*/
RESOURCE_NOT_ENOUGH = 'resourcenotenough',
```

```javascript
// larksr creation process omitted
// Listen to the connection success event
larksr.on('resourcenotenough', function(e) { 
    console.log("LarkSRClientEvent RESOURCE_NOT_ENOUGH", e); 
});
```

## V3.2.331

1. Optimized the timing of the play button appearance in autoplay mode, added load timeout setting `new LarkSR({ ... other configurations omitted ... playTimeout: 20 })`
2. Fixed the issue where an error event was not thrown when WebRTC was not supported. The corresponding error code is 603, and the possible error codes for the `error` event are as follows:

```javascript
/**
 * Thrown when an error occurs
 * type:     error
 * message: Error message
 * code:    Possible error codes are as follows, the specific definition of error codes @see [./event_codes]
 *          // The websocket proxy connected to the server is closed
 *          LK_RENDER_SERVER_CLOSE                    : 102
 *          // The websocket connected to the proxy server is closed
 *          LK_PROXY_SERVER_CLOSE                     : 202
 *          // Version check failed, the server and client versions do not match. Currently, only major version mismatches between 3.1 and 3.2
 *          LK_VERSION_CHECK_FAILED                   : 301
 *          // The server returns a failure to create a Task
 *          TASK_NOTFOUND-TASK_NO_GPU_RESOURCE        : 401-404
 *          // The server failed to start the streaming process
 *          LK_START_STREAM_PROCESS_START-FAILED-LK_START_STREAM_ENCODER_ERROR : 501-504
 *          // RTC connection closed
 *          LK_RTC_EVENT_PEERCONNECTION_CLOSED        : 601
 *          // RTC connection error
 *          LK_RTC_EVENT_PEERCONNECTION_ERROR         : 602
 *          // RTC creation error, generally the browser does not support webrtc
 *          LK_RTC_EVENT_PEERCONNECTION_CREATE_FAILED : 603
 *          // The server actively requests the client to log out
 *          LK_NOTIFY_CLIENT_LOGOUT_PLAYER_LOGOUT     : 800
 *          // The host exits in one-person operation and multi-person viewing
 *          LK_NOTIFY_CLIENT_LOGOUT_TASKOWNER_LOGOUT  : 801
 *          
 */
ERROR              = 'error',
```

## V3.2.334

Optimized the implementation process of opening the media channel, optimized the effect of repeatedly opening media devices or switching media devices. Added a separate media upload channel (the separate upload process requires the rendering server version to be greater than 3290).

1. Added configuration item, useSeparateMediaSharePeer, configure whether to use a separate media upload channel (camera and microphone upload). Default is on. If you need to use the old version of the server, you should turn off this item. `new LarkSR({ ... other configurations omitted ... useSeparateMediaSharePeer: true })`
2. Added `pauseVideoSending/resumeVideoSending`, `pauseAudioSending/resumeAudioSending` to pause and resume camera or microphone upload.
3. Added `closeMediaChannel` to close the separate media upload channel. Only effective when useSeparateMediaSharePeer is true.
4. The `openVideo` interface added `openVideo(audio?: boolean, cameraId?: string, width?: number, height?: number)` width and height parameters to limit the width and height of the camera device

## V3.2.337

1. Cooperate with the server to upgrade the protocol.
2. Fixed other issues.

## V3.3.342

1. Cooperate with the server upgrade, added `larksr.serverFeatures` to return server-supported features
2. When the camera is turned on on the mobile, the camera screen direction will be rotated according to the screen rotation
3. The `openVideo` interface can pass parameters to specify whether it is the front camera `openVideo(audio: boolean = false, cameraId: string = '', width: number = 0, height: number = 0, front?: boolean)`
4. Get background application parameters `larksr.params.mobileKeyboardType`

## V3.2.343

1. Added configuration item `new LarkSR({ ... other configurations omitted ... enableCanvasRender: false })` to enable or disable canvas rendering mode. Default is off. Note that enabling canvas on mobile will consume additional performance.
2. Optimized display effect.
3. Optimized display width and height calculation method.

> Known issue: On iOS, the stretch mode that ignores the aspect ratio is invalid when canvas mode is turned off.
