declare class pinyinUtil {
    toneMap: any;
    dict: any;
    /**
     * 解析各种字典文件，所需的字典文件必须在本JS之前导入
     */
    parseDict(): void;
    /**
     * 根据汉字获取拼音，如果不是汉字直接返回原字符
     * @param chinese 要转换的汉字
     * @param splitter 分隔字符，默认用空格分隔
     * @param withtone 返回结果是否包含声调，默认是
     * @param polyphone 是否支持多音字，默认否
     */
    getPinyin(chinese: any, splitter: any, withtone: any, polyphone: any): string | any[];
    /**
     * 获取汉字的拼音首字母
     * @param str 汉字字符串，如果遇到非汉字则原样返回
     * @param polyphone 是否支持多音字，默认false，如果为true，会返回所有可能的组合数组
     */
    getFirstLetter(str: any, polyphone: any): any;
    /**
     * 拼音转汉字，只支持单个汉字，返回所有匹配的汉字组合
     * @param pinyin 单个汉字的拼音，可以包含声调
     */
    getHanzi(pinyin: any): any;
    /**
     * 去除拼音中的声调，比如将 xiǎo míng tóng xué 转换成 xiao ming tong xue
     * @param pinyin 需要转换的拼音
     */
    removeTone(pinyin: any): any;
    /**
     * 处理多音字，将类似['D', 'ZC', 'F']转换成['DZF', 'DCF']
     * 或者将 ['chang zhang', 'cheng'] 转换成 ['chang cheng', 'zhang cheng']
     */
    handlePolyphone(array: any, splitter: any, joinChar: any): any[];
    simpleUnique(array: any): any[];
}
export default pinyinUtil;
