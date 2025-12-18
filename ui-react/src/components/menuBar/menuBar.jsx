import { useEffect, useRef, useState } from 'react';
import './menuBar.scss'
import Log  from "@/utils/log";
import Unit from '@/utils/unit'
import { useSelector, useDispatch } from 'react-redux'
import { setMenubarPosition, setInputMethodEnable, setInputMethodStart, setControlBallInputMethod, setEnableChineseInput } from '../../store/modules/comm'
import { toggleState } from '../../store/modules/stateModal'
import { setCustomContentAlertTitle } from '../../store/modules/customContentAlert'
import { setIsShowHelpAlert } from '../../store/modules/modalHelp'
import { showModalConfirm } from '../../store/modules/confirm'
import { setIsShowStreamAlert } from '../../store/modules/modalStream'
import { setIsShowSettingAlert } from '../../store/modules/modalSetting'
import Tooltip from './components/tooltip'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Divider } from 'antd'
import MicInput from '../micInput/micInput'
import VideoInput from '../videoInput/videoInput';

export default function MenuBar() {
  const dispatch = useDispatch();
  const larksr = useSelector(state => state.comm.larksr);
  const menubarPosition = useSelector(state => state.comm.menubarPosition);

  const [showMenubar, setShowMenubar] = useState(false);
  const [isBarHover, setIsBarHover] = useState(false);
  const [offsetPositon, setOffsetPositon] = useState({ x: 0, y: 0, });
  const [position, setPosition] = useState({ x: 0, y: 0, });
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0, });
  const [subscribeAction, setSubscribeAction] = useState(null);
  const [dragStarted, setDragStarted] = useState(false);

  const [positionStyle, setPositionStyle] = useState({ x: 0, y: 0, });
  useEffect(() => {
    if (position.x != 0) {
      setPositionStyle({
        top: position.y + "px",
        left: position.x + "px",
      });
    } else {
        if(position.y > viewPort.height/2) {
          dispatch(setMenubarPosition('bottom'));
          setPositionStyle({
            bottom: '5px',
            top: 'auto',
            left: "50%",
            transform: 'translateX(-50%)',
        });
        }else {
          dispatch(setMenubarPosition('top'));
          setPositionStyle({
            bottom: 'auto',
            top: position.y + "px",
            left: "50%",
            transform: 'translateX(-50%)',
          });
        }
    }
  }, [position, menubarPosition])

  const [barHoverStyle, setBarHoverStyle] = useState(null);
  useEffect(() => {
    const scal = isBarHover? '1': '0.6';
    const bottom = isBarHover? '-17': '-17';
    const color = isBarHover? 'var(--webclient-menubar-btn-hover-bg)': 'var(--webclient-menubar-btn-bg)';
    if(menubarPosition === 'top') {
      setBarHoverStyle({
        'transform': 'translateX(-50%) scale('+scal+')',
        'bottom': bottom+'px',
        'transition': 'all .5s',
        'color': color,
    })
    } else {
      setBarHoverStyle({
        'transform': 'translateX(-50%) scale('+scal+')',
        'top': bottom+'px',
        'transition': 'all .5s',
        'color': color
      });
    }
  }, [isBarHover, menubarPosition])

  const [popContentRotatedClass, setPopContentRotatedClass] = useState('');
  const viewPort = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
  useEffect(()=>{
    let clazz = "pop-content";
    const { x, y } = position;
    if (x == 0 && y == 0) {
        // return clazz;
        setPopContentRotatedClass(clazz);
        return;
    }
    const { width, height } = viewPort;
    if (y < 55) {
        clazz += " rotate-down";
    } else if (x < 65) {
        clazz += " rotate-right";
    } else if (height - y < 120) {
        clazz += " rotate-up";
    }
    setPopContentRotatedClass(clazz);
    
  }, [position])

  const [isLiveStream, setIsLiveStream] = useState(false);
  const [audioInput, setAudioInput] = useState(false);
  const [videoInput, setVideoInput] = useState(false);
  useEffect(() => {
    setIsLiveStream(larksr?.params.liveStreaming);
    setAudioInput(larksr?.params.audioInput);
    setVideoInput(larksr?.params.videoInput);
  }, [larksr]);

  const toogleMenubar = () => {
    setShowMenubar(!showMenubar)
  };
  const barHoverFn = () => {
    setIsBarHover(true);
  };
  const barLeaveFn = () => {
    setIsBarHover(false);
  };

  const ui = useSelector(state => state.comm.ui);
  const networkStateFn = () => {
    dispatch(toggleState());
    dispatch(setCustomContentAlertTitle(ui.net))
  };

  const isShowHelpAlert = useSelector(state => state.modalHelp.isShowHelpAlert);
  const showHelpAlert = () => {
      if(!isShowHelpAlert) {
        dispatch(setIsShowHelpAlert(true));
        
        dispatch(setCustomContentAlertTitle(ui.help));
      } else {
        dispatch(setIsShowHelpAlert(false));
        dispatch(setCustomContentAlertTitle(''));
      }
  };
  const restartFn = () => {
    dispatch(showModalConfirm({
      title: ui.restart, 
      des: ui.restartTip, 
      onSubmit: () => {
        Log.info('restart Appli confirm');
        larksr?.restartCloudApp();
      },
      onCancel: () => {
        Log.info('restart Appli cancle');
      }
    }))
  };
  const liveStreamFn = () => {
    dispatch(setIsShowStreamAlert(true));
    // '推流设置'
    dispatch(setCustomContentAlertTitle(ui.liveSetup));
  };
  const showSettingAlertFn = () => {
    dispatch(setIsShowSettingAlert(true));
  };
  const onDragStart = (e) => {
      e.dataTransfer?.setDragImage(new Image(), 0, 0);// 去除重影
      Log.info("on drag start", e);
      const offsetViewPort = Unit.getOffsetViewport(e.target);
      setOffsetPositon({
        x: e.clientX - offsetViewPort.offsetX,
        y: e.clientY - offsetViewPort.offsetY
      })
      
      setDragStartPosition({
        x: e.clientX,
        y: e.clientY
      })
      
  };

  const onDragEnd = (e) => {
      Log.info("on drag end", e);
      if (dragStarted) {
        if(e.clientY > viewPort.height/2) {
          setPosition({
            x: 0,
            y: e.clientY
          })
        } else {
          setPosition({
            x: 0,
            y: 5
          })
        }
      }
      setDragStarted(false);
      setDragStartPosition({
        x: 0,
        y: 0
      });
  };
  const onDrag = (e) => {
      // Log.info("on drag move", e);
      e.preventDefault();
      e.stopPropagation();
      if (!dragStarted) {
          let disx = e.clientX - dragStartPosition.x;
          let disy = e.clientY - dragStartPosition.y;
          let distance = Math.sqrt(disx*disx + disy*disy);
          if (distance < 40) {
              return;
          }
          setDragStarted(true);
      }
      setPosition({
        x: e.clientX,
        y: e.clientY
      })
      
  };
  const resizePosition = () => {
      
      if (position.x != 0) {
          return {
              top: position.y + "px",
              left: position.x + "px",
          }
      } else {
          if(position.y > viewPort.height/2) {
          return {
              bottom: 0,
              top: 'auto',
              left: "50%",
              transform: 'translateX(-50%)',
          };
          }else {
          return {
              bottom: 'auto',
              top: position.y + "px",
              left: "50%",
              transform: 'translateX(-50%)',
          };
          }
      }
  };
  const onFullScreen = () => {
      if (!larksr) {
          return;
      }
      const { fullScreen } = larksr;
      if (fullScreen.isFullScreen) {
          fullScreen.exitFullscreen();
      } else {
          fullScreen.launchFullScreen();
      }
  };

  const inputMethodEnable = useSelector(state => state.comm.inputMethodEnable);
  const showInput = () => {
      if(inputMethodEnable === false) {
        dispatch(setInputMethodEnable( true));
        dispatch(setInputMethodStart( true));
        dispatch(setControlBallInputMethod( true));
      } else {
        dispatch(setInputMethodEnable( false));
        dispatch(setInputMethodStart( false));
        dispatch(setControlBallInputMethod( false));
      }
  };

  const enableChineseInput = useSelector(state => state.comm.enableChineseInput);
  const changeTextInputFn = () => {
      const val = enableChineseInput;
      dispatch(setEnableChineseInput(!val));
  };

  const controlBall = useRef(null);
  const controlBallClassName = {'menubar': true,'menubar-bg': showMenubar,};
  const isFullScreen = useSelector(state => state.comm.larksr.fullScreen.isFullScreen);
  return (
    <div
      ref={controlBall}
      className={Object.keys(controlBallClassName).filter(key => controlBallClassName[key]).join(' ')}
      style={positionStyle}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrag={onDrag}
      onDrop={onDragEnd}
  >
    {
      showMenubar && 
      // 菜单条
        <div className="menubar-box">
             {/* 左侧摄像头 麦克风 live等 */}
            <div className="menu-tools">
                <VideoInput />
                <MicInput />
                {
                  isLiveStream && 
                  <Tooltip 
                    className="menu-tools-box"
                    title={<div>{ ui.liveStream}</div>}
                    content={
                      <div className="menu-icon" onClick={liveStreamFn}>
                        <i className="iconfont icon-stream" style={{'fontSize': '28px','display': 'inline-block','marginTop': '1px'}}></i>
                      </div>
                    }
                  >
                  </Tooltip>
                }
                
            </div>
            { isLiveStream || videoInput || audioInput &&
              <Divider type="vertical" style={{height:'2rem'}}/>
            }
            {/* 右侧基础菜单 */}
            <div className="basemenu">
                <Tooltip
                  title={<div>{enableChineseInput? ui.chineseInput: ui.disableChineseInput}</div>}
                  content={
                    <div className="menu-icon" onClick={changeTextInputFn}>
                        <i className={enableChineseInput?'iconfont icon-shurufa':'iconfont icon-shurufa_off'}></i>
                    </div>
                  }
                >
                </Tooltip>
                <Tooltip
                  title={<div>{ ui.inputText }</div>}
                  content={
                    <div className="menu-icon" onClick={showInput}>
                        <i className="iconfont icon-menuBarIcon1"></i>
                    </div>
                  }
                >
                </Tooltip>
                <Tooltip
                  title={<div>{ ui.restart }</div>}
                  content={
                    <div className="menu-icon" onClick={restartFn}>
                        <i className="iconfont icon-menuBarIcon2"></i>
                    </div>
                  }
                >
                </Tooltip>
                {
                  isFullScreen && 
                  <Tooltip
                    title={<div>{ ui.fullScreenExit }</div>}
                    content={
                      <div className="menu-icon" onClick={onFullScreen}>
                          <i className="iconfont icon-menuBarIcon3_click fullScreen-hover"></i>
                      </div>
                    }
                  >
                  </Tooltip>
                }
                {
                  !isFullScreen && 
                  <Tooltip
                    title={<div>{ ui.fullScreen }</div>}
                    content={
                      <div className="menu-icon" onClick={onFullScreen}>
                          <i className="iconfont icon-menuBarIcon3"></i>
                      </div>
                    }
                  >
                  </Tooltip>
                }
                
                <Tooltip
                  title={<div>{ ui.network}</div>}
                  content={
                    <div className="menu-icon" onClick={networkStateFn}>
                        <i className="iconfont icon-menuBarIcon4"></i>
                    </div>
                  }
                >
                </Tooltip>
                <Tooltip
                  title={<div>{ ui.setting }</div>}
                  content={
                    <div className="menu-icon" onClick={showSettingAlertFn}>
                        <i className="iconfont icon-menuBarIcon5"></i>
                    </div>
                  }
                >
                </Tooltip>
                <Tooltip
                  title={<div>{ ui.help }</div>}
                  content={
                    <div className="menu-icon" onClick={showHelpAlert}>
                        <i className="iconfont icon-menuBarIcon6"></i>
                    </div>
                  }
                >
                </Tooltip>
            </div>
            
           
        </div>
        
    }
    {
      (showMenubar && menubarPosition==='top') &&
      (<div
        onMouseEnter={barHoverFn}
        onMouseLeave={barLeaveFn}
        className="menubar-bar-top menubar-bar"
        style={barHoverStyle}
        onClick={toogleMenubar}>
        <span className="iconfont icon-bar_1" style={{transform: 'rotate(180deg)'}}></span>
        {
          isBarHover && <UpOutlined />
        }
      </div>)
    }
    {
      (showMenubar && menubarPosition!=='top') &&
      <div
        onMouseEnter={barHoverFn}
        onMouseLeave={barLeaveFn}
        className="menubar-bar-bottom menubar-bar"
        style={barHoverStyle}
        onClick={toogleMenubar}>
        <span className="iconfont icon-bar_1"></span>
        {
          isBarHover && <DownOutlined />
        }
      </div>
    }
    {
      !showMenubar && 
      <div className="hide-arrow-box" onClick={toogleMenubar}>
        {
          menubarPosition==='top'
          ?<DownOutlined className="hide-arrow" />
          :<UpOutlined className="hide-arrow" />
        }
        
        
    </div>
    }
    </div>
  )
}