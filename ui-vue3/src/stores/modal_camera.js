import { defineStore } from "pinia";

export const useModalCameraStore = defineStore('modalCamera', {
  state: () => {
    return {
      isShowCameraModal: false,
      mobileCamera: 'user', // user environment
    }
  },
  actions: { 
    setIsShowCameraModal (isShowCameraModal) {
      this.isShowCameraModal = isShowCameraModal;
    },
    setMobileCamera (mobileCamera) {
      this.mobileCamera = mobileCamera;
    },
  },
})