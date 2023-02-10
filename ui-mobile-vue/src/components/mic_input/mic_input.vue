<template>
    <div :class="containerClass" v-if="audioInput">
        <div class="icon icon-mic" @click="toggleMic">
            <img v-if="audioTrackEnable" src="@/assets/img/ic_mic.png" />
            <img v-else src="@/assets/img/ic_mic_off.png" />
        </div>
        <div class="icon-setup" @click="toggleSetupPanel">
            <img src="@/assets/img/1_setup.png" />
        </div>
        <div v-if="setupPanel" class="setup">
            <select v-model="selecteDevice" :name="ui.audioDevice">
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
        }),
    },
    methods: {
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
            if (this.setupPanel) {
                this.openAudio();
                this.setupPanel = !this.setupPanel;
            } if (!this.audioPaused) {
                this.larksr?.pauseAudioSending();
                this.audioTrackEnable = !this.audioPaused;
                this.$forceUpdate();
            } else {
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