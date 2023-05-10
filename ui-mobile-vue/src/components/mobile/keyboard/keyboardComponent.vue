<template>
  <!-- PxyCommonUI 组件容器 -->
  <div ref="uiKeyboardRef" style=" position: 'absolute';zIndex: 2000; bottom: 0;width: '100%';"></div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import store from '@/store';
import PxyCommonUI from 'pxy_webcommonui';
const { Keyboard } = PxyCommonUI;

export default {
  name: "App",
  components: {},
  data() {
    return {
      keyboard: null,
    };
  },
  computed: {
    ...mapState({
      larksr: (state) => state.larksr,
    }),
    ...mapActions({
      // toggleVKeyboard: 'toggleVKeyboard',
    }),
  },
  mounted() {
    // Pxycommonui 组件 
    // @see https://github.com/pingxingyun/pxy_webcommonui
    this.keyboard = new Keyboard({
      // 必填项，挂载的根元素
      rootElement: this.$refs["uiKeyboardRef"], 
      larksr: this.larksr,
      language: this.larksr.params.language === 'en-US'? 'en':'zh'
    })
    this.keyboard.show();
    this.keyboard.on('keyboardVal', (e)=>{
      console.log('e',e.detail)
    })
    this.keyboard.on('toggleKeyboard', (e)=>{
      console.log('e',e.detail)
      store.dispatch('toggleVKeyboard');
    })
  },
  methods: {}
};
</script>

<style></style>
