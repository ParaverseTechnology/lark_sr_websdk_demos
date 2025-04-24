import DefaultState from './default_state';

export const RootMutation/*: MutationTree<RootState>*/ = {
    setLarksr(state, larksr) {
        state.larksr = larksr;
    },
    setMobileControlBallPosition(state, position) {
        state.mobileControlBallPosition = position;
    },
    setAggregatedStats(state, aggregatedStats/*: AggregatedStats*/) {
        state.aggregatedStats = aggregatedStats;
    },
    clearAggregatedStats(state) {
        state.aggregatedStats = DefaultState.aggregatedStats;
    },
    setMenu(state, menu/*: boolean*/) {
        state.menu = menu;
    },
    setJoyStick(state, joystick/*: boolean*/) {
        state.joystick = joystick;
    },
    setVirtualKeyboard(state, vkeyboard/*: boolean*/) {
        state.vkeyboard = vkeyboard;
    },
    setVmouseMode(state, vmouseMode/*: VirtualMouseMode*/) {
        state.vmouseMode = vmouseMode;
    },
    setMobilePixelUnit(state, mobilePixelUnit/*: ViewPort*/) {
        state.mobilePixelUnit  = mobilePixelUnit;
    },
    setUI(state, ui/*: UI*/) {
        state.ui = ui;
    },
    setScaleMode(state, scaleMode) {
        state.scaleMode = scaleMode;
    },
    resetScaleMode(state) {
        state.scaleMode = state.larksr.params.scaleMode;
    },
    setSyncClipboardParseEvent(state, syncClipboardParseEvent) {
        state.syncClipboardParseEvent = syncClipboardParseEvent;
    },
    setShowAerialView(state, show) {
        state.showAerialView = show;
    },    
    setMenubarPosition(state, menubarPosition) {
        state.menubarPosition = menubarPosition;
    },    
    setInputMethodEnable(state,inputMethodEnable/*: boolean*/) {
        state.inputMethodEnable = inputMethodEnable;
    },
    setInputMethodStart(state, inputMethodStart/*: boolean*/) {
        state.inputMethodStart = inputMethodStart;
    },
    setControlBallInputMethod(state, controlBallInputMethod) {
        state.controlBallInputMethod = controlBallInputMethod;
    },
    setMobileKeyboardType(state, mobileKeyboardType/*number*/) {
        state.mobileKeyboardType = mobileKeyboardType;
    },
    setPreComponentName(state, preComponentName) {
        state.preComponentName = preComponentName;
    },
    setMobileWebMenuType(state, mobileWebMenuType) {
        state.mobileWebMenuType = mobileWebMenuType;
    },
    setShowWebMenu(state, showWebMenu) {
        state.showWebMenu = showWebMenu;
    },
    setEnableChineseInput(state, enableChineseInput) {
        state.enableChineseInput = enableChineseInput;
    }
}

export default RootMutation;