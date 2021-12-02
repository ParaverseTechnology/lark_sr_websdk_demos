export declare class SDKAuth {
    get isSuccess(): boolean;
    private _isSuccess;
    get error(): any;
    private _error;
    constructor();
    auth(id: string): Promise<void>;
    signature(key: string, secret: string, timestamp: string): string;
    check(id: string): boolean;
    save(id: string, expire: string): void;
}
