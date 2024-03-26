export const ModalSetting/*: Module<ControlBarInterface, RootState>*/ = {
  namespaced: true,
  state: {
    isShowSettingAlert: false,
    qualityMode: '1', // 画质 默认1标清
    coderate: 10000, //码率 对齐一览页的进入应用码率
    fps: 60, //帧率 对齐一览页的进入应用帧率
    resolution: { id: '19201080', width: 1920, height: 1080 }, //分辨率
    aerialViewCheck: false, // 鸟瞰模式Switch
    isShowMobileSettingModal: false
  },
  mutations: { 
      setIsShowSettingAlert (state, isShowSettingAlert) {
        state.isShowSettingAlert = isShowSettingAlert;
      },
      setQualityMode (state, qualityMode) {
        state.qualityMode = qualityMode;
      },
      setCoderate (state, coderate) {
        state.coderate = coderate;
      },
      setFps (state, fps) {
        state.fps = fps;
      },
      setResolution (state, resolution) {
        state.resolution = resolution;
      },
      setAerialViewCheck (state, aerialViewCheck) {
        state.aerialViewCheck = aerialViewCheck;
      },
      setIsShowMobileSettingModal (state, isShowMobileSettingModal) {
        state.isShowMobileSettingModal = isShowMobileSettingModal;
      },
  },
  actions: {
    coderateChange({commit, state, dispatch}, coderate) {
      commit('setCoderate', coderate);
    },
    codeFpsChange({commit, state, dispatch}, codeFps) {
      commit('setFps', codeFps);
    },
  }
}