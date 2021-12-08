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
    screenOrientation({ larksr }) {
        return larksr ? larksr.screenState.screenOrientation : 'portrait';
    },
    viewPort({ larksr }) {
        return larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    },
    viewPortStyle({ larksr }) {
        return larksr ? larksr.screenState.viewPortStyle : "";
    },
    isFullScreen({ larksr }) {
        return larksr ? larksr.fullScreen.isFullScreen : false;
    }
}

export default RootGetters;