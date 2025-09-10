<template>
    <div class="slider-wraper"
        v-on:mouseup="onEnd"
        v-on:mousecancel="onEnd"
        v-on:mouseleave="onEnd"
        v-on:mousemove="onMove"
        v-on:touchmove="onMove"
        v-on:touchcancle="onEnd"
        v-on:touchend="onEnd"
    >
        <div class="slider" ref="sliderRef">
            <div class="slider-bar" :style="barStyle"></div>
            <div class="slider-button-wraper" 
                :style="buttonWraperStyle"
                v-on:mouseenter="onEnter"
                v-on:mouseleave="onLeave"
                v-on:mousedown="onStart"
                v-on:touchstart="onStart(); onEnter();"
                v-on:touchend="onLeave"
                v-on:touchcancle="onLeave"
            >
                <div :class="tooltipClass">{{computedValue}}</div>
                <div class="slider-button"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import Log from '@/utils/log';
import Unit from '@/utils/unit';

const commStore = useCommStore();

const props = defineProps(['min', 'max', 'defaultValue']);

const tooltip = ref(false);
const valueVolumn = ref(100);

watch(() => props.defaultValue, (val) => {
    valueVolumn.value = props.defaultValue ? JSON.parse(JSON.stringify(props.defaultValue)) : 100;
});

const sliderSize = ref({
    width: 0,
    height: 0,
});
const started = ref(false);
const touchX = ref(0);


const computedValue = computed(() => {
    const min = props.min ? props.min : 0;
    const max = props.max ? props.max : 100;
    const range = max - min;
    return Math.round(range * valueVolumn.value / 100) + min;
});
const tooltipClass = computed(() => {
    return tooltip.value ? 'slider-button-tooltip' : 'slider-button-tooltip hide';
});
const barStyle = computed(() => {
    return "width:" + valueVolumn.value + "%";
});
const buttonWraperStyle = computed(() => {
    return "left:" + valueVolumn.value + "%";
});

// 方法
const onEnter = () => {
    tooltip.value = true;
};
const onLeave = () => {
    touchX.value = 0;
    tooltip.value = false;
};
const onStart = () => {
    started.value = true;
};
const onEnd = () => {
    touchX.value = 0;
    started.value = false;
};

const emits = defineEmits(['change']);
const sliderRef = ref(null);
const onMove = (e) => {
    if (!started.value) {
        return;
    }
    if (sliderSize.value.width == 0 && sliderRef.value) {
        sliderSize.value = Unit.getBoundingClientRectSize(sliderRef.value);
    }
    if (sliderSize.value.width == 0) {
        return;
    }

    let movementX = 0;

    if (e.movementX) {
        movementX = e.movementX;
    } else if (e.targetTouches && e.targetTouches[0]) {
        const clientX = commStore.screenOrientation == 'landscape' ? e.targetTouches[0].clientY : e.targetTouches[0].clientX;
        movementX = touchX.value == 0 ? 0 : (clientX - touchX.value) * 0.1;
        touchX.value = clientX;
    } else {
        // WARNING not handle touch
        Log.warn("slider not support event", e, touchX.value);
        return;
    }
    
    let value = valueVolumn.value + movementX / sliderSize.value.width * 100;
    // value = Math.round(value);
    if (value > 99) {
        value = 100;
    }
    if (value < 1) {
        value = 0;
    }
    valueVolumn.value = value;
    emits('change', computedValue.value);
};
onMounted(() => {
    Log.info("slider size", Unit.getBoundingClientRectSize(sliderRef.value));
    if (sliderRef.value) {
        sliderSize.value = Unit.getBoundingClientRectSize(sliderRef.value);
    }
})
</script>
<style lang="scss" scoped>
@import "slider.scss";
</style>