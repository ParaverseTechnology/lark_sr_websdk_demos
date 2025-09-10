import Load from '@/load';
import Log from '@/utils/log';
import { defineStore } from 'pinia';
import { useCommStore } from './comm.js'

export const PlayerModeType = {
    // 普通模式
    Normal : 0,
    // 交互模式（可以一人操作多人看）
    Interactive : 1,
    // 多人互动模式 (多人可操作)
    MutiPlayer : 2,
}

export const UserType = {
    // 观看者
    Observer : 0,
    // 操作者
    Player : 1,
}

export const defautlPlayerMode/*: PlayerModeState*/ = {
    showPlayerList: true,
    playerModeType: PlayerModeType.Normal,
    userType: UserType.Player,
    userId: 0,
    nickName: "",
    isTaskOwner: false,
    authCode: 0,
    shareUrl: false,
    playerList: [
        // {
        //     isCurrent: false,
        //     userId: 123,
        //     nickName: "fffddd11111111dddddddddddd",
        //     isTaskOwner: true,
        //     userType: UserType.Player,
        // },
        // {
        //     isCurrent: false,
        //     userId: 124,
        //     nickName: "fff",
        //     isTaskOwner: false,
        //     userType: UserType.Player,
        // },
        // {
        //     isCurrent: true,
        //     userId: 124,
        //     nickName: "fff",
        //     isTaskOwner: false,
        //     userType: UserType.Observer,
        // },
        // {
        //     isCurrent: false,
        //     userId: 124,
        //     nickName: "fff",
        //     isTaskOwner: false,
        //     userType: UserType.Player,
        // },
        // {
        //     isCurrent: false,
        //     userId: 124,
        //     nickName: "fff",
        //     isTaskOwner: false,
        //     userType: UserType.Player,
        // },
    ],
}
export const usePlayerModeStore = defineStore('playerMode', {
    state: () => {
        return {
            showPlayerList: true,
            playerModeType: PlayerModeType.Normal,
            userType: UserType.Player,
            userId: 0,
            nickName: "",
            isTaskOwner: false,
            authCode: 0,
            shareUrl: false,
            playerList: [
                // {
                //     isCurrent: false,
                //     userId: 123,
                //     nickName: "fffddd11111111dddddddddddd",
                //     isTaskOwner: true,
                //     userType: UserType.Player,
                // },
                // {
                //     isCurrent: false,
                //     userId: 124,
                //     nickName: "fff",
                //     isTaskOwner: false,
                //     userType: UserType.Player,
                // },
                // {
                //     isCurrent: true,
                //     userId: 124,
                //     nickName: "fff",
                //     isTaskOwner: false,
                //     userType: UserType.Observer,
                // },
                // {
                //     isCurrent: false,
                //     userId: 124,
                //     nickName: "fff",
                //     isTaskOwner: false,
                //     userType: UserType.Player,
                // },
                // {
                //     isCurrent: false,
                //     userId: 124,
                //     nickName: "fff",
                //     isTaskOwner: false,
                //     userType: UserType.Player,
                // },
            ],
        }
    },
    getters: {
        // isObMode(state, getters, { larksr }) { 
        //     return larksr ? larksr.isObMode : false; 
        // },
        isInteractiveMode() { 
            const commStore = useCommStore();
            return commStore.larksr ? commStore.larksr.isInteractiveMode : false; 
        },
        // playerList() {
        //     return this.playerList
        // }
    },
    mutations: {
       
    },
    actions: {
        setShowPlayerList(show/*: boolean*/) {
            this.showPlayerList = show;
            Log.info("setShowPlayerList", show);
        },
        setPlayerModeType(type/*: PlayerModeType*/) {
            this.playerModeType = type;
        },
        setUserType(type/*: UserType*/) {
            this.userType = type;
        },
        setUserId(id/*: number*/) {
            this.userId = id;
        },
        setNickName(nickName/*: string*/) {
            this.nickName = nickName;
        },
        setIsTaskOwner(isOwner/*: boolean*/) {
            this.isTaskOwner = isOwner;
        },
        setIsController(isController/*: boolean*/) {
            this.userType = isController ? UserType.Player : UserType.Observer;
        },
        setAuthCode(authCode) {
            this.authCode = authCode;
        },
        setPlayerList(playerList/*: Player[]*/) {
            this.playerList = playerList;
        },
        setShareUrl(shareUrl/*: boolean*/) {
            Log.info("setShareUrl", shareUrl);
            this.shareUrl = shareUrl;
        },
        /**
         * 从loader中初始化状态
         * @param state 
         */
         initFromLoader() {
            this.setPlayerModeType(Load.playerMode);
            this.setUserType(Load.userType);
            this.setNickName(Load.nickname);
            this.setAuthCode(Load.authCode);
            Log.info('一人操作多人看 inited');
        },
        /**
         * 从列表中找到id与当前用户相同的id，更新当前用户的状态
         * @param param0 
         */
        updatePlayerList(list) {
            Log.info('updatePlayerList', list);
            let playerList/*: Player[]*/ = [];
            for (let player of list) {
                if (player.isCurrent) {
                    // update self
                    this.setUserType(player.userType);
                    this.setUserId(player.userId);
                    this.setNickName(player.nickName);
                    this.setIsTaskOwner(player.isTaskOwner);
                }
                playerList.push(player);
            }
            this.setPlayerList(playerList);
        }
    },
});