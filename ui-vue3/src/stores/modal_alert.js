import { defineStore } from "pinia";

export const defalutModalAlert/*: ModalAlertInterface*/ = {
	show: false,
	des: '',
	callback: () => {}
};

export const useModalAlertStore = defineStore('modalAlert', {
	state: () => {
		return {
			enable: true,
			modalAlert: {
				show: false,
				des: '',
				callback: () => {}
			}
		}
	},
	actions: {
		setAlertEnable(enable) {
			this.enable = enable;
		},
		setModalAlert(modalAlert/*: ModalAlertInterface*/) {
			this.modalAlert = modalAlert;
		},
		reset() {
			this.modalAlert = {
				show: false,
				des: '',
				callback: () => {}
			}
		},
		showModalAlert(val/*: { des: string, code: number}*/ = { des: "", code: -1}) {
			return new Promise((resolve, reject) => {
				if (this.enable) {
					this.setModalAlert({
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
});
