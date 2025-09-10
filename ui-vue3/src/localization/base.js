export default class LocalizationBase {
    get type() {
        return this.mType;
    }
    get data() {
        return this.mData;
    }

    constructor() {
        this.mType = '';
        this.mData;
        this.mLoaded = false;
    }
    
    loadData(data) {
        this.mData = data;
        if (this.mData != null) {
            this.mLoaded = true;
        }
    }
}