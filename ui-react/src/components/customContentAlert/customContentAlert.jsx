import { useDispatch, useSelector } from 'react-redux'
import './customContentAlert.scss'
import { useEffect, useState } from 'react';

export default function customContentAlert({close, content, alertPositionStyle, customContentStyle}) {
  const dispatch = useDispatch();
  
  const larksr = useSelector(state => state.comm.larksr);
  const customContentAlertTitle = useSelector(state => state.customContentAlert.customContentAlertTitle);
  const viewPort = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };

  const [viewPortStyles, setViewPortStyles] = useState({});
  useEffect(() => {
    if( customContentStyle) {
      setViewPortStyles(customContentStyle);
    } else {
      setViewPortStyles({
        'width': viewPort.width+'px'
      })
    }
  }, [customContentStyle, viewPort])
  return (
    <div className="customAlert" style={viewPortStyles}>        
        <div className="customAlert-container" style={alertPositionStyle}>
            <div className="customAlert-title">
                <div>
                    <p>{customContentAlertTitle}</p>
                </div>
                {close}
            </div>
            <div className="customAlert-content">
              {content}
            </div>
        </div>
    </div>
  )
}