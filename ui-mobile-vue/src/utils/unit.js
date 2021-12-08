/**
 * Unit 类 常用单元函数
 */
export default class Unit {

    /*
     * 获取url参数
     * @param name 参数名称
     */
    static queryString(name/*: string*/)/*: string*/ {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        let str = window.location.search.substr(1);
        str = str.replace("/", "");
        // 查找 hash 路由例如 http://localhost:8080/#/debug?logLevel=info&appServer&192.168.0.223&appPort=10002&taskId=123456
        if (str === '') {
            const search = window.location.hash.substr(1).split("?");
            if (search && search.length > 1) {
                str = search[1];
            }
        } 
        const r = str.match(reg);
        if (r != null) {
            return encodeURI(r[2]);
        }
        return '';
    }
    /**
     * 深度拷贝对象,创建新对象
     * @param source 输入对象
     */
    static deepCopy(source) {
        const result = {};
        for (const key in source) {
            if (key) {
                result[key] = source[key];
            }
        } 
        return result; 
    }
    static deepCopyArray(source) {
        const result = []; 
        for (const i of source) {
            result.push(i);
        } 
        return result;
    }
    /**
     * 浏览器窗口大小相关
     */
    /**
     * 获取浏览器窗口大小
     * @returns { width: 窗口宽, height: 窗口高 }
     */
    static viewport()/*: ViewPort*/ {
        if (document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            };
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            };
        }
    }
    /**
     * 获取某元素距离文档的距离
     * @param element 元素对象
     * @returns 高度
     */
    static elementTop(element/*: HTMLElement*/)/*: number*/ {
        let actualTop = element.offsetTop;
        let current = element.offsetParent/* as HTMLElement*/;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent/* as HTMLElement*/;
        }
        return actualTop;
    }
    /**
     * 获取元素距离文档左侧的距离
     * @param element 元素对象
     * @returns 左侧距离
     */
    static elementLeft(element/*: HTMLElement*/)/*: number*/ {
        let actualLeft = element.offsetLeft;
        let current = element.offsetParent/* as HTMLElement*/;
        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent/* as HTMLElement*/;
        }
        return actualLeft;
    }
    /**
     * 获取元素相对文档位置
     * @param element 元素对象
     * @returns { offsetX:X, offsetY:Y }
     */
    static offsetViewport(element/*: HTMLElement*/)/*: OffsetView*/ {
        // x
        const x = Unit.elementLeft(element);
        // y
        const y = Unit.elementTop(element);
        
        const offsetX = x - window.pageXOffset;
        
        const offsetY = y - window.pageYOffset;

        return {
            offsetX: offsetX,
            offsetY: offsetY
        };
    }

    // /**
    //  * 获取 单触摸点/鼠标点击 相对元素的坐标
    //  */
    static singlePointRelativePosition(e/*: Touch|MouseEvent*/, element/*: HTMLElement*/)/*: Point*/ {
        const offset  = Unit.offsetViewport(element);
        return {
            x: e.clientX - offset.offsetX,
            y: e.clientY - offset.offsetY
        };
    }
    /**
     * 获取触摸点相对元素的坐标
     * @param {e} e 触摸回调事件
     * @param offset getOffsetViewport 获取的 offset 对象. {offsetX,offsetY}
     * @return res[] 包含多指操作触摸点的数组
     */
    static touchRelativePosition(e, offset/*: OffsetView*/)/*: Array<any>*/ {
        if (e.changedTouches.length > 0 && offset) {
            const res = [];
            for (const t in e.targetTouches) {
                if (t) {
                    res.push({
                        x: e.targetTouches[t].clientX - offset.offsetX,
                        y: e.targetTouches[t].clientY - offset.offsetY
                    });
                }
            }
            return res;
        } else {
            return [];
        }
    }
    /**
     * 计算两个点之间的距离
     */
    static pointsDistance(p1/*: Point*/, p2/*: Point*/)/*: number*/ {
        const rx = p2.x - p1.x;
        const ry = p2.y - p1.y;
        return Math.sqrt(rx * rx + ry * ry);
    }
    /**
     * 获取两点间的向量
     * @p1 start point
     * @p2 end point
     */
    static vector(p1/*: Point*/, p2/*: Point*/)/*: Vector*/ {
        return {
            x: p2.x - p1.x,
            y: p2.y - p1.y,
            startPoint: p1, 
            endPoint: p2,
        };
    }
    // 向量的模
    static vectorModule(v/*: Vector*/)/*: number*/ {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
    // 向量夹角 cos 
    static vectorCosAngle(v1/*: Vector*/, v2/*: Vector*/)/*: number*/ {
        const module = Unit.vectorModule(v1) * Unit.vectorModule(v2);
        if (module === 0) {
            return 0;
        } 
        return Unit.vectorDotProduct(v1, v2) / module;
    }
    
    // 二维向量内积
    static vectorDotProduct(v1/*: Vector*/, v2/*: Vector*/)/*: number*/ {
        return v1.x * v2.x + v1.y * v2.y;
    }
    // 二维向量行列式
    static vectorDet(v1/*: Vector*/, v2/*: Vector*/)/*: number*/ {
        return v1.x * v2.y - v2.x * v1.y;
    }
    // 中点坐标
    static midpointCoordinate(pointList/*: Point[]*/)/*: Point*/ {
        if (pointList.length === 0) {
            return {x: 0, y: 0};
        } else if (pointList.length === 1) {
            return pointList[0];
        } else {
            const res = {x: 0, y: 0};
            for (const i of pointList) {
                res.x += i.x;
                res.y += i.y;
            }
            return {
                x: res.x / pointList.length,
                y: res.y / pointList.length
            };
        }
    }
    /**
     * 格式化输出时间
     * @param t 输入时间，以秒计算
     * @return 输出时间字符串 aa:bb:cc
     */
    static formatTimeString(t = 0)/*: string*/ {
        const h = Math.floor(t / 3600);
        const lm = t % 3600;
        const m = Math.floor(lm / 60);
        const s = Math.floor(lm % 60);
        const hs = h < 10 ? '0' + h : h + '';
        const ms = m < 10 ? '0' + m : m + '';
        const ss = s < 10 ? '0' + s : s + '';
        return hs + ':' + ms + ':' + ss;
    }
    /**
     * 格式化输出时间
     * @param t 输入时间，以分钟计算
     * @return 输出时间字符串 aa:bb:cc
     */
    static formatMinTimeString(t = 0)/*: string*/ {
        const d = Math.floor(t / 1440);
        const lh = t % 1440;
        const h = Math.floor(lh / 60);
        const m = lh % 60;
        const sd = d + '';
        const sh = h < 10 ? '0' + h : h + '';
        const sm = m < 10 ? '0' + m : m + '';
        return sd + ' 天 ' + sh + ' 小时 ' + sm  + '分';
    }
    /**
     * get sign 
     * -0 ===> -1
     * +0 ===> +1
     * 22 ===> +1
     * -2 ===> -1
     */
    static sign(num/*: number*/)/*: number*/ {
        if (num === 0) {
           return 1 / num < 0 ? -1 : 1;
        } else {
            return Math.sign(num);
        }
    }
    /**
     * cover css position to point
     */
    static coverPointToCssPosition(p/*: Point*/)/*: CSSPosition*/ {
        return {
            top: p.y,
            left: p.x,
        };
    }
    /**
     * cover point to css position
     */
    static coverCssPositionToPoint(p/*: CSSPosition*/)/*: Point*/ {
        return {
            x: p.left,
            y: p.top,
        };
    }
    /**
     * 获取浏览器窗口大小
     * @returns { width: 窗口宽, height: 窗口高 }
     */
    static getViewport() {
        if (document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            };
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            };
        }
    }
    /**
     * 获取某元素距离文档的距离
     * @param element 元素对象
     * @returns 高度
     */
    static getElementTop(element/*: HTMLElement*/)/*: number*/ {
        let actualTop = element.offsetTop;
        let current = element.offsetParent;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }
    /**
     * 获取元素距离文档左侧的距离
     * @param element 元素对象
     * @returns 左侧距离
     */
    static getElementLeft(element/*: HTMLElement*/)/*: number*/ {
        let actualLeft = element.offsetLeft;
        let current = element.offsetParent;
        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    }
    /**
     * 获取元素相对文档位置
     * @param element 元素对象
     * @returns { offsetX:X, offsetY:Y }
     */
    static getOffsetViewport(element/*: HTMLElement*/) {
        // x
        const x = Unit.getElementLeft(element);
        // y
        const y = Unit.getElementTop(element);
        
        const offsetX = x - window.pageXOffset;
        
        const offsetY = y - window.pageYOffset;

        return {
            offsetX: offsetX,
            offsetY: offsetY
        };
    }

    static getBoundingClientRect(element/*: HTMLElement*/) {
        if (element.getBoundingClientRect) {
            const rect = element.getBoundingClientRect();
            return {
                top: rect.top,
                left: rect.left,
                right: rect.right,
                bottom: rect.bottom,
            }
        }
        return { top: 0, left: 0, right: 0, bottom: 0 }
    }

    static getBoundingClientRectSize(element/*: HTMLElement*/) {
        const rect = Unit.getBoundingClientRect(element);
        return {
            width: rect.right - rect.left,
            height: rect.bottom - rect.top,
        }
    }

    /**
     * 获取鼠标相对元素的坐标
     * @param {*} e 鼠标回调事件 
     * @param element dom 元素
     */
    static getMousePositon(e/*: MouseEvent*/, element/*: HTMLElement*/) {
        const offset  = Unit.getOffsetViewport(element);
        const clientX = e.clientX - offset.offsetX;
        const clientY = e.clientY - offset.offsetY;
        return {
            x: clientX,
            y: clientY,
        };
    }
    /**
     *  退出当前页面
     */
    static quit() {
        if (window["WeixinJSBridge"]) {
            // 微信 jsbridge 内部方法.
            window["WeixinJSBridge"].call('closeWindow');
        } else if(window.history && window.history.length > 1) {
           // TODO 微信中 history 不确定的问题
           window.history.back();
        } else {
           // window.open('','_self').close();
           // window.open("about:blank");
           window.opener = null;  
           window.open('', '_self');  
           window.close(); 
        }
    }
    /**
     * 刷新当前页面
     */
    static fresh() {
        window.location.reload();
    }

    static ab2str(buf/*: ArrayBuffer*/) {
        const uint16Array = new Uint16Array(buf);
        return String.fromCharCode.apply(null, uint16Array);
    }
      
    static strToU8Arraybuf(str/*: string*/) {
        const buf = new ArrayBuffer(str.length); // 1 bytes for each char
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
    static bytesEqual(buf1/*: Uint8Array*/, buf2/*: Uint8Array*/) {
        if (buf1.byteLength !== buf2.byteLength) {
            return false;
        }
        const view1 = new Uint8Array(buf1);
        const view2 = new Uint8Array(buf2);
        for (let i = 0; i < view1.byteLength; i++) {
            if (view1[i] !== view2[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * 获取手机端相对像素
     * ue图宽度 1340
     */
    static getMobliePixelWidth(px/*: number*/, mobilePixelUnit/*: number*/) {
        const ueWidth = 1340;
        // const { mobilePixelUnit }  = store.state;
        return px / ueWidth * 100 * mobilePixelUnit;
    }
}
 
export const L3 = '';