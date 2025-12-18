import './toast.scss';
import { ToastPosition, clearToast } from '../../store/modules/toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector(state => state.toast.toast);

  const [toastText, setToastText] = useState({});
  const [toastPosition, setToastPosition] = useState({});
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    if (toast.level == 3) {
      setToastText({
        'backgroundColor': 'var(--webclient-toast-bg-1)',
        'color': 'var(--webclient-toast-font-color)'
      });
    } else {
      setToastText({});
    }

    const position = toast.position;
    let top = "";
    if (position) {
      if (position === ToastPosition.UP) {
        top = '7%';
      } else if (position === ToastPosition.DOWN) {
        top = '85%';
      }
    };
    setToastPosition({
      'top': top
    });

    if(toast.show===true) {
      const timeout/*: number*/ = toast.timeout ? toast.timeout : 5000;

      const t = window.setTimeout(() => {
				dispatch(clearToast());
			}, timeout);
      setTimer(t);
    }

    return() => {
      if(timer) clearTimeout(timer);
    }
  }, [toast]);
  return(
    <div>
      {toast.show &&
        <div className="toast" style={toastPosition}>
          <span className="toastText" style={toastText}>{toast.text}</span>
        </div>
      }
    </div>
  )
}