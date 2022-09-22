import React from "react";
import "./joystick.scss"
import JoyButton from "./joy_button/joy_button";
import Capabilities from '../../utils/capabilities';
import Unit from '../../utils/unit';

export default class Joystick extends React.Component {
    // props larksr

    // global setup
    // subType  1 wasd  2 updownleftright 3 joystick
    subType = 1;
    position = {
      left: 100,
      top: 200,
    };

    // components
    joystickButton = null;

    // lock mouse, left, right, mid, none
    lockMouse = "left";
    // left key: w a s d none
    leftKey = "none";
    // right key: MouseLeft MouseRight MouseUp MouseDown
    rightKey = "none";
    joystickElement = {
      root: null,
      width: 0,
      height: 0,
    };
    joystickVector = null;
    // subscribe action
    subscribeAction = null;
    //
    leftJoyStickKeys = [];
    joystickCenterUrl = "";

    // global state
    mobilePixelUnit = 1920 / 100;

    constructor() {
      super();
      this.state = {
        joysickTouchesPosition: {
          x: 0,
          y: 0,
        },
      }
      this.onResize = this.onResize.bind(this);
      console.log("joystick", this.props);
    }

    componentDidMount() {
      console.log("joystick mounted", this.props, this.joystickButton);

      const joystick = this.joystickButton;
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
        this.setState({
          joysickTouchesPosition: {
            x: this.joystickElement.width / 2,
            y: this.joystickElement.height / 2,
          }
        })
      }
      window.addEventListener('resize', () => { this.onResize(); });
      this.onResize();
    }

    onResize() {
      console.log("onResize", this.screenOrientation);

      // 浏览器窗口宽
      let screenW = this.screenOrientation === 'landscape' ? 
        Unit.viewport().height :
        Unit.viewport().width;
      let pixUnit = screenW / 100;

      if (Capabilities.isMobile) {
          // resize rem.
          document.documentElement.style.fontSize = pixUnit + 'px';
      } else {
          // document.documentElement.style.fontSize = screenW / 200 + 'px';
          document.documentElement.style.fontSize = '9px';
      }
      this.mobilePixelUnit = pixUnit;

      const joystickElement = this.joystickButton;
      console.log("joystick sub scribe action resize.");
      if (joystickElement && joystickElement.getRootElement()) {
        this.joystickElement = {
          root: joystickElement.getRootElement(),
          width: joystickElement.getRootElement().clientWidth,
          height: joystickElement.getRootElement().clientHeight,
        };
        this.setState({
          joysickTouchesPosition: {
            x: this.joystickElement.width / 2,
            y: this.joystickElement.height / 2,
          }
        })
      }
    }

    // joystick  methods
    // joysick button
    onJoyStickStart(key, e) {
      const { screenOrientation, leftJoystickPosition } = this;
      // console.log("onJoyStickStart", screenOrientation);
      let p = { x: 0, y: 0 };
      // 通过旋转横屏时注意触摸的坐标系变换
      if (screenOrientation === "landscape") {
        p.x = e.targetTouches[0].clientY - leftJoystickPosition.top;
        p.y = leftJoystickPosition.left - e.targetTouches[0].clientX;
      } else {
        p = Unit.singlePointRelativePosition(e.targetTouches[0], e.target);
      }
      // console.log("onJoyStickStart", screenOrientation, p, leftJoystickPosition, e.targetTouches[0]);
      if (p) {
        this.setState({
          joysickTouchesPosition: p
        });
        let vector = this.getLimitRelativeVector(p.x, p.y);
        this.setLimitTouchPosition(vector);
        this.vector = vector;
      }
    }

    onJoyStickMove(key, e) {
      const { screenOrientation, leftJoystickPosition } = this;
      let p = { x: 0, y: 0 };
      
      // console.log("onJoyStickMove", screenOrientation);

      // 通过旋转横屏时注意触摸的坐标系变换
      if (screenOrientation === "landscape") {
        p.x = e.targetTouches[0].clientY - leftJoystickPosition.top;
        p.y = leftJoystickPosition.left - e.targetTouches[0].clientX;
      } else {
        p = Unit.singlePointRelativePosition(e.targetTouches[0], e.target);
      }

      // console.log("onJoyStickMove", screenOrientation, p);

      if (p) {
        this.setState({
          joysickTouchesPosition: p
        });
        let vector = this.getLimitRelativeVector(p.x, p.y);
        this.setLimitTouchPosition(vector);
        this.vector = vector;
      }
    }

    onJoyStickEnd(eventKey, e) {
      if(this.subType && this.subType == 3) {
          this.larksr?.joystick(0, 0, 0, 0, 0);
      }
      this.setState({
        joysickTouchesPosition: {
          x: this.joystickElement.width / 2,
          y: this.joystickElement.height / 2,
        }
      });

      this.vector = null;
      // release all keys.
      for (let key of this.leftJoyStickKeys) {
        this.larksr?.keyUp(key);
      }
      this.leftJoyStickKeys = [];
    }

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
          ///Log.info("virtual joystick type", this.subType, this.state.joysickTouchesPosition);
          let relCenterPositionX = this.state.joysickTouchesPosition.x / RADIUS - 1;
          let relCenterPositionY = -(this.state.joysickTouchesPosition.y / RADIUS - 1);
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
      this.setState({
        joysickTouchesPosition: res
      })
    }

    // getters
    // from larksr state
    get larksr() { return this.props.larksr; }
    
    get screenOrientation() {
      return this.props.larksr ? this.props.larksr.screenState.screenOrientation : 'portrait';
    }
    get viewPort() {
        return this.props.larksr ? this.props.larksr.screenState.viewPort : { width: 1920, height: 1080 };
    }
    get viewPortStyle() {
        return this.props.larksr ? this.props.larksr.screenState.viewPortStyle : "";
    }
    // local getters
    get leftJoystickPosition() {
        const { screenOrientation, viewPort, position } = this;
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
    }
    getJoystickBgClass() {
      let base = "joystick left";
      // subType  1 wasd  2 updownleftright 3 joystick
      switch(this.subType) {
        case 1:
            return base + " bg-awsd";
        case 2:
            return base + " bg-stick";
        case 3:
            return base + " bg-default";
        default:
            return base + " bg-default";
      }
    }
    getJoysickCenterStyle() {
      return {
        left: this.state.joysickTouchesPosition.x,
        top: this.state.joysickTouchesPosition.y,
      };
    }

    // render
    render() {
        return ( 
          <div className="joy-container" style={this.position}>
            <JoyButton
              repeatTimeout={5}
              ref={(joystick) => { this.joystickButton = joystick; }}
              className={this.getJoystickBgClass()}
              onStart={(key, e) => { this.onJoyStickStart(key, e) }} 
              onEnd={(key, e) => { this.onJoyStickEnd(key, e) }}  
              onMove={(key, e) => { this.onJoyStickMove(key, e) }}  
              onLongPress={() => {}}  
              onRepeat={(key, e) => { this.onJoyStickRepeat(key) }} 
            >
              <div
                className="center"
                style={this.getJoysickCenterStyle()}
              ></div>
            </JoyButton>
          </div>
        );
      }
}