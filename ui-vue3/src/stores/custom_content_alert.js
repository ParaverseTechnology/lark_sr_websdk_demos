import { defineStore } from 'pinia';

export const useCustomContentAlertStore = defineStore('customContentAlert', {
  state: () => {
    return {
      customContentAlertTitle: ''
    }
  },
  actions: { 
      setCustomContentAlertTitle (customContentAlertTitle) {
        this.customContentAlertTitle = customContentAlertTitle;
      },
  },
})