<template>
    <div :class="playerModeClass" :style="alertPositionStyle">
        <div class="windowBar">
            <div class="authCode">
                <template v-if="playerMode.authCode">
                    <input type="text" id="authCode" :value="playerMode.authCode" readonly="true" />
                    <i class="iconfont" ref="copy-authcode-button" data-clipboard-target="#authCode">&#xe61b;</i>
                </template>
                <template v-else>
                    <span>玩家列表</span>
                </template>
                <i v-if="showShareBtn" style="margin-left: 1rem;" class="iconfont" ref="copyBtn" data-clipboard-target="#shareUrl">&#xe621;</i>
            </div>
            <div class="close" @click="onClose">
                <i class="el-icon-close"></i>
            </div>
        </div>
        <div class="player-box">
            <div class="player-row">
                <span class="number">{{ ui.playerNumber }}</span>
                <span class="nickname">{{ ui.playerNickname }}</span>
                <span class="role">{{ ui.playerRole }}</span>
                <span class="authority">{{ ui.playerAuthority }}</span>
            </div>
            <div :class="{'player-row': true, 'check-color':item.isCurrent }"  v-for="(item, index) in playerMode.playerList" :key="index" v-on:click="onSelectItem(index)">
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
<script>
import { 
    mapState,
    mapActions, mapMutations
}                                    from 'vuex'
import { 
    PlayerModeType, 
    UserType 
}                                    from '@/store/modules/player_mode'
import Log                           from '@/utils/log';
import clipboard                     from 'clipboard'; 
import Load                          from '@/load';

export default {
    data() {
        return {
            copyAuthCodeBtn: null,
            copyBtn: null,
            showShare: false,
            
        }
    },
    computed: {
        showShareBtn() {
            // if (this.playerMode.shareUrl && Unit.queryString('timestamp')=='') {
                return true;
            // } else {
            //     return false
            // }
        },
        alertPositionStyle() {
            if(this.isMobile) {
                return {
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: '1.89rem'
                }
            } else {
                return {
                    top: '75px',
                    right: '20px',
                    // position: 'absolute'
                }
            }
        },
        playerModeClass() {
            // Log.info("playerModeClass", this.playerMode, this.isInteractiveMode, this.larksr);
            if (this.playerMode.showPlayerList && this.isInteractiveMode) {
                return "playerMode mobile";
            } else {
                return "playerMode hide";
            }
        },
        isInteractiveMode() {
            return this.larksr?.isInteractiveMode;
        },
        isPlayer() {
            return this.playerMode.userType == UserType.Player;
        },
        playerModeStr() {
            return this.isInteractiveMode ?
                this.ui.playerModeInteractive : 
                this.ui.playerModeNormal;
        },
        userTypeStr() {
            return this.isPlayer ? 
                this.ui.userTypePlayer : 
                this.ui.userTypeObserver;
        },
        isTaskOwner() {
            return this.playerMode.isTaskOwner;
        },
        taskOwnerStr() {
            // return "管理员";
            return this.isTaskOwner ? this.ui.playerOwner : "";
        },
        copyShareAuthCodeText() {
            return this.playerMode.authCode ? this.ui.playerCopy : "";
        },
        shareUrl() {
            if (!this.larksr) {
                return "";
            }
            const { params } = this.larksr;
            let path = process.env.NODE_ENV === "development"? '/webclient': '/webclient/' ;
            // Log.info("larksr params", params);
            let shareUrl = "";
            // this.shareUrl = window.location.href.replace(/userType=[0-1]/, (match) => {
            //     Log.info("type match", match); 
            //     return "userType=0";
            // });
            // this.shareUrl = this.shareUrl.replace(/(^|&)nickName=([^&]*)(&|$)/, (match) => {
            //     Log.info("nick name match", match);
            //     return "&";
            // });
            // 防止刷新url
            const urlBase = process.env.NODE_ENV === 'production' ? window.location.origin : process.env.VUE_APP_API_URL;
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
        },
        ...mapState({
            larksr: state => state.larksr,
            isMobile: state => state.isMobile,
            ui: state => state.ui,
            playerMode: state => state.playerMode,
        })
    },
    methods: {
        onSelectItem(index) {
            const player = this.playerMode.playerList[index];
            Log.info('onSelectItem', index, player);
            if (this.playerMode.playerModeType == PlayerModeType.MutiPlayer) {
                Log.info("MutiPlayer mode no change.");
                return;
            }
            if (!this.isTaskOwner) {
                this.toast({text: this.ui.playerNotOwner, position: 2});
            } else {
                if (player.userType == UserType.Player) {
                    this.toast({text: this.ui.playerAlready, position: 2});
                } else {
                    this.toast({text: this.ui.playerChanging, position: 2});
                    if (this.larksr) {
                        this.larksr.changeOperater(player.userId);
                    }
                }
            }
        },
        toggleShareButton() {
            this.showShare = !this.showShare;  
        },
        onClose() {
            Log.info('onClose');
            this.setShowPlayerList(false);
        },
        ...mapMutations({
            'setShowPlayerList': 'playerMode/setShowPlayerList',
        }),
        ...mapActions({
            'toast': 'toast/toast',
            'notify': 'notifyBar/notify',
            'showInfo': 'settingInfoPannel/showInfo',
            'closeInfo': 'settingInfoPannel/closeInfo',
            'alert': 'modalAlert/showModalAlert',
            'confirm': 'modalConfirm/showModalConfirm',
        }),
    },
    mounted() {
        Log.info('clipboard', clipboard);
        Log.info('show player mode', this.playerMode);
        if (this.isPlayer) {
            Log.info("is player. set share href to ob.");
        }

        // init share button
        if (!this.copyBtn) {
            if (this.$refs['copyBtn']) {
                this.copyBtn = new clipboard(this.$refs['copyBtn']);
            }
            Log.info("copy btn ", this.copyBtn, this.$refs['copyBtn'], this.$refs, this.shareUrl);
            if (this.copyBtn) {
                this.copyBtn.on('success', (e) => {
                    Log.info("copy ", e.text);
                    e.clearSelection();
                    this.toast({text: this.ui.playerCopyShareUrl, position: 2});
                });

                this.copyBtn.on('error', (e) => {
                    this.toast({text: this.ui.playerCopyShareUrlFailed, position: 2});
                });
            }
        }

        // copy room coe
        if (!this.copyAuthCodeBtn) {
            if (this.$refs['copy-authcode-button']) {
                this.copyAuthCodeBtn = new clipboard(this.$refs['copy-authcode-button']);
            }
            Log.info("copy room code btn ", this.copyAuthCodeBtn, this.$refs['copy-authcode-button'], this.$refs, this.playerMode.authCode);
            if (this.copyAuthCodeBtn) {
                this.copyAuthCodeBtn.on('success', (e) => {
                    Log.info("copy ", e.text, e);
                    e.clearSelection();
                    this.toast({text: this.ui.playerCopyAuthCodeSuccess, position: 2});
                });

                this.copyAuthCodeBtn.on('error', (e) => {
                    this.toast({text: this.ui.playerCopyAuthCodeFailed, position: 2});
                });
            }
        }
    },
    beforeDestroy() {
        this.copyAuthCodeBtn = null;
        this.copyBtn = null;
    }
}
</script>
<style lang="scss" scoped>
@import 'player_mode.scss';
</style>
