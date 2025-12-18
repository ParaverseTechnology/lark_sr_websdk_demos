import { createSlice } from "@reduxjs/toolkit";

const modalCameraSlice = createSlice({
  name: 'modalCamera',
  initialState: {
    isShowCameraModal: false,
    mobileCamera: 'user', // user environment
  },
  reducers: {
    setIsShowCameraModal (state, actions) {
      thstateis.isShowCameraModal = actions.payload;
    },
    setMobileCamera (state, actions) {
      state.mobileCamera = actions.payload;
    },
  }
});

export const {setIsShowCameraModal, setMobileCamera } = modalCameraSlice.actions;
export default modalCameraSlice.reducer;