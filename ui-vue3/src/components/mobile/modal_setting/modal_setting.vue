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
              <el-icon :size="'2rem'"><CaretRight /></el-icon>
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
            <span @click="setFlipMouseWheelFn(1)" :class="{'setting-tag':true,'setting-tag-check':commStore.isFlipMouseWheel}">上滚</span>
            <span @click="setFlipMouseWheelFn(0)" :class="{'setting-tag':true,'setting-tag-check':!commStore.isFlipMouseWheel}" style="margin-left: 0.95rem;">下滚</span>
          </div>
        </div>
        <div class="customContentAlert-divider"></div>
        <!-- 分辨率 -->
        <div class="setting-content-row">
          <span>{{ui.liveRes}}</span>
          <div @click="showResolutionRatioFn">
            <span class="setting-tag setting-tag-check tag-code">{{resolution.sublabel?resolution.sublabel:(resolution.width + ' x' + resolution.height)}}</span>
            <el-icon><CaretRight /></el-icon>
          </div>
        </div>
        <div class="customContentAlert-divider"></div>
        <template v-if="playerModeStore.isInteractiveMode">
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
    <Quality v-if="modalStreamStore.isShowQualityModalForSetting" :codeRate="codeRate" :frameRate="frameRate" @sendCodeRate="receiveCodeRate" @sendFrameRate="receiveFrameRate"></Quality>
    <resolutionRatioVue v-if="modalStreamStore.isShowResolutionRatioModalForSetting" :resolution="resolution" @sendResolution="receiveResolution" :newResolutionsItem="newResolutionsItem"></resolutionRatioVue>
  </div>
</template>
<script setup>
import Log from '@/utils/log';
import Quality from '../components/codeRateAndFrameRate.vue';
import resolutionRatioVue from '../components/resolutionRatio.vue';
import PvtSwitch from '../../switch_pvt/switch_pvt.vue'
import Slider from '../../slider/slider.vue';
import Capabilities from '@/utils/capabilities';
import { useCommStore } from '@/stores/comm.js';
import { useModalSettingStore } from '@/stores/modal_setting.js';
import { usePlayerModeStore } from '@/stores/player_mode.js';
import { useCustomContentAlertStore } from '@/stores/custom_content_alert.js';
import { useModalStreamStore } from '@/stores/modal_stream.js';

const commStore = useCommStore();
const modalSettingStore = useModalSettingStore();
const playerModeStore = usePlayerModeStore();
const customContentAlertStore = useCustomContentAlertStore();
const modalStreamStore = useModalStreamStore();

const isIOS = Capabilities.os === 'iOS';
const resolutions = reactive({
  list: [
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
  ]
});
const newResolutionsItem = ref(null);

const larksr = computed(() => { return commStore.larksr; });
const ui = computed(() => { return commStore.ui; });
// const coderate = computed(() => { return store.state.modalSetting.coderate; });


const settingStyle = computed(() => {
  let obj = {};
  if(commStore.screenOrientation==='landscape' || commStore.mobileForceLandScape) {
    obj = {
      'width': '34.31rem',
      'height': commStore.viewPort.height +'px',
      'right': modalSettingStore.isShowMobileSettingModal ? '0' : '-'+ '34.31rem'
    }
  } else {
    obj = {
      'width': '100%',
      'height': commStore.viewPort.height +'px',
      'right': modalSettingStore.isShowMobileSettingModal ? '0' : '-'+ '100%'
    }
  }
  return obj
})

const checked = computed({
  get() {
    return modalSettingStore.aerialViewCheck;
  },
  set() {}
})
const cipboardParseChecked = computed(() => {
  return commStore.syncClipboardParseEvent;
})

const playerListChecked = computed(() => {return commStore.playerMode.showPlayerList;});
const codeRate = computed(() => {return modalSettingStore.coderate});
// 帧率
const frameRate = computed(() => { return modalSettingStore.fps; });
// 分辨率
const resolution = computed(() => { return modalSettingStore.resolution; });
// const resolution = computed(() => {});

const closeModal = () => {
  modalSettingStore.setIsShowMobileSettingModal(false);
};
const receiveCodeRate = (val) => {
  modalSettingStore.coderateChange(val);
  larksr.value.setVideoBitrateKbps(val);
};
const receiveFrameRate = (val) => {
  modalSettingStore.codeFpsChange(val);
  larksr.value.setVideoFps(val);
};
const qualityClick = (type) => {
  if(frameRate.value!==60)receiveFrameRate(60);
  switch(type) {
    case '0':
      receiveCodeRate(8000);
      break;
    case'1':
      receiveCodeRate(10000);
      break;
    case '2':
      receiveCodeRate(20000);
      break;
    case '3':
      receiveCodeRate(50000);
      break;
  }
};
const showResolutionRatioFn = () => {
  modalStreamStore.setIsShowResolutionRatioModalForSetting(true);
};
const receiveResolution = (val) => {
  Log.info("onChangeResolution", val);
  modalSettingStore.setResolution(JSON.parse(JSON.stringify(val)));
  larksr.value?.setCloudAppSize(val.width, val.height);
};
const showQualityModalFn = () => {
  modalStreamStore.setIsShowQualityModalForSetting(true);
};
const aerialCheckedChange = (val) => {
  modalSettingStore.setAerialViewCheck(val);
  if(val === false) {
    // if(aerailView.value) commStore.toggleAerailView();
    customContentAlertStore.setCustomContentAlertTitle('');
    larksr.value.stopAerialview();
  } else {
    // if(!aerailView.value)commStore.toggleAerailView();
    commStore.setShowAerialView(true);
    customContentAlertStore.setCustomContentAlertTitle(ui.value.aerial);
    closeModal();
  }
};

const togglePlayerList = () => {
  playerModeStore.setShowPlayerList(!commStore.playerMode.showPlayerList);
};
const onVolmueChange = (value) => {
  if (larksr.value) {
    larksr.value.videoElement.volume = value / 100;
    // TODO config audio
    larksr.value.audioElement.volume = value / 100;
  }
};
const resetResolution = () => {
  let found = false;
  for (let res of resolutions.list) {
    if (res.width === larksr.value.currentAppSize.width && res.height === larksr.value.currentAppSize.height) {
      found = true;
    }
  }

  if (!found) {
    newResolutionsItem.value ={
      width: larksr.value.currentAppSize.width,
      height: larksr.value.currentAppSize.height,
    }
  }
  modalSettingStore.setResolution({
    width: larksr.value.currentAppSize.width,
    height: larksr.value.currentAppSize.height,
  });
};
const setFlipMouseWheelFn = (val) => {
  commStore.setFlipMouseWheel(val);
}

onMounted(() => {
  if (larksr.value && larksr.value.currentAppSize) {
    larksr.value.on("appresize", () => {
      resetResolution();
    });
    resetResolution();
  }
  if(larksr.value.params.useWebCodec) {
    resolutions.list.unshift({ width: 7680, height: 4320, sublabel: '8K' });
  }
})
</script>
<style lang='scss' scoped>
@import 'modal_setting.scss';
</style>
