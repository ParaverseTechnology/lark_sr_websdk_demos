import { defineStore } from "pinia";

export const defaulSettingInfo/*: SettinginfoInterface*/ = {
	show: false,
};


export const useSettingInfoPannelStore = defineStore('settingInfoPannel', {
	state: () => {
		return {
			settingInfo: {
				show: false,
			},
		}
	},
	actions: {
		setSettingInfo(info/*: SettinginfoInterface*/) {
			this.settingInfo = info;
		},
		clearSettingInfo() {
			this.settingInfo = defaulSettingInfo;
		},
		showInfo() {
			this.setSettingInfo({show: true});
		},
		closeInfo() {
			this.clearSettingInfo();
		}
	}
});
