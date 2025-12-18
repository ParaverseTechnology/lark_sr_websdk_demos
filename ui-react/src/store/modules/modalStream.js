import { createSlice } from "@reduxjs/toolkit";

const modalStreamSlice = createSlice({
  name: 'modalStream',
    initialState: {
      isShowStreamAlert: false,
      isShowMobileStream: false,
      isShowQualityModal: false,
      isShowResolutionRatioModal: false,
      isShowQualityModalForSetting: false,
      isShowResolutionRatioModalForSetting: false,
      rtmpstreamstate: null, // 直播推流状态信息
      rtmpstreamForm: null // 直播推流参数信息
    },
    reducers: {
      setIsShowStreamAlert (state, actions) {
        state.isShowStreamAlert = actions.payload;
      },
      setIsShowMobileStream (state, actions) {
        state.isShowMobileStream = actions.payload;
      },
      setIsShowQualityModal (state, actions) {
        state.isShowQualityModal = actions.payload;
      },
      setIsShowResolutionRatioModal (state, actions) {
        state.isShowResolutionRatioModal = actions.payload;
      },
      setIsShowQualityModalForSetting (state, actions) {
        state.isShowQualityModalForSetting = actions.payload;
      },
      setIsShowResolutionRatioModalForSetting (state, actions) {
        state.isShowResolutionRatioModalForSetting = actions.payload;
      },
      setRtmpstreamstate (state, actions) {
        state.rtmpstreamstate = actions.payload;
      },
      setRtmpstreamForm (state, actions) {
        state.rtmpstreamForm = actions.payload;
      }
    }
});

export const { setIsShowStreamAlert, setIsShowMobileStream, setIsShowQualityModal, setIsShowResolutionRatioModal, setIsShowQualityModalForSetting, setIsShowResolutionRatioModalForSetting, setRtmpstreamstate, setRtmpstreamForm } = modalStreamSlice.actions;
export default modalStreamSlice.reducer;