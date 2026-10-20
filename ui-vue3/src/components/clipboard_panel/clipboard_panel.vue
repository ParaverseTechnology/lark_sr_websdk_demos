<template>
    <div class="clipboardPanel modalAlertPanel" :style="commStore.viewPortStyle">
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
                <Btn ref="copyButtonRef" :title="ui.copy" submit="true" />
            </div>
        </div>
    </div>
</template>
<script setup>
import clipboard from 'clipboard';
import Btn from '../button/button.vue';
import Log from '@/utils/log';
import { useCommStore } from '@/stores/comm';
import { useToastStore } from '@/stores/toast';

const props = defineProps({
    content: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['close', 'copied', 'copy-error']);

const commStore = useCommStore();
const toastStore = useToastStore();
const ui = computed(() => commStore.ui);

const copyButtonRef = ref(null);
let copyButton = null;

const onClose = () => {
    emit('close');
};

onMounted(() => {
    const copyButtonElement = copyButtonRef.value && copyButtonRef.value.$el;
    if (!copyButtonElement) {
        return;
    }

    copyButton = new clipboard(copyButtonElement, {
        text: () => props.content
    });
    copyButton.on('success', (event) => {
        Log.info('clipboard copy success', event.text);
        event.clearSelection();
        toastStore.toastAct({ text: ui.value.copySuccess, position: 2 });
        emit('copied');
    });
    copyButton.on('error', () => {
        Log.info('clipboard copy error');
        toastStore.toastAct({ text: ui.value.cloudClipboardCopyFailed, position: 2 });
        emit('copy-error');
    });
});

onUnmounted(() => {
    if (copyButton) {
        copyButton.destroy();
        copyButton = null;
    }
});
</script>
<style lang="scss" scoped>
@import "clipboard_panel.scss";
</style>
