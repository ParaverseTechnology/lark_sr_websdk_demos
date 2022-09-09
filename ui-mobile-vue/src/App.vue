<template>
  <div id="app" ref="appContainer" @contextmenu.prevent  @mouseup="onMutePlay" @touchend="onMutePlay">
    <!-- 手机端 UI -->
    <MobileIndex v-if="cloudReady && isMobile"></MobileIndex>
    <!-- 通用 UI -->
    <!-- 警告框 -->
    <Alert />
    <!-- 顶部提示框 -->
    <Notify />
    <!-- 浮动提示 -->
    <Toast v-if="cloudReady" />
    <!-- 确认框 -->
    <Confirm />
    <!-- 左上角延时显示 -->
    <RttInfo v-if="cloudReady" />
    <!-- 菜单 -->
    <Menu />
    <!-- PC 版控制球 -->
    <ControlBall v-if="cloudReady && !isMobile" />
    <!-- 网络状态 -->
    <States />
    <!-- 输入框，用于云端输入 -->
    <Input v-if="cloudReady" />
  </div>
</template>

<script>
import { LarkSR } from "larksr_websdk";
import MobileIndex from "./components/mobile/index";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Unit from './utils/unit';
import Alert               from './components/alert/alert';
import Notify              from './components/notify/notify';
import Toast               from './components/toast/toast';
import Confirm             from './components/confirm/confirm';
import RttInfo             from './components/rttinfo/rttinfo';
import Menu                from './components/menu/menu';
import ControlBall         from './components/control_ball/control_ball'; 
import States              from './components/states_modal/states_modal';
import Input               from './components/input/input.vue'

export default {
  name: "App",
  components: {
    MobileIndex,
    Alert,
    Notify,
    Toast,
    Confirm,
    RttInfo,
    Menu,
    ControlBall,
    States,
    Input,
  },
  data() {
    return {
      appContainer: null,
      cloudReady: false,
      mutePlay: false,
    };
  },
  computed: {
    ...mapState({
      larksr: (state) => state.larksr,
      ui: (state) => state.ui,
      isMobile: (state) => state.isMobile,
    }),
  },
  methods: {
    onMutePlay() {
      if (!this.mutePlay) {
        return;
      }
      this.larksr.videoComponent.sountPlayout();
      this.larksr.videoComponent.playVideo();
      this.mutePlay = false;
    },
    ...mapMutations({
        setLarksr: "setLarksr",
        setAggregatedStats: "setAggregatedStats",
    }),
    ...mapActions({
      "resize": "resize",
      'toast': 'toast/toast',
      'notify': 'notifyBar/notify',
      'alert': 'modalAlert/showModalAlert',
      'confirm': 'modalConfirm/showModalConfirm',
      'resetLocalization': 'resetLocalization',
    }),
  },
  mounted() {
    // 直接调用进入应用接口创建实例，自动配置连接云端资源
    const larksr = new LarkSR({
        // doc https://pingxingyun.github.io/webclient_sdk/config.html
        rootElement: this.$refs["appContainer"],
        // 服务器地址,实际使用中填写您的服务器地址
        // 如：http://222.128.6.137:8181/
        serverAddress: "http://222.128.6.137:8181/",
        // serverAddress: "http://192.168.0.55:8181/",
        // 视频缩放模式，默认保留宽高比，不会拉伸并完整显示在容器中
        // scaleMode: "contain",
        // 0 -》 用户手动触发, 1 -》 首次点击进入触发, 2 -》 每次点击触发
        // fullScreenMode: 0,
        // mobileFullScreenMode: 1,
        // 测试载入背景图
        // loadingBgUrl: "https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg",
        // show log
        // logLevel: 'warn',
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

      // start connect;
      larksr.connect({
        // 要使用的云端资源的应用 ID，从后云雀后台接口获取
        // 参考查询应用一栏文档
        // https://www.pingxingyun.com/online/api3_2.html?id=476
        // 如 222.128.6.137:8181 系统下的 879414254636105728 应用
        appliId: "879414254636105728",
        // 其他可选参数如下
        // 互动模式
        //启动模式：0：普通模式, 1：互动模式（一人操作多人观看），2: 多人协同（键盘鼠标放开，需要应用配合）
        // playerMode: 1,
        //Task所有者:1 /  观察者:0
        // userType: 1,
        //口令:8位唯一码,写入TaskInfo
        // roomCode: '',
        // taskId: '',
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
      console.log("LarkSRClientEvent peerstatusreport", e);
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

    // reset states.
    this.setLarksr(larksr);
    this.resetLocalization();
    this.resize();

    // this.alert({des: 1});
    // this.confirm({des:"22"});
    console.log("ref", this.$refs["appContainer"]);

    let resizeTimeput = null;
    window.addEventListener("resize", () => {
        if (resizeTimeput) {
            window.clearTimeout(resizeTimeput);
        }
        resizeTimeput = window.setTimeout(() => {
            this.resize();
            resizeTimeput = null;
        }, 100);
    });
    window.addEventListener("orientationchange", () => {
        if (resizeTimeput) {
            window.clearTimeout(resizeTimeput);
        }
        resizeTimeput = window.setTimeout(() => {
            this.resize();
            resizeTimeput = null;
        }, 100);
    });
    this.resize();
  },
  beforeUnmount() {
    // 主动关闭
    this.larksr?.close();
  },
};
</script>

<style></style>
