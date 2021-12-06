<template>
    <div
        :class="keyClass"
        v-on:selectstart="onSelect"
        v-on:touchstart="onTouchStart"
        v-on:touchmove="onTouchMove"
        v-on:touchend="onTouchEnd" v-on:touchcancle="onTouchEnd"
        ref="root"
    >
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: ["keyName", 'repeatTimeout'],
    components: {
    },
    data() {
        return {
            showTip: false,
            timeout: null,
            touched: false,
            touchStartTime: 0,
            longPressed: false,
        }
    },
    computed: {
        keyClass() {
            return this.touched ? "key keyPress" : "key";
        },
    },
    methods: {
        getRootElement() {
            return this.$refs['root'];
        },
        onTouchStart(e) {
            e.preventDefault();
            e.stopPropagation();
            // console.log("onTouchStart");
            // this.showTip = true;
            this.touched = true;
            this.touchStartTime = Date.now();
            this.$emit("start", this.keyName, e);
            this.repeatPress();
        },
        onTouchEnd(e) {
            e.preventDefault();
            e.stopPropagation();
            // console.log("onTouchEnd");
            // this.showTip = false;
            this.touched = false;
            this.longPressed = false;
            if (this.timeout) {
                window.clearTimeout(this.timeout);
            }
            this.touchStartTime = 0;
            this.$emit("end", this.keyName, e);
        },
        onTouchMove(e) {
            e.preventDefault();
            e.stopPropagation();
            this.$emit("move", this.keyName, e);
        },
        repeatPress() {
            if (this.touched) {
                // check long press
                if (!this.longPressed && this.touchStartTime != 0 && Date.now() - this.touchStartTime > 1000) {
                    this.longPressed = true;
                    this.$emit("longPress",this.keyName);
                }
                this.timeout = window.setTimeout(() => {
                    this.$emit("repeat", this.keyName);
                    this.repeatPress();
                }, this.repeatTimeout ? this.repeatTimeout : 100);
            }
        },
        onSelect(e) {
            e.preventDefault();
            e.stopPropagation();
        },
    }
}
</script>
<style lang="scss" scoped>
@import 'joy_button.scss';
</style>