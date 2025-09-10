import { defineStore } from 'pinia';
export const defaultControlBar/*: ControlBarInterface*/ = {
    isToggle: false,
}

export const useControlbarStore = defineStore('controlbar', {
    state: () => {
        return {
            isToggle: false
        }
    },
    actions: { 
        setIsToggle(isToggle/*: boolean*/) {
            this.isToggle = isToggle;
        },
        toggle() {
            this.isToggle = !this.isToggle;
        },
        resetIsToggle() {
            this.isToggle = defaultControlBar.isToggle;
        }
    },
})