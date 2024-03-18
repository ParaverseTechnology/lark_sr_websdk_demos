<template>
  <div>
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
        <div v-if="videoInput || audioInput || isLiveStream || aivoicestatus" class="menu-devider"></div>
        <div class="mobilebar-box-item mobilebar-box-game" :style="{'margin-top': '1rem'}" @click.prevent="gameIconClick">
          <i class="iconfont icon-game" ></i>
          <i class="iconfont icon-arrow game-arrow" :style="gameChildStyle"></i>
        </div>
        <div class="game-box" :style="gameChildStyle">
          <div class="game-box-item joystick-item" @click.prevent="toggleJoyStick">
            <i class="iconfont icon-joystick_1"></i>
            <i :class="joystick? 'check-color iconfont icon-joystick_2':'iconfont icon-joystick_2'"></i>
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
            <i :class="vkeyboard?'check-color iconfont icon-keyboard':'iconfont icon-keyboard'" @click.prevent="toggleVKeyboard"></i>
          </div>
        </div>
        <div class="mobilebar-box-item">
          <i class="iconfont icon-menuBarIcon2" @click.prevent="restartFn"></i>
        </div>
        <div v-if="!isIOS" class="mobilebar-box-item">
          <i v-if="!isFullScreen" class="iconfont icon-menuBarIcon3" @click.prevent="onFullScreen"></i>
          <i v-if="isFullScreen" class="iconfont icon-menuBarIcon3_click" @click.prevent="onFullScreen"></i>
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
    <!-- shrink -->
    <div class="mobilebar-shrink" :style="mobilebarShrinkStyle">
      <div class="mobilebar-shrink-arrow">
        <i class="iconfont icon-arrow" @click.prevent="menubarShrinkFn"></i>
      </div>
    </div>
    <Help></Help>
    <States></States>
    <Camera></Camera>
    <Stream></Stream>
    <Setting></Setting>
    <JoyskickIndex v-if="joystick" />
    <Keyboard v-if="vkeyboard" />
    <VCursor v-if="enableVmouse" :useVMouse="vmouseMode" :mouseButton="mouseButton" v-on:exit="toggleVMouseMode" />
  </div>
</template>
<script>
import Log from "@/utils/log";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Unit from "@/utils/unit";
import Capabilities from '@/utils/capabilities';
import Help from '../modal_help/modal_help.vue';
import States from '../modal_states/modal_states.vue';
import JoyskickIndex from '../joystick_index/joystick_index';
import Keyboard from '../keyboard/keyboardComponent.vue';
import VCursor from '../v_cursor/v_cursor';
import Camera from '../modal_camera/camera_menu.vue';
import Stream from '../modal_stream/modal_stream.vue';
import Setting from '../modal_setting/modal_setting.vue';


export default {
  components: {
    Help,
    States,
    JoyskickIndex,
    Keyboard,
    VCursor,
    Camera,
    Stream,
    Setting
  },
  data () {
    return {
      mouseButton: 'none',
      isIOS: Capabilities.os === 'iOS',
      showCamerabar: false,
      showGameChild: false,
      menubarShrink: false,
      selecteDevice: '',
      devices: [
        { label: 'Front', deviceId: 'user', facingMode: 'user', }, 
        { label: 'Back', deviceId: 'environment', facingMode: 'environment', }
      ],
      facingMode: 'none',
      selecteAudioDevice: '',
      audioDevices: []

    }
  },
  computed: {
    mobilebarStyle() {
      let obj = {};
      // let right = 0;
      // if(this.isShowMobileHelp || this.isShowMobileStateModal || this.menubarShrink || this.isShowCameraModal || this.isShowMobileStream || this.isShowMobileSettingModal) {
      //   right = '-6rem';
      //   if(this.showCamerabar) this.showCamerabar=false;
      // }
      if(this.screenOrientation==='landscape' || this.mobileForceLandScape) {
        obj = {
          'height': this.viewPort.height +'px',
          'right': this.right
        }
      } else {
        obj = {
          'height': 'auto',
          'top': '50%',
          'transform': 'translateY(-50%)',
          'right': this.right
        }
      }
      return obj
    },
    right() {
      if(this.isShowMobileHelp || this.isShowMobileStateModal || this.menubarShrink || this.isShowCameraModal || this.isShowMobileStream || this.isShowMobileSettingModal) {
        return '-6rem';
      } else {
        return 0;
      }
    },
    mobilebarShrinkStyle() {
      let obj = {};
      if(this.menubarShrink) {
        obj= {
          'height': this.viewPort.height +'px',
          'right': '0'
        }
      } else {
        obj = {
          'height': this.viewPort.height +'px',
          'right': '-6rem'
        }
      }
      return obj;
    },
    cameraBarStyle() {
      let obj= {};
      if(this.showCamerabar) {
        obj = {
          'left': 'calc(-8.5rem - 10px)'
        }
      } else {
        obj = {
          'left': '6rem'
        }
      }
      return obj;
    },
    gameChildStyle() {
      let obj= {};
      if(this.showGameChild) {
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
    },
    videoPaused() {
      return this.larksr?.videoPaused;
    },
    videoTrack() {
      return this.larksr?.videoTrack;
    },
    videoDeviceId() {
      return this.larksr?.videoDeviceId;
    },
    useFront() {
      if (this.mobileCamera === 'user') {
          return true;
      } else {
        return false
      }
    },
    audioPaused() {
      return this.larksr?.audioPaused;
    },
    audioTrack() {
      return this.larksr?.audioTrack;
    },
    isLiveStream() {
      return this.larksr?.params.liveStreaming;
    },
    videoInput() {
      return this.larksr?.params.videoInput;
    },
    audioInput() {
      return this.larksr?.params.audioInput;
    },
    ...mapGetters({
        screenOrientation: 'screenOrientation',
        viewPort: 'viewPort',
        mobilePixelUnit: 'mobilePixelUnit',
        isFullScreen: "isFullScreen",
    }),
    ...mapState({
      larksr: state => state.larksr, 
      ui: state => state.ui,
      joystick: state => state.joystick,
      vkeyboard: state => state.vkeyboard,
      mobileForceLandScape: state => state.mobileForceLandScape,
      isShowMobileHelp: state => state.modalHelp.isShowMobileHelp,
      isShowMobileStateModal: state => state.stateModal.isShowMobileStateModal,
      isShowMobileStream: state => state.modalStream.isShowMobileStream,
      isShowCameraModal: state => state.modalCamera.isShowCameraModal,
      isShowMobileSettingModal: state => state.modalSetting.isShowMobileSettingModal,
      vmouseMode: state => { return state.vmouseMode == 'vmouse'; },
      enableVmouse: state => { return state.vmouseMode != 'none'; },
      mobileCamera: state => state.modalCamera.mobileCamera,
    })
  },
  mounted() {},
  watch: {
    mobileCamera: function(val) {
      if(!this.videoPaused) {
        this.openVideo();
      }
    },
    isShowMobileHelp: function(val) {
      if(val) { if(this.showCamerabar) this.showCamerabar=false;}
    },
    isShowMobileStateModal: function(val) {
      if(val) { if(this.showCamerabar) this.showCamerabar=false;}
    },
    menubarShrink: function(val) {
      if(val) { if(this.showCamerabar) this.showCamerabar=false;}
    },
    isShowCameraModal: function(val) {
      if(val) { if(this.showCamerabar) this.showCamerabar=false;}
    },
    isShowMobileStream: function(val) {
      if(val) { if(this.showCamerabar) this.showCamerabar=false;}
    },
    isShowMobileSettingModal: function(val) {
      if(val) { if(this.showCamerabar) this.showCamerabar=false;}
    },
  },
  methods: {
    menubarShrinkFn() {
      this.menubarShrink= !this.menubarShrink;
      this.showCamerabar = false;
    },
    onQuit() {
      // code 920 // 用户主动点击关闭按钮
      this.confirm({ title: '退出应用', des: '确认退出应用', code: 920 })
      .then(()=>{
          Log.info('user confirm');
          Unit.quit();
      })
      .catch((e) => {
          Log.info('user cancle');
      });
    },
    showHelp() {
      this.setIsShowMobileHelp(true);
    },
    showStates() {
      this.setIsShowMobileStateModal(true);
    },
		restartFn() {
			this.showModalConfirm({title: '重启应用', des: '确认重启应用'})
			.then(()=>{
        Log.info('restart Appli confirm');
        this.larksr?.restartCloudApp();
      })
      .catch((e) => {
        Log.info('restart Appli cancle');
      });
		},
    onFullScreen() {
      if (!this.larksr) {
          return;
      }
      const { fullScreen } = this.larksr;
      if (fullScreen.isFullScreen) {
          fullScreen.exitFullscreen();
      } else {
          fullScreen.launchFullScreen();
      }
    },
    toogleCamerabar() {
      this.showCamerabar = !this.showCamerabar;
    },
    showCameraModal() {
      this.showCamerabar = false;
      this.setIsShowCameraModal(true);
    },
    toggleVideo() {
      Log.info("toggleVideo", this.videoDeviceId);
      this.toogleCamerabar();
      if(!this.videoPaused) {
        this.larksr?.pauseVideoSending();
        // this.videoTrackEnable = !this.videoPaused;
      } else {
        this.openVideo();
      }
    },
    openVideo() {
      const device = this.devices?.filter(device => device.deviceId === this.selecteDevice)[0];
      let width = 0;
      let height = 0;
      Log.info('openVideo with device ', this.selecteDevice, device, this.devices, width, height, this.useFront);

      this.larksr.openVideo(false, "", width, height, this.useFront)
      .then((res) => {
          Log.info("open video success", res, this.videoTrack, this.selecteDevice);
          // this.videoTrackEnable = !this.videoPaused;
      })
      .catch((e) => {
        Log.warn("open video failed.", e);
        if (window.location.href.indexOf("https") == -1) {
            this.toast({ text: this.ui.videoUseHttps, position: 1, level: 3 });
        } else {
            this.toast({ text: JSON.stringify(e), position: 1, level: 3 });
        }
      });
    },
    async openAudio() {
      await this.larksr.getConnectedAudioinputDevices()
      .then((res) => {
          Log.info("audio devices", res);
          this.audioDevices = res;
          if (!this.selecteDevice) {
            this.selecteDevice = res[0].deviceId;
          }
      })
      .catch((e) => {
          Log.warn("no audio device found ", e);
      })
      Log.info('openAudio with device ', this.selecteAudioDevice);
      this.larksr.openAudio(this.selecteAudioDevice)
      .then((res) => {
          Log.info("open audio success", res, this.audioTrack, this.selecteAudioDevice);
          // this.audioTrackEnable = !this.audioPaused;
      })
      .catch((e) => {
          Log.warn("open audio failed.", e);
          if (window.location.href.indexOf("https") == -1) {
              this.toast({ text: this.ui.audioUseHttps, position: 1, level: 3 });
          } else {
              this.toast({ text: JSON.stringify(e), position: 1, level: 3 });
          }
      });
    },
    toggleMic() {
      Log.info("toggleMic", this.audioDeviceId);
      if (!this.audioPaused) {
        this.larksr?.pauseAudioSending();
        // this.audioTrackEnable = !this.audioPaused;
        this.$forceUpdate();
      } else {
        this.openAudio();
      }
    },
    streamFn() {
      this.setIsShowMobileStream(true);
    },
    gameIconClick() {
      this.showGameChild = !this.showGameChild;
    },
    onSetMouseLeft(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.mouseButton == 'left') {
        this.mouseButton = 'none';
        this.toggleVMouseMode();
        this.toast({ text: '您已切换到触摸模式', position: 2 });
      } else {
        if(!this.vmouseMode) this.toggleVMouseMode();
        this.$nextTick(() => {
          this.toast({ text: '您已切换到鼠标左键', position: 2 });
          this.mouseButton = 'left';
        })
      }
    },
    touchFingerClick() {
      if (this.vmouseMode) {
        this.toast({ text: '您已切换到触摸模式', position: 2 });
        this.mouseButton = 'none';
        this.toggleVMouseMode();
      } else {
        this.toggleVMouseMode();
        this.toast({ text: '您已切换到鼠标左键', position: 2 });
        this.mouseButton = 'left';
      }
    },
    onSetMouseMid(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.mouseButton == 'mid') {
        this.toast({ text: '您已切换到触摸模式', position: 2 });
        this.mouseButton = 'none';
        this.toggleVMouseMode();
      } else {
        if(!this.vmouseMode) this.toggleVMouseMode();
        this.toast({ text: '您已切换到鼠标滚轮', position: 2 });
        this.mouseButton = 'mid';
      }
    },
    onSetMouseRight(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.mouseButton == 'right') {
        this.toast({ text: '您已切换到触摸模式', position: 2 });
        this.mouseButton = 'none';
        this.toggleVMouseMode();
      } else {
        if(!this.vmouseMode) this.toggleVMouseMode();
        this.$nextTick(() => {
          this.toast({ text: '您已切换到鼠标右键', position: 2 });
          this.mouseButton = 'right';
        })
      }
    },
    showSetting() {
      this.setIsShowMobileSettingModal(true);
    },
    ...mapMutations({
      setIsShowMobileHelp: 'modalHelp/setIsShowMobileHelp',
      setIsShowMobileStateModal: 'stateModal/setIsShowMobileStateModal',
      setIsShowCameraModal: 'modalCamera/setIsShowCameraModal',
      setIsShowMobileStream: 'modalStream/setIsShowMobileStream',
      setIsShowMobileSettingModal: 'modalSetting/setIsShowMobileSettingModal'
    }),
    ...mapActions({
      toggleVKeyboard: 'toggleVKeyboard',
      confirm: "modalConfirm/showModalConfirm",
      showModalConfirm: 'modalConfirm/showModalConfirm',
      toggleJoyStick: 'toggleJoyStick',
      toggleVMouseMode: 'toggleVMouseMode',
      toast: "toast/toast"
    }),
  }
}
</script>
<style lang='scss' scoped>
@import 'mobile_menu_bar.scss';
</style>
