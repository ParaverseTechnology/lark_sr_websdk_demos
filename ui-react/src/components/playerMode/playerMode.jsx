import './playerMode.scss';
import { PlayerModeType, UserType, setShowPlayerList } from '../../store/modules/playerMode';
import { useEffect, useRef, useState } from 'react';
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Load from '@/load';
import Log from '@/utils/log';
import clipboard from 'clipboard';

export default function PlayerMode() {
  const dispatch = useDispatch();
  
  const larksr = useSelector(state => state.comm.larksr);
  const ui = useSelector(state => state.comm.ui);
  const isMobile = useSelector(state => state.comm.isMobile);
  const playerMode = useSelector(state => state.comm.playerMode);

  const [copyAuthCodeBtn, setCopyAuthCodeBtn] = useState(null);
  const [copyBtn, setCopyBtn] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [showPlayerBox, setShowPlayerBox] = useState(true);

  const showShareBtn = true;
  const [alertPositionStyle, setAlertPositionStyle] = useState({});
  useEffect(() => {
    if(isMobile) {
      setAlertPositionStyle({
        top: '10%',
        // transform: 'translateY(-50%)',
        left: '1.89rem'
      });
  } else {
    setAlertPositionStyle({
      top: '75px',
      right: '20px',
      // position: 'absolute'
    })
  }
  }, [isMobile]);

  const [isInteractiveMode, setIsInteractiveMode] = useState(null);
  const [isPlayer, setIsPlayer] = useState(false);
  const [isTaskOwner, setIsTaskOwner] = useState(false);
  const [copyShareAuthCodeText, setCopyShareAuthCodeText] = useState('');

  useEffect(() => {
    setIsPlayer(playerMode.userType == UserType.Player);
    setIsTaskOwner(playerMode.isTaskOwner);
    setCopyShareAuthCodeText(playerMode.authCode ? ui.playerCopy : "");
  }, [playerMode])

  useEffect(() => {
    setIsInteractiveMode(larksr?.isInteractiveMode)
  }, [larksr]);

  const [playerModeStr, setPlayerModeStr] = useState('');
  useEffect(() => {
    setPlayerModeStr(isInteractiveMode ? ui.playerModeInteractive : ui.playerModeNormal)
  }, [isInteractiveMode]);

  const [userTypeStr, setUserTypeStr] = useState('');
  useEffect(() => {
    setUserTypeStr(isPlayer ? ui.userTypePlayer : ui.userTypeObserver)
  }, [isPlayer]);

  const [taskOwnerStr, setTaskOwnerStr] = useState('');
  useEffect(() => {
    setTaskOwnerStr(isTaskOwner ? ui.playerOwner : "")
  }, [isTaskOwner]);

  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    if (!larksr) {
      return "";
    }
    const { params } = larksr;
    let path = import.meta.env.MODE === "dev"? '/webclient': '/webclient/' ;
    // Log.info("larksr params", params);
    let shareUrl = "";

    // 防止刷新url
    const urlBase = import.meta.env.MODE === 'prod' ? window.location.origin : import.meta.env.VITE_APP_API_URL;
    let searchUrl = "";

    searchUrl += "appliId=" + params.appliId + "&";

    if (params.authCode && params.authCode != 'null') {
        searchUrl += "authCode=" + params.authCode + "&";
    } else if (Load.authCode && Load.authCode != 'null') {
        searchUrl += "authCode=" + Load.authCode + "&";
    } else {
        searchUrl += "taskId=" + params.taskid + "&";
    }

    searchUrl += "codeRate=" + params.codeRate + "&";
    searchUrl += "frameRate=" + params.frameRate + "&";

    if (params.groupId && params.groupId != 'null') {
        searchUrl += "groupId=" + params.groupId + "&";
    }
    if (Load.accessType && Load.accessType != '') {
        searchUrl += "accessType=" + Load.accessType + "&";
    }
    if (Load.shareId && Load.shareId != '') {
        searchUrl += "shareId=" + Load.shareId + "&";
    }


    searchUrl += "wsProxy=" + params.wsProxy + "&";
    // only ob
    searchUrl += "playerMode=" + params.playerMode + "&userType=0";

    shareUrl = urlBase + path + "?" + searchUrl;

    // Log.info("share url", shareUrl);
    setShareUrl(searchUrl);
  }, [larksr]);

  const [playerModeClass, setPlayerModeClass] = useState('');
  const showPlayerList = useSelector(state => state.playerMode.showPlayerList);
  useEffect(() => {
    if (showPlayerList && isInteractiveMode) {
      setPlayerModeClass("playerMode mobile");
  } else {
    setPlayerModeClass("playerMode hide");
  }
  }, [showPlayerList, isInteractiveMode]);

  const authCode = useSelector(state => state.playerMode.authCode);
  const playerList = useSelector(state => state.playerMode.playerList);
  const copyAuthcodeButtonRef = useRef(null);
  const copyBtnRef = useRef(null);

  const onClose = () => {
    Log.info('onClose');
    dispatch(setShowPlayerList(false));
  };

  // 方法
  const onSelectItem = (index) => {
    const player = playerMode.playerList[index];
    Log.info('onSelectItem', index, player);
    if (playerMode.playerModeType == PlayerModeType.MutiPlayer) {
        Log.info("MutiPlayer mode no change.");
        return;
    }
    if (!isTaskOwner) {
        dispatch(toastAct( {text: ui.playerNotOwner, position: 2}));
    } else {
        if (player.userType == UserType.Player) {
          dispatch(toastAct( {text: ui.playerAlready, position: 2}));
        } else {
          dispatch(toastAct( {text: ui.playerChanging, position: 2}));
            if (larksr) {
                larksr.changeOperater(player.userId);
            }
        }
    }
  };
  // const toggleShareButton = () => {
  //   showShare = !showShare;
  // };

  useEffect(() => {
    Log.info('clipboard', clipboard);
    Log.info('show player mode', playerMode);
    if (isPlayer) {
        Log.info("is player. set share href to ob.");
    }

    // init share button
    if (!copyBtn) {
        if (copyBtnRef.current) {
          setCopyBtn(new clipboard(copyBtnRef.current))
            // copyBtn = ;
        }
        Log.info("copy btn ", copyBtn, copyBtnRef.current,  shareUrl);
        if (copyBtn) {
            copyBtn.on('success', (e) => {
                Log.info("copy ", e.text);
                e.clearSelection();
                dispatch(toastAct( {text: ui.playerCopyShareUrl, position: 2}));
            });

            copyBtn.on('error', (e) => {
              dispatch(toastAct( {text: ui.playerCopyShareUrlFailed, position: 2}));
            });
        }
    }

    // copy authCode
    if (!copyAuthCodeBtn) {
        if (copyAuthcodeButtonRef.current) {
          setCopyAuthCodeBtn(new clipboard(copyAuthcodeButtonRef.current));
        }
        Log.info("copy room code btn ", copyAuthCodeBtn, copyAuthcodeButtonRef.current, playerMode.authCode);
        if (copyAuthCodeBtn) {
            copyAuthCodeBtn.on('success', (e) => {
                Log.info("copy ", e.text, e);
                e.clearSelection();
                dispatch(toastAct( {text: ui.playerCopyAuthCodeSuccess, position: 2}));
            });

            copyAuthCodeBtn.on('error', (e) => {
              dispatch(toastAct( {text: ui.playerCopyAuthCodeFailed, position: 2}));
            });
        }
    }

    return() => {
      setCopyAuthCodeBtn(null);
      setCopyBtn(null);
    }
  }, []);

  return (
    <div className={playerModeClass} style={alertPositionStyle}>
        <div className={`windowBar${!showPlayerBox?' windowBar-hide': ''}`}>
            <div className="authCode">
              {
                authCode?
                <div>
                  <input type="text" id="authCode" value="authCode" readOnly={true} />
                  <i className="iconfont" ref={copyAuthcodeButtonRef} data-clipboard-target="#authCode">&#xe61b;</i>
                </div>
                :
                <span>{ ui.showPlayerTtile }</span>
              }
              { showShareBtn && <i style={{'marginLeft': '1rem'}} className="iconfont" ref={copyBtnRef} data-clipboard-target="#shareUrl">&#xe621;</i>}
                
            </div>
            <div className="close">
              { (isMobile && showPlayerBox) && <DownOutlined onClick={() => { setShowPlayerBox(!showPlayerBox); }} />}
              { (isMobile && !showPlayerBox) && <UpOutlined onClick={() => { setShowPlayerBox(!showPlayerBox); }} />}
              <CloseOutlined onClick={onClose} />
            </div>
        </div>
        {
          showPlayerBox &&
          <div className="player-box">
            <div className="player-row">
                <span className="number">{ ui.playerNumber }</span>
                <span className="nickname">{ ui.playerNickname }</span>
                <span className="role">{ ui.playerRole }</span>
                <span className="authority">{ ui.playerAuthority }</span>
            </div>
            {
              playerList.map((item, index) => {
                return <div className={`player-row${item.isCurrent?' check-color':'' }`}   key={index} onClick={() => onSelectItem(index)}>
                  <span className="number">{item.userId}</span>
                  <span className="nickname">{item.nickName}</span>
                  <span className="role">
                    {
                      isTaskOwner?
                      <i className="iconfont icon-guanliyuan"></i>:
                      <i className="iconfont icon-yonghu"></i>
                    }
                  </span>
                  <span className="authority">
                    { item.userType == 1 && <i className="iconfont icon-Touch"></i>}
                  </span>
              </div>
              })
            }
            
            <input style={{'opacity': 0,'zIndex': -1}} type="text" id="shareUrl" value={shareUrl} readOnly={true} />
        </div>
        }
        

    </div>
  )
}