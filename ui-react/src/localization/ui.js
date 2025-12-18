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
    getVrAppliMsg(name) {
        if (this.mLoaded) {
            return this.mData.message.vrAppli[name];
        }
        return '';
    }

    getMessage(name) {
        if (this.mLoaded) {
            return this.mData.message[name];
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

    get requireAuthCode() { return this.getButton('requireAuthCode'); }

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
    get avgDecodeDelay() { return this.getButton('avgDecodeDelay'); }
    get avgProcessDelay() { return this.getButton('avgProcessDelay'); }
    get serverStaticsRenderDelay() { return this.getButton('serverStaticsRenderDelay'); }
    get serverStaticsCaptureDelay() { return this.getButton('serverStaticsCaptureDelay'); }
    get serverStaticsEncoderDelay() { return this.getButton('serverStaticsEncoderDelay'); }

    get audioDevice() { return this.getButton('audioDevice'); }
    get videoDevice() { return this.getButton('videoDevice'); }

    get inputText() { return this.getButton('inputText'); }
    get inputbuttonText() { return this.getButton('inputbuttonText'); }
    get inputbuttonVKeyboard() { return this.getButton('inputbuttonVKeyboard'); }

    get aerial() {return this.getButton('aerial'); }
    get openAerial() {return this.getButton('openAerial'); }
    get closeAerial() {return this.getButton('closeAerial'); }
    get hideAerial() {return this.getButton('hideAerial'); }

    get resolutions() {return this.getButton('resolutions'); }
    get restartTitle() {return this.getButton('restartTitle'); }
    get restartButton() {return this.getButton('restartButton'); }
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
    get playerCopyAuthCodeSuccess() { return this.getNotice('playerCopyAuthCodeSuccess'); }
    get playerCopyAuthCodeFailed() { return this.getNotice('playerCopyAuthCodeFailed'); }

    get audioUseHttps() { return this.getNotice('audioUseHttps'); }
    get videoUseHttps() { return this.getNotice('videoUseHttps'); }

    get enableAudio() { return this.getNotice('enableAudio'); }

    get systemIsBusy() {
        return this.getNotice('systemIsBusy');
    }


    //new ui

    get prodType2() {
        return this.getVrAppliMsg('prodType2');
    }

    get prodType3() {
        return this.getVrAppliMsg('prodType3');
    }

    get prodType14() {
        return this.getVrAppliMsg('prodType14');
    }

    get prodType4() {
        return this.getVrAppliMsg('prodType4');
    }

    get prodType5() {
        return this.getVrAppliMsg('prodType5');
    }

    get prodType6() {
        return this.getVrAppliMsg('prodType6');
    }

    get prodType7() {
        return this.getVrAppliMsg('prodType7');
    }

    get prodType8() {
        return this.getVrAppliMsg('prodType8');
    }

    get prodType9() {
        return this.getVrAppliMsg('prodType9');
    }

    get prodType15() {
        return this.getVrAppliMsg('prodType15');
    }

    get prodType16() {
        return this.getVrAppliMsg('prodType16');
    }

    get enterAppli() {
        return this.getVrAppliMsg('enterAppli');
    }

    get frameRate() {
        return this.getVrAppliMsg('frameRate');
    }

    get random() {
        return this.getVrAppliMsg('random');
    }

    get netDelay() {
        return this.getVrAppliMsg('netDelay');
    }

    get codeRate() {
        return this.getVrAppliMsg('codeRate');
    }

    get dynamic() {
        return this.getVrAppliMsg('dynamic');
    }

    get browserCheckMsg() {
        return this.getVrAppliMsg('browserCHeckMsg');
    }

    get appliPlayerMode() {
        return this.getVrAppliMsg('appliPlayerMode');
    }

    get presentationMode() {
        return this.getVrAppliMsg('presentationMode');
    }

    get observerMode() {
        return this.getVrAppliMsg('observerMode');
    }

    get authCode() {
        return this.getVrAppliMsg('authCode');
    }

    get createAuthCode() {
        return this.getVrAppliMsg('createAuthCode');
    }

    get nickname() {
        return this.getVrAppliMsg('nickname');
    }

    get secretType() {
        return this.getVrAppliMsg('secretType');
    }

    get copy() {
        return this.getVrAppliMsg('copy');
    }

    get role() {
        return this.getVrAppliMsg('role');
    }

    get copySuccess() {
        return this.getVrAppliMsg('copySuccess');
    }

    get errMsg() {
        return this.getVrAppliMsg('errMsg');
    }

    get clientMultiInstanceCntTip() {
        return this.getVrAppliMsg('clientMultiInstanceCntTip');
    }

    get quit() {
        return this.getVrAppliMsg('quit');
    }

    get quitTip() {
        return this.getVrAppliMsg('quit');
    }

    get help() {
        return this.getVrAppliMsg('help');
    }

    get setting() {
        return this.getVrAppliMsg('setting');
    }

    get viewTab() {
        return this.getVrAppliMsg('viewTab');
    }

    get network() {
        return this.getVrAppliMsg('network');
    }

    get fullScreenExit() {
        return this.getVrAppliMsg('fullScreenExit');
    }

    get liveStream() {
        return this.getVrAppliMsg('liveStream');
    }

    get voiceChat() {
        return this.getVrAppliMsg('voiceChat');
    }

    get mic() {
        return this.getVrAppliMsg('mic');
    }

    get camera() {
        return this.getVrAppliMsg('camera');
    }

    get restart() {
        return this.getVrAppliMsg('restart');
    }

    get restartTip() {
        return this.getVrAppliMsg('restartTip');
    }

    get liveStreamTip() {
        return this.getVrAppliMsg('liveStreamTip');
    }

    get liveStreamPrepare() {
        return this.getVrAppliMsg('liveStreamPrepare');
    }

    get aerialViewTitle() {
        return this.getVrAppliMsg('aerialViewTitle');
    }

    get restartAppliTip() {
        return this.getVrAppliMsg('restartAppliTip');
    }

    get selectMic() {
        return this.getVrAppliMsg('selectMic');
    }

    get selectCamera() {
        return this.getVrAppliMsg('selectCamera');
    }

    get showPlayerList() {
        return this.getVrAppliMsg('showPlayerList');
    }

    get showPlayerTitle() {
        return this.getVrAppliMsg('showPlayerTitle');
    }

    get tip() {
        return this.getVrAppliMsg('tip');
    }

    get nothing() {
        return this.getVrAppliMsg('nothing');
    }

    get mouse() {
        return this.getVrAppliMsg('mouse');
    }

    get quality() {
        return this.getVrAppliMsg('quality');
    }

    get quality1() {
        return this.getVrAppliMsg('quality1');
    }

    get quality2() {
        return this.getVrAppliMsg('quality2');
    }

    get quality3() {
        return this.getVrAppliMsg('quality3');
    }

    get quality4() {
        return this.getVrAppliMsg('quality4');
    }

    get custom() {
        return this.getVrAppliMsg('custom');
    }

    get ratio() {
        return this.getVrAppliMsg('ratio');
    }

    get aerialMode() {
        return this.getVrAppliMsg('aerialMode');
    }

    get showAerialModeSelect() {
        return this.getVrAppliMsg('showAeriaModeSelect');
    }

    get aerialSelectBoxScale() {
        return this.getVrAppliMsg('aeriaSelectBoxScale');
    }

    get frameRateSet() {
        return this.getVrAppliMsg('frameRateSet');
    }

    get codeRateSet() {
        return this.getVrAppliMsg('codeRateSet');
    }

    get mouseLeft() {
        return this.getVrAppliMsg('mouseLeft');
    }
    get mouseMid() {
        return this.getVrAppliMsg('mouseMid');
    }
    get mouseRight() {
        return this.getVrAppliMsg('mouseRight');
    }

    get touchMode() {
        return this.getVrAppliMsg('touchMode');
    }

    get cameraFront() {
        return this.getVrAppliMsg('cameraFront');
    }

    get cameraBack() {
        return this.getVrAppliMsg('cameraBack');
    }

    get unlock() {
        return this.getVrAppliMsg('unlock');
    }

    get restartAppli() {
        return this.getVrAppliMsg('restartAppli');
    }

    get close() {
        return this.getVrAppliMsg('close');
    }

    get touch() {
        return this.getVrAppliMsg('touch');
    }

    get keyboard() {
        return this.getVrAppliMsg('keyboard');
    }

    get joystick() {
        return this.getVrAppliMsg('joystick');
    }

    get tools() {
        return this.getVrAppliMsg('tools');
    }

    get mouseLeftKey() {
        return this.getVrAppliMsg('mouseLeftKey');
    }

    get mouseMidKey() {
        return this.getVrAppliMsg('mouseMidKey');
    }

    get mouseRightKey() {
        return this.getVrAppliMsg('mouseRightKey');
    }

    get helpTitle1() {
        return this.getVrAppliMsg('helpTitle1');
    }

    get helpContent1() {
        return this.getVrAppliMsg('helpContent1');
    }

    get helpTitle2() {
        return this.getVrAppliMsg('helpTitle2');
    }

    get helpContent2() {
        return this.getVrAppliMsg('helpContent2');
    }

    get helpTitle3() {
        return this.getVrAppliMsg('helpTitle3');
    }

    get helpContent3() {
        return this.getVrAppliMsg('helpContent3');
    }

    get helpTitle4() {
        return this.getVrAppliMsg('helpTitle4');
    }

    get helpContent4() {
        return this.getVrAppliMsg('helpContent4');
    }

    get chineseInput() {
        return this.getVrAppliMsg('chineseInput');
    }

    get disableChineseInput() {
        return this.getVrAppliMsg('disableChineseInput');
    }
}



