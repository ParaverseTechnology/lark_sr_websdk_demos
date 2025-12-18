import { useEffect, useState } from 'react';
import './button.scss';



export default function Btn(props) {

  let {info, title, src, submit } = props;

  const [showInfo, setShowInfo] = useState(false);

  let isShowInfo;
  useEffect(() => {
    isShowInfo = info && showInfo;
  }, [info, showInfo]);

  let titleMode;
  useEffect(() => {
    if (title && src)  titleMode = 1;
    else if (title) titleMode = 2;
    else if (src) titleMode = 3;
    else titleMode = -1;

  }, []);

  const onTouchStart = (e) => {
    props.touchstart && props.touchstart(e)
    setShowInfo(true);
  };
  const onTouchEnd = (e) => {
    props.touchend && props.touchend(e);
    setShowInfo(false);
  };
  const onTouchCancel = (e) => {
    setShowInfo(false);
  };
   const onMouseEnter = () => {
    setShowInfo(true);
  };
  const onMouseLeave = () => {
    setShowInfo(false);
  };
  const onEubmit = () => {
      if (submit) {
        props.click();
        props.submit();
      }
  }
  
  let [content, setContent] = useState(null);
  
  useEffect(() => {
    if(titleMode==1) {
      setContent(<div className="buttonRow">
        <img className="buttonRowCell" src={src} alt=""/>
        <div className="buttonRowCell">{title}</div>
      </div>)
    } else if(titleMode==2) {
      setContent(<div className="button-title">{title}</div>);
    } else if(titleMode==3) {
      setContent(<img src={src} alt="" />);
    } else{
      setContent(<div className="buttonTitle">
                  {props.children}
                </div>);
    }
    
  },[titleMode,title])
  
  return (
    <div className="button" 
        onClick={props.click}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave}
        onKeyUp={onEubmit}
    >
      {isShowInfo && 
        <div className="info">{info}</div>
      }
      {content}
    </div>
  )
}