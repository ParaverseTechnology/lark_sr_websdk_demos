import { createSlice } from "@reduxjs/toolkit";

export const defaultNotify/*: NotifyInterface*/ = {
	show: false,
	msg: '',
	level: 'INFO'
};

const notifySlice = createSlice({
  name: 'notify',
  initialState: {
    timeout: -1,
    notify: {
      show: false,
      msg: '',
      level: 'INFO'
    }
  },
  reducers: {
    setNotify(state, actions) {
			state.notify = actions.payload;
		},
		setTimeout(state, actions) {
			state.timeout = actions.payload;
		},
		clearNotify(state) {
			state.notify = defaultNotify;
			state.timeout = -1;
		},
		notifyAct(state, actions) {
			const timeout/*: number*/ = actions.payload.timeout ? actions.payload.timeout : 5000;
			const level/*: string*/ = actions.payload.level ? actions.payload.level : 'INFO';
			const msg/*: string*/ = actions.payload.msg ? actions.payload.msg : '';

			if (state.timeout != -1) {
				window.clearTimeout(state.timeout);
			}

      state.notify = {
				show: true,
				level,
				msg,
			};

		}
  }
})

export const {setNotify, setTimeout, clearNotify, notifyAct } = notifySlice.actions;

export default notifySlice.reducer;