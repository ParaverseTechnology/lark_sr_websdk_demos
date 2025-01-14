<template>
  <div class="mobile-modal" :style="resolutionStyle" ref="modal">
    <div class="mobile-modal-title">
      <i class="iconfont icon-arrow" @click="closeModal"></i>
      <!-- 分辨率 -->
      <span class="mobile-modal-title-text">{{ui.liveRes}}</span>
    </div>
    <div class="resolution-ratio-content">
      <div class="resolution-ratio-box">
        <div v-for="item in resolutions" :key="item.label" style="touch-action:auto;">
          <div :class="{
            'resolution-ratio-box-row': true, 
            'resolution-ratio-box-row-check':(resolution.width===item.width)&&(resolution.height===item.height)
            }" @click="changeResolutionRatio(item)">
            <div>
              <span class="iconfont resolution-ratio-box-row-icon">{{(resolution.width===item.width)&&(resolution.height===item.height)?'&#xe61c;':'&#xe623;'}}</span>
              <span class="resolution-ratio-box-row-label">{{item.sublabel || ''}}</span>
            </div>
            <span class="resolution-ratio-box-row-label">{{item.width + ' x ' + item.height}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: ['resolution','newResolutionsItem'],
  data () {
    return {
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
      ]
    }
  },
  watch: {
    'newResolutionsItem': {
      handler(newval) {
        if(newval) {
          let found = false;
          for (let res of this.resolutions) {
            if (res.width === newval.width && res.height === newval.height) {
              found = true;
            }
          }
          if (!found) {
            this.resolutions.push(newval);
          }     
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    if(this.larksr.params.useWebCodec) {
      this.resolutions.unshift({ width: 7680, height: 4320, sublabel: '8K' });
    }
  },
  computed: {
    resolutionStyle() {
      let obj = {};
      if(this.screenOrientation==='landscape' || this.mobileForceLandScape) {
        obj = {
          'width': '34.31rem',
          'height': this.viewPort.height +'px',
          'right': this.isShowResolutionRatioModal || this.isShowResolutionRatioModalForSetting ? '0' : '-'+ '34.31rem'
        }
      } else {
        obj = {
          'width': '100%',
          'height': this.viewPort.height +'px',
          'right': this.isShowResolutionRatioModal ? '0' : '-'+ '100%'
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
      ui: state => state.ui,
      larksr: state => state.larksr, 
      mobileForceLandScape: state => state.mobileForceLandScape,
      isShowResolutionRatioModal: state => state.modalStream.isShowResolutionRatioModal,
      isShowResolutionRatioModalForSetting: state => state.modalStream.isShowResolutionRatioModalForSetting
    })
  },
  methods: {
    closeModal() {
      this.setIsShowResolutionRatioModal(false);
      this.setIsShowResolutionRatioModalForSetting(false);
    },
    changeResolutionRatio(val) {
      this.$emit('sendResolution', val);
      this.closeModal();
    },
    ...mapMutations({
      setIsShowResolutionRatioModal: 'modalStream/setIsShowResolutionRatioModal',
      setIsShowResolutionRatioModalForSetting: 'modalStream/setIsShowResolutionRatioModalForSetting'
    })
  }
}
</script>
<style lang='scss' scoped>
.mobile-modal {
  background-color: var(--webclient-modal_bg, #5A5A5A);
  transition: all .2s;
  top: 0;
  right: 0;
  position: absolute;
  touch-action: auto;
  &-title {
    height: 5.2071rem;
    padding: 1.18rem;
    box-sizing: border-box;
    background-color: var(--webclient-modal-title-bg,#454545);
    color: var(--webclient-modal-font-color,#DDDDDD);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    touch-action: auto;
    i {
      display: inline-block;
      transform: rotate(180deg);
      font-size: 2.54rem;
      vertical-align: middle;
      touch-action: auto;
    }
    &-text {
      font-size: 1.6568rem;
      vertical-align: middle;
      touch-action: auto;
    }
  }
}
.resolution-ratio-content {
  overflow-y: auto;
  height: calc(100% - 5.2071rem);
  padding: 1.89rem 0.95rem;
  box-sizing: border-box;
  color: var(--webclient-modal-font-color,#DDDDDD);
  touch-action: auto;
  &-title {
    text-align: left;
    font-size: 1.42012rem;
    padding: 0 0.95rem;
    margin: 0;
    height: 3.43rem;
    line-height: 3.43rem;
    touch-action: auto;
  }
  .resolution-ratio-box {
    touch-action: auto;
    &-row {
      height: 3.43rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.95rem;
      box-sizing: border-box;
      margin-bottom: 0.95rem;
      touch-action: auto;
      &-icon {
        font-size: 2.3rem;
        touch-action: auto;
      }
      &-label {
        font-size: 1.42012rem;
        touch-action: auto;
      }
      >div {
        touch-action: auto;
        span {
          vertical-align: middle;
        }
        >span:nth-of-type(2) {
          display: inline-block;
          margin-left: 1.89rem;
        }
      }
    }
    .resolution-ratio-box-row-check {
      touch-action: auto;
      background: var(--webclient-modal-row-check-bg,#454545);
      color: var(--webclient-modal-row-check-font-color,#DDD);
      border-radius: 0.47337rem;
    }
  }
}
</style>
