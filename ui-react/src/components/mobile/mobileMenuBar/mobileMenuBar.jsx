import { useDispatch, useSelector } from 'react-redux';
import './mobileMenuBar.scss';
import Unit from "@/utils/unit";
import Capabilities from '@/utils/capabilities';
import Log from "@/utils/log";
import JoyskickIndex from '../joystickIndex/joystickIndex';
import Help from '../modalHelp/modalHelp';
import Setting from '../modalSetting/modalSetting';
import Keyboard from '../keyboard/keyboard';
import States from '../modalStates/modalStates';
import Stream from '../modalStream/modalStream';
import VCursor from '../vCursor/vCursor';
import Camera from '../modalCamera/modalCamera';
import { useEffect, useRef, useState } from 'react';
import { setIsShowMobileHelp } from '../../../store/modules/modalHelp';
import { showModalConfirm } from '../../../store/modules/confirm';
import { setIsShowMobileStateModal } from '../../../store/modules/stateModal';
import { setIsShowMobileSettingModal } from '../../../store/modules/modalSetting';
import { setIsShowMobileStream } from '../../../store/modules/modalStream';
import { toastAct } from '../../../store/modules/toast';
import { setIsShowCameraModal } from '../../../store/modules/modalCamera';
import { toggleVMouseMode, toggleVKeyboard, setEnableChineseInput, toggleJoyStick } from '../../../store/modules/comm';

export default function MobileMenuBar() {
  const dispatch = useDispatch();

  const larksr = useSelector(state => state.comm.larksr);
  const ui = useSelector(state => state.comm.ui);
  const enableMobileControlBall = useSelector(state => state.comm.enableMobileControlBall);
  const showWebMenu = useSelector(state => state.comm.showWebMenu);
  const enableChineseInput = useSelector(state => state.comm.enableChineseInput);
  const joystick = useSelector(state => state.comm.joystick);
  const vkeyboard = useSelector(state => state.comm.vkeyboard);
  const mobileForceLandScape = useSelector(state => state.comm.mobileForceLandScape);

  const vmouseModeFlag = useSelector(state => state.comm.vmouseMode);
  const [vmouseMode, setVmouseMode] = useState(false);
  const [enableVmouse, setEnableVmouse] = useState(false);
  useEffect(() => {
    setVmouseMode(vmouseModeFlag == 'vmouse');
    setEnableVmouse(vmouseModeFlag != 'none');
  }, [vmouseModeFlag]);


  const [mouseButton, setMouseButton] = useState('none');
  const isIOS = Capabilities.os === 'iOS';
  const [showCamerabar, setShowCamerabar] = useState(false);
  const [showGameChild, setShowGameChild] = useState(false);
  const [menubarShrink, setMenubarShrink] = useState(true);
  const [selecteDevice, setSelecteDevice] = useState('');
  const [devices, setDevices] = useState([
    { label: 'Front', deviceId: 'user', facingMode: 'user', },
    { label: 'Back', deviceId: 'environment', facingMode: 'environment', }
  ]);
  const [facingMode, setFacingMode] = useState('none');
  const [selecteAudioDevice, setSelecteAudioDevice] = useState('');
  const [audioDevices, setAudioDevices] = useState([]);


  const isShowMobileHelp = useSelector(state => state.modalHelp.isShowMobileHelp);
  const isShowMobileStateModal = useSelector(state => state.stateModal.isShowMobileStateModal);
  const isShowMobileStream = useSelector(state => state.modalStream.isShowMobileStream);
  const isShowCameraModal = useSelector(state => state.modalCamera.isShowCameraModal);
  const isShowMobileSettingModal = useSelector(state => state.modalSetting.isShowMobileSettingModal);
  const mobileCamera = useSelector(state => state.modalCamera.mobileCamera);

  const [mobilebarStyle, setMobilebarStyle] = useState({});
  const viewPort = useRef({ width: 1920, height: 1080 });
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoTrack, setVideoTrack] = useState(null);
  const [videoDeviceId, setVideoDeviceId] = useState('');
  const [audioInput, setAudioInput] = useState(false);  
  const [isLiveStream, setIsLiveStream] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false); 
  const [audioTrack, setAudioTrack] = useState(null);
  const [videoInput, setVideoInput] = useState(false);
  useEffect(() => {
    viewPort.current = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait';
    setScreenOrientation(screenOrientation);
    setVideoPaused(larksr?.videoPaused);
    setVideoTrack(larksr?.videoTrack);
    setVideoDeviceId(larksr?.videoDeviceId);
    setAudioPaused(larksr?.audioPaused);
    setAudioTrack(larksr?.audioTrack);
    setIsLiveStream(larksr?.params.liveStreaming);
    setVideoInput(larksr?.params.videoInput);
    setAudioInput(larksr?.params.audioInput);
  }, [larksr]);
  const [right, setRight] = useState(0);
  useEffect(() => {
    if(isShowMobileHelp || isShowMobileStateModal || menubarShrink || isShowCameraModal || isShowMobileStream || isShowMobileSettingModal) {
      if(showCamerabar) setShowCamerabar(false)
      setRight('-6rem');
    } else {
      setRight(0);
    }
  }, [isShowMobileHelp, isShowMobileStateModal, menubarShrink, isShowCameraModal, isShowMobileStream, isShowMobileSettingModal]);

  const [mobilebarShrinkStyle, setMobilebarShrinkStyle] = useState({});
  useEffect(() => {
    let obj = {};
    if(menubarShrink) {
      obj= {
        'height': viewPort.current.height +'px',
        'right': '0'
      }
    } else {
      obj = {
        'height': viewPort.current.height +'px',
        'right': '-6rem'
      }
    }
    setMobilebarShrinkStyle(obj);
  }, [menubarShrink]);
  
  useEffect(() => {
    let obj = {};
    if(screenOrientation === 'landscape' || mobileForceLandScape) {
      obj = {
        'height': viewPort.current.height +'px',
        'right': right
      }
    } else {
      obj = {
        'height': 'auto',
        'top': '50%',
        'transform': 'translateY(-50%)',
        'right': right
      }
    }
    setMobilebarStyle(obj);
  }, [screenOrientation, mobileForceLandScape, viewPort, right])

  const [cameraBarStyle, setCameraBarStyle] = useState({});
  useEffect(() => {
    let obj= {};
    if(showCamerabar) {
      obj = {
        'left': 'calc(-8.5rem - 10px)'
      }
    } else {
      obj = {
        'left': '6rem'
      }
    }
    setCameraBarStyle(obj);
  }, [showCamerabar]);

  const [gameChildStyle, setGameChildStyle] = useState({});
  useEffect(() => {
    let obj= {};
    if(showGameChild) {
      obj = {
        'opacity': '1',
        'maxHeight': '50rem',
      }
    } else {
      obj = {
        'maxHeight': '0px',
        'opacity': '0',
        'zIndex': '-1',
        'position': 'relative'
      }
    }
    setGameChildStyle(obj);
  }, [showGameChild]);

  const [useFront, setUseFront] = useState(false);
  useEffect(() => {
    if (mobileCamera === 'user') {
      setUseFront(true);
    } else {
      setUseFront(false);
    };

    if(!videoPaused) {
      openVideo();
    }
  }, [mobileCamera]);

  // 方法
  const menubarShrinkFn = () => {
    setMenubarShrink(!menubarShrink);
    setShowCamerabar(false);
  };
  const onQuit = () => {
    // code 920 // 用户主动点击关闭按钮
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
  const showHelp = () => {
    dispatch(setIsShowMobileHelp(true));
  };
  const showStates = () => {
    dispatch(setIsShowMobileStateModal(true));
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
  const onFullScreen = () => {
    if (!larksr) { return; }
    const { fullScreen } = larksr;
    if (fullScreen.isFullScreen) {
        fullScreen.exitFullscreen();
    } else {
        fullScreen.launchFullScreen();
    }
  };
  const toogleCamerabar = () => {
    setShowCamerabar(!showCamerabar);
  };
  const showCameraModal = () => {
    setShowCamerabar(false);
    dispatch(setIsShowCameraModal(true));
  };
  const toggleVideo = () =>  {
    Log.info("toggleVideo", videoDeviceId);
    toogleCamerabar();
    if(!videoPaused) {
      larksr?.pauseVideoSending();
      // videoTrackEnable = !videoPaused;
    } else {
      openVideo();
    }
  };
  const openVideo = () => {
    const device = devices?.filter(device => device.deviceId === selecteDevice)[0];
    let width = 0;
    let height = 0;
    Log.info('openVideo with device ', selecteDevice, device, devices, width, height, useFront);

    larksr.openVideo(false, "", width, height, useFront)
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
  const openAudio = async() => {
    await larksr.getConnectedAudioinputDevices()
    .then((res) => {
        Log.info("audio devices", res);
        audioDevices.list = res;
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
          toastStore.toastAct( { text: ui.audioUseHttps, position: 1, level: 3 });
        } else {
          toastStore.toastAct( { text: JSON.stringify(e), position: 1, level: 3 });
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
  const streamFn = () => {
    dispatch(setIsShowMobileStream(true));
  };
  const gameIconClick = () => {
    setShowGameChild(!showGameChild);
  };
  const onSetMouseLeft = (e) => {
    e.preventDefault();
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
  const onSetMouseMid = (e) => {
    e.preventDefault();
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
  const onSetMouseRight = (e) => {
    e.preventDefault();
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
  const showSetting = () => {
    dispatch(setIsShowMobileSettingModal(true));
  };
  const changeTextInputFn = () => {
    dispatch(setEnableChineseInput(!enableChineseInput));
  };

  return(
    <div>
      {
        (enableMobileControlBall && showWebMenu) &&
        <div className="v-box" style={mobilebarStyle}>
        <div className="v-box" style={mobilebarStyle}>
        <div className="mobilebar" style={mobilebarStyle}>
          <div className="mobilebar-box">
            <div className="mobilebar-box-arrow">
              <i className="iconfont icon-arrow" onClick={menubarShrinkFn}></i>
            </div>
            {
              videoInput &&
              <div className="mobilebar-box-item service">
              <i className={videoPaused?'iconfont icon-camera':'iconfont icon-camera_1 check-color'} onClick={toogleCamerabar}></i>
              <div className="service-camera" style={cameraBarStyle}>
                <i className="iconfont icon-more" onClick={showCameraModal}></i>
                <i className={videoPaused?'iconfont icon-camera_1 check-color':'iconfont icon-camera'} onClick={toggleVideo}></i>
              </div>
            </div>
            }
            {
              audioInput &&
              <div  className="mobilebar-box-item service">
              <i className={audioPaused?'iconfont icon-mic':'iconfont icon-mic_1 check_color'} onClick={toggleMic}></i>
            </div>
            }
            {
              isLiveStream && 
              <div className="mobilebar-box-item service" onClick={streamFn}>
              <i className="iconfont icon-stream"></i>
            </div>
            }
            {
              (videoInput || audioInput || isLiveStream) && 
              <div className="menu-devider"></div>
            }
            
            <div className="mobilebar-box-item" onClick={changeTextInputFn}>
              <i className={enableChineseInput?'iconfont icon-shurufa':'iconfont icon-shurufa_off'}></i>
            </div>
            <div className="mobilebar-box-item mobilebar-box-game" style={{'marginTop': '1rem'}} onClick={gameIconClick}>
              <i className="iconfont icon-game" ></i>
              <i className="iconfont icon-arrow game-arrow" style={gameChildStyle}></i>
            </div>
            <div className="game-box" style={gameChildStyle}>
              <div className="game-box-item joystick-item" onClick={() => dispatch(toggleJoyStick())}>
                <i className="iconfont icon-joystick_1"></i>
                <i className={joystick? 'check-color iconfont icon-joystick_2':'iconfont icon-joystick_2'}></i>
              </div>
              <div className="game-box-item">
                <i className={!vmouseMode?'check-color iconfont icon-finger':'iconfont icon-finger'} onClick={touchFingerClick}></i>
              </div>
              <div className="game-box-item mouse-item" onClick={onSetMouseLeft}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <path d="M20 25C20 19.4772 24.4772 15 30 15V26C30 28.7614 27.7614 31 25 31H20V25Z" fill={(mouseButton == 'left' && vmouseMode)?'#00B031':'#DDDDDD'}/>
                  <rect x="20" y="15" width="20" height="30" rx="10" stroke="#DDDDDD" strokeWidth="3"/>
                  <rect x="27" y="21" width="6" height="8" rx="3" fill={(mouseButton == 'left' && vmouseMode)?'#DDDDDD':'#999999'}/>
                </svg>
              </div>
              <div className="game-box-item mouse-item" onClick={onSetMouseMid}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="20" y="15" width="20" height="30" rx="10" stroke="#DDDDDD" strokeWidth="3"/>
                  <rect x="27" y="21" width="6" height="8" rx="3" fill={(mouseButton == 'mid' && vmouseMode)?'#00B031':'#999999'}/>
                </svg>
              </div>
              <div className="game-box-item mouse-item" onClick={onSetMouseRight}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <path d="M40 25C40 19.4772 35.5228 15 30 15V26C30 28.7614 32.2386 31 35 31H40V25Z" fill={(mouseButton == 'right' && vmouseMode)?'#00B031':'#DDDDDD'}/>
                  <rect x="20" y="15" width="20" height="30" rx="10" stroke="#DDDDDD" strokeWidth="3"/>
                  <rect x="27" y="21" width="6" height="8" rx="3" fill={(mouseButton == 'right' && vmouseMode)?'#DDDDDD':'#999999'}/>
                </svg>
              </div>
              {
                showGameChild &&
                <div className="game-box-item" style={{'marginTop': 0}}>
                  <i className={vkeyboard?'check-color iconfont icon-keyboard':'iconfont icon-keyboard'} onClick={() => dispatch(toggleVKeyboard())}></i>
                </div>
              }
            </div>
            <div className="mobilebar-box-item">
              <i className="iconfont icon-menuBarIcon2" onClick={restartFn}></i>
            </div>
            {
              !isIOS &&
              <div className="mobilebar-box-item">
                {
                  !isFullScreen &&
                  <i className="iconfont icon-menuBarIcon3" onClick={onFullScreen}></i>
                }
                {
                  isFullScreen &&
                  <i className="iconfont icon-menuBarIcon3_click" onClick={onFullScreen}></i>
                }
                
              </div>
            }
            
            <div className="mobilebar-box-item">
              <i className="iconfont icon-menuBarIcon4" onClick={showStates}></i>
            </div>
            <div className="mobilebar-box-item" onClick={showSetting}>
              <i className="iconfont icon-menuBarIcon5"></i>
            </div>
            <div className="mobilebar-box-item" onClick={showHelp}>
              <i className="iconfont icon-menuBarIcon6"></i>
            </div>
            <div className="mobilebar-box-close" onClick={onQuit}>
              <i className="iconfont icon-close"></i>
            </div>
          </div>
        </div>
        </div>
        </div>
      }
      {/* shrink */}
      {
        (enableMobileControlBall && showWebMenu) &&
        <div className="mobilebar-shrink" style={mobilebarShrinkStyle}>
          <div className="mobilebar-shrink-arrow">
            <i className="iconfont icon-arrow" onClick={menubarShrinkFn}></i>
          </div>
        </div>
      }
      
      { joystick && <JoyskickIndex />}
      <Help></Help>
      <Setting></Setting>
      <States></States>
      <Stream></Stream>
      { vkeyboard &&  <Keyboard />}
      { <VCursor useVMouse={vmouseMode} mouseButton={mouseButton} exit={() => dispatch(toggleVMouseMode())} /> }
      <Camera></Camera>
    </div>
  )
}