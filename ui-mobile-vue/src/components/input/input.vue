<template>
    <div :class="inputTextClass">
      <div v-if="!inputMethodStart" class="title">
        {{ ui.requireInputChinese }}
      </div>
      <div v-if="inputMethodStart">
        <textarea
          type="text"
          v-model.trim="inputText"
          @focus="onInputMethodFocus"
          @blur="onInputMethodBlur"
        />
      </div>
      <Btn
        class="closeBtn"
        v-if="!inputMethodStart"
        v-bind:src="CloseImg"
        v-on:click="onCloseInputText"
      />
      <Btn
        class="submitBtn"
        v-if="!inputMethodStart"
        :title="ui.buttonSubmit"
        v-on:click="onStartInputText"
      />
      <div v-else class="button-group">
        <Btn :title="ui.buttonInput" v-on:click="onSubmitInputText" />
        <Btn :title="ui.buttonBack" v-on:click="onCancleInputText" />
      </div>
    </div>
</template>
<script>
import Btn from '../button/button.vue';
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { LarkSR, LarkSRClientEvent } from "larksr_websdk";

export default {
    components: {
        Btn,
    },
  data() {
    return {
      inputText: "",
      inputMethodStart: false,
      inputMethodEnable: false,
      CloseImg: require("../../assets/img/mobile/icon_close.png"),
    };
  },
  computed: {
    inputTextClass() {
      return this.inputMethodEnable ? "inputText enable" : "inputText disable";
    },
    ...mapState({
      larksr: (state) => state.larksr,
      ui: (state) => state.ui,
    }),
  },
  methods: {
    setInputMethodStart(state) {
        this.inputMethodStart = state;
    },
    setInputMethodEnable(state) {
        this.inputMethodEnable = state;
    },
    onStartInputText() {
      this.setInputMethodStart(true);
    },
    onInputMethodFocus() {
      console.log("on input method focus");
      this.inputText = "";
      if (this.larksr) {
        this.larksr.op.setKeyboardEnable(false);
      }
    },
    onInputMethodBlur() {
      console.log("on input method blur");
      if (this.larksr) {
        this.larksr.op.setKeyboardEnable(true);
      }
    },
    onSubmitInputText() {
      this.setInputMethodStart(false);
      this.setInputMethodEnable(true);
      if (this.larksr) {
        console.log("submit input text", this.inputText);
        this.larksr.inputText(this.inputText);
        this.larksr.op.setKeyboardEnable(true);
      }
      this.inputText = "";
    },
    onCancleInputText() {
      this.inputText = "";
      this.setInputMethodStart(false);
      this.setInputMethodEnable(true);
      if (this.larksr) {
        this.larksr.op.setKeyboardEnable(true);
      }
    },
    onCloseInputText() {
      this.inputText = "";
      this.setInputMethodStart(false);
      this.setInputMethodEnable(false);
      if (this.larksr) {
        this.larksr.op.setKeyboardEnable(true);
      }
    },
  },
  mounted() {
    console.log("this larksr", this.larksr);
    this.larksr.on(LarkSRClientEvent.APP_REQUEST_INPUT, (e) => {
      console.log("LarkSRClientEvent APP_REQUEST_INPUT", e);
      if (e.data === true) {
        this.setInputMethodEnable(e.data);
      } else {
        this.setInputMethodEnable(false);
      }
    });
  },
}
</script>
<style lang="scss" scoped>
@import 'input.scss';
</style>