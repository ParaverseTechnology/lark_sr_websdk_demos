export const ToastPosition = {
	CENTER : 1,
	UP     : 2,
	DOWN   : 3
}

export const Level = {
	NORMAL : 1,
	IMPORTANT : 2,
	WARNING : 3,
}

export const defaultToast/*: ToastInterface*/ = {
	show: false,
	text: '',
	position: ToastPosition.CENTER,
	level: Level.NORMAL,
};

export const Toast/*: Module<ToastState, RootState>*/ = {
	namespaced: true,
	state: {
		timeout: -1,
		toast: defaultToast,
		toastLevel: 0,
	},
	mutations: {
		setToast(state/*: ToastState*/, toast/*: ToastInterface*/) {
			state.toast = toast;
		},
		setTimeout(state/*: ToastState*/, timeout/*: number*/) {
			state.timeout = timeout;
		},
		clearToast(state/*: ToastState*/) {
			state.toast = defaultToast;
			state.timeout = -1;
		},
		setToastLevel(state/*: ToastState*/, level/*: number*/) {
			state.toastLevel = level;
		}
	},
	actions: {
		toast({ state, commit }, toast/*: any*/) {
			const timeout/*: number*/ = toast.timeout ? toast.timeout : 5000;
			const position/*: ToastPosition*/ = toast.position ? toast.position : ToastPosition.CENTER;
			const text/*: string*/ = toast.text ? toast.text : '';
			const level/*: Level*/ = toast.level ? toast.level : Level.NORMAL;

			// 只显示大于 level 的 toast
			// 例如: toastLevel = 0, 显示所有toast
			// toastLevel > 2 || toastLevel < 0, 关闭所有 toast
			if (level < state.toastLevel || state.toastLevel < 0) {
				return;
			}
			
			if (level < state.toast.level) {
				console.log('more import toast has been showen. skip current.', toast);
				return;
			}

			if (state.timeout != -1) {
				window.clearTimeout(state.timeout);
			}

			commit('setToast', {
				show: true,
				text,
				position,
				level,
			});

			const t = window.setTimeout(() => {
				commit('clearToast');
			}, timeout);

			commit('setTimeout', t);
		}
	}
};
