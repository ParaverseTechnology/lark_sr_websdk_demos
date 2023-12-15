<template>
<div ref="aerial-view-container" class="aerial-view-container" :style="containerStyle">
    <div class="btn btn-hide" v-on:click="onHide">{{ ui.hideAerial }}</div>
    <div class="btn btn-close" v-on:click="onClose">{{ ui.closeAerial }}</div>
    <div ref="aerial-view-box" class="aerial-view-box" :style="boxStyle"
        v-on:mousedown="onStart"
        v-on:mouseup="onEnd"
        v-on:mousecancel="onEnd"
        v-on:mouseleave="onEnd"
        v-on:mousemove="onMove"
        v-on:touchstart="onStart"
        v-on:touchmove="onMove"
        v-on:touchcancle="onEnd"
        v-on:touchend="onEnd"
    >
    </div>
</div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapActions,
}                                   from 'vuex';
import Log                          from "@/utils/log";
import Capabilities                 from '@/utils/capabilities';

export default {
    components: {
    },
    data() {
        return {
            containerSize: {width: 0, height: 0},
            boxSize: {width: 0, height: 0},
            start: false,
            boxPosition: {x: 0, y: 0},
            offsetPositon: {x: 0, y: 0},
            backgroundImage: "",
        }
    },
    computed: {
        containerStyle() {
            let res = "";
            if (this.containerSize.width && this.containerSize.height) {
                res += "width: " + this.containerSize.width + "px;height:" + this.containerSize.height + "px;";
            } 
            if (this.backgroundImage) {
                res += "background-image: url(" + this.backgroundImage + ");";
            }
            // Log.info("containerStyle ", res);
            return res;
        },
        boxStyle() {
            let size = this.boxSize.width && this.boxSize.height ? "width:" + this.boxSize.width + "px;height:" + this.boxSize.height + "px;" : "";
            return "top:" + this.boxPosition.y + "px;left:" + this.boxPosition.x + "px;" + size;
        },
        ...mapState({
            larksr: state => state.larksr,  
            ui: state => state.ui,
            isMobile: state => state.isMobile,
            showAerialView: state => state.showAerialView,
        }),
    },
    methods: {
        onStart(e) {
            e.preventDefault();
            e.stopPropagation();

            let clientX = 0;
            let clientY = 0;

            let screenOrientation = this.larksr?.screenState.screenOrientation;

            let isLandscape = screenOrientation === 'landscape';

            if (e.changedTouches) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            let containerSize = this.$refs["aerial-view-container"].getBoundingClientRect();
            let viewboxSize = this.$refs["aerial-view-box"].getBoundingClientRect();

            if (isLandscape) {
                const containerWidth = containerSize.width;
                containerSize.width = containerSize.height;
                containerSize.height = containerWidth;

                const viewboxWidth = viewboxSize.width;
                viewboxSize.width = viewboxSize.height;
                viewboxSize.height = viewboxWidth;
            }

            let px = clientX - viewboxSize.left;
            let py = clientY - viewboxSize.top;

            if (isLandscape) {
                px = clientY - viewboxSize.top;
                py = viewboxSize.height - (clientX - viewboxSize.left);

                // Log.info("start isLandscape X", px, viewboxSize, containerSize);
                // Log.info("start isLandscape Y", py, clientX, viewboxSize, containerSize);
            }

            this.offsetPositon.x = px;
            this.offsetPositon.y = py;

            this.start = true;
            Log.info("aerial box drag start", viewboxSize, this.offsetPositon);
        },
        onMove(e) {
            if (!this.start) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            let screenOrientation = this.larksr?.screenState.screenOrientation;

            let isLandscape = screenOrientation === 'landscape';

            let clientX = 0;
            let clientY = 0;

            if (e.changedTouches) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            let containerSize = this.$refs["aerial-view-container"].getBoundingClientRect();
            let viewboxSize = this.$refs["aerial-view-box"].getBoundingClientRect();

            if (isLandscape) {
                const containerWidth = containerSize.width;
                containerSize.width = containerSize.height;
                containerSize.height = containerWidth;

                const viewboxWidth = viewboxSize.width;
                viewboxSize.width = viewboxSize.height;
                viewboxSize.height = viewboxWidth;
            }

            let offsetX = clientX - viewboxSize.left;
            let offsetY = clientY - viewboxSize.top;

            let px = clientX - this.offsetPositon.x - containerSize.x;
            let py = clientY - this.offsetPositon.y - containerSize.y;

            if (isLandscape) {
                px = clientY - this.offsetPositon.x - containerSize.y;
                py = viewboxSize.height - (clientX - containerSize.x) + this.offsetPositon.y;

                // Log.info("isLandscape X", px, clientY, this.offsetPositon, containerSize);
                // Log.info("isLandscape Y", py, clientX, this.offsetPositon, containerSize);
            }

            if (px < 0) {
                px = 0;
            }

            if (py < 0) {
                py = 0;
            }

            if (px > containerSize.width - viewboxSize.width) {
                px = containerSize.width - viewboxSize.width;
            }

            if (py > containerSize.height - viewboxSize.height) {
                py = containerSize.height - viewboxSize.height;
            }
            this.boxPosition = {
                x: px,
                y: py,
            }
        },
        onEnd(e) {
            e.preventDefault();
            e.stopPropagation();

            let screenOrientation = this.larksr?.screenState.screenOrientation;

            let isLandscape = screenOrientation === 'landscape';
            
            let containerSize = this.$refs["aerial-view-container"].getBoundingClientRect();
            let viewboxSize = this.$refs["aerial-view-box"].getBoundingClientRect();

            if (isLandscape) {
                const containerWidth = containerSize.width;
                containerSize.width = containerSize.height;
                containerSize.height = containerWidth;

                const viewboxWidth = viewboxSize.width;
                viewboxSize.width = viewboxSize.height;
                viewboxSize.height = viewboxWidth;
            }

            let px = this.boxPosition.x;
            let py = this.boxPosition.y;

            let scale = this.larksr?.currentAppSize ? this.larksr.currentAppSize.width / containerSize.width : 1;

            let box = {
                x: px * scale,
                y: py * scale,
                width: viewboxSize.width * scale,
                height: viewboxSize.height * scale,
            };

            Log.info("update box " ,  box);

            if (this.larksr.updateAerialview) {
                this.larksr.updateAerialview(box);
            }

            this.start = false;
        },
        onHide() {
            this.toggleAerailView();
        },
        onClose() {
            this.larksr.stopAerialview();
            this.toggleAerailView();
        },
        ...mapActions({
            toast: "toast/toast",
            notify: "notifyBar/notify",
            alert: "modalAlert/showModalAlert",
            toggleAerailView: 'toggleAerailView',
        }),
    },
    mounted() {
        Log.info('aerial view mounted', this.larksr);

        let screenOrientation = this.larksr?.screenState.screenOrientation;

        let isLandscape = screenOrientation === 'landscape';

        let containerSize = this.$refs["aerial-view-container"].getBoundingClientRect();
        let viewboxSize = this.$refs["aerial-view-box"].getBoundingClientRect();

        if (isLandscape) {
            const containerWidth = containerSize.width;
            containerSize.width = containerSize.height;
            containerSize.height = containerWidth;

            const viewboxWidth = viewboxSize.width;
            viewboxSize.width = viewboxSize.height;
            viewboxSize.height = viewboxWidth;
        }

        if (!this.larksr) {
            Log.warn("larksr not inited");
            return;
        }

        let scale = this.larksr.currentAppSize.width / containerSize.width;

        let asp = this.larksr.currentAppSize.height / this.larksr.currentAppSize.width;

        containerSize.height = asp * containerSize.width;
        viewboxSize.height = asp * viewboxSize.width;


        Log.info('aerial view mounted', this.larksr.currentAppSize, asp, containerSize, viewboxSize);

        if (this.larksr.startAerialview) {
            this.larksr.startAerialview({
                    x: 0,
                    y: 0,
                    width: viewboxSize.width * scale,
                    height: viewboxSize.height * scale,
                }, 1000, containerSize.width, containerSize.height);
        }

        this.containerSize = {
            width: containerSize.width,
            height: containerSize.height,
        };
        this.boxSize = {
            width: viewboxSize.width,
            height: viewboxSize.height,
        };

        this.larksr.on("aerialviewscreen", (e) => {
            // Log.info("on aerialviewscreen", e, {"background-image": "url(" + e.data + ")" });
            // $("#aerial-view-container").css({"background-image": "url(" + e.data + ")" });
            this.backgroundImage = e.data;
        })
    }
}
</script>
<style lang="scss" scoped>
@import "aerial_view.scss";
</style>