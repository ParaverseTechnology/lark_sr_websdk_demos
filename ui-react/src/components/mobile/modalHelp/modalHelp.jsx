import { useEffect, useRef, useState } from 'react';
import './modalHelp.scss';
import { CaretDownOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowMobileHelp } from '../../../store/modules/modalHelp';

export default function ModalHelp() {
  const dispatch = useDispatch();

  const ui = useSelector(state => state.comm.ui);
  const larksr = useSelector(state => state.comm.larksr);
  const mobileForceLandScape = useSelector(state => state.comm.mobileForceLandScape);
  const isShowMobileHelp = useSelector(state => state.modalHelp.isShowMobileHelp);


  const [active, setActive] = useState('');
  const caretFn = (index) => {
    if(active === index) {
      setActive('');
      helpRefList[index].style.transform = 'rotate(0deg)';
      contentRefList[index].style['maxHeight'] = '0px';
      contentRefList[index].style['margin-bottom'] = '0px';
      
    } else {
      setActive(index);
      
      helpRefList[index].style.transform = 'rotate(-180deg)';
      contentRefList[index].style['maxHeight'] = '28.3rem';
      contentRefList[index].style['margin'] = '0.5rem 0';
    }
  
    helpRefList[index].style.transition = 'all 0.1s';
    contentRefList[index].style.transition = 'all 0.3s';
  };

  const viewPort = useRef({ width: 1920, height: 1080 });
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  useEffect(() => {
    viewPort.current = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait';
    setScreenOrientation(screenOrientation);
  }, [larksr]);

  const [helpStyle, setHelpStyle] = useState({});
  useEffect(() => {
    let obj = {};
    if(screenOrientation==='landscape' || mobileForceLandScape) {
      obj = {
        'width': '34.31rem',
        'height': viewPort.current.height +'px',
        // 'display': isShowMobileHelp ? 'block' : 'none',
        'right': isShowMobileHelp ? '0' : '-'+ '34.31rem'
      }
    } else {
      obj = {
        'width': '100%',
        'height': viewPort.current.height +'px',
        // 'display': isShowMobileHelp ? 'block' : 'none',
        'right': isShowMobileHelp ? '0' : '-'+ '100%'
      }
    }
    setHelpStyle(obj)
  }, [viewPort,isShowMobileHelp,screenOrientation,mobileForceLandScape]);

  const [helpList, setHelpList] = useState([
    {title: ui.helpTitle1,content: ui.helpContent1},
    {title: ui.helpTitle2,content: ui.helpContent2}
  ])
  const isMobile = useSelector(state => state.comm.isMobile);
  useEffect(() => {
    let list = [
      {title: ui.helpTitle1,content: ui.helpContent1},
      {title: ui.helpTitle2,content: ui.helpContent2}
    ]
    if(isMobile) {
      list.push( {title: ui.helpTitle4,content: ui.helpContent4})
    }
    setHelpList(list);
  }, []);

  const [helpRefList, setHelpRefList] = useState([]);
  const [contentRefList, setContentRefList] = useState([]);
  const handleHelpRef = (el, index) => {
    if (el) {
      let list = helpRefList;
      list[index] = el;
      setHelpRefList(list);
    }
  }
  const handleContentRef = (el, index) => {
    if (el) {
      let list = contentRefList;
      list[index] = el;
      setContentRefList(list);
    }
  }
  const closeModal = () => {
    dispatch(setIsShowMobileHelp(false));
  };
  return(
    <div className="mobile-modal-help" style={helpStyle}>
      <div className="mobile-modal-help-title">
        <i className="iconfont icon-arrow" onClick={closeModal}></i>
        <span className="mobile-modal-help-title-text">
          { ui.help }
        </span>
      </div>
      <div className="help-content">
        {
          helpList.map((item, index) => {
            return <div className="help-row" key={item.title}>
              <div className="help-row-title" onClick={() => caretFn(index)}>
                <p>{item.title}</p>
                <div ref={el => handleHelpRef(el,index)}>
                  <CaretDownOutlined />
                </div>
              </div>
                <div className="help-row-content" ref={el => handleContentRef(el, index)}>
                  {item.content}
                </div>
            </div>
          })
        }
      </div>
    </div>
  )
}