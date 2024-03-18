<template>
    <div class="modalAlertPanel" v-bind:style="viewPortStyle">
        <div class="container">
            <div class="container-title">
                <div>
                    <p>提示</p>
                </div>
            </div>
            <div class="content">
                <p>{{modalAlert.des}}</p>
            </div>
            <div class="modalConfirmPanel-divider"></div>
            <div class="button-group">
                <Btn :title="ui.buttonSubmit" submit="true" v-on:click="onSubmit" />
            </div>
        </div>
    </div>
</template>
<script>
import Btn        from '../button/button';
import { 
    mapState, 
    mapGetters,
}                 from 'vuex'

export default {
    name: 'ModalAlert',
    components: { Btn },
    computed: {
        ...mapState({
            ui: state => state.ui,
            modalAlert: state => state.modalAlert.modalAlert
        }),
        ...mapGetters([
            'viewPortStyle'
        ]),
    },
    methods: {
        onSubmit() {
            if (this.modalAlert.callback) {
                this.modalAlert.callback();
            }
            this.$store.commit('modalAlert/reset')
        },
        onKeyup(e) {
            if (e.key == 'Enter') {
                this.onSubmit();
            }
        }
    },
    mounted() {
        document.addEventListener('keyup', this.onKeyup);
    },
    beforeDestroy() {
        document.removeEventListener('keyup', this.onKeyup);
    },
}
</script>
<style lang="scss" scoped>
@import "alert.scss";
</style>