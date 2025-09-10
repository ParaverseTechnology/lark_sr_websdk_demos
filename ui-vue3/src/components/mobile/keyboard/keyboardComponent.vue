<template>
  <!-- PxyCommonUI 组件容器 -->
  <div ref="uiKeyboardRef" style=" position: 'absolute';zIndex: 2000; bottom: 0;width: '100%';"></div>
</template>

<script setup>
import { useCommStore } from '@/stores/comm.js';
import PxyCommonUI from 'pxy_webcommonui';
const { Keyboard } = PxyCommonUI;

const commStore = useCommStore();

const keyboard = ref(null);



const uiKeyboardRef = ref(null);
onMounted(() => {
  keyboard.value = new Keyboard({
    // 必填项，挂载的根元素
    rootElement: uiKeyboardRef.value, 
    larksr: commStore.larksr,
    language: commStore.larksr.params.language === 'en-US'? 'en':'zh'
  })
  keyboard.value.show();
  keyboard.value.on('keyboardVal', (e)=>{
    console.log('e',e.detail)
  })
  keyboard.value.on('toggleKeyboard', (e)=>{
    console.log('e',e.detail)
    commStore.toggleVKeyboard();
  })
})
</script>

<style></style>
