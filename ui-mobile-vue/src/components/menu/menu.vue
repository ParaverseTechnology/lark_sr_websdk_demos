<template>
    <div :class="menuClass" :style="containerStyle">
        <div class="header">
            <p>{{ ui.menu }}</p>
            <div class="btn-close" v-on:click="toggleMenu">{{ ui.menuClose }}</div>
            <p class="version">{{versionStr}}</p>
        </div>
        <div class="body">
            <div class="item" v-on:click="toggleState">
                <div class="item-left">{{ ui.state }}</div>
                <div class="item-right">
                    <p>{{ ui.rtt }}: {{states.currentRoundTripTime}} ms</p>
                    <p>{{ ui.bitrate }}: {{states.bitrate}} Mbps</p>
                    <p>{{ ui.packetsLostPerc }}: {{states.packetsLostPerc}}</p>
                </div>
            </div>
            <!-- mobile -->
            <div v-if="isMobile" class="item item-mousewheel">
                <div class="item-left">{{ ui.zoomOutGesture }}</div>
                <div class="item-right">
                    <span v-on:click="setToflipMouseWheel" :class='flipMouseWheelClass' >
                        {{ ui.zoomOutGestureUp }}
                    </span>
                    <span v-on:click="defaultMouseWheel" :class='defaultMouseWheelClass'>
                        {{ ui.zoomOutGestureDown }}
                    </span>
                </div>
            </div>
            <div v-if="!isMobile" class="item">
                <div class="item-left">{{ ui.cursorMode }}</div>
                <div class="item-right">
                    <span v-on:click="toggleInitCursorMode">
                        {{cursorMode}}
                    </span>
                </div>
            </div>
            <div v-if="!isIOS" class="item">
                <div class="item-left">{{ ui.menuFullScreen }}</div>
                <div class="item-right">
                    <span v-on:click="onFullScreen" :class='fullScreenClass' >
                        {{ ui.menuFullScreenOn }}
                    </span>
                    <span v-on:click="onFullScreen" :class='exitFullScreenClass'>
                        {{ ui.menuFullScreenOff }}
                    </span>
                </div>
            </div>
            <div v-if="isInteractiveMode" class="item">
                <div class="item-left">{{ ui.menuPlayerlist }}</div>
                <div class="item-right">
                    <span v-on:click="togglePlayerList">
                        {{playerModeButtonText}}
                    </span>
                </div>
            </div>
            <div class="item">
                <div class="item-left">{{ ui.volume }}</div>
                <div class="item-right">
                    <Slider v-on:change="onVolmueChange" />
                </div>
            </div>
            <div class="item">
                <div class="item-left">{{ ui.cipboardParse }}</div>
                <div class="item-right">
                    <span v-on:click="toggleSyncClipboardParseEvent">{{syncClipboardParseEventText}}</span>
                </div>
            </div>
            <!-- SR(独占)、SR(共享-平行云通用方案)有鸟瞰功能 -->
            <div v-if="larksr.params.appliType===1 ||larksr.params.appliType===2" class="item">
                <div class="item-left">{{ ui.aerial }}</div>
                <div class="item-right">
                    <span v-on:click="aerailView">{{ ui.openAerial }}</span>
                </div>
            </div>
            <div class="item">
                <div class="item-left">{{ ui.resolutions }}</div>
                <div class="item-right resolution">
                    <select v-model="selecteResolution" v-on:change="onChangeResolution">
                        <option v-for="(resolution, key) in resolutions" v-bind:value="resolution" v-bind:key="key">
                            {{ resolution.width }} X {{ resolution.height }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="item">
                <div class="item-left">{{ ui.restartTitle }}</div>
                <div class="item-right">
                    <span v-on:click="restartApp">{{ ui.restartButton }}</span>
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
            selecteResolution: { width: 1920, height: 1080 }, 
            resolutions: [
                { width: 4096, height: 1080 },
                { width: 4096, height: 2160 },
                { width: 3840, height: 2160 },
                { width: 3840, height: 1080 },
                { width: 2560, height: 1440 },
                { width: 2048, height: 1536 },
                { width: 1920, height: 1080 },
                { width: 1920, height: 1440 },
                { width: 1600, height: 900 },
                { width: 1366, height: 768 },
                { width: 1280, height: 720 },
                { width: 1280, height: 600 },
                { width: 2180, height: 3840 },
                { width: 1080, height: 1920 },
                { width: 720, height: 1280 },
                { width: 1536, height: 2048 },
            ],
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
        playerModeButtonText() {
            const pre = this.playerMode.showPlayerList ? this.ui.menuPlayerlistHide : this.ui.menuPlayerlistShow;
            return pre + this.ui.menuPlayerlist;
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
        showInput() {
            this.setInputMethodEnable(true);
        },
        aerailView() {
            this.toggleMenu();
            this.toggleAerailView();
        },
        onChangeResolution() {
            console.log("onChangeResolution", this.selecteResolution);
            this.larksr?.setCloudAppSize(this.selecteResolution.width, this.selecteResolution.height);
        },
        restartApp() {
            this.larksr?.restartCloudApp();
        },
        resetResolution() {
            let found = false;
            for (let res of this.resolutions) {
                if (res.width === this.larksr.currentAppSize.width && res.height === this.larksr.currentAppSize.height) {
                    found = true;
                }
            }

            if (!found) {
                this.resolutions.push({
                    width: this.larksr.currentAppSize.width,
                    height: this.larksr.currentAppSize.height,
                });
            }

            this.selecteResolution = {
                width: this.larksr.currentAppSize.width,
                height: this.larksr.currentAppSize.height,
            }
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
            toggleAerailView: 'toggleAerailView',
        })
    }
}
</script>
<style lang="scss" scoped>
@import 'menu.scss';
</style>