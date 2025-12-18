import './confirm.scss';
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import Btn from '../button/button';
import Log from '@/utils/log';
import { reset } from '@/store/modules/confirm';
import { useEffect } from 'react';



export default function Confirm() {
  const dispatch = useDispatch();

  const ui = useSelector(state => state.comm.ui);
  const modalConfirm = useSelector(state => state.confirm.modalConfirm);
  const larksr = useSelector(state => state.comm.larksr);

  const onCancel = () => {
    Log.info('onCancel');
    if (modalConfirm.onCancel) {
        modalConfirm.onCancel();
    }
    dispatch(reset());
  };
  const onSubmit = () => {
      Log.info('onSubmit');
      if (modalConfirm.onSubmit) {
          modalConfirm.onSubmit();
      }
      dispatch(reset());
  };
  const onKeyup = (e) => {
    if (e.key == 'Enter') {
        onSubmit();
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', onKeyup);
    return () => {
      document.removeEventListener('keyup', onKeyup);
    }
  }, [])
  return (
    <div className="modalConfirmPanel" style={{width: larksr?.screenState.viewPort.width, height: larksr?.screenState.viewPort.height}}>
        <div className="container">
            <div className="modalConfirmPanel-title">
                <div>
                    <p>{modalConfirm.title}</p>
                </div>
                <div onClick={onCancel}>
                  <CloseOutlined />
                </div>
            </div>
            <div className="content">
                <p>{modalConfirm.des}</p>
            </div>
            <div className="modalConfirmPanel-divider"></div>
            <div className="button-group">
                <Btn className="submit" title={ui.buttonSubmit} submit={false} click={onSubmit}/>
                <Btn className="cancel" title={ui.buttonCancel} submit={false} click={onCancel} />
            </div>
        </div>
    </div>
  )
}