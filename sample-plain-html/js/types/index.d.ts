import 'core-js/stable/symbol';
import './components/keyboard/js/simple-input-method';
import { Joystick, KJoystickEvents, KJoystickSubTypes } from './joystick';
import { Keyboard } from './keyboard';
import type { IJoystickConfig } from './joystick';
import Log from './utils/log';
import Unit from './utils/unit';
import Capabilities from './utils/capabilities';
declare const _default: {
    Joystick: typeof Joystick;
    Keyboard: typeof Keyboard;
    Log: typeof Log;
    Unit: typeof Unit;
    Capabilities: typeof Capabilities;
    KJoystickEvents: typeof KJoystickEvents;
    KJoystickSubTypes: typeof KJoystickSubTypes;
};
export default _default;
export { IJoystickConfig, };
