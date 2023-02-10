import LocalizationBase from './base';

export default class UI extends LocalizationBase {
    constructor() {
        super();
        this.mType = 'ui';
    }
    
    getButton(name) {
        if (this.mLoaded) {
            return this.mData.button[name];
        } 
        return '';
    }
    getNotice(name) {
        if (this.mLoaded) {
            return this.mData.notice[name];
        } 
        return '';
    }
    /////////////////////////////////////////////
    // button
    get status() { return this.getButton('status'); }

    get mouseMode() { return this.getButton('mouseMode'); }

    get mouseModeAuto() { return this.getButton('mouseModeAuto'); }

    get mosueModeLock() { return this.getButton('mosueModeLock'); }

    get scale() { return this.getButton('scale'); }

    get scaleToNormal() { return this.getButton('scaleToNormal'); }

    get lock() { return this.getButton('lock');  }

    get fullScreen() { return this.getButton('fullScreen');  }

    get exit() { return this.getButton('exit');  }

    get setup() { return this.getButton('setup');  }

    get show() { return this.getButton('show');  }

    get hide() { return this.getButton('hide');  }

    get hideVMouse() { return this.getButton('hideVMouse');  }

    get showVMouse() { return this.getButton('showVMouse');  }

    get hideVKeyboard() { return this.getButton('hideVKeyboard');  }

    get showVKeyboard() { return this.getButton('showVKeyboard');  }
    // 一人操作多人看相关
    get playerMode() { return this.getButton('playerMode'); }

    get playerModeNormal() { return this.getButton('playerMode_Normal'); }

    get playerModeInteractive() { return this.getButton('playerMode_Interactive'); }

    get userType() { return this.getButton('userType'); }

    get userTypeObserver() { return this.getButton('userType_Observer'); }

    get userTypePlayer() { return this.getButton('userType_Player'); }

    get requireNickName() { return this.getButton('requireNickName'); }

    get requireInputChinese() { return this.getButton('requireInputChinese'); }

    get buttonSubmit() { return this.getButton('buttonSubmit'); }
    get buttonCancel() { return this.getButton('buttonCancel'); }
    get buttonInput() { return this.getButton('buttonInput'); }
    get buttonClose() { return this.getButton('buttonClose'); }
    get buttonBack() { return this.getButton('buttonBack'); }

    get chat() { return this.getButton('chat'); }
    get net() { return this.getButton('net'); }
    get scaleAuto() { return this.getButton('scaleAuto'); }
    get liveSetup() { return this.getButton('liveSetup'); }
    get liveUrl() { return this.getButton('liveUrl'); }
    get liveKey() { return this.getButton('liveKey'); }
    get liveBitrate() { return this.getButton('liveBitrate'); }
    get liveFPS() { return this.getButton('liveFPS'); }
    get liveRes() { return this.getButton('liveRes'); }
    get liveSubmit() { return this.getButton('liveSubmit'); }
    
    // menu
    get menu() { return this.getButton('menu'); } 
    get menuClose() { return this.getButton('menuClose'); } 
    get state() { return this.getButton('state'); } 
    get rtt() { return this.getButton('rtt'); } 
    get bitrate() { return this.getButton('bitrate'); } 
    get packetsLostPerc() { return this.getButton('packetsLostPerc'); } 
    get aiVoice() { return this.getButton('aiVoice'); } 
    get aiVoiceOpen() { return this.getButton('aiVoiceOpen'); } 
    get aiVoiceClose() { return this.getButton('aiVoiceClose'); } 
    get joystickButtons() { return this.getButton('joystickButtons'); } 
    get joystickButtonsAll() { return this.getButton('joystickButtonsAll'); } 
    get joystickButtonsDefault() { return this.getButton('joystickButtonsDefault'); } 
    get zoomOutGesture() { return this.getButton('zoomOutGesture'); } 
    get zoomOutGestureUp() { return this.getButton('zoomOutGestureUp'); } 
    get zoomOutGestureDown() { return this.getButton('zoomOutGestureDown'); } 
    get cursorMode() { return this.getButton('cursorMode'); } 
    get menuFullScreen() { return this.getButton('menuFullScreen'); } 
    get menuFullScreenOn() { return this.getButton('menuFullScreenOn'); } 
    get menuFullScreenOff() { return this.getButton('menuFullScreenOff'); } 
    get menuPlayerlist() { return this.getButton('menuPlayerlist'); } 
    get menuPlayerlistShow() { return this.getButton('menuPlayerlistShow'); } 
    get menuPlayerlistHide() { return this.getButton('menuPlayerlistHide'); } 
    get volume() { return this.getButton('volume'); } 
    get menuInput() { return this.getButton('menuInput'); } 
    get menuInputOpen() { return this.getButton('menuInputOpen'); } 
    get cipboardParse() { return this.getButton('cipboardParse'); } 
    get cipboardParseOn() { return this.getButton('cipboardParseOn'); } 
    get cipboardParseOff() { return this.getButton('cipboardParseOff'); } 

    // player
    get playerNumber() { return this.getButton('playerNumber'); } 
    get playerNickname() { return this.getButton('playerNickname'); } 
    get playerRole() { return this.getButton('playerRole'); } 
    get playerAuthority() { return this.getButton('playerAuthority'); } 
    get playerShare() { return this.getButton('playerShare'); } 
    get playerOwner() { return this.getButton('playerOwner'); } 
    get playerCopy() { return this.getButton('playerCopy'); } 

    // states
    get statusRes() { return this.getButton('statusRes'); } 
    get statusFps() { return this.getButton('statusFps'); } 
    get statusBiterate() { return this.getButton('statusBiterate'); } 
    get statusRtt() { return this.getButton('statusRtt'); } 
    get statusPackgeLost() { return this.getButton('statusPackgeLost'); } 

    get audioDevice() { return this.getButton('audioDevice'); } 
    get videoDevice() { return this.getButton('videoDevice'); } 

    get inputText() { return this.getButton('inputText'); } 
    get inputbuttonText() { return this.getButton('inputbuttonText'); } 
    get inputbuttonVKeyboard() { return this.getButton('inputbuttonVKeyboard'); } 

    ///////////////////////////////
    // notice
    get browserVersion() { return this.getNotice('browserVersion'); }

    get browserUnsupport() { return this.getNotice('browserUnsupport'); }

    get foundError() { return this.getNotice('foundError'); }

    get start() { return this.getNotice('start'); }

    get remainMin() { return this.getNotice('remainMin'); }

    get firstPersion() { return this.getNotice('firstPersion'); }

    get requestWebsite() { return this.getNotice('requestWebsite'); }

    get lockMouse() {  return this.getNotice('lockMouse'); }

    get hideControllerBar() { return this.getNotice('hideControllerBar'); }

    get hideControllerBarShotCut() { return this.getNotice('hideControllerBarShotCut'); }

    get showControllerBar() { return this.getNotice('showControllerBar'); }

    get showControllerBarShotCut() { return this.getNotice('showControllerBarShotCut'); }

    get releaseMouse() { return this.getNotice('releaseMouse'); }

    get badNetwork() { return this.getNotice('badNetwork'); }

    // app 载入状态
    get INITED() { return this.getNotice('INITED'); }
    get WEBSOCKET_CHANNEL_OPEN() { return this.getNotice('WEBSOCKET_CHANNEL_OPEN'); }
    get LOGIN_SUCCESS() { return this.getNotice('LOGIN_SUCCESS'); }
    get RTC_CONNECTED() { return this.getNotice('RTC_CONNECTED'); }
    get MEDIA_LOADED() { return this. getNotice('MEDIA_LOADED'); }
    //
    get SYNC_APP() { return this.getNotice('SYNC_APP'); }
    // 
    get RTC_RETRY() { return this.getNotice('RTC_RETRY'); }
    //
    get APP_RETRY() { return this.getNotice('APP_RETRY'); }
    //
    get APP_RETRY_CONFIRM() { return this.getNotice('APP_RETRY_CONFIRM'); }

    // playermode
    get playerNotOwner() { return this.getNotice('playerNotOwner'); }
    get playerAlready() { return this.getNotice('playerAlready'); }
    get playerChanging() { return this.getNotice('playerChanging'); }
    get playerCopyShareUrl() { return this.getNotice('playerCopyShareUrl'); }
    get playerCopyShareUrlFailed() { return this.getNotice('playerCopyShareUrlFailed'); }
    get playerCopyRoomCodeSuccess() { return this.getNotice('playerCopyRoomCodeSuccess'); }
    get playerCopyRoomCodeFailed() { return this.getNotice('playerCopyRoomCodeFailed'); }

    get audioUseHttps() { return this.getNotice('audioUseHttps'); }
    get videoUseHttps() { return this.getNotice('videoUseHttps'); }
    
    get enableAudio() { return this.getNotice('enableAudio'); }
}