<template>
    <div class="modalAlertPanel" :style="commStore.viewPortStyle">
        <div class="container">
            <div class="container-title">
                <div>
                    <p>{{ commStore.ui.tip }}</p>
                </div>
            </div>
            <div class="content">
                <p>{{modalAlertStore.modalAlert.des}}</p>
            </div>
            <div class="modalConfirmPanel-divider"></div>
            <div class="button-group">
                <Btn :title="commStore.ui.buttonSubmit" submit="true" v-on:click="onSubmit" />
            </div>
        </div>
    </div>
</template>
<script setup>
import Btn        from '../button/button.vue';
import { useCommStore } from '@/stores/comm';
import { useModalAlertStore } from '@/stores/modal_alert';

const commStore = useCommStore();
const modalAlertStore = useModalAlertStore();

// const modalAlert = computed(() => store.state.modalAlert.modalAlert);
const viewPortStyle = computed(() => store.state.viewPortStyle);

const onSubmit = () => {
    if (modalAlertStore.modalAlert.callback) {
        modalAlertStore.modalAlert.callback();
    }
    modalAlertStore.reset();
};
const onKeyup = (e) => {
    if (e.key == 'Enter') {
        onSubmit();
    }
};

onMounted(() => {
    document.addEventListener('keyup', onKeyup);
})

onUnmounted(() => {
    document.removeEventListener('keyup', onKeyup);
})
</script>
<style lang="scss" scoped>
@import "alert.scss";
</style>
