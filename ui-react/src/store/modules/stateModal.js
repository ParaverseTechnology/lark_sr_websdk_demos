import { createSlice } from '@reduxjs/toolkit'

export const defaulStateModal/*: StateModalInterface*/ = {
	show: false,
};

const stateModalSlice = createSlice({
  name: 'stateModal',
  initialState: {
    stateModal: defaulStateModal,
    isShowMobileStateModal: false // mobile states modal
  },
  reducers: {
    setStateModal(state, actions) {
			state.stateModal = actions.payload;
		},
		clearStateModal(state, actions) {
			state.stateModal = defaulStateModal;
		},
		setIsShowMobileStateModal(state, actions) {
			state.isShowMobileStateModal = actions.payload;
		},
		toggleState(state) {
      state.stateModal = {
        show:!state.stateModal.show
      };
		},
		showState(state) {
      state.stateModal = {
        show: true
      };
		},
		closeState(state) {
      state.stateModal = defaulStateModal;
		}
  }
})
// reduxjs toolkit 把reducer和actions合并在一起了
export const { setStateModal, clearStateModal, setIsShowMobileStateModal, toggleState, showState, closeState } = stateModalSlice.actions;
// 导出reducer
export default stateModalSlice.reducer