<template>
    <div
        class="controlBall"
        :style="positionStyle"
        draggable="true"
        v-on:dragstart="onDragStart"
        v-on:dragend="onDragEnd"
    >
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
import store                        from '../store';
import {
    Msg
}                                   from '@/lib_sr/event/message';
import FullScreen                   from '@/lib_sr/utils/full_screen';
import Bus                          from '@/lib_sr/event/bus';
import GLOBAL_EVENT_TYPE, {
    createGlobalEvent
}                                   from '@/lib_sr/event/events';
import CloudlarkEvent, { CloudlarkEventType } from '@/lib_sr/cloudlark_event_type';

export default {
    components: {
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
            ui: state => state.ui,
            isFullScreen: state => state.isFullScreen,
            viewPort: state => {
                return state.viewPort;
            },
        }),
        ...mapGetters({
            isChangedScaledMode: 'isChangedScaledMode',
        })
    },
    methods: {
        togglePop() {
            this.popToggled = !this.popToggled;
        },
        onDragStart(e) {
            Log.info("on drag start", e);
            const offsetViewPort = Unit.getOffsetViewport(e.target);
            this.offsetPositon = {
                x: e.clientX - offsetViewPort.offsetX,
                y: e.clientY - offsetViewPort.offsetY,
            }
        },
        onDrag(e) {
            Log.info("on drag control ball", e);
        },
        onDragEnd(e) {
            Log.info("on drag end", e);
            this.position = {
                x: e.clientX - this.offsetPositon.x,
                y: e.clientY - this.offsetPositon.y,
            }
        },
        resizePosition() {
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            Log.info("resizePosition ", this.position.x, this.viewPort.width);
            if (this.position.x + 64 > this.viewPort.width) {
                this.position.x = this.viewPort.width - 100;
            }
            if (this.position.y + 64 > this.viewPort.height) {
                this.position.y = this.viewPort.height - 100;
            }
        },
        onFullScreen() {
            if (FullScreen.isFullScreen) {
                FullScreen.exitFullscreen();
            } else {
                FullScreen.launchFullScreen();
            }
        },
        // functions
        onQuit() {
            this.showModalConfirm({ des: Msg.COURSE_QUIT, code: CloudlarkEventType.LK_USER_REQUEST_QUIT })
            .then(()=>{
                Log.info('user confirm');
                Unit.quit();
            })
            .catch((e) => {
                Log.info('user cancle');
            });
        },
        onEsc() {
            Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.VIRTUAL_KEY_DOWN), {isRepeat: false, key: "Escape"});
            setTimeout(()=>{
                Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.VIRTUAL_KEY_UP), {key: "Escape"});
            }, 200);
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
