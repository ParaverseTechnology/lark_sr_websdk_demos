<template>
    <div :class="playerModeClass">
        <div class="windowBar">
            <div class="authCode">
                <input type="text" id="authCode" :value="playerMode.authCode" readonly="true" />
                <span ref="copy-authcode-button" class="copy-authcode-button" data-clipboard-target="#authCode">{{copyShareAuthCodeText}}</span>
            </div>
            <div class="closeBtn" v-on:click="onClose">
                <img :src="imgSrc.CLOSE" alt="">
            </div>
        </div>
        <div class="player-row">
            <span class="number">{{ this.ui.playerNumber }}</span>
            <span class="nickname">{{ this.ui.playerNickname }}</span>
            <span class="role">{{ this.ui.playerRole }}</span>
            <span class="authority">{{ this.ui.playerAuthority }}</span>
        </div>
        <div class="player-row" v-for="(item, index) in playerMode.playerList" :key="index" v-on:click="onSelectItem(index)">
            <span class="number">{{item.userId}}</span>
            <span class="nickname">{{item.nickName}}</span>
            <span class="role">
                <img v-if="item.isTaskOwner" :src="imgSrc.ADMIN" alt="">
                <img v-else :src="imgSrc.USER" alt="">
                <img v-if="item.isCurrent" :src="imgSrc.ME" alt="">
            </span>
            <span class="authority">
                <img v-if="item.userType == 1" :src="imgSrc.OPERATER" alt="">
            </span>
        </div>
        <div :style="shareStyle">
            <div class="share" :style="shareButtonStyle">
                <input type="text" id="shareUrl" :value="shareUrl" readonly="true">
                <button ref="copyBtn" data-clipboard-target="#shareUrl" class="shareButton">{{ this.ui.playerShare }}</button>
            </div>
            <div class="shareToggleButton" v-on:click="toggleShareButton">
                {{shareText}}
            </div>
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
import Unit                          from "@/utils/unit";
import store                         from "@/store";

export default {
    components: {
    },
    data() {
        return {
            copyAuthCodeBtn: null,
            copyBtn: null,
            imgSrc: {
                ADMIN               : require('@/assets/img/admin.png'),
                ME                  : require('@/assets/img/me.png'),
                USER                : require('@/assets/img/user.png'),
                OPERATER            : require('@/assets/img/operate.png'),
                CLOSE               : require('@/assets/img/close_white.svg'),
            },
            showShare: false,
        }
    },
    computed: {
        shareStyle() {
            if (this.playerMode.shareUrl && Unit.queryString('timestamp')=='') {
                return {};
            } else {
                return {
                    top: "-999px",
                    left: "-999px",
                    position: "absolute",
                };
            }
        },
        shareButtonStyle() {
            if (this.showShare) {
                return {};
            } else {
                return {
                    top: "-999px",
                    left: "-999px",
                    position: "absolute",
                };
            }
        },
        shareText() {
            return this.showShare ? "hide share" : "share";
        },
        playerModeClass() {
            // Log.info("playerModeClass", this.playerMode, this.isInteractiveMode, this.larksr);
            // return this.isMobile ? "playerMode mobile" : "playerMode";
            if (this.playerMode.showPlayerList && this.isInteractiveMode) {
                return "playerMode mobile";
            } else {
                return "playerMode hide";
            }
            // return "playerMode";
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
            Log.info("larksr params", params);
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
