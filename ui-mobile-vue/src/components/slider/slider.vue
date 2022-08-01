<template>
    <div class="slider-wraper"
        v-on:mouseup="onEnd"
        v-on:mousecancel="onEnd"
        v-on:mouseleave="onEnd"
        v-on:mousemove="onMove"
    >
        <div class="slider" ref="slider">
            <div class="slider-bar" :style="barStyle"></div>
            <div class="slider-button-wraper" 
                :style="buttonWraperStyle"
                v-on:mouseenter="onEnter"
                v-on:mouseleave="onLeave"
                v-on:mousedown="onStart"
            >
                <div :class="tooltipClass">{{computedValue}}</div>
                <div class="slider-button"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Log from '@/utils/log';
import Unit from '@/utils/unit';

export default {
    props: ['min', 'max'],
    components: {
    },
    data() {
        return {
            tooltip: false,
            value: 100,
            sliderSize: {
                width: 0,
                height: 0,
            },
            started: false,
        } 
    },
    computed: {
        computedValue() {
            const min = this.min ? this.min : 0;
            const max = this.max ? this.max : 100;
            const range = max - min;
            return Math.round(range * this.value / 100);
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
    },
    methods: {
        onEnter() {
            this.tooltip = true;
        },
        onLeave() {
            this.tooltip = false;
        },
        onStart() {
            this.started = true;
        },
        onEnd() {
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

            // const value = e.movementX > 0 ? this.value + 1 : this.value - 1;
            // Log.warn("onMove", e, e.movementX);
            // TODO add touch handle
            // WARNING not handle touch
            const value = this.value + e.movementX / this.sliderSize.width * 100;
            if (value > 100 || value < 0) {
                return;
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