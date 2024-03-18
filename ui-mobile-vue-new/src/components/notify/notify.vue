<template>
    <div class="notifybar" v-bind:style="style">
        <div class="alertInfo">
            [{{notify.level}}]:{{notify.msg}}
        </div>
        <Btn 
            :info="ui.buttonClose"
            v-bind:src="CloseImg"
            v-on:click="clearNotify"
        />
    </div>
</template>
<script>
import { 
    mapState, 
    mapMutations,
}                    from 'vuex';
import Btn           from '../button/button';
import Log           from '@/utils/log';

export default {
    components: { Btn },
    data() {
        return {
            CloseImg: require('@/assets/images/close.svg')
        }
    },
    computed: {
        style() {
            const { container } = this;
			const res = {
				width: container.width + 'px',
				marginTop: container + 'px',
				marginLeft: container.marginLeft + 'px',
			};
			return res;
        },
        ...mapState({
            ui: state => state.ui,
            viewPort: state => state.viewPort,
            container: state => state.container,
            notify: state => state.notifyBar.notify
        }),
    },
    methods: {
        onClose() {
            Log.info('close notify bar');
        },
        ...mapMutations({
            clearNotify: 'notifyBar/clearNotify' 
        })
    }
}
</script>
<style lang="scss" scoped>
@import "notify.scss";
</style>