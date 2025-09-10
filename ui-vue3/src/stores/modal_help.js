import { defineStore } from "pinia";

export const useModalHelpStore = defineStore('modalHelp', {
  state: () => {
    return {
      isShowHelpAlert: false,
      isShowMobileHelp: false,
    }
  },
  actions: { 
      setIsShowHelpAlert (isShowHelpAlert) {
        this.isShowHelpAlert = isShowHelpAlert;
      },
      setIsShowMobileHelp (isShowMobileHelp) {
        this.isShowMobileHelp = isShowMobileHelp;
      }
  },
});