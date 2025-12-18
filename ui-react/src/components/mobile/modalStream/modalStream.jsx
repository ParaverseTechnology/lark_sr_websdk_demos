import { useDispatch, useSelector } from 'react-redux';
import './modalStream.scss';
import { RightOutlined } from '@ant-design/icons';
import { Flex, Input  } from 'antd';
import Btn from '../../button/button';
import Log from "@/utils/log";;
import { LarkSRClientEvent } from "larksr_websdk";
import Quality from '../components/codeRateAndFrameRate';
import ResolutionRatio from '../components/resolutionRatio';
import { useEffect, useRef, useState } from 'react';
import { setIsShowMobileStream, setIsShowQualityModal, setIsShowResolutionRatioModal, setRtmpstreamForm, setRtmpstreamstate } from '../../../store/modules/modalStream';
import { toastAct } from '../../../store/modules/toast';

export default function ModalStream() {
  const dispatch = useDispatch();

  const ui = useSelector(state => state.comm.ui);
  const larksr = useSelector(state => state.comm.larksr);
  const mobileForceLandScape = useSelector(state => state.comm.mobileForceLandScape);

  const [rtmpPath, setRtmpPath] = useState('');
  const [rtmpKey, setRtmpKey] = useState('');
  const [codeRate, setCodeRate] = useState(8000);
  const [frameRate, setFrameRate] = useState(30);
  const [resolution, setResolution] = useState({width: 1920,height: 1080, sublabel: 'Default'});
  const [status, setStatus] = useState({
      isError: false,
      text: '',
      code: ''
  });

  const viewPort = useRef({ width: 1920, height: 1080 });
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  useEffect(() => {
    viewPort.current = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait';
    setScreenOrientation(screenOrientation);
  }, [larksr]);


  const [streamStyle, setStreamStyle] = useState({});
  const isShowMobileStream = useSelector(state => state.modalStream.isShowMobileStream);
  useEffect(() => {
    let obj = {};
    if(screenOrientation==='landscape' || mobileForceLandScape) {
      obj = {
        'width': '34.31rem',
        'height': viewPort.current.height +'px',
        'right': isShowMobileStream ? '0' : '-'+ '34.31rem'
      }
    } else {
      obj = {
        'width': '100%',
        'height': viewPort.current.height +'px',
        'right': isShowMobileStream ? '0' : '-'+ '100%'
      }
    }
    setStreamStyle(obj)
  }, [viewPort,isShowMobileStream,screenOrientation,mobileForceLandScape]);


  const closeModal = () => {
    dispatch(setIsShowMobileStream(false));
  };
  const showQualityModalFn = () => {
    dispatch(setIsShowQualityModal(true));
  };
  const receiveCodeRate = (val) => {
    setCodeRate(val);
  };
  const receiveFrameRate = (val) => {
    console.log(val)
    setFrameRate(val);
  };
  const qualityClick = (type) => {
    setFrameRate(60);
    switch(type) {
      case '0':
        setCodeRate(8000);
        break;
      case'1':
        setCodeRate(10000);
        break;
      case '2':
        setCodeRate(20000);
        break;
      case '3':
        setCodeRate(50000);
        break;
    }
  };
  const showResolutionRatioFn = () => {
    dispatch(setIsShowResolutionRatioModal(true));
  };
  const receiveResolution = (val) => {
    setResolution(val);
  };
  const onSubmit = () => {
    Log.info('on submit live streaming', rtmpKey, rtmpPath, codeRate, frameRate, resolution);
    if (!rtmpPath) {
      setStatus({
        isError: true,
        text: ui.liveStreamTip,
        code: ''
      });
      return;
    }
  
    larksr.StartCloudLiveStreaming({
        path: rtmpPath,
        key: rtmpKey,
        width: resolution.width,
        height: resolution.height,
        framerate: codeRate,
        bitrate: frameRate
    })
    .then((res) => {
      setStatus({
        isError: false,
        text: '准备推流中',
        code: res.code || ''
      });
      dispatch(setRtmpstreamForm({
        rtmpPath: rtmpPath,
        rtmpKey: rtmpKey,
        codeRate: codeRate,
        frameRate: frameRate,
        resolution: resolution
      }));
    })
    .catch((err) => {
      setStatus({
        isError: true,
        text: err,
        code: ''
      });
      dispatch(setRtmpstreamForm(null));
    });
  };
  const onCancelLive = () => {
    Log.info('on close live streaming');
    larksr.StopLiveStreaming();
    dispatch(setRtmpstreamstate(null));
    dispatch(setRtmpstreamForm(null));
  };
  const onRtmpStreamState = (e) => {
    Log.info("onRtmpStreamState", e);
    dispatch(toastAct( e.data.desc));
    setStatus({
      isError: false,
      text: e.data.desc,
      code: e.data.state || ''
    });
    dispatch(setRtmpstreamstate({...status}));
  };
  const onRtmpStreamError = (e) => {
    Log.info("onRtmpStreamError", e);
    setStatus({
      isError: false,
      text: e.data.desc,
      code: e.data.state || ''
    });
    dispatch(setRtmpstreamstate({...status}));
  };

  const rtmpstreamstate = useSelector(state => state.modalStream.rtmpstreamstate);
  const rtmpstreamForm = useSelector(state => state.modalStream.rtmpstreamForm);
  useEffect(() => {
    Log.info('live larksr', larksr);
    larksr.on(LarkSRClientEvent.RTMP_STREAM_STATE, onRtmpStreamState);
    larksr.on(LarkSRClientEvent.RTMP_STREAM_ERROR, onRtmpStreamError);
    if (rtmpstreamstate!==null){
      setStatus(rtmpstreamstate);
    };
    if (rtmpstreamForm!==null) {
      setRtmpPath(rtmpstreamForm.rtmpPath);
      setRtmpKey(rtmpstreamForm.rtmpKey);
      setCodeRate(rtmpstreamForm.codeRate);
      setFrameRate(rtmpstreamForm.frameRate);
      setResolution(rtmpstreamForm.resolution);
    }
  }, []);

  const isShowQualityModal = useSelector(state => state.modalStream.isShowQualityModal);
  const isShowResolutionRatioModal = useSelector(state => state.modalStream.isShowResolutionRatioModal);
  return(
    <div>
      <div className="mobile-modal-stream" style={streamStyle} >
        <div className="mobile-modal-stream-title">
          <i className="iconfont icon-arrow" onClick={closeModal}></i>
          <span className="mobile-modal-stream-title-text">{ui.liveSetup}</span>
        </div>
        <div className="stream-content">
          <div className="stream-content-path">
            <Input value={rtmpPath} placeholder={ui.liveUrl} onChange={e => setRtmpPath(e)} id="rtmp-path" />
          </div>
          <div className="stream-content-path">
            <Input value={rtmpKey} placeholder={ui.liveKey} onChange={e => setRtmpKey(e)} id="rtmp-key" />
          </div>
          <div className="customContentAlert-divider"></div>
          <div>
            <div className="stream-content-row" style={{'marginBottom': '1.89rem'}}>
              <span>{ ui.quality }</span>
              <div onClick={showQualityModalFn}>
                <span className="stream-tag tag-code">{frameRate}</span>
                <span className="stream-tag">{codeRate}</span>
                <RightOutlined />
              </div>
            </div>
            <div className="stream-content-row">
              <span onClick={() => qualityClick('0')} className={`quality-tag${(frameRate===60&&codeRate===8000)?' quality-check-tag': ''}`}>{ ui.quality1 }</span>
              <span onClick={() => qualityClick('1')} className={`quality-tag${(frameRate===60&&codeRate===10000)?' quality-check-tag': ''}`}>{ ui.quality2 }</span>
              <span onClick={() => qualityClick('2')} className={`quality-tag${(frameRate===60&&codeRate===20000)?' quality-check-tag': ''}`}>{ ui.quality3 }</span>
              <span onClick={() => qualityClick('3')} className={`quality-tag${(frameRate===60&&codeRate===50000)?' quality-check-tag': ''}`}>{ ui.quality4 }</span>
            </div>
          </div>
          <div className="customContentAlert-divider"></div>
          <div className="stream-content-row">
            <span>{ui.liveRes}</span>
            <div onClick={showResolutionRatioFn}>
              <span className="stream-tag tag-code">{resolution.sublabel?resolution.sublabel:(resolution.width + ' x' + resolution.height)}</span>
              <RightOutlined />
            </div>
          </div>
          <div className="customContentAlert-divider"></div>
          <div className="status" style={status.isError ? { 'color' : '#F56C6C'} : {}}>
              <p>{status.text}</p>
          </div>
          <Flex align={'center'} justify={"space-between"} className="button-group">
            {
              status.code == 1 ?
              <Btn className="submit" title={ui.buttonClose} submit={false} click={onCancelLive} />
              :
              <Btn className="submit" title={ui.liveSubmit} submit={false} click={onSubmit} />
            }
          </Flex>
        </div>
      </div>
      {
        isShowQualityModal && 
        <Quality codeRate={codeRate} frameRate={frameRate} sendCodeRate={receiveCodeRate} sendFrameRate={receiveFrameRate}></Quality>
      }
      {
        isShowResolutionRatioModal && 
        <ResolutionRatio resolution={resolution} sendResolution={receiveResolution}></ResolutionRatio>
      }
    </div>
  )
}