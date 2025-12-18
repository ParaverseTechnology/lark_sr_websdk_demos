import { useSelector, useDispatch } from "react-redux"
import Log from "@/utils/log";
import Capabilities from '@/utils/capabilities';
import Tooltip from '../menuBar/components/tooltip'
import { useEffect, useState } from "react";
import { toastAct } from '../../store/modules/toast'


export default function VideoInput() {
  const dispath = useDispatch();

  const [videoTrackEnableManu, setVideoTrackEnableManu] = useState(false);
  const [manuSetVideoTrackEnable, setManuSetVideoTrackEnable] = useState(false);
  const [setupPanel, setSetupPanel] = useState(false);
  const [selecteDevice, setSelecteDevice] = useState('');
  const [devices, setDevices] = useState({
      list: []
  })
  // environment, user
  const [facingMode, setFacingMode] = useState('none');

  const larksr = useSelector(state => state.comm.larksr);
  const ui = useSelector(state => state.comm.ui);
  

  const [audioInput, setAudioInput] = useState(false);
  const [videoInput, setVideoInput] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoDeviceId, setVideoDeviceId] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);
  useEffect(() => {
    setAudioInput(larksr?.params.audioInput);
    setVideoInput(larksr?.params.videoInput);
    setVideoPaused(larksr?.videoPaused);
    setVideoDeviceId(larksr?.videoDeviceId);
    setVideoTrack(larksr?.videoTrack)
  }, [larksr]);

  const [videoTrackEnable, setVideoTrackEnable] = useState(null);
  useEffect(() => {
    if (manuSetVideoTrackEnable) {
      setVideoTrackEnable(videoTrackEnableManu);
    } else {
      setVideoTrackEnable(!videoPaused);
    }
   
    // set(enable) {
    //     manuSetVideoTrackEnable = true;
    //     videoTrackEnableManu = enable;
    // },
  }, [manuSetVideoTrackEnable]);

  const [containerClass, setContainerClass] = useState('');
  const isMobile = useSelector(state => state.comm.isMobile);
  useEffect(() => {
    let classStr;
    if (audioInput) {
      classStr = isMobile ? 'video-input video-input-mobile video-input-withaudio' : 'video-input video-input-withaudio';
    } else {
      classStr =  isMobile ? 'video-input video-input-mobile' : 'video-input';
    }
    setContainerClass(classStr);
  })

  const [useFront, setUseFront] = useState('user');
  useEffect(() => {
    if (facingMode === 'none') {
      setUseFront(undefined);
      return;
    }
    setUseFront(facingMode === 'user');
  }, [facingMode]);


  // 方法
  const videoCheck = (row) => {
    setSelecteDevice(row.deviceId);
    if(!videoPaused) { // 视频开启状态
        if(larksr.videoDeviceId !== selecteDevice) {
            larksr?.closeVideo();
            openVideo();
        }
    }
  };

  // const onVideoTrackEnable = (e) => {
  //   Log.info('video track enable', e);
  // };
  const openVideo = () => {
    const device = devices.list?.filter(device => device.deviceId === selecteDevice)[0];

    // fix to 1920 1080
    // let width = 1920;
    // let height = 1080;

    // if (device && device.getCapabilities && typeof device.getCapabilities === 'function') {
    //     Log.info(device.getCapabilities());
    // }

    // if (device && device.getCapabilities && typeof device.getCapabilities === 'function' && device.getCapabilities().width && device.getCapabilities().width.max) {
    // //     width = device.getCapabilities().width.max;
    //     width = Math.min(device.getCapabilities().width.max, width);
    // }
    // if (device && device.getCapabilities && typeof device.getCapabilities === 'function' && device.getCapabilities().height && device.getCapabilities().height.max) {
    // //     height = device.getCapabilities().height.max;
    //     height = Math.min(device.getCapabilities().height.max, height);
    // }

    let width = 0;
    let height = 0;
    
    Log.info('openVideo with device ', selecteDevice, device, devices, width, height);

    larksr.openVideo(false, selecteDevice, width, height, useFront)
    .then((res) => {
        Log.info("open video success", res, videoTrack, selecteDevice);
        setVideoTrackEnable(!videoPaused);
    })
    .catch((e) => {
        Log.warn("open video failed.", e);
        if (window.location.href.indexOf("https") == -1) {
          dispath(toastAct( { text: ui.videoUseHttps, position: 1, level: 3 }));
        } else {
          dispath(toastAct( { text: JSON.stringify(e), position: 1, level: 3 }));
        }
    });
  };
  const toggleVideo = () => {
    Log.info("toggleVideo", videoDeviceId);
    if (setupPanel) setSetupPanel(false);
    if(!videoPaused) { // 视频开启状态
        larksr?.closeVideo();
        setVideoTrackEnable(!videoPaused);
    } else { // 视频关闭状态
        openVideo();
    }
  };
  const toggleSetupPanel = () => {
    setSetupPanel(!setupPanel);
    if (setupPanel && larksr) {
        if (Capabilities.isMobile) {
          setDevices({
            list: [{
                label: 'Front',
                deviceId: 'user',
                facingMode: 'user',
            }, {
                label: 'Back',
                deviceId: 'environment',
                facingMode: 'environment',
            }]
          })
          setFacingMode('user');
        } else {
            larksr.getConnectedVideoinputDevices()
            .then((res) => {
                Log.info("video devices", res);
                setDevices({
                  list: res
                })
                if (!selecteDevice) {
                  setSelecteDevice(res[0].deviceId);
                }
            })
            .catch((e) => {
                Log.warn("no video device found ", e);
            })
        }
    }
  };


  return (
    <div>
    {
      videoInput && 
      <div className={containerClass}>
        <Tooltip 
          className="menu-tools-box"
          title={<div>{ ui.camera }</div>}
          content={
            videoTrackEnable?
            <div className="menu-icon"  onClick={toggleVideo}>
                <i className="iconfont icon-camera_1 icon-click"></i>
            </div>
            :<div className="menu-icon"  onClick={toggleVideo}>
                <i className="iconfont icon-camera"></i>
            </div>
          }
        >
        </Tooltip>
        {
          setupPanel
          ?<el-icon onClick={toggleSetupPanel}><ArrowDown /></el-icon>
          :<el-icon onClick={toggleSetupPanel}><ArrowUp /></el-icon>
        }
        
        {
          setupPanel &&
          <div className={{'setup':true, 'top': commStore.menubarPosition==='top','bottom': commStore.menubarPosition==='bottom'}}>
            <p className="setup-title">{ ui.selectCamera }</p>
            {
              devices.list.length && 
              devices.list.map((device, key) => {
                return (
                  <div onClick={videoCheck(device)} className="setup-row" key={key}>
                      <span> { device.label }</span>
                      {
                        (selecteDevice === device.deviceId) && <el-icon><Check /></el-icon>
                      }
                  </div>
                )
              })
            }
            {
              !devices.list.length &&
              <div className="setup-row">
                    <span>{ ui.nothing }</span>
                </div>
            }
          </div>
        }
        
      </div>
    }
    </div>
    
  )
}