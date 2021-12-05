export const defaulSettingInfo/*: SettinginfoInterface*/ = {
	show: false,
};


export const SettingInfoPannel/*: Module<SettingInfoState, RootState>*/ = {
	namespaced: true,
	state: {
		settingInfo: defaulSettingInfo,
	},
	mutations: {
		setSettingInfo(state/*: SettingInfoState*/, info/*: SettinginfoInterface*/) {
			state.settingInfo = info;
		},
		clearSettingInfo(state/*: SettingInfoState*/) {
			state.settingInfo = defaulSettingInfo;
		}
	},
	actions: {
		showInfo({ commit }) {
            commit('setSettingInfo', {show: true});
        },
        closeInfo({ commit }) {
            commit('clearSettingInfo');
        }
	}
};
