<template>
  <div class="customContentAlert" :style="commStore.viewPortStyle">
      <div class="customContentAlert-container">
          <div class="customContentAlert-title">
              <div class="customContentAlert-title-tab">
                  <p @click="tabClick('0')" :class="{'customContentAlert-title-tab-left':true, 'active':activeTab==='0'}">{{ui.setting}}</p>
                  <p @click="tabClick('1')" :class="{'customContentAlert-title-tab-right':true, 'active':activeTab==='1'}">{{ ui.viewTab }}</p>
              </div>
              <div class="close" @click="onCancel">
                <el-icon><Close /></el-icon>
              </div>
          </div>
          <template v-if="activeTab==='0'">
            <div class="customContentAlert-content">
              <div class="quality content-row setting-row">
                  <span>{{ ui.mouse }}</span>
                  <div class="quality-btn">
                    <p @click="toggleInitCursorModeFn" :class="{'quality-btn-active': !commStore.initCursorMode}">{{ui.mouseModeAuto}}</p>
                    <p @click="toggleInitCursorModeFn" :class="{'quality-btn-active': commStore.initCursorMode}">{{ui.mosueModeLock}}</p>
                  </div>
                </div>
                <div class="customContentAlert-divider"></div>
                <div class="quality content-row setting-row">
                  <span>{{ui.cipboardParseOn}}</span>
                  <div class="ratio-btn">
                    <div>
                      <PvtSwitch v-model="cipboardParseChecked" @change="toggleSyncClipboardParseEventFn"/>
                    </div>
                  </div>
                </div>
                <div class="customContentAlert-divider"></div>
                <template v-if="playerModeStore.isInteractiveMode">
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
                    <p @click="qualityClick('0')" :class="{'quality-btn-active': selectFps===60&&selectCoderate===8000}"> {{ ui.quality1 }}</p>
                    <p @click="qualityClick('1')" :class="{'quality-btn-active': selectFps===60&&selectCoderate===10000}">{{ ui.quality2 }}</p>
                    <p @click="qualityClick('2')" :class="{'quality-btn-active': selectFps===60&&selectCoderate===20000}">{{ ui.quality3 }}</p>
                    <p @click="qualityClick('3')" :class="{'quality-btn-active': selectFps===60&&selectCoderate===50000}">{{ ui.quality4 }}</p>
                  </div>
                </div>
                <div class="customContentAlert-divider"></div>
                <div class="custom custom-code content-row">
                  <span>{{ ui.custom }}</span>
                  <div class="custom-content">
                    <span>{{ ui.codeRate }}</span>
                    <el-select @change="onChangeBitrate" v-model="selectCoderate" size="small" :placeholder="ui.liveBitrate">
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
                    <el-select @change="onChangeCodeFps" v-model="selectFps" size="small" :placeholder="ui.liveFPS">
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
                    <p @click="toggleScaleToFillStretchFn" :class="{'quality-btn-active':commStore.isChangedScaledMode}">{{ ui.scale }}</p>
                    <p @click="toggleScaleToFillStretchFn" :class="{'quality-btn-active':!commStore.isChangedScaledMode}">{{ui.scaleAuto}}</p>
                  </div>
                </div>
                <div class="customContentAlert-divider"></div>
                <div class="custom content-row">
                  <span>{{ui.resolutions}}</span>
                  <div class="custom-content">
                    <el-select v-model="selecteResolution" value-key="id" size="small" :placeholder="ui.resolutions" @change="onChangeResolution">
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
<script setup>
import Log from '@/utils/log';
import { useCommStore } from '@/stores/comm.js';
import PvtSwitch from '../switch_pvt/switch_pvt.vue'
import Slider from '../slider/slider.vue';
import { useModalSettingStore } from '@/stores/modal_setting.js';
import { usePlayerModeStore } from '@/stores/player_mode.js';
import { useCustomContentAlertStore } from '@/stores/custom_content_alert.js';

const commStore = useCommStore();
const modalSettingStore = useModalSettingStore();
const playerModeStore = usePlayerModeStore();
const customContentAlertStore = useCustomContentAlertStore();

// state
const larksr = computed(() => { return commStore.larksr; });
const ui = computed(() => { return commStore.ui; });
const playerMode = computed(() => { return commStore.playerMode; });



// 是否显示玩家列表勾选框
const playerListChecked = computed(() => {return playerMode.value.showPlayerList;});
// 同步本地剪贴板勾选框
const cipboardParseChecked = computed(() => {
  return commStore.syncClipboardParseEvent;
});
// 鸟瞰模式勾选框
const checked = computed(() => {
  return modalSettingStore.aerialViewCheck;
});
// 画质
const qualityTab = computed(() => {
  return modalSettingStore.qualityMode;
})
// 码率
const selectCoderate = computed(() => {
  return modalSettingStore.coderate
})
// 帧率
const selectFps = computed(() => { return modalSettingStore.fps });
// 分辨率
const selecteResolution = computed(() => { return modalSettingStore.resolution });


const activeTab = ref('0'); // 画面
const coderates = ref([
  8000,
  10000,
  15000,
  20000,
  30000,
  50000,
  100000
]);
const fpss = ref([ 30, 60 ]);
const resolutions = ref([
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
]);


// 方法
const onCancel = () => {
  modalSettingStore.setIsShowSettingAlert(false);
};

const togglePlayerList = () => {
  playerModeStore.setShowPlayerList(!playerModeStore.showPlayerList);
};
const onVolmueChange = (value) => {
  if (larksr.value) {
    larksr.value.videoElement.volume = value / 100;
    // TODO config audio
    larksr.value.audioElement.volume = value / 100;
  }
};
const tabClick = (type) => {
  activeTab.value = type;
};
const qualityClick = (type) => {
  modalSettingStore.setQualityMode(type);
  switch(type) {
    case '0':
      onChangeBitrate(8000);
      onChangeCodeFps(60);
      break;
    case'1':
      onChangeBitrate(10000);
      onChangeCodeFps(60);
      break;
    case '2':
      onChangeBitrate(20000);
      onChangeCodeFps(60);
      break;
    case '3':
      onChangeBitrate(50000);
      onChangeCodeFps(60);
      break;
  }

};
const onChangeBitrate = (coderate) => {
  Log.info('onChangeBitrate', coderate);
  modalSettingStore.coderateChange(coderate);
  larksr.value.setVideoBitrateKbps(coderate);
};
const onChangeCodeFps = (fps) => {
  Log.info('onChangeCode', fps);
  modalSettingStore.codeFpsChange(fps);
  larksr.value.setVideoFps(fps);
};
const onChangeResolution = (val) => {
  Log.info("onChangeResolution", val);
  modalSettingStore.setResolution(JSON.parse(JSON.stringify(val)));
  larksr.value?.setCloudAppSize(val.width, val.height);
};
const aerialCheckedChange = (val) => {
  modalSettingStore.setAerialViewCheck(val);
  if(val === false) {
    customContentAlertStore.setCustomContentAlertTitle('');
    larksr.value.stopAerialview();
  } else {
    onCancel();
    commStore.setShowAerialView(true);
    customContentAlertStore.setCustomContentAlertTitle(ui.value.aerial);
  }
};
const resetResolution = () => {
  let found = false;
  for (let res of resolutions.value) {
    if (res.width === larksr.value.currentAppSize.width && res.height === larksr.value.currentAppSize.height) {
      found = true;
    }
  }

  if (!found) {
    resolutions.value.push({
      id: larksr.value.currentAppSize.width+''+larksr.value.currentAppSize.height,
      width: larksr.value.currentAppSize.width,
      height: larksr.value.currentAppSize.height,
    });
  }
  modalSettingStore.setResolution({
    id: larksr.value.currentAppSize.width+''+larksr.value.currentAppSize.height,
    width: larksr.value.currentAppSize.width,
    height: larksr.value.currentAppSize.height,
  });
};
const toggleScaleToFillStretchFn = () => {
  commStore.toggleScaleToFillStretch();
};
const toggleInitCursorModeFn = () => {
  commStore.toggleInitCursorMode();
}
const toggleSyncClipboardParseEventFn = () => {
  commStore.toggleSyncClipboardParseEvent();
};

if(larksr.value.params.useWebCodec) {
  resolutions.value.unshift({ id: '76804320', width: 7680, height: 4320 })
}

onMounted(() => {
  if (larksr.value && larksr.value.currentAppSize) {
    larksr.value.on("appresize", () => {
      resetResolution();
    });
    resetResolution();
  }
});
</script>
<style lang="scss" scoped>
@import "modal_setting.scss";
</style>
