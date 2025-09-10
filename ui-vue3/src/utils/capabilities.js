class Capabilities {
    /**
     * @private
     */
    static $language = 'zh-CN';
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
    static get language() {
        return Capabilities.$language;
    }
    /**
     * @private
     */
    static $isMobile;
    /**
     * 表示程序内容是否运行在移动设备中（例如移动电话或平板电脑）。
     */
    static get isMobile() {
        return Capabilities.$isMobile;
    }
    static $isWeChat;

    static get isWeChat() {
        return Capabilities.$isWeChat;
    }
    static $isHuawei
    static get isHuawei() {
        return Capabilities.$isHuawei;
    }
    /**
     * @private
     */
    static $os = 'Unknown';
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
    static get os() {
        return Capabilities.$os;
    }
}

/**
 * @private
 */
const testDeviceType = function() {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile = ua.indexOf('mobile') !== -1;
    const isAndroid = ua.indexOf('android') !== -1;
    // ipad/iphone safari 开启桌面浏览
    // mozilla/5.0(macintosh;inter mac osx 10_15_4) applewebkit/605.1.15(khtml,like gecko) version
    // /13.1 safari/605.1.15
    // 参考 1. https://blog.csdn.net/weixin_30336075/article/details/112163854
    // 参考 2. https://blog.csdn.net/joyce_lcy/article/details/103315537
    // 判断 gpu 类型
    //  (function () {
    //    var canvas = document.createElement('canvas'),
    //        gl = canvas.getContext('experimental-webgl'),
    //        debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    //
    //    console.log(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
    // })(); 
    const hasTouch = 'ontouchend' in document;
    const isSafari = ua.indexOf("safari") != -1 && ua.indexOf("version") != -1;
    const isIphone = ua.indexOf("iphone") != -1;
    const isIpad = ua.indexOf("ipad") != -1;
    return isMobile || isAndroid || (isSafari && hasTouch) || isIphone || isIpad;
};
const testOSType = function() {
    const u = navigator.userAgent; 
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        return 'Android';
    } else if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || (u.indexOf('Safari') != -1 && u.indexOf("Version") != -1 && 'ontouchend' in document)) {
        return 'iOS';
    } else if (u.match(/macintosh|mac os x/i)) {
        return 'Mac OS';
    } else if (u.match(/windows|win32/i)) {
        return 'Windows PC';
    } else {
        return 'PC';
    }
};

const testWeChat = function () {
    return (/micromessenger/i).test(navigator.userAgent);
};

const testHuawei = function() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('huaweibrowser') > -1;
}

Capabilities.$os = testOSType();
Capabilities.$isMobile = testDeviceType();
Capabilities.$isWeChat = testWeChat();
Capabilities.$isHuawei = testHuawei();

export default Capabilities;