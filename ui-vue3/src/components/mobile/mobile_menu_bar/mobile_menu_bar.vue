<template>
  <div>
    <div v-if="commStore.enableMobileControlBall && commStore.showWebMenu" class="v-box" :style="mobilebarStyle">
    <div class="v-box" :style="mobilebarStyle">
    <div class="mobilebar" :style="mobilebarStyle">
      <div class="mobilebar-box">
        <div class="mobilebar-box-arrow">
          <i class="iconfont icon-arrow" @click.prevent="menubarShrinkFn"></i>
        </div>
        <div v-if="videoInput" class="mobilebar-box-item service">
          <i :class="videoPaused?'iconfont icon-camera':'iconfont icon-camera_1 check-color'" @click.prevent="toogleCamerabar"></i>
          <div class="service-camera" :style="cameraBarStyle">
            <i class="iconfont icon-more" @click.prevent="showCameraModal"></i>
            <i :class="videoPaused?'iconfont icon-camera_1 check-color':'iconfont icon-camera'" @click="toggleVideo"></i>
          </div>
        </div>
        <div v-if="audioInput" class="mobilebar-box-item service">
          <i :class="audioPaused?'iconfont icon-mic':'iconfont icon-mic_1 check_color'" @click.prevent="toggleMic"></i>
        </div>
        <div v-if="isLiveStream" class="mobilebar-box-item service" @click.prevent="streamFn">
          <i class="iconfont icon-stream"></i>
        </div>
        <div v-if="videoInput || audioInput || isLiveStream" class="menu-devider"></div>
        <div class="mobilebar-box-item" @click.prevent="changeTextInputFn">
          <i :class="commStore.enableChineseInput?'iconfont icon-shurufa':'iconfont icon-shurufa_off'"></i>
        </div>
        <div class="mobilebar-box-item mobilebar-box-game" :style="{'margin-top': '1rem'}" @click.prevent="gameIconClick">
          <i class="iconfont icon-game" ></i>
          <i class="iconfont icon-arrow game-arrow" :style="gameChildStyle"></i>
        </div>
        <div class="game-box" :style="gameChildStyle">
          <div class="game-box-item joystick-item" @click.prevent="commStore.toggleJoyStick">
            <i class="iconfont icon-joystick_1"></i>
            <i :class="commStore.joystick? 'check-color iconfont icon-joystick_2':'iconfont icon-joystick_2'"></i>
          </div>
          <div class="game-box-item">
            <i :class="!vmouseMode?'check-color iconfont icon-finger':'iconfont icon-finger'" @click.prevent="touchFingerClick"></i>
          </div>
          <div class="game-box-item mouse-item" @click="onSetMouseLeft">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M20 25C20 19.4772 24.4772 15 30 15V26C30 28.7614 27.7614 31 25 31H20V25Z" :fill="(mouseButton == 'left' && vmouseMode)?'#00B031':'#DDDDDD'"/>
              <rect x="20" y="15" width="20" height="30" rx="10" stroke="#DDDDDD" stroke-width="3"/>
              <rect x="27" y="21" width="6" height="8" rx="3" :fill="(mouseButton == 'left' && vmouseMode)?'#DDDDDD':'#999999'"/>
            </svg>
          </div>
          <div class="game-box-item mouse-item" @click="onSetMouseMid">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <rect x="20" y="15" width="20" height="30" rx="10" stroke="#DDDDDD" stroke-width="3"/>
              <rect x="27" y="21" width="6" height="8" rx="3" :fill="(mouseButton == 'mid' && vmouseMode)?'#00B031':'#999999'"/>
            </svg>
          </div>
          <div class="game-box-item mouse-item" @click="onSetMouseRight">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M40 25C40 19.4772 35.5228 15 30 15V26C30 28.7614 32.2386 31 35 31H40V25Z" :fill="(mouseButton == 'right' && vmouseMode)?'#00B031':'#DDDDDD'"/>
              <rect x="20" y="15" width="20" height="30" rx="10" stroke="#DDDDDD" stroke-width="3"/>
              <rect x="27" y="21" width="6" height="8" rx="3" :fill="(mouseButton == 'right' && vmouseMode)?'#DDDDDD':'#999999'"/>
            </svg>
          </div>
          <div v-if="showGameChild" class="game-box-item" style="margin-top: 0;">
            <i :class="commStore.vkeyboard?'check-color iconfont icon-keyboard':'iconfont icon-keyboard'" @click.prevent="commStore.toggleVKeyboard"></i>
          </div>
        </div>
        <div class="mobilebar-box-item">
          <i class="iconfont icon-menuBarIcon2" @click.prevent="restartFn"></i>
        </div>
        <div v-if="!isIOS" class="mobilebar-box-item">
          <i v-if="!commStore.isFullScreen" class="iconfont icon-menuBarIcon3" @click.prevent="onFullScreen"></i>
          <i v-if="commStore.isFullScreen" class="iconfont icon-menuBarIcon3_click" @click.prevent="onFullScreen"></i>
        </div>
        <div class="mobilebar-box-item">
          <i class="iconfont icon-menuBarIcon4" @click.prevent="showStates"></i>
        </div>
        <div class="mobilebar-box-item" @click.prevent="showSetting">
          <i class="iconfont icon-menuBarIcon5"></i>
        </div>
        <div class="mobilebar-box-item" @click.prevent="showHelp">
          <i class="iconfont icon-menuBarIcon6"></i>
        </div>
        <div class="mobilebar-box-close" @click.prevent="onQuit">
          <i class="iconfont icon-close"></i>
        </div>
      </div>
    </div>
    </div>
    </div>
    <!-- shrink -->
    <div v-if="commStore.enableMobileControlBall && commStore.showWebMenu" class="mobilebar-shrink" :style="mobilebarShrinkStyle">
      <div class="mobilebar-shrink-arrow">
        <i class="iconfont icon-arrow" @click.prevent="menubarShrinkFn"></i>
      </div>
    </div>
    <Help></Help>
    <States></States>
    <Camera></Camera>
    <Stream></Stream>
    <Setting></Setting>
    <JoyskickIndex v-if="commStore.joystick" />
    <Keyboard v-if="commStore.vkeyboard" />
    <VCursor v-if="enableVmouse" :useVMouse="vmouseMode" :mouseButton="mouseButton" v-on:exit="toggleVMouseMode" />
  </div>
</template>
<script setup>
import Log from "@/utils/log";
import { useCommStore } from '@/stores/comm.js';
import { useModalHelpStore } from '@/stores/modal_help.js';
import { useStateModalStore } from '@/stores/state_modal.js';
import { useModalStreamStore } from '@/stores/modal_stream.js';
import { useModalSettingStore } from '@/stores/modal_setting.js';
import { useModalCameraStore } from '@/stores/modal_camera.js';
import { useModalConfirmStore } from '@/stores/modal_confirm.js';
import { useToastStore } from '@/stores/toast.js'
import Unit from "@/utils/unit";
import Capabilities from '@/utils/capabilities';
import Help from '../modal_help/modal_help.vue';
import States from '../modal_states/modal_states.vue';
import JoyskickIndex from '../joystick_index/joystick_index.vue';
import Keyboard from '../keyboard/keyboardComponent.vue';
import VCursor from '../v_cursor/v_cursor.vue';
import Camera from '../modal_camera/camera_menu.vue';
import Stream from '../modal_stream/modal_stream.vue';
import Setting from '../modal_setting/modal_setting.vue';

const commStore = useCommStore();
const modalHelpStore = useModalHelpStore();
const stateModalStore = useStateModalStore();
const modalStreamStore = useModalStreamStore();
const modalSettingStore = useModalSettingStore();
const modalCameraStore = useModalCameraStore();
const modalConfirmStore = useModalConfirmStore();
const toastStore = useToastStore();


const mouseButton = ref('none');
const isIOS = Capabilities.os === 'iOS';
const showCamerabar = ref(false);
const showGameChild = ref(false);
const menubarShrink = ref(true);
const selecteDevice = ref('');
const devices = reactive({
  list: [
  { label: 'Front', deviceId: 'user', facingMode: 'user', },
  { label: 'Back', deviceId: 'environment', facingMode: 'environment', }
]});
const facingMode = ref('none');
const selecteAudioDevice = ref('');
const audioDevices = reactive({
  list: []
});

const larksr = computed(() => {
  return commStore.larksr;
});
const ui = computed(() => {
  return commStore.ui;
});



const isShowMobileHelp = computed(() => {
  return modalHelpStore.isShowMobileHelp;
});
const isShowMobileStateModal = computed(() => {
  return stateModalStore.isShowMobileStateModal;
});
const isShowMobileStream = computed(() => {
  return modalStreamStore.isShowMobileStream;
});
const isShowCameraModal = computed(() => {
  return modalCameraStore.isShowCameraModal;
});
const isShowMobileSettingModal = computed(() => {
  return modalSettingStore.isShowMobileSettingModal;
});
const enableVmouse = computed(() => {
  return commStore.vmouseMode != 'none';
});
const vmouseMode = computed(() => {
  return commStore.vmouseMode == 'vmouse';
});
const mobileCamera = computed(() => {
  return modalCameraStore.mobileCamera;
});



const mobilebarStyle = computed(() => {
  let obj = {};
      if(commStore.screenOrientation === 'landscape' || commStore.mobileForceLandScape) {
        obj = {
          'height': commStore.viewPort.height +'px',
          'right': right.value
        }
      } else {
        obj = {
          'height': 'auto',
          'top': '50%',
          'transform': 'translateY(-50%)',
          'right': right.value
        }
      }
      return obj
});
const right = computed(() => {
  if(isShowMobileHelp.value || isShowMobileStateModal.value || menubarShrink.value || isShowCameraModal.value || isShowMobileStream.value || isShowMobileSettingModal.value) {
      return '-6rem';
    } else {
      return 0;
    }
});
const mobilebarShrinkStyle = computed(() => {
  let obj = {};
    if(menubarShrink.value) {
      obj= {
        'height': commStore.viewPort.height +'px',
        'right': '0'
      }
    } else {
      obj = {
        'height': commStore.viewPort.height +'px',
        'right': '-6rem'
      }
    }
    return obj;
});
const cameraBarStyle = computed(() => {
  let obj= {};
  if(showCamerabar.value) {
    obj = {
      'left': 'calc(-8.5rem - 10px)'
    }
  } else {
    obj = {
      'left': '6rem'
    }
  }
  return obj;
});
const gameChildStyle = computed(() => {
  let obj= {};
  if(showGameChild.value) {
    obj = {
      'opacity': '1',
      'max-height': '50rem',
    }
  } else {
    obj = {
      'max-height': '0px',
      'opacity': '0',
      'z-index': '-1',
      'position': 'relative'
    }
  }
  return obj;
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
const isLiveStream = computed(() => {
  return larksr.value?.params.liveStreaming;
});
const videoInput = computed(() => {
  return larksr.value?.params.videoInput;
});
const audioInput = computed(() => {
  return larksr.value?.params.audioInput;
});

watch(mobileCamera,(val) => {
  if(!videoPaused.value) {
    openVideo();
  }
});
watch(isShowMobileHelp, (val) => {
  if(val) { if(showCamerabar.value) showCamerabar.value=false;}
});
watch(isShowMobileStateModal, (val) => {
  if(val) { if(showCamerabar.value) showCamerabar.value=false;}
});
watch(menubarShrink, (val) => {
  if(val) { if(showCamerabar.value) showCamerabar.value=false;}
});
watch(isShowCameraModal, (val) => {
  if(val) { if(showCamerabar.value) showCamerabar.value=false;}
});
watch(isShowMobileStream, (val) => {
  if(val) { if(showCamerabar.value) showCamerabar.value=false;}
});
watch(isShowMobileSettingModal, (val) => {
  if(val) { if(showCamerabar.value) showCamerabar.value=false;}
});


// 方法
const menubarShrinkFn = () => {
  menubarShrink.value= !menubarShrink.value;
  showCamerabar.value = false;
};
const onQuit = () => {
  // code 920 // 用户主动点击关闭按钮
  modalConfirmStore.showModalConfirm({ title: ui.value.quit, des: ui.value.quitTip, code: 920 })
  .then(()=>{
      Log.info('user confirm');
      Unit.quit();
  })
  .catch((e) => {
      Log.info('user cancle');
  });
};
const showHelp = () => {
  modalHelpStore.setIsShowMobileHelp(true);
};
const showStates = () => {
  stateModalStore.setIsShowMobileStateModal(true);
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
const onFullScreen = () => {
  if (!larksr.value) {
      return;
  }
  const { fullScreen } = larksr.value;
  if (fullScreen.isFullScreen) {
      fullScreen.exitFullscreen();
  } else {
      fullScreen.launchFullScreen();
  }
};
const toogleCamerabar = () => {
  showCamerabar.value = !showCamerabar.value;
};
const showCameraModal = () => {
  showCamerabar.value = false;
  modalCameraStore.setIsShowCameraModal(true);
};
const toggleVideo = () =>  {
  Log.info("toggleVideo", videoDeviceId.value);
  toogleCamerabar();
  if(!videoPaused.value) {
    larksr.value?.pauseVideoSending();
    // videoTrack.valueEnable = !videoPaused.value;
  } else {
    openVideo();
  }
};
const openVideo = () => {
  const device = devices.list?.filter(device => device.deviceId === selecteDevice.value)[0];
  let width = 0;
  let height = 0;
  Log.info('openVideo with device ',selecteDevice.value, device, devices.list, width, height, useFront.value);

  larksr.value.openVideo(false, "", width, height, useFront.value)
  .then((res) => {
      Log.info("open video success", res, videoTrack.value,selecteDevice.value);
      // videoTrack.valueEnable = !videoPaused.value;
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
  Log.info("toggleMic", audioDeviceId.value);
  if (!audioPaused.value) {
    larksr.value?.pauseAudioSending();
    // audioTrack.valueEnable = !audioPaused.value;
    // forceUpdate();
  } else {
    openAudio();
  }
};
const streamFn = () => {
  modalStreamStore.setIsShowMobileStream(true);
};
const gameIconClick = () => {
  showGameChild.value = !showGameChild.value;
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
const onSetMouseMid = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (mouseButton.value == 'mid') {
    toastStore.toastAct( { text: ui.value.touchMode, position: 2 });
    mouseButton.value = 'none';
    commStore.toggleVMouseMode();
  } else {
    if(!vmouseMode.value) commStore.toggleVMouseMode();
    toastStore.toastAct( { text: ui.value.mouseMid, position: 2 });
    mouseButton.value = 'mid';
  }
};
const onSetMouseRight = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (mouseButton.value == 'right') {
    toastStore.toastAct( { text: ui.value.touchMode, position: 2 });
    mouseButton.value = 'none';
    commStore.toggleVMouseMode();
  } else {
    if(!vmouseMode.value) commStore.toggleVMouseMode();
    nextTick(() => {
      toastStore.toastAct( { text: ui.value.mouseRight, position: 2 });
      mouseButton.value = 'right';
    })
  }
};
const showSetting = () => {
  modalSettingStore.setIsShowMobileSettingModal(true);
};
const changeTextInputFn = () => {
  const val = commStore.enableChineseInput;
  commStore.setEnableChineseInput(!val);
};

</script>
<style lang='scss' scoped>
@import 'mobile_menu_bar.scss';
</style>
