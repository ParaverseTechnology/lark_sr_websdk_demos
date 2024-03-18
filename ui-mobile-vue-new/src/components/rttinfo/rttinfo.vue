<template>
    <div :class="rttClass">
        <div class="icon-rtt"></div>
        <span v-if="states.hasCurrentRoundTripTime">{{states.currentRoundTripTime}} ms</span>
    </div>
</template>
<script>
import { 
    mapState, 
}                          from 'vuex';

export default {
    components: {
    },
    data() {
        return {
            rttCheckTimeout: -1,
            rttLimitTimeout: -1,
        }
    },
    computed: {
        rttClass() {
            if (this.states.rttMs < 30) {
                return 'rttInfo rttGood';
            } else {
                return 'rttInfo rttBad';
            }
        },
        ...mapState({
            // formate states
            states: (state) => {
                const { aggregatedStats, } = state;
                let rttms = aggregatedStats.currentRoundTripTime * 1000;
                let rtt = rttms.toFixed(2);
                
                return {
                    hasPacketsLost: aggregatedStats.packetsLost != 0,
                    packetsLost: aggregatedStats.packetsLost.toFixed(2),
                    packetsLostPerc: aggregatedStats.packetsLostPerc.toFixed(3) + "%",
                    hasBitrate: aggregatedStats.bitrate != 0,
                    bitrate: (aggregatedStats.bitrate / 1000).toFixed(2),
                    hasCurrentRoundTripTime: aggregatedStats.currentRoundTripTime != 0,
                    // hasCurrentRoundTripTime: true,
                    currentRoundTripTime: rtt,
                    rttMs: rttms,
                    // rttMs: 10,
                };
            },
        }),
    },
    methods: {
        onRttCheck() {
            if (this.states.rttMs > 30 && 
                this.rttLimitTimeout == -1 && 
                Date.now() - this.lastRttLimitToast > 20 * 1000) {
                this.showTimeoutInfo = true;
                this.rttLimitTimeout = window.setTimeout(() => {
                    this.showTimeoutInfo = false;
                    this.rttLimitTimeout = -1;
                    this.lastRttLimitToast = Date.now();
                }, 8 * 1000);
            }
        },
    },
    mounted() {
        this.rttCheckTimeout =  window.setInterval(this.onRttCheck, 1000);
    },
    beforeDestroy() {
        if (this.rttCheckTimeout != -1) {
            window.clearInterval(this.rttCheckTimeout);
        }
        if (this.rttLimitTimeout != -1) {
            window.clearInterval(this.rttLimitTimeout);
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'rttinfo.scss';
</style>