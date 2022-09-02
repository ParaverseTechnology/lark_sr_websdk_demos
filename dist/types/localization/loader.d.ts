import Message from './message';
import GestureIns from './gesture_ins';
import UI from './ui';
export default class LocalizationLoader {
    private static mLanguageCode;
    private static mMessage;
    private static mGestureIns;
    private static mUI;
    static getPrePath(): string;
    static init(code: string): void;
    static get message(): Message;
    static get gestureIns(): GestureIns;
    static get ui(): UI;
}
