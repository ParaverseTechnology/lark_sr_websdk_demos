<template>
    <div v-if="isLiveStream" :class="containerClass">
        <div class="icon" @click="togglePanel">
            <img src="@/assets/img/live.png" />
        </div>
        <div v-if="showSetup" class="setting" :style="viewPortStyle" @drag.stop @dragstart.stop @dragend.stop draggable="false">
            <div class="content" @drag.stop @dragstart.stop @dragend.stop draggable="false">
                <div class="closeBtn" @click="togglePanel">
                    <img src="@/assets/img/close.png" />
                </div>
                <p class="title">推流设置</p>
                <div class="item">
                    <label for="live-path">推流地址</label>
                    <input type="text" name="rtmp-path" id="rtmp-path" placeholder="推流地址" 
                         v-model="rtmpPath" @focus="onInputFocus" @blur="onInputBlur" @keyup.enter="onInputBlur"
                    />
                </div>
                <div class="item">
                    <label for="rtmp-key">密钥</label>
                    <input type="text" name="rtmp-key" id="rtmp-key" placeholder="密钥"
                        v-model="rtmpKey" @focus="onInputFocus" @blur="onInputBlur" @keyup.enter="onInputBlur"
                    />
                </div>
                <div class="item">
                    <label for="bitrate">码率</label>
                    <select v-model="selectCoderate" name="码率">
                        <option v-for="(coderate, key) in coderates" v-bind:value="coderate" v-bind:key="key">
                            {{ coderate }} kbps
                        </option>
                    </select>
                </div>
                <div class="item">
                    <label for="fps">帧率</label>
                    <select v-model="selectFps" name="帧率">
                        <option v-for="(fps, key) in fpss" v-bind:value="fps" v-bind:key="key">
                            {{ fps }} FPS
                        </option>
                    </select>
                </div>
                <div class="item">
                    <label for="res">分辨率</label>
                    <select v-model="selectRes" name="分辨率">
                        <option v-for="(res, key) in ress" v-bind:value="res" v-bind:key="key">
                            {{ res.width }} x {{ res.height }}
                        </option>
                    </select>
                </div>
                <div class="submit">
                    <button @click="onSubmit">确定</button>
                </div>
                <div class="status" :style="status.isError ? { color : 'red'} : {}">
                    <p>{{status.text}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapActions,
}                                   from 'vuex';
import Log                          from "@/utils/log";
import Capabilities                 from '@/utils/capabilities';
import { LarkSR, LarkSRClientEvent, LoadAppliParamsFromUrl } from "larksr_websdk";

export default {
    components: {
    },
    data() {
        return {
            rtmpPath: '',
            rtmpKey: '',
            showSetup: false,
            selectCoderate: 2500,
            coderates: [
                2500,
                5000,
                8000,
                10000,
            ],
            selectFps: 30,
            fpss: [
                30,
                60,
            ],
            selectRes: {
                    width: 1280,
                    height: 720,
            },
            ress: [
                {
                    width: 1280,
                    height: 720,
                },
                {
                    width: 1920,
                    height: 1080
                }
            ],
            status: {
                isError: false,
                text: '',
            },
            mobileScreenLandscapState: false,
        }
    },
    computed: {
        containerClass() {
            if (this.audioInput && this.videoInput) {
                return this.isMobile ? 'live live-mobile live-slot-3' : 'live live-slot-3';
            } else if (this.audioInput || this.videoInput) {
                return this.isMobile ? 'live live-mobile live-slot-2' : 'live live-slot-2';
            } else {
                return this.isMobile ? 'live live-mobile' : 'live';
            }
        },
        isLiveStream() {
            // return true;
            return this.larksr?.params.liveStreaming;
        },
        audioInput() {
            // return true;
            return this.larksr?.params.audioInput;
        },
        videoInput() {
            // return true;
            return this.larksr?.params.videoInput;
        },
        ...mapState({
            larksr: state => state.larksr,  
            ui: state => state.ui,
            isMobile: state => state.isMobile,
            viewPort: state => state.viewPort,
        }),
        ...mapGetters([
            'viewPortStyle',
            "screenOrientation",
        ]),
    },
    methods: {
        onSubmit() {
            Log.info('on submit live streaming', this.rtmpKey, this.rtmpPath, this.selectFps, this.selectRes, this.selectCoderate);
            if (!this.rtmpPath) {
                this.status = {
                    isError: true,
                    text: '必须填写推流地址',
                }
                return;
            }

            this.larksr.StartCloudLiveStreaming({
                path: this.rtmpPath,
                key: this.rtmpKey,
                width: this.selectRes.width, 
                height: this.selectRes.height,
                framerate: this.selectFps,
                bitrate: this.selectCoderate
            })
            .then((res) => {
                this.status = {
                    isError: false,
                    text: '准备推流中...',
                }
            })
            .catch((err) => {
                this.status = {
                    isError: true,
                    text: err,
                }
            });
        },
        onInputFocus() {
            if (this.isMobile && this.screenOrientation == "landscape") {
                this.larksr?.screenState.setMobileForceLandScape(false);
                this.mobileScreenLandscapState = true;
            }
            this.larksr?.op.setKeyboardEnable(false);
        },
        onInputBlur() {
            if (this.mobileScreenLandscapState) {
                this.larksr?.screenState.setMobileForceLandScape(true);
                this.mobileScreenLandscapState = false;
            }
            this.larksr?.op.setKeyboardEnable(true);
        },
        togglePanel() {
            Log.info("toggel live panel");
            this.showSetup = !this.showSetup;
        },
        onRtmpStreamState(e) {
            Log.info("onRtmpStreamState", e);
            this.toast(e.data.desc);
            this.status = {
                isError: false,
                text: e.data.desc,
            }
        },
        onRtmpStreamError(e) {
            Log.info("onRtmpStreamError", e);
            this.showSetup = true;
            this.status = {
                isError: true,
                text: e.data.desc,
            }
        },
        ...mapActions({
            toast: "toast/toast",
            notify: "notifyBar/notify",
            alert: "modalAlert/showModalAlert",
        }),
    },
    mounted() {
        Log.info('live larksr', this.larksr);
        this.larksr.on(LarkSRClientEvent.RTMP_STREAM_STATE, this.onRtmpStreamState, this);
        this.larksr.on(LarkSRClientEvent.RTMP_STREAM_ERROR, this.onRtmpStreamError, this);
    },
    unmounted() {
        Log.info("relase livestreaming icon");
    },
}
</script>
<style lang="scss" scoped>
@import "live_streaming.scss";
</style>