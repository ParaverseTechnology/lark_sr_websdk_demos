<template>
    <div class="menu" :style="containerStyle">
        <div class="header">
            <p>功能菜单</p>
            <div class="btn-close" v-on:click="close">关闭</div>
            <p class="version">{{versionStr}}</p>
        </div>
        <div class="body">
            <div v-if="!isIOS" class="item">
                <div class="item-left">网页全屏</div>
                <div class="item-right">
                    <span v-on:click="launchFullScreen" :class='fullScreenClass' >
                        全屏
                    </span>
                    <span v-on:click="exitFullscreen" :class='exitFullScreenClass'>
                        普通
                    </span>
                </div>
            </div>
            <div class="item" v-on:click="toggleState">
                <div class="item-left">连接状态</div>
                <div class="item-right">
                    <p>RTT: {{states.currentRoundTripTime}} ms</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { 
    mapState, 
    mapGetters,
    mapMutations,
    mapActions,
}                          from 'vuex';
import Capabilities from '../../../utils/capabilities';

export default {
    components: {
        // Btn,
    },
    data() {
        return {
            // isToggle: false,
            imgSrc: {
                QUIT_IMG            : require('@/assets/img/stop.svg'),
                FRESH_IMG           : require('@/assets/img/fresh.svg'),
                FULLSCREEN_IMG      : require('@/assets/img/scale.svg'),
                EXIT_FULLSCREEN_IMG : require('@/assets/img/scale_down.svg'),
                LOCK_SCREEN         : require('@/assets/img/lock.svg'),
                UNLOCK_SCREEN       : require('@/assets/img/unlock.svg'),
                INFO_IMG            : require('@/assets/img/info.png'),
                KEYBOARD_IMG        : require('@/assets/img/keyboard_white.png'),
                ARROR_DOWN          : require('@/assets/img/arror_down_1.svg'),
                ARROR_LEFT          : require('@/assets/img/arror_left.png'),
                ARROR_RIGHT         : require('@/assets/img/arror_right.png'),
                HANDLE_IMG          : require('@/assets/img/handle.png'),
                SETUP_IMG           : require('@/assets/img/setup.svg')
            },
            versionStr: "V3.2.2.0",
            isIOS: Capabilities.os === 'iOS',
        }
    },
    computed: {
        containerStyle() {
            return {
                height: this.viewPort.height + "px",
            }
        },
        ...mapState({
            larksr: state => state.larksr,
            fullScreenClass() {
                return this.isFullScreen ? 'active' : '';
            },
            exitFullScreenClass() {
                return this.isFullScreen ? '' : 'active';
            },
            defaultScaleModeClass() {
                return this.isChangedScaledMode ? '' : 'active';
            },
            scretchScaleModeClass() {
                return this.isChangedScaledMode ? 'active' : '';
            },
            showJoystickAllKeysClass() {
                return this.joystickAllKeys ? 'active' : '';
            },
            hideJoystickAllKeysClass() {
                return this.joystickAllKeys ? '' : 'active';
            },
            flipMouseWheelClass() {
                return this.flipMouseWheel ? 'active' : '';
            },
            defaultMouseWheelClass() {
                return this.flipMouseWheel ? '' : 'active';
            },
            showplayerListClass() {
                return this.playerMode.showPlayerList ? 'active' : '';
            },
            hidePlayerListClass() {
                return this.playerMode.showPlayerList ? '' : 'active';
            },
            states: (state) => {
                const { aggregatedStats, } = state;
                let rtt = Capabilities.os === 'iOS' ? 
                    aggregatedStats.currentRoundTripTime.toFixed(2) :
                    (aggregatedStats.currentRoundTripTime * 1000).toFixed(2);
                return {
                    hasPacketsLost: aggregatedStats.packetsLost != 0,
                    packetsLost: aggregatedStats.packetsLost.toFixed(2),
                    packetsLostPerc: aggregatedStats.packetsLostPerc.toFixed(3) + "%",
                    hasBitrate: aggregatedStats.bitrate != 0,
                    bitrate: (aggregatedStats.bitrate / 1000).toFixed(2),
                    hasCurrentRoundTripTime: aggregatedStats.currentRoundTripTime != 0,
                    currentRoundTripTime: rtt,
                };
            },
            isFullScreen: state => state.isFullScreen,
            viewPort: state => state.viewPort,
            ui: state => state.ui,
            joystickAllKeys: state => state.joystickAllKeys,
            flipMouseWheel: state => state.flipMouseWheel,
            playerMode: state => state.playerMode,
        }),
        ...mapGetters({
            isChangedScaledMode: 'isChangedScaledMode',
            viewPortStyle: 'viewPortStyle',
            isInteractiveMode: 'playerMode/isInteractiveMode',
        }),
    },
    methods: {
        close() {
            this.toggleMenu();
        },
        onFullScreen() {
            if (!this.larksr) {
                return;
            }
            const { fullScreen } = this.larksr;
            if (fullScreen.isFullScreen) {
                fullScreen.exitFullscreen();
            } else {
                fullScreen.launchFullScreen();
            }
        },
        exitFullscreen() {
            if (!this.larksr) {
                return;
            }
            const { fullScreen } = this.larksr;
            fullScreen.exitFullscreen();
        },
        launchFullScreen() {
            if (!this.larksr) {
                return;
            }
            const { fullScreen } = this.larksr;
            fullScreen.launchFullScreen();
        },
        setToflipMouseWheel() {
            this.setFlipMouseWheel(true);
        },
        defaultMouseWheel() {
            this.setFlipMouseWheel(false);
        },
        showPlayerList() {
            this.setShowPlayerList(true);
        },
        hidePlayerList() {
            this.setShowPlayerList(false);
        },
        ...mapMutations({
            'setInputMethodEnable': 'setInputMethodEnable',
            'setShowPlayerList': 'playerMode/setShowPlayerList',
        }),
        ...mapActions({
            resize: 'resize',
            setScaleToDefault: 'setScaleToDefault',
            setScaleToFitScreen: 'setScaleToFitScreen',
            setScaleToFillStretch: 'setScaleToFillStretch',
            toggleScaleToFitScreen: 'toggleScaleToFitScreen',
            toggleScaleToFillStretch: 'toggleScaleToFillStretch',
            toggleState: 'stateModal/toggleState',
            toggleVMouseMode: 'toggleVMouseMode',
            toggleVKeyboard: 'toggleVKeyboard',
            toggleModalSetup: 'toggleModalSetup',
            showModalAlert: 'modalAlert/showModalAlert',
            toggleInitCursorMode: 'toggleInitCursorMode',
            toggleMenu: 'toggleMenu',
            toggleJoyStick: 'toggleJoyStick',
            toggleJoyStickAllKeys: 'toggleJoyStickAllKeys',
            showJoyStickAllKeys: 'showJoyStickAllKeys',
            hideJoyStickAllKeys: 'hideJoyStickAllKeys',
            setFlipMouseWheel: 'flipMouseWheel',
        }),
    }
}
</script>
<style lang="scss" scoped>
@import 'menu.scss';
</style>