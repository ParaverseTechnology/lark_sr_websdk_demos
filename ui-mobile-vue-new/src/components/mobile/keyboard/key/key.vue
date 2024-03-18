<template>
    <div :class="keyClass" 
        v-on:selectstart="onSelect"
        v-on:touchstart="onTouchStart" v-on:touchend="onTouchEnd" v-on:touchcancle="onTouchEnd"
    >
        <div v-if="showTip && isInput" class="tip">
            <slot v-on:selectstart="onSelect"></slot>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: ["circle", "size", "keyName"],
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
        isInput() {
            return !this.type || this.type == "input";
        },
        isFunc() {
            return this.type && this.type == "func";
        },
        keyClass() {
            if (this.circle) {
                return this.size ? "key circle " + this.size : "key circle";
            } else {
                return this.size ? "key " + this.size : "key";
            }
        },
    },
    methods: {
        onTouchStart(e) {
            e.preventDefault();
            e.stopPropagation();
            // console.log("onTouchStart");
            this.showTip = true;
            this.touched = true;
            this.touchStartTime = Date.now();
            this.$emit("start", this.keyName);
            this.timeout = window.setTimeout(() => {
                this.repeatPress();
            }, 500);
        },
        onTouchEnd(e) {
            e.preventDefault();
            e.stopPropagation();
            // console.log("onTouchEnd");
            this.showTip = false;
            this.touched = false;
            this.longPressed = false;
            if (this.timeout) {
                window.clearTimeout(this.timeout);
            }
            this.touchStartTime = 0;
            this.$emit("end", this.keyName);
        },
        repeatPress() {
            if (this.touched) {
                // check long press
                if (!this.longPressed && this.touchStartTime != 0 && Date.now() - this.touchStartTime > 2000) {
                    this.longPressed = true;
                    this.$emit("longPress",this.keyName);
                }
                this.timeout = window.setTimeout(() => {
                    this.$emit("repeat", this.keyName);
                    this.repeatPress();
                }, 250);
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
@import 'key.scss';
</style>