<template>
    <div :class="containerClass" v-if="videoInput">
        <div class="icon icon-mic" @click="toggleVideo">
            <img v-if="videoTrackEnable" src="@/assets/img/video_on.png" />
            <img v-else src="@/assets/img/video_off.png" />
        </div>
        <div class="icon-setup" @click="toggleSetupPanel">
            <img src="@/assets/img/1_setup.png" />
        </div>
        <div v-if="setupPanel" class="setup">
            <select v-model="selecteDevice" name="视频输入设备">
                <option v-for="(device, key) in devices" v-bind:value="device.deviceId" v-bind:key="key">
                    {{ device.label }}
                </option>
            </select>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapActions,
}                                   from 'vuex';
import Log                          from "../../utils/log";
import Capabilities                 from '../../utils/capabilities';

export default {
    data() {
        return {
            videoTrackEnableManu: false,
            manuSetVideoTrackEnable: false,
            setupPanel: false,
            selecteDevice: '',
            devices: [],
        }
    },
    computed: {
        containerClass() {
            if (this.audioInput) {
                return this.isMobile ? 'video-input video-input-mobile video-input-withaudio' : 'video-input video-input-withaudio';
            } else {
                return this.isMobile ? 'video-input video-input-mobile' : 'video-input';
            }
        },
        audioInput() {
            return this.larksr?.params.audioInput;
        },
        videoInput() {
            // return true;
            return this.larksr?.params.videoInput;
        },
        videoDeviceId() {
            return this.larksr?.videoDeviceId;
        },
        videoTrack() {
            return this.larksr?.videoTrack;
        },
        videoTrackEnable: {
            get: function () {
                if (this.manuSetVideoTrackEnable) {
                    return this.videoTrackEnableManu;
                } else {
                    return this.videoTrack?.enabled;
                }
            },
            set: function(enable) {
                this.manuSetVideoTrackEnable = true;
                this.videoTrackEnableManu = enable;
            },
        },
        ...mapState({
            larksr: state => state.larksr,  
            ui: state => state.ui,
            isMobile: state => state.isMobile,
        }),
    },
    methods: {
        onVideoTrackEnable(e) {
            Log.info('video track enable', e);
        },
        openVideo() {
            Log.info('openVideo with device ', this.selecteDevice);
            this.larksr.openVideo(false, this.selecteDevice)
            .then((res) => {
                Log.info("open video success", res, this.videoTrack, this.selecteDevice);
                this.videoTrackEnable = this.videoTrack.enabled;
            })
            .catch((e) => {
                Log.warn("open video failed.", e);
                if (Capabilities.os === 'iOS' && Capabilities.isWeChat) {
                    this.toast({ text: "iOS 微信浏览器不支持打开摄像头，请使用Safari访问音频功能", position: 1, level: 3 });
                } else if (window.location.href.indexOf("https") == -1) {
                    this.toast({ text: "请通过 HTTPS 连接访问音频功能", position: 1, level: 3 });
                } else {
                    this.toast({ text: JSON.stringify(e), position: 1, level: 3 });
                }
            });
        },
        toggleVideo() {
            Log.info("toggleVideo", this.videoDeviceId);
            if (this.setupPanel) {
                this.openVideo();
                this.setupPanel = !this.setupPanel;
            } if (this.videoTrack) {
                this.videoTrack.enabled = !this.videoTrack.enabled;
                this.videoTrackEnable = this.videoTrack.enabled;
            } else {
                this.openVideo();
            }
        },
        toggleSetupPanel() {
            this.setupPanel = !this.setupPanel;
            if (this.setupPanel && this.larksr) {
                this.larksr.getConnectedVideoinputDevices()
                .then((res) => {
                    Log.info("video devices", res);
                    this.devices = res;
                    if (!this.selecteDevice) {
                        this.selecteDevice = res[0].deviceId;
                    }
                })
                .catch((e) => {
                    Log.warn("no video device found ", e);
                })
            }
        },
        ...mapActions({
            toast: "toast/toast",
            notify: "notifyBar/notify",
            alert: "modalAlert/showModalAlert",
        }),
    },
    mounted() {
        Log.info('mic input larksr', this.larksr, this.videoInput);
    }
}
</script>
<style lang="scss" scoped>
@import "video_input.scss";
</style>