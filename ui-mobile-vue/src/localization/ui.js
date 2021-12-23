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
    get buttonCancle() { return this.getButton('buttonCancle'); }
    get buttonInput() { return this.getButton('buttonInput'); }
    get buttonClose() { return this.getButton('buttonClose'); }
    get buttonBack() { return this.getButton('buttonBack'); }
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
}