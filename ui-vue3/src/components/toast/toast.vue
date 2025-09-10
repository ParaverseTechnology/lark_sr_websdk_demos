<template>
    <div v-if="toast.show" class="toast" :style="toastPosition">
        <span class="toastText" :style="toastText">{{toast.text}}</span>
    </div>
</template>
<script setup>
import { ToastPosition, useToastStore  } from '@/stores/toast.js'
import { useCommStore } from '@/stores/comm.js';

const commStore = useCommStore();
const toastStore = useToastStore();

const toast = computed(() => toastStore.toast);

const toastText = computed(() => {
    if (toast.value.level == 3) {
        return {
            'background-color': 'var(--webclient-toast-bg-1)',
            color: 'var(--webclient-toast-font-color)',
        }
    } else {
        return {};
    }
})

const toastPosition = computed(() => {
    const position = toast.value.position;
    let top = "";
    if (position) {
        if (position === ToastPosition.UP) {
            top = '7%';
        } else if (position === ToastPosition.DOWN) {
            top = '85%';
        }
    }
    if (toast.value.level == 3) {
        return {
            top,
        }
    } else {
        return {
            top,
        }
    }
})

</script>
<style lang="scss" scoped>
@import "toast.scss";
</style>