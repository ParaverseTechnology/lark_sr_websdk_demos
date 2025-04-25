# LarkSR Object Member Variables

LarkSR object member variables. Note that variables starting with an underscore are internal private variables or read-only member variables and are not recommended for direct modification or use.

> In the following code, `larksr` is an instance of the created LarkSR object. The creation process is omitted.

```javascript
let larksr;

// ... create code.
```

## Video Component

1. `videoComponent` Video Component

```javascript
// Get the <video /> video element being played
larksr.videoComponent.getVideo();
// Play the video, async method throws an exception if playback fails
larksr.videoComponent.playVideo();
// Stop video playback
larksr.videoComponent.stopVideo();
// Play video sound, unmute playback
larksr.videoComponent.sountPlayout();
// Capture a frame, return base64, and throw a screenshot success event
larksr.videoComponent.captrueFrame(data);
```

2. videoElement HTML video video element itself

```javascript
larksr.videoElement;
```

3. Control Display Elements

```javascript
// Whether to show touch points on mobile
larksr.isEnableTouchPoint = false;
// Whether to show bottom text during loading screen
larksr.isEnableLoadingStateBar = false;
```

```javascript
// Set zoom mode
larksr.scaleMode = ScaleMode.CONTAIN_APP;
```

4. Virtual Mouse and Touch Points

```javascript
/**
 * Current position of the virtual mouse, relative to the overall container
 */
larksr.virtualCursorPosition
/**
 * Current position of the virtual mouse, internal zoom container, same as the actual display virtual mouse CSS style
 */
larksr.virtualCursorPositionRaw
```

Example:

The following example code uses React to demonstrate clicking a button to synchronize the position of an outer element and the virtual mouse.

```javascript
// ....
// Omitted React creation code
export default class App extends React.Component {
    private state: any = {
        pointPosition: {
            x: 0,
            y: 0,
        }
    };
    // ....
    // Omitted larksr creation process and other code
    render() {
        return (
            <div>
                // ...
                // Omitted other elements
                <div style={{
                        zIndex: 1000,
                        position: 'absolute', 
                        left: this.state.pointPosition.x, 
                        top: this.state.pointPosition.y,
                        backgroundColor: "red",
                        width: 50,
                        height: 50,
                        borderRadius: "50%"
                    }}>
                </div>
                <button style={{pointerEvents: "all"}} 
                    onClick={()=>{
                        // Get the position of the virtual mouse
                        console.log("touch point", this.larksr.virtualCursorPosition);
                        // Synchronize the position of the virtual mouse
                        this.setState({
                            pointPosition: this.larksr.virtualCursorPosition,
                        })
                    }}
                    >
                    touchPoint
                </button>
            </div>
        )
    }
}
```

## Configuration Parameters

```javascript
// `config` ILarkSRConfig object passed in IAppliParams
larksr.config;
// `params` IAppliParams object passed in the constructor
larksr.params;
```

## User Mode

```javascript
// `playerModeType` Current player mode;
larksr.playerModeType;
// `userType` Current user type;
larksr.userType;
// Whether it is currently in interactive mode, the default interactive mode is operable
larksr.isInteractiveMode;
// Whether it is observer mode
larksr.isObMode;
```

## Current App State

```javascript
larksr.appState;
```

Specific state values are as follows:

```javascript
export enum APP_STATE {
    BEFORE_CREATE = 0,
    INITED,
    WEBSOCKET_CHANNEL_OPEN,
    LOGIN_SUCCESS,
    RTC_CONNECTED,
    MEDIA_LOADED,
    MEDIA_PLAED,
    RTC_RETRY,
    APP_RETRY,
    BEFORE_DESTORY,
    WEBSOCKET_CLOSED,
    RTC_CLOSED,
    DESTROYED,
}
```

You can listen to the APP_STATE changes through the event APPSTATE_CHANGE = 'appstatechange'.

```javascript
// create code
...

// Listen to the connection success event
larksr.on('appstatechange', function(e) { 
    console.log("appstatechange", e); 
});
```

## Whether the Cloud Screen is Ready

```javascript
// Whether the cloud screen is ready, input events can only be sent after it is ready
larksr.remoteScreenReady
```

## Current Screen State

```javascript
// Notify viewport change or need to recalculate display properties
larksr.screenState.resize();
// Current size of the cloud app
larksr.screenState.appSize;
// Current mouse state of the cloud app
larksr.screenState.appMouseMode;
// Current size of the rendering container
larksr.screenState.viewPort;
// Force landscape mode
larksr.screenState.screenOrientation;
// Zoom mode
larksr.screenState.scaleMode;
// Whether it is in full screen mode
larksr.screenState.isFullScreen;
// Whether the mouse state is locked
larksr.screenState.isLockMouse;
// Mouse style of the cloud app
larksr.screenState.cursorStyle;
// Initialize mouse mode
larksr.screenState.initCursorMode;
// Whether it is mobile mode
larksr.screenState.isMobile;
// Whether to render the local mouse
larksr.screenState.isLocalRenderMouse;
// Whether to lock the mouse
larksr.screenState.isLockMosue;
```

Listen to the state changes of screenState, the event code is 0. It is called after screenState.resize() is triggered internally or externally by the SDK.

```javascript
larksr.screenState.on(0, () => {
    console.log("screen state resize", larksr.screenState.screenOrientation);
});
```

## Operation Class Instances

```javascript
// Start listening, automatically starts by default
larksr.op.startListening();
// Stop listening to input events.
larksr.op.stopListenling();
// Enable or disable mouse input events
larksr.op.setMouseEnable(enable: boolean);
// Enable or disable keyboard input events
larksr.op.setKeyboardEnable(enable: boolean);
// Enable or disable gamepad input events
larksr.op.setGamepadEnable(enable: boolean);
// Enable or disable touch screen input events
larksr.op.setTouchEnable(enable: boolean);
```

### Keyboard Handler in Operation Class

```javascript
// Set the default interception of keyboard events to prevent the default behavior of the browser.
// The keys in preventKeys will be intercepted, if the array is empty, all will be intercepted
// Default interception F1 F5 F12
larksr.op.keyboardHandler.preventKeys = [["F1", "F5", "F12"]];
```

### Gesture Handler in Operation Class

gestureHandler handles the process of converting mobile touch events to mouse events.

#### Adjust Touch Event Trigger Parameters

```javascript
// The speed of the mouse relative movement provided when the touch event is converted to a mouse event.
// That is, rx = (pxNew-pxOld) * relativeMouseMoveSpeed
//        ry = (pyNew-pyOld) * relativeMouseMoveSpeed
// May affect the effect of cloud applications that use relative movement (rawInput) judgment
larksr.op.gestureHandler.relativeMouseMoveSpeed = 2;
// The judgment range for simulating clicks when touch events are converted to mouse events.
// Actual mouse events generally do not move when clicked, but touch operations will almost certainly trigger move events
// If you want to simulate click events on a PC, such as single or double clicks, no mouse move should be inserted between mouse down and up
// When a move event is triggered, a move event is sent only if it exceeds this judgment range.
// Note that modifying this value may cause single or double click failures on cloud applications, but it generally has little impact if the cloud application does not include similar operations
larksr.op.gestureHandler.tapLimitRadius = 20;
// Attempts to send a single click down event within this time range, modifying this value may affect the success rate of triggering single click events
larksr.op.gestureHandler.tapLimitTimeout = 100;
```

#### Intercept Touch Event Callback

You can set the specific correspondence between touch events and mouse events by intercepting the touch event callback.

> Set the callback function through larksr.op.gestureHandler.gestureCallback The GESTURE_TYPE in the example below is the gesture event type exported by the SDK. If the SDK is introduced in amd mode, all exported types are under the larksr_websdk global object. If the SDK is introduced in other ways, such as importing import { GESTURE_TYPE } from 'larksr_websdk' The following example code omits the larksr creation process and other code

```javascript
// The event parameter has the following fields
// event : {
//      type: GESTURE_TYPE; Gesture event type
//      x: number;          Converted to cloud coordinate x
//      y: number;          Converted to cloud coordinate y
//      rx: number;         Converted to cloud coordinate rx
//      ry: number;         Converted to cloud coordinate ry
//      edge: boolean;      Whether it reaches the touch edge
//      rawEvent: any;      Touch event not converted to cloud coordinates
//    }
// 
larksr.op.gestureHandler.gestureCallback = (event) => {
    console.log(event);
    const p = event;
    switch (event.type) {
    // Single touch starts moving the mouse to the current position
    case GESTURE_TYPE.SINGLE_FINGER_TOUCH_START:
        larksr.mouseMove(p.x, p.y, p.rx, p.ry);
        break;
    // Single finger tap -> left mouse click
    case GESTURE_TYPE.SINGLE_FINGER_TAP:
        larksr.mouseTap(p.x, p.y, CloudLark.MouseKey.LEFT);
        break;
    // Single finger tap down -> move mouse, press mouse
    case GESTURE_TYPE.SINGLE_FINGER_TAP_DOWN:
        // move mouse first
        larksr.mouseMove(p.x, p.y, p.rx, p.ry);
        // sync tap down
        larksr.mouseDown(p.x, p.y, CloudLark.MouseKey.LEFT);
        break;
    // Single finger tap up -> move mouse, release mouse
    case GESTURE_TYPE.SINGLE_FINGER_TAP_UP:
        // move mouse first
        larksr.moseMove(p.x, p.y, p.rx, p.ry);
        // sync tap down
        larksr.mouseUp(p.x, p.y, CloudLark.MouseKey.LEFT);
        break;
    // Single finger swipe -> move mouse
    case GESTURE_TYPE.SINGLE_FINGER_SWIPE:
        larksr.moseMove(p.x, p.y, p.rx, p.ry);
        break;
    // Single finger swipe start -> left mouse button down
    case GESTURE_TYPE.SINGLE_FINGER_SWIPE_START:
        // sync tap down
        larksr.mouseDown(p.x, p.y, CloudLark.MouseKey.LEFT);
        break;
    // Single finger swipe end -> left mouse button up
    case GESTURE_TYPE.SINGLE_FINGER_SWIPE_END:
        larksr.mouseUp(p.x, p.y, CloudLark.MouseKey.LEFT);
        break;
    // Double finger tap -> right mouse click
    case GESTURE_TYPE.DOUBLE_FINGER_TAP:
        larksr.mouseTap(p.x, p.y, CloudLark.MouseKey.RIGHT);
        break;
    // Double finger tap down -> move mouse
    case GESTURE_TYPE.DOUBLE_FINGER_TAP_DOWN:
        // move mouse first
        larksr.moseMove(p.x, p.y, p.rx, p.ry);
        // sync tap down
        larksr.mouseDown(p.x, p.y, CloudLark.MouseKey.RIGHT);
        break;
    case GESTURE_TYPE.DOUBLE_FINGER_TAP_UP:
        // move mouse first
        larksr.moseMove(p.x, p.y, p.rx, p.ry);
        // sync tap up
        larksr.mouseUp(p.x, p.y, CloudLark.MouseKey.RIGHT);
        break;
    // Double finger swipe -> scroll wheel
    case GESTURE_TYPE.DOUBLE_FINGER_SWIPE:
        // move mouse mid
        // this.$emitMouseWheel(p.x, p.y, e.motion.y);
        larksr.moseMove(p.x, p.y, p.rx, p.ry);
        break;
    case GESTURE_TYPE.DOUBLE_FINGER_EXPAND: 
        // Windows message deltaY up is +120 down is -120
        // Double finger expand swipe outwards
        // Scroll wheel down
        // move mouse mid
        larksr.mouseWheel(p.x, p.y, 120);
        break;
    case GESTURE_TYPE.DOUBLE_FINGER_SHRINK:
        // Windows message deltaY up is +120 down is -120
        // Double finger swipe inwards
        // Scroll wheel up
        larksr.mouseWheel(p.x, p.y,  -120);
        break;
    case GESTURE_TYPE.DOUBLE_FINGER_SWIPE_END:
        // sync tap up
        larksr.mouseUp(p.x, p.y, CloudLark.MouseKey.RIGHT);
        break;
    // Triple finger tap -> middle mouse click
    case GESTURE_TYPE.TRIPLE_FINGER_TAP:
        larksr.mouseTap(p.x, p.y, CloudLark.MouseKey.MIDDLE);
        break;
    // Triple finger swipe -> move mouse
    case GESTURE_TYPE.TRIPLE_FINGER_SWIPE:
        larksr.mouseMove(p.x, p.y, p.rx, p.ry);
        break;
    // Triple finger swipe start -> middle mouse button down
    case GESTURE_TYPE.TRIPLE_FINGER_SWIPE_START:
        larksr.mouseMove(p.x, p.y, p.rx, p.ry);
        //
        larksr.mouseDown(p.x, p.y, CloudLark.MouseKey.MIDDLE);
        break;
    // Triple finger swipe end -> middle mouse button up
    case GESTURE_TYPE.TRIPLE_FINGER_SWIPE_END:
        // sync tap up
        larksr.mouseUp(p.x, p.y, CloudLark.MouseKey.MIDDLE);
        break;
    // All fingers up
    case GESTURE_TYPE.RELEASE:
        break;
    default:
        break;
    }
};
```

## Full Screen and Lock Screen

```javascript
// Enter full screen mode
larksr.fullScreen.launchFullScreen();
// Exit full screen mode
larksr.fullScreen.exitFullscreen();
// Lock the mouse
larksr.lockPointer.lockPointer();
// Release the mouse
larksr.lockPointer.exitPointerLock();
```
