import 'core-js/stable/symbol';
import { Joystick, KJoystickEvents, KJoystickSubTypes } from './joystick';
import type { IJoystickConfig } from './joystick';
import Log from './utils/log';
import Unit from './utils/unit';
import Capabilities from './utils/capabilities';
declare const _default: {
    Joystick: typeof Joystick;
    Log: typeof Log;
    Unit: typeof Unit;
    Capabilities: typeof Capabilities;
    KJoystickEvents: typeof KJoystickEvents;
    KJoystickSubTypes: typeof KJoystickSubTypes;
};
export default _default;
export { IJoystickConfig, };
