<template>
  <div class="clipboardPanel modalAlertPanel" :style="viewPortStyle">
    <div class="container">
      <div class="container-title">
        <div>
          <p>{{ ui.cloudClipboard }}</p>
        </div>
      </div>
      <div class="content">
        <p class="content-label">{{ ui.cloudClipboardContent }}</p>
        <textarea
          ref="clipboardText"
          class="clipboard-text"
          :value="content"
          :aria-label="ui.cloudClipboardContent"
          readonly
          @focus="$event.target.select()"
        />
      </div>
      <div class="modalConfirmPanel-divider"></div>
      <div class="button-group">
        <Btn :title="ui.close" @click="onClose" />
        <Btn ref="copyButton" :title="ui.copy" submit="true" />
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import Btn from '../button/button';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'ClipboardPanel',
  components: { Btn },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      copyButton: null
    };
  },
  computed: {
    ...mapState({
      ui: state => state.ui
    }),
    ...mapGetters(['viewPortStyle'])
  },
  methods: {
    onClose() {
      this.$emit('close');
    }
  },
  mounted() {
    const copyButtonElement = this.$refs.copyButton && this.$refs.copyButton.$el;
    if (!copyButtonElement) {
      return;
    }

    this.copyButton = new Clipboard(copyButtonElement, {
      text: () => this.content
    });
    this.copyButton.on('success', (event) => {
      event.clearSelection();
      this.$emit('copied');
    });
    this.copyButton.on('error', () => {
      this.$emit('copy-error');
    });
  },
  beforeDestroy() {
    if (this.copyButton) {
      this.copyButton.destroy();
      this.copyButton = null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../alert/alert.scss";

.clipboardPanel {
  .container {
    overflow: hidden;

    .content {
      display: block;
      height: auto;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
      overflow: visible;

      .content-label {
        margin: 0 0 10px;
      }

      .clipboard-text {
        width: 100%;
        height: px2rem(180);
        min-height: px2rem(180);
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid var(--webclient-dialog-divider);
        background: rgba(0, 0, 0, 0.1);
        color: inherit;
        font: inherit;
        line-height: px2rem(32);
        resize: vertical;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.35) transparent;

        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.35);
          border-radius: 3px;
          background-clip: padding-box;
        }

        &::-webkit-scrollbar-button {
          display: none;
          width: 0;
          height: 0;
        }
      }
    }

    .button-group {
      .button + .button {
        margin-left: 2rem;
      }
    }
  }
}
</style>