export const defaultControlBar/*: ControlBarInterface*/ = {
    isToggle: false,
}

export const Controlbar/*: Module<ControlBarInterface, RootState>*/ = {
    namespaced: true,
    state: defaultControlBar,
    mutations: { 
        setIsToggle(state/*: ControlBarInterface*/, isToggle/*: boolean*/) {
            state.isToggle = isToggle;
        },
        toggle(state/*: ControlBarInterface*/) {
            state.isToggle = !state.isToggle;
        },
        resetIsToggle(state/*: ControlBarInterface*/) {
            state.isToggle = defaultControlBar.isToggle;
        }
    },
}