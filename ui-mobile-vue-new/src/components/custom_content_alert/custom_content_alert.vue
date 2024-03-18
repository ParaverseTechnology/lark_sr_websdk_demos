<template>
    <div class="customContentAlert" :style="viewPortStyles">        
        <div class="customContentAlert-container" :style="alertPositionStyle">
            <div class="customContentAlert-title">
                <div>
                    <p>{{customContentAlertTitle}}</p>
                </div>
                <slot name="close"></slot>
            </div>
            <div class="customContentAlert-content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'CustomContentAlert',
    props: {
        alertPositionStyle: {
            type: Object,
            require: false
        },
        customContentStyle: {
            type: String,
            require: false
        }
    },
    computed: {
        ...mapState({
            customContentAlertTitle: state => state.customContentAlert.customContentAlertTitle
        }),
        viewPortStyles() {
            if(this.customContentStyle) {
                return this.customContentStyle;
            } else {
                return {
                    'width': this.viewPort.width+'px'
                }
            }
        },
        ...mapGetters([
            'viewPortStyle',
            'viewPort'
        ]),
    },
    methods: {},
    mounted() {},
    beforeDestroy() {},
}
</script>
<style lang="scss" scoped>
@import "custom_content_alert.scss";
</style>