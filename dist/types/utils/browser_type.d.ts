export default class BrowserType {
    static Type: {
        Chrome: string;
        iOSChrome: string;
        Firefox: string;
        Edge: string;
        Opera: string;
        IE: string;
        Safari: string;
    };
    static Support: {
        Chrome: number;
        Firefox: number;
        Edge: number;
    };
    static AdviseSupportVersion: {
        Chrome: number;
        Firefox: number;
        Edge: number;
    };
    static SupportMobile: {
        Chrome: number;
        iOSChrome: number;
        Firefox: number;
        Edge: number;
    };
    static getBrowserType(): string;
    /**
     * @return
     *        -2 推荐升级版本
     *         -1  有问题版本
     *         0 不支持
     *         1 支持
     */
    static checkSupport(): 0 | 1 | -1 | -2;
    static getBrowserVersion(type?: string): number;
}
