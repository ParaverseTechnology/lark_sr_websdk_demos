# LarkSR Object Member Methods

LarkSR object member methods are mainly divided into the following three categories

## Control flow methods, including start, stop, restart, register authorization code, etc.

```typescript
/**
* Set the server address separately, same as the serverAddress field in config
* Can be updated before entering the application.
* @param serverAddress Server address, e.g., http://192.168.0.55:8181/
*/
updateServerAddress(serverAddress: string): void;
/**
 *
 * @param id sdk id Initialize sdk id
 * @returns
 */
initSDKAuthCode(id: string): Promise<void>;
/**
 * When using the Pingxingyun hosting platform, use connectWithPxyHost to connect to the cloud application
 * Hosting platform https://www.pingxingyun.com/console/#/
 * @param params Same as connect method
 * @return Same as connect method
 */
connectWithPxyHost(params: {
    appliId: string;
    playerMode?: number;
    userType?: number;
    roomCode?: string;
    taskId?: string;
    regionId?: string;
    groupId?: string;
}): Promise<void>;
/**
 * Connect to cloud rendering resources
 * @params appID Cloud resource ID
 * @returns Promise Call the interface and verify the authorization to return success and automatically start the connection
 * Promise returned error object:
 * {
        // type 0 Error caused by insufficient rendering resources, 1 Other errors, can use type == 0 to determine if it is an insufficient rendering resource error
        type: 0,

        // Event type when rendering resources are insufficient, may not return in other cases, such as network errors
        eventType?：LarkSRClientEvent.RESOURCE_NOT_ENOUGH,

        // Error code returned by the server, present when the server request is correct. Pay attention to the error codes for insufficient rendering resources.
        // Can use type == 0 to determine if it is an insufficient rendering resource error, then use code for detailed handling, or just use type == 0 for handling.
        // 813=The current number of running applications has reached the maximum: {0}, please try again later
        // 814=The number of running applications under the same appKey has reached the maximum: {0}, please try again later
        // 815=The number of running applications has reached the maximum authorized concurrency, please try again later
        // 816=The number of running VR applications has reached the maximum authorized concurrency, please try again later
        // 817=Insufficient rendering resources, please try again later
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
} | any): Promise<void>;
/**
 * Restart the cloud rendering process
 */
restart(): void;
/**
 * Restart the cloud application
 */
restartApp(): void;
/**
 * Actively close the connection
 */
close(): void;
```

## Input and output related methods, including mouse, keyboard, gamepad, touch

```typescript
/**
 * Switch the current operator
 * @param uid User id
 */
changeOperater(uid: number): void;
/**
 * Send text to the cloud application. When the cloud application has an input box, you can fill in the local text.
 * @param text Text
 */
inputText(text: string): void;
/**
 * Operation related events
 * All event coordinates are relative to the cloud application, not the webpage
 * CloudLark.IClientInput is a collection of all operation command interface objects
 * You can use the following moseMove interfaces separately
 * @param input Operation command
 */
sendInput(input: CloudLark.IClientInput): void;
/**
 * Send mouse move event to the cloud
 * Event coordinates are relative to the cloud application, not the webpage
 * Calculation method can refer to the getVMouseTouchPosition method in v_cursor.vue in the example https://github.com/ParaverseTechnology/lark_sr_websdk_demos
 * The principle is to obtain the relative scale through the screenState.operateScale member of the LarkSR object,
 * Local coordinates X larksr.screenState.operateScale.scaleX / scaleY to get the coordinates relative to the cloud
 *
 * @param PosX Mouse X coordinate relative to the cloud
 * @param PosY Mouse Y coordinate relative to the cloud
 * @param DeltaX Mouse X axis movement distance relative to the cloud
 * @param DeltaY Mouse Y axis movement distance relative to the cloud
 */
mouseMove(PosX: number, PosY: number, DeltaX: number, DeltaY: number): void;
/**
 * Send mouse move event to the cloud
 * Event coordinates are relative to the cloud application, not the webpage
 * Calculation method can refer to the getVMouseTouchPosition method in v_cursor.vue in the example https://github.com/ParaverseTechnology/lark_sr_websdk_demos
 * The principle is to obtain the relative scale through the screenState.operateScale member of the LarkSR object,
 * Local coordinates X larksr.screenState.operateScale.scaleX / scaleY to get the coordinates relative to the cloud
 *
 * @param PosX Mouse X coordinate relative to the cloud
 * @param PosY Mouse Y coordinate relative to the cloud
 * @param DeltaX Mouse X axis movement distance relative to the cloud
 * @param DeltaY Mouse Y axis movement distance relative to the cloud
 */
moseMove(PosX: number, PosY: number, DeltaX: number, DeltaY: number): void;
/**
 * Send mouse click event to the cloud
 * X Y coordinate calculation method is the same as mouseMove
 *
 * @param PosX Mouse X coordinate relative to the cloud
 * @param PosY Mouse Y coordinate relative to the cloud
 * @param key  LEFT = 0,RIGHT = 1, MIDDLE = 2
 */
mouseTap(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
/**
 * Send mouse down event to the cloud
 * X Y coordinate calculation method is the same as mouseMove
 *
 * @param PosX Mouse X coordinate relative to the cloud
 * @param PosY Mouse Y coordinate relative to the cloud
 * @param key  LEFT = 0,RIGHT = 1, MIDDLE = 2
 */
mouseDown(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
/**
 * Send mouse up event to the cloud
 * X Y coordinate calculation method is the same as mouseMove
 *
 * @param PosX Mouse X coordinate relative to the cloud
 * @param PosY Mouse Y coordinate relative to the cloud
 * @param key  LEFT = 0,RIGHT = 1, MIDDLE = 2
 */
mouseUp(PosX: number, PosY: number, key: CloudLark.MouseKey): void;
/**
 * Send mouse wheel event to the cloud
 * X Y coordinate calculation method is the same as mouseMove
 *
 * @param PosX Mouse X coordinate relative to the cloud
 * @param PosY Mouse Y coordinate relative to the cloud
 * @param Delata  120/-120 Mouse wheel scroll value
 */
mouseWheel(PosX: number, PosY: number, Delata: number): void;
/**
 * Send keyboard key down event to the cloud
 * @param key KeyboardEvent.code field, specific content refer to Chrome https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
 * @param isRepeat KeyboardEvent.repeat field, refer to https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat
 * @returns Whether the sending is successful, if the key parameter is passed incorrectly, the sending may fail
 */
keyDown(key: string, isRepeat: boolean): void;
/**
 * Send keyboard key up event to the cloud
 * @param key KeyboardEvent.code field, specific content refer to Chrome https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
 * @returns Whether the sending is successful, if the key parameter is passed incorrectly, the sending may fail
 */
keyUp(key: string): void;
/**
 * Gamepad interface messages are defined according to the Windows Xbox 360 gamepad standard, including the functions of the Xbox 360 gamepad, such as buttons, joysticks, and trigger keys. Windows supports up to 4 gamepads,
 * The current version of the server only handles 1 gamepad, and support for multiple gamepads will be released later. The key values sent in the interface are the corresponding key values defined in Windows.
 * Send gamepad button down event to the cloud
 * Refer to js to get gamepad events, refer to https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
 * @param userIndex Gamepad index, hardware device index 0-3. The first connected gamepad is 0, the second is 1, and so on.
 * @param button Button @see https://docs.microsoft.com/en-us/windows/win32/api/xinput/ns-xinput-xinput_gamepad
 * export const enum XINPUT_BUTTONS {
 *       XINPUT_GAMEPAD_DPAD_UP        = 0x0001,
 *       XINPUT_GAMEPAD_DPAD_DOWN      = 0x0002,
 *       XINPUT_GAMEPAD_DPAD_LEFT      = 0x0004,
 *       XINPUT_GAMEPAD_DPAD_RIGHT     = 0x0008,
 *       XINPUT_GAMEPAD_START          = 0x0010,
 *       XINPUT_GAMEPAD_BACK           = 0x0020,
 *       XINPUT_GAMEPAD_LEFT_THUMB     = 0x0040,
 *       XINPUT_GAMEPAD_RIGHT_THUMB    = 0x0080,
 *       XINPUT_GAMEPAD_LEFT_SHOULDER  = 0x0100,
 *       XINPUT_GAMEPAD_RIGHT_SHOULDER = 0x0200,
 *       XINPUT_GAMEPAD_A              = 0x1000,
 *       XINPUT_GAMEPAD_B              = 0x2000,
 *       XINPUT_GAMEPAD_X              = 0x4000,
 *       XINPUT_GAMEPAD_Y              = 0x8000,
 *       XINPUT_UNKNOWN                = -1,
 *   }
 * @param isRepeat Whether to repeat
 * @returns
 */
gamepadButtonDown(userIndex: number, button: number, isRepeat: boolean): void;
/**
 * Send gamepad button up event to the cloud
 * Refer to https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
 * @param userIndex Gamepad index
 * @param button Button
 * @returns
 */
gamepadButtonUp(userIndex: number, button: number): void;
/**
 * Send gamepad trigger key event to the cloud
 * Refer to https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
 * @param userIndex Gamepad index
 * @param isleft Whether it is the left trigger
 * @param value Trigger value 0-255
 * @returns
 */
gamepadTrigger(userIndex: number, isleft: boolean, value: number): void;
/**
 * Send gamepad joystick values to the cloud, i.e., axes values
 * win      MAX
 *           |
 *  MIN-------------MAX
 *          |
 *         MIN
 * Refer to js to get hardware gamepad https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
 * @param userIndex Gamepad index
 * @param thumblx Left joystick X value, -32767 to 32767
 * @param thumbly Left joystick Y value, -32767 to 32767
 * @param thumbrx Right joystick X value, -32767 to 32767
 * @param thumbry Right joystick Y value, -32767 to 32767
 * @returns
 */
joystick(userIndex: number, thumblx: number, thumbly: number, thumbrx: number, thumbry: number): void;
/**
 * Send touch down event to the cloud
 * Coordinate position is the same as mouseMove, relative to the cloud mouse move position
 * @param id Finger id
 * @param x X coordinate relative to the cloud
 * @param y Y coordinate relative to the cloud
 * @returns
 */
touchDown(id: number, x: number, y: number): void;
/**
 * Send touch move event to the cloud
 * Coordinate position is the same as mouseMove, relative to the cloud mouse move position
 * @param id Finger id
 * @param x X coordinate relative to the cloud
 * @param y Y coordinate relative to the cloud
 * @returns
 */
touchMove(id: number, x: number, y: number): void;
/**
 * Send touch up event to the cloud
 * Coordinate position is the same as mouseMove, relative to the cloud mouse move position
 * @param id Finger id
 * @param x X coordinate relative to the cloud
 * @param y Y coordinate relative to the cloud
 * @returns
 */
touchUp(id: number, x: number, y: number): void;
/**
 * Convert string to input mouse button value
 * @param button 'left' | 'mid' | 'right'
 * @returns  LEFT = 0,RIGHT = 1,MIDDLE = 2
 */
getMouseButtonType(button: 'left' | 'mid' | 'right'): CloudLark.MouseKey;
```

## Data channel extension, send data to the cloud application data channel

```typescript
/**
 * Send text message to data channel
 * Note that the cloud application needs to inherit the data channel function
 * > V3.2.314 version corresponds to server version and data channel version 3.2.5.1 and above
 * @param text Text
 */
sendTextToDataChannel(text: string): void;
/**
 * Send binary message to data channel
 * Note that the cloud application needs to inherit the data channel function
 * @param binary Binary message
 */
sendBinaryToDataChannel(binary: Uint8Array): void;
```

## Intelligent voice related interfaces

```typescript
/**
* Start intelligent voice dialogue text input
* Should start input when intelligent voice is in the start state
* @param text Input text
* @returns Return dialogue ID
*/
aiDmTextInput(text: string): number;
/**
* Start intelligent voice dialogue voice input, automatically request recording permission
* Should start input when intelligent voice is in the start state
* @returns Success returns dialogue id, failure returns exception
*/
startAiDmVoiceInput(): Promise<number>;
/**
* Stop intelligent voice input, notify the voice engine that the current user input dialogue is over
* @returns Return the current dialogue id
*/
stopAiDmVoiceInput(): number;
```

LarkSR adds the following events to get the status of the intelligent voice service:

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

## Microphone input interface

After the client is turned on, the cloud application can directly receive audio by reading the microphone on the sound card.

> The minimum server version that matches this feature is V3.2.51
> To use this feature, make sure to enable the voice input feature in the backend
> Note that the media device should be turned on after the connection is successful. That is, it is effective after calling `mediaPlayed`

```typescript
/**
 * Turn on an audio device, note that the browser restricts it to https or localhost to open audio
 * @param deviceId Audio device id, if not passed, the default device will be opened. @see getConnectedAudioinputDevices
 * @returns
 */
openAudio(deviceId?: string);
/**
 * Turn off the current audio device
 * @returns
 */
closeAudio(): boolean | undefined;
/**
 * Pause sending audio
 * @returns
 */
pauseAudioSending(): any;
/**
 * Resume sending audio
 * @returns
 */
resumeAudioSending(): any;
/**
 * Return the list of connected audio devices, the device id in the device list can be used to open a specific audio device
 * @returns
 */
getConnectedAudioinputDevices(): Promise<MediaDeviceInfo[] | undefined>;
/**
 * Set whether the currently opened audio track is enabled
 * @param enable Whether to enable
 * @returns
 */
setAudioEnable(enable: boolean): void | undefined;

/**
 * Request the browser to open the media and open the upload channel to the server.
 * Note that the request should be made after the server connection is successful
 * @param constraints Refer to navigator.mediaDevices.getUserMedia(constraints)
 * @param reset Whether to reset the media channel. If true, reset the entire peerconnection
 * @returns The binding information of the opened channel. Manage the media channel such as closing, pausing, or resuming use.
 */
openUserMedia(constraints?: MediaStreamConstraints, reset?: boolean): Promise<any>;
```

LarkSR configuration item to automatically open the microphone configuration, passed in when `new LarkSR({ ... other configurations omitted ... audioInputAutoStart: true})`,

> Manually passed `audioInputAutoStart` has a higher priority than the backend configuration

```javascript
/**
* When the audio input function is enabled, whether to automatically connect to the audio device.
* Disabled by default.
* Note that the default audio device of the system is enabled by default.
*/
audioInputAutoStart?: boolean;
```

Get the status of the currently opened audio device, such as `larksr.audioPaused`

```javascript
/**
 * The ID of the currently opened audio device, if not specified when opened, it is empty
 */
get audioDeviceId(): string | null | undefined;
/**
 * The track object of the currently opened audio, if not opened, it is empty
 */
get audioTrack(): MediaStreamTrack | null | undefined;
/**
 * Whether the audio channel is paused
 */
get audioPaused(): boolean | undefined;
```

## Video input interface

After the client is turned on, the cloud application can directly read video data by reading the camera on the server.

> The minimum server version that matches this feature is V3.2.61
> To use this feature, make sure to enable the video input feature in the backend application management
> Note that the media device should be turned on after the connection is successful. That is, it is effective after calling `mediaPlayed`

```typescript
/**
 * Turn on a video device, note that the browser restricts it to https or localhost to open video
 * @param audio boolean Whether to turn on audio at the same time
 * @param cameraId Video device id, if not passed, the default device will be opened. @see getConnectedVideoinputDevices
 * @param width Limit the width of the device to be opened
 * @param height Limit the height of the device to be opened
 * @returns Promise
 */
openVideo(audio?: boolean, cameraId?: string, width?: number, height?: number): Promise<any>;
/**
 * Turn on the camera device
 * @param cameraId Camera device ID, @see getConnectedVideoinputDevices
 * @param minWidth Limit the width of the device to be opened
 * @param minHeight Limit the height of the device to be opened
 * @returns @see openUserMedia
 */
openCamera(cameraId: string, minWidth?: number, minHeight?: number): Promise<any>;
/**
 * Turn on the default media device, note that the browser restricts it to https or localhost
 * If you need to specify a specific media device, please use @see openAudio @see openVideo separately
 * @param video Whether to include video
 * @param audio Whether to include audio
 * @returns Promise
 */
openDefaultMedia(video?: boolean, audio?: boolean): Promise<any>;
/**
 * Return the list of connected video devices
 * @returns Promise<MediaDeviceInfo[]>
 */
getConnectedVideoinputDevices(): Promise<MediaDeviceInfo[]>;
/**
 * Set whether the currently opened video track is enabled
 * @param enable Whether to enable
 * @returns void
 */
setVideoEnable(enable: boolean): void;

/**
 * Pause sending video
 * @returns
 */
pauseVideoSending(): any;
/**
 * Resume sending video
 * @returns
 */
resumeVideoSending(): any;

/**
 * Turn off the currently opened video device
 * @returns
 */
closeVideo(): any;
/**
 * Turn off the currently opened shared device, such as a shared tab, etc.
 * @returns
 */
closeShare(): any;
/**
 * Request the browser to open the media and open the upload channel to the server.
 * Note that the request should be made after the server connection is successful
 * @param constraints Refer to navigator.mediaDevices.getUserMedia(constraints)
 * @param reset Whether to reset the media channel. If true, reset the entire peerconnection
 * @returns The binding information of the opened channel. Manage the media channel such as closing, pausing, or resuming use.
 */
openUserMedia(constraints?: MediaStreamConstraints, reset?: boolean): Promise<any>;
```

LarkSR configuration item to automatically open the video input configuration, passed in when `new LarkSR({ ... other configurations omitted ... videoInputAutoStart: true})`,

> Manually passed `videoInputAutoStart` has a higher priority than the backend configuration

```javascript
/**
 * When the video input function is enabled, whether to automatically connect to the video device.
 * Disabled by default.
 * Note that the default video device of the system is enabled by default.
 */
videoInputAutoStart?: boolean;
```

Get the status of the currently opened video device, such as `larksr.videoPaused`

```javascript
/**
 * The ID of the currently opened video device, if not specified when opened, it is empty
 */
get videoDeviceId(): string | null | undefined;
/**
 * The track object of the currently opened video, if not opened, it is empty
 */
get videoTrack(): MediaStreamTrack | null | undefined;
/**
 * Whether the video channel is paused
 */
get videoPaused(): boolean | undefined;
```

## Cloud live streaming function

> Server 3.2.7.0 added, note that to use the cloud live streaming function, you need to enable this function in the backend application management

```javascript
/**
* Start the cloud live streaming function
* @param params {
*  // rtmp push url must be filled
*  path: "",
*  //rtmp push key
*  key: "",
*  // Push stream width
*  width: 1280,
*  // Push stream height
*  height: 720,
*  framerate: 30,
*  // kbps
*  bitrate: 1024 * 2,
*  // Whether to support reconnection
*  reconnect: true,
*  //Maximum number of reconnections
*  reconnectRetries: 3,
*  //Whether to stream the microphone (if voice input is supported)
*  voice: audioInput,
* }
* @returns Promise
*/
StartCloudLiveStreaming(params: CloudLark.IRtmp_Start): Promise<void> | undefined;
/**
* Turn off the cloud live streaming function
* @returns
*/
StopLiveStreaming(): void | undefined;
```

The relevant status of cloud live streaming refers to the two events `RTMP_STREAM_STATE` and `RTMP_STREAM_ERROR`

```javascript
/**
* Server 3.2.7.0 added
* rtmp live streaming status
*/
RTMP_STREAM_STATE = "rtmpstreamstate",
/**
* Server 3.2.7.0 added
* rtmp live streaming error
*/
RTMP_STREAM_ERROR = "rtmpstreamerror"
```

## Other

```typescript
/**
 * Capture a frame of image
 * @params data: any Additional data thrown when the capture event is thrown, such as the capture timestamp
 * @params option:  { width: number, height: number } Screenshot width and height, if not set, use the width and height of the cloud application window
 * @return { data: any, base64: base64string } Return the passed data and the captured base64 string
 */
captrueFrame(data: any, option?: { width: number; height: number;})

/**
 * Set whether to force landscape display content.
 * handelRootElementSize must be set to true to be effective.
 * Note that in forced landscape mode, the coordinate system xy of the webpage is opposite to the visual, if input events are input through external input. Pay attention to adjustment
 * @param force Whether to force landscape
 */
setMobileForceLandScape(force: boolean): void;
/**
 * Remove the rendering component from the DOM, note that after the rendering component is removed, it will not be possible to enter the application again, all states will be invalid, and cannot be restored, only new LarkSR can be used
 */
destroy(): void;
```
