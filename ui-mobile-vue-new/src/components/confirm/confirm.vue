<template>
    <div class="modalConfirmPanel" v-bind:style="viewPortStyle">
        <div class="container">
            <div class="modalConfirmPanel-title">
                <div>
                    <p>{{modalConfirm.title}}</p>
                </div>
                <div v-on:click="onCancel">
                    <i class="el-icon-close"></i>
                </div>
            </div>
            <div class="content">
                <p>{{modalConfirm.des}}</p>
            </div>
            <div class="modalConfirmPanel-divider"></div>
            <div class="button-group">
                <Btn class="submit" :title="ui.buttonSubmit" submit="false" v-on:click="onSubmit" />
                <Btn class="cancel" :title="ui.buttonCancel" submit="false" v-on:click="onCancel" />
            </div>
        </div>
    </div>
</template>
<script>
import Btn        from '../button/button';
import Log        from '@/utils/log';
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
            modalConfirm: state => state.modalConfirm.modalConfirm,
        }),
        ...mapGetters([
            'viewPortStyle'
        ]),
    },
    methods: {
        onCancel() {
            Log.info('onCancel');
            if (this.modalConfirm.onCancel) {
                this.modalConfirm.onCancel();
            }
            this.$store.commit('modalConfirm/reset');
        },
        onSubmit() {
            Log.info('onSubmit');
            if (this.modalConfirm.onSubmit) {
                this.modalConfirm.onSubmit();
            }
            this.$store.commit('modalConfirm/reset');
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
@import "confirm.scss";
</style>
