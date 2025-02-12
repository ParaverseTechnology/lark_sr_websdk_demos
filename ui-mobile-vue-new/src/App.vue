<template>
  <div id="app" class="index" ref="appContainer" @contextmenu.prevent @mousedown="appContainerMousedown"  @mouseup="appContainerTouch" @touchend="appContainerTouch">
    <input v-if="isMobile" class="virtualInput" ref="input" type="text" v-model="inputValue">
    <!-- 观看模式昵称的输入框 -->
    <div v-if="inputNickName" class="modalInputPanel" :style="viewPortStyle" >
      <div class="container">
        <div class="info">
          <div v-if="showNicknameInput" type="flex" align="middle" class="info-row">
            <span class="container-label">{{ ui.requireNickName }}：</span>
            <div class="inputContainer">
              <input
                :class="nicknameRequireClass"
                type="text"
                v-model.trim="nickname"
                v-on:focus="onInputFocus"
              />
            </div>
          </div>
          <div v-if="showAuthCodeInput" type="flex" align="middle" class="info-row">
            <span class="container-label">{{ ui.requireAuthCode }}：</span>
            <div class="inputContainer">
              <input
                :class="authCodeRequireClass"
                type="text"
                v-model.trim="authCode"
                v-on:focus="onAuthCodeInputFocus"
              />
            </div>
          </div>
        </div>
        <div class="buttonContainer">
          <Btn
            class="submit"
            :title="ui.buttonSubmit"
            submit="false"
            v-on:click="onSubmitNickName"
          />
        </div>
      </div>
    </div>
    <div ref="inputTextClassBox" v-if="!isMobile" :class="inputTextClass" :style="{top: (menubarPosition==='top'?curMousePositionY-0+30:curMousePositionY-80)+'px'}">
      <el-row type="flex" justify="space-between" align="middle">
        <textarea 
          ref="inputTextarea"
          :class="nicknameRequireClass"
          type="text"
          v-model="inputText"
          @focus="onInputMethodFocus"
          @blur="onInputMethodBlur"
          @input="onInputMethodInput"
          @paste="handleInputPaste"
        />
        <img :src="returnImg" class="button-return" @click="onSubmitInputText">
        <img :src="closeImg" class="button-close" @click="onCloseInputText">
      </el-row>
    </div>

    <div v-if="showUI">
      <!-- 手机端入口 -->
      <template v-if="cloudReady && isMobile">
        <!-- 菜单条 -->
        <MobileMenuBar v-if="mobileWebMenuType===1"></MobileMenuBar>
        <!-- 控制球 -->
        <ControlBallM v-else></ControlBallM>
      </template>
      <template v-else>
        <!-- 右上角关闭应用icon -->
        <div v-if="showWebMenu" class="close-appli-pc" @click.prevent="onQuit">
          <img :src="closeImg">
        </div>
        <!-- showControlBar -->
        <MenuBar v-if="cloudReady && showControlBar && showWebMenu" />
        <!-- 帮助 -->
        <ModalHelp v-if="isShowHelpAlert"></ModalHelp>
        <!-- 设置 -->
        <ModallSetting v-if="isShowSettingAlert"></ModallSetting>
        <!-- 推流 -->
        <LiveStreaming v-if="isShowStreamAlert" />
      </template>
      <!-- 左上角延时显示 -->
      <RttInfo v-if="cloudReady" />   
      <!-- 网络状态 -->
      <States />
      <!-- 鸟瞰模式 -->
      <AerialView v-if="cloudReady && showAerialView && aerialViewCheck" />
      <!-- 互动模式 -->
      <PlayerMode />
    </div>
    
    
    
    <!-- 通用 UI -->
    <!-- 警告框 -->
    <Alert v-if="modalAlert.show" />
    <!-- 顶部提示框 -->
    <Notify v-if="notifyBar.notify.show" />
    <!-- 浮动提示 -->
    <Toast v-if="cloudReady" />
    <!-- 确认框 -->
    <Confirm v-if="modalConfirm.show"/>
    
  </div>
</template>

<script>
import { LarkSR } from "larksr_websdk";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Unit from './utils/unit';
import Capabilities from './utils/capabilities'
import Alert               from './components/alert/alert';
import Btn                 from './components/button/button';
import Notify              from './components/notify/notify';
import Toast               from './components/toast/toast';
import Confirm             from './components/confirm/confirm';
import RttInfo             from './components/rttinfo/rttinfo';
import States              from './components/states_modal/states_modal';
import AerialView          from './components/aerial_view/aerial_view.vue'
import PlayerMode          from "./components/player_mode/player_mode"; 
import MenuBar             from "./components/menuBar/menuBar";
import ModalHelp           from './components/modal_help/modal_help';
import ModallSetting       from './components/modal_setting/modal_setting';
import LiveStreaming       from './components/live_streaming/live_streaming';
import MobileMenuBar       from './components/mobile/mobile_menu_bar/mobile_menu_bar.vue'
import ControlBallM        from "./components/mobile/control_ball/control_ball"
import Load                from './load';
import store               from "@/store"; 
import Log                 from "@/utils/log";

export default {
  name: "App",
  components: {
    Alert,
    Btn,
    Notify,
    Toast,
    Confirm,
    RttInfo,
    States,
    AerialView,
    PlayerMode,
    MenuBar,
    ModalHelp,
    ModallSetting,
    LiveStreaming,
    MobileMenuBar,
    ControlBallM
  },
  data() {
    return {
      appContainer: null,
      cloudReady: false,
      mutePlay: false,
      inputValue: '',//隐藏的input，移动端调起系统键盘使用
      isIOS: Capabilities.os === 'iOS',
      inputFocusFlag: false, //云端输入事件input聚焦状态
      inputNickName: false,
      nicknameRequire: false,
      nickname: "",
      authCodeRequire: false,
      authCode: "",
      showAuthCodeInput: false, // 是否需要展示输入口令密码输入框
      showNicknameInput: false,
      mousePositionY: 30,
      curMousePositionY: '-9999', //记录鼠标点击时坐标（PC端输入中文时，弹窗显示位置）,
      inputText: '',
      returnImg: require('@/assets/images/return.svg'),
      closeImg: require("@/assets/images/close.svg"),
      showUI: false,
      urlShowWebMenu: null,
      textInputTimer: null
    };
  },
  watch: {
    inputValue: function(val) {
      if(val) {
        this.larksr.inputText(val);
        this.inputValue = '';
      }
    },
    inputMethodEnable: function(val) {
      if(val === true && this.controlBallInputMethod) {
        // PC
        this.curMousePositionY = this.mousePositionY;
        this.$refs.inputTextarea.focus();
        this.$refs.inputTextClassBox.style.opacity = 1;
        this.$refs.inputTextClassBox.style['z-index'] = 1029;
      } else if(val === false) {
        this.$refs.inputTextarea.blur();
        this.$refs.inputTextClassBox.style.opacity = 0;
        this.$refs.inputTextClassBox.style['z-index'] = -1029;
      }
    }
  },
  computed: {
    nicknameRequireClass() {
      return this.nicknameRequire ? "warning" : "";
    },
    authCodeRequireClass() {
      return this.authCodeRequire ? "warning" : "";
    },
    inputTextClass() {
      return this.inputMethodEnable ? "inputText enable" : "inputText disable";
    },
    ...mapState({
      larksr: (state) => state.larksr,
      ui: (state) => state.ui,
      isMobile: (state) => state.isMobile,
      showControlBar: (state) => state.showControlBar,
      showAerialView: state => state.showAerialView,
      playerMode: (state) => state.playerMode,
      menubarPosition: state => state.menubarPosition,
      inputMethodEnable: (state) => state.inputMethodEnable,
      controlBallInputMethod: state => state.controlBallInputMethod, // 是否是控制球点开的输入中文框
      modalConfirm: (state) => state.modalConfirm.modalConfirm,
      isShowHelpAlert: state => state.modalHelp.isShowHelpAlert,
      isShowSettingAlert: state => state.modalSetting.isShowSettingAlert,
      isShowStreamAlert: state => state.modalStream.isShowStreamAlert,
      modalAlert: (state) => state.modalAlert.modalAlert,
      notifyBar: (state) => state.notifyBar,
      mobileWebMenuType: state => state.mobileWebMenuType,
      mobileKeyboardType: state => state.mobileKeyboardType,
      aerialViewCheck: state => state.modalSetting.aerialViewCheck,    
      showWebMenu: (state) => state.showWebMenu,
    }),
    ...mapGetters({
      isObMode: "playerMode/isObMode",
      playerList: "playerMode/playerList",
      viewPortStyle: 'viewPortStyle'
    }),
  },
  methods: {
    // 开始连接
    async start() {
      const { larksr } = this;
      try {
        let params = {};

        // 要使用的云端资源的应用 ID，从后云雀后台接口获取
        // 参考查询应用一栏文档
        // https://showdoc.pingxingyun.com/web/#/75/1697
        // 如 222.128.6.137:8181 系统下的 879414254636105728 应用
        params.appliId = Load.appliId;

        if (!params.appliId) {
          this.alert({des: "请设置appliId参数"})
          .then(() => {
            Unit.quit();
          });
          return;
        }

        // groups
        if (Load.endDate) {
          params.endDate = Load.endDate;
        }
        if (Load.clientMac) {
          params.clientMac = Load.clientMac;
        }
        if (Load.groupId) {
          params.groupId = Load.groupId;
        }
        if (Load.regionId) {
          params.regionId = Load.regionId;
        }

        // 互动模式
        if (Load.taskid) {
          params.taskId = Load.taskid;
        }
        
        //启动模式：0：普通模式, 1：互动模式（一人操作多人观看），2: 多人协同（键盘鼠标放开，需要应用配合）
        // 互动模式测试连接 
        // 所有者 userType = 1
        // http://localhost:8081/?appliId=925773094113509376&playerMode=1&userType=1&authCode=fMFu92vg
        // 观看者 userType = 0
        // http://localhost:8081/?appliId=925773094113509376&playerMode=1&userType=0&authCode=fMFu92vg
        if (Load.playerMode) {
          params.playerMode = Load.playerMode;
        }

        //Task所有者:1 /  观察者:0
        if (Load.userType || Load.userType === 0) {
          params.userType = Load.userType;
        }

        // 用户手动输入昵称
        if (this.nickname) {
          larksr.params.nickname = this.nickname;
        }
        if (this.nickname) {
          params.nickname = this.nickname;
        }
        // url 载入昵称
        if (Load.nickname) {
          params.nickname = Load.nickname;
        }

        //口令:8位唯一码,写入TaskInfo
        if (Load.authCode) {
          params.authCode = Load.authCode;
        }
        if(Load.accessType && Load.accessType === '0') {
          // 私有应用需要传参 accessType shareId authCode（原身roomCode）
          params.authCode = this.authCode;
          params.accessType = '0';
          params.shareId = Load.shareId;
          larksr.params.accessType = Load.accessType;
        }

        //指定节点分配
        if (Load.targetServerIp) {
          params.targetServerIp = Load.targetServerIp;
        }

        // keys
        if (Load.appKey) {
          params.appKey = Load.appKey;
        }
        if (Load.timeStamp) {
          params.timestamp = Load.timeStamp;
        }
        if (Load.signature) {
          params.signature = Load.signature;
        }
        if (Load.language) {
          params.language = Load.language;
        } else {
          params.language = this.navigatorLan;
        }

        if(Object.keys(Load.extraparams).length>0) {
          params = Object.assign(params, Load.extraparams)
        }

        await larksr.connect(params);

        console.log("connect", params);

        // 设置网页 title
        if (larksr.params.appliName) {
          document.title = decodeURI(decodeURI(larksr.params.appliName));
        }
      } catch(e) {
        console.error('connect and int failed.', e);
        this.alert({des: e.message ? e.message : JSON.stringify(e)})
        .then(() => {
          Unit.quit();
        });
      }
   },

   onInputFocus() {
    console.log("on focus");
    this.nicknameRequire = false;
  },
  onAuthCodeInputFocus() {
    console.log("on authCode input focus");
    this.authCodeRequire = false;
  },
  onSubmitNickName() {
    console.log("on submit nickname", this.nickname);
    console.log('on submit authCode',this.authCode);
    if(this.showAuthCodeInput) {// 只有私有应用 会出现输入口令密码的情况
      if(this.showNicknameInput && this.nickname == "") {
        this.nicknameRequire = true;
      } else if(this.showAuthCodeInput && this.authCode == "") {
        this.authCodeRequire = true;
      } else {
        this.inputNickName = false;
        this.setNickName(this.nickname);
        this.showNicknameInput = false;
        this.showAuthCodeInput = false;
        this.start(this.taskStated);
      }
      
    } else {
      if (this.nickname != "") {
        // 填写昵称后再开始
        this.inputNickName = false;
        this.setNickName(this.nickname);
        this.showNicknameInput = false;
        this.start(this.taskStated);
      } else {
        this.nicknameRequire = true;
      }
    }
  },
  onQuit() {
    // code 920 // 用户主动点击关闭按钮
    this.confirm({ title: '退出应用', des: '确认退出应用', code: 920 })
    .then(()=>{
        Log.info('user confirm');
        Unit.quit();
    })
    .catch((e) => {
        Log.info('user cancle');
    });
  },
   appContainerTouch() {
      this.onMutePlay();
      if(this.isMobile){
        // this.mobileKeyboardType === 0 使用系统键盘
        if(this.inputFocusFlag && !this.vkeyboard && this.mobileKeyboardType === 0) {
          this.$refs.input.focus();
        }
      }
    },
    onMutePlay() {
      if (!this.mutePlay) {
        return;
      }
      this.larksr.videoComponent.sountPlayout();
      this.larksr.videoComponent.playVideo();
      this.mutePlay = false;
    },
    sysKeybaordEnterOrBackspace(e) {
      if(this.isMobile && this.inputFocusFlag) {
        if(e.key === 'Enter') {
          this.larksr.inputText(this.inputValue);
          this.inputValue = '';
          this.$refs.input.blur();
        }else if(e.key === 'Backspace') {
          this.larksr.keyDown('Backspace', false);
          this.textInputTimer = setTimeout(() => {
            this.larksr.keyUp('Backspace');
            if(this.textInputTimer) clearTimeout(this.textInputTimer);
          },50)
        }
      }
    },    
    inputTextareaKeydown(e) {
      if(e.key === 'Backspace') {
        if(this.inputText === "") {
          this.larksr.keyDown('Backspace', false);
          this.textInputTimer = setTimeout(() => {
            this.larksr.keyUp('Backspace');
            if(this.textInputTimer) clearTimeout(this.textInputTimer);
          },50)
        }
      } else if((e.key === 'c'|| e.key === 'v' || e.key === 'a' || e.key === 'x') && e.ctrlKey) { 
        this.larksr.keyDown('ControlLeft', false);
        this.larksr.keyDown(e.code, false);
        if(this.inputText) {
          this.larksr.inputText(this.inputText);
          this.inputText = "";
        }
        this.textInputTimer = setTimeout(() => {
          this.larksr.keyUp(e.code);
          this.larksr.keyUp('ControlLeft');
          if(this.textInputTimer) clearTimeout(this.textInputTimer);
        },50)
      }
    },
    inputTextareaKeyup(e) {
      if(e.key === 'Enter'){
        this.setInputMethodEnable(false);
        if (this.larksr) {
          Log.info("submit input text", this.inputText);
          this.larksr.inputText(this.inputText);
        }
        this.$refs.inputTextarea.blur();
        this.inputText = "";
      }
    },
    onInputMethodFocus() {
      Log.info("on input method focus");
      this.inputText = "";
      if (this.isMobile && this.screenOrientation == "landscape") {
        this.larksr?.screenState.setMobileForceLandScape(false);
        this.mobileScreenLandscapState = true;
      }
      if (this.larksr) {
        this.larksr.op.setKeyboardEnable(false);
      }
    },
    onInputMethodBlur() {
      Log.info("on input method blur");
      if (this.mobileScreenLandscapState) {
        this.larksr?.screenState.setMobileForceLandScape(true);
        this.mobileScreenLandscapState = false;
      }
      if (this.larksr) {
        this.larksr.op.setKeyboardEnable(true);
      }
    },
    onSubmitInputText() {
      this.setInputMethodStart(false);
      this.setInputMethodEnable(false);
      if (this.larksr) {
        Log.info("submit input text", this.inputText);
        this.larksr.inputText(this.inputText);
        this.larksr.op.setKeyboardEnable(true);
      }
      this.$refs.inputTextarea.blur();
      this.inputText = "";
    },    
    onInputMethodInput(e) {
      if(!this.controlBallInputMethod) {
        if (this.larksr) {
          Log.info("submit input text1", JSON.stringify(this.inputText));
          this.larksr.inputText(this.inputText);
        }
        this.inputText = "";
      }
    },
    // 【同步本地剪贴板】关闭时，禁用文本输入框粘贴功能，防止粘贴到文本输入框的内容发送到云端
    handleInputPaste(e) {
      if(!this.larksr?.op.enableParse) {
        e.preventDefault();
      }
    },
    compositionEnd(e) {
      if(e.type === 'compositionstart' && !this.controlBallInputMethod) { // 中文输入start
        this.isChineseInput = true;
      } else if(e.type === 'compositionend' && !this.controlBallInputMethod) { // 中文输入确定文字
        if (this.larksr) {
          Log.info("submit input text", this.inputText);
          this.larksr.inputText(this.inputText);
        }
        this.inputText = "";
        this.isChineseInput = false;
      }
    },
    onCloseInputText() {
      this.inputText = "";
      this.setInputMethodStart(false);
      this.setInputMethodEnable(false);
      if (this.larksr) {
        this.larksr.op.setKeyboardEnable(true);
      }
    },
    appContainerMousedown(e) {
      if(!this.isMobile) {
        this.mousePositionY = e.clientY;
      }
    },
    ...mapMutations({
        setLarksr: "setLarksr",
        setAggregatedStats: "setAggregatedStats",
        setNickName: "playerMode/setNickName",
        setShareUrl: "playerMode/setShareUrl",
        setInputMethodEnable: "setInputMethodEnable",
        setInputMethodStart: "setInputMethodStart",
        setControlBallInputMethod: 'setControlBallInputMethod',
        setShowWebMenu: 'setShowWebMenu'
    }),
    ...mapActions({
      "resize": "resize",
      'toast': 'toast/toast',
      'notify': 'notifyBar/notify',
      'alert': 'modalAlert/showModalAlert',
      'confirm': 'modalConfirm/showModalConfirm',
      'resetLocalization': 'resetLocalization',
      'toggleVKeyboard': 'toggleVKeyboard',
      'setFlipMouseWheel': 'flipMouseWheel'
    }),
  },
  mounted() {
    // 从 url 载入参数
    Load.InitProcess();
    // init player mode params
    store.dispatch('playerMode/initFromLoader');    
    if(this.isMobile) {
      this.$refs.input.addEventListener('keyup',this.sysKeybaordEnterOrBackspace)
    } else {
      this.$refs.inputTextarea.addEventListener('keyup',this.inputTextareaKeyup)
      this.$refs.inputTextarea.addEventListener('keydown',this.inputTextareaKeydown)
    }
    // 直接调用进入应用接口创建实例，自动配置连接云端资源
    const larksr = new LarkSR({
        // doc https://pingxingyun.github.io/webclient_sdk/config.html
        rootElement: this.$refs["appContainer"],
        // 服务器地址,实际使用中填写您的服务器地址
        // 如：http://222.128.6.137:8181/
        // serverAddress: "http://222.128.6.137:8181/",
        serverAddress: "http://192.168.0.55:8181/",
        // 视频缩放模式，默认保留宽高比，不会拉伸并完整显示在容器中
        // scaleMode: "contain",
        // 0 -》 用户手动触发, 1 -》 首次点击进入触发, 2 -》 每次点击触发
        // fullScreenMode: 0,
        // mobileFullScreenMode: 1,
        // 测试载入背景图
        // loadingBgUrl: "https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg",
        // show log
        // logLevel: 'warn',
        
        // 单独上传流程要求渲染服务器版本大于3290）
        useSeparateMediaSharePeer: true,
    });
    
    // 初始化您的授权ID
    // "SDK 授权码，联系 business@pingxingyun.com 获取,注意是 SDK 本身的授权码，不是服务器上的授权"
    // 使用 Unit.queryString("sdkID") 可从 url 载入名称为 sdkID 的参数
    larksr.initSDKAuthCode("SDK 授权码，联系 business@pingxingyun.com 获取,注意是 SDK 本身的授权码，不是服务器上的授权")
    .then(() => {

      // 连接平行云托管平台的应用
      // client.connectWithPxyHost({
      //     // 从平行云托管平台获取
      //     appliId: "924970933473509376",
      //     // playerMode: 2,
      //     // userType: 1,
      //     // taskId: "",
      //     // nickname: "Test",
      // })
      // .catch(function(e) {
      //     console.error('enter appli falied', e);
      //     alert(JSON.stringify(e));
      // });

      /**
       * 
       // 固定传入调用参数
       // 从 url 中获取参数并传入参考上面 start 方法

      // start connect;
      larksr.connect({
        // 要使用的云端资源的应用 ID，从后云雀后台接口获取
        // 参考查询应用一栏文档
        // https://showdoc.pingxingyun.com/web/#/75/1697
        // 如 222.128.6.137:8181 系统下的 879414254636105728 应用
        appliId: "913050644103823360",

        // 其他可选参数如下
        // 互动模式
        //启动模式：0：普通模式, 1：互动模式（一人操作多人观看），2: 多人协同（键盘鼠标放开，需要应用配合）
        playerMode: Load.playerMode,
        //Task所有者:1 /  观察者:0
        userType: Load.userType,
        //口令:8位唯一码,写入TaskInfo
        // 新版服务器接口 从roomCode改为authCode
        authCode: Load.authCode,
        taskId: Load.taskid,

        // groups
        // clientMac: '',
        // groupId: '',
        // regionId: '',
        //指定节点分配
        // targetServerIp: '',
        // keys
        // appKey: '',
        // timestamp: '',
        // signature: '',
        // "extraParam.test1": "test1", // extrams
        // "extraParam.test2": "test2", // extrams
        // "extraParam.test3": "test3", // extrams
      })
      .then(() => {
        console.log('enter success');
      })
      .catch((e) => {
        console.error(e);
        alert(JSON.stringify(e));
      }); 

      */
    })
    .catch((e) => {
      console.error(e);
      alert(JSON.stringify(e));
    });

    // 音频设备相关
    // 该功能匹配的服务端版本最低为 V3.2.51
    // 客户端打开后云端应用可直接通过读取声卡上的麦克风接收到音频。
    // 使用该功能要注意在后台开启智能语音功能
    // 打开音频设备，可选传入 deviceId,
    // client.openAudio();
    // 设置已打开的音频track状态
    // client.setAudioEnable(true);
    // 关闭已打开的音频流
    // client.closeAudio();
    // 返回可用的音频设备
    // client.getConnectedAudioinputDevices();


    // ...
    // 主动关闭并清理资源
    // client.close();

    // 监听连接成功事件
    larksr.on("connect", (e) => {
      console.log("LarkSRClientEvent CONNECT", e);
      
      // 可能从getstartappinfo之后才获取来的参数.
      // 后台配置的是否显示玩家列表参数
      store.commit("playerMode/setShowPlayerList", larksr.params.showPlayerList);
      // 移动端输入键盘类型
      store.commit('setMobileKeyboardType', larksr.params.mobileKeyboardType);
      // joystick
      store.commit('setJoyStick', larksr.params.mobileVirtualJoystick);
      if(larksr.params.mobileVirtualJoystick) store.commit('setPreComponentName', 'joystick');
      if(larksr.params.mobileWebMenuType) store.commit('setMobileWebMenuType',larksr.params.mobileWebMenuType);
      // 是否显示菜单
      if (this.urlShowWebMenu) {
          this.setShowWebMenu(this.urlShowWebMenu === '0'? false : true);
        } else {
          this.setShowWebMenu(larksr.params.showWebMenu === 0? false : true);
        }
      Log.info('load params', larksr.params);
      /**
       * mouseZoomDirection
       * 用于移动端捏合缩放操作与应用鼠标缩放的对应关系
       * 1:鼠标滚轮向上为放大，
       * 0:鼠标滚轮向下为放大(default)
       */
      this.setFlipMouseWheel(larksr.params.mouseZoomDirection);
    });

    larksr.on("gotremotesteam", (e) => {
      console.log("LarkSRClientEvent gotremotesteam", e);
    });

    larksr.on("meidaloaded", (e) => {
      console.log("LarkSRClientEvent meidaloaded", e);
      this.cloudReady = true;
    });

    larksr.on("mediaplaysuccess", (e) => {
      console.log("LarkSRClientEvent mediaplaysuccess", e);
    });

    // 3.2.329 使用 larksdk 中的播放按钮
    // larksr.on("mediaplayfailed", (e) => {
    //   console.log("LarkSRClientEvent mediaplayfailed", e);
    //   this.alert({des: "开始"})
    //   .then(() => {
    //       larksr.videoComponent.sountPlayout();
    //       larksr.videoComponent.playVideo();
    //   });
    // });

    larksr.on("meidaplaymute", (e) => {
      console.log("LarkSRClientEvent meidaplaymute", e);
      this.mutePlay = true;
      this.toast({text: '点击屏幕中心打开音频', position: 2, level: 3});
    });

    larksr.on("peerstatusreport", (e) => {
      // console.log("LarkSRClientEvent peerstatusreport", e);
      this.setAggregatedStats(e.data);
    });

    larksr.on('error', (e) => {
        console.error("LarkSRClientEvent error", e.message); 
        this.alert({des: e.message, code: e.code})
        .then(() => {
            Unit.quit();
        });
    });   

    larksr.on('info', (e) => {
        console.log("LarkSRClientEvent info", e); 
        this.toast({text: e.message});
    });
    console.log("load appli success", larksr);
    
    larksr.on('resourcenotenough', (e) => {
        console.log("LarkSRClientEvent resourcenotenough", e); 
        if(e.type === 0) {
          alert("当前系统繁忙，请稍后再试！");
        }
    });

    // 云端Input输入事件
    larksr.on('apprequestinput', (e) => {
      console.log('apprequestinput', e)
      if(e.data === true) {
        this.inputFocusFlag = true;
        if(this.isMobile) {
          if(this.mobileKeyboardType === 1) {
            // 打开虚拟键盘
            if(!this.vkeyboard) this.toggleVKeyboard();
          } else {
            //打开系统键盘
            if(!this.vkeyboard) { // 虚拟键盘显示时 不调起系统键盘
              this.$refs.input.focus();
              if (this.larksr)this.larksr.op.setKeyboardEnable(false);
            }
          }
        } else{
            const isOperating = this.playerList.find(item => item.nickName === this.playerMode.nickName).userType == 1;
            // 演示模式 && 没有操作权限时候不弹出提示框
            if(!(Load.playerMode === 1 && !isOperating)) { 
              this.setControlBallInputMethod(false);
              this.curMousePositionY = this.mousePositionY;
              this.setInputMethodEnable(e.data);
              this.$refs.inputTextarea.focus();
              this.$refs.inputTextClassBox.style.opacity = 0;
              this.$refs.inputTextClassBox.style['z-index'] = -1;
              this.$refs.inputTextarea.addEventListener('compositionstart',this.compositionEnd);
              this.$refs.inputTextarea.addEventListener('compositionend',this.compositionEnd);
            }
        }
      } else {
        this.inputFocusFlag = false;
        if(this.isMobile) {
          if(this.mobileKeyboardType === 1) {
            // 关闭虚拟键盘
            if(this.vkeyboard)this.toggleVKeyboard();
          } else {
            //关闭系统键盘
            this.$refs.input.blur();
            if (this.larksr)this.larksr.op.setKeyboardEnable(true);
          }

        } else {
          this.setInputMethodEnable(false);
          this.$refs.inputTextarea.removeEventListener('compositionstart',this.compositionEnd);
          this.$refs.inputTextarea.removeEventListener('compositionend',this.compositionEnd);
        }
        if (this.mobileScreenLandscapState) {
          this.larksr?.screenState.setMobileForceLandScape(true);
          this.mobileScreenLandscapState = false;
        }
      }
    });
    larksr.on('appresize', (e) => {
      Log.info("LarkSRClientEvent APP_RESIZE", e);
      this.showUI = true;
    });
    larksr.on('playerlist', (e) => {
      console.log('PLAYER_LIST', e.data);
      store.dispatch('playerMode/updatePlayerList', e.data);
    });


    // reset states.
    this.setLarksr(larksr);
    this.resetLocalization();
    this.resize();

    if(Load.accessType === '0' && Load.shareId) { // 私有应用
      if(Load.authCode) { //有口令密码
        this.authCode = Load.authCode;
        this.showAuthCodeInput = false;

        // 互动模式需要填昵称
        if (this.playerMode.playerModeType != 0 && this.playerMode.nickName == "") {
          // 填写昵称后再开始
          this.showNicknameInput = true;
          this.inputNickName = true;
        } else {
          // start connect.
          this.start();
        }
      } else {
          // 需要用户输入口令密码
          this.showAuthCodeInput = true;
          // 互动模式需要填昵称
         if (this.playerMode.playerModeType != 0 && this.playerMode.nickName == "") {
          this.showNicknameInput = true;
         }
         this.inputNickName = true;
        }
    } else { // 公有应用
      // 互动模式需要填昵称
      if (this.playerMode.playerModeType != 0 && this.playerMode.nickName == "") {
        console.log("need nick name");
        // 填写昵称后再开始
        this.inputNickName = true;
        this.showNicknameInput = true;
      } else {
        // start connect.
        this.start();
      }
    }
    

    // this.alert({des: 1});
    // this.confirm({des:"22"});
    console.log("ref", this.$refs["appContainer"]);

    let resizeTimeout = null;
    window.addEventListener("resize", () => {
        if (resizeTimeout) {
            window.clearTimeout(resizeTimeout);
        }
        resizeTimeout = window.setTimeout(() => {
            this.resize();
            resizeTimeout = null;
        }, 200);
    });
    window.addEventListener("orientationchange", () => {
        if (resizeTimeout) {
            window.clearTimeout(resizeTimeout);
        }
        resizeTimeout = window.setTimeout(() => {
            this.resize();
            resizeTimeout = null;
        }, 200);
    });
    this.resize();
  },
  beforeUnmount() {
    // 主动关闭
    this.larksr?.close();
  },
  beforeDestroy() {
    if(this.isMobile) {
      this.$refs.input.removeEventListener('keyup',this.sysKeybaordEnterOrBackspace)
    } else {
      this.$refs.inputTextarea.removeEventListener('keyup',this.inputTextareaKeyup)
      this.$refs.inputTextarea.removeEventListener('keydown',this.inputTextareaKeydown)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "App.scss";
.virtualInput {
  position:absolute;
  z-index: -100;
  border: none;
  background: transparent;
  color: transparent;
}
.virtualInput:focus {
 border: none;
 outline: none;
 color: transparent;
 caret-color: transparent;
}
</style>
