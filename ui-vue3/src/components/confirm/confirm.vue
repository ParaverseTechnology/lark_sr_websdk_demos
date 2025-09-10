<template>
    <div class="modalConfirmPanel" v-bind:style="commStore.viewPortStyle">
        <div class="container">
            <div class="modalConfirmPanel-title">
                <div>
                    <p>{{modalConfirmStore.modalConfirm.title}}</p>
                </div>
                <div v-on:click="onCancel">
                    <el-icon><Close /></el-icon>
                </div>
            </div>
            <div class="content">
                <p>{{modalConfirmStore.modalConfirm.des}}</p>
            </div>
            <div class="modalConfirmPanel-divider"></div>
            <div class="button-group">
                <Btn class="submit" :title="commStore.ui.buttonSubmit" submit="false" v-on:click="onSubmit" />
                <Btn class="cancel" :title="commStore.ui.buttonCancel" submit="false" v-on:click="onCancel" />
            </div>
        </div>
    </div>
</template>
<script setup>
import Btn from '../button/button.vue';
import Log  from '@/utils/log';
import { useCommStore } from '@/stores/comm';
import { useModalConfirmStore } from '@/stores/modal_confirm';

const commStore = useCommStore();
const modalConfirmStore = useModalConfirmStore();


const onCancel = () => {
    Log.info('onCancel');
    if (modalConfirmStore.modalConfirm.onCancel) {
        modalConfirmStore.modalConfirm.onCancel();
    }
    modalConfirmStore.reset();
};
const onSubmit = () => {
    Log.info('onSubmit');
    if (modalConfirmStore.modalConfirm.onSubmit) {
        modalConfirmStore.modalConfirm.onSubmit();
    }
    modalConfirmStore.reset();
};
const onKeyup = (e) => {
    if (e.key == 'Enter') {
        onSubmit();
    }
}

onMounted(() => {
    document.addEventListener('keyup', onKeyup);
})

onUnmounted(() => {
    document.removeEventListener('keyup', onKeyup);
})

</script>
<style lang="scss" scoped>
@import "confirm.scss";
</style>
