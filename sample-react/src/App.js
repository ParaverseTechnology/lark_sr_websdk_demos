import React from "react";
import { LarkSR } from "larksr_websdk";
import PxyWebCommonUI from 'pxy_webcommonui';
import JoystickBottomImage from './assets/img/mobile/joy_stick_bottom.png';
import JoystickTopImage from './assets/img/mobile/joy_stick_top.png';

const { 
  Joystick,
  Capabilities 
} = PxyWebCommonUI;

export default class App extends React.Component {
  myRef;
  larksr;
  // joystick container
  uiContainerRef;
  // : InstanceType<typeof Joystick>
  joystick;  
  
  constructor(props) {
    super(props);
    this.state = {
      remoteReady: false,
    }
    this.myRef = React.createRef();
    this.uiContainerRef = React.createRef();
  }
  componentDidMount() {

    const larksr = new LarkSR({
        rootElement: this.myRef.current,
        // 服务器地址,实际使用中填写您的服务器地址
        // 如：http://222.128.6.137:8181/
        // serverAddress: "http://222.128.6.137:8181/",
        serverAddress: "http://192.168.0.55:8181/",
        // 视频缩放模式，默认保留宽高比，不会拉伸并完整显示在容器中
        // scaleMode: "contain",
        // 0 -》 用户手动触发, 1 -》 首次点击进入触发, 2 -》 每次点击触发
        // fullScreenMode: 0,
        // mobileFullScreenMode: 1,
        // 测试载入背景图
        // loadingBgUrl: "https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg",
        // show log
        // logLevel: 'warn',
    });
    
    // 初始化您的授权ID
    // "SDK 授权码，联系 business@pingxingyun.com 获取,注意是 SDK 本身的授权码，不是服务器上的授权"
    larksr.initSDKAuthCode("SDK 授权码，联系 business@pingxingyun.com 获取,注意是 SDK 本身的授权码，不是服务器上的授权")
    .then(() => {
      // start connect;
      larksr.connect({
        // people beijig 879414254636105728
        appliId: "912998081102872576",
        // playerMode: 2,
        // userType: Unit.queryString("userType") as any,
        // taskId: Unit.queryString("taskid") as any,
        // nickname: "Test",
      })
      .then(() => {
        console.log('enter success');
      })
      .catch((e) => {
        console.error(e);
        alert(JSON.stringify(e));
      }); 
    })
    .catch((e) => {
      console.error(e);
      alert(JSON.stringify(e));
    });


    // 监听连接成功事件
    larksr.on('connect', (e) => { 
        console.log("LarkSRClientEvent CONNECT", e); 
    });                    
    larksr.on('gotremotesteam', (e) => { 
        console.log("LarkSRClientEvent gotremotesteam", e); 
    });                 
    larksr.on('meidaloaded', (e) => { 
        console.log("LarkSRClientEvent meidaloaded", e); 
        this.setState({
          remoteReady: true,
        });
    });                    
    larksr.on('mediaplaysuccess', (e) => { 
        console.log("LarkSRClientEvent mediaplaysuccess", e); 
        // Pxycommonui 组件 
        // @see https://github.com/pingxingyun/pxy_webcommonui
        // show joystick component when play success.
        if (this.joystick) {
          this.joystick.show();
        }
    });                    
    larksr.on('mediaplayfailed', (e) => { 
        console.log("LarkSRClientEvent mediaplayfailed", e); 
    });                    
    larksr.on('meidaplaymute', (e) => { 
        console.log("LarkSRClientEvent meidaplaymute", e); 
    });
    console.log("load appli success", larksr);
    larksr.on('error', (e) => {
        console.error("LarkSRClientEvent error", e); 
        alert(JSON.stringify(e.message));
    });                   
    larksr.on('info', (e) => {
        console.log("LarkSRClientEvent info", e); 
    });

    this.larksr = larksr;

    console.log('ref', this.myRef.current);

    if (Capabilities.isMobile) {
      // Pxycommonui 组件 
      // @see https://github.com/pingxingyun/pxy_webcommonui
      this.joystick = new Joystick({
        // 必填项，挂载的根元素
        rootElement: this.uiContainerRef.current, 

        // 可选项，larksr 对象，由 larksr websdk 创建出来
        // 传入后自动发送对应的按键给云端。如果不传入，应手动处理事件，如 joystickstart joystickmove joystickend
        // npm https://www.npmjs.com/package/larksr_websdk
        // doc https://github.com/pingxingyun/lark_sr_websdk_demos
        // demos https://pingxingyun.github.io/webclient_sdk/
        larksr: this.larksr,

        //  可选项 subType  1 wasd  2 updownleftright 3 joystick 0 none
        // 发送给云端的按键类型
        // 类型 1 对应键盘 WASD 按键
        // 类型 2 对应键盘上下左右箭头
        // 类型 3 对应物理摇杆
        // 类型 0 不发送事件
        // 默认为 1
        subType: 1,

        // 可选项,摇杆的位置。
        // 注意，如果不传入应调整父组件的位置
        position: {
          top: 150,
          left: 100,
        },

        // 可选项，摇杆的大小
        // 注意，如果不传入，应设置父组件的大小。不传入时摇杆与父组件大小相同
        size: {
          width: 150, 
          height: 150,
        },

        // 可选项，摇杆中间按钮的大小
        // 注意，如果不传入，默认中间的按钮为总摇杆的 25%
        centerSize: {
          width: 60,
          height: 60,
        },

        // 可选项，额外的摇杆样式，会附加到其他样式后面，可覆盖默认样式
        extralJoystickStyle: '',

        // 可选项，额外的摇杆中间按钮样式，会附加到其他样式后面，可覆盖默认样式
        extralCenterStyle: '',

        // 可选项，摇杆的背景图片。最终设置为样式 background-image
        joystickBackgroundUrl: JoystickBottomImage,

        // 可选项，摇杆中间按钮的背景图片，最终设置为样式 background-image
        centerBackgroundUrl: JoystickTopImage,

        // 可选项，触发事件的时间间隔
        repeatTimeout: 10,
      });
      this.joystick.hide();

      // this.joystick.on(KJoystickEvents.EVENTS_JOYSTICK_START, function(e) {
      //   console.log("joystickstart", e.detail);
      // });
      // this.joystick.on(KJoystickEvents.EVENTS_JOSYTICK_MOVE, function(e) {
      //   console.log("joystickmove", e.detail);
      // });
      // this.joystick.on(KJoystickEvents.EVENTS_JOYSTICK_END, function(e) {
      //   console.log("joystickend", e.detail);
      // });

      // destroy joystick
      // this.joystick.destroy();
    }
  }

  // 本地 UI 组件库
  renderUi() {
    if (this.state.remoteReady) {
      return (
        <div style = {{position: 'absolute', zIndex: 2000}}>
          <Joystick larksr={this.larksr}></Joystick>
        </div>
      )
    } else {
      return null;
    }
  }
  render() {
    return ( 
      <div ref = {this.myRef} style = {{position: 'relative'}} >
        {/* 
          Pxycommonui 组件 
          @see https://github.com/pingxingyun/pxy_webcommonui
        */}
          <div ref={this.uiContainerRef} style = {{
              position: 'absolute', 
              zIndex: 2000, 
              // left: 100, 
              // top: 150, 
              // backgroundColor: 'red', 
              // width: 100, 
              // height: 100, 
              // borderRadius: '50%' 
              // backgroundImage: `url(${JoystickBottomImage})`,
              // backgroundSize: 'cover',
            }}>
          </div>
      </div>
    );
  }
}