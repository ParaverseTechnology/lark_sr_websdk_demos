<template>
    <ContentAlert :customContentStyle="commStore.viewPortStyle">
        <template v-slot:close>
            <div @click="onCancel">
                <el-icon><Close /></el-icon>
            </div>
        </template>
        <template v-slot:content>
            <div class="stream" >
                <div class="content" @drag.stop @dragstart.stop @dragend.stop draggable="false">
                    <div class="stream-input">
                        <span>{{ commStore.ui.liveUrl }}</span>
                        <el-input v-model="rtmpPath" type="text" id="rtmp-path" size="small" :placeholder="commStore.ui.liveUrl" @focus="onInputFocus" @blur="onInputBlur" @keyup.enter="onInputBlur"></el-input>
                    </div>
                    <div class="stream-input">
                        <span>{{ commStore.ui.liveKey }}</span>
                        <el-input type="text" id="rtmp-key" size="small" :placeholder="commStore.ui.liveKey" v-model="rtmpKey" @focus="onInputFocus" @blur="onInputBlur" @keyup.enter="onInputBlur"></el-input>
                    </div>
                    <div class="stream-input">
                        <span>{{ commStore.ui.liveBitrate }}</span>
                        <el-select v-model="selectCoderate" size="small" :placeholder="commStore.ui.liveBitrate">
                            <el-option v-for="(coderate, key) in coderates" v-bind:value="coderate" v-bind:key="key">
                                {{ coderate }} kbps
                            </el-option>
                        </el-select>
                    </div>
                    <div class="stream-input">
                        <span>{{ commStore.ui.liveFPS }}</span>
                        <el-select v-model="selectFps" size="small" :placeholder="commStore.ui.liveFPS">
                            <el-option v-for="(fps, key) in fpss" v-bind:value="fps" v-bind:key="key">
                                {{ fps }} FPS
                            </el-option>
                        </el-select>
                    </div>
                    <div class="stream-input">
                        <span>{{ commStore.ui.liveRes }}</span>
                        <el-select v-model="selectRes" value-key="id" size="small" :placeholder="commStore.ui.liveRes">
                            <el-option v-for="(res, key) in ress" :value="res" :key="key" :label="res.width+ ' x ' +res.height">
                            </el-option>
                        </el-select>
                   </div>
                   <div class="customContentAlert-divider"></div>
                    <div class="status" :style="status.isError ? { color : '#F56C6C'} : {}">
                        <p>{{status.text}}</p>
                    </div>
                   <div class="button-group">
                        <Btn v-if="status.code == 1" class="submit" :title="$t('message.vrAppli.close')" submit="false" @click="onCancelLive"/>
                        <Btn v-else class="submit" :title="commStore.ui.liveSubmit" submit="false" @click="onSubmit"/>
                    </div>
                </div>
            </div>
        </template>
    </ContentAlert>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import { useModalStreamStore } from '@/stores/modal_stream.js';
import { useCustomContentAlertStore } from '@/stores/custom_content_alert.js';
import Log from "@/utils/log";
import { LarkSRClientEvent } from "larksr_websdk";
import ContentAlert from '../custom_content_alert/custom_content_alert.vue'
import Btn from '../button/button.vue';

const commStore = useCommStore();
const modalStreamStore = useModalStreamStore();
const customContentAlertStore = useCustomContentAlertStore();

const rtmpPath = ref('');
const rtmpKey = ref('');
// showSetup: false,
const selectCoderate = ref(2500);
const coderates = reactive({
    list: [ 2500, 5000, 8000, 10000,]
});
const selectFps = ref(30);
const fpss = reactive({
    list: [ 30, 60,]
})
const selectRes = reactive({
        width: 1280,
        height: 720,
});
const ress = reactive({
    list: [
    { id: 1, width: 1280, height: 720},
    { id: 2, width: 1920, height: 1080 },
    { id: 3, width: 720, height: 1280 },
    { id: 4, width: 1080, height: 1920 },
]
})
const status = reactive({
    isError: false,
    text: '',
    code: ''
})
const mobileScreenLandscapState = ref(false);



const audioInput = computed(() => {
    return commStore.larksr?.params.audioInput;
});

const videoInput = computed(() => {
    return commStore.larksr?.params.videoInput;
})

const containerClass = computed(() => {
    if (audioInput.value && videoInput.value) {
        return commStore.isMobile ? 'live live-mobile live-slot-3' : 'live live-slot-3';
    } else if (audioInput.value || videoInput.value) {
        return commStore.isMobile ? 'live live-mobile live-slot-2' : 'live live-slot-2';
    } else {
        return commStore.isMobile ? 'live live-mobile' : 'live';
    }
});

// 方法
const onCancel = () => {
    modalStreamStore.setIsShowStreamAlert(false);
    customContentAlertStore.setCustomContentAlertTitle('');
};
const onSubmit = () => {
    Log.info('on submit live streaming', rtmpKey.value, rtmpPath.value, selectFps.value, {...selectRes}, selectCoderate.value);
    if (!rtmpPath.value) {
        status.isError = true;
        status.text = commStore.ui.liveStreamTip;
        status.code = '';
        return;
    }

    commStore.larksr.StartCloudLiveStreaming({
        path: rtmpPath.value,
        key: rtmpKey.value,
        width: selectRes.width,
        height: selectRes.height,
        framerate: selectFps.value,
        bitrate: selectCoderate.value
    })
    .then((res) => {
        status.isError = false;
        status.text = commStore.ui.liveStreamPrepare;
        status.code = res.state || '';

        modalStreamStore.setRtmpstreamForm({
            rtmpPath: rtmpPath.value,
            rtmpKey: rtmpKey.value,
            codeRate: selectCoderate.value,
            frameRate: selectFps.value,
            resolution: {...selectRes}
        });
    })
    .catch((err) => {
        status.isError = true;
        status.text = err;
        status.code = '';
        modalStreamStore.setRtmpstreamForm(null);
    });
};
const onCancelLive = () => {
    Log.info('on close live streaming');
    commStore.larksr.StopLiveStreaming();
    modalStreamStore.setRtmpstreamstate(null);
    modalStreamStore.setRtmpstreamForm(null);
};
const onInputFocus = () => {
    if (commStore.isMobile && commStore.screenOrientation == "landscape") {
        commStore.larksr?.screenState.setMobileForceLandScape(false);
        mobileScreenLandscapState.value = true;
    }
    commStore.larksr?.op.setKeyboardEnable(false);
};
const onInputBlur = () => {
    if (mobileScreenLandscapState.value) {
        commStore.larksr?.screenState.setMobileForceLandScape(true);
        mobileScreenLandscapState.value = false;
    }
    commStore.larksr?.op.setKeyboardEnable(true);
};
const onRtmpStreamState = (e) => {
    Log.info("onRtmpStreamState", e);
    toastStore.toastAct(e.data.desc);
    status.isError = true;
    status.text = e.data.desc;
    status.code = e.data.state || '';
    
    modalStreamStore.setRtmpstreamstate(status);
};
const onRtmpStreamError = (e) => {
    Log.info("onRtmpStreamError", e);
    status.isError = true;
    status.text = e.data.desc;
    status.code = '';
    
    modalStreamStore.setRtmpstreamstate(status);
};


onMounted(() => {
    Log.info('live larksr', commStore.larksr);
    commStore.larksr.on(LarkSRClientEvent.RTMP_STREAM_STATE, onRtmpStreamState);
    commStore.larksr.on(LarkSRClientEvent.RTMP_STREAM_ERROR, onRtmpStreamError);

    if (modalStreamStore.rtmpstreamstate!==null) {
        status.isError = modalStreamStore.rtmpstreamstate.isError||'';
        status.text = modalStreamStore.rtmpstreamstate.text||'';
        status.code = modalStreamStore.rtmpstreamstate.code||'';
    }
    if (modalStreamStore.rtmpstreamForm!==null) {
        rtmpPath.value = modalStreamStore.rtmpstreamForm.rtmpPath;
        rtmpKey.value = modalStreamStore.rtmpstreamForm.rtmpKey;
        selectCoderate.value = modalStreamStore.rtmpstreamForm.codeRate;
        selectFps.value = modalStreamStore.rtmpstreamForm.frameRate;
        selectRes.width = modalStreamStore.rtmpstreamForm.resolution.width;
        selectRes.height = modalStreamStore.rtmpstreamForm.resolution.height;
    }
})

onUnmounted(() => {
    Log.info("relase livestreaming icon");
})
</script>
<style lang="scss" scoped>
@import "live_streaming.scss";
</style>
