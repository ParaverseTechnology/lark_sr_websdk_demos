import { useDispatch, useSelector } from 'react-redux';
import Log from '@/utils/log';
import './modalSetting.scss';
import { CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { setIsShowSettingAlert, setQualityMode, coderateChange, codeFpsChange, setResolution, setAerialViewCheck } from '../../store/modules/modalSetting';
import { toggleInitCursorMode, toggleSyncClipboardParseEvent, setShowAerialView, toggleScaleToFillStretch } from '../../store/modules/comm';
import { setShowPlayerList } from '../../store/modules/playerMode';
import { setCustomContentAlertTitle } from '../../store/modules/customContentAlert';
import PvtSwitch from '../switchPvt/switchPvt';
import Slider from '../slider/slider';
import { Select } from 'antd';

export default function ModalSetting() {
  const dispatch = useDispatch();
  
  const larksr = useSelector(state => state.comm.larksr);
  const ui = useSelector(state => state.comm.ui);
  // const [initCursorMode, setInitCursorMode] = useState(false);
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);

  const screenStateScalMode = useSelector(state => state.comm.larksr.screenState.scaleMode);
  const paramsScalMode = useSelector(state => state.comm.larksr.params.scaleMode);

  const syncClipboardParseEvent = useSelector(state => state.comm.syncClipboardParseEvent);
  const showPlayerList = useSelector(state => state.playerMode.showPlayerList);
  const resolution = useSelector(state => state.modalSetting.resolution);
  const aerialViewCheck = useSelector(state => state.modalSetting.aerialViewCheck);
  const selectFps = useSelector(state => state.modalSetting.fps);
  const selectCoderate = useSelector(state => state.modalSetting.coderate);
  const initCursorMode = useSelector(state => state.comm.larksr.initCursorMode)
  

  useEffect(() => {
    // setInitCursorMode(larksr ? larksr.initCursorMode : false);
    setIsInteractiveMode(larksr ? larksr.isInteractiveMode : false);
  }, [larksr]);

  const [activeTab, setActiveTab] = useState('0'); // 画面
  const tabClick = (type) => {
    setActiveTab(type);
  };
  const onCancel = () => {
    dispatch(setIsShowSettingAlert(false));
  };

  const onVolmueChange = (value) => {
    if (larksr) {
      larksr.videoElement.volume = value / 100;
      larksr.audioElement.volume = value / 100;
    }
  };
  
  const onChangeBitrate = (coderate) => {
    dispatch(coderateChange(coderate));
    larksr.setVideoBitrateKbps(coderate);
    Log.info('onChangeBitrate', coderate, selectCoderate);
  };
  const onChangeCodeFps = (fps) => {
    Log.info('onChangeCode1', fps);
    dispatch(codeFpsChange(fps));
    larksr.setVideoFps(fps);
  };
  const qualityClick = (type) => {
    dispatch(setQualityMode(type));
    switch(type) {
      case '0':
        onChangeBitrate(8000);
        onChangeCodeFps(60);
        break;
      case'1':
        onChangeBitrate(10000);
        onChangeCodeFps(60);
        break;
      case '2':
        onChangeBitrate(20000);
        onChangeCodeFps(60);
        break;
      case '3':
        onChangeBitrate(50000);
        onChangeCodeFps(60);
        break;
    }

  };

  
  const onChangeResolution = (val) => {
    Log.info("onChangeResolution", val);
    const valArr = val.split('-');
    dispatch(setResolution(val));
    larksr?.setCloudAppSize(valArr[0], valArr[1]);
  };
  const resetResolution = () => {
    let found = false;
    for (let res of resolutions) {
      const obj = res.value.split('-');
      if (obj[0] == larksr.currentAppSize.width && obj[1] == larksr.currentAppSize.height) {
        found = true;
      }
    }
    if (!found) {
      let val = JSON.parse(JSON.stringify(resolutions));
      val.push({
        value: larksr.currentAppSize.width+'-'+larksr.currentAppSize.height,
        label: larksr.currentAppSize.width+' x '+larksr.currentAppSize.height
      });
      setResolutions(val);
    }
    dispatch(setResolution(larksr.currentAppSize.width+'-'+larksr.currentAppSize.height));
  };
  
  const aerialCheckedChange = (val) => {
    dispatch(setAerialViewCheck(val));
    if(val === false) {
      dispatch(setCustomContentAlertTitle(''));
      larksr.stopAerialview();
    } else {
      onCancel();
      dispatch(setShowAerialView(true));
      dispatch(setCustomContentAlertTitle(ui.aerial));
    }
  };

  const coderates = [
    8000,
    10000,
    15000,
    20000,
    30000,
    50000,
    100000
  ];

  const scaleFn = () => {
    dispatch(toggleScaleToFillStretch());
  }
  const [resolutions, setResolutions] = useState([
    {value: '4096-1080', label: '4096 x 1080'},
    {value: '4096-160', label: '4096 x 2160'},
    {value: '3840-2160', label: '3840 x 2160'},
    {value: '3840-1080', label: '3840 x 1080'},
    {value: '2560-1440', label: '2560 x 1440'},
    {value: '2048-1536', label: '2048 x 1536'},
    {value: '1920-1080', label: '1920 x 1080'},
    {value: '1920-1440', label: '1920 x 1440'},
    {value: '1600-900', label: '1600 x 900'},
    {value: '1366-768', label: '1366 x 768'},
    {value: '1280-720', label: '1280 x 720'},
    {value: '1280-600', label: '1280 x 600'},
    {value: '2180-3840', label: '2180 x 3840'},
    {value: '1080-1920', label: '1080 x 1920'},
    {value: '720-1280', label: '720 x 1280'},
    {value: '1536-2048', label: '1536 x 2048'},
    // {value: { id: '40961080', width: 4096, height: 1080 }, label: '4096 x 1080'},
  ]);

  useEffect(() => {
    if (larksr && larksr.currentAppSize) {
      larksr.on("appresize", () => {
        resetResolution();
      });
      resetResolution();
    }
  }, [])
  return(
    <div className="customContentAlert" style={{width: larksr?.screenState.viewPort.width, height: larksr?.screenState.viewPort.height}}>
      <div className="customContentAlert-container">
          <div className="customContentAlert-title">
              <div className="customContentAlert-title-tab">
                  <p onClick={() => tabClick('0')} className={`customContentAlert-title-tab-left${activeTab==='0'? ' active':''}`}>{ui.setting}</p>
                  <p onClick={() => tabClick('1')} className={`customContentAlert-title-tab-right${activeTab==='1'?' active':''}`}>{ ui.viewTab }</p>
              </div>
              <div className="close" onClick={onCancel}>
                <CloseOutlined  style={{fontSize: '1.8rem'}}/>
              </div>
          </div>
          { activeTab==='0' &&
            <div className="customContentAlert-content">
              <div className="quality content-row setting-row">
                  <span>{ ui.mouse }</span>
                  <div className="quality-btn">
                    <p onClick={() => dispatch(toggleInitCursorMode())} className={`${!initCursorMode?'quality-btn-active':''}`}>{ui.mouseModeAuto}</p>
                    <p onClick={() => dispatch(toggleInitCursorMode())} className={`${initCursorMode?'quality-btn-active':''}`}>{ui.mosueModeLock}</p>
                  </div>
              </div>
                <div className="customContentAlert-divider"></div>
                <div className="quality content-row setting-row">
                  <span>{ui.cipboardParseOn}</span>
                  <div className="ratio-btn">
                    <div>
                      <PvtSwitch checked={syncClipboardParseEvent} change={() => dispatch(toggleSyncClipboardParseEvent())} />
                    </div>
                  </div>
                </div>
                <div className="customContentAlert-divider"></div>
                { isInteractiveMode && 
                  <div>
                    <div className="quality content-row setting-row">
                      <span>{ ui.showPlayerList }</span>
                      <div className="ratio-btn">
                        <div>
                          <PvtSwitch checked={showPlayerList} change={setShowPlayerList(!showPlayerList)}/>
                        </div>
                      </div>
                    </div>
                    <div className="customContentAlert-divider"></div>
                  </div>
                }
                <div className="quality content-row setting-row">
                  <span>{ ui.volume }</span>
                  <div className="quality-btn">
                    <i className="iconfont icon-mute" style={{marginRight: '10px',fontSize: '20px'}}></i>
                    <Slider change={onVolmueChange} />
                  </div>
                </div>
                <div className="customContentAlert-divider" style={{marginBottom: '0'}}></div>
            </div>
          }
          {activeTab==='1' &&
            <div className="customContentAlert-content">
                <div className="quality content-row">
                  <span>{ ui.quality }</span>
                  <div className="quality-btn">
                    <p onClick={() => qualityClick('0')} className={`${(selectFps===60&&selectCoderate===8000)?'quality-btn-active':''}`}> { ui.quality1 }</p>
                    <p onClick={() => qualityClick('1')} className={`${(selectFps===60&&selectCoderate===10000)?'quality-btn-active': ''}`}>{ ui.quality2 }</p>
                    <p onClick={() => qualityClick('2')} className={`${(selectFps===60&&selectCoderate===20000)?'quality-btn-active': ''}`}>{ ui.quality3 }</p>
                    <p onClick={() => qualityClick('3')} className={`${(selectFps===60&&selectCoderate===50000)?'quality-btn-active': ''}`}>{ ui.quality4 }</p>
                  </div>
                </div>
                <div className="customContentAlert-divider"></div>
                <div className="custom custom-code content-row">
                  <span>{ ui.custom }</span>
                  <div className="custom-content">
                    <span>{ ui.codeRate }</span>
                    <Select 
                      value={selectCoderate}
                      onChange={onChangeBitrate}
                      options={[
                        {value: 8000, label: 8000+' kbps'},
                        {value: 10000, label: 10000+' kbps'},
                        {value: 15000, label: 15000+' kbps'},
                        {value: 20000, label: 20000+' kbps'},
                        {value: 30000, label: 30000+' kbps'},
                        {value: 50000, label: 50000+' kbps'},
                        {value: 100000, label: 100000+' kbps'},
                      ]}
                    />
                  </div>
                </div>
                <div className="custom content-row">
                  <span></span>
                  <div className="custom-content">
                    <span>{ ui.frameRate }</span>
                    <Select 
                      value={selectFps}
                      onChange={onChangeCodeFps}
                      options={[
                        {value: 30, label: 30+' FPS'},
                        {value: 60, label: 60+' FPS'},
                      ]}
                    />
                  </div>
                </div>
                <div className="customContentAlert-divider"></div>
                <div className="quality content-row">
                  <span>{ ui.ratio }</span>
                  <div className="ratio-btn">
                    <p onClick={scaleFn} className={`${screenStateScalMode != paramsScalMode?'quality-btn-active':''}`}>{ ui.scale }</p>
                    <p onClick={scaleFn} className={`${!(screenStateScalMode != paramsScalMode)?'quality-btn-active':''}`}>{ui.scaleAuto}</p>
                  </div>
                </div>
                <div className="customContentAlert-divider"></div>
                <div className="custom content-row">
                  <span>{ui.resolutions}</span>
                  <div className="custom-content">
                  <Select 
                      value={resolution}
                      onChange={onChangeResolution}
                      options={resolutions}
                    />
                  </div>
                </div>
                {
                  (larksr.params.appliType===1 ||larksr.params.appliType===2) && 
                  <div>
                    <div className="customContentAlert-divider"></div>
                    <div className="quality content-row">
                      <span>{ ui.aerial }</span>
                      <div className="ratio-btn">
                        <div>
                          <PvtSwitch checked={aerialViewCheck} change={aerialCheckedChange}/>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                <div className="customContentAlert-divider" style={{marginBottom: 0}}></div>
            </div>
          }
      </div>
  </div>
  
  )
}