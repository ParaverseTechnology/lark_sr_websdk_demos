# LarkSR Object Parameters

The parameters for creating a LarkSR object are as follows:

```typescript
/**
 * LarkSR Configuration Interface
 */
interface ILarkSRConfig {
    /**
     * Required. Root element. The component will be mounted under the root element.
     * Note: *Do not* set it to document.documentElement.
     * In default mode, the root element will be rotated to enforce landscape mode.
     * @see handleRootElementSize
     * @see scaleMode
     */
    rootElement: HTMLElement;
    /**
     * Optional. Server address. The address for accessing the LarkServer frontend.
     * Example: http://192.168.0.55:8181/
     * When using managed services, the server address is automatically assigned and can be left empty.
     * When using managed services, @see CreateLarkSRClientFromePXYHost @see larksr.connectWithPxyHost
     */
    serverAddress?: string;
    /**
     * Optional. SDK authorization code. If not provided here, it must be initialized in the instance later by calling initSDKAuthCode.
     */
    authCode?: string;
    /**
     * Optional. Whether the authorization is successful.
     * @deprecated This parameter is currently not called back. If SDK verification fails, it will return a failure in connect.
     */
    authCodeCallback?: (isSuccess: boolean, e: any) => void;
    /**
     * Optional. Background image URL during loading.
     */
    loadingBgUrl?: string;
    /**
     * Optional. Whether to synchronize the size style of the root component.
     * Enabled by default, setting the root component size to the browser viewport size.
     * If disabled, the internal components will be displayed according to the size of the passed root element.
     * Note: When disabled, the root element will not be automatically filled. If the root element height is 0, it will not be displayed.
     * Note: When disabled, mobileForceLandscape will lose its effect.
     */
    handleRootElementSize?: boolean;
    /**
     * Same as handleRootElementSize.
     */
    handelRootElementSize?: boolean;
    /**
     * Whether to only set the rotation of the root component. Only effective when handleRootElementSize is true. Sets the rotation of the root component for mobileForceLandscape mode.
     * Default is false. In this case, the SDK will set the width, height, margin 0, and padding 0 of the root component.
     * When true and handleRootElementSize is also true, only the rotation attribute of the root component is set, used for forced landscape mode and switching between forced landscape and portrait modes.
     * Note: When onlyHandleRootElementTransform is successfully enabled, ensure the size of the root element and call the resize method to notify the update of the root element size when the root element changes.
     */
    onlyHandleRootElementTransform?: boolean;
    /**
     * Whether to listen to mouse, keyboard, and other input events within the SDK.
     * If disabled, input events need to be sent manually.
     * Note: When disabled, full-screen mode and lock mode will be invalid and need to be triggered externally.
     * @see fullScreenMode
     */
    handlInput?: boolean;
    /**
     * Whether to attempt muted playback when video autoplay fails. An event will be thrown when muted playback occurs.
     * When the user interacts with the screen during muted playback, it will attempt to play sound.
     */
    mutePlayWhenFailed?: boolean;
    /**
     * Optional. Whether it is a VR monitoring type.
     */
    isMonitor?: boolean;
    /**
     * Optional. Bitrate.
     */
    codeRate?: number;
    /**
     * Optional. Frame rate.
     */
    frameRate?: number;
    /**
     * Optional. Audio frame rate.
     */
    audioCodeRate?: number;
    /**
     * Optional. Log level. Default is warn.
     */
    logLevel?: 'info' | 'warn' | 'error';
    /**
     * Optional. Loading timeout. Default is 60s. Loading stops after this time.
     */
    loadingTimeout?: number;
    /**
     * Optional. Whether to automatically synchronize clipboard data.
     */
    syncLocalToCloudClipboard?: boolean;
    /**
     * Optional. Preferred video codec format.
     */
    preferDecoder?: 'auto' | 'vp8' | 'vp9' | 'h264' | 'h265' | 'hevc' | 'av1x';
    /**
     * Optional. Video scaling mode within the container.
     * ScaleMode: 'contain' | 'fill_clip' | 'fill_stretch'
     * contain: Scales with the original size of the application.
     * fill_clip: Crop mode, fully fills the screen while maintaining aspect ratio.
     * fill_stretch: Stretch mode, fully fills the screen without maintaining aspect ratio.
     * Corresponds to the initial display mode in the backend application management -> application editing -> general advanced settings. This configuration has a higher priority than the backend configuration.
     */
    scaleMode?: ScaleMode;
    /**
     * Full-screen mode.
     *  0 -》 Manually triggered by the user.
     *  1 -》 Triggered on the first click.
     *  2 -》 Triggered on every click.
     * Corresponds to the full-screen mode in the backend application management -> application editing -> general advanced settings. This configuration has a higher priority than the backend configuration.
     */
    fullScreenMode?: number;
    /**
     * Optional. Full-screen mode on mobile devices, same values as fullScreenMode.
     * Corresponds to the full-screen mode in the backend application management -> application editing -> mobile advanced settings. This configuration has a higher priority than the backend configuration.
     */
    mobileFullScreenMode?: number;
    /**
     * Optional. Whether to force landscape mode on mobile devices.
     * Corresponds to whether to force landscape mode on mobile devices in the backend application management -> application editing -> mobile advanced settings. This configuration has a higher priority than the backend configuration.
     */
    mobileForceLandscape?: boolean;
    /**
     * Optional.
     * Initial mouse mode, 0 for automatic detection, 1 for locked, 2 for unlocked.
     * Corresponds to the initial mouse mode in the backend application management -> application editing -> general advanced settings. This configuration has a higher priority than the backend configuration.
     */
    initCursorMode?: boolean;
    /**
     * Optional.
     * External port mapping of the rendering server.
     * Format: key=[Rendering Server IP:PORT] value=[External IP:PORT]
     * {
     *    "RENDER-A-IP:RENDER-A-PORT1": "PUBLIC-A-IP:PORT1",
     *    "RENDER-B-IP:RENDER-B-PORT1": "PUBLIC-A-IP:PORT2",
     *    "RENDER-C-IP:RENDER-C-PORT1": "PUBLIC-A-IP:PORT3",
     *    "RENDER-D-IP:RENDER-D-PORT1": "PUBLIC-B-IP:PORT1",
     *    "RENDER-E-IP:RENDER-E-PORT1": "PUBLIC-B-IP:PORT2",
     *    "RENDER-E-IP:RENDER-E-PORT2": "PUBLIC-C-IP:PORT1",
     * }
     */
    publicPortMapping?: PublicPortMapping;
    /**
     * Optional.
     * Whether to prompt for text input APP_REQUEST_INPUT.
     * When the server detects an input method event, an event will be thrown. You can add an input box on the web layer and use inputText to send text to the cloud.
     * Enabled by default. When manually disabled, the APP_REQUEST_INPUT event will not be thrown.
     */
    textInputEventPrompt?: boolean;
    /**
     * Optional.
     * Whether to automatically connect to audio devices when the audio input feature is enabled.
     * Disabled by default.
     * Note that the default audio device of the system is enabled by default.
     */
    audioInputAutoStart?: boolean;
    /**
     * Optional.
     * Whether to automatically connect to video devices when the video input feature is enabled.
     * Disabled by default.
     * Note that the default video device of the system is enabled by default.
     */
    videoInputAutoStart?: boolean;
    /**
     * Optional.
     * mouseZoomDirection
     * Used for the correspondence between pinch zoom operations on mobile devices and application mouse zoom.
     * 1: Mouse wheel up to zoom in,
     * 0: Mouse wheel down to zoom in (default).
     */
    mouseZoomDirection?: number;
    /**
     * Optional.
     * Touch operation mode, whether the touch operation on mobile devices corresponds to the touch screen or mouse on the cloud.
     * 'touchScreen' | 'mouse'
     * Touch operation mode, corresponds to the touch operation mode in the backend application management -> application editing -> mobile advanced settings. This configuration has a higher priority than the backend configuration.
     */
    touchOperateMode?: 'touchScreen' | 'mouse';
    /**
     * Optional.
     * Prefer to use the external IP for peer-to-peer connection of the rendering server.
     * If configured, it will override the preferPublicIp parameter set in the backend.
     */
    preferPublicIp?: string;
    /**
     * Optional.
     * Whether to autoplay. Enabled by default.
     * If disabled, there will be a prompt UI after a successful connection, and the user needs to trigger it manually.
     * Enabling autoplay does not guarantee that all browsers will autoplay successfully. When playback fails or the browser does not support autoplay,
     * a play button will be displayed, and the user needs to click the play button to play manually.
     */
    autoPlay?: boolean;
    /**
     * Optional.
     * Whether to display the play button in case of playback failure or manual playback mode.
     * Enabled by default. Note that if disabled, you need to add prompts or UI to guide the user to click play.
     * In the UI, the user needs to trigger larksr.videoComponent.playVideo();
     */
    showPlayButton?: boolean;
    /**
     * Optional.
     * Language settings, currently only supports Chinese and English, default is Chinese.
     * zh-CN for Chinese, en for English.
     */
    language?: string;
    /**
     * Timeout for receiving video streams or successful playback after a successful peer-to-peer connection. In autoplay mode, a prompt button will pop up after the timeout.
     * Default is 20s.
     */
    playTimeout?: number;
    /**
     * Whether to use the new camera/microphone protocol.
     * Separate upload process requires rendering server version greater than 3290.
     */
    useSeparateMediaSharePeer?: boolean;
    /**
     * Whether to enable canvas rendering. Disabled by default.
     * Note that enabling canvas on mobile devices will consume additional performance.
     * Known issue: On iOS, when canvas mode is disabled, the stretch mode that ignores the aspect ratio is invalid.
     */
    enableCanvasRender?: boolean;
}
```
