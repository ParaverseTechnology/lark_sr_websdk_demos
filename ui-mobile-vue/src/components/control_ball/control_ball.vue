<template>
    <div
        class="controlBall"
        :style="positionStyle"
        draggable="true"
        v-on:dragstart="onDragStart"
        v-on:dragend="onDragEnd"
    >
        <MicInput v-if="popToggled" />
        <VideoInput v-if="popToggled" />
        <LiveStreaming v-if="popToggled" />
        <div
            v-if="popToggled" class="pop pop-toggle"
        >
            <div class="pop-icon" v-on:click="togglePop"></div>
        </div>
        <div v-else class="pop">
            <div class="pop-icon" v-on:click="togglePop"></div>
            <div :class="popContentRotatedClass" v-on:click="togglePop">
                <div v-if="isChangedScaledMode" class="icon icon-scale" v-on:click="toggleScaleToFillStretch">适应</div>
                <div v-else class="icon icon-scale" v-on:click="toggleScaleToFillStretch">{{ui.scale}}</div>

                <div v-if="!isFullScreen" class="icon icon-fullscreen" v-on:click="onFullScreen">{{ui.fullScreen}}</div>
                <div v-else class="icon icon-fullscreen" v-on:click="onFullScreen">{{ui.scaleToNormal}}</div>

                <div class="icon icon-menu" v-on:click="toggleMenu"></div>
                <div class="icon icon-esc" v-on:click="toggleState">网络</div>
                <div class="icon icon-exit" v-on:click="onQuit"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapActions,
}                                   from 'vuex';
import Unit                         from '../../utils/unit'
import store                        from '../../store';
import MicInput                     from '../mic_input/mic_input.vue';
import VideoInput                   from '../video_input/video_input.vue';
import LiveStreaming                from '../live_streaming/live_streaming.vue';

export default {
    components: {
        MicInput,
        VideoInput,
        LiveStreaming,
    },
    data() {
        return {
            popToggled: true,
            offsetPositon: {
                x: 0,
                y: 0,
            },
            position: {
                x: 0,
                y: 0,
            },
            subscribeAction: null,
        }
    },
    computed: {
        positionStyle() {
            if (this.position.x != 0 || this.position.y != 0) {
                return {
                    top: this.position.y + "px",
                    left: this.position.x + "px",
                }
            } else {
                return {
                    top: this.viewPort.height - 150 + "px",
                    left: this.viewPort.width - 100 + "px",
                };
            }
        },
        popContentRotatedClass() {
            let clazz = "pop-content";
            const { x, y } = this.position;
            if (x == 0 && y == 0) {
                return clazz;
            }
            const { width, height } = this.viewPort;
            if (y < 55) {
                clazz += " rotate-down";
            } else if (x < 65) {
                clazz += " rotate-right";
            } else if (height - y < 120) {
                clazz += " rotate-up";
            }
            // rotate-right
            return clazz;
        },
        ...mapState({
            larksr: state => state.larksr,
            ui: state => state.ui,
        }),
        ...mapGetters({
            isFullScreen: 'isFullScreen',

            viewPort: 'viewPort',
        })
    },
    methods: {
        togglePop() {
            this.popToggled = !this.popToggled;
        },
        onDragStart(e) {
            const offsetViewPort = Unit.getOffsetViewport(e.target);
            this.offsetPositon = {
                x: e.clientX - offsetViewPort.offsetX,
                y: e.clientY - offsetViewPort.offsetY,
            }
        },
        onDrag(e) {
        },
        onDragEnd(e) {
            this.position = {
                x: e.clientX - this.offsetPositon.x,
                y: e.clientY - this.offsetPositon.y,
            }
        },
        resizePosition() {
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            if (this.position.x + 64 > this.viewPort.width) {
                this.position.x = this.viewPort.width - 100;
            }
            if (this.position.y + 64 > this.viewPort.height) {
                this.position.y = this.viewPort.height - 100;
            }
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
        // functions
        onQuit() {
            this.showModalConfirm({ des: "确定退出当前页面" })
            .then(()=>{
                Unit.quit();
            })
            .catch((e) => {
            });
        },
        onEsc() {
           // TODO press esc key
        },
        ...mapActions({
            resize: 'resize',
            toggleScaleToFitScreen: 'toggleScaleToFitScreen',
            toggleScaleToFillStretch: 'toggleScaleToFillStretch',
            toggleState: 'stateModal/toggleState',
            toggleVMouseMode: 'toggleVMouseMode',
            toggleVKeyboard: 'toggleVKeyboard',
            toggleModalSetup: 'toggleModalSetup',
            showModalAlert: 'modalAlert/showModalAlert',
            showModalConfirm: 'modalConfirm/showModalConfirm',
            toggleInitCursorMode: 'toggleInitCursorMode',
            toggleMenu: 'toggleMenu',
            toggleJoyStick: 'toggleJoyStick',
            isChangedScaledMode: 'isChangedScaledMode',
        }),
    },
    mounted() {
        this.subscribeAction = store.subscribeAction({after: (actions, state) => {
            if (actions.type == 'resize') {
                this.resizePosition();
            }
        }});
    },
    beforeDestroy() {
        if (this.subscribeAction) {
            this.subscribeAction();
        }
    }
}
</script>
<style lang="scss" scoped>
@import "control_ball.scss";
</style>
