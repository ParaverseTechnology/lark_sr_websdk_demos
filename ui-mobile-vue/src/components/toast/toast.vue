<template>
    <div v-if="toast.show" class="toast" :style="toastPosition">
        <span class="toastText" :style="toastText">{{toast.text}}</span>
    </div>
</template>
<script>
import { 
    mapState, 
}                 from 'vuex'
import { 
    ToastPosition 
}                 from '@/store/modules/toast'

export default {
    name: 'Toast',
    computed: {
        toastText() {
            if (this.toast.level == 3) {
                return {
                    // 'border': '1px solid #F76260',
                    'background-color': 'rgba(18, 37, 95, 1.0)',
                    color: 'white',
                }
            } else {
                return {};
            }
        },
        toastPosition() {
            const position = this.toast.position;
            let top = "";
            if (position) {
                if (position === ToastPosition.UP) {
                    top = '3%';
                } else if (position === ToastPosition.DOWN) {
                    top = '85%';
                }
            }
            if (this.toast.level == 3) {
                return {
                    // 'border': '1px solid #F76260',
                    // 'background-color': 'rgba(18, 37, 95, 1.0)',
                    // color: 'white',
                    top,
                }
            } else {
                return {
                    top,
                }
            }
        },
        ...mapState({
            'toast': state => { return state.toast.toast; }
        })
    }
}
</script>
<style lang="scss" scoped>
@import "toast.scss";
</style>