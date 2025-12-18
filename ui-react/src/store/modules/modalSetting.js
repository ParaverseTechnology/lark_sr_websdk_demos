import { createSlice } from "@reduxjs/toolkit";

const modalSettingSlice = createSlice({
  name: 'modalSetting',
  initialState: {
    isShowSettingAlert: false,
    qualityMode: '1', // 画质 默认1标清
    coderate: 10000, //码率 对齐一览页的进入应用码率
    fps: 60, //帧率 对齐一览页的进入应用帧率
    resolution: { id: '19201080', width: 1920, height: 1080 }, //分辨率
    aerialViewCheck: false, // 鸟瞰模式Switch
    aeriaViewBoxEnd: null,// 最后一次移动aeriaViewBox坐标点，隐藏选择框再次显示选择框时使用
    aeriaViewSelectScale: '21',// 比例 2:1 3:1 4:1
    isShowMobileSettingModal: false
  },
  reducers: {
    setIsShowSettingAlert (state, actions) {
      state.isShowSettingAlert = actions.payload;
    },
    setQualityMode (state, actions) {
      if (actions.payload) {
        state.qualityMode = actions.payload;
      } else {
        if (state.coderate==8000 && state.fps == 60) {
          state.qualityMode = '0';
        } else if (state.coderate==10000 && state.fps == 60) {
          state.qualityMode = '1';
        } else if (state.coderate==20000 && state.fps == 60) {
          state.qualityMode = '2';
        } else if (state.coderate==50000 && state.fps == 60) {
          state.qualityMode = '3';
        }
      }
    },
    setCoderate (state, actions) {
      state.coderate = actions.payload;
    },
    setFps (state, actions) {
      state.fps = actions.payload;
    },
    setResolution (state, actions) {
      state.resolution = actions.payload;
    },
    setAerialViewCheck (state, actions) {
      state.aerialViewCheck = actions.payload;
    },
    setAeriaViewBoxEnd (state, actions) {
      state.aeriaViewBoxEnd = actions.payload;
    },
    setAeriaViewSelectScale (state, actions) {
      state.aeriaViewSelectScale = actions.payload;
    },
    setIsShowMobileSettingModal (state, actions) {
      state.isShowMobileSettingModal = actions.payload;
    },
    coderateChange(state, actions) {
      state.coderate = actions.payload;
    },
    codeFpsChange(state, actions) {
      state.fps = actions.payload;
    },
  }
})

export const { setIsShowSettingAlert, setQualityMode, setCoderate, setFps, setResolution, setAerialViewCheck, setAeriaViewBoxEnd, setAeriaViewSelectScale, setIsShowMobileSettingModal, coderateChange, codeFpsChange } =  modalSettingSlice.actions;
export default modalSettingSlice.reducer;