export const RootGetters/*: GetterTree<RootState, RootState>*/ = {
    appliParams({ larksr }) {
        return larksr ? larksr.params : {};
    },
    container({ larksr }) {
        return larksr ? larksr.screenState.container : {
            marginTop: 0, marginLeft: 0, width: 1920, height: 1080
        };
    },
    appSize({ larksr }) {
        return larksr ? larksr.screenState.appSize : {
            width: 1920, height: 1080 
        };
    },
    operateScale({ larksr }) {
        return larksr ? larksr.screenState.operateScale : {
            scaleX: 1,
            scaleY: 1
        };
    },
    isChangedScaledMode({larksr}) {
        if (!larksr) {
            return false;
        }
        return larksr.screenState.scaleMode != larksr.params.scaleMode;
    },
    isFullScreen({ larksr }) {
        return larksr ? larksr.fullScreen.isFullScreen : false;
    },
    fullScreenBgStyle({ container, isFullScreen }) {
        if (isFullScreen) {
            ///TODO select pref margin border.
            if (container.marginTop > 0 && container.marginTop < 5) {
                return {
                    'background-color': '#000',
                };
            } else {
                return {
                    'background-color': '#fff',
                };
            }	
        } else {
            return {
                'background-color': '#fff',
            };
        }
    },
    screenOrientation({ larksr }) {
        return larksr ? larksr.screenState.screenOrientation : 'portrait';
    },
    viewPort({ larksr }) {
        return larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    },
    viewPortStyle({ larksr }) {
        return larksr ? larksr.screenState.viewPortStyle : "";
    },
    isLockMouse({ larksr }) {
        return larksr ? larksr.lockPointer.isLockPointer : false;
    },
    mobilePixelUnit({ larksr }) {
        return larksr ? larksr.screenState.viewPort.width / 100 : 1920 / 100;
    },
    rttLimit({ larksr }) {
        return larksr ? larksr.params.rttLimit : 30;
    },
    isFlipMouseWheel({ larksr }) {
        return larksr.mouseZoomDirection === 1? true : false;
    },
    initCursorMode({ larksr }) {
        return larksr ? larksr.initCursorMode : false;
    }
}

export default RootGetters;