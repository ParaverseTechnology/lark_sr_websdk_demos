<template>
    <div class="mobile-ui"
        :style="viewPortWidth"
        v-on:contextmenu="onContextmenu"
    >
        <MicInput />
        <VideoInput />
        <LiveStreaming />
        
        <!-- popup menu -->
        <div v-if="!vmouseMode"
            class="pop pop-toggle"
            :style="positionStyle"
            draggable="true"
            v-on:touchstart="onDragStart"
            v-on:touchmove="onDrag"
            v-on:touchend="onDragEnd"
            v-on:click="togglePop"
        >
            <div v-if="popToggled"
            >
                <div class="pop-icon"></div>
                <span v-if="showTimeoutInfo" class="rttInfo rttBad rttBadInfo">{{ui.badNetwork}}</span>
            </div>
            <div v-else class="pop" v-on:click="togglePop">
                <div class="pop-icon" v-on:click="togglePop"></div>
                <div class="icon icon-mouse" v-on:click="toggleVMouseMode"></div>
                <div class="icon icon-keyboard" v-on:click="toggleVKeyboard"></div>
                <div class="icon icon-menu" v-on:click="toggleMenu"></div>
                <div class="icon icon-exit" v-on:click="onQuit"></div>
                <div class="icon icon-handle" v-on:click="toggleJoyStick"></div>
            </div>
        </div>
        <!-- joystick -->
        <JoyskickIndex v-if="joystick" />
        
        <Keyboard v-if="vkeyboard" />
        <VCursor v-if="enableVmouse" :useVMouse="vmouseMode" v-on:exit="toggleVMouseMode" />
    </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions,
}                          from 'vuex';
import JoyskickIndex       from '../joystick_index/joystick_index';
import Keyboard            from '../keyboard/keyboardComponent.vue';
import VCursor             from '../v_cursor/v_cursor';
import Unit                from '../../../utils/unit';
import MicInput            from '../../mic_input/mic_input.vue';
import VideoInput          from '../../video_input/video_input.vue';
import LiveStreaming       from '../../live_streaming/live_streaming.vue';

export default {
    components: {
        JoyskickIndex,
        Keyboard,
        VCursor,
        MicInput,
        VideoInput,
        LiveStreaming,
    },
    data() {
        return {
            // vmouseMode: false,
            popToggled: true,
            showTimeoutInfo: false,
            rttCheckTimeout: -1,
            rttLimitTimeout: -1,
            lastRttLimitToast: 0,
            dragStarted: false,
            dragStartPosition: {
                x: 0,
                y: 0,
            },
            offsetPositon: {
                x: 0,
                y: 0,
            },
            position: {
                x: 0,
                y: 0,
            },
        }
    },
    computed: {
        positionStyle() {
            if (this.mobileControlBallPosition.x != 0 || this.mobileControlBallPosition.y != 0) {
                return {
                    top: this.mobileControlBallPosition.y + "px",
                    left: this.mobileControlBallPosition.x + "px",
                }
            } else {
                return {
                    top: 15 + "px",
                    left: (this.viewPort.width / 2 - Unit.getMobliePixelWidth(93, this.mobilePixelUnit) / 2) + "px",
                };
            }
        },
        rttClass() {
            if (this.states.rttMs < this.appliParams.rttLimit) {
                return 'rttInfo rttGood';
            } else {
                return 'rttInfo rttBad';
            }
        },
        viewPortWidth() {
            return this.viewPort.width + 'px';
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
            mobileControlBallPosition: state => state.mobileControlBallPosition,
            vkeyboard: state => state.vkeyboard,
            joystick: state => state.joystick,
            ui: state => state.ui,
            vmouseMode: status => { return status.vmouseMode == 'vmouse'; },
            enableVmouse: status => { return status.vmouseMode != 'none'; },
            mobilePixelUnit: (state) => state.mobilePixelUnit,
        }),
        ...mapGetters({
            screenOrientation: 'screenOrientation',
            appliParams: 'appliParams',
            viewPort: 'viewPort',
        })
    },
    methods: {
        togglePop(e) {
            e.preventDefault();
            e.stopPropagation();
            this.popToggled = !this.popToggled;
        },
        // block default context menu event.
        onContextmenu(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("onContextmenu");
        },
        onQuit() {
            this.showModalConfirm({ des: "确定退出当前页面?" })
            .then(()=>{
                console.log('user confirm');
                Unit.quit();
            })
            .catch(() => {
                console.log('user cancle');
            });
        },
        //
        onVMouseMode() {
            this.vmouseMode = !this.vmouseMode;
        },
        onRttCheck() {
            if (this.states.rttMs > this.appliParams.rttLimit &&
                this.rttLimitTimeout == -1 &&
                Date.now() - this.lastRttLimitToast > this.appliParams.rttLimitInterval * 1000) {
                this.showTimeoutInfo = true;
                this.rttLimitTimeout = window.setTimeout(() => {
                    this.showTimeoutInfo = false;
                    this.rttLimitTimeout = -1;
                    this.lastRttLimitToast = Date.now();
                }, 8 * 1000);
            }
        },
        onDragStart(e) {
            // e.preventDefault();
            const {
                screenOrientation
            } = this;
            // 注意旋转屏幕时坐标系的变换
            if (screenOrientation == 'landscape') {
                const offsetRect = Unit.getBoundingClientRect(e.target);
                this.offsetPositon = {
                    x: e.changedTouches[0].clientY - offsetRect.top,
                    y: offsetRect.right - e.changedTouches[0].clientX,
                }
                console.log("on drag start", offsetRect, e.changedTouches[0].clientX,
                    offsetRect.right - e.changedTouches[0].clientX,
                    e.changedTouches[0].clientY - offsetRect.top);
            } else {
                const offsetViewPort = Unit.getOffsetViewport(e.target);
                this.offsetPositon = {
                    x: e.changedTouches[0].clientX - offsetViewPort.offsetX,
                    y: e.changedTouches[0].clientY - offsetViewPort.offsetY,
                }
            }
            this.dragStartPosition = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            }
        },
        onDrag(e) {
            e.preventDefault();
            const {
                viewPort,
                screenOrientation
            } = this;
            if (!this.dragStarted) {
                let disx = e.changedTouches[0].clientX - this.dragStartPosition.x;
                let disy = e.changedTouches[0].clientY - this.dragStartPosition.y;
                let distance = Math.sqrt(disx*disx + disy*disy);
                if (distance < 40) {
                    return;
                }
                this.dragStarted = true;
            }
            // 注意旋转屏幕时坐标系的变换
            if (screenOrientation == 'landscape') {
                this.setMobileControlBallPosition({
                    x: e.changedTouches[0].clientY - this.offsetPositon.x,
                    y: viewPort.height - e.changedTouches[0].clientX - this.offsetPositon.y,
                });
            } else {
                this.setMobileControlBallPosition({
                    x: e.changedTouches[0].clientX - this.offsetPositon.x,
                    y: e.changedTouches[0].clientY - this.offsetPositon.y,
                });
            }
            // console.log("on drag control ball", e);
        },
        onDragEnd(e) {
            // e.preventDefault();
            const {
                viewPort,
                screenOrientation
            } = this;
            if (this.dragStarted) {
                // 注意旋转屏幕时坐标系的变换
                if (screenOrientation == 'landscape') {
                    this.setMobileControlBallPosition({
                        x: e.changedTouches[0].clientY - this.offsetPositon.x,
                        y: viewPort.height - e.changedTouches[0].clientX - this.offsetPositon.y,
                    });
                } else {
                    this.setMobileControlBallPosition({
                        x: e.changedTouches[0].clientX - this.offsetPositon.x,
                        y: e.changedTouches[0].clientY - this.offsetPositon.y,
                    });
                }
            }
            this.dragStarted = false;
            this.dragStartPosition = {
                x: 0,
                y: 0,
            }
            // console.log("on drag end", e, this.position, this.offsetPositon);
        },
        ...mapMutations({
            setMobileControlBallPosition: 'setMobileControlBallPosition',
        }),
        ...mapActions({
            resize: 'resize',
            toggleState: 'stateModal/toggleState',
            toggleVMouseMode: 'toggleVMouseMode',
            toggleVKeyboard: 'toggleVKeyboard',
            toggleModalSetup: 'toggleModalSetup',
            showModalAlert: 'modalAlert/showModalAlert',
            showModalConfirm: 'modalConfirm/showModalConfirm',
            toggleMenu: 'toggleMenu',
            toggleJoyStick: 'toggleJoyStick',
        }),
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
@import 'index.scss';
</style>
