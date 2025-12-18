import { useDispatch, useSelector } from 'react-redux';
import './modalSetting.scss';
import { RightOutlined } from '@ant-design/icons';
import Log from '@/utils/log';
import Quality from '../components/codeRateAndFrameRate';
import ResolutionRatio from '../components/resolutionRatio';
import PvtSwitch from '../../switchPvt/switchPvt'
import Slider from '../../slider/slider';
import Capabilities from '@/utils/capabilities';
import { useEffect, useRef, useState } from 'react';
import { setIsShowMobileSettingModal, coderateChange, codeFpsChange, setResolution, setAerialViewCheck } from '../../../store/modules/modalSetting';
import { setIsShowResolutionRatioModalForSetting, setIsShowQualityModalForSetting} from '../../../store/modules/modalStream';
import { setCustomContentAlertTitle } from '../../../store/modules/customContentAlert';
import { setShowAerialView, setFlipMouseWheel } from '../../../store/modules/comm';
import { setShowPlayerList } from '../../../store/modules/playerMode';

export default function ModalSetting() {
  const dispatch = useDispatch();

  const ui = useSelector(state => state.comm.ui);
  const larksr = useSelector(state => state.comm.larksr);
  const mobileForceLandScape = useSelector(state => state.comm.mobileForceLandScape);
  const isShowMobileSettingModal = useSelector(state => state.modalSetting.isShowMobileSettingModal);
  const isIOS = Capabilities.os === 'iOS';
  const isShowQualityModalForSetting = useSelector(state => state.modalStream.isShowQualityModalForSetting);
  const isShowResolutionRatioModalForSetting = useSelector(state => state.modalStream.isShowResolutionRatioModalForSetting);

  const [resolutions, setResolutions] = useState([
    { width: 4096, height: 1080 },
    { width: 4096, height: 2160, sublabel: '4K' },
    { width: 3840, height: 2160 },
    { width: 3840, height: 1080 },
    { width: 2560, height: 1440 },
    { width: 2048, height: 1536, sublabel: '2K' },
    { width: 1920, height: 1080, sublabel: 'Default' },
    { width: 1920, height: 1440 },
    { width: 1600, height: 900 },
    { width: 1366, height: 768 },
    { width: 1280, height: 720, sublabel: 'HD' },
    { width: 1280, height: 600 },
    { width: 2180, height: 3840 },
    { width: 1080, height: 1920 },
    { width: 720, height: 1280 },
    { width: 1536, height: 2048 },
  ]);
  const [newResolutionsItem, setNewResolutionsItem] = useState(null);

  const viewPort = useRef({ width: 1920, height: 1080 });
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  const [isFlipMouseWheel, setIsFlipMouseWheel] = useState(false);
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  useEffect(() => {
    viewPort.current = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait';
    setScreenOrientation(screenOrientation);
    setIsFlipMouseWheel(larksr.mouseZoomDirection === 1? true : false);
    setIsInteractiveMode(larksr? larksr.isInteractiveMode : false);
  }, [larksr]);

  const [settingStyle, setSettingStyle] = useState({});
  useEffect(() => {
    let obj = {};
    if(screenOrientation==='landscape' || mobileForceLandScape) {
      obj = {
        'width': '34.31rem',
        'height': viewPort.current.height +'px',
        'right': isShowMobileSettingModal ? '0' : '-'+ '34.31rem'
      }
    } else {
      obj = {
        'width': '100%',
        'height': viewPort.current.height +'px',
        'right': isShowMobileSettingModal ? '0' : '-'+ '100%'
      }
    };
    setSettingStyle(obj);
  }, [screenOrientation, mobileForceLandScape, viewPort, isShowMobileSettingModal]);

  const checked = useSelector(state => state.modalSetting.aerialViewCheck);
  const cipboardParseChecked = useSelector(state => state.comm.syncClipboardParseEvent);
  const playerListChecked = useSelector(state => state.comm.playerMode.showPlayerList);
  const codeRate = useSelector(state => state.modalSetting.coderate);
  const frameRate = useSelector(state => state.modalSetting.fps);
  const resolution = useSelector(state => state.modalSetting.resolution);

  const closeModal = () => {
    dispatch(setIsShowMobileSettingModal(false));
  };
  const receiveCodeRate = (val) => {
    dispatch(coderateChange(val));
    larksr.setVideoBitrateKbps(val);
  };
  const receiveFrameRate = (val) => {
    dispatch(codeFpsChange(val));
    larksr.setVideoFps(val);
  };
  const qualityClick = (type) => {
    if(frameRate!==60)receiveFrameRate(60);
    switch(type) {
      case '0':
        receiveCodeRate(8000);
        break;
      case'1':
        receiveCodeRate(10000);
        break;
      case '2':
        receiveCodeRate(20000);
        break;
      case '3':
        receiveCodeRate(50000);
        break;
    }
  };
  const showResolutionRatioFn = () => {
    dispatch(setIsShowResolutionRatioModalForSetting(true));
  };
  const receiveResolution = (val) => {
    Log.info("onChangeResolution", val);
    dispatch(setResolution(JSON.parse(JSON.stringify(val))));
    larksr?.setCloudAppSize(val.width, val.height);
  };
  const showQualityModalFn = () => {
    dispatch(setIsShowQualityModalForSetting(true));
  };
  const aerialCheckedChange = (val) => {
    dispatch(setAerialViewCheck(val));
    if(val === false) {
      dispatch(setCustomContentAlertTitle(''));
      larksr.stopAerialview();
    } else {
      dispatch(setShowAerialView(true));
      dispatch(setCustomContentAlertTitle(ui.aerial));
      closeModal();
    }
  };
  
  const togglePlayerList = () => {
    dispatch(setShowPlayerList(!playerListChecked));
  };
  const onVolmueChange = (value) => {
    if (larksr) {
      larksr.videoElement.volume = value / 100;
      // TODO config audio
      larksr.audioElement.volume = value / 100;
    }
  };
  const resetResolution = () => {
    let found = false;
    for (let res of resolutions) {
      if (res.width === larksr.currentAppSize.width && res.height === larksr.currentAppSize.height) {
        found = true;
      }
    }
  
    if (!found) {
      setNewResolutionsItem({
        width: larksr.currentAppSize.width,
        height: larksr.currentAppSize.height,
      });
    }
    dispatch(setResolution({
      width: larksr.currentAppSize.width,
      height: larksr.currentAppSize.height,
    }));
  };
  const setFlipMouseWheelFn = (val) => {
    dispatch(setFlipMouseWheel(val));
  }

  useEffect(() => {
    if (larksr && larksr.currentAppSize) {
      larksr.on("appresize", () => {
        resetResolution();
      });
      resetResolution();
    }
    if(larksr.params.useWebCodec) {
      let listVal = JSON.parse(JSON.stringify(resolutions));
      listVal.unshift({ width: 7680, height: 4320, sublabel: '8K' });
      setResolutions(listVal);
    }
  }, []);
  return(
    <div>
      <div className="mobile-modal-setting" style={settingStyle}>
        <div className="mobile-modal-setting-title">
          <i className="iconfont icon-arrow" onClick={closeModal}></i>
          <span className="mobile-modal-setting-title-text">
            {ui.setting}
          </span>
        </div>
        <div className="setting-content">
          {/* <!-- 画质 --> */}
          <div>
            <div className="setting-content-row" style={{'marginbottom': '1.89rem'}}>
              <span>{ ui.quality }</span>
              <div onClick={showQualityModalFn}>
                <span className="setting-tag tag-code setting-tag-check">{frameRate}</span>
                <span className="setting-tag setting-tag-check">{codeRate}</span>
                <RightOutlined width="2rem"/>
              </div>
            </div>
            <div className="setting-content-row">
              <span onClick={() => qualityClick('0')} className={`quality-tag${(frameRate===60&&codeRate===8000)? ' quality-check-tag': ''}`}>{ ui.quality1 }</span>
              <span onClick={() => qualityClick('1')} className={`quality-tag${(frameRate===60&&codeRate===10000)? ' quality-check-tag': ''}`}>{ ui.quality2 }</span>
              <span onClick={() => qualityClick('2')} className={`quality-tag${(frameRate===60&&codeRate===20000)? ' quality-check-tag': ''}`}>{ ui.quality3 }</span>
              <span onClick={() => qualityClick('3')} className={`quality-tag${(frameRate===60&&codeRate===50000)? ' quality-check-tag': ''}`}>{ ui.quality4 }</span>
            </div>
          </div>
          <div className="customContentAlert-divider"></div>
          <div className="setting-content-row">
            <span>{ ui.aerial }</span>
            <PvtSwitch v-model="checked" change={aerialCheckedChange}/>
          </div>
          <div className="customContentAlert-divider"></div>
          <div className="setting-content-row">
            <span>{ ui.zoomOutGesture}</span>
            <div>
              <span onClick={() => setFlipMouseWheelFn(1)} className={`setting-tag${isFlipMouseWheel? ' setting-tag-check': ''}`}>上滚</span>
              <span onClick={() => setFlipMouseWheelFn(0)} className={`setting-tag${!isFlipMouseWheel? ' setting-tag-check': ''}`} style={{'marginLeft': '0.95rem'}}>下滚</span>
            </div>
          </div>
          <div className="customContentAlert-divider"></div>
          {/* <!-- 分辨率 --> */}
          <div className="setting-content-row">
            <span>{ui.liveRes}</span>
            <div onClick={showResolutionRatioFn}>
              <span className="setting-tag setting-tag-check tag-code">{resolution.sublabel?resolution.sublabel:(resolution.width + ' x' + resolution.height)}</span>
              <RightOutlined />
            </div>
          </div>
          <div className="customContentAlert-divider"></div>
          {
            isInteractiveMode && 
            <div>
              <div className="setting-content-row">
                <span>{ ui.showPlayerList }</span>
                <PvtSwitch v-model="playerListChecked" change={togglePlayerList} />
              </div>
              <div className="customContentAlert-divider"></div>
            </div>
          }
          {/* <!-- 音量 --> */}
          {
            !isIOS && 
            <div className="setting-content-volmue">
              <span className="iconfont">&#xe606;</span>
              <div>
                <Slider change={onVolmueChange} />
              </div>
            </div>
          }
          
        </div>
      </div>
      {
        isShowQualityModalForSetting &&
        <Quality  codeRate={codeRate} frameRate={frameRate} sendCodeRate={receiveCodeRate} sendFrameRate={receiveFrameRate}></Quality>
      }
      {
        isShowResolutionRatioModalForSetting && 
        <ResolutionRatio resolution={resolution} sendResolution={receiveResolution} newResolutionsItem={newResolutionsItem}></ResolutionRatio>
      }
    </div>
  )
}