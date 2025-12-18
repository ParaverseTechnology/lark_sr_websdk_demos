
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import Unit from '../../utils/unit';


const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    enable: true,
    modalAlert: {
      show: false,
      des: '',
      callback: null
    }
  },
  reducers: {
    setAlertEnable(state, actions) {
			state.enable = actions.payload;
		},
		setModalAlert(state, actions) {
			state.modalAlert = actions.payload;
		},
		reset(state, actions) {
			state.modalAlert = {
        show: false,
        des: '',
        callback: null
      };
		},
    showModalAlert(state, actions) {
      console.log(actions.payload)
      state.modalAlert = {
        show: true,
        des: actions.payload.des,
        callback: actions.payload.callbackFn,
      }
    }
  },
})
// reduxjs toolkit 把reducer和actions合并在一起了
export const { setAlertEnable, setModalAlert, reset, showModalAlert} = alertSlice.actions;
// 导出reducer
export default alertSlice.reducer