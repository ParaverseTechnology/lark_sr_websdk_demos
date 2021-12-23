<template>
    <div :class="menuClass" :style="containerStyle">
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
import Capabilities from '../../utils/capabilities';

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
        menuClass() {
            return this.menu ? "menu enable" : "menu disable";
        },
        containerStyle() {
            return {
                height: this.viewPort.height + "px",
            }
        },
        fullScreenClass() {
            return this.isFullScreen ? 'active' : '';
        },
        exitFullScreenClass() {
            return this.isFullScreen ? '' : 'active';
        },
        ...mapState({
            larksr: state => state.larksr,
            defaultScaleModeClass() {
                return this.isChangedScaledMode ? '' : 'active';
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
                let rtt = (aggregatedStats.currentRoundTripTime * 1000).toFixed(2);
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
            ui: state => state.ui,
            joystickAllKeys: state => state.joystickAllKeys,
            flipMouseWheel: state => state.flipMouseWheel,
            playerMode: state => state.playerMode,
            menu: state => state.menu,
        }),
        ...mapGetters({
            viewPort: 'viewPort',
            isFullScreen: 'isFullScreen',
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
            console.log('exitFullscreen', fullScreen);
            fullScreen.exitFullscreen();
        },
        launchFullScreen() {
            if (!this.larksr) {
                return;
            }
            const { fullScreen } = this.larksr;
            console.log('launchFullScreen');
            fullScreen.launchFullScreen();
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
            toggleState: 'stateModal/toggleState',
            toggleVMouseMode: 'toggleVMouseMode',
            toggleVKeyboard: 'toggleVKeyboard',
            toggleModalSetup: 'toggleModalSetup',
            showModalAlert: 'modalAlert/showModalAlert',
            toggleMenu: 'toggleMenu',
            toggleJoyStick: 'toggleJoyStick',
        }),
    }
}
</script>
<style lang="scss" scoped>
@import 'menu.scss';
</style>