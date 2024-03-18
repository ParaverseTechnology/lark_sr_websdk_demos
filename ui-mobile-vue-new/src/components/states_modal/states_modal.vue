<template>
    <ContentAlert v-if="stateModal.show" :alertPositionStyle="alertPositionStyle">
        <template v-slot:close>
            <div @click="onClose">
                <i class="el-icon-close"></i>
            </div>
        </template>
        <template v-slot:content>
            <div class="state">
                <div class="state-row">
                    <p>{{ ui.statusRes }}</p>
                    <p>{{states.frameWidth}}x{{states.frameHeight}}</p>
                </div>
                <div class="state-row">
                    <p>{{ ui.statusFps }}</p>
                    <p>{{states.framerate}}</p>
                </div>
                <div class="state-row">
                    <p>{{ ui.statusBiterate }}</p>
                    <p>{{states.bitrate}} Mbps</p>
                </div>
                <div class="state-row">
                    <p>{{ ui.statusRtt }}</p>
                    <p>{{states.currentRoundTripTime}} ms</p>
                </div>
                <div class="state-row">
                    <p>{{ ui.statusPackgeLost }}</p>
                    <p>{{states.packetsLostPerc}} %</p>
                </div>
                <template v-if="states.serverStatics">
                <div class="customContentAlert-divider"></div>
                    <div class="state-row">
                        <p>Client:</p>
                    </div>
                    <div class="state-row">
                        <p>{{ ui.avgDecodeDelay }}</p>
                        <p>{{ states.avgDecodeDelay.toFixed(2) }} ms</p>
                    </div>
                    <div class="state-row">
                        <p>{{ ui.avgProcessDelay }}</p>
                        <p>{{ states.avgProcessDelay.toFixed(2) }} ms</p>
                    </div>
                    <div class="customContentAlert-divider"></div>
                    <div class="state-row">
                        <p>Server:</p>
                    </div>
                    <div class="state-row">
                        <p>{{ ui.serverStaticsRenderDelay }}</p>
                        <p>{{states.serverStatics.renderDelay.toFixed(2)}} ms/frame ({{ states.serverStatics.renderFramerate.toFixed(1) }}FPS)</p>
                    </div>
                    <div class="state-row">
                        <p>{{ ui.serverStaticsCaptureDelay }}</p>
                        <p>{{states.serverStatics.captureDelay.toFixed(2)}} ms/frame ({{ states.serverStatics.captureFramerate.toFixed(1) }}FPS)</p>
                    </div>
                    <div class="state-row">
                        <p>{{ ui.serverStaticsEncoderDelay }}</p>
                        <p>{{states.serverStatics.encoderDelay.toFixed(2)}} ms/frame ({{ states.serverStatics.encoderFramerate.toFixed(1) }}FPS)</p>
                    </div>
                </template>
            </div>
        </template>
    </ContentAlert>
</template>
<script>
import ContentAlert from '../custom_content_alert/custom_content_alert'
import Log           from '@/utils/log';
import { mapMutations } from 'vuex'
import { 
    mapState,
    mapActions,
}                    from 'vuex'
export default {
    components: {
        ContentAlert
    },
    data() {
        return {
            alertPositionStyle: {
                top: '75px',
                right: '20px',
                position: 'absolute'
            }
        };
    },
    computed: {
        ...mapState({
            ui: state => state.ui,
            stateModal: state => state.stateModal.stateModal,
            states: (state) => {
                const { aggregatedStats, } = state;
                // Calculate duration of run
                let runTime = (aggregatedStats.timestamp - aggregatedStats.timestampStart) / 1000;
                let timeValues = [];
                let timeDurations = [60, 60]
                for(let timeIndex = 0; timeIndex < timeDurations.length; timeIndex ++)
                {
                    timeValues.push(runTime % timeDurations[timeIndex]);
                    runTime = runTime / timeDurations[timeIndex];
                }
                timeValues.push(runTime);

                let runTimeSeconds = timeValues[0];
                let runTimeMinutes = Math.floor(timeValues[1]);
                let runTimeHours = Math.floor(timeValues[2]);

                let receivedBytesMeasurement = 'B'
                let receivedBytes = Object.prototype.hasOwnProperty.call(aggregatedStats, 'bytesReceived')? aggregatedStats.bytesReceived : 0;
                let dataMeasurements = ['kB', 'MB', 'GB'];
                for(let index = 0; index < dataMeasurements.length; index++) {
                    if(receivedBytes < 100 * 1000)
                        break;
                    receivedBytes = receivedBytes / 1000;
                    receivedBytesMeasurement = dataMeasurements[index];
                }
                let numberFormat = new Intl.NumberFormat(window.navigator.language, { maximumFractionDigits: 0 });
                let timeFormat = new Intl.NumberFormat(window.navigator.language, { maximumFractionDigits: 0, minimumIntegerDigits: 2 });

                let rtt = (aggregatedStats.currentRoundTripTime * 1000).toFixed(2);

                // captureDelay: 0.03449999913573265
                // captureFramerate: 60
                // encoderDelay: 2.541800022125244
                // encoderFramerate: 60
                // renderDelay: 3.411900043487549
                // renderFramerate: 60

                return {
                    runTimeSeconds: timeFormat.format((runTimeSeconds)),
                    runTimeMinutes: timeFormat.format((runTimeMinutes)),
                    runTimeHours: timeFormat.format((runTimeHours)),
                    frameWidth: aggregatedStats.frameWidth, 
                    frameHeight: aggregatedStats.frameHeight,
                    receivedBytesMeasurement, 
                    receivedBytes: numberFormat.format(receivedBytes),
                    framesDecoded: numberFormat.format(aggregatedStats.framesDecoded),
                    packetsLost: aggregatedStats.packetsLost,
                    bitrate: (aggregatedStats.bitrate / 1000).toFixed(2),
                    framerate: aggregatedStats.framerate,
                    framesDropped: aggregatedStats.framesDropped, 
                    currentRoundTripTime: rtt,
                    packetsLostPerc: aggregatedStats.packetsLostPerc.toFixed(3),
                    avgDecodeDelay: aggregatedStats.avgDecodeDelay,
                    avgProcessDelay: aggregatedStats.avgProcessDelay,
                    serverStatics: aggregatedStats.serverStatics,
                };
            },
        })
    },
    methods: {
        onClose() {
            Log.info('on close');
            this.toggleState();
            this.setCustomContentAlertTitle('');
        },
        ...mapActions({
            toggleState: 'stateModal/toggleState',
        }),
        ...mapMutations({
            setCustomContentAlertTitle: 'customContentAlert/setCustomContentAlertTitle'
        }),
    },
    mounted() {
    }
}
</script>
<style lang="scss" scoped>
@import "states_modal.scss";
</style>