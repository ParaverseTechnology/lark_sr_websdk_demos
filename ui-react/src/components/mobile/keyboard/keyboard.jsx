
import PxyCommonUI from 'pxy_webcommonui';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVKeyboard } from '../../../store/modules/comm';


export default function Keyboard() {
  const dispatch = useDispatch();
  
  const larksr = useSelector(state => state.comm.larksr);
  const { Keyboard } = PxyCommonUI;

  const keyboard = useRef(null);
  const uiKeyboardRef = useRef(null);

  useEffect(() => {
    keyboard.current = new Keyboard({
      // 必填项，挂载的根元素
      rootElement: uiKeyboardRef.current, 
      larksr: larksr,
      language: larksr.params.language === 'en-US'? 'en':'zh'
    })
    keyboard.current.show();
    keyboard.current.on('keyboardVal', (e)=>{
      console.log('e',e.detail)
    })
    keyboard.current.on('toggleKeyboard', (e)=>{
      console.log('e',e.detail)
      dispatch(toggleVKeyboard());
    })
  }, []);
  return(
    <div ref={uiKeyboardRef} style={{'position': 'absolute','zIndex': 2000, 'bottom': 0,'width': '100%'}}></div>
  )
}