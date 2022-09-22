import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

const mixin = {
    computed: {
        ...mapState({
            Host: state => state.Host,
        }),
        ...mapGetters({
        }),
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            saveHost: 'saveHost',
            restoreHost: 'restoreHost',
        }),
    }
}

createApp(App)
.use(store)
.use(router)
.use(Vant)
.mixin(mixin)
.mount('#app')
