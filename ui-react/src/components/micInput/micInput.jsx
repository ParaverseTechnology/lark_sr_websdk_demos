import './micInput.scss';
import Log from "@/utils/log";
import Tooltip from '../menuBar/components/tooltip';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastAct } from '../../store/modules/toast';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export default function MicInput() {
  const dispatch = useDispatch();

  const larksr = useSelector(state => state.comm.larksr);
  const ui = useSelector(state => state.comm.ui);
  const isMobile = useSelector(state => state.comm.isMobile);
  const menubarPosition = useSelector(state => state.comm.menubarPosition);

  
  const [audioTrackEnableManu, setAudioTrackEnableManu] = useState(false);
  const [setupPanel, setSetupPanel] = useState(false);
  const [selecteDevice, setSelecteDevice] = useState('');
  const [devices, setDevices] = useState([]);

  const [containerClass, setContainerClass] = useState('');
  useEffect(() => {
    isMobile ? setContainerClass('mic-input mic-input-mobile') : setContainerClass('mic-input');
  }, [isMobile]);

  const [audioInput, setAudioInput] = useState(false);
  const [audioDeviceId, setAudioDeviceId]= useState('');
  const [audioTrack, setAudioTrack]= useState(null);
  const [audioPaused, setAudioPaused] = useState(false);
  useEffect(() => {
    setAudioInput(larksr?.params.audioInput);
    setAudioDeviceId(larksr?.audioDeviceId);
    setAudioTrack(larksr?.audioTrack);
    setAudioPaused(larksr?.audioPaused);
  }, [larksr])


  const [audioTrackEnable, setAudioTrackEnable] = useState(false);
  const [manuSetAudioTrackEnable, setManuSetAudioTrackEnable] = useState(false);
  useEffect(() => {
    if (manuSetAudioTrackEnable) {
      setAudioTrackEnable(audioTrackEnableManu);
    } else {
      setAudioTrackEnable(!audioPaused);
    }
  }, [manuSetAudioTrackEnable, audioTrackEnableManu, audioPaused]);



  const micCheck = (row) => {
    setSelecteDevice(row.deviceId);
    if(!audioPaused) { // 音频开启状态
        if(larksr.audioDeviceId !== selecteDevice) {
            larksr?.closeAudio();
            openAudio();
        }
    }
  };

  // const onAudioTrackEnable = (e) => {
  //     Log.info('audio track enable', e);
  // };
  const openAudio = () => {
      Log.info('openAudio with device ', selecteDevice);
      larksr.openAudio(selecteDevice)
      .then((res) => {
          Log.info("open audio success", res, audioTrack, selecteDevice);
          setAudioTrackEnable(!audioPaused);
      })
      .catch((e) => {
          Log.warn("open audio failed.", e);
          if (window.location.href.indexOf("https") == -1) {
            dispatch(toastAct({text: ui.audioUseHttps, position: 1, level: 3}));
          } else {
            dispatch(toastAct( { text: JSON.stringify(e), position: 1, level: 3 }));
          }
      });
  };
  const toggleMic = () => {
      Log.info("toggleMic", audioDeviceId);
      if (setupPanel) setSetupPanel(false);
      if(!audioPaused) { // 音频开启状态
          larksr?.closeAudio();
          setAudioTrackEnableManu(!audioPaused);
      } else { // 音频关闭状态
          openAudio();
      }
  };
  const toggleSetupPanel = () => {
    setSetupPanel(!setupPanel); 
    if (setupPanel && larksr) {
        larksr.getConnectedAudioinputDevices()
        .then((res) => {
            Log.info("audio devices", res);
            setDevices(res);
            if (!selecteDevice) {
              setSelecteDevice(res[0].deviceId);
            }
        })
        .catch((e) => {
            Log.warn("no audio device found ", e);
        })
    }
  };

  return(
    <div>
      { audioInput && 
        <div className={containerClass}>
          <Tooltip
            title={<span>{ui.mic}</span>}
            content={
              <div>
                {audioTrackEnable?
                  <div className="menu-icon"  onClick={toggleMic}>
                      <i className="iconfont icon-mic_1 icon-click"></i>
                  </div>
                  :
                  <div className="menu-icon"  onClick={toggleMic}>
                      <i className="iconfont icon-mic"></i>
                  </div>
                }
              </div>
            }
          >
          </Tooltip>
          { setupPanel? <DownOutlined  onClick={toggleSetupPanel}/> : <UpOutlined  onClick={toggleSetupPanel}/>}
          {
            setupPanel &&
            <div className={`setup${menubarPosition==='top'? ' top': (menubarPosition==='bottom'? ' bottom': '')}`}>
              <p className="setup-title">{ ui.selectMic }</p>
              {
                devices.length?
                devices.map(device => {
                  return <div onClick={() => micCheck(device)} className="setup-row" key={device.deviceId}>
                            <span> { device.label }</span>
                            {selecteDevice === device.deviceId && <i className="el-icon-check"></i>}
                          </div>
                })
                :
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