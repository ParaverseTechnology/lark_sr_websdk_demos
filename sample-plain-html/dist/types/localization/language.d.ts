export declare enum SupportLanguage {
    CN = 0,
    EN = 1,
    TW = 2
}
export declare function isChinese(codeString: string): boolean;
export declare function getSupportLanguageFromCodeStr(codeString: string): SupportLanguage;
