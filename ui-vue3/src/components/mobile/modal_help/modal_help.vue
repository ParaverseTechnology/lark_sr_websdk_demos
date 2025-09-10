<template>
  <div class="mobile-modal" :style="helpStyle" ref="modal">
    <div class="mobile-modal-title">
      <i class="iconfont icon-arrow" @click="closeModal"></i>
      <span class="mobile-modal-title-text">
        {{ ui.help }}
      </span>
    </div>
    <div class="help-content">
      <div v-for="(item, index) in helpList" class="help-row" :key="item.title">
        <div class="help-row-title" @click="caretFn(index)">
          <p>{{item.title}}</p>
          <div :ref="el => getHelpRef(el, index)">
            <el-icon><CaretBottom /></el-icon>
          </div>
        </div>
        <div class="help-row-content" :ref="el => getContentRef(el, index)">
          {{item.content}}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import { useModalHelpStore } from '@/stores/modal_help.js';

const commStore = useCommStore();
const modalHelpStore = useModalHelpStore();

const active = ref('');

const ui = computed(() => { return commStore.ui });

const helpStyle = computed(() => {
  let obj = {};
  if(commStore.screenOrientation==='landscape' || commStore.mobileForceLandScape) {
    obj = {
      'width': '34.31rem',
      'height': commStore.viewPort.height +'px',
      // 'display': modalHelpStore.isShowMobileHelp ? 'block' : 'none',
      'right': modalHelpStore.isShowMobileHelp ? '0' : '-'+ '34.31rem'
    }
  } else {
    obj = {
      'width': '100%',
      'height': commStore.viewPort.height +'px',
      // 'display': modalHelpStore.isShowMobileHelp ? 'block' : 'none',
      'right': modalHelpStore.isShowMobileHelp ? '0' : '-'+ '100%'
    }
  }
  return obj
});

const helpRefList = ref([]);
const getHelpRef = (el, index) => {
  if (el) {
    helpRefList.value[index] = el; 
  }
}

const contentRefList = ref([]);
const getContentRef = (el, index) => {
  if (el) {
    contentRefList.value[index] = el; 
  }
}

const helpList = computed(() => {
  let list = [
    {title: ui.value.helpTitle1,content: ui.value.helpContent1},
    {title: ui.value.helpTitle2,content: ui.value.helpContent2}
  ]
  if(commStore.isMobile) {
    list.push( {title: ui.value.helpTitle4,content: ui.value.helpContent4})
  }
  return list
});


const caretFn = (index) => {
  if(active.value === index) {
    active.value = '';

    helpRefList.value[index].style.transform = 'rotate(0deg)';
    contentRefList.value[index].style['max-height'] = '0px';
    contentRefList.value[index].style['margin-bottom'] = '0px';
   
  } else {
    active.value = index;

    helpRefList.value[index].style.transform = 'rotate(-180deg)';
    contentRefList.value[index].style['max-height'] = '28.3rem';
    contentRefList.value[index].style['margin'] = '0.5rem 0';
   
  }

  helpRefList.value[index].style.transition = 'all 0.1s';
  contentRefList.value[index].style.transition = 'all 0.3s';
};
const closeModal = () => {
  modalHelpStore.setIsShowMobileHelp(false);
};
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
    i,svg {
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
