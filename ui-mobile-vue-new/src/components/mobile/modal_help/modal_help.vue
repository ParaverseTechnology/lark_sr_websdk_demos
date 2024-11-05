<template>
  <div class="mobile-modal" :style="helpStyle" ref="modal">
    <div class="mobile-modal-title">
      <i class="iconfont icon-arrow" @click="closeModal"></i>
      <span class="mobile-modal-title-text">
        帮助
      </span>
    </div>
    <div class="help-content">
      <div v-for="(item, index) in helpList" class="help-row" :key="item.title">
        <div class="help-row-title" @click="caretFn(index)">
          <p>{{item.title}}</p>
          <i :ref="'caret'+index" class="el-icon-caret-bottom"></i>
        </div>
        <div class="help-row-content" :ref="'content'+index">
          {{item.content}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data () {
    return {
      active: '',
    }
  },
  computed: {
    helpStyle() {
      let obj = {};
      if(this.screenOrientation==='landscape' || this.mobileForceLandScape) {
        obj = {
          'width': '34.31rem',
          'height': this.viewPort.height +'px',
          // 'display': this.isShowMobileHelp ? 'block' : 'none',
          'right': this.isShowMobileHelp ? '0' : '-'+ '34.31rem'
        }
      } else {
        obj = {
          'width': '100%',
          'height': this.viewPort.height +'px',
          // 'display': this.isShowMobileHelp ? 'block' : 'none',
          'right': this.isShowMobileHelp ? '0' : '-'+ '100%'
        }
      }
      return obj
    },
    helpList() {
      let list = [
        {title: '卡顿解决办法',content: '当前网络质量不稳定，请尝试更换网络环境'},
        {title: '应用无法启动',content: '当前进入应用的用户数较多，等待一段时间后仍无法进入，可尝试点击重新启动按钮再次进入应用；如仍旧无法进入，请尝试刷新网页 url 重新连接应用'}
      ]
      if(this.isMobile) {
        list.push({title: '如何收缩/显示控制球',content: '点击【解锁】进行控制球菜单解锁，关闭控制球菜单面板2秒后控制球收缩到屏幕侧边，点击控制球，控制球弹出显示；如需持续显示控制球，点击【锁定】进行控制球菜单锁定，控制球将不会收缩至屏幕侧边'})
      }
      return list
    },
    ...mapGetters({
      screenOrientation: 'screenOrientation',
      viewPort: 'viewPort',
      mobilePixelUnit: 'mobilePixelUnit',
    }),
    ...mapState({
      isMobile: state => state.isMobile,
      mobileForceLandScape: state => state.mobileForceLandScape,
      isShowMobileHelp: state => state.modalHelp.isShowMobileHelp,
      mobileWebMenuType: state => state.mobileWebMenuType,
    })
  },
  methods: {
    caretFn(index) {
      if(this.active === index) {
        this.active = '';
        this.$refs['caret'+index][0].style.transform = 'rotate(0deg)';
        this.$refs['content'+index][0].style['max-height'] = '0px';
        this.$refs['content'+index][0].style['margin-bottom'] = '0px';
      } else {
        this.active = index;
        this.$refs['caret'+index][0].style.transform = 'rotate(-180deg)';
        this.$refs['content'+index][0].style['max-height'] = '28.3rem';
        this.$refs['content'+index][0].style['margin'] = '0.5rem 0';
      }
      
      this.$refs['caret'+index][0].style.transition = 'all 0.1s';
      this.$refs['content'+index][0].style.transition = 'all 0.3s';
    },
    closeModal() {
      this.setIsShowMobileHelp(false);
    },
    ...mapMutations({
      setIsShowMobileHelp: 'modalHelp/setIsShowMobileHelp'
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
.help-content {
  overflow-y: auto;
  height: calc(100% - 5.2071rem);
  touch-action: auto;
}
.help-row {
  color: var(--webclient-modal-font-color,#DDDDDD);
  border-bottom: 1px solid var(--webclient-dialog-divider);
  cursor: pointer;
  padding: 1.18rem;
  box-sizing: border-box;
  font-family: Noto Sans SC;
  font-size: 1.42012rem;
  touch-action: auto;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    box-sizing: border-box;
    >i {
      cursor: pointer;
      font-size: 2rem;
      transform: rotate(0deg);
    }
    >i.active {
      transform: rotate(180deg);
      transition: all 0.3s;
    }
    >p {
      margin: 0;
    }
  }
  &-content {
    text-align: left;
    margin-bottom: 0px;
    max-height: 0px;
    overflow: auto;
    touch-action: auto;
  }
}
</style>
