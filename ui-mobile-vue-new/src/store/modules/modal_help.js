export const ModalHelp/*: Module<ControlBarInterface, RootState>*/ = {
  namespaced: true,
  state: {
    isShowHelpAlert: false,
    isShowMobileHelp: false,
  },
  mutations: { 
      setIsShowHelpAlert (state, isShowHelpAlert) {
        state.isShowHelpAlert = isShowHelpAlert;
      },
      setIsShowMobileHelp (state, isShowMobileHelp) {
        state.isShowMobileHelp = isShowMobileHelp;
      }
  },
}