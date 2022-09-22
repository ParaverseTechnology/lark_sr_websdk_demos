import React from "react";
import { LarkSR } from "larksr_websdk";
import Joystick from './components/joystick/joystick'

export default class App extends React.Component {
  myRef;
  larksr;
  
  constructor(props) {
    super(props);
    this.state = {
      remoteReady: false,
    }
    this.myRef = React.createRef();
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
    larksr.initSDKAuthCode("28c2eb1d50e14105b005940dc80588d1")
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
  }
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
        { this.renderUi() }
      </div>
    );
  }
}