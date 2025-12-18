import { useEffect, useRef, useState } from 'react';
import './resolutionRatio.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowResolutionRatioModal, setIsShowResolutionRatioModalForSetting} from '../../../store/modules/modalStream';

export default function ResolutionRatio(props) {
  const dispatch = useDispatch();

  const { resolution,newResolutionsItem } = props;
  const larksr = useSelector(state => state.comm.larksr);
  const ui = useSelector(state => state.comm.ui);
  const mobileForceLandScape = useSelector(state => state.comm.mobileForceLandScape);
  const isShowResolutionRatioModal = useSelector(state => state.modalStream.isShowResolutionRatioModal);
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
  ])
  useEffect(() => {
    let found = false;
    for (let res of resolutions) {
      if (res.width === newResolutionsItem.width && res.height === newResolutionsItem.height) {
        found = true;
      }
    }
    if (!found) {
      let list = resolutions;
      list.push(newResolutionsItem);
      setResolutions(list);
    } 

  }, [newResolutionsItem]);

  const [screenOrientation, setScreenOrientation] = useState('portrait');
  const viewPort = useRef({ width: 1920, height: 1080 });
  useEffect(() => {
    viewPort.current = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait';
    setScreenOrientation(screenOrientation);
  }, [larksr]);

  const [resolutionStyle, setResolutionStyle] = useState({});
  useEffect(() => {
    let obj = {};
    if(screenOrientation==='landscape' || mobileForceLandScape) {
      obj = {
        'width': '34.31rem',
        'height': viewPort.current.height +'px',
        'right': isShowResolutionRatioModal || isShowResolutionRatioModalForSetting ? '0' : '-'+ '34.31rem'
      }
    } else {
      obj = {
        'width': '100%',
        'height': viewPort.current.height +'px',
        'right': isShowResolutionRatioModal || isShowResolutionRatioModalForSetting ? '0' : '-'+ '100%'
      }
    }
    setResolutionStyle(obj);
  }, [viewPort, screenOrientation, mobileForceLandScape, isShowResolutionRatioModal, isShowResolutionRatioModalForSetting]);


  const closeModal = () => {
    dispatch(setIsShowResolutionRatioModal(false));
    dispatch(setIsShowResolutionRatioModalForSetting(false));
  };
  const changeResolutionRatio = (val) => {
    props.sendResolution(val);
    closeModal();
  };
  
  useEffect(() => {
    if(larksr.params.useWebCodec) {
      let list = resolutions;
      list.push({ width: 7680, height: 4320, sublabel: '8K' });
      setResolutions(list);
    }
  }, []);

  return(
    <div className="mobile-modal-resolutionratio" style={resolutionStyle} >
      <div className="mobile-modal-resolutionratio-title">
        <i className="iconfont icon-arrow" onClick={closeModal}></i>
        {/* 分辨率 */}
        <span className="mobile-modal-resolutionratio-title-text">{ui.liveRes}</span>
      </div>
      <div className="resolution-ratio-content">
        <div className="resolution-ratio-box">
          {
            resolutions.map(item => {
              return <div key={item.width + ' x ' + item.height} style={{'touchAction': 'auto'}}>
                <div className={ `resolution-ratio-box-row${((resolution.width===item.width)&&(resolution.height===item.height))?' resolution-ratio-box-row-check': ''} `} 
                  onClick={() => changeResolutionRatio(item)}>
                  <div>
                    {
                      (resolution.width===item.width)&&(resolution.height===item.height)?<i className='iconfont icon-radio_choose'></i>:<i className='iconfont icon-radio'></i>
                    }
                    <span className="resolution-ratio-box-row-label">{item.sublabel || ''}</span>
                  </div>
                  <span className="resolution-ratio-box-row-label">{item.width + ' x ' + item.height}</span>
                </div>
              </div>
            })
          }
          
        </div>
      </div>
    </div>
  )
}