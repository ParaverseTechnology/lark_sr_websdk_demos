import { CSSPosition, OffsetView, Point, Vector } from "./interface";
/**
 * Unit 类 常用单元函数
 */
export default class Unit {
    static queryString(name: string): string;
    /**
     * 深度拷贝对象,创建新对象
     * @param source 输入对象
     */
    static deepCopy(source: any): any;
    static deepCopyArray(source: any): any[];
    /**
     * 浏览器窗口大小相关
     */
    /**
     * 获取浏览器窗口大小
     * @returns { width: 窗口宽, height: 窗口高 }
     */
    static viewport(): {
        width: number;
        height: number;
    };
    /**
     * 获取某元素距离文档的距离
     * @param element 元素对象
     * @returns 高度
     */
    static elementTop(element: HTMLElement): number;
    /**
     * 获取元素距离文档左侧的距离
     * @param element 元素对象
     * @returns 左侧距离
     */
    static elementLeft(element: HTMLElement): number;
    /**
     * 获取元素相对文档位置
     * @param element 元素对象
     * @returns { offsetX:X, offsetY:Y }
     */
    static offsetViewport(element: HTMLElement): OffsetView;
    static singlePointRelativePosition(e: Touch | MouseEvent, element: HTMLElement): Point;
    /**
     * 获取触摸点相对元素的坐标
     * @param {e} e 触摸回调事件
     * @param offset getOffsetViewport 获取的 offset 对象. {offsetX,offsetY}
     * @return res[] 包含多指操作触摸点的数组
     */
    static touchRelativePosition(e: any, offset: OffsetView): Array<any>;
    /**
     * 计算两个点之间的距离
     */
    static pointsDistance(p1: Point, p2: Point): number;
    /**
     * 获取两点间的向量
     * @p1 start point
     * @p2 end point
     */
    static vector(p1: Point, p2: Point): Vector;
    static vectorModule(v: Vector): number;
    static vectorCosAngle(v1: Vector, v2: Vector): number;
    static vectorDotProduct(v1: Vector, v2: Vector): number;
    static vectorDet(v1: Vector, v2: Vector): number;
    static midpointCoordinate(pointList: Point[]): Point;
    /**
     * 格式化输出时间
     * @param t 输入时间，以秒计算
     * @return 输出时间字符串 aa:bb:cc
     */
    static formatTimeString(t?: number): string;
    /**
     * 格式化输出时间
     * @param t 输入时间，以分钟计算
     * @return 输出时间字符串 aa:bb:cc
     */
    static formatMinTimeString(t?: number): string;
    /**
     * get sign
     * -0 ===> -1
     * +0 ===> +1
     * 22 ===> +1
     * -2 ===> -1
     */
    static sign(num: number): number;
    /**
     * cover css position to point
     */
    static coverPointToCssPosition(p: Point): CSSPosition;
    /**
     * cover point to css position
     */
    static coverCssPositionToPoint(p: CSSPosition): Point;
    /**
     * 获取浏览器窗口大小
     * @returns { width: 窗口宽, height: 窗口高 }
     */
    static getViewport(): {
        width: number;
        height: number;
    };
    /**
     * 获取某元素距离文档的距离
     * @param element 元素对象
     * @returns 高度
     */
    static getElementTop(element: HTMLElement): number;
    /**
     * 获取元素距离文档左侧的距离
     * @param element 元素对象
     * @returns 左侧距离
     */
    static getElementLeft(element: HTMLElement): number;
    /**
     * 获取元素相对文档位置
     * @param element 元素对象
     * @returns { offsetX:X, offsetY:Y }
     */
    static getOffsetViewport(element: HTMLElement): {
        offsetX: number;
        offsetY: number;
    };
    static getBoundingClientRect(element: HTMLElement): {
        top: number;
        left: number;
        right: number;
        bottom: number;
    };
    static getBoundingClientRectSize(element: HTMLElement): {
        width: number;
        height: number;
    };
    /**
     * 获取鼠标相对元素的坐标
     * @param {*} e 鼠标回调事件
     * @param element dom 元素
     */
    static getMousePositon(e: MouseEvent, element: HTMLElement): {
        x: number;
        y: number;
    };
    /**
     * 刷新当前页面
     */
    static fresh(): void;
    static ab2str(buf: ArrayBuffer): string;
    static strToU8Arraybuf(str: string): ArrayBuffer;
    static bytesEqual(buf1: Uint8Array, buf2: Uint8Array): boolean;
    /**
     * 获取手机端相对像素
     * ue图宽度 1340
     */
    static getMobliePixelWidth(px: number, mobilePixelUnit: number): number;
}
export declare const L3 = "";
