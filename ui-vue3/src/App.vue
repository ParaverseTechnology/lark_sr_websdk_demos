<template>
  <div id="app" class="index" ref="appContainerRef" @contextmenu.prevent @mousedown="appContainerMousedown"  @mouseup="appContainerTouch" @touchend="appContainerTouch">
      <!-- PxyCommonUI 组件容器 -->
      <!-- <div ref="uiContainerRef" style="position:absolute;z-index: 1000;">
      </div> -->
      <!-- 键盘组件容器 -->
      <!-- <div ref="uiKeyboardRef" style=" position: absolute;z-index: 2000; bottom: 0; width: '100%';"></div> -->

      <input v-if="commStore.isMobile" class="virtualInput" ref="inputRef" type="text" v-model="inputValue">
      <!-- 观看模式昵称的输入框 -->
      <div v-if="inputNickName" class="modalInputPanel" :style="commStore.viewPortStyle" >
        <div class="container">
          <div class="info">
            <div v-if="showNicknameInput" type="flex" :align="'middle'" class="info-row">
              <span class="container-label">{{ commStore.ui.requireNickName }}：</span>
              <div class="inputContainer">
                <input
                  :class="nicknameRequireClass"
                  type="text"
                  v-model.trim="nickname"
                  v-on:focus="onInputFocus"
                />
              </div>
            </div>
            <div v-if="showAuthCodeInput" type="flex" :align="'middle'" class="info-row">
              <span class="container-label">{{ commStore.ui.requireAuthCode }}：</span>
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
              :title="commStore.ui.buttonSubmit"
              submit="false"
              v-on:click="onSubmitNickName"
            />
          </div>
        </div>
      </div>
      <div ref="inputTextClassBoxRef" v-if="!commStore.isMobile" :class="inputTextClass" :style="{top: (commStore.menubarPosition==='top'?curMousePositionY-0+30:curMousePositionY-80)+'px'}">
        <el-row type="flex" justify="space-between" :align="'middle'">
          <textarea
            ref="inputTextareaRef"
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
        <template v-if="cloudReady && commStore.isMobile">
          <!-- 菜单条 -->
          <MobileMenuBar v-if="commStore.mobileWebMenuType===1"></MobileMenuBar>
          <!-- 控制球 -->
          <ControlBallM v-else></ControlBallM>
        </template>
        <template v-else>
          <!-- 右上角关闭应用icon -->
          <div v-if="commStore.showWebMenu" class="close-appli-pc" @click.prevent="onQuit">
            <img :src="closeImg">
          </div>
          <!-- showControlBar -->
          <MenuBar v-if="cloudReady && commStore.showControlBar && commStore.showWebMenu" />
          <!-- 帮助 -->
          <ModalHelp v-if="modalHelpStore.isShowHelpAlert"></ModalHelp>
          <!-- 设置 -->
          <ModallSetting v-if="modalSettingStore.isShowSettingAlert"></ModallSetting>
          <!-- 推流 -->
          <LiveStreaming v-if="modalStreamStore.isShowStreamAlert" />
        </template>
        <!-- 左上角延时显示 -->
        <RttInfo v-if="cloudReady" />
        <!-- 网络状态 -->
        <States />
        <!-- 鸟瞰模式 -->
        <AerialView v-if="cloudReady && commStore.showAerialView && modalSettingStore.aerialViewCheck" />
        <!-- 互动模式 -->
        <PlayerMode />
      </div>
      <!-- 通用 UI -->
      <!-- 警告框 -->
      <Alert v-if="modalAlertStore.modalAlert.show" />
      <!-- 顶部提示框 -->
      <Notify v-if="notifyBarStore.notify.show" />
      <!-- 浮动提示 -->
      <Toast v-if="cloudReady" />
      <!-- 确认框 -->
      <Confirm v-if="modalConfirmStore.modalConfirm.show"/>

  </div>
</template>

<script setup>
import { LarkSR } from "larksr_websdk";
import PxyCommonUI from 'pxy_webcommonui';
import JoystickBottomImage from './assets/joy_stick_bottom.png';
import JoystickTopImage from './assets/joy_stick_top.png';
import returnImg from '@/assets/images/return.svg';
import closeImg from "@/assets/images/close.svg";
import Unit from './utils/unit';
import Load                from './load';
import Log                 from "@/utils/log";
import Alert               from './components/alert/alert.vue';
import Btn                 from './components/button/button.vue';
import Notify              from './components/notify/notify.vue';
import Toast               from './components/toast/toast.vue';
import Confirm             from './components/confirm/confirm.vue';
import MenuBar             from "./components/menuBar/menuBar.vue";
import RttInfo             from './components/rttinfo/rttinfo.vue';
import States              from './components/states_modal/states_modal.vue';
import PlayerMode          from "./components/player_mode/player_mode.vue";
import AerialView          from './components/aerial_view/aerial_view.vue';
import ModalHelp           from './components/modal_help/modal_help.vue';
import LiveStreaming       from './components/live_streaming/live_streaming.vue';
import MobileMenuBar       from './components/mobile/mobile_menu_bar/mobile_menu_bar.vue';
import ControlBallM        from "./components/mobile/control_ball/control_ball.vue";
import ModallSetting       from './components/modal_setting/modal_setting.vue';
import { useCommStore } from '@/stores/comm';
import { useModalConfirmStore } from '@/stores/modal_confirm';
import { useModalHelpStore } from '@/stores/modal_help';
import { useModalSettingStore } from '@/stores/modal_setting';
import { useModalStreamStore } from '@/stores/modal_stream.js';
import { useModalAlertStore } from '@/stores/modal_alert';
import { useNotifyBarStore } from '@/stores/notifybar';
import { usePlayerModeStore } from '@/stores/player_mode';
import { useToastStore } from '@/stores/toast'

// const store = useStore();
const commStore = useCommStore();
const modalConfirmStore = useModalConfirmStore();
const modalHelpStore = useModalHelpStore();
const modalSettingStore = useModalSettingStore();
const modalStreamStore = useModalStreamStore();
const modalAlertStore = useModalAlertStore();
const playerModeStore = usePlayerModeStore();
const toastStore = useToastStore();
const notifyBarStore = useNotifyBarStore();
const { 
  Joystick, 
  Capabilities,
  Keyboard
  // KJoystickEvents,
  // KJoystickSubTypes
} = PxyCommonUI;

// const JoystickBottomImage = require('./assets/joy_stick_bottom.png');
// const JoystickTopImage = require('./assets/joy_stick_top.png');

const larksr = ref(null);
const appContainerRef = ref(null);
const joystick = ref(null);
const keyboard = ref(null);
const mobileScreenLandscapState = ref(false);
const uiContainerRef = ref(null);
const uiKeyboardRef = ref(null);

const cloudReady = ref(false);
const mutePlay = ref(false);
const inputValue = ref('');//隐藏的input，移动端调起系统键盘使用
const isIOS = Capabilities.os === 'iOS';
const inputFocusFlag = ref(false); //云端输入事件input聚焦状态
const inputNickName = ref(false);
const nicknameRequire = ref(false);
const nickname = ref('');
const authCodeRequire = ref(false);
const authCode = ref('');
const showAuthCodeInput = ref(false); // 是否需要展示输入口令密码输入框
const showNicknameInput = ref(false);
const mousePositionY = ref(30)
const curMousePositionY = ref('-9999'); //记录鼠标点击时坐标（PC端输入中文时，弹窗显示位置）,
const inputText = ref('');
const showUI = ref(false);
const urlShowWebMenu = ref(null);
const textInputTimer = ref(null);


const nicknameRequireClass = computed(() => {
  return nicknameRequire.value ? "warning" : "";
});
const authCodeRequireClass = computed(() => {
  return authCodeRequire.value ? "warning" : "";
});
const inputTextClass = computed(() => {
  return commStore.inputMethodEnable ? "inputText enable" : "inputText disable";
});


const inputRef = ref(null);
const inputTextareaRef = ref(null);
const inputTextClassBoxRef = ref(null);
onMounted(() => {
  // 从 url 载入参数
  Load.InitProcess();
    // init player mode params
    playerModeStore.initFromLoader()
    if(commStore.isMobile) {
      inputRef.value.addEventListener('keyup',sysKeybaordEnterOrBackspace)
    } else {
      inputTextareaRef.value.addEventListener('keyup',inputTextareaKeyup)
      inputTextareaRef.value.addEventListener('keydown',inputTextareaKeydown)
    }
    // 直接调用进入应用接口创建实例，自动配置连接云端资源
    larksr.value = new LarkSR({
        // doc https://pingxingyun.github.io/webclient_sdk/config.html
        rootElement: appContainerRef.value,
        // 服务器地址,实际使用中填写您的服务器地址
        // 如：http://222.128.6.137:8181/
        // serverAddress: "http://222.128.6.137:8181/",
        serverAddress: "http://192.168.0.184:8181/",
        // 视频缩放模式，默认保留宽高比，不会拉伸并完整显示在容器中
        // scaleMode: "contain",
        // 0 -》 用户手动触发, 1 -》 首次点击进入触发, 2 -》 每次点击触发
        // fullScreenMode: 0,
        // mobileFullScreenMode: 1,
        // 测试载入背景图
        // loadingBgUrl: "https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg",
        // show log
        // logLevel: 'warn',

        // codeRate: 50000,
        // 单独上传流程要求渲染服务器版本大于3290）
        useSeparateMediaSharePeer: true,
        // 默认可以大于服务器端分辨率推流
        ignoreCloudDesktopResolution: true,
    });

    // 初始化您的授权ID
    // "SDK 授权码，联系 business@pingxingyun.com 获取,注意是 SDK 本身的授权码，不是服务器上的授权"
    // 使用 Unit.queryString("sdkID") 可从 url 载入名称为 sdkID 的参数
    larksr.value.initSDKAuthCode("SDK 授权码，联系 business@pingxingyun.com 获取,注意是 SDK 本身的授权码，不是服务器上的授权")
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
      larksr.value.connect({
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
    larksr.value.on("connect", (e) => {
      console.log("LarkSRClientEvent CONNECT", e, larksr.value.params);
      if (larksr.value.params.initResolutionType===1) { //适应客户端窗口分辨率
        const width = larksr.value.screenState.syncClientViewport.width;
        const height = larksr.value.screenState.syncClientViewport.height;
        larksr.value?.setCloudAppSize(width, height);
      }
      // set coderate
      
      modalSettingStore.coderateChange(larksr.value.params.codeRate);
      // set frameRate
      modalSettingStore.codeFpsChange(larksr.value.params.frameRate);
      // 画质
      modalSettingStore.setQualityMode();
      // 可能从getstartappinfo之后才获取来的参数.
      // 后台配置的是否显示玩家列表参数
      playerModeStore.setShowPlayerList(larksr.value.params.showPlayerList);
      // 移动端输入键盘类型
      commStore.setMobileKeyboardType(larksr.value.params.mobileKeyboardType);
      // joystick
      commStore.setJoyStick(larksr.value.params.mobileVirtualJoystick);
      if(larksr.value.params.mobileVirtualJoystick) commStore.setPreComponentName('joystick');
      if(larksr.value.params.mobileWebMenuType) commStore.setMobileWebMenuType(larksr.value.params.mobileWebMenuType);
      // 是否开启中文输入
      commStore.setEnableChineseInput(larksr.value.params.imeFirstNotice === 0 ? false : true);
      // 是否显示菜单
      if (urlShowWebMenu.value) {
        commStore.setShowWebMenu( urlShowWebMenu.value === '0'? false : true);
      } else {
        commStore.setShowWebMenu( larksr.value.params.showWebMenu === 0? false : true);
      }
      Log.info('load params', larksr.value.params);
      /**
       * mouseZoomDirection
       * 用于移动端捏合缩放操作与应用鼠标缩放的对应关系
       * 1:鼠标滚轮向上为放大，
       * 0:鼠标滚轮向下为放大(default)
       */
      commStore.setFlipMouseWheel(larksr.value.params.mouseZoomDirection);
    });

    larksr.value.on("gotremotesteam", (e) => {
      console.log("LarkSRClientEvent gotremotesteam", e);
    });

    larksr.value.on("meidaloaded", (e) => {
      console.log("LarkSRClientEvent meidaloaded", e);
      cloudReady.value = true;
    });

    larksr.value.on("mediaplaysuccess", (e) => {
      console.log("LarkSRClientEvent mediaplaysuccess", e);
    });

    // 3.2.329 使用 larksdk 中的播放按钮
    // larksr.value.on("mediaplayfailed", (e) => {
    //   console.log("LarkSRClientEvent mediaplayfailed", e);
    //   modalAlertStore.showModalAlert({des: "开始"})
    //     .then(() => {
    //     larksr.value.videoComponent.sountPlayout();
    //     larksr.value.videoComponent.playVideo();
    //   });
    // });

    larksr.value.on("meidaplaymute", (e) => {
      console.log("LarkSRClientEvent meidaplaymute", e);
      mutePlay.value = true;
      toastStore.toastAct({text: commStore.ui.enableAudio, position: 2, level: 3});
    });

    larksr.value.on("peerstatusreport", (e) => {
      // console.log("LarkSRClientEvent peerstatusreport", e);
      commStore.setAggregatedStats(e.data);
      // this.setAggregatedStats(e.data);
    });

    larksr.value.on('error', (e) => {
        console.error("LarkSRClientEvent error", e.message);
        modalAlertStore.showModalAlert({des: e.message, code: e.code}).then(() => {
          Unit.quit();
        });
        // this.alert({des: e.message, code: e.code})
        // .then(() => {
        //     Unit.quit();
        // });
    });

    larksr.value.on('info', (e) => {
        console.log("LarkSRClientEvent info", e);
        toastStore.toastAct( {text: e.message});
        // this.toast({text: e.message});
    });
    console.log("load appli success", larksr);

    larksr.value.on('resourcenotenough', (e) => {
        console.log("LarkSRClientEvent resourcenotenough", e);
        if(e.type === 0) {
          alert("当前系统繁忙，请稍后再试！");
        }
    });

    // 云端Input输入事件
    larksr.value.on('apprequestinput', (e) => {
      console.log('apprequestinput', e)
      if(e.data === true) {
        // 禁止中文输入
        if(!commStore.enableChineseInput){
          return false;
        }
        inputFocusFlag.value = true;
        if(commStore.isMobile) {
          if(commStore.mobileKeyboardType === 1) {
            // 打开虚拟键盘
            if(!vkeyboard.value) commStore.toggleVKeyboard();
          } else {
            //打开系统键盘
            if(!vkeyboard.value) { // 虚拟键盘显示时 不调起系统键盘
              inputRef.value.focus();
              if (larksr.value)larksr.value.value.op.setKeyboardEnable(false);
            }
          }
        } else{
          // PC端禁止中文输入
          if(!commStore.enableChineseInput){
            return false;
          }
            const isOperating = playerModeStore.playerList.find(item => item.nickName === commStore.playerMode.nickName)?.userType == 1;
            // 演示模式 && 没有操作权限时候不弹出提示框
            if(!(Load.playerMode === 1 && !isOperating)) {
              commStore.setControlBallInputMethod( false);
              // this.setControlBallInputMethod(false);
              curMousePositionY.value = mousePositionY.value;
              commStore.setInputMethodEnable( e.data);
              // this.setInputMethodEnable(e.data);
              inputTextareaRef.value.focus();
              inputTextClassBoxRef.value.style.opacity = 0;
              inputTextClassBoxRef.value.style['z-index'] = -1;
              inputTextareaRef.value.addEventListener('compositionstart',compositionEnd);
              inputTextareaRef.value.addEventListener('compositionend',compositionEnd);
            }
        }
      } else {
        inputFocusFlag.value = false;
        if(commStore.isMobile) {
          if(commStore.mobileKeyboardType === 1) {
            // 关闭虚拟键盘
            if(vkeyboard.value)commStore.toggleVKeyboard()
          } else {
            //关闭系统键盘
            inputRef.value.blur();
            if (larksr.value)larksr.value.op.setKeyboardEnable(true);
          }

        } else {
          commStore.setInputMethodEnable( false);
          // this.setInputMethodEnable(false);
          inputTextareaRef.value?.removeEventListener('compositionstart',compositionEnd);
          inputTextareaRef.value?.removeEventListener('compositionend',compositionEnd);
        }
        if (mobileScreenLandscapState.value) {
          larksr.value?.screenState.setMobileForceLandScape(true);
          mobileScreenLandscapState.value = false;
        }
      }
    });
    larksr.value.on('appresize', (e) => {
      Log.info("LarkSRClientEvent APP_RESIZE", e);
      showUI.value = true;
    });
    larksr.value.on('playerlist', (e) => {
      console.log('PLAYER_LIST', e.data);
      playerModeStore.updatePlayerList(e.data);
    });

    // reset states.
    commStore.setLarksr(larksr.value);
    // setLarksr(larksr.value);
    commStore.resetLocalization();
    // resetLocalization();
    commStore.resize();
    // resize();

    if(Load.accessType === '0' && Load.shareId) { // 私有应用
      if(Load.authCode) { //有口令密码
        authCode.value = Load.authCode;
        showAuthCodeInput.value = false;

        // 互动模式需要填昵称
        if (commStore.playerMode.playerModeType != 0 && commStore.playerMode.nickName == "") {
          // 填写昵称后再开始
          showNicknameInput.value = true;
          inputNickName.value = true;
        } else {
          // start connect.
          start();
        }
      } else {
          // 需要用户输入口令密码
          showAuthCodeInput.value = true;
          // 互动模式需要填昵称
         if (commStore.playerMode.playerModeType != 0 && commStore.playerMode.nickName == "") {
          showNicknameInput.value = true;
         }
         inputNickName.value = true;
        }
    } else { // 公有应用
      // 互动模式需要填昵称
      if (commStore.playerMode.playerModeType != 0 && commStore.playerMode.nickName == "") {
        console.log("need nick name");
        // 填写昵称后再开始
        inputNickName.value = true;
        showNicknameInput.value = true;
      } else {
        // start connect.
        start();
      }
    }


    // this.alert({des: 1});
    // this.confirm({des:"22"});
    console.log("ref", appContainerRef.value);

    let resizeTimeout = ref(null);
    window.addEventListener("resize", () => {
        if (resizeTimeout.value) {
          window.clearTimeout(resizeTimeout.value);
        }

        if (Capabilities.os === 'iOS') {
          resizeTimeout.value = window.setTimeout(() => {
            commStore.resize();
            resizeTimeout.value = null;
          }, 200);
        } else {
          commStore.resize();
        }
        if (larksr.value.params.initResolutionType===1) { //适应客户端窗口分辨率
          const width = larksr.value.screenState.syncClientViewport.width;
          const height = larksr.value.screenState.syncClientViewport.height;
          larksr.value?.setCloudAppSize(width, height);
        }
    });
    window.addEventListener("orientationchange", () => {
        if (resizeTimeout.value) {
            window.clearTimeout(resizeTimeout.value);
        }
        resizeTimeout.value = window.setTimeout(() => {
          commStore.resize();
          resizeTimeout.value = null;
        }, 200);
    });
    commStore.resize();
})
onUnmounted(() => {
   // 主动关闭
  larksr.value?.close();
  if(commStore.isMobile) {
    inputRef.value?.removeEventListener('keyup',sysKeybaordEnterOrBackspace)
  } else {
    inputTextareaRef.value?.removeEventListener('keyup',inputTextareaKeyup)
    inputTextareaRef.value?.removeEventListener('keydown',inputTextareaKeydown)
  }
})
watch(inputValue,(val) => {
  if(val) {
    larksr.value.inputText(val);
    inputValue.value = '';
  }
})
const inputMethodEnable = computed(() => {
  return commStore.inputMethodEnable;
})
watch(inputMethodEnable, (val) => {
  if(val === true && commStore.controlBallInputMethod) {
    // PC
    curMousePositionY.value = mousePositionY.value;
    inputTextareaRef.value.focus();
    inputTextClassBoxRef.value.style.opacity = 1;
    inputTextClassBoxRef.value.style['z-index'] = 1029;
  } else if(val === false) {
    inputTextareaRef.value.blur();
    inputTextClassBoxRef.value.style.opacity = 0;
    inputTextClassBoxRef.value.style['z-index'] = -1029;
  }
})
// 开始连接
const start = async() => {
  // const larksr = larksr.value;
  try {
    let params = {};

    // 要使用的云端资源的应用 ID，从后云雀后台接口获取
    // 参考查询应用一栏文档
    // https://showdoc.pingxingyun.com/web/#/75/1697
    // 如 222.128.6.137:8181 系统下的 879414254636105728 应用
    params.appliId = '1405971684749475840'
    // Load.appliId;

    if (!params.appliId) {
      modalAlertStore.showModalAlert({des: "请设置appliId参数"})
      .then(() => {
        Unit.quit();
      });
      // this.alert({des: "请设置appliId参数"})
      // .then(() => {
      //   Unit.quit();
      // });
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
    if (nickname.value) {
      larksr.value.params.nickname = nickname.value;
    }
    if (nickname.value) {
      params.nickname = nickname.value;
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
      larksr.value.params.accessType = Load.accessType;
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
      // params.language = this.navigatorLan;
    }

    if(Object.keys(Load.extraparams).length>0) {
      params = Object.assign(params, Load.extraparams)
    }

    await larksr.value.connect(params);

    console.log("connect", params);

    // 设置网页 title
    if (larksr.value.params.appliName) {
      document.title = decodeURI(decodeURI(larksr.value.params.appliName));
    }
  } catch(e) {
    console.error('connect and int failed.', e);
    modalAlertStore.showModalAlert({des: e.message ? e.message : JSON.stringify(e)})
    // store.dispatch('modalAlert/showModalAlert', )
    .then(() => {
      Unit.quit();
    });
    // this.alert({des: e.message ? e.message : JSON.stringify(e)})
    // .then(() => {
    //   Unit.quit();
    // });
  }
};

const onInputFocus = () => {
  console.log("on focus");
  nicknameRequire.value = false;
};
const onAuthCodeInputFocus = () => {
  console.log("on authCode input focus");
  authCodeRequire.value = false;
};
const onSubmitNickName = () => {
  console.log("on submit nickname", nickname.value);
  console.log('on submit authCode',authCode.value);
  if(showAuthCodeInput.value) {// 只有私有应用 会出现输入口令密码的情况
    if(showNicknameInput.value && nickname.value == "") {
      nicknameRequire.value = true;
    } else if(showAuthCodeInput.value && authCode.value == "") {
      authCodeRequire.value = true;
    } else {
      inputNickName.value = false;
      playerModeStore.setNickName(nickname.value);
      // this.setNickName(this.nickname);
      showNicknameInput.value = false;
      showAuthCodeInput.value = false;
      start(taskStated.value);
    }

  } else {
    if (nickname.value != "") {
      // 填写昵称后再开始
      inputNickName.value = false;
      playerModeStore.setNickName(nickname.value);
      // this.setNickName(this.nickname);
      showNicknameInput.value = false;
      start(taskStated.value);
    } else {
      nicknameRequire.value = true;
    }
  }
};
const onQuit = () => {
// code 920 // 用户主动点击关闭按钮
  modalConfirmStore.showModalConfirm({ title: commStore.ui.quit, des: commStore.ui.quitTip, code: 920 })
  // store.dispatch('modalConfirm/showModalConfirm', )
  .then(()=>{
    Log.info('user confirm');
    Unit.quit();
  })
  .catch((e) => {
      Log.info('user cancle');
  });
// this.confirm({ title: this.ui.quit, des: this.ui.quitTip, code: 920 })
// .then(()=>{
//     Log.info('user confirm');
//     Unit.quit();
// })
// .catch((e) => {
//     Log.info('user cancle');
// });
};
const appContainerTouch = () => {
  onMutePlay();
  if(commStore.isMobile){
    // this.mobileKeyboardType === 0 使用系统键盘
    if(inputFocusFlag.value && !vkeyboard.value && commStore.mobileKeyboardType === 0) {
      inputRef.value.focus();
    }
  }
};
const onMutePlay = () => {
  if (!mutePlay.value) {
    return;
  }
  larksr.value.videoComponent.sountPlayout();
  larksr.value.videoComponent.playVideo();
  mutePlay.value = false;
};
const sysKeybaordEnterOrBackspace = (e) => {
  if(commStore.isMobile && inputFocusFlag.value) {
    if(e.key === 'Enter') {
      larksr.value.inputText(inputValue.value);
      inputValue.value = '';
      inputRef.value.blur();
    }else if(e.key === 'Backspace') {
      larksr.value.keyDown('Backspace', false);
      textInputTimer.value = setTimeout(() => {
        larksr.value.keyUp('Backspace');
        if(textInputTimer.value) clearTimeout(textInputTimer.value);
      },50)
    }
  }
};
const inputTextareaKeydown = (e) => {
  if(e.key === 'Backspace') {
    if(inputText.value === "") {
      larksr.value.keyDown('Backspace', false);
      textInputTimer.value = setTimeout(() => {
        larksr.value.keyUp('Backspace');
        if(textInputTimer.value) clearTimeout(textInputTimer.value);
      },50)
    }
  } else if((e.key === 'c'|| e.key === 'v' || e.key === 'a' || e.key === 'x') && e.ctrlKey) {
    larksr.value.keyDown('ControlLeft', false);
    larksr.value.keyDown(e.code, false);
    if(inputText.value) {
      larksr.value.inputText(inputText.value);
      inputText.value = "";
    }
    textInputTimer.value = setTimeout(() => {
      larksr.value.keyUp(e.code);
      larksr.value.keyUp('ControlLeft');
      if(textInputTimer.value) clearTimeout(textInputTimer.value);
    },50)
  }
};
const inputTextareaKeyup = (e) => {
  if(e.key === 'Enter'){
    commStore.setInputMethodEnable( false);
    // this.setInputMethodEnable(false);
    if (larksr.value) {
      Log.info("submit input text", inputText.value);
      larksr.value.inputText(inputText.value);
    }
    inputTextareaRef.value.blur();
    inputText.value = "";
  }
};
const onInputMethodFocus = () => {
  Log.info("on input method focus");
  inputText.value = "";
  if (commStore.isMobile && screenOrientation.value == "landscape") {
    larksr.value?.screenState.setMobileForceLandScape(false);
    mobileScreenLandscapState.value = true;
  }
  if (larksr.value) {
    larksr.value.op.setKeyboardEnable(false);
  }
};
const onInputMethodBlur = () => {
  Log.info("on input method blur");
  if (mobileScreenLandscapState.value) {
    larksr.value?.screenState.setMobileForceLandScape(true);
    mobileScreenLandscapState.value = false;
  }
  if (larksr.value) {
    larksr.value.op.setKeyboardEnable(true);
  }
};
const onSubmitInputText = () => {
  commStore.setInputMethodStart(false);
  // this.setInputMethodStart(false);
  commStore.setInputMethodEnable( false);
  // this.setInputMethodEnable(false);
  if (larksr.value) {
    Log.info("submit input text", inputText.value);
    larksr.value.inputText(inputText.value);
    larksr.value.op.setKeyboardEnable(true);
  }
  inputTextareaRef.value.blur();
  inputText.value = "";
};
const onInputMethodInput = (e) => {
  if(!commStore.controlBallInputMethod) {
    if (larksr.value) {
      Log.info("submit input text1", JSON.stringify(inputText.value));
      larksr.value.inputText(inputText.value);
    }
    inputText.value = "";
  }
};
// 【同步本地剪贴板】关闭时，禁用文本输入框粘贴功能，防止粘贴到文本输入框的内容发送到云端
const handleInputPaste = (e) => {
  if(!larksr.value?.op.enableParse) {
    e.preventDefault();
  }
};

const isChineseInput = ref(false);
const compositionEnd = (e) => {
  if(e.type === 'compositionstart' && !commStore.controlBallInputMethod) { // 中文输入start
    isChineseInput.value = true;
  } else if(e.type === 'compositionend' && !commStore.controlBallInputMethod) { // 中文输入确定文字
    if (larksr.value) {
      Log.info("submit input text", inputText.value);
      larksr.value.inputText(inputText.value);
    }
    inputText.value = "";
    isChineseInput.value = false;
  }
};
const onCloseInputText = () => {
  inputText.value = "";
  commStore.setInputMethodStart( false);
  // this.setInputMethodStart(false);
  commStore.setInputMethodEnable( false);
  // this.setInputMethodEnable(false);
  if (larksr.value) {
    larksr.value.op.setKeyboardEnable(true);
  }
};
const appContainerMousedown = (e) => {
  if(!commStore.isMobile) {
    mousePositionY.value = e.clientY;
  }
};
</script>

<style lang="scss" >
@import "./App.scss";
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
