<template>
    <div :class="playerModeClass" :style="alertPositionStyle">
        <div :class="{'windowBar': true, 'windowBar-hide': !showPlayerBox}">
            <div class="authCode">
                <template v-if="playerModeStore.authCode">
                    <input type="text" id="authCode" :value="playerModeStore.authCode" readonly="true" />
                    <i class="iconfont" ref="copyAuthcodeButtonRef" data-clipboard-target="#authCode">&#xe61b;</i>
                </template>
                <template v-else>
                    <span>{{ ui.showPlayerTtile }}</span>
                </template>
                <i v-if="showShareBtn" style="margin-left: 1rem;" class="iconfont" ref="copyBtnRef" data-clipboard-target="#shareUrl">&#xe621;</i>
            </div>
            <div class="close">
                <el-icon v-if="commStore.isMobile && showPlayerBox" class="flod-icon" @click="showPlayerBox = !showPlayerBox"><ArrowDown /></el-icon>
                <el-icon v-if="commStore.isMobile && !showPlayerBox" class="flod-icon" @click="showPlayerBox = !showPlayerBox"><ArrowUp /></el-icon>
                <el-icon @click="onClose"><Close /></el-icon>
            </div>
        </div>
        <div v-show="showPlayerBox" class="player-box">
            <div class="player-row">
                <span class="number">{{ ui.playerNumber }}</span>
                <span class="nickname">{{ ui.playerNickname }}</span>
                <span class="role">{{ ui.playerRole }}</span>
                <span class="authority">{{ ui.playerAuthority }}</span>
            </div>
            <div :class="{'player-row': true, 'check-color':item.isCurrent }"  v-for="(item, index) in playerModeStore.playerList" :key="index" v-on:click="onSelectItem(index)">
                <span class="number">{{item.userId}}</span>
                <span class="nickname">{{item.nickName}}</span>
                <span class="role">
                    <i v-if="item.isTaskOwner" class="iconfont icon-guanliyuan"></i>
                    <i v-else class="iconfont icon-yonghu"></i>
                </span>
                <span class="authority">
                    <i v-if="item.userType == 1" class="iconfont icon-Touch"></i>
                </span>
            </div>
            <input style="opacity: 0;z-index: -1;" type="text" id="shareUrl" :value="shareUrl" readonly="true">
        </div>

    </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import { PlayerModeType, UserType, usePlayerModeStore  } from '@/stores/player_mode.js'
import { useToastStore } from '@/stores/toast.js'
import Log from '@/utils/log';
import clipboard from 'clipboard';
import Load from '@/load';

const commStore = useCommStore();
const playerModeStore = usePlayerModeStore();
const toastStore = useToastStore();

const copyAuthCodeBtn = ref(null);
const copyBtn = ref(null);
const showShare = ref(false);
const showPlayerBox = ref(true);

const showShareBtn = computed(() => {
    // if (this.playerMode.shareUrl && Unit.queryString('timestamp')=='') {
    return true;
        // } else {
        //     return false
        // }
})

const larksr = computed(() => commStore.larksr);
const ui = computed(() => commStore.ui);
const playerMode = computed(() => commStore.playerMode);


const alertPositionStyle = computed(() =>{
    if(commStore.isMobile) {
        return {
            top: '10%',
            // transform: 'translateY(-50%)',
            left: '1.89rem'
        }
    } else {
        return {
            top: '75px',
            right: '20px',
            // position: 'absolute'
        }
    }
})

const isInteractiveMode = computed(() => {
    return larksr.value?.isInteractiveMode;
});
const isPlayer = computed(() => {
    return playerMode.value.userType == UserType.Player;
});
const playerModeStr = computed(() => {
    return isInteractiveMode.value ?
        ui.value.playerModeInteractive :
        ui.value.playerModeNormal;
});
const userTypeStr = computed(() => {
    return isPlayer.value ?
        ui.value.userTypePlayer :
        ui.value.userTypeObserver;
});
const isTaskOwner = computed(() => {
    return playerMode.value.isTaskOwner;
});
const taskOwnerStr = computed(() => {
    // return "管理员";
    return isTaskOwner.value ? ui.value.playerOwner : "";
});
const copyShareAuthCodeText = computed(() => {
    return playerMode.value.authCode ? ui.value.playerCopy : "";
});
const shareUrl = computed(() => {
    if (!larksr.value) {
        return "";
    }
    const { params } = larksr.value;
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
    return shareUrl;
});
const playerModeClass = computed(() => {
    if (playerModeStore.showPlayerList && isInteractiveMode.value) {
        return "playerMode mobile";
    } else {
        return "playerMode hide";
    }
})

// 方法
const onSelectItem = (index) => {
    const player = playerMode.value.playerList[index];
    Log.info('onSelectItem', index, player);
    if (playerMode.value.playerModeType == PlayerModeType.MutiPlayer) {
        Log.info("MutiPlayer mode no change.");
        return;
    }
    if (!isTaskOwner.value) {
        toastStore.toastAct( {text: ui.value.playerNotOwner, position: 2});
    } else {
        if (player.userType == UserType.Player) {
            toastStore.toastAct( {text: ui.value.playerAlready, position: 2});
        } else {
            toastStore.toastAct( {text: ui.value.playerChanging, position: 2});
            if (larksr.value) {
                larksr.value.changeOperater(player.userId);
            }
        }
    }
};
const toggleShareButton = () => {
    showShare.value = !showShare.value;
};
const onClose = () => {
    Log.info('onClose');
    playerModeStore.setShowPlayerList(false);
};

const copyBtnRef = ref(null);
const copyAuthcodeButtonRef = ref(null);
onMounted(() => {
    console.log(commStore.playerMode, 'ffff')
    Log.info('clipboard', clipboard);
    Log.info('show player mode', playerMode.value);
    if (isPlayer.value) {
        Log.info("is player. set share href to ob.");
    }

    // init share button
    if (!copyBtn.value) {
        if (copyBtnRef.value) {
            copyBtn.value = new clipboard(copyBtnRef.value);
        }
        Log.info("copy btn ", copyBtn.value, copyBtnRef.value,  shareUrl.value);
        if (copyBtn.value) {
            copyBtn.value.on('success', (e) => {
                Log.info("copy ", e.text);
                e.clearSelection();
                toastStore.toastAct( {text: ui.value.playerCopyShareUrl, position: 2});
            });

            copyBtn.value.on('error', (e) => {
                toastStore.toastAct( {text: ui.value.playerCopyShareUrlFailed, position: 2});
            });
        }
    }

    // copy authCode
    if (!copyAuthCodeBtn.value) {
        if (copyAuthcodeButtonRef.value) {
            copyAuthCodeBtn.value = new clipboard(copyAuthcodeButtonRef.value);
        }
        Log.info("copy room code btn ", copyAuthCodeBtn.value, copyAuthcodeButtonRef.value, playerMode.value.authCode);
        if (copyAuthCodeBtn.value) {
            copyAuthCodeBtn.value.on('success', (e) => {
                Log.info("copy ", e.text, e);
                e.clearSelection();
                toastStore.toastAct( {text: ui.value.playerCopyAuthCodeSuccess, position: 2});
            });

            copyAuthCodeBtn.value.on('error', (e) => {
                toastStore.toastAct( {text: ui.value.playerCopyAuthCodeFailed, position: 2});
            });
        }
    }
})

onUnmounted(() => {
    copyAuthCodeBtn.value = null;
    copyBtn.value = null;
})
</script>
<style lang="scss" scoped>
@import 'player_mode.scss';
</style>
