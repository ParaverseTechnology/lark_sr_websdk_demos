import { defineStore } from 'pinia';
import Capabilities from '@/utils/capabilities';
import Unit from '@/utils/unit';
import LocalizationLoader from '@/localization/loader';
import { ScaleMode } from 'larksr_websdk';
import { CursorType } from './interface';
import { defaultNotify } from './notifybar';
import { defalutModalAlert } from './modal_alert';
import { defaultControlBar } from './controlbar';
import { defaultToast } from './toast';
import { defaulSettingInfo } from './setttinginfo_pannel';
import { defaulStateModal } from './state_modal';
import { defalutModalConfirm } from './modal_confirm';
import { defautlPlayerMode } from './player_mode';
// {
//   // 相当于data
//   state: () => {
//       return {
//         // 所有这些属性都将自动推断其类型,如果推断失败可以试下 as xxx
//         counter: 0,
//         name: 'Eduardo',
//       }
//   },
//   // 相当于计算属性
//   getters: {
//       doubleCount: (state) => {
//           return state.counter * 2
//       },
//   },
//   // 相当于vuex的 mutation + action，可以同时写同步和异步的代码
//   actions: {
//       increment() {
//         this.counter++
//       },
//       randomizeCounter() {
//           setTimeout(() => {
//               this.counter = Math.round(100 * Math.random())
//           }, 0);
//       },
//   },
// }
// 默认连接状态
export const defaultAggregatedStats/*: AggregatedStats*/ = {
	timestamp: 0, bytesReceived: 0, framesDecoded: 0,
	packetsLost: 0, bytesReceivedStart: 0, framesDecodedStart: 0,
	timestampStart: 0, bitrate: 0, lowBitrate: 0, highBitrate: 0,
	avgBitrate: 0, framerate: 0, lowFramerate: 0, highFramerate: 0,
	avgframerate: 0, framesDropped: 0, framesReceived: 0, framesDroppedPercentage: 0,
	frameHeight: 0, frameWidth: 0, frameHeightStart: 0, frameWidthStart: 0, currentRoundTripTime: 0,
	packetsLostPerc: 0,
};
export const useCommStore = defineStore('comm', {
  state: () => ({
      larksr: null,
      aggregatedStats: defaultAggregatedStats,
      isMobile: Capabilities.isMobile,
      mobilePixelUnit: 1920 / 100,
      cursorStyle: {
          // type: CursorType.CUSTOM,
          type: CursorType.DEFAULT,
          hotX: 0,
          hotY: 0,
          width: 0,
          height: 0,
          customBase64: "",
      },
      vkeyboard: false,
      modalSetup: false,
      ui: {},
      menu: false,
      vmouseMode: 'pointer',
      scaleMode: 'contain',
      // default show joystick;
      joystick: true,
      joystickAllKeys: false,
      flipMouseWheel: false,
      showControlBar: true,
      // iframe 控制
      // 是否显示移动端控制球
	    enableMobileControlBall: true,
      //
      syncClipboardParseEvent: true,
      mobileControlBallPosition: { x: 0, y: 0},
      // 鸟瞰模式
	    showAerialView: false,
      // moduls.
      notifyBar: { timeout: -1, notify: defaultNotify,},
      modalAlert: { modalAlert: defalutModalAlert },
      controlbar: defaultControlBar,
      toast: { timeout: -1, toast: defaultToast, toastLevel: 0 },
      settingInfoPannel: { settingInfo: defaulSettingInfo, },
      stateModal: { stateModal: defaulStateModal, },
      modalConfirm: { modalConfirm: defalutModalConfirm },
      playerMode: defautlPlayerMode,
      controlBallInputMethod: false,// 是否是控制球点开的输入中文框
      menubarPosition: 'top', // PC端菜单条的位置 top/bottom
      inputMethodEnable: false,
      inputMethodStart: false,
	    // 是否强制横屏
	    mobileForceLandScape: true,
      mobileKeyboardType: null,
      preComponentName: '',//记录虚拟键盘上一个显示的组件 joystick/kboard/menu
      mobileWebMenuType: 0, // 移动端菜单类型0：控制球 1：菜单条
      clientTheme: 'dark', // 客户端主题色 dark light
      showWebMenu: 1, // 是否显示菜单
	    enableChineseInput: true, //收到文字输入事件时，是否允许输入中文，默认true
    }),
  getters: {
    appliParams: ({ larksr }) => {
        return larksr ? larksr.params : {};
    },
    container: ({ larksr }) => {
        return larksr ? larksr.screenState.container : {
            marginTop: 0, marginLeft: 0, width: 1920, height: 1080
        };
    },
    appSize: ({ larksr }) => {
        return larksr ? larksr.screenState.appSize : {
            width: 1920, height: 1080 
        };
    },
    operateScale: ({ larksr }) => {
        return larksr ? larksr.screenState.operateScale : {
            scaleX: 1,
            scaleY: 1
        };
    },
    isChangedScaledMode: ({larksr}) => {
        if (!larksr) {
            return false;
        }
        return larksr.screenState.scaleMode != larksr.params.scaleMode;
    },
    isFullScreen: (state) => {
        return state.larksr.fullScreen.isFullScreen;
    },
    fullScreenBgStyle: ({ container, isFullScreen }) => {
        if (isFullScreen) {
            ///TODO select pref margin border.
            if (container.marginTop > 0 && container.marginTop < 5) {
                return {
                    'background-color': '#000',
                };
            } else {
                return {
                    'background-color': '#fff',
                };
            }	
        } else {
            return {
                'background-color': '#fff',
            };
        }
    },
    screenOrientation: ({ larksr }) => {
        return larksr ? larksr.screenState.screenOrientation : 'portrait';
    },
    viewPort: ({ larksr }) => {
        return larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    },
    viewPortStyle: ({ larksr }) => {
        return larksr ? larksr.screenState.viewPortStyle : "";
    },
    isLockMouse: ({ larksr }) => {
        return larksr ? larksr.lockPointer.isLockPointer : false;
    },
    mobilePixelUnitGetter: ({ larksr }) => {
        return larksr ? larksr.screenState.viewPort.width / 100 : 1920 / 100;
    },
    rttLimit: ({ larksr }) => {
        return larksr ? larksr.params.rttLimit : 30;
    },
    isFlipMouseWheel: ({ larksr }) => {
        return larksr.mouseZoomDirection === 1? true : false;
    },
    initCursorMode: ({ larksr }) => {
        return larksr ? larksr.initCursorMode : false;
    }
  },
  actions: {
    setLarksr(larksr) {
        this.larksr = larksr;
    },
    setMobileControlBallPosition(position) {
      this.mobileControlBallPosition = position;
    },
    setAggregatedStats(aggregatedStats/*: AggregatedStats*/) {
      this.aggregatedStats = aggregatedStats;
    },
    clearAggregatedStats() {
      this.aggregatedStats = DefaultState.aggregatedStats;
    },
    setMenu(menu/*: boolean*/) {
      this.menu = menu;
    },
    setJoyStick(joystick/*: boolean*/) {
      this.joystick = joystick;
    },
    setVirtualKeyboard(vkeyboard/*: boolean*/) {
      this.vkeyboard = vkeyboard;
    },
    setVmouseMode(vmouseMode/*: VirtualMouseMode*/) {
      this.vmouseMode = vmouseMode;
    },
    setMobilePixelUnit(mobilePixelUnitVal/*: ViewPort*/) {
      this.mobilePixelUnit  = mobilePixelUnitVal;
    },
    setUI(ui/*: UI*/) {
      this.ui = ui;
    },
    setScaleMode( scaleMode) {
      this.scaleMode = scaleMode;
    },
    resetScaleMode() {
      this.scaleMode = this.larksr.params.scaleMode;
    },
    setSyncClipboardParseEvent(syncClipboardParseEvent) {
      this.syncClipboardParseEvent = syncClipboardParseEvent;
    },
    setShowAerialView(show) {
      this.showAerialView = show;
    },    
    setMenubarPosition(menubarPosition) {
      this.menubarPosition = menubarPosition;
    },    
    setInputMethodEnable(inputMethodEnable/*: boolean*/) {
      this.inputMethodEnable = inputMethodEnable;
    },
    setInputMethodStart(inputMethodStart/*: boolean*/) {
      this.inputMethodStart = inputMethodStart;
    },
    setControlBallInputMethod(controlBallInputMethod) {
      this.controlBallInputMethod = controlBallInputMethod;
    },
    setMobileKeyboardType(mobileKeyboardType/*number*/) {
      this.mobileKeyboardType = mobileKeyboardType;
    },
    setPreComponentName(preComponentName) {
      this.preComponentName = preComponentName;
    },
    setMobileWebMenuType(mobileWebMenuType) {
      this.mobileWebMenuType = mobileWebMenuType;
    },
    setShowWebMenu(showWebMenu) {
      this.showWebMenu = showWebMenu;
    },
    setEnableChineseInput(enableChineseInput) {
      this.enableChineseInput = enableChineseInput;
    },

    // action
    resize() {
      // 浏览器窗口宽
      let screenW = this.screenOrientation === 'landscape' ? 
              Unit.viewport().height :
              Unit.viewport().width;
      let pixUnit = screenW / 100;

      if (Capabilities.isMobile) {
          // resize rem.
          document.documentElement.style.fontSize = pixUnit + 'px';
      } else {
          // document.documentElement.style.fontSize = screenW / 200 + 'px';
          document.documentElement.style.fontSize = '9px';
      }
      this.mobilePixelUnit = pixUnit;
      // this.setMobilePixelUnit(pixUnit);
    },
    // keyboard,menu,joystick  同时只显示一个
    toggleVKeyboard() {
      this.setVirtualKeyboard(!this.vkeyboard);
        if (this.vkeyboard) {
          this.setMenu(false);
          this.setJoyStick(false);
        }
    },
    toggleMenu() {
      this.setMenu(!this.menu);
      if (this.menu) {
        this.setVirtualKeyboard(false);
        this.setJoyStick(false);
      }
    },
    toggleJoyStick() {
      this.setJoyStick(!this.joystick);
        if (this.joystick) {
          this.setVirtualKeyboard(false);
          this.setMenu(false);
        }
    },
    toggleVMouseMode() {
        if (this.vmouseMode == 'vmouse') {
          this.setVmouseMode('pointer');
        } else {
          this.setVmouseMode('vmouse');
        }
    },
    resetLocalization() {
      this.setLocalization(this.larksr.params.language);
    },
    setLocalization(language) {
        LocalizationLoader.init(language);
        this.setUI(LocalizationLoader.ui);
    },
    // scale mode
    // resetScaleMode() {
    //     commit('resetScaleMode');
    //     dispatch('resize');
    // },
    // setScaleMode(, mode) {
    //     commit('setScaleMode', mode);
    //     dispatch('resize');
    // },
    setScaleToDefault() {
      this.resetScaleMode();
      this.resize();
    },
    setScaleToFitScreen() {
      this.setScaleMode(ScaleMode.FIT_SCREEN);
      this.resize();
    },
    setScaleToFillStretch() {
      this.setScaleMode(ScaleMode.FILL_STRETCH);
      this.resize();
    },
    toggleScaleToFitScreen() {
        if (ScaleMode.FIT_SCREEN === this.larksr.params.scaleMode) {
            return;
        }
        if (this.isChangedScaledMode) {
          this.resetScaleMode();
        } else {
          this.setScaleMode(ScaleMode.FIT_SCREEN);
        }
        dispatch('resize');
    },
    toggleScaleToFillStretch() {
        if (ScaleMode.FILL_STRETCH === this.larksr.params.scaleMode) {
            return;
        }
        if (this.isChangedScaledMode) {
          this.resetScaleMode();
        } else {
          this.setScaleMode(ScaleMode.FILL_STRETCH);
        }
        this.resize();
    },
    setFlipMouseWheel (direction/*: number*/) {
        if (this.larksr) {
            // const direction = larksr.params.mouseZoomDirection === 0 ? 1 : 0;
            // larksr.mouseZoomDirection = flip ? direction : larksr.params.mouseZoomDirection;
            // Log.info('flipMouseWheel', larksr.mouseZoomDirection, direction, flip);
            this.larksr.mouseZoomDirection = direction;
        }
    },
    toggleSyncClipboardParseEvent() {
      this.setSyncClipboardParseEvent(!this.syncClipboardParseEvent);
        if (this.larksr) {
          this.larksr.op.enableParse = this.syncClipboardParseEvent;
        }
    },
    toggleInitCursorMode() {
        if (this.larksr) {
          this.larksr.initCursorMode = this.larksr.initCursorMode === 0 ? 1 : 0;
        }
    },
    toggleAerailView() {
      this.setShowAerialView(!this.showAerialView);
    },
    setScaleMode(scaleMode) {
        if (this.larksr) {
            this.larksr.scaleMode = scaleMode;
        }
    },
    resetScaleMode() {
        if (this.larksr) {
            this.larksr.scaleMode = this.larksr.params.scaleMode;
        }
    },
  }
  
})