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
        <div class="slider" ref="slider">
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
<script>
import {
    mapGetters,
}                          from 'vuex';
import Log from '@/utils/log';
import Unit from '@/utils/unit';

export default {
    props: ['min', 'max', 'defaultValue'],
    components: {
    },
    data() {
        return {
            tooltip: false,
            value: this.defaultValue ? this.defaultValue : 100,
            sliderSize: {
                width: 0,
                height: 0,
            },
            started: false,
            touchX: 0,
        } 
    },
    computed: {
        computedValue() {
            const min = this.min ? this.min : 0;
            const max = this.max ? this.max : 100;
            const range = max - min;
            return Math.round(range * this.value / 100) + min;
        },
        tooltipClass() {
            return this.tooltip ? 'slider-button-tooltip' : 'slider-button-tooltip hide';
        },
        barStyle() {
            return "width:" + this.value + "%";
        },
        buttonWraperStyle() {
            return "left:" + this.value + "%";
        },
        ...mapGetters({
            viewPort: 'viewPort',
            screenOrientation: 'screenOrientation',
            mobilePixelUnit: 'mobilePixelUnit',
        }),
    },
    methods: {
        onEnter() {
            this.tooltip = true;
        },
        onLeave() {
            this.touchX = 0;
            this.tooltip = false;
        },
        onStart() {
            this.started = true;
        },
        onEnd() {
            this.touchX = 0;
            this.started = false;
        },
        onMove(e) {
            if (!this.started) {
                return;
            }
            if (this.sliderSize.width == 0 && this.$refs['slider']) {
                this.sliderSize = Unit.getBoundingClientRectSize(this.$refs['slider']);
            }
            if (this.sliderSize.width == 0) {
                return;
            }

            let movementX = 0;

            if (e.movementX) {
                movementX = e.movementX;
            } else if (e.targetTouches && e.targetTouches[0]) {
                const clientX = this.screenOrientation == 'landscape' ? e.targetTouches[0].clientY : e.targetTouches[0].clientX;
                movementX = this.touchX == 0 ? 0 : (clientX - this.touchX) * 0.1;
                this.touchX = clientX;
            } else {
                // WARNING not handle touch
                Log.warn("slider not support event", e, this.touchX);
                return;
            }
            
            let value = this.value + movementX / this.sliderSize.width * 100;
            // value = Math.round(value);
            if (value > 99) {
                value = 100;
            }
            if (value < 1) {
                value = 0;
            }
            this.value = value;
            this.$emit('change', this.computedValue);
        },
    },
    mounted() {
        Log.info("slider size", Unit.getBoundingClientRectSize(this.$refs['slider']));
        if (this.$refs['slider']) {
            this.sliderSize = Unit.getBoundingClientRectSize(this.$refs['slider']);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "slider.scss";
</style>