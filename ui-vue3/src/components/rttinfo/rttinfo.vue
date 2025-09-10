<template>
    <div :class="rttClass">
        <div class="icon-rtt"></div>
        <span v-if="states.hasCurrentRoundTripTime">{{states.currentRoundTripTime}} ms</span>
    </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';

const commStore = useCommStore();

const rttCheckTimeout = ref(-1);
const rttLimitTimeout = ref(-1);


const states = computed(() => {
    const aggregatedStats = commStore.aggregatedStats;
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
})

const rttClass = computed(() => {
    if (states.value.rttMs < 30) {
        return 'rttInfo rttGood';
    } else {
        return 'rttInfo rttBad';
    }
})

const showTimeoutInfo = ref(null);
const lastRttLimitToast = ref(null);
const onRttCheck = () => {
    if (states.value.rttMs > 30 && rttLimitTimeout.value == -1 && Date.now() - lastRttLimitToast.value > 20 * 1000) {
        showTimeoutInfo.value = true;
        rttLimitTimeout.value = window.setTimeout(() => {
            showTimeoutInfo.value = false;
            rttLimitTimeout.value = -1;
            lastRttLimitToast.value = Date.now();
        }, 8 * 1000);
    }
};

onMounted(() => {
    rttCheckTimeout.value = window.setInterval(onRttCheck, 1000);
});
onUnmounted(() => {
    if (rttCheckTimeout.value != -1) {
        window.clearInterval(rttCheckTimeout.value);
    }
    if (rttLimitTimeout.value != -1) {
        window.clearInterval(rttLimitTimeout.value);
    }
});
</script>
<style lang="scss" scoped>
@import 'rttinfo.scss';
</style>