import PinyinUtil from './pinyinUtil';
/**
 *
 * input-method.js
 */
export declare class SimpleInputMethod {
    hanzi: string;
    pinyin: string;
    result: [];
    pageCurrent: number;
    pageSize: number;
    pageCount: number;
    _target: any;
    _pinyinTarget: any;
    _resultTarget: any;
    _input: any;
    pinyinUtil: PinyinUtil;
    /**
     * 初始化字典配置
     */
    initDict(): void;
    /**
     * 初始化DOM结构
     */
    initDom(): void;
    /**
     * 初始化
     */
    init(selector: any): void;
    receiveKeyCode(keyCode: any): void;
    /**
     * 单个拼音转单个汉字，例如输入 "a" 返回 "阿啊呵腌嗄吖锕"
     */
    getSingleHanzi(pinyin: any): any;
    /**
     * 拼音转汉字
     * @param pinyin 需要转换的拼音，如 zhongguo
     * @return 返回一个数组，格式类似：[["中","重","种","众","终","钟","忠"], "zhong'guo"]
     */
    getHanzi(pinyin: any): any[];
    /**
     * 选择某个汉字，i有效值为1-5
     */
    selectHanzi(i: any): void;
    /**
     * 将拼音转换成汉字候选词，并显示在界面上
     */
    refresh(): void;
    refreshPage(): void;
    addChar(ch: any, obj: any): void;
    delChar(): void;
    show(obj: any): void;
    hide(): void;
    reset(): void;
}
