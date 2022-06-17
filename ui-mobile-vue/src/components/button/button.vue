<template>
    <div class="button" 
        v-on:click="$emit('click')"
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
<script>
export default {
    name: 'btn',
    props: ['info', 'title', 'src', 'submit'],
    data() {
        return {
            showInfo: false
        }
    },
    computed: {
        isShowInfo() {
            return this.info && this.showInfo;
        },
        titleMode() {
            if (this.title && this.src) 
                return 1;
            else if (this.title)
                return 2;
            else if (this.src)
                return 3;
            else
                return -1;
        }
    },
    methods: {
        onTouchStart(e) {
            this.$emit("touchstart", e);
            this.showInfo = true;
        },
        onTouchEnd(e) {
            this.$emit("touchend", e);
            this.showInfo = false;
        },
        onTouchCancel(e) {
            this.showInfo = false;
        },
        onMouseEnter() {
            this.showInfo = true;
        },
        onMouseLeave() {
            this.showInfo = false;
        },
        onEubmit() {
            if (this.submit) {
                this.$emit('click');
                this.$emit('submit');
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "button.scss";
</style>