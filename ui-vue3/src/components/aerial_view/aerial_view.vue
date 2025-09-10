<template>
    <ContentAlert :alertPositionStyle="alertPositionStyle">
        <template v-slot:close>
            <div @click="onCancel">
                <el-icon :size="'1.8rem'"><Close /></el-icon>
            </div>
        </template>
        <template v-slot:content>
            <div ref="aerialViewContainerRef" class="aerial-view-container" :style="containerStyle">
                <div ref="aerialViewBoxRef" class="aerial-view-box" :style="boxStyle"
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
            <div class="customContentAlert-divider"></div>
            <div class="button-group" style="margin-top: px2rem(20);" >
              <Btn class="submit" :title="commStore.ui.hideAerial" submit="false" v-on:click="onHide" />
            </div>
        </template>
    </ContentAlert>
</template>
<script setup>
import Log from "@/utils/log";
import ContentAlert from '../custom_content_alert/custom_content_alert.vue';
import Btn from '../button/button.vue';
import { useCommStore } from '@/stores/comm';
import { useModalSettingStore } from '@/stores/modal_setting';
import { useCustomContentAlertStore } from '@/stores/custom_content_alert';

const commStore = useCommStore();
const modalSettingStore = useModalSettingStore();
const customContentAlertStore = useCustomContentAlertStore();

const containerSize = reactive({width: 0, height: 0});
const boxSize = reactive({width: 0, height: 0});
const start = ref(false);
const boxPosition = reactive({x: 0, y: 0});
const offsetPositon = reactive({x: 0, y: 0});
const backgroundImage = ref("");

const alertPositionStyle = computed(() => {
    if(commStore.isMobile) {
        return {
            width: '200px',
            top: '75px',
            left: '20px',
            position: 'absolute'
        }
    } else {
        return {
            top: '75px',
            right: '20px',
            position: 'absolute'
        }
    }
})



const containerStyle = computed(() => {
    let res = "";
    if (containerSize.width && containerSize.height) {
        res += "width: " + containerSize.width + "px;height:" + containerSize.height + "px;";
    } 
    if (backgroundImage.value) {
        res += "background-image: url(" + backgroundImage.value + ");";
    }
    return res;
})

const boxStyle = computed(() => {
    let size = boxSize.width && boxSize.height ? "width:" + boxSize.width + "px;height:" + boxSize.height + "px;" : "";
    return "top:" + boxPosition.y + "px;left:" + boxPosition.x + "px;" + size;
})

// 方法
const onCancel = () => {
    customContentAlertStore.setCustomContentAlertTitle('');
    modalSettingStore.setAerialViewCheck(false);
    onClose();
};

const aerialViewContainerRef = ref(null);
const aerialViewBoxRef = ref(null);
const onStart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let clientX = 0;
    let clientY = 0;

    let screenOrientation = commStore.larksr?.screenState.screenOrientation;

    let isLandscape = screenOrientation === 'landscape';

    if (e.changedTouches) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    let containerSize = aerialViewContainerRef.value.getBoundingClientRect();
    let viewboxSize = aerialViewBoxRef.value.getBoundingClientRect();

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

    offsetPositon.x = px;
    offsetPositon.y = py;

    start.value = true;
    Log.info("aerial box drag start", viewboxSize, offsetPositon);
};
const onMove = (e) => {
    if (!start.value) {
        return;
    }

    e.preventDefault();
    e.stopPropagation();

    let screenOrientation = commStore.larksr?.screenState.screenOrientation;

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

    let containerSize = aerialViewContainerRef.value.getBoundingClientRect();
    let viewboxSize = aerialViewBoxRef.value.getBoundingClientRect();

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

    let px = clientX - offsetPositon.x - containerSize.x;
    let py = clientY - offsetPositon.y - containerSize.y;

    if (isLandscape) {
        px = clientY - offsetPositon.x - containerSize.y;
        py = viewboxSize.height - (clientX - containerSize.x) + offsetPositon.y;

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
    boxPosition.x = px;
    boxPosition.y = py;
    
};
const onEnd = (e) => {
    if(e)e.preventDefault();
    if(e)e.stopPropagation();

    let screenOrientation = commStore.larksr?.screenState.screenOrientation;

    let isLandscape = screenOrientation === 'landscape';
    
    let containerSize = aerialViewContainerRef.value.getBoundingClientRect();
    let viewboxSize = setBoxSize(containerSize);

    if (isLandscape) {
        const containerWidth = containerSize.width;
        containerSize.width = containerSize.height;
        containerSize.height = containerWidth;

        const viewboxWidth = viewboxSize.width;
        viewboxSize.width = viewboxSize.height;
        viewboxSize.height = viewboxWidth;
    }

    let px = boxPosition.x;
    let py = boxPosition.y;

    let scale = commStore.larksr?.currentAppSize ? commStore.larksr.currentAppSize.width / containerSize.width : 1;

    let box = {
        x: px * scale,
        y: py * scale,
        width: viewboxSize.width * scale,
        height: viewboxSize.height * scale,
    };

    Log.info("update box " ,  box);

    if (commStore.larksr.updateAerialview) {
        commStore.larksr.updateAerialview(box);
        modalSettingStore.setAeriaViewBoxEnd(box);
    }

    start.value = false;
};
const onHide = () => {
    commStore.setShowAerialView(false);
};
const onClose = () => {
    commStore.larksr.stopAerialview();
    commStore.toggleAerailView();
    modalSettingStore.setAeriaViewBoxEnd(null);
};
const init = () => {
    let screenOrientation = commStore.larksr?.screenState.screenOrientation;

    let isLandscape = screenOrientation === 'landscape';

    let containerSizes = aerialViewContainerRef.value.getBoundingClientRect();
    let viewboxSize = setBoxSize(containerSizes);
    // let viewboxSize = this.$refs["aerial-view-box"].getBoundingClientRect();

    if (isLandscape) {
        const containerWidth = containerSizes.width;
        containerSizes.width = containerSizes.height;
        containerSizes.height = containerWidth;

        const viewboxWidth = viewboxSize.width;
        viewboxSize.width = viewboxSize.height;
        viewboxSize.height = viewboxWidth;
    }

    if (!commStore.larksr) {
        Log.warn("larksr not inited");
        return;
    }

    let scale = commStore.larksr.currentAppSize.width / containerSizes.width;

    let asp = commStore.larksr.currentAppSize.height / commStore.larksr.currentAppSize.width;

    containerSizes.height = asp * containerSizes.width;
    viewboxSize.height = asp * viewboxSize.width;


    Log.info('aerial view mounted', commStore.larksr.currentAppSize, asp, containerSizes, viewboxSize);

    if (commStore.larksr.startAerialview) {
        // 恢复隐藏选择框之前的坐标位置
        if(modalSettingStore.aeriaViewBoxEnd) {
            boxPosition.x = modalSettingStore.aeriaViewBoxEnd.x/scale;
            boxPosition.y = modalSettingStore.aeriaViewBoxEnd.y/scale;
            commStore.larksr.startAerialview(modalSettingStore.aeriaViewBoxEnd, 1000, containerSizes.width, containerSizes.height);
        } else {
            commStore.larksr.startAerialview({
                x: 0,
                y: 0,
                width: viewboxSize.width * scale,
                height: viewboxSize.height * scale,
            }, 1000, containerSizes.width, containerSizes.height);
            
            boxPosition.x = 0;
            boxPosition.y = 0;
        }            
    }

    containerSize.width = containerSizes.width;
    containerSize.height = containerSizes.height;

    commStore.larksr.on("aerialviewscreen", (e) => {
        // Log.info("on aerialviewscreen", e, {"background-image": "url(" + e.data + ")" });
        backgroundImage.value = e.data;
    })
};
const setBoxSize = (containerSize) => {
    if(modalSettingStore.aeriaViewSelectScale==='21') {
        boxSize.width = containerSize.width/2;                    
        boxSize.height = containerSize.height/2;
    } else if(modalSettingStore.aeriaViewSelectScale==='31') {
        boxSize.width = containerSize.width/3;                    
        boxSize.height = containerSize.height/3;
    } else if(modalSettingStore.aeriaViewSelectScale==='41') {
        boxSize.width = containerSize.width/4;                    
        boxSize.height = containerSize.height/4;
    }   
    return boxSize;
};


watch(modalSettingStore.aeriaViewSelectScale, (newVal) => {
    if(newVal) {
        nextTick(() => {
            modalSettingStore.setAeriaViewBoxEnd(null);
            init(); 
            onEnd();      
        })                             
    }
});
onMounted(() => {
    Log.info('aerial view mounted', commStore.larksr);
    init();
})
</script>
<style lang="scss" scoped>
@import "aerial_view.scss";
</style>