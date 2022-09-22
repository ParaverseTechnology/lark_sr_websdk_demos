<template>
  <div class="setup">
    <van-nav-bar
        title="初始设置"
    />
    <section class="section">
        <div class="block">
            <div class="block-title">
                进度
            </div>
            <van-steps :active="active">
                <van-step>设置服务器地址</van-step>
                <van-step>成功</van-step>
            </van-steps>
        </div>
        <div v-if="active == -1" class="block">
            <div class="block-title">
                <div>
                    服务器地址
                </div>
                <div>
                    例: http://192.168.0.55:8181/
                </div>
            </div>
            <van-field v-model="serverAddress" label="地址" placeholder="请输服务器地址" 
                :rules="[{ required: true, message: '请输服务器地址' }]">
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="primary" :loading="checkingServer" loading-text="测试地址中..." @click="onSubmitServerAddress">
                    确认当前地址
                </van-button>
            </div>
        </div>
    </section>
  </div>
</template>
<script>
import { Toast } from 'vant';
import Fetch from '../utils/fetch';

export default {
    data() {
        return {
            active: -1,
            checkingServer: false,
            serverAddress: '',
        }
    },
    methods: {
        onSubmitServerAddress() {
            console.log('checking server', this.serverAddress, this.Host);
            if (!this.serverAddress) {
                Toast("请输服务器地址");
                return;
            }
            try {
                let url = new URL(this.serverAddress);
                this.saveHost(this.serverAddress);
                console.log("Setup serverAddr", url);
                this.checkingServer = true;
                Fetch.Get("/getVersionInfo")
                .then((res) => {
                    console.log('检测服务器地址成功', res);
                    Toast("设置成功: " + res.version);
                    this.active++;
                    this.$router.replace("/");
                })
                .catch((e) => {
                    console.log('检测服务器地址失败', e);
                    Toast("检测服务器地址失败:" + JSON.stringify(e));    
                })
                .finally(() => { this.checkingServer = false; });
            } catch (e) {
                Toast("URL 格式不正确，正确格式：例: http://192.168.0.55:8181/");
            }
        },
    },
    mounted() {
    },
}
</script>
<style scoped>
.section {
    box-sizing: border-box;
    min-height: calc(100vh - 56px);
    padding-bottom: 20px;
}
.section .block-title {
    margin: 0;
    padding: 32px 16px 16px;
    color: rgba(69,90,100,.6);
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
}
</style>