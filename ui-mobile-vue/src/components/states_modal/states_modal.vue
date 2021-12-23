<template>
    <div :class="stateClass" v-on:click="closeState">
        <p>视频分辨率: {{states.frameWidth}}x{{states.frameHeight}}</p>
        <p>视频帧率: {{states.framerate}}</p>
        <p>码率: {{states.bitrate}} Mbps</p>
        <p>网络时延: {{states.currentRoundTripTime}} ms</p>
        <p>丢包率: {{states.packetsLostPerc}} %</p>
    </div>
</template>
<script>
import { 
    mapState,
    mapActions,
}                    from 'vuex'
export default {
    components: {},
    data() {
        return {
            CloseImg: require('@/assets/img/close.svg')
        };
    },
    props: [],
    computed: {
        stateClass() {
            return this.stateModal.show ? "stateBox enable" : "stateBox disable";
        },
        ...mapState({
            test: state => state.test,
            stateModal: state => state.stateModal.stateModal,
            // formate states
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
                let receivedBytes = Object.prototype.hasOwnProperty.call(aggregatedStats, 'bytesReceived') ? aggregatedStats.bytesReceived : 0;
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
                };
            },
        })
    },
    methods: {
        onClose() {
        },
        ...mapActions({
            resize: 'resize',
            closeState: 'stateModal/closeState',
        })
    },
    mounted() {
    }
}
</script>
<style lang="scss" scoped>
@import "states_modal.scss";
</style>