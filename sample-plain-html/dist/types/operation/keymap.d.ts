/**
 * keymap
 * scancode 扫描码
 * vkey 虚拟键
 * unicode unicode
 *
 * 108 键键盘 没有 win 键
 * TODO fix：atl + tab, f5,ctr,bug
 * REMOVE F11
 */
interface Key {
    scancode: number;
    vkey: number;
    unicode: number;
}
declare type tplotOptions = {
    [key: string]: Key;
};
export declare const KEYMAP: tplotOptions;
export {};
