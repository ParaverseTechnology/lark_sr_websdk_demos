import Vue from 'vue';
import Vuex from 'vuex';
import { ModalAlert } from './modules/modal_alert';
import { NotifyBar } from './modules/notifybar';
import { Controlbar } from './modules/controlbar';
import { Toast } from './modules/toast';
import { StateModal } from './modules/state_modal';
import { SettingInfoPannel } from './modules/setttinginfo_pannel';
import { ModalConfirm } from './modules/modal_confirm';
import { PlayerMode } from './modules/player_mode';
import DefaultState from './default_state';
import RootGetters from './root_getters';
import RootMutation from './root_mutation';
import RootActoins from './root_actions';
import { CustomContentAlert } from './modules/custom_content_alert'
import { ModalHelp } from './modules/modal_help'
import { ModalStream } from './modules/modal_stream'
import { ModalSetting } from './modules/modal_setting'
import { ModalCamera } from './modules/modal_camera'

Vue.use(Vuex);

export default new Vuex.Store({
	state: DefaultState,
	getters: RootGetters,
	mutations: RootMutation,
	actions: RootActoins,
	modules: {
		notifyBar: NotifyBar,
		modalAlert: ModalAlert,
		controlbar: Controlbar,
		toast: Toast,
		settingInfoPannel: SettingInfoPannel,
		stateModal: StateModal,
		modalConfirm: ModalConfirm,
		playerMode: PlayerMode,
		customContentAlert: CustomContentAlert,
		modalHelp: ModalHelp,
		modalStream: ModalStream,
		modalSetting: ModalSetting,
		modalCamera: ModalCamera
	}
});
