//store/index.js 文件
 
import { configureStore } from '@reduxjs/toolkit'
import alertSlice from './modules/alert'
import commSlice from './modules/comm'
import confirmSlice from './modules/confirm'
import stateModal from './modules/stateModal'
import customContentAlert from './modules/customContentAlert'
import modalHelp from './modules/modalHelp'
import modalStream from './modules/modalStream'
import toast from './modules/toast'
import playerMode from './modules/playerMode'
import modalSetting from './modules/modalSetting'
import notify from './modules/notify'
import modalCamera from './modules/modalCamera'
 
 const store=configureStore({
  reducer: {
    alert: alertSlice,
    comm: commSlice,
    confirm: confirmSlice,
    stateModal: stateModal,
    customContentAlert: customContentAlert,
    modalHelp: modalHelp, 
    modalStream: modalStream,
    toast, toast,
    playerMode: playerMode,
    modalSetting: modalSetting,
    notify: notify,
    modalCamera: modalCamera
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})
export default store