import { createSlice } from '@reduxjs/toolkit'
import { ScaleMode } from 'larksr_websdk';
import LocalizationLoader from '@/localization/loader';
import Unit from '@/utils/unit';
import { CursorType } from './interface';
import Capabilities from '@/utils/capabilities';
import { defautlPlayerMode } from './playerMode.js';
import Log  from "@/utils/log";

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

const commSlice = createSlice({
  name: 'comm',
  initialState: {
    larksr: null,
    ui: null,
    showWebMenu: false,
    mobilePixelUnit: 1920 / 100,
    aggregatedStats: defaultAggregatedStats,
    isMobile: Capabilities.isMobile,
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
    // notifyBar: { timeout: -1, notify: {
    //   show: false,
    // 	msg: '',
	  //   level: 'INFO'
    // },},
    // modalAlert: { modalAlert: defalutModalAlert },
    // controlbar: defaultControlBar,
    // toast: { timeout: -1, toast: defaultToast, toastLevel: 0 },
    // settingInfoPannel: { settingInfo: defaulSettingInfo, },
    // stateModal: { stateModal: defaulStateModal, },
    // modalConfirm: { modalConfirm: defalutModalConfirm },
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
  },
  reducers: {
    setLarksr(state, actions) {
			state.larksr = actions.payload;
		},
    setUi(state, actions) {
      state.ui = actions.payload;
    },
    setShowWebMenu(state, actions) {
      state.showWebMenu = actions.payload;
    },
    resize(state) {
      // 浏览器窗口宽
      const screenOrientation = state.larksr ? state.larksr.screenState.screenOrientation : 'portrait'
      let screenW = screenOrientation === 'landscape' ? 
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
      state.mobilePixelUnit  = pixUnit;
    },
    setMobileControlBallPosition(state, actions) {
      state.mobileControlBallPosition = actions.payload;
    },
    
    setAggregatedStats(state, actions) {
      state.aggregatedStats = actions.payload;
    },
    setMenu(state, actions) {
      state.menu = actions.payload;
    },
    setJoyStick(state, actions) {
      state.joystick = actions.payload;
    },
    setVirtualKeyboard(state, actions) {
      state.vkeyboard = actions.payload;
    },
    setVmouseMode(state, actions) {
      state.vmouseMode = actions.payload;
    },
    
    setScaleMode(state, actions) {
      state.scaleMode = actions.payload;
    },
    resetScaleMode(state) {
      state.scaleMode = state.larksr.params.scaleMode;
    },
    setSyncClipboardParseEvent(state, actions) {
      state.syncClipboardParseEvent = actions.payload;
    },
    setShowAerialView(state, actions) {
      state.showAerialView = actions.payload;
    },    
    setMenubarPosition(state, actions) {
      state.menubarPosition = actions.payload;
    },    
    setInputMethodEnable(state, actions) {
      state.inputMethodEnable = actions.payload;
    },
    setInputMethodStart(state, actions) {
      state.inputMethodStart = actions.payload;
    },
    setControlBallInputMethod(state, actions) {
      state.controlBallInputMethod = actions.payload;
    },
    setMobileKeyboardType(state, actions) {
      state.mobileKeyboardType = actions.payload;
    },
    setPreComponentName(state, actions) {
      state.preComponentName = actions.payload;
    },
    setMobileWebMenuType(state, actions) {
      state.mobileWebMenuType = actions.payload;
    },
    setEnableChineseInput(state, actions) {
      state.enableChineseInput = actions.payload;
    },
    // keyboard,menu,joystick  同时只显示一个
    toggleVKeyboard(state) {
      state.vkeyboard = !state.vkeyboard;
        if (state.vkeyboard) {
          state.menu = false;
          state.joystick = false;
        }
    },
    toggleMenu(state) {
      state.menu = !state.menu;
      if (state.menu) {
        state.vkeyboard = false;
        state.joystick = false;
      }
    },
    toggleJoyStick(state, actions) {
      state.joystick = !state.joystick;
        if (state.joystick) {
          state.vkeyboard = false;
          state.menu = false;
        }
    },
    toggleVMouseMode(state) {
        if (state.vmouseMode == 'vmouse') {
          state.vmouseMode = 'pointer';
        } else {
          state.vmouseMode = 'vmouse';
        }
    },
    resetLocalization(state) {
      LocalizationLoader.init(state.larksr.params.language);
      state.ui = LocalizationLoader.ui;
    },
    setLocalization(state, action) {
      LocalizationLoader.init(state.larksr.params.language);
      state.ui = LocalizationLoader.ui;
    },
    setScaleToDefault(state) {
      state.scaleMode = state.larksr.params.scaleMode;
      resize(state);
    },
    setScaleToFitScreen(state) {
      state.scaleMode = ScaleMode.FIT_SCREEN;
      resize(state);
    },
    setScaleToFillStretch(state) {
      state.scaleMode = ScaleMode.FILL_STRETCH;
      resize(state);
    },
    toggleScaleToFitScreen(state) {
        if (ScaleMode.FIT_SCREEN === state.larksr.params.scaleMode) {
            return;
        }
        const isChangedScaledMode = state.larksr.screenState.scaleMode != state.larksr.params.scaleMode;
       
        if (isChangedScaledMode) {
          state.scaleMode = state.larksr.params.scaleMode;
        } else {
          state.scaleMode = ScaleMode.FIT_SCREEN;
        }
        resize(state);
    },
    toggleScaleToFillStretch(state) {
        if (ScaleMode.FILL_STRETCH === state.larksr.params.scaleMode) {
            return;
        }
        const isChangedScaledMode = state.larksr.screenState.scaleMode != state.larksr.params.scaleMode;
        if (isChangedScaledMode) {
          Log.info('resetScaleMode');
          state.larksr.scaleMode = state.larksr.params.scaleMode;
        } else {
          Log.info('setScaleMode');
          state.larksr.scaleMode = ScaleMode.FILL_STRETCH;
        }
        resize(state);
    },
    setFlipMouseWheel (state, actions) {
        if (state.larksr) {
            // const direction = larksr.params.mouseZoomDirection === 0 ? 1 : 0;
            // larksr.mouseZoomDirection = flip ? direction : larksr.params.mouseZoomDirection;
            // Log.info('flipMouseWheel', larksr.mouseZoomDirection, direction, flip);
            state.larksr.mouseZoomDirection = actions.payload;
        }
    },
    toggleSyncClipboardParseEvent(state) {
      state.syncClipboardParseEvent = !state.syncClipboardParseEvent;
        if (state.larksr) {
          state.larksr.op.enableParse = state.syncClipboardParseEvent;
        }
    },
    toggleInitCursorMode(state, actions) {
        if (state.larksr) {
          const initCursorMode = state.larksr.initCursorMode === 0 ? 1 : 0;
          state.larksr.initCursorMode = initCursorMode;
        }
    },
    toggleAerailView(state) {
      state.showAerialView = !state.showAerialView
    },
  }
})
// reduxjs toolkit 把reducer和actions合并在一起了
export const { setLarksr, setUi, setShowWebMenu, resize, setMobileControlBallPosition, setAggregatedStats, setMenu, setJoyStick, setVirtualKeyboard, setVmouseMode,setScaleMode, resetScaleMode, setSyncClipboardParseEvent, setShowAerialView, setMenubarPosition, setInputMethodEnable, setInputMethodStart, setControlBallInputMethod, setMobileKeyboardType, setPreComponentName, setMobileWebMenuType, setEnableChineseInput, toggleVKeyboard,
  toggleMenu, toggleJoyStick, toggleVMouseMode, resetLocalization, setLocalization, setScaleToDefault, setScaleToFitScreen, setScaleToFillStretch, toggleScaleToFitScreen, toggleScaleToFillStretch, setFlipMouseWheel, toggleSyncClipboardParseEvent, toggleInitCursorMode, toggleAerailView
   } = commSlice.actions;

export default commSlice.reducer