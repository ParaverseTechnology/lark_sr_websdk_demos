import { createSlice } from "@reduxjs/toolkit";

const customContentAlertSlice = createSlice({
  name: 'customContentAlert',
  initialState: {
    customContentAlertTitle: ''
  },
   reducers: {
    setCustomContentAlertTitle (state, actions) {
      state.customContentAlertTitle = actions.payload;
    },
   }
})

export const {setCustomContentAlertTitle } = customContentAlertSlice.actions;
export default customContentAlertSlice.reducer;