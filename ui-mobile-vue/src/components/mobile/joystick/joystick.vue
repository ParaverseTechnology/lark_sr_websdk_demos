<template>
    <div class="joy-container" :style="viewPortStyle">
        <!-- left joystick -->
        <JoyButton class="joystick left"
            v-on:start="onJoyStickStart"
            v-on:move="onJoyStickMove"
            v-on:end="onJoyStickEnd" v-on:repeat="onJoyStickRepeat"
            repeatTimeout="5"
            ref="joystick"
                   :style="{'background-image': 'url('+joystickUrl+')'}"
        >
            <div class="center"  :style="{ 'left': joysickTouchesPosition.x + 'px',
            'top': joysickTouchesPosition.y + 'px','background-image': 'url('+joystickCenterUrl+')'}"></div>

        </JoyButton>
        <!-- quick keyboard left -->
        <!--<div class="joystick keyboard-left">
            <Key
                size="x3_4" circle="true" keyName="KeyQ"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >Q</Key>
            <Key
                size="x3_4" circle="true" keyName="KeyE"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >E</Key>
            <Key
                size="x3_4" circle="true" keyName="KeyR"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >R</Key>
        </div>-->
        <div v-if="joystickAllKeys" class="joystick keyboard-mid">
            <Key size="x3_4" circle="true" keyName="KeyF"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >F</Key>
            <Key size="x3_4" circle="true" keyName="KeyG"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >G</Key>
            <Key size="x3_4" circle="true" keyName="KeyZ"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >Z</Key>
            <Key size="x3_4" circle="true" keyName="KeyX"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >X</Key>
            <Key size="x3_4" circle="true" keyName="KeyC"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >C</Key>
            <Key size="x3_4" circle="true" keyName="KeyV"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >V</Key>
        </div>
    </div>
</template>
<script>
import {
    mapState,
}                          from 'vuex';
import JoyButton           from './joy_button/joy_button'
import Key                 from '../keyboard/key/key'

// 阻尼
const DAMPING = 0.08;

export default {
    components: {
        JoyButton,
        Key,
    },
    data() {
        return {
            // lock mouse, left, right, mid, none
            lockMouse: 'left',
            // left key: w a s d none
            leftKey: 'none',
            // right key: MouseLeft MouseRight MouseUp MouseDown
            rightKey: 'none',
            joysickTouchesPosition: {
                x: 0,
                y: 0,
            },
            joystickElement: {
                root: null,
                width: 0,
                height: 0,
            },
            joystickVector: null,
            // subscribe action
            subscribeAction: null,
            //
            leftJoyStickKeys: [],
            joystickCenterUrl:'',
            joystickUrl:''
        }
    },
    computed: {
        // right joystick pixel size
        rightJoystickSize() {
            const { mobilePixelUnit } = this;
            return {
                width: Unit.getMobliePixelWidth(255, mobilePixelUnit),
                height: Unit.getMobliePixelWidth(255, mobilePixelUnit),
            };
        },
        // right joystick pixel
        rightJoystickPosition() {
            const { mobilePixelUnit } = this;
            const { viewPort, screenOrientation } = this;
            if (screenOrientation === 'landscape') {
                return {
                    top: viewPort.width - Unit.getMobliePixelWidth(255 + 48, mobilePixelUnit),
                    left: Unit.getMobliePixelWidth(255 + 48, mobilePixelUnit),
                };
            } else {
                return {
                    left: viewPort.width - Unit.getMobliePixelWidth(255 + 48, mobilePixelUnit),
                    top: viewPort.height - Unit.getMobliePixelWidth(255 + 48, mobilePixelUnit),
                };
            }
        },
        leftJoystickPosition() {
            const { mobilePixelUnit } = this;
            const { viewPort, screenOrientation } = this;
            if (screenOrientation === 'landscape') {
                return {
                    top: Unit.getMobliePixelWidth(48, mobilePixelUnit),
                    left: Unit.getMobliePixelWidth(255 + 48, mobilePixelUnit),
                };
            } else {
                return {
                    left: Unit.getMobliePixelWidth(48, mobilePixelUnit),
                    top: viewPort.height - Unit.getMobliePixelWidth(255 + 48, mobilePixelUnit),
                };
            }
        },
        isLockLeft() {
            return this.lockMouse == 'left';
        },
        lockLeftClass() {
            return this.isLockLeft ? "mouselock mouselock-lock" : "mouselock mouselock-unlock";
        },
        isLockRight() {
            return this.lockMouse == 'right';
        },
        lockRightClass() {
            return this.isLockRight ? "mouselock mouselock-lock" : "mouselock mouselock-unlock";
        },
        isLockMid() {
            return this.lockMouse == 'mid';
        },
        lockMidClass() {
            return this.isLockMid ? "mouselock mouselock-lock" : "mouselock mouselock-unlock";
        },
        leftKeyCenterClass() {
            switch (this.leftKey) {
                case 'KeyW':
                    return 'center top';
                case 'KeyA':
                    return 'center left';
                case 'KeyS':
                    return 'center bottom';
                case 'KeyD':
                    return 'center right';
            }
            return 'center';
        },
        joysickCenterStyle() {
            return {
                left: this.joysickTouchesPosition.x + "px",
                top: this.joysickTouchesPosition.y + "px",
            }
        },
        ...mapState({
            viewPortStyle: state => {
                return {
                    width: state.viewPort.width + "px",
                    top: state.viewPort.height + 'px',
                }
            },
            viewPort: state => state.viewPort,
            joystickAllKeys: state =>  state.joystickAllKeys,
            screenOrientation: state => state.screenOrientation,
            mobilePixelUnit: state => state.mobilePixelUnit,
        }),
    },
    methods: {
        onKeyStart(key) {
            Log.info("onKeyStart", key);
            // sync pressed key
            this.leftKey = key;
            Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.VIRTUAL_KEY_DOWN), {isRepeat: false, key});
        },
        onKeyEnd(key) {
            Log.info("onKeyEnd", key);
            // sync pressed key
            this.leftKey = 'none';
            Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.VIRTUAL_KEY_UP), {key});
        },
        onRepeat(key) {
            Log.info("onRepeat", key);
            Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.VIRTUAL_KEY_DOWN), {isRepeat: true, key});
        },
        onLockLeft() {
            if (this.lockMouse == 'left') {
                this.lockMouse = 'none'
            } else {
                this.lockMouse = 'left';
            }
        },
        onLockRight() {
            if (this.lockMouse == 'right') {
                this.lockMouse = 'none'
            } else {
                this.lockMouse = 'right';
            }
        },
        onLockMid() {
            if (this.lockMouse == 'mid') {
                this.lockMouse = 'none'
            } else {
                this.lockMouse = 'mid';
            }
        },
        getRelMousePositionByKey(type, key) {
            let rx = 0;
            let ry = 0;
            switch(key) {
                case 'MouseLeft':
                    rx = -1;
                    break;
                case 'MouseRight':
                    rx = 1;
                    break;
                case 'MouseUp':
                    ry = -1;
                    break;
                case 'MouseDown':
                    ry = 1;
                    break;
            }
            return { type, mouseKey: this.lockMouse, rx: rx, ry: ry };
        },
        // right key: MouseLeft MouseRight MouseUp MouseDown
        onMouseStart(key) {
            this.rightKey = key;
            // Log.info('onMouseStart', key);
            Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.JOY_STICK_MOUSE_MOVE), this.getRelMousePositionByKey('start', key));
        },
        // right key: MouseLeft MouseRight MouseUp MouseDown
        onMouseEnd(key) {
            this.rightKey = 'none';
            // Log.info('onMouseEnd', key);
            Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.JOY_STICK_MOUSE_MOVE), this.getRelMousePositionByKey('end', key));
        },
        // right key: MouseLeft MouseRight MouseUp MouseDown
        onMouseRepeat(key) {
            // Log.info('onMouseRepeat', key);
            Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.JOY_STICK_MOUSE_MOVE), this.getRelMousePositionByKey('move', key));
        },
        // joysick button
        onJoyStickStart(key, e) {
            const { screenOrientation, leftJoystickPosition } = this;

            // Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.JOY_STICK_MOUSE_MOVE),
            //     {type: "start", mouseKey: this.lockMouse, rx: 0, ry: 0});
            let p = { x: 0, y: 0 };
            // 通过旋转横屏时注意触摸的坐标系变换
            if (screenOrientation === 'landscape') {
                p.x = e.targetTouches[0].clientY - leftJoystickPosition.top;
                p.y = leftJoystickPosition.left - e.targetTouches[0].clientX;
            } else {
                p = Unit.singlePointRelativePosition(e.targetTouches[0], e.target);
            }
            if (p) {
                this.joysickTouchesPosition = p;
                let vector = this.getLimitRelativeVector(p.x, p.y);
                this.setLimitTouchPosition(vector);
                this.vector = vector;
            }
        },
        onJoyStickMove(key, e) {
            const { screenOrientation, leftJoystickPosition } = this;
            let p = { x: 0, y: 0 };
            // 通过旋转横屏时注意触摸的坐标系变换
            if (screenOrientation === 'landscape') {
                p.x = e.targetTouches[0].clientY - leftJoystickPosition.top;
                p.y = leftJoystickPosition.left - e.targetTouches[0].clientX;
            } else {
                p = Unit.singlePointRelativePosition(e.targetTouches[0], e.target);
            }

            if (p) {
                this.joysickTouchesPosition = p;
                let vector = this.getLimitRelativeVector(p.x, p.y);
                this.setLimitTouchPosition(vector);
                this.vector = vector;
            }
        },
        onJoyStickEnd(eventKey, e) {
            this.joysickTouchesPosition = {
                x: this.joystickElement.width / 2,
                y: this.joystickElement.height / 2,
            }
            this.vector = null;
            // release all keys.
            for (let key of this.leftJoyStickKeys) {
                Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.VIRTUAL_KEY_UP), {key});
            }
            this.leftJoyStickKeys = [];
        },
        onJoyStickRepeat(key) {
            if (this.vector == null) {
                return;
            }
            const RADIUS = this.joystickElement.width / 2;
            if (this.vector.r < RADIUS / 4) {
                return;
            }
            // 象限区域
            const areia = this.getAreia(this.vector);
            // 角度区域
            const deg = this.getDegAreia(this.vector);
            if (deg == 1 && (areia == 1 || areia == 4))  {
                // Log.info("d");
                this.leftJoysStickKeyChannge(["KeyD"]);
            } else if (deg == 2 && areia == 1) {
                // Log.info("d + w");
                this.leftJoysStickKeyChannge(["KeyD", "KeyW"]);
            } else if (deg == 3 && (areia == 1 || areia == 2)) {
                // Log.info("w");
                this.leftJoysStickKeyChannge(["KeyW"]);
            } else if (deg == 2 && areia == 2) {
                // Log.info("w + a");
                this.leftJoysStickKeyChannge(["KeyW", "KeyA"]);
            } else if (deg == 1 && (areia == 2 || areia == 3)) {
                // Log.info("a");
                this.leftJoysStickKeyChannge(["KeyA"]);
            } else if (deg == 2 && areia == 3) {
                // Log.info("a + s");
                this.leftJoysStickKeyChannge(["KeyA", "KeyS"]);
            } else if (deg == 3 && (areia == 3 || areia == 4)) {
                // Log.info("s");
                this.leftJoysStickKeyChannge(["KeyS"]);
            } else if (deg == 2 && areia == 4) {
                // Log.info("s + d");
                this.leftJoysStickKeyChannge(["KeyS", "KeyD"]);
            }
        },
        leftJoysStickKeyChannge(newKeys) {
            let oldKeys = this.leftJoyStickKeys;
            // key start press
            if (oldKeys.length === 0) {
                Log.info("press start", newKeys);
                for (let key of newKeys) {
                    Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.VIRTUAL_KEY_DOWN),
                        {isRepeat: false, key});
                }
                this.leftJoyStickKeys = newKeys;
                return;
            }
            let oldKeyChannged = [];
            for (let i = 0; i < oldKeys.length; i++) {
                oldKeyChannged.push(true);
            }

            for (let i = 0; i < oldKeys.length; i ++) {
                for (let j = 0; j < newKeys.length; j ++) {
                    if (oldKeys[i] == newKeys[j]) {
                        oldKeyChannged[i] = false;
                    }
                }
            }

            for (let i = 0; i < oldKeys.length; i ++) {
                if (oldKeyChannged[i]) {
                    Log.info("release old key ", oldKeys[i]);
                    Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.VIRTUAL_KEY_UP), {key: oldKeys[i]});
                }
            }

            let newKeyChannged = [];
            for (let i = 0; i < newKeys.length; i ++) {
                newKeyChannged.push(true);
            }

            for (let i = 0; i < newKeys.length; i ++) {
                for (let j = 0; j < oldKeys.length; j ++) {
                    if (newKeys[i] == oldKeys[j]) {
                        newKeyChannged[i] = false;
                    }
                }
            }

            for (let i = 0; i < newKeys.length; i ++) {
                if (newKeyChannged[i]) {
                    Log.info("press new key", newKeys[i]);
                    Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.VIRTUAL_KEY_DOWN),
                        {isRepeat: false, key: newKeys[i]});
                } else {
                    // Log.info("repeat key", newKeys[i]);
                    Bus.emit(createGlobalEvent(GLOBAL_EVENT_TYPE.VIRTUAL_KEY_DOWN),
                        {isRepeat: true, key: newKeys[i]});
                }
            }

            this.leftJoyStickKeys = newKeys;
        },
        // 获取象限
        /**
         *          ^ -1
         *          |
         *      2   |   1
         * -1 ------|------> 1
         *          |
         *      3   |    4
         *          | 1
         */
        getAreia(vector) {
            if (vector.dx == 1 && vector.dy == -1) {
                return 1;
            } else if (vector.dx == -1 && vector.dy == -1) {
                return 2;
            } else if (vector.dx == -1 && vector.dy == 1) {
                return 3;
            } else if (vector.dx == 1 && vector.dy == 1) {
                return 4;
            }
        },
        // 获取角度区域
        getDegAreia(vector) {
            let deg = Math.atan(vector.ry / vector.rx) * 180 / Math.PI;
            let absDeg = Math.abs(deg);
            if (absDeg <= 22.5) {
                // Log.info("deg h", deg, vector.dx, vector.dy);
                return 1;
            } else if (absDeg > 22.5 && absDeg <= 67.5) {
                // Log.info("deg center", deg, vector.dx, vector.dy);
                return 2;
            } else {
                // Log.info("deg up", deg, vector.dx, vector.dy);
                return 3;
            }
        },
        // joystick helpers
        /**
         * 获取相对移动的向量.
         * @param x 本地坐标x
         * @param y 本地坐标y
         * @return vector 方向：相对圆心的位置，大小：相对圆心距离，不超过半径
         */
        getLimitRelativeVector(x, y) {
            const RADIUS = this.joystickElement.width / 2;
            // local x,y
            let rx   = x - RADIUS;
            let ry   = y - RADIUS;
            let absR = Math.sqrt(rx * rx + ry * ry);
            let r    = Math.min(absR, RADIUS);

            let dx   = rx / Math.abs(rx);
            let dy   = ry / Math.abs(ry);
            return {
                // 相对位移坐标
                rx: rx,
                ry: ry,
                r: r,
                // 本地绝对坐标
                ax: x,
                ay: y,
                // 方向坐标
                dx: dx,
                dy: dy
            };
        },
        /**
         * 根据相对移动的向量设置圆心位置。不会超过整个摇杆背景。
         */
        setLimitTouchPosition(vector) {
            let res = {
                x: 0,
                y: 0,
            };
            const RADIUS = this.joystickElement.width / 2;
            let rx = vector.rx;
            let ry = vector.ry;
            if (vector.r >= RADIUS) {
                let deg = Math.atan(ry / rx);
                let isNegative = vector.dx;
                res.x = RADIUS + isNegative * vector.r * Math.cos(deg);
                res.y = RADIUS + isNegative * vector.r * Math.sin(deg);
            } else {
                res.x = vector.ax;
                res.y = vector.ay;
            }
            this.joysickTouchesPosition = res;
        }
    },
    mounted() {
        let logoServer = "";
        if (process.env.NODE_ENV !== 'production' && Load.debugWebServer) {
            logoServer = "http://" + Load.debugWebServer;
        }
        let that = this;
        let img =new Image();
        img.src = logoServer+"/image/LarkXR_joystickLogo.png"
        img.onload=function (){
            that.joystickUrl =  logoServer+"/image/LarkXR_joystickLogo.png"
        };
        img.onerror=function(){
            that.joystickUrl = logoServer+"/static/img/joy_left_bottom.png"
        }

        let imgCenter =new Image();
        imgCenter.src = logoServer+"/image/LarkXR_joystickCenterLogo.png"
        imgCenter.onload=function (){
            //that.joysickCenterStyle['background-image'] = 'url(/image/LarkXR_joystickCenterLogo.png)'
            that.joystickCenterUrl =  logoServer+"/image/LarkXR_joystickCenterLogo.png"
        };
        imgCenter.onerror=function(){
           // that.joysickCenterStyle['background-image'] = 'url(~@/assets/img/mobile/joy_stick_top.png)'
            that.joystickCenterUrl = logoServer+"/static/img/joy_stick_top.png"
        }


        const joystick = this.$refs['joystick'];
        if (joystick && joystick.getRootElement()) {
            Log.info('joystick size:', joystick.getRootElement().clientWidth, joystick.getRootElement().clientHeight);
            this.joystickElement =  {
                root: joystick.getRootElement(),
                width: joystick.getRootElement().clientWidth,
                height: joystick.getRootElement().clientHeight,
            };
            this.joysickTouchesPosition = {
                x: this.joystickElement.width / 2,
                y: this.joystickElement.height / 2,
            };
        }
        this.subscribeAction = store.subscribeAction({after: (actions, state) => {
            const joystickElement = this.$refs['joystick'];
            if (actions.type === 'resize') {
                Log.info('joystick sub scribe action resize.');
                this.joystickElement =  {
                    root: joystickElement.getRootElement(),
                    width: joystickElement.getRootElement().clientWidth,
                    height: joystickElement.getRootElement().clientHeight,
                };
                this.joysickTouchesPosition = {
                    x: this.joystickElement.width / 2,
                    y: this.joystickElement.height / 2,
                };
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
@import 'joystick.scss';
</style>
