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
     * 如果太大出现滚动条
     */
    static SCROLL_AUTO: string;
    /**
     * 水平方向出现滚动条，垂直方向填充满
     */
    static SCROLL_X_FILL_Y: string;
    /**
     * 水平方向出现滚动条，垂直方向填裁剪
     */
    static SCROLL_X_CLIP_Y: string;
    /**
     * 水平方向出现滚动条，垂直方向不放大,不出现滚动条
     */
    static SCROLL_X_CONTAIN_Y: string;
    /**
     * 水平方向出现滚动条，垂直填满，如果超出出现滚动条
     */
    static SCROLL_X_OVERFLOW_SCROLL_FILL_Y: string;
    /**
     * 水平方向出现滚动条，垂直填满,缩放水平方向保持宽高比
     */
    static SCROLL_X_FILL_Y_ASPECT: string;
    /**
     * 水平方向填满，垂直方向出现滚动条
     */
    static SCROLL_Y_FILL_X: string;
    /**
     * 水平方向填裁剪, 垂直方向出现滚动条
     */
    static SCROLL_Y_CLIP_X: string;
    /**
     * 水平方向不放大,不出现滚动条，垂直方向出现滚动条
     */
    static SCROLL_Y_CONTAIN_X: string;
    /**
     * 水平填满，如果超出出现滚动条，垂直方向出现滚动条
     */
    static SCROLL_Y_OVERFLOW_SCROLL_FILL_X: string;
    /**
     * 水平方向填满(保持宽高比)，垂直方向出现滚动条
     */
    static SCROLL_Y_FILL_X_ASPECT: string;
    /**
     * offset 控制条的高度
     */
    static OFFSET: number;
}
