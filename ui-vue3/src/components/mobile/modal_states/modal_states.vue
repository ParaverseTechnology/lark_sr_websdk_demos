<template>
  <div class="mobile-modal" :style="helpStyle" ref="modal">
    <div class="mobile-modal-title">
      <i class="iconfont icon-arrow" @click="closeModal"></i>
      <span class="mobile-modal-title-text">
        {{ ui.net}}
      </span>
    </div>
    <div class="state-content">
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
    </div>
  </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import { useStateModalStore } from '@/stores/state_modal.js';

const commStore = useCommStore();
const stateModalStore = useStateModalStore();



// state
const ui = computed(() => { return commStore.ui});
const states = computed(() => {
  const aggregatedStats = commStore.aggregatedStats;
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
  let receivedBytes =Object.prototype.hasOwnProperty.call(aggregatedStats,'bytesReceived')? aggregatedStats.bytesReceived : 0;
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
      //
      avgDecodeDelay: aggregatedStats.avgDecodeDelay,
      avgProcessDelay: aggregatedStats.avgProcessDelay,
      // server status
      serverStatics: aggregatedStats.serverStatics,
  };
});

const helpStyle = computed(() => {
  let obj = {};
  if(commStore.screenOrientation==='landscape' || commStore.mobileForceLandScape) {
    obj = {
      'width': '34.31rem',
      'height': commStore.viewPort.height +'px',
      // 'display': this.isShowMobileHelp ? 'block' : 'none',
      'right': stateModalStore.isShowMobileStateModal ? '0' : '-'+ '35.31rem'
    }
  } else {
    obj = {
      'width': '100%',
      'height': commStore.viewPort.height +'px',
      // 'display': this.isShowMobileHelp ? 'block' : 'none',
      'right': stateModalStore.isShowMobileStateModal ? '0' : '-'+ '100%'
    }
  }
  return obj
})

// 方法
// const caretFn = (index) => {
//   if(this.active === index) {
//     this.active = '';
//     this.$refs['caret'+index][0].style.transform = 'rotate(0deg)';
//     this.$refs['content'+index][0].style['max-height'] = '0px';
//     this.$refs['content'+index][0].style['margin-bottom'] = '0px';
//   } else {
//     this.active = index;
//     this.$refs['caret'+index][0].style.transform = 'rotate(-180deg)';
//     this.$refs['content'+index][0].style['max-height'] = '28.3rem';
//     this.$refs['content'+index][0].style['margin-bottom'] = '1.2rem';
//   }

//   this.$refs['caret'+index][0].style.transition = 'all 0.1s';
//   this.$refs['content'+index][0].style.transition = 'all 0.3s';
// },
const closeModal = () => {
  stateModalStore.setIsShowMobileStateModal(false);
}
</script>
<style lang='scss' scoped>
.mobile-modal {
  background-color: var(--webclient-modal_bg, #5A5A5A);
  transition: all .2s;
  top: 0;
  right: 0;
  position: absolute;
  touch-action: auto;
  z-index: 99;
  &-title {
    height: 5.2071rem;
    padding: 1.18rem;
    box-sizing: border-box;
    background-color: var(--webclient-modal-title-bg,#454545);
    color: var(--webclient-modal-font-color,#DDDDDD);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    i {
      display: inline-block;
      transform: rotate(180deg);
      font-size: 2.54rem;
      vertical-align: middle;
    }
    &-text {
      font-size: 1.6568rem;
      vertical-align: middle;
    }
  }
}
.state-content {
  overflow-y: auto;
  height: calc(100% - 5.2071rem);
  touch-action: auto;
}
.state {
  color: var(--webclient-modal-font-color,#DDDDDD);
  padding-top: 20px;
  font-family: Noto Sans SC;
  font-size: 1.42012rem;
  padding: 1.89rem;
  box-sizing: border-box;
  touch-action: auto;
  &-row {
    display: flex;
    align-items: center;
  touch-action: auto;
    >p {
        width: 50%;
        margin: 3px 0;
        text-align: left;
    }
    >p:nth-of-type(1) {
        width: 40%;
    }
    >p:nth-of-type(2) {
        width: 60%;
    }
  }
  .customContentAlert-divider {
    width: 100%;
    border-bottom: 1px solid var(--webclient-dialog-divider);
    margin: 1.5rem 0;
  }
}
</style>
