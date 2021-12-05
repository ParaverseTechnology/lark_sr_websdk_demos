export const defalutModalConfirm/*: ModalConfirmInterface*/ = {
	show: false,
	des: '',
    onSubmit: () => {},
    onCancel: () => {},
};


export const ModalConfirm/*: Module<ModalConfirmState, RootState>*/ = {
	namespaced: true,
	state: {
		enable: true,
		modalConfirm: defalutModalConfirm
	},
	mutations: {
		setModalAlertEnable(state/*: ModalConfirmState*/, enable/*: boolean*/) {
			state.enable = enable;
		},
		setModalConfirm(state/*: ModalConfirmState*/, modalConfrim/*: ModalConfirmInterface*/) {
			state.modalConfirm = modalConfrim;
		},
		reset(state/*: ModalConfirmState*/) {
			state.modalConfirm = defalutModalConfirm;
		}
	},
	actions: {
		showModalConfirm({ commit, state }, val/*: { des: string, code: number }*/) {
			return new Promise((resolve, reject) => {
				if (state.enable) {
					commit('setModalConfirm', {
						show: true,
						des: val.des,
						onSubmit: resolve,
						onCancel: reject,
					})
				}
			});
		}
	}
};
