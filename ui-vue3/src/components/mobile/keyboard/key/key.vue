<template>
    <div :class="keyClass" 
        v-on:selectstart="onSelect"
        v-on:touchstart="onTouchStart" v-on:touchend="onTouchEnd" v-on:touchcancle="onTouchEnd" >
        <div v-if="showTip && isInput" class="tip">
            <slot v-on:selectstart="onSelect"></slot>
        </div>
        <slot></slot>
    </div>
</template>
<script setup>

const props = defineProps(["circle", "size", "keyName"]);

const showTip = ref(false);
const timeout = ref(null);
const touched = ref(false);
const touchStartTime = ref(0);
const longPressed = ref(false);

const isInput = computed(() => {
    return !this.type || this.type == "input";
})

const keyClass = computed(() => {
    if (props.circle) {
        return props.size ? "key circle " + props.size : "key circle";
    } else {
        return props.size ? "key " + props.size : "key";
    }
});
const emits = defineEmits(['start', 'end','longPress','repeat'])
const onTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Log.info("onTouchStart");
    showTip.value = true;
    touched.value = true;
    touchStartTime.value = Date.now();
    emits("start", props.keyName);
    timeout.value = window.setTimeout(() => {
        repeatPress();
    }, 500);
};
const onTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Log.info("onTouchEnd");
    showTip.value = false;
    touched.value = false;
    longPressed.value = false;
    if (timeout.value) {
        window.clearTimeout(timeout.value);
    }
    touchStartTime.value = 0;
    emits("end", props.keyName);
};
const repeatPress = () => {
    if (touched.value) {
        // check long press
        if (!longPressed.value && touchStartTime.value != 0 && Date.now() - touchStartTime.value > 2000) {
            longPressed.value = true;
            emits("longPress",props.keyName);
        }
        timeout.value = window.setTimeout(() => {
            emits("repeat", props.keyName);
            repeatPress();
        }, 250);
    }
};
const onSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
</script>
<style lang="scss" scoped>
@import 'key.scss';
</style>