<template>
    <div class="vmouse" 
        v-on:touchstart="onTouchStart" 
        v-on:touchmove="onTouchMove" 
        v-on:touchend="onTouchEnd" 
        v-on:touchcancle="onTouchEnd"
    >
        <slot></slot>
    </div>
</template>
<script setup>

const isPressed = ref(false);
const dragStarted = ref(false);
const lastMovePositon = ref({
    x: 0,
    y: 0,
});

const emits = defineEmits(['touchstart', 'touchmove', 'drag', 'touchend'])
const onTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    emits('touchstart', e);
    isPressed.value = true;
};
const onTouchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    emits('touchmove', e);
    const current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
    } ;
    if (!dragStarted.value) {
        dragStarted.value = true;
        lastMovePositon.value = current;
        return;
    }
    const motion = {
        x: current.x - lastMovePositon.value.x, 
        y: current.y - lastMovePositon.value.y ,
    };
    emits('drag', motion);
    lastMovePositon.value = current;
};
const onTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    emits('touchend', e);
    isPressed.value = false;
    dragStarted.value = false;
}
</script>
<style lang="scss">
@import "mouse_button.scss";
</style>