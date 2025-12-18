import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import './assets/style/mobile_base.scss'
import { Provider } from 'react-redux'
import store from './store'
import '@ant-design/v5-patch-for-react-19';
import '@/assets/iconfont_new/iconfont.css'
import '@/assets/iconfont_new/iconfont.js';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>
)
