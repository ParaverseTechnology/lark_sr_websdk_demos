import './alert.scss';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../button/button';
// UI组件
export default function Alert() {

  const dispatch = useDispatch();
  const onSubmit = () => {
    if (modalAlert.callback) {
        modalAlert.callback();
    }
    console.log('callback', modalAlert.callback)
    // dispatch(reset());
}

  const larksr = useSelector(state => state.comm.larksr);
  const modalAlert = useSelector(state => state.alert.modalAlert);
  const ui = useSelector(state => state.comm.ui);
  
  return (
    <div className="modalAlertPanel" style={{width: larksr?.screenState.viewPort.width, height: larksr?.screenState.viewPort.height}}>
      <div className="container">
        <div className="container-title">
          <div>
            <p>{ ui?.tip }</p>
          </div>
        </div>
        <div className="content">
          <p>{modalAlert.des}</p>
        </div>
        <div className="modalConfirmPanel-divider"></div>
        <div className="button-group">
          <Btn title={ui?.buttonSubmit} submit={true} click={onSubmit} />
        </div>
      </div>
    </div>
  )
}
