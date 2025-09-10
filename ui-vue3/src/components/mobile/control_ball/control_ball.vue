<template>
  <div class="mobile-ui" v-on:contextmenu="onContextmenu" >
      <div v-if="commStore.enableMobileControlBall && commStore.showWebMenu" class="pop pop-toggle"
          :style="positionStyle"
          draggable="true"
          v-on:touchstart="onDragStart"
          v-on:touchmove="onDrag"
          v-on:touchend="onDragEnd">
          <div class="pop-icon">
              <!-- <template> -->
                <div v-if="controlBarUrl" class="pop-icon-bg"  :style="{'backgroundImage': `url(${controlBarUrl})`}"></div>
                <i v-else class="iconfont icon-cb"></i>
              <!-- </template> -->
              <span v-if="showTimeoutInfo" class="rttInfo rttBad rttBadInfo">{{ui.badNetwork}}</span>
              <div v-if="isShowControlPanel" class="pop-panel" style="position: absolute;bottom: 0;right: 0;">
                <div class="pop-panel-box">
                  <div class="pop-panel-top pop-panel-top-part">
                    <div v-if="videoInput" @click.prevent="toogleCameraPanelFn">
                      <i :class="videoPaused?'iconfont icon-camera':'iconfont icon-camera_1 check-color'"></i>
                      <p>{{ ui.camera }}</p>
                    </div>
                    <div v-if="audioInput" @click.prevent="toggleMic">
                      <i :class="audioPaused?'iconfont icon-mic':'iconfont icon-mic_1 check_color'"></i>
                      <p>{{ ui.mic }}</p>
                    </div>
                    <div v-if="isLiveStream" @click.prevent="streamFn">
                      <i class="iconfont icon-stream"></i>
                      <p>{{ ui.liveStream}}</p>
                    </div>
                  </div>
                  <div v-if="videoInput || audioInput || isLiveStream" class="customContentAlert-divider"></div>
                  <div class="pop-panel-bottom">
                    <div @click.prevent="showStates">
                      <i class="iconfont icon-menuBarIcon4"></i>
                      <p>{{ ui.net}}</p>
                    </div>
                    <div @click.prevent="toogleGamePanelFn">
                      <i class="iconfont icon-game"></i>
                      <p>{{ ui.tools }}</p>
                    </div>
                    <div @click.prevent="showSetting">
                      <i class="iconfont icon-menuBarIcon5"></i>
                      <p>{{ ui.setting }}</p>
                    </div>
                    <div @click.prevent="restartFn">
                      <i class="iconfont icon-menuBarIcon2"></i>
                      <p>{{ ui.restart }}</p>
                    </div>
                    <div v-if="!isIOS" @click.prevent="onFullScreen">
                      <i v-if="!commStore.isFullScreen" class="iconfont icon-menuBarIcon3"></i>
                      <i v-if="commStore.isFullScreen" class="iconfont icon-menuBarIcon3_click"></i>
                      <p>{{!commStore.isFullScreen? ui.fullScreen :ui.fullScreenExit}}</p>
                    </div>
                    <div @click.prevent="onQuit">
                      <i class="iconfont icon-login"></i>
                      <p>{{ ui.exit }}</p>
                    </div>
                    <div @click.prevent="showHelp">
                      <i class="iconfont icon-menuBarIcon6"></i>
                      <p>{{ ui.help }}</p>
                    </div>
                    <div @click.prevent="lockCBFn">

                      <i v-if="isFix" class="iconfont icon-lock"></i>
                      <i v-if="!isFix" class="iconfont icon-unlock"></i>
                      <p>{{!isFix?ui.lock:ui.unlock}}</p>
                    </div>
                    <div @click="changeTextInputFn">
                      <i :class="commStore.enableChineseInput?'iconfont icon-shurufa':'iconfont icon-shurufa_off'"></i>
                      <p>{{ui.chineseInput}}</p>
                    </div>
                    <div @click.prevent="closePopPanel">
                      <i class="iconfont icon-guanbi"></i>
                      <p>{{ ui.close }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 摄像头 -->
              <div v-if="isShowCameralPanel" class="camera-panel">
                <div class="camera-panel-item">
                  <i @click.prevent="cameraClickFn('user')" :class="mobileCamera==='user'&&!videoPaused?'iconfont icon-video_f check_color':'iconfont icon-video_f'"></i>
                  <p>{{ ui.cameraFront }}</p>
                </div>
                <div class="camera-panel-item">
                  <i @click.prevent="toogleCameraPanelFn" class="iconfont icon-back"></i>
                </div>
                <div @click.prevent="cameraClickFn('environment')" class="camera-panel-item">
                  <i :class="mobileCamera==='environment'&&!videoPaused?'iconfont icon-video_b check_color':'iconfont icon-video_b'"></i>
                  <p>{{ ui.cameraBack }}</p>
                </div>
              </div>
              <!-- {{ ui.tools }} -->
              <div v-if="isShowGamePanel" class="game-panel">
                <div class="game-panel-item">
                  <i :class="!vmouseMode?'check-color iconfont icon-finger':'iconfont icon-finger'" @click.prevent="touchFingerClick"></i>
                  <p>{{ ui.touch }}</p>
                </div>
                <div class="game-panel-item-row">
                  <div class="game-panel-item" @click="toogleMousePanelFn">
                    <template v-if="mouseButton == 'mid'">
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <rect x="20" y="15" width="20" height="30" rx="10" :stroke="(vmouseMode)?'#00B031':'#DDD'" stroke-width="3"/>
                        <rect x="27" y="21" width="6" height="8" rx="3" :fill="(vmouseMode)?'#00B031':'#999999'"/>
                      </svg>
                    </template>
                    <template v-else-if="mouseButton == 'left'">
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <path d="M20 25C20 19.4772 24.4772 15 30 15V26C30 28.7614 27.7614 31 25 31H20V25Z" :fill="(vmouseMode)?'#00B031':'#DDDDDD'"/>
                        <rect x="20" y="15" width="20" height="30" rx="10" :stroke="(vmouseMode)?'#00B031':'#DDD'" stroke-width="3"/>
                        <rect x="27" y="21" width="6" height="8" rx="3" :fill="(vmouseMode)?'#DDDDDD':'#999999'"/>
                      </svg>
                    </template>
                    <template v-else-if="mouseButton == 'right'">
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <path d="M40 25C40 19.4772 35.5228 15 30 15V26C30 28.7614 32.2386 31 35 31H40V25Z" :fill="(vmouseMode)?'#00B031':'#DDDDDD'"/>
                        <rect x="20" y="15" width="20" height="30" rx="10" :stroke="(vmouseMode)?'#00B031':'#DDD'" stroke-width="3"/>
                        <rect x="27" y="21" width="6" height="8" rx="3" :fill="(vmouseMode)?'#DDDDDD':'#999999'"/>
                      </svg>
                    </template>
                    <template v-else>
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <rect x="20" y="15" width="20" height="30" rx="10" :stroke="(vmouseMode)?'#00B031':'#DDD'" stroke-width="3"/>
                        <rect x="27" y="21" width="6" height="8" rx="3" :fill="(vmouseMode)?'#00B031':'#999999'"/>
                      </svg>
                    </template>
                    <p>{{ ui.mouse }}</p>
                  </div>
                  <div class="game-panel-item">
                    <i @click="toogleGamePanelFn" class="iconfont icon-back"></i>
                  </div>
                  <div class="game-panel-item">
                    <i :class="commStore.vkeyboard?'check-color iconfont icon-keyboard':'iconfont icon-keyboard'" @click.prevent="vKeyboardClick"></i>
                    <p>{{ ui.keyboard }}</p>
                  </div>
                </div>
                <div class="game-panel-item joystick-item" @click.prevent="commStore.toggleJoyStick">
                  <i class="iconfont icon-joystick_1">
                    <i :class="commStore.joystick? 'check-color iconfont icon-joystick_2':'iconfont icon-joystick_2'"></i>
                  </i>
                  <p>{{ ui.joystick }}</p>
                </div>
              </div>
              <!-- 鼠标面板 -->
              <div v-if="isShowMousePanel" class="mouse-panel">
                <div class="mouse-panel-item" @click.prevent="onSetMouseMid">
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <rect x="20" y="15" width="20" height="30" rx="10" :stroke="(mouseButton == 'mid' && vmouseMode)?'#00B031':'#DDD'" stroke-width="3"/>
                    <rect x="27" y="21" width="6" height="8" rx="3" :fill="(mouseButton == 'mid' && vmouseMode)?'#00B031':'#999999'"/>
                  </svg>
                  <p>{{ ui.mouseMidKey }}</p>
                </div>
                <div class="mouse-panel-item-row">
                  <div class="mouse-panel-item" @click.prevent="onSetMouseLeft">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <path d="M20 25C20 19.4772 24.4772 15 30 15V26C30 28.7614 27.7614 31 25 31H20V25Z" :fill="(mouseButton == 'left' && vmouseMode)?'#00B031':'#DDDDDD'"/>
                      <rect x="20" y="15" width="20" height="30" rx="10" :stroke="(mouseButton == 'left' && vmouseMode)?'#00B031':'#DDD'" stroke-width="3"/>
                      <rect x="27" y="21" width="6" height="8" rx="3" :fill="(mouseButton == 'left' && vmouseMode)?'#DDDDDD':'#999999'"/>
                    </svg>
                    <p>{{ ui.mouseLeftKey }}</p>
                  </div>
                  <div class="mouse-panel-item">
                    <i @click="toogleMousePanelFn" class="iconfont icon-back"></i>
                  </div>
                  <div class="mouse-panel-item" @click.prevent="onSetMouseRight">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <path d="M40 25C40 19.4772 35.5228 15 30 15V26C30 28.7614 32.2386 31 35 31H40V25Z" :fill="(mouseButton == 'right' && vmouseMode)?'#00B031':'#DDDDDD'"/>
                      <rect x="20" y="15" width="20" height="30" rx="10" :stroke="(mouseButton == 'right' && vmouseMode)?'#00B031':'#DDD'" stroke-width="3"/>
                      <rect x="27" y="21" width="6" height="8" rx="3" :fill="(mouseButton == 'right' && vmouseMode)?'#DDDDDD':'#999999'"/>
                    </svg>
                    <p>{{ ui.mouseRightKey }}</p>
                  </div>
                </div>
              </div>
          </div>
      </div>
      <Help></Help>
      <States></States>
      <Stream></Stream>
      <Setting></Setting>
      <VCursor v-if="enableVmouse" :useVMouse="vmouseMode" :mouseButton="mouseButton" @exit="commStore.toggleVMouseMode" />
      <JoyskickIndex v-if="commStore.joystick" />
      <Keyboard v-if="commStore.vkeyboard" />
  </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import { useModalHelpStore } from '@/stores/modal_help.js';
import { useStateModalStore } from '@/stores/state_modal.js';
import { useModalStreamStore } from '@/stores/modal_stream.js';
import { useModalSettingStore } from '@/stores/modal_setting.js';
import { useModalCameraStore } from '@/stores/modal_camera.js';
import { useModalConfirmStore } from '@/stores/modal_confirm.js';
import { useToastStore } from '@/stores/toast.js'
import JoyskickIndex from '../joystick_index/joystick_index.vue';
import Keyboard from '../keyboard/keyboardComponent.vue';
import VCursor from '../v_cursor/v_cursor.vue';
import Log from '@/utils/log';
import Unit from '@/utils/unit';
import Load from '@/load';
import Capabilities from '@/utils/capabilities';
import Help from '../modal_help/modal_help.vue';
import States from '../modal_states/modal_states.vue';
import Stream from '../modal_stream/modal_stream.vue';
import Setting from '../modal_setting/modal_setting.vue';
import controlBarUrl from '@/assets/images/mobile/icon_logo_bg.png';


const commStore = useCommStore();
const modalHelpStore = useModalHelpStore();
const stateModalStore = useStateModalStore();
const modalStreamStore = useModalStreamStore();
const modalSettingStore = useModalSettingStore();
const modalCameraStore = useModalCameraStore();
const modalConfirmStore = useModalConfirmStore();
const toastStore = useToastStore();


const isIOS = Capabilities.os === 'iOS';
const popToggled = ref(true);
const showTimeoutInfo = ref(false);
const rttCheckTimeout = ref(-1);
const rttLimitTimeout = ref(-1);
const lastRttLimitToast = ref(0);
const dragStarted = ref(false);
const dragStartPosition = reactive({
    x: 0,
    y: 0,
});
const offsetPositon = reactive({
    x: 0,
    y: 0,
});
const position = reactive({
    x: 0,
    y: 0,
});
const isFix = ref(false);//是否锁定
const isShrink = ref(true);//控制球是否收缩
const timer = ref(null);//控制球自动收缩定时器
const shrinkPositionPre = ref(null);
const isShowControlPanel = ref(false);//是否展示控制面板
const selecteDevice = ref('');
const devices = reactive({
  list: [
  { label: 'Front', deviceId: 'user', facingMode: 'user', },
  { label: 'Back', deviceId: 'environment', facingMode: 'environment', }
]});
const selecteAudioDevice = ref('');
const audioDevices = reactive({
  list: []
});
const isShowCameralPanel = ref(false); //选择摄像头面板
const isShowGamePanel = ref(false); //工具面板
const mouseButton = ref('none');
const isShowMousePanel = ref(false); // 鼠标面板


const larksr = computed(() => {
  return commStore.larksr;
});
// formate states
const states = computed(() => {
  const aggregatedStats = commStore.aggregatedStats;
  let rttms = aggregatedStats.currentRoundTripTime * 1000;
  let rtt = rttms.toFixed(2);

  return {
    hasPacketsLost: aggregatedStats.packetsLost != 0,
    packetsLost: aggregatedStats.packetsLost.toFixed(2),
    packetsLostPerc: aggregatedStats.packetsLostPerc.toFixed(3) + "%",
    hasBitrate: aggregatedStats.bitrate != 0,
    bitrate: (aggregatedStats.bitrate / 1000).toFixed(2),
    hasCurrentRoundTripTime: aggregatedStats.currentRoundTripTime != 0,
    currentRoundTripTime: rtt,
    rttMs: rttms,
  };
});



const menu = computed(() => {
  return commStore.menu;
});

const ui = computed(() => {
  return commStore.ui;
});

const vmouseMode = computed(() => {
  return commStore.vmouseMode == 'vmouse';
});
const enableVmouse = computed(() => {
  return commStore.vmouseMode != 'none';
});



const aerialViewCheck = computed(() => {
  return modalSettingStore.aerialViewCheck;
});
const mobileCamera = computed(() => {
  return modalCameraStore.mobileCamera;
});



const positionStyle = computed(() => {
  if(modalHelpStore.isShowMobileHelp ||
    stateModalStore.isShowMobileStateModal ||
    modalStreamStore.isShowMobileStream ||
    modalSettingStore.isShowMobileSettingModal) {
    return {
      top: commStore.mobileControlBallPosition.y + "px",
      left: viewPort.value.width+ "px",
      transform: 'scale(0)',
      transition: dragStarted.value?'none':'all .3s'
    }
  } else {
    return {
      top: commStore.mobileControlBallPosition.y + "px",
      left: commStore.mobileControlBallPosition.x + "px",
      transform: 'scale(1)',
      transition: dragStarted.value?'none':'all .3s'
    }
  }
});
const isLiveStream = computed(() => {
  return larksr.value?.params.liveStreaming;
});
const videoInput = computed(() => {
  return larksr.value?.params.videoInput;
});
const audioInput = computed(() => {
  return larksr.value?.params.audioInput;
});
const videoPaused = computed(() => {
  return larksr.value?.videoPaused;
});
const videoTrack = computed(() => {
  return larksr.value?.videoTrack;
});
const videoDeviceId = computed(() => {
  return larksr.value?.videoDeviceId;
});
const useFront = computed(() => {
  if (mobileCamera.value === 'user') {
      return true;
  } else {
    return false
  }
});
const audioPaused = computed(() => {
  return larksr.value?.audioPaused;
});
const audioTrack = computed(() => {
  return larksr.value?.audioTrack;
});



const viewPort = computed(() => {
  return commStore.viewPort;
});


// 方法
const closePopPanel = () => {
  isShowControlPanel.value = false;
  if(!isFix.value && !isShowControlPanel.value) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
    timer.value = setTimeout(() => {
      controlBallShrink()
      // 清除定时器
      clearTimeout(timer.value);
    },2000)
  }
};
const onFullScreen = () => {
  if (!larksr.value) { return; }
  const { fullScreen } = larksr.value;
  if (fullScreen.isFullScreen) {
      fullScreen.exitFullscreen();
  } else {
      fullScreen.launchFullScreen();
  }
};
const lockCBFn = () => {
  isFix.value = !isFix.value;
};
const showHelp = () => {
  modalHelpStore.setIsShowMobileHelp(true);
};
const restartFn = () => {
  modalConfirmStore.showModalConfirm({title: ui.value.restart, des: ui.value.restartTip})
  .then(()=>{
    Log.info('restart Appli confirm');
    larksr.value?.restartCloudApp();
  })
  .catch((e) => {
    Log.info('restart Appli cancle');
  });
};
const showStates = () => {
  stateModalStore.setIsShowMobileStateModal(true);
};
const showSetting = () => {
  modalSettingStore.setIsShowMobileSettingModal(true);
};
const streamFn = () => {
  modalStreamStore.setIsShowMobileStream(true);
};
const onQuit = () => {
  modalConfirmStore.showModalConfirm({ title: ui.value.quit, des: '确认是否退出应用', code: 920 })
  .then(()=>{
      Log.info('user confirm');
      Unit.quit();
  })
  .catch((e) => {
      Log.info('user cancle');
  });
};
const openAudio = async() => {
  await larksr.value.getConnectedAudioinputDevices()
  .then((res) => {
      Log.info("audio devices", res);
      audioDevices.list = res;
      if (!selecteDevice.value) {
        selecteDevice.value = res[0].deviceId;
      }
  })
  .catch((e) => {
      Log.warn("no audio device found ", e);
  })
  Log.info('openAudio with device ', selecteAudioDevice.value);
  larksr.value.openAudio(selecteAudioDevice.value)
  .then((res) => {
      Log.info("open audio success", res, audioTrack.value, selecteAudioDevice.value);
      // audioTrack.valueEnable = !audioPaused.value;
  })
  .catch((e) => {
      Log.warn("open audio failed.", e);
      if (window.location.href.indexOf("https") == -1) {
        toastStore.toastAct( { text: ui.value.audioUseHttps, position: 1, level: 3 });
      } else {
        toastStore.toastAct( { text: JSON.stringify(e), position: 1, level: 3 });
      }
  });
};
const toggleMic = () => {
  Log.info("toggleMic", this.audioDeviceId);
  if (!audioPaused.value) {
    larksr.value?.pauseAudioSending();
    // audioTrack.valueEnable = !audioPaused.value;
    // forceUpdate();
  } else {
    openAudio();
  }
};
const toogleCameraPanelFn = () => {
  isShowCameralPanel.value = !isShowCameralPanel.value;
};
const cameraClickFn = (type) => {
  if(mobileCamera.value === type) {
    modalCameraStore.setMobileCamera('none');
  } else {
    modalCameraStore.setMobileCamera(type);
  }
};
const openVideo = () => {
  const device = devices.list?.filter(device => device.deviceId === selecteDevice.value)[0];
  let width = 0;
  let height = 0;
  Log.info('openVideo with device ', selecteDevice.value, device, devices.list, width, height, useFront.value);

  larksr.value.openVideo(false, selecteDevice.value, width, height, useFront.value)
  .then((res) => {
      Log.info("open video success", res, videoTrack.value, selecteDevice.value);
      // videoTrack.valueEnable = !this.videoPaused;
  })
  .catch((e) => {
    Log.warn("open video failed.", e);
    if (window.location.href.indexOf("https") == -1) {
        toastStore.toastAct( { text: ui.value.videoUseHttps, position: 1, level: 3 });
    } else {
        toastStore.toastAct( { text: JSON.stringify(e), position: 1, level: 3 });
    }
  });
};
const toogleGamePanelFn = () => {
  isShowGamePanel.value = !isShowGamePanel.value;
};
const touchFingerClick = () => {
  if (vmouseMode.value) {
    toastStore.toastAct( { text: ui.value.touchMode, position: 2 });
    mouseButton.value = 'none';
    commStore.toggleVMouseMode();
  } else {
    commStore.toggleVMouseMode();
    toastStore.toastAct( { text: ui.value.mouseLeft, position: 2 });
    mouseButton.value = 'left';
  }
};
const vKeyboardClick = () => {
  commStore.toggleVKeyboard();
  isShowGamePanel.value = false;
  isShowControlPanel.value = false;
};
const toogleMousePanelFn = () => {
  isShowMousePanel.value = !isShowMousePanel.value;
};
const onSetMouseMid = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (mouseButton.value == 'mid') {
    mouseButton.value = 'none';
    commStore.toggleVMouseMode();
    toastStore.toastAct( { text: ui.value.touchMode, position: 2 });
  } else {
    if(!vmouseMode.value) commStore.toggleVMouseMode();
    toastStore.toastAct( { text: ui.value.mouseMid, position: 2 });
    mouseButton.value = 'mid';
  }
};
const onSetMouseLeft = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (mouseButton.value == 'left') {
    mouseButton.value = 'none';
    commStore.toggleVMouseMode();
    toastStore.toastAct( { text: ui.value.touchMode, position: 2 });
  } else {
    if(!vmouseMode.value) commStore.toggleVMouseMode();
    nextTick(() => {
      toastStore.toastAct( { text: ui.value.mouseLeft, position: 2 });
      mouseButton.value = 'left';
    })
  }
};
const onSetMouseRight = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (mouseButton.value == 'right') {
    mouseButton.value = 'none';
    commStore.toggleVMouseMode();
    toastStore.toastAct( { text: ui.value.touchMode, position: 2 });
  } else {
    if(!vmouseMode.value) commStore.toggleVMouseMode();
    nextTick(() => {
      toastStore.toastAct( { text: ui.value.mouseRight, position: 2 });
      mouseButton.value = 'right';
    })
  }
};
// block default context menu event.
const onContextmenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  Log.info("onContextmenu");
};
const onRttCheck = () => {
  if (states.value.rttMs > Load.rttLimit &&
    rttLimitTimeout.value == -1 &&
    Date.now() - lastRttLimitToast.value > Load.rttLimitInterval * 1000) {
    // Log.info("on rtt check", states.value.rttMs, Load.rttLimit, rttLimitTimeout.value, this.rttCheckTimeout, Load.rttLimitInterval);
    showTimeoutInfo.value = true;
    rttLimitTimeout.value = window.setTimeout(() => {
      // Log.info("on rtt check timeout", states.value.rttMs, Load.rttLimit, rttLimitTimeout.value, this.rttCheckTimeout, Load.rttLimitInterval);
      showTimeoutInfo.value = false;
      rttLimitTimeout.value = -1;
      lastRttLimitToast.value = Date.now();
    }, 8 * 1000);
  }
};
const onDragStart = (e) => {
  // console.log('on drag start')
  if(isShrink.value) return;//收缩状态禁止拖拽
  if(timer.value) clearTimeout(timer.value);
  // e.preventDefault();
    // 注意旋转屏幕时坐标系的变换
    if (commStore.screenOrientation == 'landscape') {
        const offsetRect = Unit.getBoundingClientRect(e.target);
        offsetPositon.x = e.changedTouches[0].clientY - offsetRect.top;
        offsetPositon.y = offsetRect.right - e.changedTouches[0].clientX;
        

        Log.info("on drag start", offsetRect, e.changedTouches[0].clientX,
            offsetRect.right - e.changedTouches[0].clientX,
            e.changedTouches[0].clientY - offsetRect.top);
    } else {
        const offsetViewPort = Unit.getOffsetViewport(e.target);
        offsetPositon.x = e.changedTouches[0].clientX - offsetViewPort.offsetX;
        offsetPositon.y = e.changedTouches[0].clientY - offsetViewPort.offsetY;
        
    }
    dragStartPosition.x = e.changedTouches[0].clientX;
    dragStartPosition.y = e.changedTouches[0].clientY;
    
};
const onDrag = (e) => {
  // console.log('on drag')
    e.preventDefault();
    if(isShrink.value || isShowControlPanel.value) return;//收缩状态禁止拖拽
    
    if (!dragStarted.value) {
        let disx = e.changedTouches[0].clientX - dragStartPosition.x;
        let disy = e.changedTouches[0].clientY - dragStartPosition.y;
        let distance = Math.sqrt(disx*disx + disy*disy);
        if (distance < 40) {
            return;
        }else {
          if(!isShrink.value)dragStarted.value = true;
        }
    }
    // 清除定时器
    if(timer.value) clearTimeout(timer.value);
    let x,y;
    let curPositionX,curPositionY;

    // 注意旋转屏幕时坐标系的变换
    if (commStore.screenOrientation == 'landscape') {
      const limitWidth = viewPort.value.height-Unit.getMobliePixelWidth(110, commStore.mobilePixelUnit);
      const limitHeight = viewPort.value.width-Unit.getMobliePixelWidth(110, commStore.mobilePixelUnit);
      curPositionX = e.changedTouches[0].clientY - offsetPositon.x;
      curPositionY = viewPort.value.height - e.changedTouches[0].clientX - offsetPositon.y;

      if(curPositionX > limitHeight){
        x = limitHeight;
      } else if(curPositionX <0) {
        x = 0;
      } else {
        x = curPositionX;
      }
      if(curPositionY > limitWidth) {
        y = limitWidth;
      } else if(curPositionY <0) {
        y = 0;
      } else {
        y = curPositionY;
      }
    } else {
      const limitWidth = viewPort.value.width-Unit.getMobliePixelWidth(110, commStore.mobilePixelUnit);
      const limitHeight = viewPort.value.height-Unit.getMobliePixelWidth(110, commStore.mobilePixelUnit);
        curPositionX = e.changedTouches[0].clientX - offsetPositon.x;
        curPositionY = e.changedTouches[0].clientY - offsetPositon.y;
        if(curPositionX > limitWidth){
          x = limitWidth;
        } else if(curPositionX <0) {
          x = 0;
        } else {
          x = curPositionX;
        }
        if(curPositionY > limitHeight) {
          y = limitHeight;
        } else if(curPositionY <0) {
          y = 0;
        } else {
          y = curPositionY;
        }
    }
    
    commStore.setMobileControlBallPosition({
        x: x,
        y: y,
    });
    // Log.info("on drag control ball", e);
};
const onDragEnd = (e) => {
  // Log.info('on drag end',dragStarted.value)
    // e.preventDefault();
    // const { viewPort, screenOrientation } = this;
    if (dragStarted.value) { // 拖拽
      if(isShrink.value) return;//收缩状态禁止拖拽
        // 注意旋转屏幕时坐标系的变换
        // if (screenOrientation == 'landscape') {
        //     this.setMobileControlBallPosition({
        //         x: e.changedTouches[0].clientY - this.offsetPositon.x,
        //         y: viewPort.height - e.changedTouches[0].clientX - this.offsetPositon.y,
        //     });
        // } else {
        //     this.setMobileControlBallPosition({
        //         x: e.changedTouches[0].clientX - this.offsetPositon.x,
        //         y: e.changedTouches[0].clientY - this.offsetPositon.y,
        //     });
        // }
        dragStarted.value = false;
        dragStartPosition.x = 0;
        dragStartPosition.y = 0;
        if(!isFix.value && !isShowControlPanel.value) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
          timer.value = setTimeout(() => {
            controlBallShrink()
            // 清除定时器
            clearTimeout(timer.value);
          },2000)
        }
    } else { // 点击
      if(isShrink.value) {
        controlBallPopup();
      } else {
        // 展开面板
        if(!isShowControlPanel.value) {
          isShowControlPanel.value = true;
        } else {
          if(!isFix.value && !isShowControlPanel.value) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
            timer.value = setTimeout(() => {
              controlBallShrink()
              // 清除定时器
              clearTimeout(timer.value);
            },2000)
          }
        }
      }
      dragStarted.value = false;
    }
};
// 收缩控制球
const controlBallShrink = () => {
  const x = (commStore.mobileControlBallPosition.x > viewPort.value.width / 2)
            ?viewPort.value.width - 48/2
            :'-'+48/2;
  commStore.setMobileControlBallPosition({
    x: x,
    y: positionStyle.value.y
  });
  isShrink.value = true;
};
// 弹出控制球
const controlBallPopup = () => {
  if(commStore.mobileControlBallPosition.x > 0) {
    commStore.setMobileControlBallPosition({
      x: (viewPort.value.width - 48 * 2),
      y: commStore.mobileControlBallPosition.y
    });
  } else {
    commStore.setMobileControlBallPosition({
      x:  48*2,
      y: commStore.mobileControlBallPosition.y
    });
  }
  isShrink.value = false;
  if(!isFix.value && !isShowControlPanel.value) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
    timer.value = setTimeout(() => {
      controlBallShrink()
      // 清除定时器
      clearTimeout(timer.value);
    },2000)
  }
};
const updateControl = async() => {
  if (!larksr.value) {
      return;
  }
  const res = await larksr.value?.getTouchCtrMapping();
  Log.info("updateControl ", res);
  if (res.mouseMode && res.mouseMode == 1) {
      commStore.toggleVMouseMode();
  }
};
const showInput = () => {
  commStore.setInputMethodEnable( true);
  commStore.setInputMethodStart( true);
};
const changeTextInputFn = () => {
  const val = commStore.enableChineseInput;
  commStore.setEnableChineseInput(!val);
};

watch(aerialViewCheck, (val) => {
  if(val) {
    isShowControlPanel.value = false;
  }
});
watch(mobileCamera, (val) => {
  if(val === 'none') {
    larksr.value?.pauseVideoSending();
  } else {
    openVideo();
  }
});

// 初始控制球位置
const top = (viewPort.value.height - 48 * 2);
const left = (viewPort.value.width - 48 / 2);
commStore.setMobileControlBallPosition({
    x: left,
    y: top,
});
onMounted(() => {
  rttCheckTimeout.value =  window.setInterval(onRttCheck, 1000);
  // this.appKey = Load.appKey;
})


onUnmounted(() => {
  if (rttCheckTimeout.value != -1) {
      window.clearInterval(rttCheckTimeout.value);
  }
  if (rttLimitTimeout.value != -1) {
      window.clearInterval(rttLimitTimeout.value);
  }
  if(timer.value) clearTimeout(timer.value);
})
</script>
<style lang="scss" scoped>
@import 'control_ball.scss';
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
