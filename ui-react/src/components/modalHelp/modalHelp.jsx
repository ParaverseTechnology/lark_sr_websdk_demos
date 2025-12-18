import './modalHelp.scss'
import { CloseOutlined, CaretDownOutlined } from '@ant-design/icons'
import ContentAlert from '../customContentAlert/customContentAlert'
import { setIsShowHelpAlert } from '../../store/modules/modalHelp'
import { setCustomContentAlertTitle } from '../../store/modules/customContentAlert'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function modalHelp() {
  const dispatch = useDispatch();

  const ui = useSelector(state => state.comm.ui);

  const alertPositionStyle = {
    top: '75px',
    right: '20px',
    position: 'absolute'
  };

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
  }, [])


  const onCancel = () => {
    dispatch(setIsShowHelpAlert(false));
    dispatch(setCustomContentAlertTitle(''));
  };

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

  // click
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

  const falist = useRef(null);
  return (
    <ContentAlert
      alertPositionStyle={alertPositionStyle}
      close={
        <div onClick={onCancel}>
          <CloseOutlined style={{fontSize: '1.8rem'}} />
          </div>
      }
      content={
        helpList.map((item, index) => {
          return (
            <div ref={falist} className="help-row" key={item.title}>
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
          )
        })
      }
    >
    </ContentAlert>
  )
}