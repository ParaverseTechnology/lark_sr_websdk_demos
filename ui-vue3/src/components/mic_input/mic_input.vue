<template>
    <div :class="containerClass"  v-if="audioInput">
        <Tooltip>
            <template #title>{{ ui.mic }}</template>
            <div v-if="audioTrackEnable" class="menu-icon"  @click="toggleMic">
                <i class="iconfont icon-mic_1 icon-click"></i>
            </div>
            <div v-else class="menu-icon"  @click="toggleMic">
                <i class="iconfont icon-mic"></i>
            </div>
        </Tooltip>
        <el-icon v-if="setupPanel" @click="toggleSetupPanel"><ArrowDown /></el-icon>
        <el-icon v-else  @click="toggleSetupPanel"><ArrowUp /></el-icon>
        <div v-if="setupPanel" :class="{'setup':true, 'top': menubarPosition==='top','bottom': menubarPosition==='bottom'}">
            <p class="setup-title">{{ ui.selectMic }}</p>
            <template v-if="devices.length">
                <div v-for="(device, key) in devices" @click="micCheck(device)" class="setup-row" :key="key">
                    <span> {{ device.label }}</span>
                    <el-icon v-if="selecteDevice === device.deviceId"><Check /></el-icon>
                </div>
            </template>
            <template v-else>
                <div class="setup-row">
                    <span>{{ ui.nothing }}</span>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import { useToastStore } from '@/stores/toast.js'
import Log from "@/utils/log";
import Tooltip from '../menuBar/components/tooltip.vue';

const commStore = useCommStore();
const toastStore = useToastStore();

const audioTrackEnableManu = ref(false);
const manuSetAudioTrackEnable = ref(false);
const setupPanel = ref(false);
const selecteDevice = ref('');
const devices = reactive({
    list: []
})

const larksr = computed(() => {
    return commStore.larksr;
})
const ui = computed(() => {
    return commStore.ui;
})
const menubarPosition = computed(() => {
    return commStore.menubarPosition;
})

const containerClass = computed(() => {
    return commStore.isMobile ? 'mic-input mic-input-mobile' : 'mic-input';
})

const audioInput = computed(() => {
    return larksr.value?.params.audioInput;
})

const audioDeviceId = computed(() => {
    return larksr.value?.audioDeviceId;
})

const audioTrack = computed(() => {
    return larksr.value?.audioTrack;
})
const audioPaused = computed(() => {
    return larksr.value?.audioPaused;
})
const audioTrackEnable = computed({
    get() {
        if (manuSetAudioTrackEnable.value) {
            return audioTrackEnableManu.value;
        } else {
            return !audioPaused.value;
        }
    },
    set(enable) {
        manuSetAudioTrackEnable.value = true;
        audioTrackEnableManu.value = enable;
    }
})

const micCheck = (row) => {
    selecteDevice.value = row.deviceId;
    if(!audioPaused.value) { // 音频开启状态
        if(larksr.value.audioDeviceId !== selecteDevice.value) {
            larksr.value?.closeAudio();
            openAudio();
        }
    }
};

const onAudioTrackEnable = (e) => {
    Log.info('audio track enable', e);
};
const openAudio = () => {
    Log.info('openAudio with device ', selecteDevice.value);
    larksr.value.openAudio(selecteDevice.value)
    .then((res) => {
        Log.info("open audio success", res, audioTrack.value, selecteDevice.value);
        audioTrackEnable.value = !audioPaused.value;
    })
    .catch((e) => {
        Log.warn("open audio failed.", e);
        if (window.location.href.indexOf("https") == -1) {
            toastStore.toastAct( { text: ui.value.audioUseHttps, position: 1, level: 3 });
        } else {
            toastStore.toastAct( { text: JSON.stringify(e), position: 1, level: 3 });
        }
    });
};
const toggleMic = () => {
    Log.info("toggleMic", audioDeviceId.value);
    if (setupPanel.value) setupPanel.value = false;
    if(!audioPaused.value) { // 音频开启状态
        larksr.value?.closeAudio();
        audioTrackEnable.value = !audioPaused.value;
        // forceUpdate();
    } else { // 音频关闭状态
        openAudio();
    }
};
const toggleSetupPanel = () => {
    setupPanel.value = !setupPanel.value;
    if (setupPanel.value && larksr.value) {
        larksr.value.getConnectedAudioinputDevices()
        .then((res) => {
            Log.info("audio devices", res);
            devices.list = res;
            if (!selecteDevice.value) {
                selecteDevice.value = res[0].deviceId;
            }
        })
        .catch((e) => {
            Log.warn("no audio device found ", e);
        })
    }
};

onMounted(() => {
    Log.info('mic input larksr', larksr.value, audioInput.value);
})
</script>
<style lang="scss" scoped>
@import "mic_input.scss";
</style>
