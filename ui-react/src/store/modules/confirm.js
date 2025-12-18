import { createSlice } from "@reduxjs/toolkit";

const confirmSlice = createSlice({
  name: 'confirm',
  initialState: {
    enable: true,
    modalConfirm: {
      show: false,
      des: '',
      onSubmit: () => {},
      onCancel: () => {},
    }
  },
  reducers: {
    setModalAlertEnable(state, actions) {
			state.enable = actions.payload;
		},
		setModalConfirm(state, actions) {
			state.modalConfirm = actions.payload;
		},
		reset(state) {
			state.modalConfirm = {
        show: false,
        des: '',
        onSubmit: () => {},
        onCancel: () => {},
      };
		},
    // /*: { title: string, des: string, code: number }*/
		showModalConfirm(state, actions) {
      if (state.enable) {
        state.modalConfirm = {
          show: true,
          title: actions.payload.title,
          des: actions.payload.des,
          onSubmit: actions.payload.onSubmit,
          onCancel: actions.payload.onCancel,
        }
      }
		}
  }
})

export const {setModalAlertEnable, setModalConfirm, reset, showModalConfirm } = confirmSlice.actions;

export default confirmSlice.reducer;