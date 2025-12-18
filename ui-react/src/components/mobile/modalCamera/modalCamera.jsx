import { useEffect, useRef, useState } from 'react';
import './modalCamera.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowCameraModal, setMobileCamera } from '../../../store/modules/modalCamera';

export default function ModalCamera() {
  const dispatch = useDispatch();
  
  const larksr = useSelector(state => state.comm.larksr);
  const ui = useSelector(state => state.comm.ui);
  const mobileForceLandScape = useSelector(state => state.comm.mobileForceLandScape);
  const isShowCameraModal = useSelector(state => state.modalCamera.isShowCameraModal);
  const mobileCamera = useSelector(state => state.modalCamera.mobileCamera);

  const viewPort = useRef({ width: 1920, height: 1080 });
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  useEffect(() => {
    viewPort.current = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait';
    setScreenOrientation(screenOrientation);
  }, [larksr]);


  const [videoStyle, setVideoStyle] = useState({});
  useEffect(() => {
    let obj = {};
    if(screenOrientation==='landscape' || mobileForceLandScape) {
      obj = {
        'width': '34.31rem',
        'height': viewPort.current.height +'px',
        'right': isShowCameraModal ? '0' : '-'+ '34.31rem'
      }
    } else {
      obj = {
        'width': '100%',
        'height': viewPort.current.height +'px',
        'right': isShowCameraModal ? '0' : '-'+ '100%'
      }
    }
    setVideoStyle(obj);
  }, [screenOrientation, viewPort, isShowCameraModal]);

  const closeModal = () => {
    dispatch(setIsShowCameraModal(false));
  };
  const toogleCamera = (type) => {
    dispatch(setMobileCamera(type));
  };
  return(
    <div className="mobile-modal-camera" style={videoStyle}>
      <div className="mobile-modal-camera-title">
        <i className="iconfont icon-arrow" onClick={closeModal}></i>
        <span className="mobile-modal-camera-title-text">
          {ui.selectCamera }
        </span>
      </div>
      <div className="camera-content">
        <div className="camera-content-row">
          <span>{ui.cameraFront }</span>
          {
            mobileCamera==='user' ?
            <span onClick={() => toogleCamera('environment')}  className="iconfont camera-content-row-icon">&#xe63c;</span>
            :
            <span onClick={() => toogleCamera('user')} className="iconfont camera-content-row-icon">&#xe650;</span>
          }
        </div>
        <div className="camera-content-row">
          <span>{ui.cameraBack }</span>
          {
            mobileCamera==='environment' ?
            <span onClick={() => toogleCamera('user')} className="iconfont camera-content-row-icon">&#xe63c;</span>
            :
            <span onClick={() => toogleCamera('environment')} className="iconfont camera-content-row-icon">&#xe650;</span>
          }
        </div>
      </div>
    </div>
  )
}