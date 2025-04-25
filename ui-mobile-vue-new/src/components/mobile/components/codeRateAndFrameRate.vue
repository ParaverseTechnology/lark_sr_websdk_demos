<template>
  <div class="mobile-modal" :style="rateStyle" ref="modal">
    <div class="mobile-modal-title">
      <i class="iconfont icon-arrow" @click="closeModal"></i>
      <span class="mobile-modal-title-text">
        画质
      </span>
    </div>
    <div class="rate-content">
      <p class="rate-content-title">
        {{ ui.frameRate }}
      </p>
      <div class="code-box">
        <div :class="{'code-box-row': true, 'code-box-row-check':frameRate===30}" @click="changeFrameRate(30)">
          <span class="iconfont code-box-row-icon">{{frameRate===30?'&#xe61c;':'&#xe623;'}}</span>
          <span class="code-box-row-label">30</span>
        </div>
        <div :class="{'code-box-row': true, 'code-box-row-check':frameRate===60}" @click="changeFrameRate(60)">
          <span class="iconfont code-box-row-icon">{{frameRate===60?'&#xe61c;':'&#xe623;'}}</span>
          <span class="code-box-row-label">60</span>
        </div>
      </div>
      <div class="customContentAlert-divider"></div>
      <p class="rate-content-title">
        {{ ui.codeRate }}
      </p>
      <div class="frame-box">
        <div v-for="item in frameRateList" :key="item.label" style="touch-action:auto;">
          <div :class="{'frame-box-row': true, 'frame-box-row-check':codeRate===item.label}" @click="changeCodeRate(item.label)">
            <div>
              <span class="iconfont frame-box-row-icon">{{codeRate===item.label?'&#xe61c;':'&#xe623;'}}</span>
              <span class="frame-box-row-label">{{item.sublabel}}</span>
            </div>
            <span class="frame-box-row-label">{{item.label}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: ['codeRate', 'frameRate'],
  data () {
    return {
      frameRateList: [
        {label: 5000,sublabel: ""},
        {label: 8000,sublabel: this.ui.quality1},
        {label: 10000,sublabel: this.ui.quality2},
        {label: 15000,sublabel: ""},
        {label: 20000,sublabel: this.ui.quality3},
        {label: 30000,sublabel: ""},
        {label: 50000,sublabel: this.ui.quality4},
        {label: 100000,sublabel: ""},
      ],
    }
  },
  computed: {
    rateStyle() {
      let obj = {};
      if(this.screenOrientation==='landscape' || this.mobileForceLandScape) {
        obj = {
          'width': '34.31rem',
          'height': this.viewPort.height +'px',
          'right': this.isShowQualityModal || this.isShowQualityModalForSetting ? '0' : '-'+ '34.31rem'
        }
      } else {
        obj = {
          'width': '100%',
          'height': this.viewPort.height +'px',
          'right': this.isShowQualityModal || this.isShowQualityModalForSetting ? '0' : '-'+ '100%'
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
      mobileForceLandScape: state => state.mobileForceLandScape,
      isShowQualityModal: state => state.modalStream.isShowQualityModal,
      isShowQualityModalForSetting: state => state.modalStream.isShowQualityModalForSetting
    })
  },
  methods: {
    closeModal() {
      this.setIsShowQualityModal(false);
      this.setIsShowQualityModalForSetting(false);
    },
    changeCodeRate(val) {
      this.$emit('sendCodeRate', val);
    },
    changeFrameRate(val) {
      this.$emit('sendFrameRate', val);
    },
    ...mapMutations({
      setIsShowQualityModal: 'modalStream/setIsShowQualityModal',
      setIsShowQualityModalForSetting: 'modalStream/setIsShowQualityModalForSetting'
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
    background-color: var(--webclient-modal-title-bg, #454545);
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
    }
  }
}
.rate-content {
  overflow-y: auto;
  height: calc(100% - 5.2071rem);
  padding: 1.89rem 0.95rem;
  box-sizing: border-box;
  color: var(--webclient-modal-font-color,#DDDDDD);;
  touch-action: auto;
  -webkit-overflow-scrolling: touch;
  &-title {
    text-align: left;
    font-size: 1.42012rem;
    padding: 0 0.95rem;
    margin: 0;
    height: 3.43rem;
    line-height: 3.43rem;
    touch-action: auto;
  }
  .code-box,.frame-box {
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
        span {
          vertical-align: middle;
        }
        >span:nth-of-type(2) {
          display: inline-block;
          margin-left: 1.89rem;
          touch-action: auto;
        }
      }
    }
    .code-box-row-check,.frame-box-row-check {
      background: var(--webclient-modal-row-check-bg,#454545);
      color: var(--webclient-modal-row-check-font-color,#DDD);
      border-radius: 0.47337rem;
      touch-action: auto;
    }
  }
}
</style>
