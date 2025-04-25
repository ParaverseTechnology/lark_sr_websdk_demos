<template>
    <div :class="containerClass"  v-if="audioInput">
        <Tooltip>
            <template #title>{{ ui.mic }}</template>
            <!-- <div class="menu-icon"  @click="toggleMic" @mouseenter="iconEnter('8')" @mouseleave="iconLeave('8')">
                <i :class="audioTrackEnable? 'iconfont icon-mic icon-click':'iconfont icon-mic'"></i>
            </div> -->
            <div v-if="audioTrackEnable" class="menu-icon"  @click="toggleMic">
                <i class="iconfont icon-mic_1 icon-click"></i>
            </div>
            <div v-else class="menu-icon"  @click="toggleMic" @mouseenter="iconEnter('7')" @mouseleave="iconLeave('7')">
                <i class="iconfont icon-mic"></i>
            </div>
        </Tooltip>
        <i :class="setupPanel?'el-icon-arrow-down':'el-icon-arrow-up'" @click="toggleSetupPanel"></i>
        <div v-if="setupPanel" :class="{'setup':true, 'top': menubarPosition==='top','bottom': menubarPosition==='bottom'}">
            <p class="setup-title">{{ ui.selectMic }}</p>
            <template v-if="devices.length">
                <div v-for="(device, key) in devices" @click="micCheck(device)" class="setup-row" :key="key">
                    <span> {{ device.label }}</span>
                    <i v-if="selecteDevice === device.deviceId" class="el-icon-check"></i>
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
<script>
import {
    mapState,
    mapGetters,
    mapActions,
}                                   from 'vuex';
import Log                          from "@/utils/log";
import Tooltip                      from '../menuBar/components/tooltip';

export default {
    components: {
        Tooltip
    },
    data() {
        return {
            audioTrackEnableManu: false,
            manuSetAudioTrackEnable: false,
            setupPanel: false,
            selecteDevice: '',
            devices: [],
        }
    },
    computed: {
        containerClass() {
            return this.isMobile ? 'mic-input mic-input-mobile' : 'mic-input';
        },
        audioInput() {
            return this.larksr?.params.audioInput;
        },
        audioDeviceId() {
            return this.larksr?.audioDeviceId;
        },
        audioTrack() {
            return this.larksr?.audioTrack;
        },
        audioPaused() {
            return this.larksr?.audioPaused;
        },
        audioTrackEnable: {
            get: function() {
                if (this.manuSetAudioTrackEnable) {
                    return this.audioTrackEnableManu;
                } else {
                    return !this.audioPaused;
                }
            },
            set: function(enable) {
                this.manuSetAudioTrackEnable = true;
                this.audioTrackEnableManu = enable;
            }
        },
        ...mapState({
            larksr: state => state.larksr,
            ui: state => state.ui,
            isMobile: state => state.isMobile,
            menubarPosition: state => state.menubarPosition
        }),
    },
    methods: {
        micCheck(row) {
            this.selecteDevice = row.deviceId;
            if(!this.audioPaused) { // 音频开启状态
                if(this.larksr.audioDeviceId !== this.selecteDevice) {
                    this.larksr?.closeAudio();
                    this.openAudio();
                }
            }
        },
        iconEnter(index) {
			this['icon'+index+'_hover'] = true;
		},
		iconLeave(index) {
			this['icon'+index+'_hover'] = false;
		},
        onAudioTrackEnable(e) {
            Log.info('audio track enable', e);
        },
        openAudio() {
            Log.info('openAudio with device ', this.selecteDevice);
            this.larksr.openAudio(this.selecteDevice)
            .then((res) => {
                Log.info("open audio success", res, this.audioTrack, this.selecteDevice);
                this.audioTrackEnable = !this.audioPaused;
            })
            .catch((e) => {
                Log.warn("open audio failed.", e);
                if (window.location.href.indexOf("https") == -1) {
                    this.toast({ text: this.ui.audioUseHttps, position: 1, level: 3 });
                } else {
                    this.toast({ text: JSON.stringify(e), position: 1, level: 3 });
                }
            });
        },
        toggleMic() {
            Log.info("toggleMic", this.audioDeviceId);
            if (this.setupPanel) this.setupPanel = false;
            if(!this.audioPaused) { // 音频开启状态
                this.larksr?.closeAudio();
                this.audioTrackEnable = !this.audioPaused;
                this.$forceUpdate();
            } else { // 音频关闭状态
                this.openAudio();
            }
        },
        toggleSetupPanel() {
            this.setupPanel = !this.setupPanel;
            if (this.setupPanel && this.larksr) {
                this.larksr.getConnectedAudioinputDevices()
                .then((res) => {
                    Log.info("audio devices", res);
                    this.devices = res;
                    if (!this.selecteDevice) {
                        this.selecteDevice = res[0].deviceId;
                    }
                })
                .catch((e) => {
                    Log.warn("no audio device found ", e);
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
        Log.info('mic input larksr', this.larksr, this.audioInput);
    }
}
</script>
<style lang="scss" scoped>
@import "mic_input.scss";
</style>
