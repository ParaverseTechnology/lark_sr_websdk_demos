import { useState, useRef, useEffect } from 'react';
import { LarkSR } from "larksr_websdk";
import './App.scss';
import Load from './load';
import Log  from "@/utils/log";
import Unit from './utils/unit';
import Alert from './components/alert/alert';
import Confirm  from './components/confirm/confirm';
// import AlertUI from './components/alert/alert'
import { useDispatch, useSelector } from 'react-redux';
import { showModalAlert } from './store/modules/alert';
import { showModalConfirm } from './store/modules/confirm';
import { setLarksr, setUi, setShowWebMenu, resize, setInputMethodStart, setInputMethodEnable, setAggregatedStats, setMobileKeyboardType, setJoyStick, setPreComponentName, setMobileWebMenuType, setEnableChineseInput, setFlipMouseWheel, toggleVKeyboard, setControlBallInputMethod, resetLocalization } from './store/modules/comm';
import { coderateChange, codeFpsChange, setQualityMode } from './store/modules/modalSetting';
import { setShowPlayerList, updatePlayerList, setNickNameRds } from './store/modules/playerMode';
import { toastAct } from './store/modules/toast';
import LocalizationLoader from '@/localization/loader';
import closeImg from '@/assets/images/close.svg';
import returnImg from '@/assets/images/return.svg';
import MenuBar from './components/menuBar/menuBar';
import States from './components/statesModal/statesModal';
import ModalHelp from './components/modalHelp/modalHelp';
import Btn from './components/button/button';
import ModalSetting from './components/modalSetting/modalSetting';
import LiveStreaming from './components/liveStreaming/liveStreaming';
import AerialView from './components/aerialView/aerialView';
import Toast from './components/toast/toast';
import Notify from './components/notify/notify';
import RttInfo from './components/rttinfo/rttinfo';
import PlayerMode from './components/playerMode/playerMode';
import ControlBall from './components/mobile/controlBall/controlBall';
import MobileMenuBar from './components/mobile/mobileMenuBar/mobileMenuBar';
import { Flex } from 'antd';



function App() {
  const dispatch = useDispatch();
  const isMobile = useSelector(state => state.comm.isMobile);
  const ui = useSelector(state => state.comm.ui);
  const menubarPosition = useSelector(state => state.comm.menubarPosition);
  const mobileKeyboardType = useSelector(state => state.comm.mobileKeyboardType);
  const vkeyboard = useSelector(state => state.comm.vkeyboard);
  const playerList = useSelector(state => state.playerMode.playerList);
  const playerMode = useSelector(state => state.comm.playerMode);
  const controlBallInputMethod = useSelector(state => state.comm.controlBallInputMethod);
  const isShowStreamAlert = useSelector(state => state.modalStream.isShowStreamAlert);
  const mobileWebMenuType = useSelector(state => state.comm.mobileWebMenuType);

  const myRef = useRef(null);
  const [showUI, setShowUI] = useState(false);
  const [urlShowWebMenu, setUrlShowWebMenu] = useState(null);
  const [cloudReady, setCloudReady] = useState(false);

  const [mutePlay, setMutePlay] = useState(false);
  const enableChineseInput = useSelector(state => state.comm.enableChineseInput);
  const [inputFocusFlag, setInputFocusFlag] = useState(false);

  const [isChineseInput, setIsChineseInput] = useState(false);
  const compositionEnd = (e) => {
    if(e.type === 'compositionstart' && !controlBallInputMethod) { // 中文输入start
      setIsChineseInput(true);
    } else if(e.type === 'compositionend' && !controlBallInputMethod) { // 中文输入确定文字
      if (larksr.current) {
        Log.info("submit input text", inputText);
        larksr.current.inputText(inputText);
      }
      setInputText("");
      setIsChineseInput(false);
    }
  };

  
  const sysKeybaordEnterOrBackspace = (e) => {
    if(isMobile && inputFocusFlag) {
      if(e.key === 'Enter') {
        larksr.current.inputText(inputValue);
        inputValue = '';
        inputRef.blur();
      }else if(e.key === 'Backspace') {
        larksr.current.keyDown('Backspace', false);
        textInputTimer = setTimeout(() => {
          larksr.current.keyUp('Backspace');
          if(textInputTimer) clearTimeout(textInputTimer);
        },50)
      }
    }
  };
  const inputTextareaKeydown = (e) => {
    if(e.key === 'Backspace') {
      if(inputText === "") {
        larksr.current.keyDown('Backspace', false);
        textInputTimer = setTimeout(() => {
          larksr.current.keyUp('Backspace');
          if(textInputTimer) clearTimeout(textInputTimer);
        },50)
      }
    } else if((e.key === 'c'|| e.key === 'v' || e.key === 'a' || e.key === 'x') && e.ctrlKey) {
      larksr.current.keyDown('ControlLeft', false);
      larksr.current.keyDown(e.code, false);
      if(inputText) {
        larksr.current.inputText(inputText);
        setInputText("");
      }
      textInputTimer = setTimeout(() => {
        larksr.current.keyUp(e.code);
        larksr.current.keyUp('ControlLeft');
        if(textInputTimer) clearTimeout(textInputTimer);
      },50)
    }
  };
  const inputTextareaKeyup = (e) => {
    if(e.key === 'Enter'){
      commStore.setInputMethodEnable( false);
      // this.setInputMethodEnable(false);
      if (larksr.current) {
        Log.info("submit input text", inputText);
        larksr.current.inputText(inputText);
      }
      inputTextareaRef.blur();
      setInputText("");
    }
  };

  const larksr = useRef(null);
  // 开始连接
  const start = async() => {
    try {
      let params = {};

      // 要使用的云端资源的应用 ID，从后云雀后台接口获取
      // 参考查询应用一栏文档
      // https://showdoc.pingxingyun.com/web/#/75/1697
      // 如 222.128.6.137:8181 系统下的 879414254636105728 应用
      // params.appliId = '1405971684749475840'
      // Load.appliId;

      if (!params.appliId) {
        dispatch(showModalAlert({des: '请设置appliId参数', callbackFn: () => {
          Unit.quit();
        }}));
        return;
      }

      // groups
      if (Load.endDate) {
        params.endDate = Load.endDate;
      }
      if (Load.clientMac) {
        params.clientMac = Load.clientMac;
      }
      if (Load.groupId) {
        params.groupId = Load.groupId;
      }
      if (Load.regionId) {
        params.regionId = Load.regionId;
      }

      // 互动模式
      if (Load.taskid) {
        params.taskId = Load.taskid;
      }

      //启动模式：0：普通模式, 1：互动模式（一人操作多人观看），2: 多人协同（键盘鼠标放开，需要应用配合）
      // 互动模式测试连接
      // 所有者 userType = 1
      // http://localhost:8081/?appliId=925773094113509376&playerMode=1&userType=1&authCode=fMFu92vg
      // 观看者 userType = 0
      // http://localhost:8081/?appliId=925773094113509376&playerMode=1&userType=0&authCode=fMFu92vg
      if (Load.playerMode) {
        params.playerMode = Load.playerMode;
      }

      //Task所有者:1 /  观察者:0
      if (Load.userType || Load.userType === 0) {
        params.userType = Load.userType;
      }

      // 用户手动输入昵称
      if (nickname) {
        larksr.current.params.nickname = nickname;
      }
      if (nickname) {
        params.nickname = nickname;
      }
      // url 载入昵称
      if (Load.nickname) {
        params.nickname = Load.nickname;
      }

      //口令:8位唯一码,写入TaskInfo
      if (Load.authCode) {
        params.authCode = Load.authCode;
      }
      if(Load.accessType && Load.accessType === '0') {
        // 私有应用需要传参 accessType shareId authCode（原身roomCode）
        params.authCode = authCode;
        params.accessType = '0';
        params.shareId = Load.shareId;
        larksr.current.params.accessType = Load.accessType;
      }

      //指定节点分配
      if (Load.targetServerIp) {
        params.targetServerIp = Load.targetServerIp;
      }

      // keys
      if (Load.appKey) {
        params.appKey = Load.appKey;
      }
      if (Load.timeStamp) {
        params.timestamp = Load.timeStamp;
      }
      if (Load.signature) {
        params.signature = Load.signature;
      }
      if (Load.language) {
        params.language = Load.language;
      } else {
        // params.language = this.navigatorLan;
      }

      if(Object.keys(Load.extraparams).length>0) {
        params = Object.assign(params, Load.extraparams)
      }
      await larksr.current.connect(params);

      console.log("connect", params);

      // 设置网页 title
      if (larksr.current.params.appliName) {
        document.title = decodeURI(decodeURI(larksr.current.params.appliName));
      }
    } catch(e) {
      console.error('connect and int failed.', e);
      dispatch(showModalAlert({des: e.message ? e.message : JSON.stringify(e), callbackFn: () => {
        Unit.quit();
      }}));
    }
  };

  useEffect(() => {
    
    larksr.current = new LarkSR({
      rootElement: myRef.current,
      // 服务器地址,实际使用中填写您的服务器地址
      // 如：http://222.128.6.137:8181/
      // serverAddress: "http://222.128.6.137:8181/",
      serverAddress: "http://192.168.0.184:8181/",
      // 视频缩放模式，默认保留宽高比，不会拉伸并完整显示在容器中
      // scaleMode: "contain",
      // 0 -》 用户手动触发, 1 -》 首次点击进入触发, 2 -》 每次点击触发
      // fullScreenMode: 0,
      // mobileFullScreenMode: 1,
      // 测试载入背景图
      // loadingBgUrl: "https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg",
      // show log
      // logLevel: 'warn',

      // 单独上传流程要求渲染服务器版本大于3290）
      useSeparateMediaSharePeer: true,
    });
    // larksr.current = larksr;
    larksr.current.initSDKAuthCode("SDK 授权码，联系 business@pingxingyun.com 获取,注意是 SDK 本身的授权码，不是服务器上的授权")
    .then(() => {
      // start connect;
      // larksr.connect({
        // people beijig 879414254636105728
        // appliId: "1405971684749475840",
        // playerMode: 2,
        // userType: Unit.queryString("userType") as any,
        // taskId: Unit.queryString("taskid") as any,
        // nickname: "Test",
      // })
      // .then(() => {
      //   console.log('enter success');
      // })
      // .catch((e) => {
      //   console.error(e);
      //   alert(JSON.stringify(e));
      // }); 
    })
    .catch((e) => {
      console.error(e);
      alert(JSON.stringify(e));
    });

    // 监听连接成功事件
    larksr.current.on("connect", (e) => {
      console.log("LarkSRClientEvent CONNECT", e, larksr.current.params, larksr.current.screenState);
      LocalizationLoader.init(larksr.current.params.language);
  
      // set coderate
      dispatch(coderateChange(larksr.current.params.codeRate));
      // set frameRate
      dispatch(codeFpsChange(larksr.current.params.frameRate));
      // 画质
      dispatch(setQualityMode());
      // 可能从getstartappinfo之后才获取来的参数.
      // 后台配置的是否显示玩家列表参数
      dispatch(setShowPlayerList(larksr.current.params.showPlayerList));
      // 移动端输入键盘类型
      dispatch(setMobileKeyboardType(larksr.current.params.mobileKeyboardType));
      // joystick
      dispatch(setJoyStick(larksr.current.params.mobileVirtualJoystick));
      if(larksr.current.params.mobileVirtualJoystick) dispatch(setPreComponentName('joystick'));
      if(larksr.current.params.mobileWebMenuType) dispatch(setMobileWebMenuType(larksr.current.params.mobileWebMenuType));
      // 是否开启中文输入
      dispatch(setEnableChineseInput(larksr.current.params.imeFirstNotice === 0 ? false : true));
      // 是否显示菜单
      if (urlShowWebMenu) {
        dispatch(setShowWebMenu(urlShowWebMenu === '0'? false : true))
      } else {
        dispatch(setShowWebMenu(larksr.current.params.showWebMenu === 0? false : true))
      }
      Log.info('load params', larksr.current.params);
      // /**
      //  * mouseZoomDirection
      //  * 用于移动端捏合缩放操作与应用鼠标缩放的对应关系
      //  * 1:鼠标滚轮向上为放大，
      //  * 0:鼠标滚轮向下为放大(default)
      //  */
      dispatch(setFlipMouseWheel(larksr.current.params.mouseZoomDirection));
    });

    larksr.current.on("gotremotesteam", (e) => {
      console.log("LarkSRClientEvent gotremotesteam", e);
    });

    larksr.current.on("meidaloaded", (e) => {
      console.log("LarkSRClientEvent meidaloaded", e);
      setCloudReady(true);
    });

    larksr.current.on("mediaplaysuccess", (e) => {
      console.log("LarkSRClientEvent mediaplaysuccess", e);
    });

    // 3.2.329 使用 larksdk 中的播放按钮
    // larksr.current.on("mediaplayfailed", (e) => {
    //   console.log("LarkSRClientEvent mediaplayfailed", e);
    //    dispatch(showModalAlert({des: "开始", callbackFn: () => {
    //     larksr.current.videoComponent.sountPlayout();
    //     larksr.current.videoComponent.playVideo();
    //   }}))
    // });

    larksr.current.on("meidaplaymute", (e) => {
      console.log("LarkSRClientEvent meidaplaymute", e);
      setMutePlay(true);
      dispatch(toastAct({text: ui.enableAudio, position: 2, level: 3}));
    });

    larksr.current.on("peerstatusreport", (e) => {
      // console.log("LarkSRClientEvent peerstatusreport", e);
      dispatch(setAggregatedStats(e.data));
    });

    larksr.current.on('error', (e) => {
        console.error("LarkSRClientEvent error", e.message);
        dispatch(showModalAlert({des: e.message, code: e.code, callbackFn: () => {
          Unit.quit();
        }}));
    });

    larksr.current.on('info', (e) => {
        console.log("LarkSRClientEvent info", e);
        dispatch(toastAct({text: e.message}));
    });
    console.log("load appli success", larksr.current);

    larksr.current.on('resourcenotenough', (e) => {
        console.log("LarkSRClientEvent resourcenotenough", e);
        if(e.type === 0) {
          // "当前系统繁忙，请稍后再试！"
          alert(ui.systemIsBusy);
        }
    });

    // 云端Input输入事件
    larksr.current.on('apprequestinput', (e) => {
      console.log('apprequestinput', e)
      if(e.data === true) {
        // 禁止中文输入
        if(!enableChineseInput){
          return false;
        }
        setInputFocusFlag(true);
        if(isMobile) {
          if(mobileKeyboardType === 1) {
            // 打开虚拟键盘
            if(!vkeyboard) dispatch(toggleVKeyboard());
          } else {
            //打开系统键盘
            if(!vkeyboard) { // 虚拟键盘显示时 
              inputRef.current.focus();
              if (larksr)larksr.op.setKeyboardEnable(false);
            }
          }
        } else{
          // PC端禁止中文输入
          if(!enableChineseInput){
            return false;
          }
            const isOperating = playerList.find(item => item.nickName === playerMode.nickName).userType == 1;
            // 演示模式 && 没有操作权限时候不弹出提示框
            if(!(Load.playerMode === 1 && !isOperating)) {
              dispatch(setControlBallInputMethod(false));
              setCurMousePositionY(mousePositionY);
              dispatch(setInputMethodEnable(e.data));
              inputTextareaRef.current.focus();
              inputTextClassBoxRef.current.style.opacity = 0;
              inputTextClassBoxRef.current.style['zIndex'] = -1;
              inputTextareaRef.current.addEventListener('compositionstart',compositionEnd);
              inputTextareaRef.current.addEventListener('compositionend',compositionEnd);
            }
        }
      } else {
        setInputFocusFlag(false);
        if(isMobile) {
          if(mobileKeyboardType === 1) {
            // 关闭虚拟键盘
            if(vkeyboard)dispatch(toggleVKeyboard());
          } else {
            //关闭系统键盘
            inputRef.current.blur();
            if (larksr)larksr.op.setKeyboardEnable(true);
          }

        } else {
          dispatch(setInputMethodEnable(false));
          inputTextareaRef.current.removeEventListener('compositionstart',compositionEnd);
          inputTextareaRef.current.removeEventListener('compositionend',compositionEnd);
        }
        if (mobileScreenLandscapState) {
          larksr?.screenState.setMobileForceLandScape(true);
          setMobileScreenLandscapState(false);
        }
      }
    });
    larksr.current.on('appresize', (e) => {
      Log.info("LarkSRClientEvent APP_RESIZE", e);
      setShowUI(true);
    });
    larksr.current.on('playerlist', (e) => {
      console.log('PLAYER_LIST', e.data);
      dispatch(updatePlayerList(e.data));
    });
    // reset states.
    dispatch(setLarksr(larksr.current));
    dispatch(resetLocalization());
    dispatch(setUi(LocalizationLoader.ui))
    dispatch(resize());

    if(Load.accessType === '0' && Load.shareId) { // 私有应用
      if(Load.authCode) { //有口令密码
        setAuthCode(Load.authCode);
        setShowAuthCodeInput(false);

        // 互动模式需要填昵称
        if (playerMode.playerModeType != 0 && playerMode.nickName == "") {
          // 填写昵称后再开始
          setShowNicknameInput(true);
          setInputNickName(true);
        } else {
          // start connect.
          start();
        }
      } else {
          // 需要用户输入口令密码
          setShowAuthCodeInput(true);
          // 互动模式需要填昵称
         if (playerMode.playerModeType != 0 && playerMode.nickName == "") {
          setShowNicknameInput(true);
         }
         setInputNickName(true);
        }
    } else { // 公有应用
      // 互动模式需要填昵称
      if (playerMode.playerModeType != 0 && playerMode.nickName == "") {
        console.log("need nick name");
        // 填写昵称后再开始
        setInputNickName(true);
        setShowNicknameInput(true);
      } else {
        // start connect.
        start();
      }
    }



    let resizeTimeout = null;
    window.addEventListener("resize", () => {
        if (resizeTimeout) {
          window.clearTimeout(resizeTimeout);
        }
        resizeTimeout = window.setTimeout(() => {
          dispatch(resize());
          resizeTimeout = null;
        }, 200);
    });
    window.addEventListener("orientationchange", () => {
        if (resizeTimeout) {
          window.clearTimeout(resizeTimeout);
        }
        resizeTimeout = window.setTimeout(() => {
          dispatch(resize());
          resizeTimeout = null;
        }, 200);
    });
    // dispatch(resize());;
    return () => {
      // 主动关闭
      larksr.current?.close();
      if(isMobile) {
        inputRef.current?.removeEventListener('keyup',sysKeybaordEnterOrBackspace)
      } else {
        inputTextareaRef.current?.removeEventListener('keyup',inputTextareaKeyup)
        inputTextareaRef.current?.removeEventListener('keydown',inputTextareaKeydown)
      }
    }
  },[])
  
  const onQuit = () => {
    // code 920 // 用户主动点击关闭按钮
    dispatch(showModalConfirm({
      title: ui.quit, 
      des: ui.quitTip, 
      code: 920,
      onSubmit: () => {
        Log.info('user confirm');
        Unit.quit();
      },
      onCancel: () => {
        Log.info('user cancle');
      }
    }));
  };
  const modalAlert = useSelector(state => state.alert.modalAlert);
  const showWebMenu = useSelector(state => state.comm.showWebMenu);
  const modalConfirm = useSelector(state => state.confirm.modalConfirm);
  const showControlBar = useSelector(state => state.comm.showControlBar);
  const isShowSettingAlert = useSelector(state => state.modalSetting.isShowSettingAlert);

  // authcode
  
  const [authCodeRequire, setAuthCodeRequire] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [showAuthCodeInput, setShowAuthCodeInput] = useState(false); // 是否需要展示输入口令密码输入框
  const [authCodeRequireClass, setAuthCodeRequireClass] = useState('');
  useEffect(() => {
    const classNameStr = authCodeRequire ? "warning" : "";
    setAuthCodeRequireClass(classNameStr);
  }, [authCodeRequire])
  
  const onAuthCodeInputFocus = () => {
    console.log("on authCode input focus");
    setAuthCodeRequire(false);
  };

  // 昵称
  const [nicknameRequire, setNicknameRequire] = useState(false);
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const [inputNickName, setInputNickName] = useState(false);

  const [nicknameRequireClass, setNicknameRequireClass] = useState('');
  useEffect(() => {
    const classNameStr = nicknameRequire ? "warning" : "";
    setNicknameRequireClass(classNameStr);
  }, [nicknameRequire])
  // 昵称输入框
  const [nickname, setNickname] = useState("");
  const onInputFocus = () => {
    console.log("on focus");
    setNicknameRequire(false);
  };
  const onSubmitNickName = () => {
    console.log("on submit nickname", nickname);
    console.log('on submit authCode',authCode);
    if(showAuthCodeInput) {// 只有私有应用 会出现输入口令密码的情况
      if(showNicknameInput && nickname == "") {
        setNicknameRequire(true);
      } else if(showAuthCodeInput && authCode == "") {
        setAuthCodeRequire(true);
      } else {
        setInputNickName(false);
        dispatch(setNickNameRds(nickname));
        setShowNicknameInput(false);
        setShowAuthCodeInput(false);
        start(taskStated);
      }
  
    } else {
      if (nickname != "") {
        // 填写昵称后再开始
        setInputNickName(false);
        dispatch(setNickNameRds(nickname));
        setNicknameRequire(false);
        start(taskStated);
      } else {
        setNicknameRequire(true);
      }
    }
  };

  // 文字输入相关
  const inputTextClassBoxRef = useRef(null);
  const inputTextareaRef = useRef(null);
  const inputRef = useRef(null);
  const inputMethodEnable = useSelector(state => state.comm.inputMethodEnable);
  const [inputTextClass, setInputTextClass] = useState('');
  const [curMousePositionY, setCurMousePositionY] = useState('-9999'); //记录鼠标点击时坐标（PC端输入中文时，弹窗显示位置）
  const [mousePositionY, setMousePositionY] = useState(30);
  
  useEffect(() => {
    const classNameStr = inputMethodEnable ? "inputText enable" : "inputText disable";
    setInputTextClass(classNameStr);

    if(inputMethodEnable === true && controlBallInputMethod) {
      // PC
      setCurMousePositionY(mousePositionY)
      inputTextareaRef.current?.focus();
      if(inputTextClassBoxRef.current) {
        inputTextClassBoxRef.current.style.opacity = 1;
        inputTextClassBoxRef.current.style['zIndex'] = 1029;
      }
    } else if(inputMethodEnable === false) {
      inputTextareaRef.current?.blur();
      if(inputTextClassBoxRef.current) {
        inputTextClassBoxRef.current.style.opacity = 0;
        inputTextClassBoxRef.current.style['zIndex'] = -1029;
      }
    }

  }, [inputMethodEnable, controlBallInputMethod]);

 

  const [inputText, setInputText] = useState('');
  const [mobileScreenLandscapState, setMobileScreenLandscapState] = useState(false);
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  useEffect(() => {
    const screenOrientation = larksr.current ? larksr.current.screenState.screenOrientation : 'portrait';
    setScreenOrientation(screenOrientation);
  }, [larksr.current]);
  const onInputMethodFocus = () => {
    Log.info("on input method focus");
    setInputText("");
    if (isMobile && screenOrientation == "landscape") {
      larksr.current?.screenState.setMobileForceLandScape(false);
      setMobileScreenLandscapState(true);
    }
    if (larksr.current) {
      larksr.current.op.setKeyboardEnable(false);
    }
  };
  const onInputMethodBlur = () => {
    Log.info("on input method blur");
    if (mobileScreenLandscapState) {
      larksr.current?.screenState.setMobileForceLandScape(true);
      setMobileScreenLandscapState(false);
    }
    if (larksr.current) {
      larksr.current.op.setKeyboardEnable(true);
    }
  };
  const onInputMethodInput = (e) => {
    if(!controlBallInputMethod) {
      if (larksr.current) {
        Log.info("submit input text1", JSON.stringify(inputText));
        larksr.current.inputText(inputText);
      }
      setInputText("");
    }
  };
  
  const onSubmitInputText = () => {
    dispatch(setInputMethodStart(false));
    dispatch(setInputMethodEnable( false));
    if (larksr.current) {
      Log.info("submit input text", inputText);
      larksr.current.inputText(inputText);
      larksr.current.op.setKeyboardEnable(true);
    }
    inputTextareaRef.current.blur();
    setInputText("");
  };
  const onCloseInputText = () => {
    setInputText("");
    dispatch(setInputMethodStart(false));
    dispatch(setInputMethodEnable( false));
    if (larksr.current) {
      larksr.current.op.setKeyboardEnable(true);
    }
  };
  // 【同步本地剪贴板】关闭时，禁用文本输入框粘贴功能，防止粘贴到文本输入框的内容发送到云端
  const handleInputPaste = (e) => {
    if(!larksr.current?.op.enableParse) {
      e.preventDefault();
    }
  };

  // 帮助
  const isShowHelpAlert = useSelector(state => state.modalHelp.isShowHelpAlert);
  const showAerialView = useSelector(state => state.comm.showAerialView);
  const aerialViewCheck = useSelector(state => state.modalSetting.aerialViewCheck);
  const notify = useSelector(state => state.notify.notify);
  return (
    <>
      <div className="index" ref={myRef} style={{position: 'relative'}} >
      {/* 观看模式昵称的输入框 */}
      {
        inputNickName && 
        <div className="modalInputPanel" style={{width: larksr.current?.screenState.viewPort.width, height: larksr.current?.screenState.viewPort.height}} >
          <div className="container">
            <div className="info">
              {
                showNicknameInput && 
                <Flex align="center" className="info-row">
                  <span className="container-label">{ ui.requireNickName }：</span>
                  <div className="inputContainer">
                    <input
                      className={nicknameRequireClass}
                      type="text"
                      value={nickname}
                      onChange={e => setNickname(e.target)}
                      onFocus={onInputFocus}
                    />
                  </div>
                </Flex>
              }
              {
                showAuthCodeInput &&
                <Flex align="center" className="info-row">
                  <span className="container-label">{ ui.requireAuthCode }：</span>
                  <div className="inputContainer">
                    <input className={authCodeRequireClass} type="text"
                      value={authCode}
                      onChange={e => setAuthCode(e.target)}
                      onFocus={onAuthCodeInputFocus}
                    />
                  </div>
                </Flex>
              }
            </div>
            <div className="buttonContainer">
              <Btn className="submit"
                title={ui.buttonSubmit}
                submit={false}
                click={onSubmitNickName}
              />
            </div>
          </div>
        </div>
        }
      
        { isMobile && <input className="virtualInput" ref={inputRef} type="text" name="inputText" value={inputText} onChange={e => setInputText(e.target)}></input>}
        { !isMobile &&
          <div ref={inputTextClassBoxRef}  className={inputTextClass} style={{'top': (menubarPosition==='top'?curMousePositionY-0+30:curMousePositionY-80)+'px'}}>
            <Flex justify={"space-between"} align={"center"}>
              <textarea
                ref={inputTextareaRef}
                className={nicknameRequireClass}
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target)}
                onFocus={onInputMethodFocus}
                onBlur={onInputMethodBlur}
                onInput={onInputMethodInput}
                onPaste={handleInputPaste}
              />
              <img src={returnImg} className="button-return" onClick={onSubmitInputText} />
              <img src={closeImg} className="button-close" onClick={onCloseInputText} />
            </Flex>
          </div>
        }
        { showUI &&
          <div >
            {
              (cloudReady && isMobile)?
              <div>
                {/* 菜单条/控制球 */}
                { mobileWebMenuType===1? <MobileMenuBar/> : <ControlBall />}
              </div>
              :
              <div>
                {/* 右上角关闭应用icon */}
                {showWebMenu && 
                  <div className="close-appli-pc" onClick={onQuit}>
                    <img src={closeImg}/>
                  </div>
                }
                {(cloudReady && showControlBar && showWebMenu) && <MenuBar/>}
                  <States/> 
                  {/* 帮助  */}
                  { isShowHelpAlert && <ModalHelp /> }
                  {/* 设置 */}
                  { isShowSettingAlert && <ModalSetting/>}
                  {/* 推流 */}
                  { isShowStreamAlert && <LiveStreaming />}
              </div>
            }
            {/* 左上角延时显示 */}
            { cloudReady && <RttInfo />}
            {/* 局部视角 */}
            { (cloudReady && showAerialView && aerialViewCheck) && <AerialView /> }
            {/* 互动模式 */}
            <PlayerMode />
          </div>
        }
        

        {/* 通用 UI */}
        {/* 警告框 */}
        { modalAlert.show && <Alert/> }
        {/* 顶部提示框 */}
        { notify.show && <Notify />}
        {/* 浮动提示 */}
        { cloudReady && <Toast /> }
        {/* 确认框 */}
        { modalConfirm.show && <Confirm/> }
      </div>
    </>
  )
}

export default App
