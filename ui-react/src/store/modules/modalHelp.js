import { createSlice } from "@reduxjs/toolkit";

const modalHelpSlice = createSlice({
  name: 'modalHelp',
  initialState: {
    isShowHelpAlert: false,
    isShowMobileHelp: false,
  },
  reducers: {
    setIsShowHelpAlert (state, actions) {
      state.isShowHelpAlert = actions.payload;
    },
    setIsShowMobileHelp (state, actions) {
      state.isShowMobileHelp = actions.payload;
    }
  }
});

export const {setIsShowHelpAlert, setIsShowMobileHelp } = modalHelpSlice.actions;
export default modalHelpSlice.reducer;