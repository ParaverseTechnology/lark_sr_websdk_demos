import { useEffect, useRef, useState } from 'react';
import './joystick.scss';
import PxyCommonUI from 'pxy_webcommonui';
import joyLeftBottom01 from '../../../assets/images/mobile/joy_left_bottom.png';
import joyLeftBottom02 from '../../../assets/images/mobile/joy_stick_bottom.png';
import awsdBottom from '../../../assets/images/mobile/AWSD.png';
import joyLeftTop from '../../../assets/images/mobile/joy_stick_top.png';
import { useSelector } from 'react-redux';

export default function Joystick(props) {

  const { subType } = props;
  const larksr = useSelector(state => state.comm.larksr);
  const joyContainerRef = useRef(null);

  const [joystickUrl, setJoystickUrl] = useState(joyLeftBottom01);
  useEffect(() => {
    if(subType===1) {
      setJoystickUrl(awsdBottom);
    } else if(subType===2) {
      setJoystickUrl(joyLeftBottom02);
    } else if(subType===3) {
      setJoystickUrl(joyLeftBottom01);
    } else {
      setJoystickUrl(joyLeftBottom01);
    }
  }, [subType]);

  const { Joystick } = PxyCommonUI;
  const joystick = useRef(null);
  const joystickRef = useRef(joystick);
  useEffect(() => {
    joystickRef.current = joystick;
  }, [joystick])

  useEffect(() => {
    joystick.current = new Joystick({
      // 必填项，挂载的根元素
      rootElement: joyContainerRef.current, 
  
      // 可选项，larksr 对象，由 larksr websdk 创建出来
      // 传入后自动发送对应的按键给云端。如果不传入，应手动处理事件，如 joystickstart joystickmove joystickend
      // npm https://www.npmjs.com/package/larksr_websdk
      // doc https://github.com/pingxingyun/lark_sr_websdk_demos
      // demos https://pingxingyun.github.io/webclient_sdk/
      larksr: larksr,
  
      //  可选项 subType  1 wasd  2 updownleftright 3 joystick 0 none
      // 发送给云端的按键类型
      // 类型 1 对应键盘 WASD 按键
      // 类型 2 对应键盘上下左右箭头
      // 类型 3 对应物理摇杆
      // 类型 0 不发送事件
      // 默认为 1
      subType: subType,
  
      // 可选项,摇杆的位置。
      // 注意，如果不传入应调整父组件的位置
      // position: {
      //     top: 150,
      //     left: 500,
      // },
  
      // 可选项，摇杆的大小
      // 注意，如果不传入，应设置父组件的大小。不传入时摇杆与父组件大小相同
      // size: {
      //     width: 150, 
      //     height: 150,
      // },
  
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
      // joystickBackgroundUrl: JoystickBottomImage,
  
      // 可选项，摇杆中间按钮的背景图片，最终设置为样式 background-image
      // centerBackgroundUrl: JoystickTopImage,
  
      // 可选项，触发事件的时间间隔
      // repeatTimeout: 33,
      });
  
      joystick.current.joystickBackgroundUrl = joystickUrl;
      joystick.current.centerBackgroundUrl = joyLeftTop;
      return () => {
        if (joystick.current) {
          joystick.current.destroy();
        }
      }
  }, [joystickUrl, joyLeftTop])
  return (
    <div ref={joyContainerRef} className="joy-container" style={props.style}></div>
  )
}