import { defineStore } from "pinia";

export const defalutModalConfirm/*: ModalConfirmInterface*/ = {
	show: false,
	des: '',
    onSubmit: () => {},
    onCancel: () => {},
};


export const useModalConfirmStore = defineStore('modalConfirm', {
	state: () => {
		return {
			enable: true,
			modalConfirm: defalutModalConfirm
		}
	},
	actions: {
		setModalAlertEnable(enable/*: boolean*/) {
			this.enable = enable;
		},
		setModalConfirm(modalConfrim/*: ModalConfirmInterface*/) {
			this.modalConfirm = modalConfrim;
		},
		reset() {
			this.modalConfirm = defalutModalConfirm;
		},
		showModalConfirm(val/*: { title: string, des: string, code: number }*/) {
			return new Promise((resolve, reject) => {
				if (this.enable) {
					this.setModalConfirm({
						show: true,
						title: val.title,
						des: val.des,
						onSubmit: resolve,
						onCancel: reject,
					});
				}
			});
		}
	}
});
