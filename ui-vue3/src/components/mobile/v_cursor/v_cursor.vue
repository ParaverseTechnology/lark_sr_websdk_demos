<template>
    <div v-if="useVMouse" :style="commStore.viewPortStyle">
        <!-- virtual mouse -->
        <MouseButton v-bind:style="vmouseStyle" v-on:touchstart="onTouchStart" v-on:touchend="onTouchEnd"
            v-on:drag="onDrag">
            <img v-if="mouseButton == 'left'" src="@/assets/img/mobile/cursor_left.png" alt="">
            <img v-else-if="mouseButton == 'right'" src="@/assets/img/mobile/cursor_right.png" alt="">
            <img v-else-if="mouseButton == 'mid'" src="@/assets/img/mobile/cursor_mid.png" alt="">
            <img v-else src="@/assets/img/mobile/cursor_left.png" alt="">
        </MouseButton>
        <MouseButton class="touchbackground" v-on:touchstart="onTouchStart" v-on:touchend="onTouchEnd"
            v-on:drag="onDrag">
        </MouseButton>
    </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import MouseButton      from './mouse_button/mouse_button.vue';
import Unit             from '@/utils/unit';

const commStore = useCommStore();

const props = defineProps(['useVMouse', 'mouseButton']);

const toggle = ref(true);
const vmousePosition = ref({
    x: 0,
    y: 0,
});
const vmouseRightEdge = ref(false);
const vmouseBottomEdge = ref(false);
const vmouseLeftEdge = ref(false);
const dragStarted = ref(false);
const dragStartPosition = ref({
    x: 0,
    y: 0,
});
const offsetPositon = ref({
    x: 0,
    y: 0,
});
const position = ref({
    x: 0,
    y: 0,
});

const larksr = computed(() => { return commStore.larksr });



const vmouseStyle = computed(() => {
    let res = {
        top: vmousePosition.value.y + 'px',
        left: vmousePosition.value.x + 'px',
    };
    if (vmouseRightEdge.value) {
        res.transform = "rotateY(180deg)";
        res.transformOrigin = "left top";
    }
    if (vmouseBottomEdge.value) {
        res.transform = "rotateZ(180deg)";
        res.transformOrigin = "left top";
    }
    if (vmouseLeftEdge.value && vmouseBottomEdge.value) {
        res.transform = "rotateZ(270deg)";
        res.transformOrigin = "left top";
    }
    return res;
});

// 方法
// vmouse motion.
const onTouchStart = () => {
    const p = vmousePosition.value;
    onVirtualMouseDown(props.mouseButton, p.x, p.y);
};
const onTouchEnd = () => {
    const p = vmousePosition.value;
    onVirtualMouseUp(props.mouseButton, p.x, p.y);
};
const onDrag = (e) => {
    let p;
    let r;
    if (commStore.screenOrientation == 'landscape') {
        p = {
            x: vmousePosition.value.x + e.y,
            y: vmousePosition.value.y - e.x,
        }
        r = {
            x: e.y,
            y: e.x,
        }
    } else {
        p = {
            x: vmousePosition.value.x + e.x,
            y: vmousePosition.value.y + e.y,
        };
        r = {
            x: e.x,
            y: e.y,
        }
    }
    if (p.x < 0) p.x = 0;
    vmouseLeftEdge.value = (p.x <= 30);
    if (p.x >= commStore.viewPort.width) {
        p.x = commStore.viewPort.width;
    }
    vmouseRightEdge.value = (p.x >= commStore.viewPort.width - 30);
    if (p.y < 0) p.y = 0;
    if (p.y >= commStore.viewPort.height) {
        p.y = commStore.viewPort.height;
    }
    vmouseBottomEdge.value = (p.y >= commStore.viewPort.height - 30);

    vmousePosition.value = p;

    // Log.info("onDrag", p, screenOrientation);

    onVirtualMouseMove(p.x, p.y, r.x, r.y);
};
// control ball.
const onDragStart = (e) => {
    // 注意旋转屏幕时坐标系的变换
    if (commStore.screenOrientation == 'landscape') {
        const offsetRect = Unit.getBoundingClientRect(e.target);
        offsetPositon.value = {
            x: e.changedTouches[0].clientY - offsetRect.top,
            y: offsetRect.right - e.changedTouches[0].clientX,
        }
        console.log("on drag start", offsetRect, e.changedTouches[0].clientX,
            offsetRect.right - e.changedTouches[0].clientX,
            e.changedTouches[0].clientY - offsetRect.top);
    } else {
        const offsetViewPort = Unit.getOffsetViewport(e.target);
        offsetPositon.value = {
            x: e.changedTouches[0].clientX - offsetViewPort.offsetX,
            y: e.changedTouches[0].clientY - offsetViewPort.offsetY,
        }
    }
    dragStartPosition.value = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
    }
};
const onDragBall = (e) => {
    
    if (!dragStarted.value) {
        let disx = e.changedTouches[0].clientX - dragStartPosition.value.x;
        let disy = e.changedTouches[0].clientY - dragStartPosition.value.y;
        let distance = Math.sqrt(disx * disx + disy * disy);
        if (distance < 40) {
            return;
        }
        dragStarted.value = true;
    }
    // 注意旋转屏幕时坐标系的变换
    if (commStore.screenOrientation == 'landscape') {
        commStore.setMobileControlBallPosition({
            x: e.changedTouches[0].clientY - offsetPositon.value.x,
            y: commStore.viewPort.height - e.changedTouches[0].clientX - offsetPositon.value.y,
        });
    } else {
        commStore.setMobileControlBallPosition({
            x: e.changedTouches[0].clientX - offsetPositon.value.x,
            y: e.changedTouches[0].clientY - offsetPositon.value.y,
        });
    }
    // console.log("on drag control ball", e);
};
const onDragEnd = (e) => {
    
    if (dragStarted.value) {
        // 注意旋转屏幕时坐标系的变换
        if (commStore.screenOrientation == 'landscape') {
            commStore.setMobileControlBallPosition({
                x: e.changedTouches[0].clientY - offsetPositon.value.x,
                y: commStore.viewPort.height - e.changedTouches[0].clientX - offsetPositon.value.y,
            });
        } else {
            commStore.setMobileControlBallPosition({
                x: e.changedTouches[0].clientX - offsetPositon.value.x,
                y: e.changedTouches[0].clientY - offsetPositon.value.y,
            });
        }
    }
    dragStarted.value = false;
    dragStartPosition.value = {
        x: 0,
        y: 0,
    }
    // console.log("on drag end", e, this.position, offsetPositon.value);
};
// 网页坐标转换为云端应用坐标
const getVMouseTouchPosition = (localX, localY, localRX, localRY) => {
    
    const scale = commStore.operateScale;
    let p = { x: 0, y: 0, rx: 0, ry: 0 };
    p.x = localX - commStore.container.marginLeft;
    p.y = localY - commStore.container.marginTop;
    p.rx = localRX;
    p.ry = localRY;
    p.x = Math.round(p.x * scale.scaleX);
    p.y = Math.round(p.y * scale.scaleY);
    // WARNING 虚拟鼠标不同与触摸事件.
    p.rx = Math.round(p.rx * scale.scaleX);
    p.ry = Math.round(p.ry * scale.scaleX);
    // check p;
    if (p.x < 0 || p.y < 0 || p.x > commStore.appSize.width || p.y > commStore.appSize.height) {
        // outside app screen.
        return null;
    }
    return p;
};

const onVirtualMouseMove = (localX, localY, localRX, localRY) => {
    const p = getVMouseTouchPosition(localX, localY, localRX, localRY);
    if (!p) return;
    larksr.value?.moseMove(p.x, p.y, p.rx, p.ry);
};

const onVirtualMouseDown = (button, localX, localY) => {
    const p = getVMouseTouchPosition(localX, localY, 0, 0);
    if (!p) return;
    switch (button) {
        case 'left':
            larksr.value?.mouseDown(p.x, p.y, 0);
            break;
        case 'right':
            larksr.value?.mouseDown(p.x, p.y, 1);
            break;
        case 'mid':
            larksr.value?.mouseDown(p.x, p.y, 2);
            break;
    }
};

const onVirtualMouseUp = (button, localX, localY) => {
    const p = getVMouseTouchPosition(localX, localY, 0, 0);
    if (!p) return;
    switch (button) {
        case 'left':
            larksr.value?.mouseUp(p.x, p.y, 0);
            break;
        case 'right':
            larksr.value?.mouseUp(p.x, p.y, 1);
            break;
        case 'mid':
            larksr.value?.mouseUp(p.x, p.y, 2);
            break;
    }
};
const showInput = () => {
    commStore.setInputMethodEnable( true);
    commStore.setInputMethodStart( true);
};
</script>
<style lang="scss" scoped>
@import 'v_cursor.scss';
</style>