import { defineStore } from "pinia";

export const useModalStreamStore = defineStore('modalStreamStore', {
  state: () => {
    return {
      isShowStreamAlert: false,
      isShowMobileStream: false,
      isShowQualityModal: false,
      isShowResolutionRatioModal: false,
      isShowQualityModalForSetting: false,
      isShowResolutionRatioModalForSetting: false,
      rtmpstreamstate: null, // 直播推流状态信息
      rtmpstreamForm: null // 直播推流参数信息
    }
  },
  actions: { 
    setIsShowStreamAlert (isShowStreamAlert) {
      this.isShowStreamAlert = isShowStreamAlert;
    },
    setIsShowMobileStream (isShowMobileStream) {
      this.isShowMobileStream = isShowMobileStream;
    },
    setIsShowQualityModal (isShowQualityModal) {
      this.isShowQualityModal = isShowQualityModal;
    },
    setIsShowResolutionRatioModal (isShowResolutionRatioModal) {
      this.isShowResolutionRatioModal = isShowResolutionRatioModal;
    },
    setIsShowQualityModalForSetting (isShowQualityModalForSetting) {
      this.isShowQualityModalForSetting = isShowQualityModalForSetting;
    },
    setIsShowResolutionRatioModalForSetting (isShowResolutionRatioModalForSetting) {
      this.isShowResolutionRatioModalForSetting = isShowResolutionRatioModalForSetting;
    },
    setRtmpstreamstate (rtmpstreamstate) {
      this.rtmpstreamstate = rtmpstreamstate;
    },
    setRtmpstreamForm (rtmpstreamForm) {
      this.rtmpstreamForm = rtmpstreamForm;
    }
  },
});