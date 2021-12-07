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
}

export default RootMutation;