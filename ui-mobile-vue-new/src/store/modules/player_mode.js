import Load from '@/load';
import Log from '@/utils/log'

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
export const PlayerMode/*: Module<PlayerModeState, RootState>*/ = {
    namespaced: true,
    state: defautlPlayerMode,
    getters: {
        isObMode(state, getters, { larksr }) { 
            return larksr ? larksr.isObMode : false; 
        },
        isInteractiveMode(state, getters, { larksr }) { 
            return larksr ? larksr.isInteractiveMode : false; 
        },
        playerList(state) {
            return state.playerList
        }
    },
    mutations: {
        setShowPlayerList(state, show/*: boolean*/) {
            state.showPlayerList = show;
            Log.info("setShowPlayerList", show, state);
        },
        setPlayerModeType(state, type/*: PlayerModeType*/) {
            state.playerModeType = type;
        },
        setUserType(state, type/*: UserType*/) {
            state.userType = type;
        },
        setUserId(state, id/*: number*/) {
            state.userId = id;
        },
        setNickName(state, nickName/*: string*/) {
            state.nickName = nickName;
        },
        setIsTaskOwner(state, isOwner/*: boolean*/) {
            state.isTaskOwner = isOwner;
        },
        setIsController(state, isController/*: boolean*/) {
            state.userType = isController ? UserType.Player : UserType.Observer;
        },
        setAuthCode(state, authCode) {
            state.authCode = authCode;
        },
        setPlayerList(state, playerList/*: Player[]*/) {
            state.playerList = playerList;
        },
        setShareUrl(state, shareUrl/*: boolean*/) {
            Log.info("setShareUrl", shareUrl);
            state.shareUrl = shareUrl;
        }
    },
    actions: {
        /**
         * 从loader中初始化状态
         * @param state 
         */
         initFromLoader({ state, commit }) {
            commit('setPlayerModeType', Load.playerMode);
            commit('setUserType', Load.userType);
            commit('setNickName', Load.nickname);
            commit('setAuthCode', Load.authCode);
            Log.info('一人操作多人看 inited', state);
        },
        /**
         * 从列表中找到id与当前用户相同的id，更新当前用户的状态
         * @param param0 
         */
        updatePlayerList({ state, commit }, list) {
            Log.info('updatePlayerList', list);
            let playerList/*: Player[]*/ = [];
            for (let player of list) {
                if (player.isCurrent) {
                    // update self
                    commit('setUserType', player.userType);
                    commit('setUserId', player.userId);
                    commit('setNickName', player.nickName);
                    commit('setIsTaskOwner', player.isTaskOwner);
                }
                playerList.push(player);
            }
            commit('setPlayerList', playerList);
        }
    },
}