import { useDispatch, useSelector } from 'react-redux';
import './codeRateAndFrameRate.scss';
import { useEffect, useRef, useState } from 'react';
import { setIsShowQualityModal, setIsShowQualityModalForSetting } from '../../../store/modules/modalStream';

export default function CodeRateAndFrameRate(props) {
  const dispatch = useDispatch();
  const {codeRate, frameRate} = props;

  const ui = useSelector(state => state.comm.ui);
  const larksr = useSelector(state => state.comm.larksr);
  const mobileForceLandScape = useSelector(state => state.comm.mobileForceLandScape);

  const frameRateList = [
    {label: 5000,sublabel: ""},
    {label: 8000,sublabel: ui.quality1},
    {label: 10000,sublabel: ui.quality2},
    {label: 15000,sublabel: ""},
    {label: 20000,sublabel: ui.quality3},
    {label: 30000,sublabel: ""},
    {label: 50000,sublabel: ui.quality4},
    {label: 100000,sublabel: ""},
  ];

  const [rateStyle, setRateStyle] = useState(null);
  const isShowQualityModal = useSelector(state => state.modalStream.isShowQualityModal);
  const isShowQualityModalForSetting = useSelector(state => state.modalStream.isShowQualityModalForSetting);
  
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  const viewPort = useRef({ width: 1920, height: 1080 });
  useEffect(() => {
    viewPort.current = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait';
    setScreenOrientation(screenOrientation);
  }, [larksr]);

  useEffect(() => {
    let obj = {};
    if(screenOrientation==='landscape' || mobileForceLandScape) {
      obj = {
        'width': '34.31rem',
        'height': viewPort.current.height +'px',
        'right': isShowQualityModal || isShowQualityModalForSetting ? '0' : '-'+ '34.31rem'
      }
    } else {
      obj = {
        'width': '100%',
        'height': viewPort.current.height +'px',
        'right': isShowQualityModal || isShowQualityModalForSetting ? '0' : '-'+ '100%'
      }
    }
    setRateStyle(obj);
  }, [viewPort, isShowQualityModal, isShowQualityModalForSetting, mobileForceLandScape]);


  
  const closeModal = () => {
    dispatch(setIsShowQualityModal(false));
    dispatch(setIsShowQualityModalForSetting(false));
  };
  const changeCodeRate = (val) => {
    props.sendCodeRate(val);
  };
  const changeFrameRate = (val) => {
    props.sendFrameRate(val);
  };
  return(
    <div className="mobile-modal-coderateandframerate" style={rateStyle}>
      <div className="mobile-modal-coderateandframerate-title">
        <i className="iconfont icon-arrow" onClick={closeModal}></i>
        <span className="mobile-modal-coderateandframerate-title-text">
          {ui.quality}
        </span>
      </div>
      <div className="rate-content">
        <p className="rate-content-title">
          { ui.frameRate }
        </p>
        <div className="code-box">
          <div className={`code-box-row${frameRate===30?' code-box-row-check': ''}`} onClick={() => changeFrameRate(30)}>
            { frameRate===30?<i className='iconfont icon-radio_choose'></i>:<i className='iconfont icon-radio'></i>}
            
            <span className="code-box-row-label">30</span>
          </div>
          <div className={`code-box-row${frameRate===60?' code-box-row-check':''}`} onClick={() => changeFrameRate(60)}>
            { frameRate===60?<i className='iconfont icon-radio_choose'></i>:<i className='iconfont icon-radio'></i>}
            <span className="code-box-row-label">60</span>
          </div>
        </div>
        <div className="customContentAlert-divider"></div>
        <p className="rate-content-title">
          { ui.codeRate }
        </p>
        <div className="frame-box">
          {
            frameRateList.map(item => {
              return <div key={item.label} style={{'touchAction': 'auto'}}>
              <div className={`frame-box-row${codeRate===item.label?' frame-box-row-check':''}`} onClick={() => changeCodeRate(item.label)}>
                <div>
                  {
                    codeRate===item.label?<i className='iconfont icon-radio_choose'></i>:<i className='iconfont icon-radio'></i>
                  }
                  <span className="frame-box-row-label">{item.sublabel}</span>
                </div>
                <span className="frame-box-row-label">{item.label}</span>
              </div>
            </div>
            })
          }
        </div>
      </div>
    </div>
  )
}