<template>
  <div id="app" ref="appContainer">
    <!-- 手机端 UI -->
    <MobileIndex v-if="cloudReady && isMobile"></MobileIndex>
    <Alert />
    <Notify />
    <Toast />
    <Confirm />
    <RttInfo />
  </div>
</template>

<script>
import { CreateLarkSRClientFromeAPI } from "larksr_websdk";
import MobileIndex from "./components/mobile/index";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Unit from './utils/unit';
import Alert               from './components/alert/alert';
import Notify              from './components/notify/notify';
import Toast               from './components/toast/toast';
import Confirm             from './components/confirm/confirm';
import RttInfo             from './components/rttinfo/rttinfo';

export default {
  name: "App",
  components: {
    MobileIndex,
    Alert,
    Notify,
    Toast,
    Confirm,
    RttInfo,
  },
  data() {
    return {
      appContainer: null,
      cloudReady: false,
    };
  },
  computed: {
    ...mapState({
      larsr: state => state.larsr,
      isMobile: (state) => state.isMobile,
    }),
  },
  methods: {
    ...mapMutations({
        setLarksr: "setLarksr",
        setAggregatedStats: "setAggregatedStats",
    }),
    ...mapActions({
      resize: "resize",
      'toast': 'toast/toast',
      'notify': 'notifyBar/notify',
      'alert': 'modalAlert/showModalAlert',
      'confirm': 'modalConfirm/showModalConfirm',
    }),
  },
  mounted() {
    // 直接调用进入应用接口创建实例，自动配置连接云端资源
    CreateLarkSRClientFromeAPI(
      {
        rootElement: this.$refs["appContainer"],
        // 服务器地址,实际使用中填写您的服务器地址
        // 如：http://222.128.6.137:8181/
        serverAddress: "http://222.128.6.137:8181/",
        // 授权码
        authCode: "授权码",
        // 视频缩放模式，默认保留宽高比，不会拉伸并完整显示在容器中
        scaleMode: "contain",
        // 0 -》 用户手动触发, 1 -》 首次点击进入触发, 2 -》 每次点击触发
        fullScreenMode: 0,
        mobileFullScreenMode: 1,
        // 测试载入背景图
        loadingBgUrl: "https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg",
        // show log
        logLevel: 'info',
      },
      { appliId: "879414254636105728" }
    )
      .then((larksr) => {
        larksr.start();
        
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

        larksr.on("mediaplayfailed", (e) => {
          console.log("LarkSRClientEvent mediaplayfailed", e);
          this.alert({des: "开始"})
          .then(() => {
              larksr.videoElement.sountPlayout();
              larksr.videoElement.playVideo();
          });
        });

        larksr.on("meidaplaymute", (e) => {
          console.log("LarkSRClientEvent meidaplaymute", e);
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

        this.setLarksr(larksr);
        this.resize();
      })
      .catch((e) => {
        console.log("load appli failed", e);
        alert(JSON.stringify(e));
      });

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
};
</script>

<style></style>
