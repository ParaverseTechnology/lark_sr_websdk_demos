<template>
  <div>
  <div class="mobile-modal" :style="streamStyle" ref="modal">
    <div class="mobile-modal-title">
      <i class="iconfont icon-arrow" @click="closeModal"></i>
      <span class="mobile-modal-title-text">{{ui.liveSetup}}</span>
    </div>
    <div class="stream-content">
      <div class="stream-content-path">
        <el-input v-model="rtmpPath" type="text" id="rtmp-path" size="mini" :placeholder="ui.liveUrl"></el-input>
      </div>
      <div class="stream-content-path">
        <el-input type="text" id="rtmp-key" size="mini" :placeholder="ui.liveKey" v-model="rtmpKey"></el-input>
      </div>
      <div class="customContentAlert-divider"></div>
      <div>
        <div class="stream-content-row" style="margin-bottom: 1.89rem;">
          <span>{{ ui.quality }}</span>
          <div @click.prevent="showQualityModalFn">
            <span class="stream-tag tag-code">{{frameRate}}</span>
            <span class="stream-tag">{{codeRate}}</span>
            <i class="el-icon-caret-right"></i>
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
          <i class="el-icon-caret-right"></i>
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
  <Quality v-if="isShowQualityModal" :codeRate="codeRate" :frameRate="frameRate" @sendCodeRate="receiveCodeRate" @sendFrameRate="receiveFrameRate"></Quality>
  <resolutionRatioVue v-if="isShowResolutionRatioModal" :resolution="resolution" @sendResolution="receiveResolution"></resolutionRatioVue>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Log from "@/utils/log";
import Btn from '../../button/button';
import { LarkSRClientEvent } from "larksr_websdk";
import Quality from '../components/codeRateAndFrameRate.vue';
import resolutionRatioVue from '../components/resolutionRatio.vue';
export default {
  components: {
    Btn,
    Quality,
    resolutionRatioVue
  },
  data () {
    return {
      rtmpPath: '',
      rtmpKey: '',
      codeRate: 8000,
      frameRate: 30,
      resolution: {width: 1920,height: 1080, sublabel: 'Default'},
      status: {
          isError: false,
          text: '',
          code: ''
      },
    }
  },
  computed: {
    streamStyle() {
      let obj = {};
      if(this.screenOrientation==='landscape' || this.mobileForceLandScape) {
        obj = {
          'width': '34.31rem',
          'height': this.viewPort.height +'px',
          'right': this.isShowMobileStream ? '0' : '-'+ '34.31rem'
        }
      } else {
        obj = {
          'width': '100%',
          'height': this.viewPort.height +'px',
          'right': this.isShowMobileStream ? '0' : '-'+ '100%'
        }
      }
      return obj
    },
    ...mapGetters({
      screenOrientation: 'screenOrientation',
      viewPort: 'viewPort',
      mobilePixelUnit: 'mobilePixelUnit',
    }),
    ...mapState({
      larksr: state => state.larksr,
      ui: state => state.ui,
      mobileForceLandScape: state => state.mobileForceLandScape,
      isShowMobileStream: state => state.modalStream.isShowMobileStream,
      isShowQualityModal: state => state.modalStream.isShowQualityModal,
      isShowResolutionRatioModal: state => state.modalStream.isShowResolutionRatioModal,
      rtmpstreamstate: state => state.modalStream.rtmpstreamstate,
      rtmpstreamForm: state => state.modalStream.rtmpstreamForm,
    })
  },
  methods: {
    closeModal() {
      this.setIsShowMobileStream(false);
    },
    showQualityModalFn() {
      this.setIsShowQualityModal(true);
    },
    receiveCodeRate(val) {
      this.codeRate = val;
    },
    receiveFrameRate(val) {
      console.log(val)
      this.frameRate = val;
    },
    qualityClick(type) {
      this.frameRate = 60;
      switch(type) {
        case '0':
          this.codeRate = 8000;
          break;
        case'1':
          this.codeRate = 10000;
          break;
        case '2':
          this.codeRate = 20000;
          break;
        case '3':
          this.codeRate = 50000;
          break;
      }
    },
    showResolutionRatioFn() {
      this.setIsShowResolutionRatioModal(true);
    },
    receiveResolution(val) {
      this.resolution = val;
    },
    onSubmit() {
      Log.info('on submit live streaming', this.rtmpKey, this.rtmpPath, this.codeRate, this.frameRate, this.resolution);
      if (!this.rtmpPath) {
        this.status = {
            isError: true,
            text: this.ui.liveStreamTip,
            code: ''
        }
        return;
      }

      this.larksr.StartCloudLiveStreaming({
          path: this.rtmpPath,
          key: this.rtmpKey,
          width: this.resolution.width,
          height: this.resolution.height,
          framerate: this.codeRate,
          bitrate: this.frameRate
      })
      .then((res) => {
        this.status = {
          isError: false,
          text: '准备推流中',
          code: res.code || ''
        }
        this.setRtmpstreamForm({
          rtmpPath: this.rtmpPath,
          rtmpKey: this.rtmpKey,
          codeRate: this.codeRate,
          frameRate: this.frameRate,
          resolution: this.resolution
        });
      })
      .catch((err) => {
        this.status = {
          isError: true,
          text: err,
          code: ''
        }
        this.setRtmpstreamForm(null);
      });
    },
    onCancelLive() {
      Log.info('on close live streaming');
      this.larksr.StopLiveStreaming();
      this.setRtmpstreamstate(null);
      this.setRtmpstreamForm(null);
    },
    onRtmpStreamState(e) {
      Log.info("onRtmpStreamState", e);
      this.toast(e.data.desc);
      this.status = {
        isError: false,
        text: e.data.desc,
        code: e.data.state || ''
      }
      this.setRtmpstreamstate(this.status);
    },
    onRtmpStreamError(e) {
      Log.info("onRtmpStreamError", e);
      // this.showSetup = true;
      this.status = {
        isError: true,
        text: e.data.desc,
        code: e.state || ''
      }
      this.setRtmpstreamstate(this.status);
    },
    ...mapActions({
        toast: "toast/toast",
        notify: "notifyBar/notify",
        alert: "modalAlert/showModalAlert",
    }),
    ...mapMutations({
      setIsShowMobileStream: 'modalStream/setIsShowMobileStream',
      setIsShowQualityModal: 'modalStream/setIsShowQualityModal',
      setIsShowResolutionRatioModal: 'modalStream/setIsShowResolutionRatioModal',
      setRtmpstreamstate: 'modalStream/setRtmpstreamstate',
      setRtmpstreamForm: 'modalStream/setRtmpstreamForm',
    })
  },
  mounted() {
      Log.info('live larksr', this.larksr);
      this.larksr.on(LarkSRClientEvent.RTMP_STREAM_STATE, this.onRtmpStreamState, this);
      this.larksr.on(LarkSRClientEvent.RTMP_STREAM_ERROR, this.onRtmpStreamError, this);
      if (this.rtmpstreamstate!==null) this.status = this.rtmpstreamstate;
      if (this.rtmpstreamForm!==null) {
        this.rtmpPath = this.rtmpstreamForm.rtmpPath;
        this.rtmpKey = this.rtmpstreamForm.rtmpKey;
        this.codeRate = this.rtmpstreamForm.codeRate;
        this.frameRate = this.rtmpstreamForm.frameRate;
        this.resolution = this.rtmpstreamForm.resolution
      }
  },
}
</script>
<style lang='scss' scoped>
@import 'modal_stream.scss';
</style>
