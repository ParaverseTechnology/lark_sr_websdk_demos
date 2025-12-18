import { createSlice } from "@reduxjs/toolkit";

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


const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    timeout: -1,
    toast: defaultToast,
    toastLevel: 0,
  },
  reducers: {
    setToast(state, actions) {
			state.toast = actions.payload;
		},
		setTimeout(state, actions) {
			state.timeout = actions.payload;
		},
		clearToast(state) {
			state.toast = defaultToast;
			state.timeout = -1;
		},
		setToastLevel(state, actions) {
			state.toastLevel = actions.payload;
		},
		toastAct(state, actions) {
			const timeout/*: number*/ = actions.payload.timeout ? actions.payload.timeout : 5000;
			const position/*: ToastPosition*/ = actions.payload.position ? actions.payload.position : ToastPosition.CENTER;
			const text/*: string*/ = actions.payload.text ? actions.payload.text : '';
			const level/*: Level*/ = actions.payload.level ? actions.payload.level : Level.NORMAL;

			// 只显示大于 level 的 toast
			// 例如: toastLevel = 0, 显示所有toast
			// toastLevel > 2 || toastLevel < 0, 关闭所有 toast
			if (level < state.toastLevel || state.toastLevel < 0) {
				return;
			}
			
			if (level < state.toast.level) {
				console.log('more import toast has been showen. skip current.', actions.payload);
				return;
			}

			if (state.timeout != -1) {
				window.clearTimeout(state.timeout);
			}
      state.toast = {
				show: true,
				text,
				position,
				level,
			};
		}
	},
});

export const { setToast, setTimeout, clearToast, setToastLevel, toastAct } = toastSlice.actions;

export default toastSlice.reducer;