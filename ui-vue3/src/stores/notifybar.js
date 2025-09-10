
import { defineStore } from 'pinia';


export const defaultNotify/*: NotifyInterface*/ = {
	show: false,
	msg: '',
	level: 'INFO'
};
export const useNotifyBarStore = defineStore('notifyBar', {
	state: () => {
    return {
      timeout: -1,
      notify: {
				show: false,
				msg: '',
				level: 'INFO'
			},
    }
  },
	actions: {
    setNotify(notify/*: NotifyInterface*/) {
			this.notify = notify;
		},
		setTimeout(timeout/*: number*/) {
			this.timeout = timeout;
		},
		clearNotify() {
			this.notify = defaultNotify;
			this.timeout = -1;
		},
		notify(toast/*: any*/) {
			const timeout/*: number*/ = toast.timeout ? toast.timeout : 5000;
			const level/*: string*/ = toast.level ? toast.level : 'INFO';
			const msg/*: string*/ = toast.msg ? toast.msg : '';

			if (this.timeout != -1) {
				window.clearTimeout(this.timeout);
			}

      this.setNotify({
				show: true,
				level,
				msg,
			});

			const t = window.setTimeout(() => {
        this.clearNotify();
			}, timeout);

      this.setTimeout(t);
		}
	}
});
