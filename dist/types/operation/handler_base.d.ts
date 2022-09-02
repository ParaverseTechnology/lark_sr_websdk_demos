import Operation from "./operation";
export default class HandlerBase {
    protected op: Operation;
    set enable(e: boolean);
    get enable(): boolean;
    protected _enable: boolean;
    constructor(op: Operation);
}
