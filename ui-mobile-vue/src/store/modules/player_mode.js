import store from '..';

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
    roomCode: 0,
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
        isObMode({ playerModeType, userType }) { 
            return playerModeType != PlayerModeType.Normal && userType == UserType.Observer; 
        },
        isInteractiveMode({ playerModeType }) { 
            return playerModeType != PlayerModeType.Normal; 
        },
    },
    mutations: {
        setShowPlayerList(state, show/*: boolean*/) {
            state.showPlayerList = show;
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
        setRoomCode(state, roomCode) {
            state.roomCode = roomCode;
        },
        setPlayerList(state, playerList/*: Player[]*/) {
            state.playerList = playerList;
        },
        setShareUrl(state, shareUrl/*: boolean*/) {
            state.shareUrl = shareUrl;
        }
    },
    actions: {
        /**
         * 更新玩家列表，在 webrtc datachannel 中获得。
         * 从列表中找到id与当前用户相同的id，更新当前用户的状态
         * @param param0 
         */
        updatePlayerListFromProto({ state, commit }, list/*: CloudLark.CloudLark.IPlayerDesc[]*/) {
            console.log('updatePlayerListFromProto', list);
            let playerList/*: Player[]*/ = [];
            for (let i of list) {
                let player/*: Player*/ = {
                    isCurrent: i.id === state.userId,
                    userId: i.id ? i.id : 0,
                    nickName: i.nickName ? i.nickName : '',
                    isTaskOwner: !!i.taskOwner,
                    userType: i.controller ? UserType.Player : UserType.Observer,
                };
                if (player.isCurrent) {
                    if (state.userType != player.userType) {
                        let text = player.userType == UserType.Player ? '您已获得操作权限' : '您已失去操作权限';
                        store.dispatch('toast/toast', {text, position: 2});
                    }
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