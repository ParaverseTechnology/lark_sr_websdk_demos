import './vCursor.scss';
import MouseButton from './mouseButton/mouseButton';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import cursorLeft from '../../../assets/img/mobile/cursor_left.png'
import cursorMid from '../../../assets/img/mobile/cursor_mid.png'
import cursorRight from '../../../assets/img/mobile/cursor_right.png'

export default function VCursor(props) {
  const larksr = useSelector(state => state.comm.larksr);

  const {useVMouse, mouseButton} = props;

  const [toggle, setToggle] = useState(true);
  const [vmousePosition, setVmousePosition] = useState({
      x: 0,
      y: 0,
  });
  const [vmouseRightEdge, setVmouseRightEdge] = useState(false);
  const [vmouseBottomEdge, setVmouseBottomEdge] = useState(false);
  const [vmouseLeftEdge, setVmouseLeftEdge] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState({
      x: 0,
      y: 0,
  });
  const [offsetPositon, setOffsetPositon] = useState({
      x: 0,
      y: 0,
  });
  const [position, setPosition] = useState({
      x: 0,
      y: 0,
  });

  const [vmouseStyle, setVmouseStyle] = useState({});

  useEffect(() => {
    let res = {
      'top': vmousePosition.y + 'px',
      'left': vmousePosition.x + 'px',
    };
    if (vmouseRightEdge) {
        res['transform']= "rotateY(180deg)";
        res['transformOrigin'] = "left top";
    }
    if (vmouseBottomEdge) {
        res['transform'] = "rotateZ(180deg)";
        res['transformOrigin'] = "left top";
    }
    if (vmouseLeftEdge && vmouseBottomEdge) {
        res['transform'] = "rotateZ(270deg)";
        res['transformOrigin'] = "left top";
    }
    setVmouseStyle(res);
  }, [vmousePosition, vmouseRightEdge, vmouseBottomEdge, vmouseLeftEdge]);

  const [screenOrientation, setScreenOrientation] = useState('portrait');
  const viewPort = useRef({ width: 1920, height: 1080 });
  const [operateScale, setOperateScale] = useState({
    scaleX: 1,
    scaleY: 1
  });
  const [container, setContainer] = useState({marginTop: 0, marginLeft: 0, width: 1920, height: 1080});
  const [appSize, setAppSize] = useState({ width: 1920, height: 1080});
  useEffect(() => {
    viewPort.current = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait';
    setScreenOrientation(screenOrientation);
    setOperateScale(larksr ? larksr.screenState.operateScale : {
      scaleX: 1,
      scaleY: 1
    });
    setContainer(larksr ? larksr.screenState.container : {
      marginTop: 0, marginLeft: 0, width: 1920, height: 1080
    });
    setAppSize(larksr ? larksr.screenState.appSize : {
      width: 1920, height: 1080 
    })
  }, [larksr]);

  // 方法
  // vmouse motion.
  const onTouchStart = () => {
      const p = vmousePosition;
      onVirtualMouseDown(mouseButton, p.x, p.y);
  };
  const onTouchEnd = () => {
      const p = vmousePosition;
      onVirtualMouseUp(mouseButton, p.x, p.y);
  };
  const onDrag = (e) => {
      let p;
      let r;
      if (screenOrientation == 'landscape') {
          p = {
              x: vmousePosition.x + e.y,
              y: vmousePosition.y - e.x,
          }
          r = {
              x: e.y,
              y: e.x,
          }
      } else {
          p = {
              x: vmousePosition.x + e.x,
              y: vmousePosition.y + e.y,
          };
          r = {
              x: e.x,
              y: e.y,
          }
      }
      if (p.x < 0) p.x = 0;
      setVmouseLeftEdge(p.x <= 30);
      if (p.x >= viewPort.current.width) {
          p.x = viewPort.current.width;
      }
      setVmouseRightEdge(p.x >= viewPort.current.width - 30);
      if (p.y < 0) p.y = 0;
      if (p.y >= viewPort.current.height) {
          p.y = viewPort.current.height;
      }
      setVmouseBottomEdge(p.y >= viewPort.current.height - 30);

      setVmousePosition(p);

      // Log.info("onDrag", p, screenOrientation);

      onVirtualMouseMove(p.x, p.y, r.x, r.y);
  };
  // 网页坐标转换为云端应用坐标
  const getVMouseTouchPosition = (localX, localY, localRX, localRY) => {
      
      const scale = operateScale;
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
  };

  const onVirtualMouseMove = (localX, localY, localRX, localRY) => {
      const p = getVMouseTouchPosition(localX, localY, localRX, localRY);
      if (!p) return;
      larksr?.moseMove(p.x, p.y, p.rx, p.ry);
  };

  const onVirtualMouseDown = (button, localX, localY) => {
      const p = getVMouseTouchPosition(localX, localY, 0, 0);
      if (!p) return;
      switch (button) {
          case 'left':
              larksr?.mouseDown(p.x, p.y, 0);
              break;
          case 'right':
              larksr?.mouseDown(p.x, p.y, 1);
              break;
          case 'mid':
              larksr?.mouseDown(p.x, p.y, 2);
              break;
      }
  };

  const onVirtualMouseUp = (button, localX, localY) => {
      const p = getVMouseTouchPosition(localX, localY, 0, 0);
      if (!p) return;
      switch (button) {
          case 'left':
              larksr?.mouseUp(p.x, p.y, 0);
              break;
          case 'right':
              larksr?.mouseUp(p.x, p.y, 1);
              break;
          case 'mid':
              larksr?.mouseUp(p.x, p.y, 2);
              break;
      }
  };
  // const showInput = () => {
  //     commStore.setInputMethodEnable( true);
  //     commStore.setInputMethodStart( true);
  // };
  return(
    <div className="">
      {
        useVMouse && 
        <div style={{width: larksr?.screenState.viewPort.width, height: larksr?.screenState.viewPort.height}}>
          <MouseButton style={vmouseStyle} touchstart={onTouchStart} touchend={onTouchEnd} drag={onDrag}
            content={
              <div>
                { mouseButton == 'left' &&  <img src={cursorLeft} alt="" />}
                { mouseButton == 'right' &&  <img src={cursorRight} alt="" />}
                { mouseButton == 'mid' &&  <img src={cursorMid} alt="" />}
                { (mouseButton !== 'mid'&&mouseButton !== 'right'&&mouseButton !== 'left') &&
                  <img src={cursorLeft} alt="" />
                }
              </div>
            }
          >
            
          </MouseButton>
          <MouseButton classNameStr=" touchbackground" touchstart={onTouchStart} touchend={onTouchEnd} drag={onDrag}></MouseButton>
        </div>
      }
    </div>
  )
}