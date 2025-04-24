<template>
    <div :class="containerClass" v-if="videoInput">
        <Tooltip class="menu-tools-box">
            <template #title>摄像头</template>
            <div v-if="videoTrackEnable" class="menu-icon"  @click="toggleVideo">
                <i class="iconfont icon-camera_1 icon-click"></i>
            </div>
            <div v-else class="menu-icon"  @click="toggleVideo" @mouseenter="iconEnter('7')" @mouseleave="iconLeave('7')">
                <i class="iconfont icon-camera"></i>
            </div>
        </Tooltip>
        <i :class="setupPanel?'el-icon-arrow-down':'el-icon-arrow-up'" @click="toggleSetupPanel"></i>
        <div v-if="setupPanel" :class="{'setup':true, 'top': menubarPosition==='top','bottom': menubarPosition==='bottom'}">
            <p class="setup-title">选择摄像头</p>
            <template v-if="devices.length">
                <div v-for="(device, key) in devices" @click="videoCheck(device)" class="setup-row" :key="key">
                    <span> {{ device.label }}</span>
                    <i v-if="selecteDevice === device.deviceId" class="el-icon-check"></i>
                </div>
            </template>
            <template v-else>
                <div class="setup-row">
                    <span>无</span>
                </div>
            </template>
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
import Tooltip                      from '../menuBar/components/tooltip';

export default {
    components: {
        Tooltip
    },
    data() {
        return {
            videoTrackEnableManu: false,
            manuSetVideoTrackEnable: false,
            setupPanel: false,
            selecteDevice: '',
            devices: [],
            // environment, user
            facingMode: 'none',
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
        videoPaused() {
            return this.larksr?.videoPaused;
        },
        useFront() {
            if (this.facingMode === 'none') {
                return undefined;
            }
            return this.facingMode === 'user';
        },
        videoTrackEnable: {
            get: function () {
                if (this.manuSetVideoTrackEnable) {
                    return this.videoTrackEnableManu;
                } else {
                    return !this.videoPaused;
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
            menubarPosition: state => state.menubarPosition
        }),
    },
    methods: {
        videoCheck(row) {
            this.selecteDevice = row.deviceId;
            if(!this.videoPaused) { // 视频开启状态
                if(this.larksr.videoDeviceId !== this.selecteDevice) {
                    this.larksr?.closeVideo();
                    this.openVideo();
                }
            }
        },
        iconEnter(index) {
			this['icon'+index+'_hover'] = true;
		},
		iconLeave(index) {
			this['icon'+index+'_hover'] = false;
		},
        onVideoTrackEnable(e) {
            Log.info('video track enable', e);
        },
        openVideo() {
            const device = this.devices?.filter(device => device.deviceId === this.selecteDevice)[0];

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
            
            Log.info('openVideo with device ', this.selecteDevice, device, this.devices, width, height);

            this.larksr.openVideo(false, this.selecteDevice, width, height, this.useFront)
            .then((res) => {
                Log.info("open video success", res, this.videoTrack, this.selecteDevice);
                this.videoTrackEnable = !this.videoPaused;
            })
            .catch((e) => {
                Log.warn("open video failed.", e);
                if (window.location.href.indexOf("https") == -1) {
                    this.toast({ text: this.ui.videoUseHttps, position: 1, level: 3 });
                } else {
                    this.toast({ text: JSON.stringify(e), position: 1, level: 3 });
                }
            });
        },
        toggleVideo() {
            Log.info("toggleVideo", this.videoDeviceId);
            if (this.setupPanel) this.setupPanel = false;
            if(!this.videoPaused) { // 视频开启状态
                this.larksr?.closeVideo();
                this.videoTrackEnable = !this.videoPaused;
            } else { // 视频关闭状态
                this.openVideo();
            }
        },
        toggleSetupPanel() {
            this.setupPanel = !this.setupPanel;
            if (this.setupPanel && this.larksr) {
                if (Capabilities.isMobile) {
                    this.devices = [{
                        label: 'Front',
                        deviceId: 'user',
                        facingMode: 'user',
                    }, {
                        label: 'Back',
                        deviceId: 'environment',
                        facingMode: 'environment',
                    }];
                    this.facingMode = 'user';
                } else {
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