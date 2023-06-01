export interface IKeyboardConfig {
    /**
     * 必选项 根元素。组件会挂载到跟元素下面
     */
    rootElement: HTMLElement;
    /**
      * 可选项，larksr 对象，由 larksr websdk 创建出来
      * 传入后自动发送对应的按键给云端。如果不传入，应手动处理事件，如 joystickstart joystickmove joystickend
      * larksr npm https://www.npmjs.com/package/larksr_websdk
      * larksr doc https://github.com/pingxingyun/lark_sr_websdk_demos
      * larksr demos https://pingxingyun.github.io/webclient_sdk/
      */
    larksr?: any;
    /**
     * 键盘默认语言
     * en
     * zh
     */
    language?: string;
}
declare class Keyboard {
    /**
     * larksr 对象，由 larksr websdk 创建出来
     * 传入后自动发送对应的按键给云端。如果不传入，应手动处理事件，如 joystickstart joystickmove joystickend
     * larksr npm https://www.npmjs.com/package/larksr_websdk
     * larksr doc https://github.com/pingxingyun/lark_sr_websdk_demos
     * larksr demos https://pingxingyun.github.io/webclient_sdk/
     */
    set larksr(larksr: any);
    private keyboard;
    private config;
    /**
     *
     * @param type 监听事件
     * @param callback
     */
    on(type: string, callback: (e: any) => void): void;
    /**
    * 显示键盘
    */
    show(): void;
    /**
     * 隐藏键盘
     */
    hide(): void;
    /**
       *
       * @param config IKeyboardConfig
       */
    constructor(config: IKeyboardConfig);
}
export { Keyboard };
