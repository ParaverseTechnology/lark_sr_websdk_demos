<template>
  <div class="joyindex-container" :style="viewPortStyle">
    <div v-if="controls == null">
        <Joystick :style="leftJoyPositionStyle" :position="leftJoyPosition"></Joystick>
    </div>
    <div v-else>
        <Joystick v-for="(item, index) in joysticks" :key="index + 1000" :style="getPosition(item)" :position="getPositionNumber(item)" :subType="item.subType"></Joystick>
        <Key v-for="(item, index) in keys" :key="index" :class="keyClass" :keyName="item.keyCodes" :style="getPosition(item)"
            v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
        >
            {{item.keyCodes.join(" ")}}
        </Key>
    </div>
  </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions,
}                          from 'vuex';
import Joystick            from '../joystick/joystick'
import Key                 from './key/key'
import Log                 from '@/utils/log';
import Unit                from '@/utils/unit';
import store               from '@/store/index'
// 阻尼
const DAMPING = 0.08;

// type ctrlType 1 key ctrlType joystick
// subType  1 wasd  2 updownleftright 3 joystick

export default {
    components: {
        Joystick,
        Key,
    },
    data() {
        return {
            // if not set controls use default layout
            controls: null,
            // ctrls: {
            //     "ctrls": [
            //         {
            //             "ctrlType":1,
            //             "ctrlLoc":{"x":0.9727244389027432,"y":0.3867403314917127,"xP":780.125,"yP":140},
            //             "keyCodes":["KeyA"]
            //         },
            //         {
            //             "ctrlType": 2,
            //             "subType": 1,
            //             "ctrlLoc": { "x": 0.6812655860349127, "y": 0.20441988950276244}
            //         }
            //     ],
            //     "mouseMode": 0, 
            //     "keySize": 3
            // }
        }
    },
    computed: {
        leftJoyPosition() {
            return {
                left: 30,
                top: this.viewPort.height > 500 ? this.viewPort.height - 220 : this.viewPort.height - 150,
            }
        },
        leftJoyPositionStyle() {
            return {
                left: this.leftJoyPosition.left + "px",
                top: this.leftJoyPosition.top + "px",
            }
        },
        viewPortStyle() {
            return {
                // width: this.viewPort.width + "px",
                // top: this.viewPort.height + "px",
            };
        },
        keyClass() {
            return this.controls && this.controls.keySize ? 'keys keys-size-' + this.controls.keySize : "keys";
        },
        joysticks() {
            return this.controls && this.controls.ctrls ?  this.controls.ctrls.filter(ctrl => ctrl.ctrlType == 2) : [];
        },
        keys() {
            return this.controls && this.controls.ctrls ?  this.controls.ctrls.filter(ctrl => ctrl.ctrlType == 1) : [];
        },
        ...mapState({
            larksr: (state) => state.larksr,
            joystickAllKeys: state =>  state.joystickAllKeys,
        }),
        ...mapGetters({
            viewPort: 'viewPort',
            screenOrientation: 'screenOrientation',
            mobilePixelUnit: 'mobilePixelUnit',
        }),
    },
    methods: {
        onKeyStart(keys) {
            Log.info("onKeyStart", keys);
            // sync pressed key
            keys.forEach(key => {
                this.larksr?.keyDown(key, false);
            });
        },
        onKeyEnd(keys) {
            Log.info("onKeyEnd", keys);
            // sync pressed key
            keys.forEach(key => {
                this.larksr?.keyUp(key, true);
            });
        },
        onRepeat(keys) {
            Log.info("onRepeat", keys);
            keys.forEach(key => {
                this.larksr?.keyDown(key, true);
            });
        },
        getPositionNumber(ctrl) {
            return {
                left: ctrl.ctrlLoc.x * this.viewPort.width,
                top: ctrl.ctrlLoc.y * this.viewPort.height,
            }
        },
        getPosition(ctrl) {
            // Log.info('getPosition', ctrl);
            return {
                left: ctrl.ctrlLoc.x * this.viewPort.width + "px",
                top: ctrl.ctrlLoc.y * this.viewPort.height + "px",
                position: 'absolute',
                "z-index": '1012',
            }
        },
        async updateControl() {
            if (!this.larksr) {
                return;
            }
            try {
                const res = await this.larksr?.getTouchCtrMapping();
                Log.info("updateControl ", res);
                this.controls = res;
            } catch (e) {
                Log.info("getTouchCtrMapping failed ", e);
            }
        }
    },
    mounted() {
        Log.info("joystick mounted");
        this.updateControl();
    }
}
</script>
<style lang="scss" scoped>
@import "joystick_index.scss";
</style>
