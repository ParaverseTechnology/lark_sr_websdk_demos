<template>
    <div v-if="notifyBar.show" class="notify">
        <span> [{{notify.level}}]:{{notify.msg}}</span>
        <div class="btn-close" v-on:click="clearNotify"></div>
    </div>
</template>
<script>
import { 
    mapState, 
    mapMutations,
}                          from 'vuex';
export default {
    components: {
    },
    data() {
        return {
            show: false,
        }
    },
    computed: {
        ...mapState({
            viewPort: state => state.viewPort,
            container: state => state.container,
            notifyBar: state => state.notifyBar,
            notify: state => state.notifyBar.notify
        }),
    },
    methods: {
        close() {
            this.show = !this.show;
        },
        ...mapMutations({
            clearNotify: 'notifyBar/clearNotify' 
        })
    }
}
</script>
<style lang="scss" scoped>
@import 'notify.scss';
</style>