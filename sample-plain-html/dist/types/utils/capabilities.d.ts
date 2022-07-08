declare class Capabilities {
    /**
     * @private
     */
    static $language: string;
    /**
     * @language zh_CN
     * 表示运行内容的系统的语言代码。语言指定为 ISO 639-1 中的小写双字母语言代码。
     * 对于中文，另外使用 ISO 3166 中的大写双字母国家/地区代码，以区分简体中文和繁体中文。<br/>
     * 以下是可能但不限于的语言和值：
     * <ul>
     * <li>简体中文  zh-CN</li>
     * <li>繁体中文  zh-TW</li>
     * <li>英语      en</li>
     * <li>日语      ja</li>
     * <li>韩语      ko</li>
     * </ul>
     */
    static get language(): string;
    /**
     * @private
     */
    static $isMobile: boolean;
    /**
     * 表示程序内容是否运行在移动设备中（例如移动电话或平板电脑）。
     */
    static get isMobile(): boolean;
    static $isWeChat: boolean;
    static get isWeChat(): boolean;
    static $isQQ: boolean;
    static get isQQ(): boolean;
    static $isHuawei: boolean;
    static get isHuawei(): boolean;
    /**
     * @private
     */
    static $os: string;
    /**
     * @language zh_CN
     * 指示当前的操作系统。os 属性返回下列字符串：
     * <ul>
     * <li>苹果手机操作系统     "iOS"</li>
     * <li>安卓手机操作系统     "Android"</li>
     * <li>微软手机操作系统     "Windows Phone"</li>
     * <li>微软桌面操作系统     "Windows PC"</li>
     * <li>苹果桌面操作系统     "Mac OS"</li>
     * <li>未知操作系统        "Unknown"</li>
     * </ul>
     */
    static get os(): string;
    static $isIOSSafari: boolean;
    static get isIOSSafari(): boolean;
}
export default Capabilities;
