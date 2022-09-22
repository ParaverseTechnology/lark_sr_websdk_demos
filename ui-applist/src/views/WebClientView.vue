<template>
    <div class="container">
        <van-nav-bar
            title="LarkXR"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <iframe frameborder="0" id="iframe" :src="url">
        </iframe>
    </div>
</template>
<script>
export default {
    data() {
        return {
            url: ""
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        onMessage(e) {
            if (e.data.type == 920) {
                this.$router.back();
            }
        }
    },
    mounted() {
        this.url = window.decodeURIComponent(this.$route.query.url);
        console.log('load iframe ', this.$route.query.url, this.url);
        window.addEventListener("message", this.onMessage, false);
    },
    beforeMount() {
        window.removeEventListener("message", this.onMessage, false);
        this.url = "";
    }
}
</script>
<style scoped>
.container {
    width: 100vw;
    height: 100vh;;
    border: 0;
    margin: 0;
    padding: 0;
}
iframe {
    width: 100vw;
    height: calc(100vh - 46px);;
    border: 0;
    margin: 0;
    padding: 0;
}
</style>