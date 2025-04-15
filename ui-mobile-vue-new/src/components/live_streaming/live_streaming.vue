<template>
    <ContentAlert :customContentStyle="viewPortStyle">
        <template v-slot:close>
            <div @click="onCancel">
                <i class="el-icon-close"></i>
            </div>
        </template>
        <template v-slot:content>
            <div class="stream" >
                <div class="content" @drag.stop @dragstart.stop @dragend.stop draggable="false">
                    <div class="stream-input">
                        <span>{{ ui.liveUrl }}</span>
                        <el-input v-model="rtmpPath" type="text" id="rtmp-path" size="mini" :placeholder="ui.liveUrl" @focus="onInputFocus" @blur="onInputBlur" @keyup.enter="onInputBlur"></el-input>
                    </div>
                    <div class="stream-input">
                        <span>{{ ui.liveKey }}</span>
                        <el-input type="text" id="rtmp-key" size="mini" :placeholder="ui.liveKey" v-model="rtmpKey" @focus="onInputFocus" @blur="onInputBlur" @keyup.enter="onInputBlur"></el-input>
                    </div>
                    <div class="stream-input">
                        <span>{{ ui.liveBitrate }}</span>
                        <el-select v-model="selectCoderate" size="mini" :placeholder="ui.liveBitrate">
                            <el-option v-for="(coderate, key) in coderates" v-bind:value="coderate" v-bind:key="key">
                                {{ coderate }} kbps
                            </el-option>
                        </el-select>
                    </div>
                    <div class="stream-input">
                        <span>{{ ui.liveFPS }}</span>
                        <el-select v-model="selectFps" size="mini" :placeholder="ui.liveFPS">
                            <el-option v-for="(fps, key) in fpss" v-bind:value="fps" v-bind:key="key">
                                {{ fps }} FPS
                            </el-option>
                        </el-select>
                    </div>
                    <div class="stream-input">
                        <span>{{ ui.liveRes }}</span>
                        <el-select v-model="selectRes" value-key="id" size="mini" :placeholder="ui.liveRes">
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
                        <Btn v-else class="submit" :title="ui.liveSubmit" submit="false" @click="onSubmit"/>
                    </div>
                </div>
            </div>
        </template>
    </ContentAlert>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
}                                   from 'vuex';
import Log                          from "@/utils/log";
import { LarkSRClientEvent } from "larksr_websdk";
import ContentAlert from '../custom_content_alert/custom_content_alert'
import Btn        from '../button/button';

export default {
    components: {
        ContentAlert,
        Btn
    },
    data() {
        return {
            rtmpPath: '',
            rtmpKey: '',
            // showSetup: false,
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
                { id: 1, width: 1280, height: 720},
                { id: 2, width: 1920, height: 1080 },
                { id: 3, width: 720, height: 1280 },
                { id: 4, width: 1080, height: 1920 },
            ],
            status: {
                isError: false,
                text: '',
                code: ''
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
            isShowStreamAlert: state => state.modalStream.isShowStreamAlert,
            rtmpstreamstate: state => state.modalStream.rtmpstreamstate,
            rtmpstreamForm: state => state.modalStream.rtmpstreamForm,
        }),
        ...mapGetters([
            'viewPortStyle',
            "screenOrientation",
        ]),
    },
    methods: {
        onCancel() {
            this.setIsShowStreamAlert(false);
            this.setCustomContentAlertTitle('');
        },
        onSubmit() {
            Log.info('on submit live streaming', this.rtmpKey, this.rtmpPath, this.selectFps, this.selectRes, this.selectCoderate);
            if (!this.rtmpPath) {
                this.status = {
                    isError: true,
                    text: this.ui.liveStreamTip,
                    code: ''
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
                    text: this.ui.liveStreamPrepare,
                    code: res.state || ''
                }

                this.setRtmpstreamForm({
                    rtmpPath: this.rtmpPath,
                    rtmpKey: this.rtmpKey,
                    codeRate: this.selectCoderate,
                    frameRate: this.selectFps,
                    resolution: this.selectRes
                });
            })
            .catch((err) => {
                this.status = {
                    isError: true,
                    text: err,
                    code: ''
                }
                this.setRtmpstreamForm(null);
            });
        },
        onCancelLive() {
            Log.info('on close live streaming');
            this.larksr.StopLiveStreaming();
            this.setRtmpstreamstate(null);
            this.setRtmpstreamForm(null);
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
        onRtmpStreamState(e) {
            Log.info("onRtmpStreamState", e);
            this.toast(e.data.desc);
            this.status = {
                isError: false,
                text: e.data.desc,
                code: e.data.state || ''
            }
            this.setRtmpstreamstate(this.status);
        },
        onRtmpStreamError(e) {
            Log.info("onRtmpStreamError", e);
            // this.showSetup = true;
            this.status = {
                isError: true,
                text: e.data.desc,
                code: ''
            }
            this.setRtmpstreamstate(this.status);
        },
        ...mapActions({
            toast: "toast/toast",
            notify: "notifyBar/notify",
            alert: "modalAlert/showModalAlert",
        }),
        ...mapMutations({
            setCustomContentAlertTitle: 'customContentAlert/setCustomContentAlertTitle',
            setIsShowStreamAlert: 'modalStream/setIsShowStreamAlert',
            setRtmpstreamstate: 'modalStream/setRtmpstreamstate',
            setRtmpstreamForm: 'modalStream/setRtmpstreamForm',
        }),
    },
    mounted() {
        Log.info('live larksr', this.larksr);
        this.larksr.on(LarkSRClientEvent.RTMP_STREAM_STATE, this.onRtmpStreamState, this);
        this.larksr.on(LarkSRClientEvent.RTMP_STREAM_ERROR, this.onRtmpStreamError, this);

        if (this.rtmpstreamstate!==null) this.status = this.rtmpstreamstate;
        if (this.rtmpstreamForm!==null) {
            this.rtmpPath = this.rtmpstreamForm.rtmpPath;
            this.rtmpKey = this.rtmpstreamForm.rtmpKey;
            this.selectCoderate = this.rtmpstreamForm.codeRate;
            this.selectFps = this.rtmpstreamForm.frameRate;
            this.selectRes = this.rtmpstreamForm.resolution
        }
    },
    unmounted() {
        Log.info("relase livestreaming icon");
    },
}
</script>
<style lang="scss" scoped>
@import "live_streaming.scss";
</style>
