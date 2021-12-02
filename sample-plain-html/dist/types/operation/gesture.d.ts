import { EventBase, LocalEvent } from '../event/event_base';
import { Point, Vector } from '../common/interface';
export declare const enum GESTRUE_EVENT_TYPE {
    GESTURE = 0
}
export interface GestureEvent extends LocalEvent<GESTRUE_EVENT_TYPE> {
    gestrueType: GESTURE_TYPE;
    position: Point;
    motion: Vector;
    distance: number;
}
export declare const enum GESTURE_TYPE {
    SINGLE_FINGER_TOUCH_START = 1,
    SINGLE_FINGER_TAP = 2,
    SINGLE_FINGER_TAP_DOWN = 3,
    SINGLE_FINGER_TAP_UP = 4,
    SINGLE_FINGER_SWIPE = 5,
    SINGLE_FINGER_SWIPE_START = 6,
    SINGLE_FINGER_SWIPE_END = 7,
    DOUBLE_FINGER_TAP = 8,
    DOUBLE_FINGER_TAP_DOWN = 9,
    DOUBLE_FINGER_TAP_UP = 10,
    DOUBLE_FINGER_SWIPE = 11,
    DOUBLE_FINGER_SWIPE_START = 12,
    DOUBLE_FINGER_SWIPE_END = 13,
    DOUBLE_FINGER_EXPAND = 14,
    DOUBLE_FINGER_SHRINK = 15,
    DOUBLE_FINGER_SPIN = 16,
    TRIPLE_FINGER_TAP = 17,
    TRIPLE_FINGER_TAP_DOWN = 18,
    TRIPLE_FINGER_TAP_UP = 19,
    TRIPLE_FINGER_SWIPE = 20,
    TRIPLE_FINGER_SWIPE_START = 21,
    TRIPLE_FINGER_SWIPE_END = 22,
    RELEASE = 23,
    NONE = 24,
    TEST = 25
}
export default class Gesture extends EventBase<GESTRUE_EVENT_TYPE, GestureEvent> {
    private root;
    private touchStatus;
    private touchStartTime;
    private touchStartPoints;
    private touchChangedPoins;
    private tapStart;
    private tapLimit;
    private lastTap;
    private tapPressTimeout;
    private touchMoveList;
    private lastMidPoint;
    constructor(root?: HTMLElement);
    startListening(): void;
    stopListening(): void;
    private createGestureEvent;
    /**
     *  0ms----------------------->start touch
     *  touchend------------------>touch tap
     *  200ms--------------------->touch tap down
     *  touchend------------------>touch tap up
     */
    private onTouch;
    private multiFingerGesture;
    private checkTouchPointMove;
    private getTouchStartPointsFromNativeEvent;
    private getTouchChangedPoinsFromNativeEvent;
    private releaseTouchTap;
    private initTouchStatus;
    private singlePointRelativePosition;
    private multiPointRelativePosition;
}
