export const SupportLanguage = {
    CN: 1,
    EN: 2,
}

// check languange code is chinese.
// default return true.
export function isChinese(codeString) {
    // const codes = ['zh', 'zh-cn', 'zh-hk', 'zh-sg', 'zh-tw', 'zh-hans',  'zh-hans-cn', 'zh-hans-sg', 'zh-hans-hk', 'zh-hans-mo', 'zh-hans-tw'];
    const codes = ['zh-CN'];
    // current use static zh-CN for code.
    if (codeString) {
        return codeString.indexOf(codes[0]) > -1;
    } 
    return true;
}

export function getSupportLanguageFromCodeStr(codeString) {
    if (isChinese(codeString)) {
        return SupportLanguage.CN;
    } else {
        return SupportLanguage.EN;
    }
}