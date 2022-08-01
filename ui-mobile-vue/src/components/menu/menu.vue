<template>
    <div :class="menuClass" :style="containerStyle">
        <div class="header">
            <p>功能菜单</p>
            <div class="btn-close" v-on:click="close">关闭</div>
            <p class="version">{{versionStr}}</p>
        </div>
        <div class="body">
            <div class="item" v-on:click="toggleState">
                <div class="item-left">连接状态</div>
                <div class="item-right">
                    <p>网络时延: {{states.currentRoundTripTime}} ms</p>
                    <p>码率: {{states.bitrate}} Mbps</p>
                    <p>丢包率: {{states.packetsLostPerc}}</p>
                </div>
            </div>
            <!-- mobile -->
            <div v-if="isMobile" class="item item-mousewheel">
                <div class="item-left">放大手势与滚轮映射</div>
                <div class="item-right">
                    <span v-on:click="setToflipMouseWheel" :class='flipMouseWheelClass' >
                        上滾
                    </span>
                    <span v-on:click="defaultMouseWheel" :class='defaultMouseWheelClass'>
                        下滾
                    </span>
                </div>
            </div>
            <div v-if="!isMobile" class="item">
                <div class="item-left">鼠标模式</div>
                <div class="item-right">
                    <span v-on:click="toggleInitCursorMode">
                        {{cursorMode}}
                    </span>
                </div>
            </div>
            <div v-if="!isIOS" class="item">
                <div class="item-left">网页全屏</div>
                <div class="item-right">
                    <span v-on:click="onFullScreen" :class='fullScreenClass' >
                        全屏
                    </span>
                    <span v-on:click="onFullScreen" :class='exitFullScreenClass'>
                        普通
                    </span>
                </div>
            </div>
            <div v-if="isInteractiveMode" class="item">
                <div class="item-left">玩家列表</div>
                <div class="item-right">
                    <span v-on:click="togglePlayerList">
                        {{playerModeButtonText}}
                    </span>
                </div>
            </div>
            <div class="item">
                <div class="item-left">音量</div>
                <div class="item-right">
                    <Slider v-on:change="onVolmueChange" />
                </div>
            </div>
            <div class="item">
                <div class="item-left">剪贴板</div>
                <div class="item-right">
                    <span v-on:click="toggleSyncClipboardParseEvent">{{syncClipboardParseEventText}}</span>
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
import Slider       from '../slider/slider';

export default {
    components: {
        // Btn,
        Slider,
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
        cursorMode() {
            return this.initCursorMode ? this.ui.mosueModeLock : this.ui.mouseModeAuto;
        },
        cursorModeInfo() { return !this.initCursorMode ? this.ui.mosueModeLock : this.ui.mouseModeAuto },
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
            menu: state => state.menu,
            states: (state) => {
                const { aggregatedStats, } = state;
                let rtt = (aggregatedStats.currentRoundTripTime * 1000).toFixed(2);
                return {
                    hasPacketsLost: aggregatedStats.packetsLost != 0,
                    packetsLost: aggregatedStats.packetsLost.toFixed(2),
                    packetsLostPerc: aggregatedStats.packetsLostPerc.toFixed(2) + "%",
                    hasBitrate: aggregatedStats.bitrate != 0,
                    bitrate: (aggregatedStats.bitrate / 1000).toFixed(2),
                    hasCurrentRoundTripTime: aggregatedStats.currentRoundTripTime != 0,
                    currentRoundTripTime: rtt,
                };
            },
            showVoiceChat: state => state.showVoiceChat,
            ui: state => state.ui,
            container: state => state.container,
            playerMode: state => state.playerMode,
            syncClipboardParseEventText: state => state.syncClipboardParseEvent ? "同步本地剪贴板" : "不同步本地剪贴板",
            isMobile: state => state.isMobile,
            joystickAllKeys: state => state.joystickAllKeys,
        }),
        ...mapGetters({
            viewPort: 'viewPort',
            isFullScreen: 'isFullScreen',
            isChangedScaledMode: 'isChangedScaledMode',
            viewPortStyle: 'viewPortStyle',
            isInteractiveMode: 'playerMode/isInteractiveMode',
            initCursorMode: "initCursorMode",
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
        togglePlayerList() {
            this.setShowPlayerList(!this.playerMode.showPlayerList);
        },
        onVolmueChange(value) {
            if (this.larksr) {
                this.larksr.videoElement.volume = value / 100;
            }
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
            'setSyncClipboardParseEvent': "setSyncClipboardParseEvent",
        }),
        ...mapActions({
            resize: 'resize',
            setScaleToDefault: 'setScaleToDefault',
            setScaleToFitScreen: 'setScaleToFitScreen',
            setScaleToFillStretch: 'setScaleToFillStretch',
            toggleScaleToFitScreen: 'toggleScaleToFitScreen',
            toggleScaleToFillStretch: 'toggleScaleToFillStretch',
            toggleState: 'stateModal/toggleState',
            toggleInitCursorMode: 'toggleInitCursorMode',
            toggleMenu: 'toggleMenu',
            setFlipMouseWheel: 'flipMouseWheel',
            toggleSyncClipboardParseEvent: "toggleSyncClipboardParseEvent",
        })
    }
}
</script>
<style lang="scss" scoped>
@import 'menu.scss';
</style>