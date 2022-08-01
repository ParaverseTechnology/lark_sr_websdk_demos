<template>
  <div class="joy-container" :style="viewPortStyle">
    <!-- left joystick -->
    <JoyButton
      class="joystick left"
      :style="{'background-image': 'url('+joystickUrl+')'}"
      v-on:start="onJoyStickStart"
      v-on:move="onJoyStickMove"
      v-on:end="onJoyStickEnd"
      v-on:repeat="onJoyStickRepeat"
      repeatTimeout="5"
      ref="joystick"
    >
      <div
        class="center"
        :style="joysickCenterStyle"
      ></div>
    </JoyButton>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import JoyButton from "./joy_button/joy_button";
import Unit from "../../../utils/unit";
import store from "../../../store/index";

export default {
  // subType  1 wasd  2 updownleftright 3 joystick
  // position css top and left from parent container.
  props: ["subType", "position"],
  components: {
    JoyButton,
  },
  data() {
    return {
      // lock mouse, left, right, mid, none
      lockMouse: "left",
      // left key: w a s d none
      leftKey: "none",
      // right key: MouseLeft MouseRight MouseUp MouseDown
      rightKey: "none",
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
      joystickCenterUrl: "",
    };
  },
  computed: {
    joystickUrl() {
      // subType  1 wasd  2 updownleftright 3 joystick
      switch(this.subType) {
          case 1:
              return require('@/assets/img/mobile/AWSD.png');
          case 2:
              return require('@/assets/img/mobile/joy_stick_bottom.png');
          case 3:
              return require('@/assets/img/mobile/joy_left_bottom.png');
          default:
              return require('@/assets/img/mobile/joy_left_bottom.png');
      }
    },
    // right joystick pixel size
    rightJoystickSize() {
      const { mobilePixelUnit } = this;
      return {
        width: Unit.getMobliePixelWidth(255, mobilePixelUnit),
        height: Unit.getMobliePixelWidth(255, mobilePixelUnit),
      };
    },
    leftJoystickPosition() {
        const { position, screenOrientation, viewPort } = this;
        // const RADIUS = this.joystickElement.width / 2;
        if (position) {
            if (screenOrientation == 'landscape') {
                return {
                    top: position.left,
                    left: viewPort.height - position.top,
                }
            } else {
                return position;
            }
        } else {
            return {
                top: 0,
                left: 0,
            }
        }
    },
    joysickCenterStyle() {
      return {
        left: this.joysickTouchesPosition.x + "px",
        top: this.joysickTouchesPosition.y + "px",
      };
    },
    viewPortStyle() {
        return {
          width: this.viewPort.width + "px",
          top: this.viewPort.height + "px",
        };
    },
    ...mapState({
      mobilePixelUnit: (state) => state.mobilePixelUnit,
      larksr: (state) => state.larksr,
    }),
    ...mapGetters({
        viewPort: 'viewPort',
        screenOrientation: 'screenOrientation',
    }),
  },
  methods: {
    // joysick button
    onJoyStickStart(key, e) {
      const { screenOrientation, leftJoystickPosition } = this;

      let p = { x: 0, y: 0 };
      // 通过旋转横屏时注意触摸的坐标系变换
      if (screenOrientation === "landscape") {
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
      if (screenOrientation === "landscape") {
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
      if(this.subType && this.subType == 3) {
          this.larksr?.joystick(0, 0, 0, 0, 0);
      }
      this.joysickTouchesPosition = {
        x: this.joystickElement.width / 2,
        y: this.joystickElement.height / 2,
      };
      this.vector = null;
      // release all keys.
      for (let key of this.leftJoyStickKeys) {
        this.larksr?.keyUp(key);
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
      // subType  1 wasd  2 updownleftright 3 joystick
      if(this.subType && this.subType == 3) {
          ///Log.info("virtual joystick type", this.subType, this.joysickTouchesPosition);
          let relCenterPositionX = this.joysickTouchesPosition.x / RADIUS - 1;
          let relCenterPositionY = -(this.joysickTouchesPosition.y / RADIUS - 1);
          // 0.96 = 1
          const offset = 0.05; 
          if (relCenterPositionX > (1 - offset)) {
              relCenterPositionX = 1;
          }
          if (relCenterPositionX < (-1 + offset)) {
              relCenterPositionX = -1;
          }
          if(relCenterPositionY > (1 - offset)) {
              relCenterPositionY = 1;
          }
          if (relCenterPositionY < (-1 + offset)) {
              relCenterPositionY = -1;
          }
          this.larksr?.joystick(0, relCenterPositionX * 32767, relCenterPositionY * 32767, 0, 0);
          // Log.info("virtual joystick type", relCenterPositionX, relCenterPositionY, relCenterPositionX * 32767, relCenterPositionY * 32767);
          return;
      }
      // 象限区域
      const areia = this.getAreia(this.vector);
      // 角度区域
      const deg = this.getDegAreia(this.vector);
      if (deg == 1 && (areia == 1 || areia == 4))  {
          // Log.info("d");
          this.leftJoysStickKeyChannge([this.getSubKeyType("KeyD")]);
      } else if (deg == 2 && areia == 1) {
          // Log.info("d + w");
          this.leftJoysStickKeyChannge([this.getSubKeyType("KeyD"), this.getSubKeyType("KeyW")]);
      } else if (deg == 3 && (areia == 1 || areia == 2)) {
          // Log.info("w");
          this.leftJoysStickKeyChannge([this.getSubKeyType("KeyW")]);
      } else if (deg == 2 && areia == 2) {
          // Log.info("w + a");
          this.leftJoysStickKeyChannge([this.getSubKeyType("KeyW"), this.getSubKeyType("KeyA")]);
      } else if (deg == 1 && (areia == 2 || areia == 3)) {
          // Log.info("a");
          this.leftJoysStickKeyChannge([this.getSubKeyType("KeyA")]);
      } else if (deg == 2 && areia == 3) {
          // Log.info("a + s");
          this.leftJoysStickKeyChannge([this.getSubKeyType("KeyA"), this.getSubKeyType("KeyS")]);
      } else if (deg == 3 && (areia == 3 || areia == 4)) {
          // Log.info("s");
          this.leftJoysStickKeyChannge([this.getSubKeyType("KeyS")]);
      } else if (deg == 2 && areia == 4) {
          // Log.info("s + d");
          this.leftJoysStickKeyChannge([this.getSubKeyType("KeyS"), this.getSubKeyType("KeyD")]);
      }
    },
    getSubKeyType(key) {
        // Log.info("getSubKeyType ", key, this.subType);
        // subType  1 wasd  2 updownleftright 3 joystick
        if(this.subType && this.subType == 2) {
            switch (key) {
                case "KeyW":
                    return "ArrowUp";                    
                case "KeyA":
                    return "ArrowLeft";
                case "KeyS":
                    return "ArrowDown";
                case "KeyD":
                    return "ArrowRight";
                default:
                    return key;
            }
        } else {
            return key;
        }
    },
    leftJoysStickKeyChannge(newKeys) {
      let oldKeys = this.leftJoyStickKeys;
      // key start press
      if (oldKeys.length === 0) {
        console.log("press start", newKeys);
        for (let key of newKeys) {
          this.larksr?.keyDown(key, false);
        }
        this.leftJoyStickKeys = newKeys;
        return;
      }
      let oldKeyChannged = [];
      for (let i = 0; i < oldKeys.length; i++) {
        oldKeyChannged.push(true);
      }

      for (let i = 0; i < oldKeys.length; i++) {
        for (let j = 0; j < newKeys.length; j++) {
          if (oldKeys[i] == newKeys[j]) {
            oldKeyChannged[i] = false;
          }
        }
      }

      for (let i = 0; i < oldKeys.length; i++) {
        if (oldKeyChannged[i]) {
          console.log("release old key ", oldKeys[i]);
          this.larksr?.keyUp(oldKeys[i]);
        }
      }

      let newKeyChannged = [];
      for (let i = 0; i < newKeys.length; i++) {
        newKeyChannged.push(true);
      }

      for (let i = 0; i < newKeys.length; i++) {
        for (let j = 0; j < oldKeys.length; j++) {
          if (newKeys[i] == oldKeys[j]) {
            newKeyChannged[i] = false;
          }
        }
      }

      for (let i = 0; i < newKeys.length; i++) {
        if (newKeyChannged[i]) {
          console.log("press new key", newKeys[i]);
          this.larksr?.keyDown(newKeys[i], false);
        } else {
          // console.log("repeat key", newKeys[i]);
          this.larksr?.keyDown(newKeys[i], true);
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
      let deg = (Math.atan(vector.ry / vector.rx) * 180) / Math.PI;
      let absDeg = Math.abs(deg);
      if (absDeg <= 22.5) {
        // console.log("deg h", deg, vector.dx, vector.dy);
        return 1;
      } else if (absDeg > 22.5 && absDeg <= 67.5) {
        // console.log("deg center", deg, vector.dx, vector.dy);
        return 2;
      } else {
        // console.log("deg up", deg, vector.dx, vector.dy);
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
      let rx = x - RADIUS;
      let ry = y - RADIUS;
      let absR = Math.sqrt(rx * rx + ry * ry);
      let r = Math.min(absR, RADIUS);

      let dx = rx / Math.abs(rx);
      let dy = ry / Math.abs(ry);
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
        dy: dy,
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
    },
  },
  mounted() {
    const joystick = this.$refs["joystick"];
    if (joystick && joystick.getRootElement()) {
      console.log(
        "joystick size:",
        joystick.getRootElement().clientWidth,
        joystick.getRootElement().clientHeight
      );
      this.joystickElement = {
        root: joystick.getRootElement(),
        width: joystick.getRootElement().clientWidth,
        height: joystick.getRootElement().clientHeight,
      };
      this.joysickTouchesPosition = {
        x: this.joystickElement.width / 2,
        y: this.joystickElement.height / 2,
      };
    }

    this.subscribeAction = store.subscribeAction({
      after: (actions) => {
        const joystickElement = this.$refs["joystick"];
        if (actions.type === "resize") {
          console.log("joystick sub scribe action resize.");
          this.joystickElement = {
            root: joystickElement.getRootElement(),
            width: joystickElement.getRootElement().clientWidth,
            height: joystickElement.getRootElement().clientHeight,
          };
          this.joysickTouchesPosition = {
            x: this.joystickElement.width / 2,
            y: this.joystickElement.height / 2,
          };
        }
      },
    });
  },
  beforeDestroy() {
    if (this.subscribeAction) {
      this.subscribeAction();
    }
  },
};
</script>
<style lang="scss" scoped>
@import "joystick.scss";
</style>
