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
<script>
export default {
    props: [],
    data() {
        return {
            isPressed: false,
            dragStarted: false,
            lastMovePositon: {
                x: 0,
                y: 0,
            }
        }
    },
    methods: {
        onTouchStart(e) {
            e.preventDefault();
            e.stopPropagation();
            this.$emit('touchstart', e);
            this.isPressed = true;
        },
        onTouchMove(e) {
            e.preventDefault();
            e.stopPropagation();
            this.$emit('touchmove', e);
            const current = {
                x: event.targetTouches[0].clientX,
                y: event.targetTouches[0].clientY,
            } ;
            if (!this.dragStarted) {
                this.dragStarted = true;
                this.lastMovePositon = current;
                return;
            }
            const motion = {
                x: current.x - this.lastMovePositon.x, 
                y: current.y - this.lastMovePositon.y ,
            };
            // Log.info('motion', motion);
            this.$emit('drag', motion);
            this.lastMovePositon = current;
        },
        onTouchEnd(e) {
            e.preventDefault();
            e.stopPropagation();
            this.$emit('touchend', e);
            this.isPressed = false;
            this.dragStarted = false;
        }
    }
}
</script>
<style lang="scss" scoped>
@import "mouse_button.scss";
</style>