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
}

export default RootMutation;