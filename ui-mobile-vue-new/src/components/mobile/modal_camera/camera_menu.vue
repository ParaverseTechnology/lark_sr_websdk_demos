<template>
  <div class="mobile-modal" :style="videoStyle" ref="modal">
    <div class="mobile-modal-title">
      <i class="iconfont icon-arrow" @click="closeModal"></i>
      <span class="mobile-modal-title-text">
        选择摄像头
      </span>
    </div>
    <div class="camera-content">
      <div class="camera-content-row">
        <span>前置摄像头</span>
        <span @click="toogleCamera('environment')" v-if="mobileCamera==='user'" class="iconfont camera-content-row-icon">&#xe63c;</span>
        <span @click="toogleCamera('user')" v-else class="iconfont camera-content-row-icon">&#xe650;</span>
      </div>
      <div class="camera-content-row">
        <span>后置摄像头</span>
        <span @click="toogleCamera('user')" v-if="mobileCamera==='environment'" class="iconfont camera-content-row-icon">&#xe63c;</span>
        <span @click="toogleCamera('environment')" v-else class="iconfont camera-content-row-icon">&#xe650;</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data () {
    return {
      active: 'user'
    }
  },
  computed: {
    videoStyle() {
      let obj = {};
      if(this.screenOrientation==='landscape' || this.mobileForceLandScape) {
        obj = {
          'width': '34.31rem',
          'height': this.viewPort.height +'px',
          'right': this.isShowCameraModal ? '0' : '-'+ '34.31rem'
        }
      } else {
        obj = {
          'width': '100%',
          'height': this.viewPort.height +'px',
          'right': this.isShowCameraModal ? '0' : '-'+ '100%'
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
      isShowCameraModal: state => state.modalCamera.isShowCameraModal,
      mobileCamera: state => state.modalCamera.mobileCamera,
    })
  },
  methods: {
    closeModal() {
      this.setIsShowCameraModal(false);
    },
    toogleCamera(type) {
      this.setMobileCamera(type);
    },
    ...mapMutations({
      setIsShowCameraModal: 'modalCamera/setIsShowCameraModal',
      setMobileCamera: 'modalCamera/setMobileCamera',
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
  z-index: 99;
  &-title {
    height: 5.2071rem;
    padding: 1.18rem;
    box-sizing: border-box;
    background-color: var(--webclient-modal-title-bg,#454545);
    color: var(--webclient-modal-font-color,#DDDDDD);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    i {
      display: inline-block;
      transform: rotate(180deg);
      font-size: 2.54rem;
      vertical-align: middle;
    }
    &-text {
      font-size: 1.6568rem;
      vertical-align: middle;
    }
  }
}
.camera-content {
  overflow-y: auto;
  height: calc(100% - 5.2071rem);
  padding: 1.89rem;
  box-sizing: border-box;
  color: var(--webclient-modal-font-color,#DDD);
  &-row {
    height: 3.43rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.42012rem;
    &-icon {
      font-size: 2.2rem;
    }
  }
  .camera-content-row:nth-of-type(1) {
    margin-bottom: 0.36rem;
  }
}
</style>
