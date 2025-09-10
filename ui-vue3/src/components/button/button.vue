<template>
    <div class="button" 
        v-on:click="clickFn"
        v-on:touchstart="onTouchStart"
        v-on:touchend="onTouchEnd"
        v-on:touchcancel="onTouchCancel"
        v-on:mouseenter="onMouseEnter" 
        v-on:mouseleave="onMouseLeave"
        v-on:keyup.enter="onEubmit"
    >
        <div v-if="isShowInfo" class="info">{{info}}</div>
        <div v-if="titleMode==1" class="buttonRow">
            <img class="buttonRowCell" v-bind:src="src" alt="">
            <div class="buttonRowCell">{{title}}</div>
        </div>
        <div v-else-if="titleMode==2" class="buttonTitle">
            {{title}} 
        </div>
        <img v-else-if="titleMode==3" v-bind:src="src" alt="" />
        <div v-else class="buttonTitle">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>

const showInfo = ref(false);

const props = defineProps({
    info: String,
    title: String,
    src: String,
    submit: String
})
const isShowInfo = computed(() => {
    return props.info && showInfo.value;
})

const titleMode = computed(() => {
    if (props.title && props.src) 
        return 1;
    else if (props.title)
        return 2;
    else if (props.src)
        return 3;
    else
        return -1;
})

const emit = defineEmits(['touchstart', 'touchend', 'click', 'submit']);

const clickFn = () => {
    emit('click');
};
const onTouchStart = (e) => {
    emit("touchstart", e);
    showInfo.value = true;
};
const onTouchEnd = (e) => {
    emit("touchend", e);
    showInfo.value = false;
};
const onTouchCancel = (e) => {
    showInfo.value = false;
};
const onMouseEnter = () => {
    showInfo.value = true;
};
const onMouseLeave = () => {
    showInfo.value = false;
};
const onEubmit = () => {
    if (props.submit) {
        emit('click');
        emit('submit');
    }
}
</script>
<style lang="scss" scoped>
@import "button.scss";
</style>