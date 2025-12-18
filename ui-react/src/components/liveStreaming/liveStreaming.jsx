import './liveStreaming.scss';
import Log from "@/utils/log";
import { LarkSRClientEvent } from "larksr_websdk";
import ContentAlert from '../customContentAlert/customContentAlert';
import { setIsShowStreamAlert, setRtmpstreamstate, setRtmpstreamForm  } from '../../store/modules/modalStream';
import { setCustomContentAlertTitle } from '../../store/modules/customContentAlert';
import { toastAct } from '../../store/modules/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import Btn from '../button/button';

export default function LiveStreaming() {
  const dispatch = useDispatch();

  const larksr = useSelector(state => state.comm.larksr);
  const ui = useSelector(state => state.comm.ui);
  const isMobile = useSelector(state => state.comm.isMobile);


  const [rtmpPath, setRtmpPath] = useState('');
  const [rtmpKey, setRtmpKey] = useState('');
  // showSetup: false,
  const [selectCoderate, setSelectCoderate] = useState(2500);
  const [selectFps, setSelectFps] = useState(30);
  const [selectRes, setSelectRes] = useState({
    width: 1280,
    height: 720,
  });
  const [status, setStatus] = useState({
      isError: false,
      text: '',
      code: ''
  })
  const [mobileScreenLandscapState, setMobileScreenLandscapState] = useState(false);

  // const [audioInput, setAudioInput] = useState(false);
  // const [videoInput, setVideoInput] = useState(false);
  // const [containerClass, setContainerClass] = useState('');
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  useEffect(() => {
    setAudioInput(larksr?.params.audioInput);
    setVideoInput(larksr?.params.videoInput);
    const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait';
    setScreenOrientation(screenOrientation);
  }, [larksr]);

  // useEffect(() => {
  //   if (audioInput && videoInput) {
  //     return isMobile ? setContainerClass('live live-mobile live-slot-3') : setContainerClass('live live-slot-3');
  //   } else if (audioInput || videoInput) {
  //       return isMobile ? setContainerClass('live live-mobile live-slot-2') : setContainerClass('live live-slot-2');
  //   } else {
  //       return isMobile ? setContainerClass('live live-mobile') : setContainerClass('live');
  //   }
  // }, [isMobile])


  const onCancel = () => {
    dispatch(setIsShowStreamAlert(false));
    dispatch(setCustomContentAlertTitle(''));
  };
  const onSubmit = () => {
      Log.info('on submit live streaming', rtmpKey, rtmpPath, selectFps, {...selectRes}, selectCoderate);
      if (!rtmpPath) {
        setStatus({
          isError: true,
          text: ui.liveStreamTip,
          code: ''
        })
        return;
      }

      larksr.StartCloudLiveStreaming({
          path: rtmpPath,
          key: rtmpKey,
          width: selectRes.width,
          height: selectRes.height,
          framerate: selectFps,
          bitrate: selectCoderate
      })
      .then((res) => {
        setStatus({
          isError: false,
          text: ui.liveStreamPrepare,
          code: res.state || ''
        })
        dispatch(setRtmpstreamForm({
          rtmpPath: rtmpPath,
          rtmpKey: rtmpKey,
          codeRate: selectCoderate,
          frameRate: selectFps,
          resolution: {...selectRes}
        }));
      })
      .catch((err) => {
        setStatus({
          isError: true,
          text: err,
          code: ''
        })
        dispatch(setRtmpstreamForm(null));
      });
  };
  const onCancelLive = () => {
      Log.info('on close live streaming');
      larksr.StopLiveStreaming();
      dispatch(setRtmpstreamstate(null));
      dispatch(setRtmpstreamForm(null));
  };
  const onInputFocus = () => {
      if (isMobile && screenOrientation == "landscape") {
          larksr?.screenState.setMobileForceLandScape(false);
          setMobileScreenLandscapState(true);
      }
      larksr?.op.setKeyboardEnable(false);
  };
  const onInputBlur = () => {
      if (mobileScreenLandscapState) {
          larksr?.screenState.setMobileForceLandScape(true);
          setMobileScreenLandscapState(false);
      }
      larksr?.op.setKeyboardEnable(true);
  };
  const onRtmpStreamState = (e) => {
      Log.info("onRtmpStreamState", e);
      dispatch(toastAct(e.data.desc));
      setStatus({
        isError: true,
        text: e.data.desc,
        code: e.data.state || ''
      })
      
      dispatch(setRtmpstreamstate(status));
  };
  const onRtmpStreamError = (e) => {
      Log.info("onRtmpStreamError", e);
      setStatus({
        isError: true,
        text: e.data.desc,
        code: ''
      })
      
      dispatch(setRtmpstreamstate(status));
  };

  const rtmpstreamstate = useSelector(state => state.modalStream.rtmpstreamstate);
  const rtmpstreamForm = useSelector(state => state.modalStream.rtmpstreamForm);
  useEffect(() => {
    Log.info('live larksr', larksr);
    larksr.on(LarkSRClientEvent.RTMP_STREAM_STATE, onRtmpStreamState);
    larksr.on(LarkSRClientEvent.RTMP_STREAM_ERROR, onRtmpStreamError);

    if (rtmpstreamstate!==null) {
        status.isError = rtmpstreamstate.isError||'';
        status.text = rtmpstreamstate.text||'';
        status.code = rtmpstreamstate.code||'';
    }
    if (rtmpstreamForm!==null) {
        setRtmpKey(rtmpstreamForm.rtmpKey);
        setRtmpPath(rtmpstreamForm.rtmpPath);
        setSelectCoderate(rtmpstreamForm.codeRate);
        setSelectFps(rtmpstreamForm.frameRate);
        setSelectRes({
          width: rtmpstreamForm.resolution.width,
          height: rtmpstreamForm.resolution.height
        });
    }

    return () => {
      Log.info("relase livestreaming icon");
    }
  }, [])
  return(
    <ContentAlert
      customContentStyle={{'width': larksr?.screenState.viewPort.width, 'height': larksr?.screenState.viewPort.height}}
      close={
        <div onClick={onCancel}>
          <CloseOutlined/>
        </div>
      }
      content={
        <div className="stream" >
          {/* @drag.stop @dragstart.stop @dragend.stop */}
          <div className="content" draggable={false}>
              <div className="stream-input">
                  <span>{ ui.liveUrl }</span>
                  <Input value={rtmpPath} placeholder={ui.liveUrl} onChange={e => setRtmpPath(e)} onFocus={onInputFocus} onBlur={onInputBlur}  onPressEnter={onInputBlur} />
              </div>
              <div className="stream-input">
                  <span>{ ui.liveKey }</span>
                  <Input value={rtmpKey} placeholder={ui.liveKey} onChange={e => setRtmpKey(e)} onFocus={onInputFocus} onBlur={onInputBlur}  onPressEnter={onInputBlur} />
              </div>
              <div className="stream-input">
                <span>{ ui.liveBitrate }</span>
                <Select 
                    value={selectCoderate}
                    placeholder={ui.liveBitrate}
                    onChange={e => setSelectCoderate(e)}
                    options={[
                      {value: 2500, label: 2500+' kbps'},
                      {value: 5000, label: 5000+' kbps'},
                      {value: 8000, label: 8000+' kbps'},
                      {value: 10000, label: 10000+' kbps'},
                    ]}
                  />
              </div>
              <div className="stream-input">
                <span>{ ui.liveFPS }</span>
                <Select 
                    value={selectFps}
                    onChange={e => setSelectFps(e)}
                    placeholder={ui.liveFPS}
                    options={[
                      {value: 30, label: 30+' FPS'},
                      {value: 60, label: 60+' FPS'},
                    ]}
                  />
              </div>
              <div className="stream-input">
                  <span>{ ui.liveRes }</span>
                  <Select 
                      value={selectRes}
                      placeholder={ui.liveRes}
                      onChange={e => { const val=e.split('-'); setSelectRes({width: val[0], height: val[1]})}}
                      options={[
                        {value: '1280-720', label: <span>1280 x 720</span>},
                        {value: '1920-1080', label: <span>1920 x 1080</span>},
                        {value: '720-1280', label: <span>720 x 1280</span>},
                        {value: '1080-1920', label: <span>1080 x 1920</span>},
                      ]}
                    />
              </div>
              <div className="customContentAlert-divider"></div>
              <div className="status" style={status.isError ? { color : '#F56C6C'} : {}}>
                  <p>{status.text}</p>
              </div>
              <div className="button-group">
                { status.code == 1 && <Btn className="submit" title={ui.close} submit={false} click={onCancelLive}/>}
                { status.code !== 1 && <Btn className="submit" title={ui.liveSubmit} submit={false} click={onSubmit}/>}
                  
              </div>
          </div>
      </div>
      }
    >
    </ContentAlert>
  )
}