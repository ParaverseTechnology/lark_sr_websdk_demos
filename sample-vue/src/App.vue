<template>
  <div id="app" ref="appContainer">
      <h1 style="position:absolute">Put YourComponents Here</h1>
  </div>
</template>

<script>
import { CreateLarkSRClientFromeAPI } from "larksr_websdk";

export default {
  name: "App",
  components: {},
  data() {
    return {
      larsr: null,
      appContainer: null,
    };
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
        authCode: "您的 SDK 授权码 联系 business@pingxingyun.com 获取",
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
        this.larksr = larksr;
        this.larksr.start();
        // 监听连接成功事件
        this.larksr.on('connect', (e) => { 
            console.log("LarkSRClientEvent CONNECT", e); 
        });                    
        this.larksr.on('gotremotesteam', (e) => { 
            console.log("LarkSRClientEvent gotremotesteam", e); 
        });                 
        this.larksr.on('meidaloaded', (e) => { 
            console.log("LarkSRClientEvent meidaloaded", e); 
        });                    
        this.larksr.on('mediaplaysuccess', (e) => { 
            console.log("LarkSRClientEvent mediaplaysuccess", e); 
        });                    
        this.larksr.on('mediaplayfailed', (e) => { 
            console.log("LarkSRClientEvent mediaplayfailed", e); 
        });                    
        this.larksr.on('meidaplaymute', (e) => { 
            console.log("LarkSRClientEvent meidaplaymute", e); 
        });
        console.log("load appli success", larksr);
        this.larksr.on('error', (e) => {
            console.error("LarkSRClientEvent error", e); 
            alert(JSON.stringify(e.message));
        });                   
        this.larksr.on('info', (e) => {
            console.log("LarkSRClientEvent info", e); 
        });
      })
      .catch((e) => {
        console.log("load appli failed", e);
        alert(JSON.stringify(e));
      });

    console.log("ref", this.$refs["appContainer"]);
  },
};
</script>

<style></style>
