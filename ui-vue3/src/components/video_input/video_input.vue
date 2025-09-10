<template>
    <div :class="containerClass" v-if="videoInput">
        <Tooltip class="menu-tools-box">
            <template #title>{{ ui.camera }}</template>
            <div v-if="videoTrackEnable" class="menu-icon"  @click="toggleVideo">
                <i class="iconfont icon-camera_1 icon-click"></i>
            </div>
            <div v-else class="menu-icon"  @click="toggleVideo">
                <i class="iconfont icon-camera"></i>
            </div>
        </Tooltip>
        <el-icon v-if="setupPanel" @click="toggleSetupPanel"><ArrowDown /></el-icon>
        <el-icon v-else @click="toggleSetupPanel"><ArrowUp /></el-icon>
        <div v-if="setupPanel" :class="{'setup':true, 'top': commStore.menubarPosition==='top','bottom': commStore.menubarPosition==='bottom'}">
            <p class="setup-title">{{ ui.selectCamera }}</p>
            <template v-if="devices.length">
                <div v-for="(device, key) in devices" @click="videoCheck(device)" class="setup-row" :key="key">
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
import Log from "@/utils/log";
import Capabilities from '@/utils/capabilities';
import Tooltip from '../menuBar/components/tooltip.vue';
import { useToastStore } from '@/stores/toast.js'

const commStore = useCommStore();
const toastStore = useToastStore();

const videoTrackEnableManu = ref(false);
const manuSetVideoTrackEnable = ref(false);
const setupPanel = ref(false);
const selecteDevice = ref('');
const devices = reactive({
    list: []
})
// environment, user
const facingMode = ref('none');

const larksr = computed(() => {
    return commStore.larksr;
})
const ui = computed(() => {
    return commStore.ui;
})

const audioInput = computed(() => {
    return larksr.value?.params.audioInput;
})
const videoInput = computed(() => {
    return larksr.value?.params.videoInput;
})
const videoDeviceId = computed(() => {
    return larksr.value?.videoDeviceId;
})
const videoTrack = computed(() => {
    return larksr.value?.videoTrack;
})
const videoPaused = computed(() => {
    return larksr.value?.videoPaused;
})
const useFront = computed(() => {
    if (facingMode.value === 'none') {
        return undefined;
    }
    return facingMode.value === 'user';
})

const videoTrackEnable = computed({
    get() {
        if (manuSetVideoTrackEnable.value) {
            return videoTrackEnableManu.value;
        } else {
            return !videoPaused.value;
        }
    },
    set(enable) {
        manuSetVideoTrackEnable.value = true;
        videoTrackEnableManu.value = enable;
    },
})

const containerClass = computed(() => {
    if (audioInput.value) {
        return commStore.isMobile ? 'video-input video-input-mobile video-input-withaudio' : 'video-input video-input-withaudio';
    } else {
        return commStore.isMobile ? 'video-input video-input-mobile' : 'video-input';
    }
})

// 方法
const videoCheck = (row) => {
    selecteDevice.value = row.deviceId;
    if(!videoPaused.value) { // 视频开启状态
        if(larksr.value.videoDeviceId !== selecteDevice.value) {
            larksr.value?.closeVideo();
            openVideo();
        }
    }
};

const onVideoTrackEnable = (e) => {
    Log.info('video track enable', e);
};
const openVideo = () => {
    const device = devices.list?.filter(device => device.deviceId === selecteDevice.value)[0];

    // fix to 1920 1080
    // let width = 1920;
    // let height = 1080;

    // if (device && device.getCapabilities && typeof device.getCapabilities === 'function') {
    //     Log.info(device.getCapabilities());
    // }

    // if (device && device.getCapabilities && typeof device.getCapabilities === 'function' && device.getCapabilities().width && device.getCapabilities().width.max) {
    // //     width = device.getCapabilities().width.max;
    //     width = Math.min(device.getCapabilities().width.max, width);
    // }
    // if (device && device.getCapabilities && typeof device.getCapabilities === 'function' && device.getCapabilities().height && device.getCapabilities().height.max) {
    // //     height = device.getCapabilities().height.max;
    //     height = Math.min(device.getCapabilities().height.max, height);
    // }

    let width = 0;
    let height = 0;
    
    Log.info('openVideo with device ', selecteDevice.value, device, devices.value, width, height);

    larksr.value.openVideo(false, selecteDevice.value, width, height, useFront.value)
    .then((res) => {
        Log.info("open video success", res, videoTrack.value, selecteDevice.value);
        videoTrackEnable.value = !videoPaused.value;
    })
    .catch((e) => {
        Log.warn("open video failed.", e);
        if (window.location.href.indexOf("https") == -1) {
            toastStore.toastAct( { text: ui.value.videoUseHttps, position: 1, level: 3 });
        } else {
            toastStore.toastAct( { text: JSON.stringify(e), position: 1, level: 3 });
        }
    });
};
const toggleVideo = () => {
    Log.info("toggleVideo", videoDeviceId.value);
    if (setupPanel.value) setupPanel.value = false;
    if(!videoPaused.value) { // 视频开启状态
        larksr.value?.closeVideo();
        videoTrackEnable.value = !videoPaused.value;
    } else { // 视频关闭状态
        openVideo();
    }
};
const toggleSetupPanel = () => {
    setupPanel.value = !setupPanel.value;
    if (setupPanel.value && larksr.value) {
        if (Capabilities.isMobile) {
            devices.list = [{
                label: 'Front',
                deviceId: 'user',
                facingMode: 'user',
            }, {
                label: 'Back',
                deviceId: 'environment',
                facingMode: 'environment',
            }];
            facingMode.value = 'user';
        } else {
            larksr.value.getConnectedVideoinputDevices()
            .then((res) => {
                Log.info("video devices", res);
                devices.list = res;
                if (!selecteDevice.value) {
                    selecteDevice.value = res[0].deviceId;
                }
            })
            .catch((e) => {
                Log.warn("no video device found ", e);
            })
        }
    }
};

onMounted(() => {
    Log.info('mic input larksr', larksr.value, videoInput.value);
});
</script>
<style lang="scss" scoped>
@import "video_input.scss";
</style>
