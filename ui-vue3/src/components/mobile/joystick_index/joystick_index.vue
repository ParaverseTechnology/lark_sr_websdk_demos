<template>
  <div class="joyindex-container" :style="commStore.viewPortStyle">
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
<script setup>
import { useCommStore } from '@/stores/comm.js';
import Joystick                 from '../joystick/joystick.vue'
import Key                      from './key/key.vue'
import Log                      from '@/utils/log';
// 阻尼
const DAMPING = 0.08;

const commStore = useCommStore();

const controls = ref(null);

// type ctrlType 1 key ctrlType joystick
// subType  1 wasd  2 updownleftright 3 joystick

const larksr = computed(() => {
    return commStore.larksr;
});


const leftJoyPosition = computed(() => {
    return {
        left: 30,
        top: commStore.viewPort.height > 500 ? commStore.viewPort.height - 220 : commStore.viewPort.height - 150,
    }
})
const leftJoyPositionStyle = computed(() => {
    return {
        left: leftJoyPosition.value.left + "px",
        top: leftJoyPosition.value.top + "px",
    }
})

const keyClass = computed(() => {
    return controls.value && controls.value.keySize ? 'keys keys-size-' + controls.value.keySize : "keys";
});
const joysticks = computed(() => {
    return controls.value && controls.value.ctrls ?  controls.value.ctrls.filter(ctrl => ctrl.ctrlType == 2) : [];
});
const keys = computed(() => {
    return controls.value && controls.value.ctrls ?  controls.value.ctrls.filter(ctrl => ctrl.ctrlType == 1) : [];
});

// 方法
const onKeyStart = (keys) => {
    Log.info("onKeyStart", keys);
    // sync pressed key
    keys.forEach(key => {
        larksr.value?.keyDown(key, false);
    });
};
const onKeyEnd = (keys) => {
    Log.info("onKeyEnd", keys);
    // sync pressed key
    keys.forEach(key => {
        larksr.value?.keyUp(key, true);
    });
};
const onRepeat = (keys) => {
    Log.info("onRepeat", keys);
    keys.forEach(key => {
        larksr.value?.keyDown(key, true);
    });
};
const getPositionNumber = (ctrl) => {
    return {
        left: ctrl.ctrlLoc.x * commStore.viewPort.width,
        top: ctrl.ctrlLoc.y * commStore.viewPort.height,
    }
};
const getPosition = (ctrl) => {
    // Log.info('getPosition', ctrl);
    return {
        left: ctrl.ctrlLoc.x * commStore.viewPort.width + "px",
        top: ctrl.ctrlLoc.y * commStore.viewPort.height + "px",
        position: 'absolute',
        "z-index": '1012',
    }
};
const updateControl =  async() => {
    if (!larksr.value) {
        return;
    }
    try {
        const res = await larksr.value?.getTouchCtrMapping();
        Log.info("updateControl ", res);
        controls.value = res;
    } catch (e) {
        Log.info("getTouchCtrMapping failed ", e);
    }
};

onMounted(() => {
    Log.info("joystick mounted");
    updateControl();
})
</script>
<style lang="scss" scoped>
@import "joystick_index.scss";
</style>
