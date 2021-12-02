import { GestureEvent } from './gesture';
import ScreenState from '../screen_state';
export declare function getTouchPosition(event: GestureEvent, isOpposite: boolean | undefined, screenState: ScreenState): {
    x: number;
    y: number;
    rx: number;
    ry: number;
    edge: boolean;
};
/**
 * 获取虚拟鼠标相对位置
 */
export declare function getVMouseTouchPosition(data: GestureEvent, screenState: ScreenState): {
    x: number;
    y: number;
    rx: number;
    ry: number;
} | null;
