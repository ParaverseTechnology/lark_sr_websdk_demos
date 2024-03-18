<template>
    <div v-if="useVMouse" :style="viewPortStyle">
        <!-- virtual mouse -->
        <MouseButton v-bind:style="vmouseStyle" v-on:touchstart="onTouchStart" v-on:touchend="onTouchEnd"
            v-on:drag="onDrag">
            <img v-if="mouseButton == 'left'" src="@/assets/img/mobile/cursor_left.png" alt="">
            <img v-else-if="mouseButton == 'right'" src="@/assets/img/mobile/cursor_right.png" alt="">
            <img v-else-if="mouseButton == 'mid'" src="@/assets/img/mobile/cursor_mid.png" alt="">
            <img v-else src="@/assets/img/mobile/cursor_left.png" alt="">
        </MouseButton>
        <MouseButton class="touchbackground" v-on:touchstart="onTouchStart" v-on:touchend="onTouchEnd"
            v-on:drag="onDrag">
        </MouseButton>
    </div>
</template>
<script>
    import {
        mapState,
        mapGetters,
        mapMutations,
        mapActions,
    }                       from 'vuex';
    import MouseButton      from './mouse_button/mouse_button';
    import Unit             from '@/utils/unit';
    import store            from '@/store';
    
     export default {
        components: {
            MouseButton,
        },
        props: ['useVMouse', 'mouseButton'],
        data() {
            return {
                toggle: true,
                vmousePosition: {
                    x: 0,
                    y: 0,
                },
                vmouseRightEdge: false,
                vmouseBottomEdge: false,
                vmouseLeftEdge: false,
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
            vmouseStyle() {
                let res = {
                    top: this.vmousePosition.y + 'px',
                    left: this.vmousePosition.x + 'px',
                };
                if (this.vmouseRightEdge) {
                    res.transform = "rotateY(180deg)";
                    res.transformOrigin = "left top";
                }
                if (this.vmouseBottomEdge) {
                    res.transform = "rotateZ(180deg)";
                    res.transformOrigin = "left top";
                }
                if (this.vmouseLeftEdge && this.vmouseBottomEdge) {
                    res.transform = "rotateZ(270deg)";
                    res.transformOrigin = "left top";
                }
                return res;
            },
            ...mapState({
                larksr: state => state.larksr,
                // ui: (state) => state.ui,
                // formate states
                states: (state) => {
                    const { aggregatedStats} = state;
                    let rtt = (aggregatedStats.currentRoundTripTime * 1000).toFixed(2);
                    return {
                        hasPacketsLost: aggregatedStats.packetsLost != 0,
                        packetsLost: aggregatedStats.packetsLost.toFixed(2),
                        packetsLostPerc: aggregatedStats.packetsLostPerc.toFixed(3) + "%",
                        hasBitrate: aggregatedStats.bitrate != 0,
                        bitrate: (aggregatedStats.bitrate / 1000).toFixed(2),
                        hasCurrentRoundTripTime: aggregatedStats.currentRoundTripTime != 0,
                        // hasCurrentRoundTripTime: true,
                        currentRoundTripTime: rtt,
                        rttMs: aggregatedStats.currentRoundTripTime * 1000,
                        // rttMs: 100,
                    };
                },
                mobileControlBallPosition: state => state.mobileControlBallPosition,
                isMobile: state => state.isMobile,
                // vmouseMode: state => state.vmouseMode,
                enableMobileControlBall: state => { return state.enableMobileControlBall; },
            }),
            ...mapGetters([
                "viewPortStyle",
                "viewPort",
                "screenOrientation",
                "container",
            ])
        },
        methods: {
            // vmouse motion.
            onTouchStart() {
                const p = this.vmousePosition;
                this.onVirtualMouseDown(this.mouseButton, p.x, p.y);
            },
            onTouchEnd() {
                const p = this.vmousePosition;
                this.onVirtualMouseUp(this.mouseButton, p.x, p.y);
            },
            onDrag(e) {
                const {
                    viewPort,
                    screenOrientation
                } = this;
                let p;
                let r;
                if (screenOrientation == 'landscape') {
                    p = {
                        x: this.vmousePosition.x + e.y,
                        y: this.vmousePosition.y - e.x,
                    }
                    r = {
                        x: e.y,
                        y: e.x,
                    }
                } else {
                    p = {
                        x: this.vmousePosition.x + e.x,
                        y: this.vmousePosition.y + e.y,
                    };
                    r = {
                        x: e.x,
                        y: e.y,
                    }
                }
                if (p.x < 0) p.x = 0;
                this.vmouseLeftEdge = (p.x <= 30);
                if (p.x >= viewPort.width) {
                    p.x = viewPort.width;
                }
                this.vmouseRightEdge = (p.x >= viewPort.width - 30);
                if (p.y < 0) p.y = 0;
                if (p.y >= viewPort.height) {
                    p.y = viewPort.height;
                }
                this.vmouseBottomEdge = (p.y >= viewPort.height - 30);

                this.vmousePosition = p;

                // Log.info("onDrag", p, screenOrientation);

                this.onVirtualMouseMove(p.x, p.y, r.x, r.y);
            },
            // control ball.
            onDragStart(e) {
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
            onDragBall(e) {
                const {
                    viewPort,
                    screenOrientation
                } = this;
                if (!this.dragStarted) {
                    let disx = e.changedTouches[0].clientX - this.dragStartPosition.x;
                    let disy = e.changedTouches[0].clientY - this.dragStartPosition.y;
                    let distance = Math.sqrt(disx * disx + disy * disy);
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
            // 网页坐标转换为云端应用坐标
            getVMouseTouchPosition(localX, localY, localRX, localRY) {
                const {
                    container, 
                    appSize
                } = store.getters;
                const scale = store.getters.operateScale;
                let p = { x: 0, y: 0, rx: 0, ry: 0 };
                p.x = localX - container.marginLeft;
                p.y = localY - container.marginTop;
                p.rx = localRX;
                p.ry = localRY;
                p.x = Math.round(p.x * scale.scaleX);
                p.y = Math.round(p.y * scale.scaleY);
                // WARNING 虚拟鼠标不同与触摸事件.
                p.rx = Math.round(p.rx * scale.scaleX);
                p.ry = Math.round(p.ry * scale.scaleX);
                // check p;
                if (p.x < 0 || p.y < 0 || p.x > appSize.width || p.y > appSize.height) {
                    // outside app screen.
                    return null;
                }
                return p;
            },
            
            onVirtualMouseMove(localX, localY, localRX, localRY) {
                const p = this.getVMouseTouchPosition(localX, localY, localRX, localRY);
                if (!p) return;
                this.larksr?.moseMove(p.x, p.y, p.rx, p.ry);
            },

            onVirtualMouseDown(button, localX, localY) {
                const p = this.getVMouseTouchPosition(localX, localY, 0, 0);
                if (!p) return;
                switch (button) {
                    case 'left':
                        this.larksr?.mouseDown(p.x, p.y, 0);
                        break;
                    case 'right':
                        this.larksr?.mouseDown(p.x, p.y, 1);
                        break;
                    case 'mid':
                        this.larksr?.mouseDown(p.x, p.y, 2);
                        break;
                }
            },

            onVirtualMouseUp(button, localX, localY) {
                const p = this.getVMouseTouchPosition(localX, localY, 0, 0);
                if (!p) return;
                switch (button) {
                    case 'left':
                        this.larksr?.mouseUp(p.x, p.y, 0);
                        break;
                    case 'right':
                        this.larksr?.mouseUp(p.x, p.y, 1);
                        break;
                    case 'mid':
                        this.larksr?.mouseUp(p.x, p.y, 2);
                        break;
                }
            },
            showInput() {
                this.setInputMethodEnable(true);
                this.setInputMethodStart(true);
            },
            ...mapMutations({
                setMobileControlBallPosition: 'setMobileControlBallPosition',
                setInputMethodStart: "setInputMethodStart",
                'setInputMethodEnable': 'setInputMethodEnable'
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
                showModalConfirm: 'modalConfirm/showModalConfirm',
            }),
        },
        mounted() {
            console.log('viewPortStyle',this.viewPortStyle)
        },
        beforeDestroy() {
        },
        watch: {}
    }
</script>
<style lang="scss" scoped>
@import 'v_cursor.scss';
</style>