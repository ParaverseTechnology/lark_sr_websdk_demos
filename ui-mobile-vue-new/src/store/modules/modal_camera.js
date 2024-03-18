export const ModalCamera = {
  namespaced: true,
  state: {
    isShowCameraModal: false,
    mobileCamera: 'user', // user environment
  },
  mutations: { 
    setIsShowCameraModal (state, isShowCameraModal) {
      state.isShowCameraModal = isShowCameraModal;
    },
    setMobileCamera (state, mobileCamera) {
      state.mobileCamera = mobileCamera;
    },
},
}