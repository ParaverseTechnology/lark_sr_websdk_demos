<template>
  <div id="app" ref="appContainer">
    <!-- 手机端 UI -->
    <MobileIndex v-if="isMobile"></MobileIndex>
  </div>
</template>

<script>
import { CreateLarkSRClientFromeAPI } from "larksr_websdk";
import MobileIndex from "./components/mobile/index";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    MobileIndex,
  },
  data() {
    return {
      appContainer: null,
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
    }),
    ...mapActions({
      resize: "resize",
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
        authCode: "2ad9f9a6aa454a11df274e900613510b",
        // 视频缩放模式，默认保留宽高比，不会拉伸并完整显示在容器中
        scaleMode: "contain",
        // 0 -》 用户手动触发, 1 -》 首次点击进入触发, 2 -》 每次点击触发
        fullScreenMode: 0,
        // 测试载入背景图
        loadingBgUrl: "https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg",
      },
      { appliId: "879414254636105728" }
    )
      .then((larksr) => {
        larksr.start();
        // 监听连接成功事件
        larksr.on("connect", function (e) {
          console.log("LarkSRClientEvent CONNECT", e);
        });
        larksr.on("gotremotesteam", function (e) {
          console.log("LarkSRClientEvent gotremotesteam", e);
        });
        larksr.on("meidaloaded", function (e) {
          console.log("LarkSRClientEvent meidaloaded", e);
        });
        larksr.on("mediaplaysuccess", function (e) {
          console.log("LarkSRClientEvent mediaplaysuccess", e);
        });
        larksr.on("mediaplayfailed", function (e) {
          console.log("LarkSRClientEvent mediaplayfailed", e);
        });
        larksr.on("meidaplaymute", function (e) {
          console.log("LarkSRClientEvent meidaplaymute", e);
        });
        console.log("load appli success", larksr);

        this.setLarksr(larksr);
        this.resize();
      })
      .catch((e) => {
        console.log("load appli failed", e);
      });

    console.log("ref", this.$refs["appContainer"]);

    window.addEventListener("resize", this.resize);
    window.addEventListener("orientationchange", this.resize);
    this.resize();
  },
};
</script>

<style></style>
