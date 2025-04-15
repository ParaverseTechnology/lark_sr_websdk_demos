<template>
  <div class="mobile-ui" v-on:contextmenu="onContextmenu" >
      <div v-if="enableMobileControlBall && showWebMenu" class="pop pop-toggle"
          :style="positionStyle"
          draggable="true"
          v-on:touchstart="onDragStart"
          v-on:touchmove="onDrag"
          v-on:touchend="onDragEnd">
          <div class="pop-icon">
              <template>
                <div v-if="controlBarUrl" class="pop-icon-bg"  :style="{'background-image': 'url('+controlBarUrl+')'}"></div>
                <i v-else class="iconfont icon-cb"></i>
              </template>
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
                      <i v-if="!isFullScreen" class="iconfont icon-menuBarIcon3"></i>
                      <i v-if="isFullScreen" class="iconfont icon-menuBarIcon3_click"></i>
                      <p>{{!isFullScreen? ui.fullScreen :ui.fullScreenExit}}</p>
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
                    <div @click="closePopPanel">
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
                    <i :class="vkeyboard?'check-color iconfont icon-keyboard':'iconfont icon-keyboard'" @click.prevent="vKeyboardClick"></i>
                    <p>{{ ui.keyboard }}</p>
                  </div>
                </div>
                <div class="game-panel-item joystick-item" @click.prevent="toggleJoyStick">
                  <i class="iconfont icon-joystick_1">
                    <i :class="joystick? 'check-color iconfont icon-joystick_2':'iconfont icon-joystick_2'"></i>
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
      <VCursor v-if="enableVmouse" :useVMouse="vmouseMode" :mouseButton="mouseButton" @exit="toggleVMouseMode" />
      <JoyskickIndex v-if="joystick" />
      <Keyboard v-if="vkeyboard" />
  </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
}                          from 'vuex';
import JoyskickIndex       from '../joystick_index/joystick_index';
import Keyboard            from '../keyboard/keyboardComponent.vue';
import VCursor             from '../v_cursor/v_cursor';
import Log                 from '@/utils/log';
import Unit                from '@/utils/unit';
import Load                from '@/load';
import Capabilities from '@/utils/capabilities';
import Help from '../modal_help/modal_help.vue';
import States from '../modal_states/modal_states.vue';
import Stream from '../modal_stream/modal_stream.vue';
import Setting from '../modal_setting/modal_setting.vue';

export default {
  components: {
    Help,
    States,
    Stream,
    Setting,
      JoyskickIndex,
      Keyboard,
      VCursor
  },
  data() {

      return {
          controlBarUrl: require('@/assets/images/mobile/icon_logo_bg.png'),
          isIOS: Capabilities.os === 'iOS',
          popToggled: true,
          showTimeoutInfo: false,
          rttCheckTimeout: -1,
          rttLimitTimeout: -1,
          lastRttLimitToast: 0,
          dragStarted: false,
          dragStartPosition: {
              x: 0,
              y: 0,
          },
          offsetPositon: {
              x: 0,
              y: 0,
          },
          position: {
              x: 0,
              y: 0,
          },
          isFix: false,//是否锁定
          isShrink: true,//控制球是否收缩
          timer: null,//控制球自动收缩定时器
          shrinkPositionPre: null,
          isShowControlPanel: false,//是否展示控制面板
          selecteDevice: '',
          devices: [
            { label: 'Front', deviceId: 'user', facingMode: 'user', },
            { label: 'Back', deviceId: 'environment', facingMode: 'environment', }
          ],
          selecteAudioDevice: '',
          audioDevices: [],
          isShowCameralPanel: false, //选择摄像头面板
          isShowGamePanel: false, //工具面板
          mouseButton: 'none',
          isShowMousePanel: false, // 鼠标面板
      }
  },
  computed: {
      positionStyle() {
        if(this.isShowMobileHelp ||
          this.isShowMobileStateModal ||
          this.isShowMobileStream ||
          this.isShowMobileSettingModal) {
          return {
            top: this.mobileControlBallPosition.y + "px",
            left: this.viewPort.width+ "px",
            transform: 'scale(0)',
            transition: this.dragStarted?'none':'all .3s'
          }
        } else {
          return {
            top: this.mobileControlBallPosition.y + "px",
            left: this.mobileControlBallPosition.x + "px",
            transform: 'scale(1)',
            transition: this.dragStarted?'none':'all .3s'
          }
        }
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
      ...mapState({
        larksr: (state) => state.larksr,
        // formate states
        states: (state) => {
          const { aggregatedStats, } = state;
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
        },
        mobileControlBallPosition: state => state.mobileControlBallPosition,
        vkeyboard: state => state.vkeyboard,
        menu: state => state.menu,
        joystick: state => state.joystick,
        ui: state => state.ui,
        screenOrientation: state => state.screenOrientation,
        enableMobileControlBall: state => { return state.enableMobileControlBall; },
        vmouseMode: status => { return status.vmouseMode == 'vmouse'; },
        enableVmouse: status => { return status.vmouseMode != 'none'; },
        enableRttIcon: state => state.enableRttIcon,
        isShowMobileHelp: state => state.modalHelp.isShowMobileHelp,
        isShowMobileStateModal: state => state.stateModal.isShowMobileStateModal,
        isShowMobileStream: state => state.modalStream.isShowMobileStream,
        isShowMobileSettingModal: state => state.modalSetting.isShowMobileSettingModal,
        aerialViewCheck: state => state.modalSetting.aerialViewCheck,
        mobileCamera: state => state.modalCamera.mobileCamera,
        showWebMenu: (state) => state.showWebMenu,
      }),
      ...mapGetters({
          screenOrientation: 'screenOrientation',
          appliParams: 'appliParams',
          viewPort: 'viewPort',
          mobilePixelUnit: 'mobilePixelUnit',
          isFullScreen: "isFullScreen",
      })
  },
  methods: {
    closePopPanel() {
      this.isShowControlPanel = false;
      if(!this.isFix && !this.isShowControlPanel) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
        this.timer = setTimeout(() => {
          this.controlBallShrink();
          // 清除定时器
          clearTimeout(this.timer);
        },2000)
      }
    },
    onFullScreen() {
      if (!this.larksr) { return; }
      const { fullScreen } = this.larksr;
      if (fullScreen.isFullScreen) {
          fullScreen.exitFullscreen();
      } else {
          fullScreen.launchFullScreen();
      }
    },
    lockCBFn() {
      this.isFix = !this.isFix;
    },
    showHelp() {
      this.setIsShowMobileHelp(true);
    },
		restartFn() {
			this.showModalConfirm({title: this.ui.restart, des: this.ui.restartTip})
			.then(()=>{
        Log.info('restart Appli confirm');
        this.larksr?.restartCloudApp();
      })
      .catch((e) => {
        Log.info('restart Appli cancle');
      });
		},
    showStates() {
      this.setIsShowMobileStateModal(true);
    },
    showSetting() {
      this.setIsShowMobileSettingModal(true);
    },
    streamFn() {
      this.setIsShowMobileStream(true);
    },
    onQuit() {
      this.showModalConfirm({ title: this.ui.quit, des: '确认是否退出应用', code: 920 })
      .then(()=>{
          Log.info('user confirm');
          Unit.quit();
      })
      .catch((e) => {
          Log.info('user cancle');
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
    toogleCameraPanelFn() {
      this.isShowCameralPanel = !this.isShowCameralPanel;
    },
    cameraClickFn(type) {
      if(this.mobileCamera === type) {
        this.setMobileCamera('none');
      } else {
        this.setMobileCamera(type);
      }
    },
    openVideo() {
      const device = this.devices?.filter(device => device.deviceId === this.selecteDevice)[0];
      let width = 0;
      let height = 0;
      Log.info('openVideo with device ', this.selecteDevice, device, this.devices, width, height, this.useFront);

      this.larksr.openVideo(false, this.selecteDevice, width, height, this.useFront)
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
    toogleGamePanelFn() {
      this.isShowGamePanel = !this.isShowGamePanel;
    },
    touchFingerClick() {
      if (this.vmouseMode) {
        this.toast({ text: this.ui.touchMode, position: 2 });
        this.mouseButton = 'none';
        this.toggleVMouseMode();
      } else {
        this.toggleVMouseMode();
        this.toast({ text: this.ui.mouseLeft, position: 2 });
        this.mouseButton = 'left';
      }
    },
    vKeyboardClick() {
      this.toggleVKeyboard();
      this.isShowGamePanel = false;
      this.isShowControlPanel = false;
    },
    toogleMousePanelFn() {
      this.isShowMousePanel = !this.isShowMousePanel;
    },
    onSetMouseMid(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.mouseButton == 'mid') {
        this.mouseButton = 'none';
        this.toggleVMouseMode();
        this.toast({ text: this.ui.touchMode, position: 2 });
      } else {
        if(!this.vmouseMode) this.toggleVMouseMode();
        this.toast({ text: this.ui.mouseMid, position: 2 });
        this.mouseButton = 'mid';
      }
    },
    onSetMouseLeft(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.mouseButton == 'left') {
        this.mouseButton = 'none';
        this.toggleVMouseMode();
        this.toast({ text: this.ui.touchMode, position: 2 });
      } else {
        if(!this.vmouseMode) this.toggleVMouseMode();
        this.$nextTick(() => {
          this.toast({ text: this.ui.mouseLeft, position: 2 });
          this.mouseButton = 'left';
        })
      }
    },
    onSetMouseRight(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.mouseButton == 'right') {
        this.mouseButton = 'none';
        this.toggleVMouseMode();
        this.toast({ text: this.ui.touchMode, position: 2 });
      } else {
        if(!this.vmouseMode) this.toggleVMouseMode();
        this.$nextTick(() => {
          this.toast({ text: this.ui.mouseRight, position: 2 });
          this.mouseButton = 'right';
        })
      }
    },
    // block default context menu event.
    onContextmenu(e) {
      e.preventDefault();
      e.stopPropagation();
      Log.info("onContextmenu");
    },
      onRttCheck() {
        if (this.states.rttMs > Load.rttLimit &&
          this.rttLimitTimeout == -1 &&
          Date.now() - this.lastRttLimitToast > Load.rttLimitInterval * 1000) {
          // Log.info("on rtt check", this.states.rttMs, Load.rttLimit, this.rttLimitTimeout, this.rttCheckTimeout, Load.rttLimitInterval);
          this.showTimeoutInfo = true;
          this.rttLimitTimeout = window.setTimeout(() => {
            // Log.info("on rtt check timeout", this.states.rttMs, Load.rttLimit, this.rttLimitTimeout, this.rttCheckTimeout, Load.rttLimitInterval);
            this.showTimeoutInfo = false;
            this.rttLimitTimeout = -1;
            this.lastRttLimitToast = Date.now();
          }, 8 * 1000);
        }
      },
      onDragStart(e) {
        // console.log('on drag start')
        if(this.isShrink) return;//收缩状态禁止拖拽
        if(this.timer) clearTimeout(this.timer);
        // e.preventDefault();
          const { screenOrientation } = this;
          // 注意旋转屏幕时坐标系的变换
          if (screenOrientation == 'landscape') {
              const offsetRect = Unit.getBoundingClientRect(e.target);
              this.offsetPositon = {
                  x: e.changedTouches[0].clientY - offsetRect.top,
                  y: offsetRect.right - e.changedTouches[0].clientX,
              }
              Log.info("on drag start", offsetRect, e.changedTouches[0].clientX,
                  offsetRect.right - e.changedTouches[0].clientX,
                  e.changedTouches[0].clientY - offsetRect.top);
          } else {
              const offsetViewPort = Unit.getOffsetViewport(e.target);
              this.offsetPositon = {
                  x: e.changedTouches[0].clientX - offsetViewPort.offsetX,
                  y: e.changedTouches[0].clientY - offsetViewPort.offsetY,
              }
          }
          this.dragStartPosition = {
              x: e.changedTouches[0].clientX,
              y: e.changedTouches[0].clientY,
          }
      },
      onDrag(e) {
        // console.log('on drag')
          e.preventDefault();
          if(this.isShrink || this.isShowControlPanel) return;//收缩状态禁止拖拽
          const {
              viewPort,
              screenOrientation
          } = this;
          if (!this.dragStarted) {
              let disx = e.changedTouches[0].clientX - this.dragStartPosition.x;
              let disy = e.changedTouches[0].clientY - this.dragStartPosition.y;
              let distance = Math.sqrt(disx*disx + disy*disy);
              if (distance < 40) {
                  return;
              }else {
                if(!this.isShrink)this.dragStarted = true;
              }
          }
          // 清除定时器
          if(this.timer) clearTimeout(this.timer);
          let x,y;
          let curPositionX,curPositionY;

          // 注意旋转屏幕时坐标系的变换
          if (screenOrientation == 'landscape') {
            const limitWidth = viewPort.height-Unit.getMobliePixelWidth(110, this.mobilePixelUnit);
            const limitHeight = viewPort.width-Unit.getMobliePixelWidth(110, this.mobilePixelUnit);
            curPositionX = e.changedTouches[0].clientY - this.offsetPositon.x;
            curPositionY = viewPort.height - e.changedTouches[0].clientX - this.offsetPositon.y;

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
            const limitWidth = viewPort.width-Unit.getMobliePixelWidth(110, this.mobilePixelUnit);
            const limitHeight = viewPort.height-Unit.getMobliePixelWidth(110, this.mobilePixelUnit);
             curPositionX = e.changedTouches[0].clientX - this.offsetPositon.x;
             curPositionY = e.changedTouches[0].clientY - this.offsetPositon.y;
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

          this.setMobileControlBallPosition({
              x: x,
              y: y,
          });
          // Log.info("on drag control ball", e);
      },
      onDragEnd(e) {
        // Log.info('on drag end',this.dragStarted)
          // e.preventDefault();
          const { viewPort, screenOrientation } = this;
          if (this.dragStarted) { // 拖拽
            if(this.isShrink) return;//收缩状态禁止拖拽
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
              this.dragStarted = false;
              this.dragStartPosition = {
                  x: 0,
                  y: 0,
              }
              if(!this.isFix && !this.isShowControlPanel) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
                this.timer = setTimeout(() => {
                  this.controlBallShrink();
                  // 清除定时器
                  clearTimeout(this.timer);
                },2000)
              }
          } else { // 点击
            if(this.isShrink) {
              this.controlBallPopup();
            } else {
              // 展开面板
              if(!this.isShowControlPanel) {
                this.isShowControlPanel = true;
              } else {
                if(!this.isFix && !this.isShowControlPanel) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
                  this.timer = setTimeout(() => {
                    this.controlBallShrink();
                    // 清除定时器
                    clearTimeout(this.timer);
                  },2000)
                }
              }
            }
            this.dragStarted = false;
          }
      },
      // 收缩控制球
      controlBallShrink() {
        const x = (this.mobileControlBallPosition.x > this.viewPort.width / 2)
                  ?this.viewPort.width - 48/2
                  :'-'+48/2;
        this.setMobileControlBallPosition({
          x: x,
          y: this.positionStyle.y
        });
        this.isShrink = true;
      },
      // 弹出控制球
      controlBallPopup() {
        if(this.mobileControlBallPosition.x > 0) {
          this.setMobileControlBallPosition({
            x: (this.viewPort.width - 48 * 2),
            y: this.mobileControlBallPosition.y
          })
        } else {
          this.setMobileControlBallPosition({
            x:  48*2,
            y: this.mobileControlBallPosition.y
          })
        }
        this.isShrink = false;
        if(!this.isFix && !this.isShowControlPanel) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
          this.timer = setTimeout(() => {
            this.controlBallShrink();
            // 清除定时器
            clearTimeout(this.timer);
          },2000)
        }
      },
      async updateControl() {
        if (!this.larksr) {
            return;
        }
        const res = await this.larksr?.getTouchCtrMapping();
        Log.info("updateControl ", res);
        if (res.mouseMode && res.mouseMode == 1) {
            this.toggleVMouseMode();
        }
      },
      showInput() {
          this.setInputMethodEnable(true);
          this.setInputMethodStart(true);
      },
      ...mapMutations({
          setMobileControlBallPosition: 'setMobileControlBallPosition',
          setInputMethodStart: "setInputMethodStart",
          setInputMethodEnable: 'setInputMethodEnable',
          setIsShowMobileHelp: 'modalHelp/setIsShowMobileHelp',
          setIsShowMobileStateModal: 'stateModal/setIsShowMobileStateModal',
          setIsShowMobileSettingModal: 'modalSetting/setIsShowMobileSettingModal',
          setIsShowMobileStream: 'modalStream/setIsShowMobileStream',
          setMobileCamera: 'modalCamera/setMobileCamera',
      }),
      ...mapActions({
          resize: 'resize',
          toggleScaleToFitScreen: 'toggleScaleToFitScreen',
          toggleScaleToFillStretch: 'toggleScaleToFillStretch',
          toggleState: 'stateModal/toggleState',
          toggleVMouseMode: 'toggleVMouseMode',
          toggleVKeyboard: 'toggleVKeyboard',
          toggleModalSetup: 'toggleModalSetup',
          showModalAlert: 'modalAlert/showModalAlert',
          showModalConfirm: 'modalConfirm/showModalConfirm',
          toggleInitCursorMode: 'toggleInitCursorMode',
          toggleMenu: 'toggleMenu',
          toggleJoyStick: 'toggleJoyStick',
          toast: "toast/toast",
          toggleVoiceChat: 'toggleVoiceChat',
      }),
  },
  watch: {
    aerialViewCheck: function(val) {
      if(val) {
        this.isShowControlPanel = false;
      }
    },
    mobileCamera: function(val) {
      if(val === 'none') {
        this.larksr?.pauseVideoSending();
      } else {
        this.openVideo();
      }
    }
  },
  created() {
    // 初始控制球位置
    const top = (this.viewPort.height - 48 * 2);
    const left = (this.viewPort.width - 48 / 2);
    this.setMobileControlBallPosition({
        x: left,
        y: top,
    });
  },
  mounted() {
      this.rttCheckTimeout =  window.setInterval(this.onRttCheck, 1000);
      this.appKey = Load.appKey;
      // this.updateControl();
  },
  beforeDestroy() {
      if (this.rttCheckTimeout != -1) {
          window.clearInterval(this.rttCheckTimeout);
      }
      if (this.rttLimitTimeout != -1) {
          window.clearInterval(this.rttLimitTimeout);
      }
      if(this.timer) clearTimeout(this.timer);
  }
}
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
