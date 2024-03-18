export const ModalStream/*: Module<ControlBarInterface, RootState>*/ = {
  namespaced: true,
  state: {
    isShowStreamAlert: false,
    isShowMobileStream: false,
    isShowQualityModal: false,
    isShowResolutionRatioModal: false,
    isShowQualityModalForSetting: false,
    isShowResolutionRatioModalForSetting: false,
  },
  mutations: { 
    setIsShowStreamAlert (state, isShowStreamAlert) {
      state.isShowStreamAlert = isShowStreamAlert;
    },
    setIsShowMobileStream (state, isShowMobileStream) {
      state.isShowMobileStream = isShowMobileStream;
    },
    setIsShowQualityModal (state, isShowQualityModal) {
      state.isShowQualityModal = isShowQualityModal;
    },
    setIsShowResolutionRatioModal (state, isShowResolutionRatioModal) {
      state.isShowResolutionRatioModal = isShowResolutionRatioModal;
    },
    setIsShowQualityModalForSetting (state, isShowQualityModalForSetting) {
      state.isShowQualityModalForSetting = isShowQualityModalForSetting;
    },
    setIsShowResolutionRatioModalForSetting (state, isShowResolutionRatioModalForSetting) {
      state.isShowResolutionRatioModalForSetting = isShowResolutionRatioModalForSetting;
    },
  },
}