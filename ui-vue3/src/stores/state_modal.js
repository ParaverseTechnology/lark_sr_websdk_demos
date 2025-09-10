import { defineStore } from "pinia";

export const defaulStateModal/*: StateModalInterface*/ = {
	show: false,
};

export const useStateModalStore = defineStore('stateModal', {
	state: () => {
		return {
			stateModal: defaulStateModal,
			isShowMobileStateModal: false // mobile states modal
		}
	},
	actions: {
		setStateModal(stateModal/*: StateModalInterface*/) {
			this.stateModal = stateModal;
		},
		clearStateModal() {
			this.stateModal = defaulStateModal;
		},
		setIsShowMobileStateModal(i) {
			this.isShowMobileStateModal = i;
		},
		toggleState() {
			this.setStateModal({show: !this.stateModal.show});
		},
		showState() {
			this.setStateModal({show: true});
		},
		closeState() {
			this.clearStateModal();
		}
	}
});