<template>
    <div v-if="modalAlert.show" class="alert" v-bind:style="viewPortStyle">
        <div class="container">
            <div class="content">
                <p>{{modalAlert.des}}</p>
            </div>
            <div class="button" v-on:click="onSubmit">
                <span>确定</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            show: false,
        }
    },
    computed: {
        ...mapState({
            modalAlert: state => state.modalAlert.modalAlert
        }),
        ...mapGetters([
            'viewPortStyle'
        ])
    },
    methods: {
        close() {
            this.show = !this.show;
        },
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
    }
}
</script>
<style lang="scss" scoped>
@import 'alert.scss';
</style>