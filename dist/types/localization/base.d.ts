export default class LocalizationBase {
    protected mType: string;
    protected mData: any;
    protected mLoaded: boolean;
    get type(): string;
    get data(): any;
    loadData(data: any): void;
}
