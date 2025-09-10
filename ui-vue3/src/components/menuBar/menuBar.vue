<template>
  <div
      ref="controlBall"
      :class="{'menubar': true,'menubar-bg': showMenubar,}"
      :style="positionStyle"
      draggable="true"
      v-on:dragstart="onDragStart"
      v-on:dragend="onDragEnd"
      v-on:drag="onDrag"
      @drop="onDragEnd"
  >
    <template v-if="showMenubar">
        <!-- 菜单条 -->
        <div class="menubar-box">
            <!-- 左侧摄像头 麦克风 live等 -->
            <div class="menu-tools">
                <VideoInput />
                <MicInput />
                <Tooltip class="menu-tools-box" v-if="isLiveStream">
                    <template #title>{{ ui.liveStream}}</template>
                    <div class="menu-icon" @click="liveStreamFn">
                        <i class="iconfont icon-stream" style="font-size: 28px;display: inline-block;margin-top: 1px;"></i>
                    </div>
                </Tooltip>
            </div>
            <el-divider v-if="isLiveStream || videoInput || audioInput" direction="vertical" style="height:2rem"></el-divider>
            <!-- 右侧基础菜单 -->
            <div class="basemenu">
                <Tooltip>
                    <template #title>{{commStore.enableChineseInput? ui.chineseInput: ui.disableChineseInput}}</template>
                    <div class="menu-icon" @click.prevent="changeTextInputFn">
                        <i :class="commStore.enableChineseInput?'iconfont icon-shurufa':'iconfont icon-shurufa_off'"></i>
                    </div>
                </Tooltip>
                <Tooltip>
                    <template #title>{{ ui.inputText }}</template>
                    <div class="menu-icon" @click.prevent="showInput">
                        <i class="iconfont icon-menuBarIcon1"></i>
                    </div>
                </Tooltip>
                <Tooltip>
                    <template #title>{{ ui.restart }}</template>
                    <div class="menu-icon" @click.prevent="restartFn">
                        <i class="iconfont icon-menuBarIcon2"></i>
                    </div>
                </Tooltip>
                <Tooltip v-if="larksr.fullScreen.isFullScreen">
                    <template #title>{{ ui.fullScreenExit }}</template>
                    <div class="menu-icon" @click.prevent="onFullScreen">
                        <i class="iconfont icon-menuBarIcon3_click fullScreen-hover"></i>
                    </div>
                </Tooltip>
                <Tooltip v-else>
                    <template #title>{{ ui.fullScreen }}</template>
                    <div class="menu-icon" @click.prevent="onFullScreen">
                        <i class="iconfont icon-menuBarIcon3"></i>
                    </div>
                </Tooltip>
                <Tooltip>
                    <template #title>{{ ui.network}}</template>
                    <div class="menu-icon" @click="networkStateFn">
                        <i class="iconfont icon-menuBarIcon4"></i>
                    </div>
                </Tooltip>
                <Tooltip>
                    <template #title>{{ ui.setting }}</template>
                    <div class="menu-icon" @click="showSettingAlertFn">
                        <i class="iconfont icon-menuBarIcon5"></i>
                    </div>
                </Tooltip>
                <Tooltip>
                    <template #title>{{ ui.help }}</template>
                    <div class="menu-icon" @click.prevent="showHelpAlert">
                        <i class="iconfont icon-menuBarIcon6"></i>
                    </div>
                </Tooltip>
            </div>
        </div>
        <div v-if="commStore.menubarPosition==='top'"
            @mouseenter="barHoverFn"
            @mouseleave="barLeaveFn"
            :class="'menubar-bar-top menubar-bar'"
            :style="barHoverStyle"
            @click="toogleMenubar">
            <span class="iconfont icon-bar_1" style="transform: rotate(180deg)"></span>
            <el-icon v-if="isBarHover"><ArrowUpBold /></el-icon>
        </div>
        <div v-else
            @mouseenter="barHoverFn"
            @mouseleave="barLeaveFn"
            :class="'menubar-bar-bottom menubar-bar'"
            :style="barHoverStyle"
            @click="toogleMenubar">
            <span class="iconfont icon-bar_1"></span>
            <el-icon v-if="isBarHover"><ArrowDownBold /></el-icon>
        </div>
    </template>
    <div v-else class="hide-arrow-box" @click="toogleMenubar">
        <el-icon class="hide-arrow" v-if="commStore.menubarPosition==='top'"><ArrowDownBold /></el-icon>
        <el-icon class="hide-arrow" v-else><ArrowUpBold /></el-icon>
    </div>
  </div>
</template>
<script setup>
import Log                          from "@/utils/log";
import Unit                         from '@/utils/unit'
import Load                         from '@/load';
import MicInput                     from '../mic_input/mic_input.vue';
import VideoInput                   from '../video_input/video_input.vue';
import Tooltip                      from './components/tooltip.vue';
import { useCommStore }             from '@/stores/comm.js';
import { useModalHelpStore }        from '@/stores/modal_help.js';
import { useStateModalStore }       from '@/stores/state_modal.js';
import { useCustomContentAlertStore } from '@/stores/custom_content_alert.js';
import { useModalConfirmStore }     from '@/stores/modal_confirm.js';
import { useModalStreamStore }      from '@/stores/modal_stream.js';
import { useModalSettingStore }     from '@/stores/modal_setting.js';


const commStore = useCommStore();
const modalHelpStore = useModalHelpStore();
const stateModalStore = useStateModalStore();
const customContentAlertStore = useCustomContentAlertStore();
const modalConfirmStore = useModalConfirmStore();
const modalStreamStore = useModalStreamStore();
const modalSettingStore = useModalSettingStore();

const ui = computed(() => commStore.ui);
const larksr = computed(() => commStore.larksr);


const showMenubar = ref(false);
const isBarHover  = ref(false);
const offsetPositon = reactive({
    x: 0,
    y: 0,
});
const position = reactive({
    x: 0,
    y: 5,
});
const dragStartPosition = reactive({
    x: 0,
    y: 5,
});

const dragStarted = ref(false);



const barHoverStyle = computed(() => {
    const scal = isBarHover.value? '1': '0.6';
    const bottom = isBarHover.value? '-14': '-13';
    const color = isBarHover.value? 'var(--webclient-menubar-btn-hover-bg)': 'var(--webclient-menubar-btn-bg)';
    if(commStore.menubarPosition === 'top') {
        return {
            'transform': 'translateX(-50%) scale('+scal+')',
            'bottom': bottom+'px',
            'transition': 'all .5s',
            'color': color,
        }
    } else {
        return {
            'transform': 'translateX(-50%) scale('+scal+')',
            'top': bottom+'px',
            'transition': 'all .5s',
            'color': color
        }
    }
})

const positionStyle = computed(() => {
    if (position.x != 0) {
        return {
            top: position.y + "px",
            left: position.x + "px",
        }
    } else {
        if(position.y > commStore.viewPort.height/2) {
            commStore.setMenubarPosition('bottom');
            return {
                bottom: '5px',
                top: 'auto',
                left: "50%",
                transform: 'translateX(-50%)',
            };
        }else {
            commStore.setMenubarPosition('top');
            return {
                bottom: 'auto',
                top: position.y + "px",
                left: "50%",
                transform: 'translateX(-50%)',
            };
        }
    }
})

const popContentRotatedClass = computed(() => {
    let clazz = "pop-content";
    const { x, y } = position;
    if (x == 0 && y == 0) {
        return clazz;
    }
    const { width, height } = commStore.viewPort;
    if (y < 55) {
        clazz += " rotate-down";
    } else if (x < 65) {
        clazz += " rotate-right";
    } else if (height - y < 120) {
        clazz += " rotate-up";
    }
    // rotate-right
    return clazz;
})

// const isFullScreen = ref(false);
// watch(larksr.value.fullScreen, (val) => {
//     console.log('12312312312', val)
//     return val.isFullScreen
// },{immediate: true, deep: true})
const isFullScreen = computed(() => {return larksr.value.fullScreen.isFullScreen});

const isLiveStream = computed(() => {
    return larksr.value?.params.liveStreaming;
})

const audioInput = computed(() => {
    return larksr.value?.params.audioInput;
})

const videoInput = computed(() => {
    return larksr.value?.params.videoInput;
})

const toogleMenubar = () => {
    showMenubar.value = !showMenubar.value;
};
const barHoverFn = () => {
    isBarHover.value = true;
};
const barLeaveFn = () => {
    isBarHover.value = false;
};

const networkStateFn = () => {
    stateModalStore.toggleState();
    customContentAlertStore.setCustomContentAlertTitle(ui.value.net);
};

const showHelpAlert = () => {
    if(!modalHelpStore.isShowHelpAlert) {
        modalHelpStore.setIsShowHelpAlert(true);
        
        customContentAlertStore.setCustomContentAlertTitle(ui.value.help);
    } else {
        modalHelpStore.setIsShowHelpAlert(false);
        customContentAlertStore.setCustomContentAlertTitle('');
    }
};
const restartFn = () => {
    modalConfirmStore.showModalConfirm({title: ui.value.restart, des: ui.value.restartTip})
    .then(()=>{
        Log.info('restart Appli confirm');
        larksr.value?.restartCloudApp();
    })
    .catch((e) => {
        Log.info('restart Appli cancle');
    });
};
const liveStreamFn = () => {
    modalStreamStore.setIsShowStreamAlert(true);
    customContentAlertStore.setCustomContentAlertTitle('推流设置');
};
const showSettingAlertFn = () => {
    modalSettingStore.setIsShowSettingAlert(true);
};
const onDragStart = (e) => {
    e.dataTransfer?.setDragImage(new Image(), 0, 0);// 去除重影
    Log.info("on drag start", e);
    const offsetViewPort = Unit.getOffsetViewport(e.target);
    offsetPositon.x = e.clientX - offsetViewPort.offsetX;
    offsetPositon.y = e.clientY - offsetViewPort.offsetY;
    
    dragStartPosition.x = e.clientX;
    dragStartPosition.y = e.clientY;
    
};

const onDragEnd = (e) => {
    Log.info("on drag end", e);
    if (dragStarted.value) {
        position.x = 0;
        if(e.clientY > commStore.viewPort.height/2) {
            position.y = e.clientY;
        } else {
            position.y = 5;
        }
    }
    dragStarted.value = false;
    dragStartPosition.x = 0;
    dragStartPosition.y = 0;
    // if(!this.isFix) {
    //     this.menuTimer = setTimeout(() => {
    //         this.menuBarShrking();
    //         if(this.menuTimer) clearTimeout(this.menuTimer);
    //     },2000);
    // }
};
const onDrag = (e) => {
    // Log.info("on drag move", e);
    e.preventDefault();
    e.stopPropagation();
    if (!dragStarted.value) {
        let disx = e.clientX - dragStartPosition.x;
        let disy = e.clientY - dragStartPosition.y;
        let distance = Math.sqrt(disx*disx + disy*disy);
        if (distance < 40) {
            return;
        }
        dragStarted.value = true;
    }
    position.x = e.clientX;
    position.y = e.clientY;
    
};
const resizePosition = () => {
    
    if (position.x != 0) {
        return {
            top: position.y + "px",
            left: position.x + "px",
        }
    } else {
        if(position.y > commStore.viewPort.height/2) {
        return {
            bottom: 0,
            top: 'auto',
            left: "50%",
            transform: 'translateX(-50%)',
        };
        }else {
        return {
            bottom: 'auto',
            top: position.y + "px",
            left: "50%",
            transform: 'translateX(-50%)',
        };
        }
    }
};
const onFullScreen = () => {
    if (!larksr.value) {
        return;
    }
    const { fullScreen } = larksr.value;
    if (fullScreen.isFullScreen) {
        fullScreen.exitFullscreen();
    } else {
        fullScreen.launchFullScreen();
    }
};

const showInput = () => {
    if(commStore.inputMethodEnable === false) {
        commStore.setInputMethodEnable( true)
        commStore.setInputMethodStart( true);
        commStore.setControlBallInputMethod( true);
    } else {
        commStore.setInputMethodEnable( false)
        commStore.setInputMethodStart( false);
        commStore.setControlBallInputMethod( false);
    }
};

const changeTextInputFn = () => {
    const val = commStore.enableChineseInput;
    commStore.setEnableChineseInput(!val);
};


onUnmounted(() => {

})
</script>
<style lang="scss" scoped>
@import "menuBar.scss";
</style>
