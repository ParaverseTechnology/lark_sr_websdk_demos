<template>
  <div>
  <div class="mobile-modal" :style="streamStyle" ref="modal">
    <div class="mobile-modal-title">
      <i class="iconfont icon-arrow" @click="closeModal"></i>
      <span class="mobile-modal-title-text">{{ui.liveSetup}}</span>
    </div>
    <div class="stream-content">
      <div class="stream-content-path">
        <el-input v-model="rtmpPath" type="text" id="rtmp-path" size="small" :placeholder="ui.liveUrl"></el-input>
      </div>
      <div class="stream-content-path">
        <el-input type="text" id="rtmp-key" size="small" :placeholder="ui.liveKey" v-model="rtmpKey"></el-input>
      </div>
      <div class="customContentAlert-divider"></div>
      <div>
        <div class="stream-content-row" style="margin-bottom: 1.89rem;">
          <span>{{ ui.quality }}</span>
          <div @click.prevent="showQualityModalFn">
            <span class="stream-tag tag-code">{{frameRate}}</span>
            <span class="stream-tag">{{codeRate}}</span>
            <el-icon><CaretRight /></el-icon>
          </div>
        </div>
        <div class="stream-content-row">
          <span @click="qualityClick('0')" :class="{'quality-tag': true, 'quality-check-tag': frameRate===60&&codeRate===8000}">{{ ui.quality1 }}</span>
          <span @click="qualityClick('1')" :class="{'quality-tag': true, 'quality-check-tag': frameRate===60&&codeRate===10000}">{{ ui.quality2 }}</span>
          <span @click="qualityClick('2')" :class="{'quality-tag': true, 'quality-check-tag': frameRate===60&&codeRate===20000}">{{ ui.quality3 }}</span>
          <span @click="qualityClick('3')" :class="{'quality-tag': true, 'quality-check-tag': frameRate===60&&codeRate===50000}">{{ ui.quality4 }}</span>
        </div>
      </div>
      <div class="customContentAlert-divider"></div>
      <div class="stream-content-row">
        <span>{{ui.liveRes}}</span>
        <div @click="showResolutionRatioFn">
          <span class="stream-tag tag-code">{{resolution.sublabel?resolution.sublabel:(resolution.width + ' x' + resolution.height)}}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
      </div>
      <div class="customContentAlert-divider"></div>
      <div class="status" :style="status.isError ? { color : '#F56C6C'} : {}">
          <p>{{status.text}}</p>
      </div>
      <el-row type="flex" justify="center" class="button-group">
        <Btn v-if="status.code == 1" class="submit" :title="$t('message.vrAppli.close')" submit="false" @click="onCancelLive"/>
        <Btn v-else class="submit" :title="ui.liveSubmit" submit="false" @click="onSubmit"/>
      </el-row>
    </div>
  </div>
  <Quality v-if="modalStreamStore.isShowQualityModal" :codeRate="codeRate" :frameRate="frameRate" @sendCodeRate="receiveCodeRate" @sendFrameRate="receiveFrameRate"></Quality>
  <resolutionRatioVue v-if="modalStreamStore.isShowResolutionRatioModal" :resolution="resolution" @sendResolution="receiveResolution"></resolutionRatioVue>
  </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import { useModalStreamStore } from '@/stores/modal_stream.js';
import { useCustomContentAlertStore } from '@/stores/custom_content_alert.js';
import Log from "@/utils/log";
import Btn from '../../button/button.vue';
import { LarkSRClientEvent } from "larksr_websdk";
import Quality from '../components/codeRateAndFrameRate.vue';
import resolutionRatioVue from '../components/resolutionRatio.vue';

const commStore = useCommStore();
const modalStreamStore = useModalStreamStore();
const customContentAlertStore = useCustomContentAlertStore();

const rtmpPath = ref('');
const rtmpKey = ref('');
const codeRate = ref(8000);
const frameRate = ref(30);
const resolution = ref({width: 1920,height: 1080, sublabel: 'Default'});
const status = reactive({
    isError: false,
    text: '',
    code: ''
});

// state
const larksr = computed(() => { return commStore.larksr; });
const ui = computed(() => { return commStore.ui; });


const streamStyle = computed(() => {
  let obj = {};
  if(commStore.screenOrientation==='landscape' || commStore.mobileForceLandScape) {
    obj = {
      'width': '34.31rem',
      'height': commStore.viewPort.height +'px',
      'right': modalStreamStore.isShowMobileStream ? '0' : '-'+ '34.31rem'
    }
  } else {
    obj = {
      'width': '100%',
      'height': commStore.viewPort.height +'px',
      'right': modalStreamStore.isShowMobileStream ? '0' : '-'+ '100%'
    }
  }
  return obj
})


const closeModal = () => {
  modalStreamStore.setIsShowMobileStream(false);
};
const showQualityModalFn = () => {
  modalStreamStore.setIsShowQualityModal(true);
};
const receiveCodeRate = (val) => {
  codeRate.value = val;
};
const receiveFrameRate = (val) => {
  console.log(val)
  frameRate.value = val;
};
const qualityClick = (type) => {
  frameRate.value = 60;
  switch(type) {
    case '0':
      codeRate.value = 8000;
      break;
    case'1':
      codeRate.value = 10000;
      break;
    case '2':
      codeRate.value = 20000;
      break;
    case '3':
      codeRate.value = 50000;
      break;
  }
};
const showResolutionRatioFn = () => {
  modalStreamStore.setIsShowResolutionRatioModal(true);
};
const receiveResolution = (val) => {
  resolution.value = val;
};
const onSubmit = () => {
  Log.info('on submit live streaming', rtmpKey.value, rtmpPath.value, codeRate.value, frameRate.value, resolution.value);
  if (!rtmpPath.value) {
    status.isError = true;
    status.text =  ui.value.liveStreamTip;
    status.code = '';
    return;
  }

  larksr.value.StartCloudLiveStreaming({
      path: rtmpPath.value,
      key: rtmpKey.value,
      width: resolution.value.width,
      height: resolution.value.height,
      framerate: codeRate.value,
      bitrate: frameRate.value
  })
  .then((res) => {
    status.isError = false;
    status.text =  '准备推流中';
    status.code = res.code || '';
    modalStreamStore.setRtmpstreamForm({
      rtmpPath: rtmpPath.value,
      rtmpKey: rtmpKey.value,
      codeRate: codeRate.value,
      frameRate: frameRate.value,
      resolution: resolution.value
    });
  })
  .catch((err) => {
    status.isError = true;
    status.text =  err;
    status.code = '';
    modalStreamStore.setRtmpstreamForm(null);
  });
};
const onCancelLive = () => {
  Log.info('on close live streaming');
  larksr.value.StopLiveStreaming();
  modalStreamStore.setRtmpstreamstate(null);
  modalStream.setRtmpstreamForm(null);
};
const onRtmpStreamState = (e) => {
  Log.info("onRtmpStreamState", e);
  toastStore.toastAct( e.data.desc);
  status.isError = false;
  status.text =  e.data.desc;
  status.code = e.data.state || '';
  modalStreamStore.setRtmpstreamstate({...status});
};
const onRtmpStreamError = (e) => {
  Log.info("onRtmpStreamError", e);
  status.isError = true;
  status.text =  e.data.desc;
  status.code = e.state || '';
  modalStreamStore.setRtmpstreamstate({...status});
};
onMounted(() => {
  Log.info('live larksr', larksr.value);
  larksr.value.on(LarkSRClientEvent.RTMP_STREAM_STATE, onRtmpStreamState);
  larksr.value.on(LarkSRClientEvent.RTMP_STREAM_ERROR, onRtmpStreamError);
  if (modalStreamStore.rtmpstreamstate!==null) this.status = modalStreamStore.rtmpstreamstate;
  if (modalStreamStore.rtmpstreamForm!==null) {
    rtmpPath.value = modalStreamStore.rtmpstreamForm.rtmpPath;
    rtmpKey.value = modalStreamStore.rtmpstreamForm.rtmpKey;
    codeRate.value = modalStreamStore.rtmpstreamForm.codeRate;
    frameRate.value = modalStreamStore.rtmpstreamForm.frameRate;
    resolution.value = modalStreamStore.rtmpstreamForm.resolution
  }
})
</script>
<style lang='scss' scoped>
@import 'modal_stream.scss';
</style>
