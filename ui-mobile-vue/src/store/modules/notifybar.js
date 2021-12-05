// import { 
//     Module
// } from 'vuex';
// import { RootState } from '../root_state';

// export interface NotifyInterface {
// 	show: boolean;
// 	msg: string;
// 	level: string;
// }

export const defaultNotify/*: NotifyInterface*/ = {
	show: false,
	msg: '',
	level: 'INFO'
};

// export interface NotifyState {
// 	notify: NotifyInterface;
// 	timeout: number,
// }

export const NotifyBar/*: Module<NotifyState, RootState>*/ = {
	namespaced: true,
	state: {
		timeout: -1,
		notify: defaultNotify,
	},
	mutations: {
		setNotify(state/*: NotifyState*/, notify/*: NotifyInterface*/) {
			state.notify = notify;
		},
		setTimeout(state/*: NotifyState*/, timeout/*: number*/) {
			state.timeout = timeout;
		},
		clearNotify(state/*: NotifyState*/) {
			state.notify = defaultNotify;
			state.timeout = -1;
		}
	},
	actions: {
		notify({ state, commit }, toast/*: any*/) {
			const timeout/*: number*/ = toast.timeout ? toast.timeout : 5000;
			const level/*: string*/ = toast.level ? toast.level : 'INFO';
			const msg/*: string*/ = toast.msg ? toast.msg : '';

			if (state.timeout != -1) {
				window.clearTimeout(state.timeout);
			}

			commit('setNotify', {
				show: true,
				level,
				msg,
			});

			const t = window.setTimeout(() => {
				commit('clearNotify');
			}, timeout);

			commit('setTimeout', t);
		}
	}
};
