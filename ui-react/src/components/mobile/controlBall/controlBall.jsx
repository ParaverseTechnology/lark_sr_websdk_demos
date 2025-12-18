import './controlBall.scss';
import Log from '@/utils/log';
import Unit from '@/utils/unit';
import Load from '@/load';
import Capabilities from '@/utils/capabilities';
import { useEffect, useRef, useState } from 'react';

import controlBarUrl from '@/assets/images/mobile/icon_logo_bg.png';
import JoyskickIndex from '../joystickIndex/joystickIndex';
import Help from '../modalHelp/modalHelp';
import Setting from '../modalSetting/modalSetting';
import Keyboard from '../keyboard/keyboard';
import States from '../modalStates/modalStates';
import Stream from '../modalStream/modalStream';
import VCursor from '../vCursor/vCursor';
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowMobileHelp } from '../../../store/modules/modalHelp';
import { showModalConfirm } from '../../../store/modules/confirm';
import { setIsShowMobileStateModal } from '../../../store/modules/stateModal';
import { setIsShowMobileSettingModal } from '../../../store/modules/modalSetting';
import { setIsShowMobileStream } from '../../../store/modules/modalStream';
import { toastAct } from '../../../store/modules/toast';
import { setMobileCamera } from '../../../store/modules/modalCamera';
import { toggleVMouseMode, toggleVKeyboard, setMobileControlBallPosition, setInputMethodEnable, setInputMethodStart, setEnableChineseInput, toggleJoyStick } from '../../../store/modules/comm';

export default function ControlBall() {
  const dispatch = useDispatch();

  const larksr = useSelector(state => state.comm.larksr);
  const ui = useSelector(state => state.comm.ui);
  const [viewPort, setViewPort] = useState({ width: 1920, height: 1080 });


  const aerialViewCheck = useSelector(state => state.modalSetting.aerialViewCheck);
  const mobileCamera = useSelector(state => state.modalCamera.mobileCamera);

  const isIOS = Capabilities.os === 'iOS';
  const [showTimeoutInfo, setShowTimeoutInfo] = useState(false);
  const [rttCheckTimeout, setRttCheckTimeout] = useState(-1);
  const [rttLimitTimeout, setRttLimitTimeout] = useState(-1);
  const [lastRttLimitToast, setLastRttLimitToast] = useState(0);
  const [dragStarted, setDragStarted] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState({
      x: 0,
      y: 0,
  });
  const [offsetPositon, setOffsetPositon] = useState({
      x: 0,
      y: 0,
  });
  // const [position, setPosition] = useState({
  //     x: 0,
  //     y: 0,
  // });
  const [isFix, setIsFix] = useState(false);//是否锁定
  const [isShrink, setIsShrink] = useState(true);//控制球是否收缩
  const timer = useRef(null);//控制球自动收缩定时器
  // const [shrinkPositionPre, setShrinkPositionPre] = useState(null);
  const [isShowControlPanel, setIsShowControlPanel] = useState(false);//是否展示控制面板
  const [selecteDevice, setSelecteDevice] = useState('');
  const [devices, setDevices] = useState([
    { label: 'Front', deviceId: 'user', facingMode: 'user', },
    { label: 'Back', deviceId: 'environment', facingMode: 'environment', }
  ]);
  const [selecteAudioDevice, setSelecteAudioDevice] = useState('');
  const [audioDevices, setAudioDevices] = useState([]);
  const [isShowCameralPanel, setIsShowCameralPanel] = useState(false); //选择摄像头面板
  const [isShowGamePanel, setIsShowGamePanel] = useState(false); //工具面板
  const [mouseButton, setMouseButton] = useState('none');
  const [isShowMousePanel, setIsShowMousePanel] = useState(false); // 鼠标面板

  const [states, setStates] = useState({});
  const aggregatedStats = useSelector(state => state.comm.aggregatedStats);
  useEffect(() => {
    let rttms = aggregatedStats.currentRoundTripTime * 1000;
    let rtt = rttms.toFixed(2);
    setStates({
      hasPacketsLost: aggregatedStats.packetsLost != 0,
      packetsLost: aggregatedStats.packetsLost.toFixed(2),
      packetsLostPerc: aggregatedStats.packetsLostPerc.toFixed(3) + "%",
      hasBitrate: aggregatedStats.bitrate != 0,
      bitrate: (aggregatedStats.bitrate / 1000).toFixed(2),
      hasCurrentRoundTripTime: aggregatedStats.currentRoundTripTime != 0,
      currentRoundTripTime: rtt,
      rttMs: rttms,
    })
  }, [aggregatedStats]);

  const [isLiveStream, setIsLiveStream] = useState(false);
  const [audioInput, setAudioInput] = useState(false);
  const [videoInput, setVideoInput] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoTrack, setVideoTrack] = useState(null);
  const [videoDeviceId, setVideoDeviceId] = useState('');
  const [audioPaused, setAudioPaused] = useState(false); 
  const [audioTrack, setAudioTrack] = useState(null);
  useEffect(() => {
    setIsLiveStream(larksr?.params.liveStreaming);
    setAudioInput(larksr?.params.audioInput);
    setVideoInput(larksr?.params.videoInput);
    setVideoPaused(larksr?.videoPaused);
    setVideoTrack(larksr?.videoTrack);
    setVideoDeviceId(larksr?.videoDeviceId);
    setAudioPaused(larksr?.audioPaused);
    setAudioTrack(larksr?.audioTrack);
    setViewPort(larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 });
  }, [larksr]);

  const [useFront, setUseFront] = useState('false');
  useEffect(() => {
    if (mobileCamera === 'user') {
      setUseFront(true);
    } else {
      setUseFront(false);
    }

    if(mobileCamera === 'none') {
      larksr?.pauseVideoSending();
    } else {
      openVideo();
    }
  }, [mobileCamera]);

  // 
  const [positionStyle, setPositionStyle] = useState({});
  const isShowMobileHelp = useSelector(state=> state.modalHelp.isShowMobileHelp);
  const isShowMobileStateModal = useSelector(state => state.stateModal.isShowMobileStateModal);
  const isShowMobileStream = useSelector(state => state.modalStream.isShowMobileStream);
  const isShowMobileSettingModal = useSelector(state => state.modalSetting.isShowMobileSettingModal);
  const mobileControlBallPosition = useSelector(state => state.comm.mobileControlBallPosition);
  useEffect(() => {
    if(isShowMobileHelp || isShowMobileStateModal || isShowMobileStream || isShowMobileSettingModal) {
      setPositionStyle({
        'top': mobileControlBallPosition.y + "px",
        'left': viewPort.width+ "px",
        'transform': 'scale(0)',
        'transition': dragStarted?'none':'all .3s'
      });
    } else {
      setPositionStyle({
        'top': mobileControlBallPosition.y + "px",
        'left': mobileControlBallPosition.x + "px",
        'transform': 'scale(1)',
        'transition': dragStarted?'none':'all .3s'
      });
    }
  }, [mobileControlBallPosition,isShowMobileHelp , isShowMobileStateModal, isShowMobileStream, isShowMobileSettingModal, dragStarted]);

  // 方法
  const closePopPanel = (e) => {
    e.stopPropagation();
    console.log('closePopPanel')
    setIsShowControlPanel(false);
    if(!isFix && !isShowControlPanel) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
      timer.current = setTimeout(() => {
        controlBallShrink()
        // 清除定时器
        clearTimeout(timer.current);
      },2000);
    }
  };
  const onFullScreen = () => {
    if (!larksr) { return; }
    const { fullScreen } = larksr;
    if (fullScreen.isFullScreen) {
        fullScreen.exitFullscreen();
    } else {
        fullScreen.launchFullScreen();
    }
  };
  const lockCBFn = () => {
    setIsFix(!isFix);
  };
  const showHelp = () => {
    dispatch(setIsShowMobileHelp(true));
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
    }));
  };
  const showStates = () => {
    dispatch(setIsShowMobileStateModal(true));
  };
  const showSetting = () => {
    dispatch(setIsShowMobileSettingModal(true));
  };
  const streamFn = () => {
    dispatch(setIsShowMobileStream(true));
  };
  const onQuit = () => {
    dispatch(showModalConfirm({
      title: ui.quit,
      des: ui.quitTip,
      code: 920,
      onSubmit: () => {
        Log.info('user confirm');
        Unit.quit();
      },
      onCancel: () => {
        Log.info('user cancle');
      }
    }));
  };
  const openAudio = async() => {
    await larksr.getConnectedAudioinputDevices()
    .then((res) => {
        Log.info("audio devices", res);
        setAudioDevices(res);
        if (!selecteDevice) {
          setSelecteDevice(res[0].deviceId);
        }
    })
    .catch((e) => {
        Log.warn("no audio device found ", e);
    })
    Log.info('openAudio with device ', selecteAudioDevice);
    larksr.openAudio(selecteAudioDevice)
    .then((res) => {
        Log.info("open audio success", res, audioTrack, selecteAudioDevice);
        // audioTrackEnable = !audioPaused;
    })
    .catch((e) => {
        Log.warn("open audio failed.", e);
        if (window.location.href.indexOf("https") == -1) {
          dispatch(toastAct( { text: ui.audioUseHttps, position: 1, level: 3 }));
        } else {
          dispatch(toastAct( { text: JSON.stringify(e), position: 1, level: 3 }));
        }
    });
  };
  const toggleMic = () => {
    Log.info("toggleMic", audioDeviceId);
    if (!audioPaused) {
      larksr?.pauseAudioSending();
      // audioTrackEnable = !audioPaused;
    } else {
      openAudio();
    }
  };
  const toogleCameraPanelFn = () => {
    setIsShowCameralPanel(!isShowCameralPanel);
  };
  const cameraClickFn = (type) => {
    if(mobileCamera === type) {
      dispatch(setMobileCamera('none'));
    } else {
      dispatch(setMobileCamera(type));
    }
  };
  const openVideo = () => {
    const device = devices?.filter(device => device.deviceId === selecteDevice)[0];
    let width = 0;
    let height = 0;
    Log.info('openVideo with device ', selecteDevice, device, devices, width, height, useFront);

    larksr.openVideo(false, selecteDevice, width, height, useFront)
    .then((res) => {
        Log.info("open video success", res, videoTrack, selecteDevice);
        // videoTrackEnable = !this.videoPaused;
    })
    .catch((e) => {
      Log.warn("open video failed.", e);
      if (window.location.href.indexOf("https") == -1) {
          dispatch(toastAct( { text: ui.videoUseHttps, position: 1, level: 3 }));
      } else {
          dispatch(toastAct( { text: JSON.stringify(e), position: 1, level: 3 }));
      }
    });
  };
  const toogleGamePanelFn = () => {
    setIsShowGamePanel(!isShowGamePanel);
  };

  const vmouseModeFlag = useSelector(state => state.comm.vmouseMode);
  const [vmouseMode, setVmouseMode] = useState(false);
  const [enableVmouse, setEnableVmouse] = useState(false);
  useEffect(() => {
    setVmouseMode(vmouseModeFlag == 'vmouse');
    setEnableVmouse(vmouseModeFlag != 'none');
  }, [vmouseModeFlag]);


  const touchFingerClick = () => {
    if (vmouseMode) {
      dispatch(toastAct( { text: ui.touchMode, position: 2 }));
      setMouseButton('none');
      dispatch(toggleVMouseMode());
    } else {
      dispatch(toggleVMouseMode());
      dispatch(toastAct( { text: ui.mouseLeft, position: 2 }));
      setMouseButton('left');
    }
  };
  const vKeyboardClick = () => {
    dispatch(toggleVKeyboard());
    setIsShowGamePanel(false);
    setIsShowControlPanel(false);
  };
  const toogleMousePanelFn = () => {
    setIsShowMousePanel(!isShowMousePanel);
  };
  const onSetMouseMid = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    if (mouseButton == 'mid') {
      setMouseButton('none');
      dispatch(toggleVMouseMode());
      dispatch(toastAct( { text: ui.touchMode, position: 2 }));
    } else {
      if(!vmouseMode) dispatch(toggleVMouseMode());
      dispatch(toastAct( { text: ui.mouseMid, position: 2 }));
      setMouseButton('mid');
    }
  };
  const onSetMouseLeft = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    if (mouseButton == 'left') {
      setMouseButton('none');
      dispatch(toggleVMouseMode());
      dispatch(toastAct( { text: ui.touchMode, position: 2 }));
    } else {
      if(!vmouseMode) dispatch(toggleVMouseMode());
      dispatch(toastAct( { text: ui.mouseLeft, position: 2 }));
      setMouseButton('left');
    }
  };
  const onSetMouseRight = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    if (mouseButton == 'right') {
      setMouseButton('none');
      dispatch(toggleVMouseMode());
      dispatch(toastAct( { text: ui.touchMode, position: 2 }));
    } else {
      if(!vmouseMode) dispatch(toggleVMouseMode());
      dispatch(toastAct( { text: ui.mouseRight, position: 2 }));
      setMouseButton('right');
    } 
  };
  // block default context menu event.
  const onContextmenu = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    Log.info("onContextmenu");
  };
  const onRttCheck = () => {
    if (states.rttMs > Load.rttLimit && rttLimitTimeout == -1 &&
      Date.now() - lastRttLimitToast > Load.rttLimitInterval * 1000) {
      // Log.info("on rtt check", states.rttMs, Load.rttLimit, rttLimitTimeout, this.rttCheckTimeout, Load.rttLimitInterval);
      setShowTimeoutInfo(true);
      let rttLimitTimeoutVal = window.setTimeout(() => {
        // Log.info("on rtt check timeout", states.rttMs, Load.rttLimit, rttLimitTimeout, this.rttCheckTimeout, Load.rttLimitInterval);
        setShowTimeoutInfo(false);
        setRttLimitTimeout(-1);
        setLastRttLimitToast(Date.now());
      }, 8 * 1000);
      setRttLimitTimeout(rttLimitTimeoutVal)
    }
  };
  const onDragStart = (e) => {
    e.stopPropagation();
    console.log('on drag start')
    if(isShrink) return;//收缩状态禁止拖拽
    if(timer.current) clearTimeout(timer.current);
    // // e.preventDefault();
      // 注意旋转屏幕时坐标系的变换
      const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait'
      if (screenOrientation == 'landscape') {
          const offsetRect = Unit.getBoundingClientRect(e.target);
          setOffsetPositon({
            x: e.changedTouches[0].clientY - offsetRect.top,
            y: offsetRect.right - e.changedTouches[0].clientX
          });
          

          Log.info("on drag start", offsetRect, e.changedTouches[0].clientX,
              offsetRect.right - e.changedTouches[0].clientX,
              e.changedTouches[0].clientY - offsetRect.top);
      } else {
          const offsetViewPort = Unit.getOffsetViewport(e.target);
          setOffsetPositon({
            x: e.changedTouches[0].clientX - offsetViewPort.offsetX,
            y: e.changedTouches[0].clientY - offsetViewPort.offsetY
          });
          
      }
      setDragStartPosition({
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      });
  };

  const mobilePixelUnit = useSelector(state => state.comm.mobilePixelUnit);
  const onDrag = (e) => {
    // console.log('on drag', isShrink , isShowControlPanel)
      // e.preventDefault();
      if(isShrink || isShowControlPanel) return;//收缩状态禁止拖拽
      
      if (!dragStarted) {
          let disx = e.changedTouches[0].clientX - dragStartPosition.x;
          let disy = e.changedTouches[0].clientY - dragStartPosition.y;
          let distance = Math.sqrt(disx*disx + disy*disy);
          if (distance < 40) {
              return;
          }else {
            if(!isShrink) setDragStarted(true);
          }
      }
      // 清除定时器
      if(timer.current) clearTimeout(timer.current);
      let x,y;
      let curPositionX,curPositionY;

      // 注意旋转屏幕时坐标系的变换
      const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait';
      if (screenOrientation == 'landscape') {
        const limitWidth = viewPort.height-Unit.getMobliePixelWidth(110, mobilePixelUnit);
        const limitHeight = viewPort.width-Unit.getMobliePixelWidth(110, mobilePixelUnit);
        curPositionX = e.changedTouches[0].clientY - offsetPositon.x;
        curPositionY = viewPort.height - e.changedTouches[0].clientX - offsetPositon.y;

        if(curPositionX > limitHeight){
          x = limitHeight;
        } else if(curPositionX <0) {
          x = 0;
        } else {
          x = curPositionX;
        }
        if(curPositionY > limitWidth) {
          y = limitWidth;
        } else if(curPositionY <0) {
          y = 0;
        } else {
          y = curPositionY;
        }
      } else {
        const limitWidth = viewPort.width-Unit.getMobliePixelWidth(110, mobilePixelUnit);
        const limitHeight = viewPort.height-Unit.getMobliePixelWidth(110, mobilePixelUnit);
          curPositionX = e.changedTouches[0].clientX - offsetPositon.x;
          curPositionY = e.changedTouches[0].clientY - offsetPositon.y;
          if(curPositionX > limitWidth){
            x = limitWidth;
          } else if(curPositionX <0) {
            x = 0;
          } else {
            x = curPositionX;
          }
          if(curPositionY > limitHeight) {
            y = limitHeight;
          } else if(curPositionY <0) {
            y = 0;
          } else {
            y = curPositionY;
          }
      }
      
      dispatch(setMobileControlBallPosition({
          x: x,
          y: y,
      }));
      // Log.info("on drag control ball", e);
  };
  const onDragEnd = (e) => {
    Log.info('on drag end')
      // // e.preventDefault();
      if (dragStarted) { // 拖拽
        if(isShrink) return;//收缩状态禁止拖拽
          setDragStarted(false);
          setDragStartPosition({
            x: 0,
            y: 0
          })
          if(!isFix && !isShowControlPanel) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
            timer.current = setTimeout(() => {
              controlBallShrink()
              // 清除定时器
              clearTimeout(timer.current);
            },2000)
          }
      } else { // 点击
        if(isShrink) {
          controlBallPopup();
        } else {
          // 展开面板
          if(!isShowControlPanel) {
            setIsShowControlPanel(true);
          } else {
            if(!isFix && !isShowControlPanel) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
              timer.current = setTimeout(() => {
                controlBallShrink()
                // 清除定时器
                clearTimeout(timer.current);
              },2000);
            }
          }
        }
        setDragStarted(false);
      }
  };
  // 收缩控制球
  const controlBallShrink = () => {
    const x = (mobileControlBallPosition.x > viewPort.width / 2)
              ?viewPort.width - 48/2
              :'-'+48/2;
    dispatch(setMobileControlBallPosition({
      x: x,
      y: positionStyle.y
    }));
    setIsShrink(true);
  };
  // 弹出控制球
  const controlBallPopup = () => {
    if(mobileControlBallPosition.x > 0) {
      dispatch(setMobileControlBallPosition({
        x: (viewPort.width - 48 * 2),
        y: mobileControlBallPosition.y
      }));
    } else {
      dispatch(setMobileControlBallPosition({
        x:  48*2,
        y: mobileControlBallPosition.y
      }));
    }
    setIsShrink(false);
    if(!isFix && !isShowControlPanel) {//未锁定状态&&控制面板关闭状态，2秒之后收缩控制球
      timer.current = setTimeout(() => {
        controlBallShrink()
        // 清除定时器
        clearTimeout(timer.current);
      },2000)
    }
  };
  const updateControl = async() => {
    if (!larksr) {
        return;
    }
    const res = await larksr?.getTouchCtrMapping();
    Log.info("updateControl ", res);
    if (res.mouseMode && res.mouseMode == 1) {
        dispatch(toggleVMouseMode());
    }
  };
  // const showInput = () => {
  //   dispatch(setInputMethodEnable( true));
  //   dispatch(setInputMethodStart( true));
  // };
  const enableChineseInput = useSelector(state => state.comm.enableChineseInput);
  const changeTextInputFn = () => {
    dispatch(setEnableChineseInput(!enableChineseInput));
  };

  useEffect(() => {
    if(aerialViewCheck) {
      setIsShowControlPanel(false);
    }
  }, [aerialViewCheck]);

  

  // 初始控制球位置
  useEffect(() => {
    const viewPort = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    const top = (viewPort.height - 48 * 2);
    const left = (viewPort.width - 48 / 2);
    dispatch(setMobileControlBallPosition({
        x: left,
        y: top,
    }));
    setRttCheckTimeout(window.setInterval(onRttCheck, 1000));
    updateControl();
    return() => {
      if (rttCheckTimeout != -1) {
        window.clearInterval(rttCheckTimeout);
      }
      if (rttLimitTimeout != -1) {
          window.clearInterval(rttLimitTimeout);
      }
      if(timer.current) clearTimeout(timer.current);
    }
  }, []);
  const enableMobileControlBall = useSelector(state => state.comm.enableMobileControlBall);
  const showWebMenu = useSelector(state => state.comm.showWebMenu);
  const vkeyboard = useSelector(state => state.comm.vkeyboard);
  const joystick = useSelector(state => state.comm.joystick);
  return(
    <div className="mobile-ui" onContextMenu={onContextmenu} >
      {
        (enableMobileControlBall && showWebMenu) && 
        <div className="pop pop-toggle"
          style={positionStyle}
          draggable={true}
          onTouchStart={onDragStart}
          onTouchMove={onDrag}
          onTouchEnd={onDragEnd}>
          <div className="pop-icon">
            {(controlBarUrl && !isShowControlPanel)? <div className="pop-icon-bg"  style={{'backgroundImage': `url(${controlBarUrl})`}}></div>:<i className="iconfont icon-cb"></i>}
            {showTimeoutInfo && <span className="rttInfo rttBad rttBadInfo">{ui.badNetwork}</span>}
            {
              isShowControlPanel && 
              <div className="pop-panel" style={{'position': 'absolute','bottom': 0,'right': 0}}>
                <div className="pop-panel-box">
                <div className="pop-panel-top pop-panel-top-part">
                  { videoInput && 
                    <div onClick={toogleCameraPanelFn}>
                      <i className={videoPaused?'iconfont icon-camera':'iconfont icon-camera_1 check-color'}></i>
                      <p>{ ui.camera }</p>
                    </div> }
                  {
                    audioInput &&
                    <div onClick={toggleMic}>
                      <i className={audioPaused?'iconfont icon-mic':'iconfont icon-mic_1 check_color'}></i>
                      <p>{ ui.mic }</p>
                    </div>
                  }
                  {
                    isLiveStream &&
                    <div onClick={streamFn}>
                      <i className="iconfont icon-stream"></i>
                      <p>{ ui.liveStream}</p>
                    </div>
                  }
                  </div>
                  {(videoInput || audioInput || isLiveStream) && <div className="customContentAlert-divider"></div>}
                  
                  <div className="pop-panel-bottom">
                    <div onClick={showStates}>
                      <i className="iconfont icon-menuBarIcon4"></i>
                      <p>{ ui.net}</p>
                    </div>
                    <div onClick={toogleGamePanelFn}>
                      <i className="iconfont icon-game"></i>
                      <p>{ ui.tools }</p>
                    </div>
                    <div onClick={showSetting}>
                      <i className="iconfont icon-menuBarIcon5"></i>
                      <p>{ ui.setting }</p>
                    </div>
                    <div onClick={restartFn}>
                      <i className="iconfont icon-menuBarIcon2"></i>
                      <p>{ ui.restart }</p>
                    </div>
                    {
                      !isIOS && 
                      <div  onClick={onFullScreen}>
                        { !isFullScreen && <i  className="iconfont icon-menuBarIcon3"></i> }
                        { isFullScreen && <i className="iconfont icon-menuBarIcon3_click"></i> }
                        <p>{!isFullScreen? ui.fullScreen :ui.fullScreenExit}</p>
                      </div>
                    }
                    
                    <div onClick={onQuit}>
                      <i className="iconfont icon-login"></i>
                      <p>{ ui.exit }</p>
                    </div>
                    <div onClick={showHelp}>
                      <i className="iconfont icon-menuBarIcon6"></i>
                      <p>{ ui.help }</p>
                    </div>
                    <div onClick={lockCBFn}>
                      { isFix ? <i className="iconfont icon-lock"></i> : <i className="iconfont icon-unlock"></i> }
                      <p>{!isFix ? ui.lock : ui.unlock}</p>
                    </div>
                    <div onClick={changeTextInputFn}>
                      <i className={enableChineseInput?'iconfont icon-shurufa':'iconfont icon-shurufa_off'}></i>
                      <p>{ui.chineseInput}</p>
                    </div>
                    <div onClick={closePopPanel}>
                      <i className="iconfont icon-guanbi"></i>
                      <p>{ ui.close }</p>
                    </div>
                  </div>
                </div>
              </div>
            }
            {/* // 摄像头 */}
            {
              isShowCameralPanel &&
              <div className="camera-panel">
                <div className="camera-panel-item">
                  <i onClick={() => cameraClickFn('user')} className={mobileCamera==='user'&&!videoPaused?'iconfont icon-video_f check_color':'iconfont icon-video_f'}></i>
                  <p>{ ui.cameraFront }</p>
                </div>
                <div className="camera-panel-item">
                  <i onClick={toogleCameraPanelFn} className="iconfont icon-back"></i>
                </div>
                <div onClick={() => cameraClickFn('environment')} className="camera-panel-item">
                  <i className={mobileCamera==='environment'&&!videoPaused?'iconfont icon-video_b check_color':'iconfont icon-video_b'}></i>
                  <p>{ ui.cameraBack }</p>
                </div>
              </div>
            }
              
              {/*  ui.tools  */}
              {
                isShowGamePanel && 
                <div className="game-panel">
                  <div className="game-panel-item">
                    <i className={!vmouseMode?'check-color iconfont icon-finger':'iconfont icon-finger'} onClick={touchFingerClick}></i>
                    <p>{ ui.touch }</p>
                  </div>
                  <div className="game-panel-item-row">
                    <div className="game-panel-item" onClick={toogleMousePanelFn}>
                    {
                      mouseButton == 'mid' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <rect x="20" y="15" width="20" height="30" rx="10" stroke={(vmouseMode)?'#00B031':'#DDD'} strokeWidth={3}/>
                        <rect x="27" y="21" width="6" height="8" rx="3" fill={(vmouseMode)?'#00B031':'#999999'} />
                      </svg>
                    }
                    {
                      mouseButton == 'left' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                          <path d="M20 25C20 19.4772 24.4772 15 30 15V26C30 28.7614 27.7614 31 25 31H20V25Z" fill={(vmouseMode)?'#00B031':'#DDDDDD'} />
                          <rect x="20" y="15" width="20" height="30" rx="10" stroke={(vmouseMode)?'#00B031':'#DDD'} strokeWidth={3}/>
                          <rect x="27" y="21" width="6" height="8" rx="3" fill={(vmouseMode)?'#DDDDDD':'#999999'} />
                        </svg>
                    }
                    {
                      mouseButton == 'right' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                          <path d="M40 25C40 19.4772 35.5228 15 30 15V26C30 28.7614 32.2386 31 35 31H40V25Z" fill={(vmouseMode)?'#00B031':'#DDDDDD'} />
                          <rect x="20" y="15" width="20" height="30" rx="10" stroke={(vmouseMode)?'#00B031':'#DDD'} strokeWidth={3}/>
                          <rect x="27" y="21" width="6" height="8" rx="3" fill={(vmouseMode)?'#DDDDDD':'#999999'} />
                        </svg>
                    }
                    {
                      ( mouseButton !== 'mid' && mouseButton !== 'left' && mouseButton !== 'right') && 
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                          <rect x="20" y="15" width="20" height="30" rx="10" stroke={(vmouseMode)?'#00B031':'#DDD'} strokeWidth={3}/>
                          <rect x="27" y="21" width="6" height="8" rx="3" fill={(vmouseMode)?'#00B031':'#999999'}/>
                        </svg>
                    }
                    <p>{ ui.mouse }</p>
                    </div>
                    <div className="game-panel-item">
                      <i onClick={toogleGamePanelFn} className="iconfont icon-back"></i>
                    </div>
                    <div className="game-panel-item">
                      <i className={vkeyboard?'check-color iconfont icon-keyboard':'iconfont icon-keyboard'} onClick={vKeyboardClick}></i>
                      <p>{ ui.keyboard }</p>
                    </div>
                  </div>
                  <div className="game-panel-item joystick-item" onClick={() => dispatch(toggleJoyStick())}>
                    <i className="iconfont icon-joystick_1">
                      <i className={joystick? 'check-color iconfont icon-joystick_2':'iconfont icon-joystick_2'}></i>
                    </i>
                    <p>{ ui.joystick }</p>
                  </div>
                </div>
              }
              
              {/* // 鼠标面板 */}
              {
                isShowMousePanel && 
                <div className="mouse-panel">
                  <div className="mouse-panel-item" onClick={onSetMouseMid}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <rect x="20" y="15" width="20" height="30" rx="10" stroke={(mouseButton == 'mid' && vmouseMode)?'#00B031':'#DDD'} strokeWidth={3}/>
                      <rect x="27" y="21" width="6" height="8" rx="3" fill={(mouseButton == 'mid' && vmouseMode)?'#00B031':'#999999'} />
                    </svg>
                    <p>{ ui.mouseMidKey }</p>
                  </div>
                  <div className="mouse-panel-item-row">
                    <div className="mouse-panel-item" onClick={onSetMouseLeft}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <path d="M20 25C20 19.4772 24.4772 15 30 15V26C30 28.7614 27.7614 31 25 31H20V25Z" fill={(mouseButton == 'left' && vmouseMode)?'#00B031':'#DDDDDD'} />
                        <rect x="20" y="15" width="20" height="30" rx="10" stroke={(mouseButton == 'left' && vmouseMode)?'#00B031':'#DDD'} strokeWidth={3}/>
                        <rect x="27" y="21" width="6" height="8" rx="3" fill={(mouseButton == 'left' && vmouseMode)?'#DDDDDD':'#999999'} />
                      </svg>
                      <p>{ ui.mouseLeftKey }</p>
                    </div>
                    <div className="mouse-panel-item">
                      <i onClick={toogleMousePanelFn} className="iconfont icon-back"></i>
                    </div>
                    <div className="mouse-panel-item" onClick={onSetMouseRight}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <path d="M40 25C40 19.4772 35.5228 15 30 15V26C30 28.7614 32.2386 31 35 31H40V25Z" fill={(mouseButton == 'right' && vmouseMode)?'#00B031':'#DDDDDD'} />
                        <rect x="20" y="15" width="20" height="30" rx="10" stroke={(mouseButton == 'right' && vmouseMode)?'#00B031':'#DDD'} strokeWidth={3}/>
                        <rect x="27" y="21" width="6" height="8" rx="3" fill={(mouseButton == 'right' && vmouseMode)?'#DDDDDD':'#999999'} />
                      </svg>
                      <p>{ ui.mouseRightKey }</p>
                    </div>
                  </div>
                </div>
              }
              
          </div>
        </div>
      }

      { joystick && <JoyskickIndex />}
      <Help></Help>
      <Setting></Setting>
      <States></States>
      <Stream></Stream>
      { vkeyboard &&  <Keyboard />}
      { enableVmouse  && <VCursor useVMouse={vmouseMode} mouseButton={mouseButton} exit={() => dispatch(toggleVMouseMode())} /> }
    </div>
  )
}