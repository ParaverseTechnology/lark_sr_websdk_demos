export const defaulStateModal/*: StateModalInterface*/ = {
	show: false,
};


export const StateModal/*: Module<StateModalState, RootState>*/ = {
	namespaced: true,
	state: {
		stateModal: defaulStateModal,
	},
	mutations: {
		setStateModal(state/*: StateModalState*/, stateModal/*: StateModalInterface*/) {
			state.stateModal = stateModal;
		},
		clearStateModal(state/*: StateModalState*/) {
			state.stateModal = defaulStateModal;
		}
	},
	actions: {
        toggleState({ state, commit }) {
            commit('setStateModal', {show: !state.stateModal.show});
        },
		showState({ commit }) {
            commit('setStateModal', {show: true});
        },
        closeState({ commit }) {
            commit('clearStateModal');
        }
	}
};