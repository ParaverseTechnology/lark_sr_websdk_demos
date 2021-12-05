export const defalutModalAlert/*: ModalAlertInterface*/ = {
	show: false,
	des: '',
	callback: () => {}
};


export const ModalAlert/*: Module<AlertModalState, RootState>*/ = {
	namespaced: true,
	state: {
		enable: true,
		modalAlert: defalutModalAlert
	},
	mutations: {
		setAlertEnable(state, enable) {
			state.enable = enable;
		},
		setModalAlert(state/*: AlertModalState*/, modalAlert/*: ModalAlertInterface*/) {
			state.modalAlert = modalAlert;
		},
		reset(state/*: AlertModalState*/) {
			state.modalAlert = defalutModalAlert;
		}
	},
	actions: {
		showModalAlert({ commit, state }, val/*: { des: string, code: number}*/ = { des: "", code: -1}) {
			return new Promise((resolve, reject) => {
				if (state.enable) {
					commit('setModalAlert', {
						show: true,
						des: val.des,
						callback: resolve,
					});
				} else {
					reject();
				}
			});
		}
	}
};
