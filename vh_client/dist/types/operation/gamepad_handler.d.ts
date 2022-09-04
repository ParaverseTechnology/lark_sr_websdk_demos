import Operation from './operation';
import HandlerBase from './handler_base';
export declare const JOYSTICK_AXIS_MAX = 32767;
export declare const JOYSTICK_AXIS_MIN = -32767;
export declare const JOYSTICK_TRIGGER_MAX = 255;
export declare const JOYSTICK_TRIGGER_MIN = 0;
export declare const enum GAMEPAD_BUTTONS {
    GAMEPAD_A = 0,
    GAMEPAD_B = 1,
    GAMEPAD_X = 2,
    GAMEPAD_Y = 3,
    GAMEPAD_LEFT_SHOULDER = 4,
    GAMEPAD_RIGHT_SHOULDER = 5,
    GAMEPAD_LEFT_TRIGGER = 6,
    GAMEPAD_RIGHT_TRIGGER = 7,
    GAMEPAD_BACK = 8,
    GAMEPAD_START = 9,
    GAMEPAD_LEFT_THUMB = 10,
    GAMEPAD_RIGHT_THUMB = 11,
    GAMEPAD_DPAD_UP = 12,
    GAMEPAD_DPAD_DOWN = 13,
    GAMEPAD_DPAD_LEFT = 14,
    GAMEPAD_DPAD_RIGHT = 15,
    UNKNOWN = -1
}
export declare const enum XINPUT_BUTTONS {
    XINPUT_GAMEPAD_DPAD_UP = 1,
    XINPUT_GAMEPAD_DPAD_DOWN = 2,
    XINPUT_GAMEPAD_DPAD_LEFT = 4,
    XINPUT_GAMEPAD_DPAD_RIGHT = 8,
    XINPUT_GAMEPAD_START = 16,
    XINPUT_GAMEPAD_BACK = 32,
    XINPUT_GAMEPAD_LEFT_THUMB = 64,
    XINPUT_GAMEPAD_RIGHT_THUMB = 128,
    XINPUT_GAMEPAD_LEFT_SHOULDER = 256,
    XINPUT_GAMEPAD_RIGHT_SHOULDER = 512,
    XINPUT_GAMEPAD_A = 4096,
    XINPUT_GAMEPAD_B = 8192,
    XINPUT_GAMEPAD_X = 16384,
    XINPUT_GAMEPAD_Y = 32768,
    XINPUT_UNKNOWN = -1
}
export declare const XinputMap: {
    [key: number]: XINPUT_BUTTONS;
};
export default class GamepadHandler extends HandlerBase {
    private scanTimer;
    private gamepads;
    private deviceIndexMap;
    private lastGamepadState;
    private pause;
    constructor(op: Operation);
    startListening(): void;
    stopListening(): void;
    private scanGamepads;
    private connectHandler;
    private disconnectHandler;
    private addGamepad;
    private removeGamepad;
    private updateStatus;
    private onButtonDown;
    private onButtonUp;
    private onAxes;
    private onWindowBlur;
    private onWindowFocus;
    private onWindowVisibilityChange;
}
