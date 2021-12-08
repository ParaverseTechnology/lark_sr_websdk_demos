<template>
    <div v-if="modalConfirm.show" class="confirm" v-bind:style="viewPortStyle">
        <div class="container">
            <div class="content">
                <p>{{modalConfirm.des}}</p>
            </div>
            <div class="button-group">
                <div class="button" v-on:click="onSubmit">
                    <span>确定</span>
                </div>
                <div class="button" v-on:click="onCancel">
                    <span>取消</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { 
    mapState, 
    mapGetters 
}                 from 'vuex';

export default {
    data() {
        return {
            show: false,
        }
    },
    computed: {
        ...mapState({
            modalConfirm: state => state.modalConfirm.modalConfirm,
        }),
        ...mapGetters([
            'viewPortStyle'
        ])
    },
    methods: {
        onCancel() {
            if (this.modalConfirm.onCancel) {
                this.modalConfirm.onCancel();
            }
            this.$store.commit('modalConfirm/reset');
        },
        onSubmit() {
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
@import 'confirm.scss';
</style>