import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import './tooltip.scss';

export default function Tooltip({title, content}) {
  const [hideTimer, setHideTimer] = useState(null);
  const [visible, setVisible] = useState(false);

  const onShow = () => {
    clearTimeout(hideTimer);
    setVisible(true);
  };
  const onHide = () => {
    setHideTimer(setTimeout(() => {
      setVisible(false);
    }, 100))
  }
  
  const menubarPosition = useSelector(state => state.comm.menubarPosition);
  
  const titleRefClassName = {'m-title': true, 'show-tip': visible, 'top': menubarPosition==='bottom', 'bottom': menubarPosition==='top'}
  return (
    <div className="m-tooltip" onMouseEnter={onShow} onMouseLeave={onHide}>
    <div
      className={Object.keys(titleRefClassName).filter(key => titleRefClassName[key]).join(' ')}
      onMouseEnter={onShow}
      onMouseLeave={onHide}
      >
      <div className="u-title">
        {title}
      </div>
    </div>
    <div>
      {content}
    </div>
  </div>
  )
}