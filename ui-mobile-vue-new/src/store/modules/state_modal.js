export const defaulStateModal/*: StateModalInterface*/ = {
	show: false,
};

export const StateModal/*: Module<StateModalState, RootState>*/ = {
	namespaced: true,
	state: {
		stateModal: defaulStateModal,
		isShowMobileStateModal: false // mobile states modal
	},
	mutations: {
		setStateModal(state/*: StateModalState*/, stateModal/*: StateModalInterface*/) {
			state.stateModal = stateModal;
		},
		clearStateModal(state/*: StateModalState*/) {
			state.stateModal = defaulStateModal;
		},
		setIsShowMobileStateModal(state, isShowMobileStateModal) {
			state.isShowMobileStateModal = isShowMobileStateModal;
		}
	},
	actions: {
        toggleState({ state, commit }) {
            commit('setStateModal', {show: !state.stateModal.show});
        },
		showState({ state, commit }) {
            commit('setStateModal', {show: true});
        },
        closeState({ state, commit }) {
            commit('clearStateModal');
        }
	}
};