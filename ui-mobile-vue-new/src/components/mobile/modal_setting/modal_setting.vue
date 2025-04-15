<template>
  <div>
    <div class="mobile-modal" :style="settingStyle" ref="modal">
      <div class="mobile-modal-title">
        <i class="iconfont icon-arrow" @click="closeModal"></i>
        <span class="mobile-modal-title-text">
          {{ui.setting}}
        </span>
      </div>
      <div class="setting-content">
        <!-- 画质 -->
        <div>
          <div class="setting-content-row" style="margin-bottom: 1.89rem;">
            <span>{{ ui.quality }}</span>
            <div @click.prevent="showQualityModalFn">
              <span class="setting-tag tag-code setting-tag-check">{{frameRate}}</span>
              <span class="setting-tag setting-tag-check">{{codeRate}}</span>
              <i class="el-icon-caret-right"></i>
            </div>
          </div>
          <div class="setting-content-row">
            <span @click="qualityClick('0')" :class="{'quality-tag': true, 'quality-check-tag': frameRate===60&&codeRate===8000}">{{ ui.quality1 }}</span>
            <span @click="qualityClick('1')" :class="{'quality-tag': true, 'quality-check-tag': frameRate===60&&codeRate===10000}">{{ ui.quality2 }}</span>
            <span @click="qualityClick('2')" :class="{'quality-tag': true, 'quality-check-tag': frameRate===60&&codeRate===20000}">{{ ui.quality3 }}</span>
            <span @click="qualityClick('3')" :class="{'quality-tag': true, 'quality-check-tag': frameRate===60&&codeRate===50000}">{{ ui.quality4 }}</span>
          </div>
        </div>
        <div class="customContentAlert-divider"></div>
        <div class="setting-content-row">
          <span>{{ ui.aerial }}</span>
          <PvtSwitch v-model="checked" @change="aerialCheckedChange"/>
        </div>
        <div class="customContentAlert-divider"></div>
        <div class="setting-content-row">
          <span>放大手势与滚轮</span>
          <div>
            <span @click="setFlipMouseWheel(1)" :class="{'setting-tag':true,'setting-tag-check':isFlipMouseWheel}">上滚</span>
            <span @click="setFlipMouseWheel(0)" :class="{'setting-tag':true,'setting-tag-check':!isFlipMouseWheel}" style="margin-left: 0.95rem;">下滚</span>
          </div>
        </div>
        <div class="customContentAlert-divider"></div>
        <!-- 分辨率 -->
        <div class="setting-content-row">
          <span>{{ui.liveRes}}</span>
          <div @click="showResolutionRatioFn">
            <span class="setting-tag setting-tag-check tag-code">{{resolution.sublabel?resolution.sublabel:(resolution.width + ' x' + resolution.height)}}</span>
            <i class="el-icon-caret-right"></i>
          </div>
        </div>
        <div class="customContentAlert-divider"></div>
        <template v-if="isInteractiveMode">
          <div class="setting-content-row">
            <span>{{ ui.showPlayerList }}</span>
            <PvtSwitch v-model="playerListChecked" @change="togglePlayerList"/>
          </div>
          <div class="customContentAlert-divider"></div>
        </template>
        <!-- 音量 -->
        <div v-if="!isIOS" class="setting-content-volmue">
          <span class="iconfont">&#xe606;</span>
          <div>
            <Slider v-on:change="onVolmueChange" />
          </div>
        </div>
      </div>
    </div>
    <Quality v-if="isShowQualityModalForSetting" :codeRate="codeRate" :frameRate="frameRate" @sendCodeRate="receiveCodeRate" @sendFrameRate="receiveFrameRate"></Quality>
    <resolutionRatioVue v-if="isShowResolutionRatioModalForSetting" :resolution="resolution" @sendResolution="receiveResolution" :newResolutionsItem="newResolutionsItem"></resolutionRatioVue>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Log from '@/utils/log';
import Quality from '../components/codeRateAndFrameRate.vue';
import resolutionRatioVue from '../components/resolutionRatio.vue';
import PvtSwitch from '../../switch_pvt/switch_pvt'
import Slider from '../../slider/slider';
import Capabilities from '@/utils/capabilities';
export default {
  components: {
    Quality,
    resolutionRatioVue,
    PvtSwitch,
    Slider
  },
  data () {
    return {
      isIOS: Capabilities.os === 'iOS',
      resolutions: [
        { width: 4096, height: 1080 },
        { width: 4096, height: 2160, sublabel: '4K' },
        { width: 3840, height: 2160 },
        { width: 3840, height: 1080 },
        { width: 2560, height: 1440 },
        { width: 2048, height: 1536, sublabel: '2K' },
        { width: 1920, height: 1080, sublabel: 'Default' },
        { width: 1920, height: 1440 },
        { width: 1600, height: 900 },
        { width: 1366, height: 768 },
        { width: 1280, height: 720, sublabel: 'HD' },
        { width: 1280, height: 600 },
        { width: 2180, height: 3840 },
        { width: 1080, height: 1920 },
        { width: 720, height: 1280 },
        { width: 1536, height: 2048 },
      ],
      newResolutionsItem: null
    }
  },
  computed: {
    settingStyle() {
      let obj = {};
      if(this.screenOrientation==='landscape' || this.mobileForceLandScape) {
        obj = {
          'width': '34.31rem',
          'height': this.viewPort.height +'px',
          'right': this.isShowMobileSettingModal ? '0' : '-'+ '34.31rem'
        }
      } else {
        obj = {
          'width': '100%',
          'height': this.viewPort.height +'px',
          'right': this.isShowMobileSettingModal ? '0' : '-'+ '100%'
        }
      }
      return obj
    },
    // 鸟瞰模式勾选框
    checked: {
      get() {
        return this.aerialViewCheck;
      },
      set() {}
    },
    // 同步本地剪贴板勾选框
    cipboardParseChecked: {
      get() {
         return this.syncClipboardParseEvent;
      },
      set() {}
    },
    // 是否显示玩家列表勾选框
    playerListChecked: {
      get() {
        return this.playerMode.showPlayerList;
      },
      set() {}
    },
    // 码率
    codeRate() {
      return this.coderate;
    },
    // 帧率
    frameRate() {
      return this.fps;
    },
    // 分辨率
    resolution() {
      return this.resolution;
    },
    ...mapGetters({
      screenOrientation: 'screenOrientation',
      viewPort: 'viewPort',
      mobilePixelUnit: 'mobilePixelUnit',
      isFlipMouseWheel: "isFlipMouseWheel",
      isInteractiveMode: 'playerMode/isInteractiveMode',
    }),
    ...mapState({
      larksr: state => state.larksr,
      ui: state => state.ui,
      playerMode: state => state.playerMode,
      mobileForceLandScape: state => state.mobileForceLandScape,
      isShowMobileSettingModal: state => state.modalSetting.isShowMobileSettingModal,
      aerialViewCheck: state => state.modalSetting.aerialViewCheck,
      syncClipboardParseEvent: state => state.syncClipboardParseEvent,
      coderate: state => state.modalSetting.coderate,
      fps: state => state.modalSetting.fps,
      resolution: state => state.modalSetting.resolution,
      isShowQualityModalForSetting: state => state.modalStream.isShowQualityModalForSetting,
      isShowResolutionRatioModalForSetting: state => state.modalStream.isShowResolutionRatioModalForSetting
    })
  },
  methods: {
    closeModal() {
      this.setIsShowMobileSettingModal(false);
    },
    receiveCodeRate(val) {
      this.coderateChange(val);
      this.larksr.setVideoBitrateKbps(val);
    },
    receiveFrameRate(val) {
      this.codeFpsChange(val);
      this.larksr.setVideoFps(val);
    },
    qualityClick(type) {
      if(this.frameRate!==60)this.receiveFrameRate(60);
      switch(type) {
        case '0':
          this.receiveCodeRate(8000);
          break;
        case'1':
          this.receiveCodeRate(10000);
          break;
        case '2':
          this.receiveCodeRate(20000);
          break;
        case '3':
          this.receiveCodeRate(50000);
          break;
      }
    },
    showResolutionRatioFn() {
      this.setIsShowResolutionRatioModalForSetting(true);
    },
    receiveResolution(val) {
      Log.info("onChangeResolution", val);
      this.setResolution(JSON.parse(JSON.stringify(val)));
      this.larksr?.setCloudAppSize(val.width, val.height);
    },
    showQualityModalFn() {
      this.setIsShowQualityModalForSetting(true);
    },
    aerialCheckedChange(val) {
      this.setAerialViewCheck(val);
      if(val === false) {
        if(this.aerailView)this.toggleAerailView();
        this.setCustomContentAlertTitle('');
        this.larksr.stopAerialview();
      } else {
        if(!this.aerailView)this.toggleAerailView();
        this.setShowAerialView(true);
        this.setCustomContentAlertTitle(this.ui.aerial);
        this.closeModal();
      }
    },

    togglePlayerList() {
      this.setShowPlayerList(!this.playerMode.showPlayerList);
    },
    onVolmueChange(value) {
      if (this.larksr) {
        this.larksr.videoElement.volume = value / 100;
        // TODO config audio
        this.larksr.audioElement.volume = value / 100;
      }
    },
    resetResolution() {
      console.error('*****werwerw******')
      let found = false;
      for (let res of this.resolutions) {
        if (res.width === this.larksr.currentAppSize.width && res.height === this.larksr.currentAppSize.height) {
          found = true;
        }
      }

      if (!found) {
        this.newResolutionsItem ={
          width: this.larksr.currentAppSize.width,
          height: this.larksr.currentAppSize.height,
        }
      }
      this.setResolution({
        width: this.larksr.currentAppSize.width,
        height: this.larksr.currentAppSize.height,
      })
      console.error('resolution',this.resolution)
    },
    ...mapActions({
      setFlipMouseWheel: 'flipMouseWheel',
      toggleSyncClipboardParseEvent: "toggleSyncClipboardParseEvent",
      toggleAerailView: 'toggleAerailView',
      coderateChange: 'modalSetting/coderateChange',
      codeFpsChange: 'modalSetting/codeFpsChange',
    }),
    ...mapMutations({
      setShowPlayerList: 'playerMode/setShowPlayerList',
      setIsShowMobileSettingModal: 'modalSetting/setIsShowMobileSettingModal',
      setIsShowQualityModalForSetting: 'modalStream/setIsShowQualityModalForSetting',
      setIsShowResolutionRatioModalForSetting: 'modalStream/setIsShowResolutionRatioModalForSetting',
      setAerialViewCheck: 'modalSetting/setAerialViewCheck',
      setCustomContentAlertTitle: 'customContentAlert/setCustomContentAlertTitle',
      setResolution: 'modalSetting/setResolution',
      setShowAerialView: 'setShowAerialView',
    })
  },
  mounted() {
    console.error('***********************',this.larksr,this.larksr.currentAppSize)
    if (this.larksr && this.larksr.currentAppSize) {
      this.larksr.on("appresize", () => {
        this.resetResolution();
      });
      this.resetResolution();
    }
  }
}
</script>
<style lang='scss' scoped>
@import 'modal_setting.scss';
</style>
