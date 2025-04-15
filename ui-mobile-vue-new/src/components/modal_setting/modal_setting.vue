<template>
  <div class="customContentAlert" :style="viewPortStyle">
      <div class="customContentAlert-container">
          <div class="customContentAlert-title">
              <div class="customContentAlert-title-tab">
                  <p @click="tabClick('0')" :class="{'customContentAlert-title-tab-left':true, 'active':activeTab==='0'}">{{ui.setting}}</p>
                  <p @click="tabClick('1')" :class="{'customContentAlert-title-tab-right':true, 'active':activeTab==='1'}">{{ ui.viewTab }}</p>
              </div>
              <div class="close" @click="onCancel">
                  <i class="el-icon-close"></i>
              </div>
          </div>
          <template v-if="activeTab==='0'">
            <div class="customContentAlert-content">
              <div class="quality content-row setting-row">
                  <span>{{ ui.mouse }}</span>
                  <div class="quality-btn">
                    <p @click="toggleInitCursorMode" :class="{'quality-btn-active': !initCursorMode}">{{ui.mouseModeAuto}}</p>
                    <p @click="toggleInitCursorMode" :class="{'quality-btn-active': initCursorMode}">{{ui.mosueModeLock}}</p>
                  </div>
                </div>
                <div class="customContentAlert-divider"></div>
                <div class="quality content-row setting-row">
                  <span>{{ui.cipboardParseOn}}</span>
                  <div class="ratio-btn">
                    <div>
                      <PvtSwitch v-model="cipboardParseChecked" @change="toggleSyncClipboardParseEvent"/>
                    </div>
                  </div>
                </div>
                <div class="customContentAlert-divider"></div>
                <template v-if="isInteractiveMode">
                  <div class="quality content-row setting-row">
                    <span>{{ ui.showPlayerList }}</span>
                    <div class="ratio-btn">
                      <div>
                        <PvtSwitch v-model="playerListChecked" @change="togglePlayerList"/>
                      </div>
                    </div>
                  </div>
                  <div class="customContentAlert-divider"></div>
                </template>
                <div class="quality content-row setting-row">
                  <span>{{ ui.volume }}</span>
                  <div class="quality-btn">
                    <i class="iconfont icon-mute" style="margin-right: 10px;font-size: 20px;"></i>
                    <Slider v-on:change="onVolmueChange" />
                  </div>
                </div>
                <div class="customContentAlert-divider" style="margin-bottom: 0;"></div>
            </div>
          </template>
          <template v-if="activeTab==='1'">
            <div class="customContentAlert-content">
                <div class="quality content-row">
                  <span>{{ ui.quality }}</span>
                  <div class="quality-btn">
                    <p @click="qualityClick('0')" :class="{'quality-btn-active': qualityTab==='0'}">{{ ui.quality1 }}</p>
                    <p @click="qualityClick('1')" :class="{'quality-btn-active': qualityTab==='1'}">{{ ui.quality2 }}</p>
                    <p @click="qualityClick('2')" :class="{'quality-btn-active': qualityTab==='2'}">{{ ui.quality3 }}</p>
                    <p @click="qualityClick('3')" :class="{'quality-btn-active': qualityTab==='3'}">{{ ui.quality4 }}</p>
                  </div>
                </div>
                <div class="customContentAlert-divider"></div>
                <div class="custom custom-code content-row">
                  <span>{{ ui.custom }}</span>
                  <div class="custom-content">
                    <span>{{ ui.codeRate }}</span>
                    <el-select @change="onChangeBitrate" v-model="selectCoderate" size="mini" :placeholder="ui.liveBitrate">
                      <el-option v-for="(coderate, key) in coderates" v-bind:value="coderate" v-bind:key="key">
                          {{ coderate }} kbps
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="custom content-row">
                  <span></span>
                  <div class="custom-content">
                    <span>{{ ui.frameRate }}</span>
                    <el-select @change="onChangeCodeFps" v-model="selectFps" size="mini" :placeholder="ui.liveFPS">
                      <el-option v-for="(fps, key) in fpss" v-bind:value="fps" v-bind:key="key">
                          {{ fps }} FPS
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="customContentAlert-divider"></div>
                <div class="quality content-row">
                  <span>{{ ui.ratio }}</span>
                  <div class="ratio-btn">
                    <p @click="toggleScaleToFillStretch" :class="{'quality-btn-active':isChangedScaledMode}">{{ ui.scale }}</p>
                    <p @click="toggleScaleToFillStretch" :class="{'quality-btn-active':!isChangedScaledMode}">{{ui.scaleAuto}}</p>
                  </div>
                </div>
                <div class="customContentAlert-divider"></div>
                <div class="custom content-row">
                  <span>{{ui.resolutions}}</span>
                  <div class="custom-content">
                    <el-select v-model="selecteResolution" value-key="id" size="mini" :placeholder="ui.resolutions" @change="onChangeResolution">
                      <el-option v-for="(resolution, key) in resolutions" v-bind:value="resolution" v-bind:key="key" :label="resolution.width+ ' x ' +resolution.height">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <template v-if="larksr.params.appliType===1 ||larksr.params.appliType===2">
                  <div class="customContentAlert-divider"></div>
                  <div class="quality content-row">
                    <span>{{ ui.aerial }}</span>
                    <div class="ratio-btn">
                      <div>
                        <PvtSwitch v-model="checked" @change="aerialCheckedChange"/>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="customContentAlert-divider" style="margin-bottom: 0;"></div>
            </div>
          </template>
      </div>
  </div>
</template>
<script>
import Log from '@/utils/log';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PvtSwitch from '../switch_pvt/switch_pvt'
import Slider from '../slider/slider';

export default {
  name: 'ModalSetting',
  components: {
    PvtSwitch,
    Slider
  },
  computed: {
    // 是否显示玩家列表勾选框
    playerListChecked: {
      get() {
        return this.playerMode.showPlayerList;
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
    // 鸟瞰模式勾选框
    checked: {
      get() {
        return this.aerialViewCheck;
      },
      set() {}
    },
    // 画质
    qualityTab() {
      return this.qualityMode;
    },
    // 码率
    selectCoderate() {
      return this.coderate;
    },
    // 帧率
    selectFps() {
      return this.fps;
    },
    // 分辨率
    selecteResolution() {
      return this.resolution;
    },
    ...mapGetters({
      viewPortStyle: 'viewPortStyle',
      isChangedScaledMode: 'isChangedScaledMode',
      initCursorMode: "initCursorMode",
      isInteractiveMode: 'playerMode/isInteractiveMode',
    }),
    ...mapState({
      larksr: state => state.larksr,
      ui: state => state.ui,
      playerMode: state => state.playerMode,
      syncClipboardParseEvent: state => state.syncClipboardParseEvent,
      showAerialView: state => state.showAerialView,
      qualityMode: state => state.modalSetting.qualityMode,
      coderate: state => state.modalSetting.coderate,
      fps: state => state.modalSetting.fps,
      resolution: state => state.modalSetting.resolution,
      aerialViewCheck: state => state.modalSetting.aerialViewCheck,
    })
  },
  data() {
    return {
      activeTab: '0', // 画面
      coderates: [
        8000,
        10000,
        15000,
        20000,
        30000,
        50000,
        100000
      ],
      fpss: [
        30,
        60,
      ],
      resolutions: [
        { id: '40961080', width: 4096, height: 1080 },
        { id: '40962160', width: 4096, height: 2160 },
        { id: '38402160', width: 3840, height: 2160 },
        { id: '38401080', width: 3840, height: 1080 },
        { id: '25601440', width: 2560, height: 1440 },
        { id: '20481536', width: 2048, height: 1536 },
        { id: '19201080', width: 1920, height: 1080 },
        { id: '19201440', width: 1920, height: 1440 },
        { id: '1600900', width: 1600, height: 900 },
        { id: '1366768', width: 1366, height: 768 },
        { id: '1280720', width: 1280, height: 720 },
        { id: '1280600', width: 1280, height: 600 },
        { id: '21803840', width: 2180, height: 3840 },
        { id: '10801920', width: 1080, height: 1920 },
        { id: '7201280', width: 720, height: 1280 },
        { id: '15362048', width: 1536, height: 2048 },
      ],
    }
  },
  methods: {
    onCancel() {
      this.setIsShowSettingAlert(false);
    },
    onSubmit() {

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
    tabClick(type) {
      this.activeTab = type;
    },
    qualityClick(type) {
      this.setQualityMode(type);
      switch(type) {
        case '0':
          this.onChangeBitrate(8000);
          this.onChangeCodeFps(60);
          break;
        case'1':
          this.onChangeBitrate(10000);
          this.onChangeCodeFps(60);
          break;
        case '2':
          this.onChangeBitrate(20000);
          this.onChangeCodeFps(60);
          break;
        case '3':
          this.onChangeBitrate(50000);
          this.onChangeCodeFps(60);
          break;
      }

    },
    onChangeBitrate(coderate) {
      Log.info('onChangeBitrate', coderate);
      this.coderateChange(coderate);
      this.larksr.setVideoBitrateKbps(coderate);
    },
    onChangeCodeFps(fps) {
      Log.info('onChangeCode', fps);
      this.codeFpsChange(fps);
      this.larksr.setVideoFps(fps);
    },
    onChangeResolution(val) {
      Log.info("onChangeResolution", val);
      this.setResolution(JSON.parse(JSON.stringify(val)));
      this.larksr?.setCloudAppSize(val.width, val.height);
    },
    aerialCheckedChange(val) {
      this.setAerialViewCheck(val);
      if(val === false) {
        if(this.aerailView)this.toggleAerailView();
        this.setCustomContentAlertTitle('');
        this.larksr.stopAerialview();
      } else {
        this.onCancel();
        if(!this.aerailView)this.toggleAerailView();
        this.setShowAerialView(true);
        this.setCustomContentAlertTitle(this.ui.aerial);
      }
    },
    resetResolution() {
      let found = false;
      for (let res of this.resolutions) {
        if (res.width === this.larksr.currentAppSize.width && res.height === this.larksr.currentAppSize.height) {
          found = true;
        }
      }

      if (!found) {
        this.resolutions.push({
          id: this.larksr.currentAppSize.width+''+this.larksr.currentAppSize.height,
          width: this.larksr.currentAppSize.width,
          height: this.larksr.currentAppSize.height,
        });
      }

      this.setResolution({
        id: this.larksr.currentAppSize.width+''+this.larksr.currentAppSize.height,
        width: this.larksr.currentAppSize.width,
        height: this.larksr.currentAppSize.height,
      })
    },
    ...mapMutations({
      setIsShowSettingAlert: 'modalSetting/setIsShowSettingAlert',
      setCustomContentAlertTitle: 'customContentAlert/setCustomContentAlertTitle',
      setShowPlayerList: 'playerMode/setShowPlayerList',
      setQualityMode: 'modalSetting/setQualityMode',
      setResolution: 'modalSetting/setResolution',
      setAerialViewCheck: 'modalSetting/setAerialViewCheck',
      setShowAerialView: 'setShowAerialView',
    }),
    ...mapActions({
        toggleScaleToFillStretch: 'toggleScaleToFillStretch',
        toggleAerailView: 'toggleAerailView',
        toggleInitCursorMode: 'toggleInitCursorMode',
        toggleSyncClipboardParseEvent: "toggleSyncClipboardParseEvent",
        coderateChange: 'modalSetting/coderateChange',
        codeFpsChange: 'modalSetting/codeFpsChange',
      })
  },
  mounted() {
    if (this.larksr && this.larksr.currentAppSize) {
      this.larksr.on("appresize", () => {
        this.resetResolution();
      });
      this.resetResolution();
    }
  },
  beforeDestroy() {},
}
</script>
<style lang="scss" scoped>
@import "modal_setting.scss";
</style>
