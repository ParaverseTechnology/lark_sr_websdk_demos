import { createSlice } from "@reduxjs/toolkit";
import Load from '@/load';
import Log from '@/utils/log';

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

const playerModeSlice = createSlice({
  name: 'playerMode',
  initialState: {
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
  },
  reducers: {
    setShowPlayerList(state, actions) {
      state.showPlayerList = actions.payload;
      Log.info("setShowPlayerList", actions.payload);
    },
    setPlayerModeType(state, actions) {
      state.playerModeType = actions.payload;
    },
    setUserType(state, actions) {
      state.userType = actions.payload;
    },
    setUserId(state, actions) {
      state.userId = actions.payload;
    },
    setNickNameRds(state, actions) {
      state.nickName = actions.payload;
    },
    setIsTaskOwner(state, actions) {
      state.isTaskOwner = actions.payload;
    },
    setIsController(state, actions) {
      state.userType = actions.payload ? UserType.Player : UserType.Observer;
    },
    setAuthCode(state, actions) {
      state.authCode = actions.payload;
    },
    setPlayerList(state, actions) {
      state.playerList = actions.payload;
    },
    setShareUrl(state, actions) {
      Log.info("setShareUrl", actions.payload);
      state.shareUrl = actions.payload;
    },
    /**
     * 从loader中初始化状态
     * @param state 
     */
    initFromLoader(state) {
      state.playerModeType = Load.playerMode;
      state.userType = Load.userType;
      state.nickName = Load.nickname;
      state.authCode = Load.authCode;
      Log.info('一人操作多人看 inited');
    },
    /**
     * 从列表中找到id与当前用户相同的id，更新当前用户的状态
     * @param param0 
     */
    updatePlayerList(state, actions) {
        Log.info('updatePlayerList', actions.payload);
        let playerList/*: Player[]*/ = [];
        for (let player of actions.payload) {
            if (player.isCurrent) {
                // update self
                state.userType = player.userType;
                state.userId = player.userId;
                state.nickName = player.nickName;
                state.isTaskOwner = player.isTaskOwner;
            }
            playerList.push(player);
        }
        state.playerList = playerList;
    }
  }
});

export const { setShowPlayerList, setPlayerModeType, setUserType, setUserId, setNickNameRds, setIsTaskOwner, setIsController, setAuthCode, setPlayerList, setShareUrl, initFromLoader, updatePlayerList } = playerModeSlice.actions;
export default playerModeSlice.reducer;