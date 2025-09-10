<template>
  <div class="m-switch-wrap">
    <div @click="disabled ? e => e.preventDefault() : onSwitch()" :class="['m-switch', { 'switch-checked': checkedVal, 'disabled': disabled }]">
      <div :class="['u-switch-inner', checkedVal ? 'inner-checked' : 'inner-unchecked' ]"></div>
      <div :class="['u-node', { 'node-checked': checkedVal }]"></div>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  defaultChecked: { // 初始是否选中
    type: Boolean,
    default: false
  },
  checkedInfo: { // 选中时的内容
    type: [Number, String],
    default: null
  },
  uncheckedInfo: { // 未选中时的内容
    type: [Number, String],
    default: null
  },
  disabled: { // 是否禁用
    type: Boolean,
    default: false
  },
  checked: { // （v-model）指定当前是否选中
    type: Boolean,
    default: null
  }
});

const checkedVal = ref(null);

watch(() => props.checked, () => {
  initSwitcher();
});
watch(() => props.defaultChecked, () => {
  initSwitcher();
});

const initSwitcher = () => {
  if (typeof props.checked === 'boolean') {
    checkedVal.value = props.checked
  } else if (typeof props.checked === 'object') {
    checkedVal.value = props.defaultChecked
  }
};
const emits = defineEmits(['change']);
const onSwitch = () => {
  checkedVal.value = !checkedVal.value;
  emits('change', checkedVal.value);
}

initSwitcher();
</script>
<style lang="scss" scoped>
.m-switch-wrap {
  height: 22px;
  min-width: 44px;
  display: inline-block;
  .m-switch {
    position: relative;
    height: 22px;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    background: var(--webclient-modal-tag-active-bg,#fff);
    // background: rgba(0,0,0,.25);
    border-radius: 100px;
    cursor: pointer;
    transition: all .36s;
    .u-switch-inner {
      display: inline-block;
      color: var(--webclient-modal-tag-active-bg,#fff);
      font-size: 14px;
      line-height: 22px;
      padding: 0 8px;
      transition: all .36s;
    }
    .inner-checked {
      margin-right: 18px;
    }
    .inner-unchecked {
      margin-left: 18px;
    }
    .u-node {
      position: absolute;
      top: 5px;
      left: 4px;
      width: 12px;
      height: 12px;
      background: var(--webclient-modal-tag-active-font-color,#474747);
      border-radius: 100%;
      cursor: pointer;
      transition: all .36s;
    }
    .node-checked { // 结果等价于right: 2px; 为了滑动效果都以左边为基准进行偏移
      left: 100%;
      margin-left: -4px;
      transform: translateX(-100%);
      background: var(--webclient-modal-tag-active-bg,#fff);
    }
  }
  .switch-checked {
    background: var(--webclient-check-color,#00B031);
  }
  .disabled {
    cursor: not-allowed;
    opacity: .4;
  }
}
</style>