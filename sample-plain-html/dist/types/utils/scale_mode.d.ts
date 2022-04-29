export default class ScaleMode {
    /**
     * fit模式，完整的显示内容，如果太大就缩小至合适的大小
     */
    static FIT_SCREEN: string;
    /**
     * 以视频的宽高为基准缩放
     */
    static CONTAIN_VIDEO: string;
    /**
     * 以应用原始尺寸的缩放.
     */
    static CONTAIN_APP: string;
    /**
     * 裁剪模式，完全填充屏幕但保留宽高比
     */
    static FILL_CLIP: string;
    /**
     * 拉伸模式，完全填充屏幕但不保留宽高比
     */
    static FILL_STRETCH: string;
    /**
     * offset 控制条的高度
     */
    static OFFSET: number;
}
