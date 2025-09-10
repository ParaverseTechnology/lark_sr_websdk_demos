<template>
  <div class="m-tooltip" @mouseenter="onShow" @mouseleave="onHide">
    <div
      ref="titleRef"
      class="m-title"
      :class="{'show-tip': visible, 'top': commStore.menubarPosition==='bottom', 'bottom': commStore.menubarPosition==='top'}"
      @mouseenter="onShow"
      @mouseleave="onHide"
      >
      <div class="u-title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div ref="contentRef">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';

const commStore = useCommStore();

const props = defineProps({
  content: { // 展示的文本
    type: String,
    default: '暂无内容' // string | slot
  },
  title: { // 提示的文本
    type: String,
    default: '暂无提示' // string | slot
  }
});



const hideTimer = ref(null);
const visible = ref(false);

const onShow = () => {
  clearTimeout(hideTimer.value);
  visible.value = true;
};
const onHide = () => {
  hideTimer.value = setTimeout(() => {
    visible .value= false
  }, 100)
}
</script>
<style lang="scss" scoped>
.m-tooltip {
  display: inline-block;
  position: relative;
}
.m-title {
  position: absolute;
  z-index: 999;
  pointer-events: none;
  opacity: 0;
  transform-origin: 50% 75%;
  transform: translateX(-50%);
  left: 50%;
  white-space: nowrap;
  transition: transform .25s, opacity .25s;
  .u-title {
    padding: 0.44rem 0.89rem;
    word-break: break-all;
    word-wrap: break-word;
    background: var(--webclient-menubar-tooltip-bg);
    border-radius: 5px;
    font-weight: 400;
    font-size: 1.11111rem;
    color: var(--webclient-menubar-tooltip-font-color);
  }
}
.show-tip {
  pointer-events: auto;
  opacity: 1;
}
.bottom {
  bottom: -30px;
}
.top {
  top: -30px;
}
</style>