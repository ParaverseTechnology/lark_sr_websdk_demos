import { defineStore } from "pinia";

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

export const useToastStore = defineStore('toast', {
	state: () => {
		return {
			timeout: -1,
			toast: defaultToast,
			toastLevel: 0,
		}
	},
	actions: {
		setToast(toast/*: ToastInterface*/) {
			this.toast = toast;
		},
		setTimeout(timeout/*: number*/) {
			this.timeout = timeout;
		},
		clearToast() {
			this.toast = defaultToast;
			this.timeout = -1;
		},
		setToastLevel(level/*: number*/) {
			this.toastLevel = level;
		},
		toastAct(toast/*: any*/) {
			const timeout/*: number*/ = toast.timeout ? toast.timeout : 5000;
			const position/*: ToastPosition*/ = toast.position ? toast.position : ToastPosition.CENTER;
			const text/*: string*/ = toast.text ? toast.text : '';
			const level/*: Level*/ = toast.level ? toast.level : Level.NORMAL;

			// 只显示大于 level 的 toast
			// 例如: toastLevel = 0, 显示所有toast
			// toastLevel > 2 || toastLevel < 0, 关闭所有 toast
			if (level < this.toastLevel || this.toastLevel < 0) {
				return;
			}
			
			if (level < this.toast.level) {
				console.log('more import toast has been showen. skip current.', toast);
				return;
			}

			if (this.timeout != -1) {
				window.clearTimeout(this.timeout);
			}

			this.setToast({
				show: true,
				text,
				position,
				level,
			});

			const t = window.setTimeout(() => {
				this.clearToast();
			}, timeout);
			this.setTimeout(t);
		}
	}
});
