import './notify.scss';
import Btn from '../button/button';
import Log from '@/utils/log';
import CloseImg from '@/assets/images/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearNotify } from '../../store/modules/notify';

export default function Notify() {
  const dispatch = useDispatch();

  const ui = useSelector(state => state.comm.ui);
  const larksr = useSelector(state => state.comm.larksr);
  const notify = useSelector(state => state.notify.notify);

  const [container, setContainer] = useState({});
  useEffect(() => {
    const val = larksr ? larksr.screenState.container : {
      marginTop: 0, marginLeft: 0, width: 1920, height: 1080
    }
    setContainer(val);
  }, [larksr]);

  const [style, setStyle] = useState({});
  useEffect(() => {
    setStyle({
      width: container.width + 'px',
      marginTop: container + 'px',
      marginLeft: commore.container.marginLeft + 'px',
  })
  }, []);

  // const onClose = () => {
  //   Log.info('close notify bar');
  // };

  const clearNotifyFn = () => {
    dispatch(clearNotify());
  }

  
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    if(notify.show===true) {
      const timeout/*: number*/ = notify.timeout ? notify.timeout : 5000;

      const t = window.setTimeout(() => {
				dispatch(clearNotify());
			}, timeout);
      setTimer(t);
    }

    return() => {
      if(timer) clearTimeout(timer);
    };
  }, [notify]);
  return(
    <div className="notifybar" style={style}>
        <div className="alertInfo">
            [{notify.level}]:{notify.msg}
        </div>
        <Btn 
            info={ui.buttonClose}
            src={CloseImg}
            click={clearNotifyFn}
        />
    </div>
  )
}