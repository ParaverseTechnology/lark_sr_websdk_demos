export const CustomContentAlert/*: Module<ControlBarInterface, RootState>*/ = {
  namespaced: true,
  state: {
    customContentAlertTitle: ''
  },
  mutations: { 
      setCustomContentAlertTitle (state, customContentAlertTitle) {
        state.customContentAlertTitle = customContentAlertTitle;
      },
  },
}