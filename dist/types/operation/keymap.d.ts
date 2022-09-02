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
export interface IVirtualKey {
    scancode: number;
    vkey: number;
    unicode: number;
}
export declare class VirtualKey implements IVirtualKey {
    scancode: number;
    vkey: number;
    unicode: number;
}
export declare type VritualKeyMapOptions = {
    [key: string]: VirtualKey;
};
export declare const KEYMAP: VritualKeyMapOptions;
