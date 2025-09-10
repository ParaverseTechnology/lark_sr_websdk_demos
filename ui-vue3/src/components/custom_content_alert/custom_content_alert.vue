<template>
    <div class="customContentAlert" :style="viewPortStyles">        
        <div class="customContentAlert-container" :style="alertPositionStyle">
            <div class="customContentAlert-title">
                <div>
                    <p>{{customContentAlertStore.customContentAlertTitle}}</p>
                </div>
                <slot name="close"></slot>
            </div>
            <div class="customContentAlert-content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import { useCustomContentAlertStore } from '@/stores/custom_content_alert.js';

const commStore = useCommStore();
const customContentAlertStore = useCustomContentAlertStore();

const props = defineProps({
    alertPositionStyle: {
        type: Object,
        require: false
    },
    customContentStyle: {
        type: String,
        require: false
    }
})

const viewPortStyles = computed(() => {
    if( props.customContentStyle) {
        return props.customContentStyle;
    } else {
        return {
            'width': commStore.viewPort.width+'px'
        }
    }
})

</script>
<style lang="scss" scoped>
@import "custom_content_alert.scss";
</style>