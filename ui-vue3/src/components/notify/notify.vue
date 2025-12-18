<template>
    <div class="notifybar" v-bind:style="style">
        <div class="alertInfo">
            [{{notify.level}}]:{{notify.msg}}
        </div>
        <Btn 
            :info="ui.buttonClose"
            v-bind:src="CloseImg"
            v-on:click="clearNotifyFn"
        />
    </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import { useNotifyBarStore } from '@/stores/notifybar.js';
import Btn from '../button/button.vue';
import Log from '@/utils/log';
import CloseImg from '@/assets/images/close.svg';

const commStore = useCommStore();
const notifyBarStore = useNotifyBarStore();

const ui = computed(() => commStore.ui);
const notify = computed(() => notifyBarStore.notify);

const style = computed(() => {
    const res = {
        width: commStore.container.width + 'px',
        marginTop: commStore.container + 'px',
        marginLeft: commStore.container.marginLeft + 'px',
    };
    return res;
})

const onClose = () => {
    Log.info('close notify bar');
};

const clearNotifyFn = () => {
    store.commit('notifyBar/clearNotify' )
}

</script>
<style lang="scss" scoped>
@import "notify.scss";
</style>