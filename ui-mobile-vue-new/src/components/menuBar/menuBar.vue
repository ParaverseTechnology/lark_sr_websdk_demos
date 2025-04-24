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
                    <template #title>推流</template>
                    <div class="menu-icon" @click="liveStreamFn">
                        <i class="iconfont icon-stream" style="font-size: 28px;display: inline-block;margin-top: 1px;"></i>
                    </div>
                </Tooltip>
            </div>
            <el-divider v-if="isLiveStream || videoInput || audioInput || aivoicestatus" direction="vertical" style="height:2rem"></el-divider>
            <!-- 右侧基础菜单 -->
            <div class="basemenu">
                <Tooltip>
                    <template #title>{{enableChineseInput? "中文输入": "禁止中文输入"}}</template>
                    <div class="menu-icon" @click.prevent="changeTextInputFn">
                        <i :class="enableChineseInput?'iconfont icon-shurufa':'iconfont icon-shurufa_off'"></i>
                    </div>
                </Tooltip>
                <Tooltip>
                    <template #title>文字输入</template>
                    <div class="menu-icon" @click.prevent="showInput" @mouseenter="iconEnter('1')" @mouseleave="iconLeave('1')">
                        <i class="iconfont icon-menuBarIcon1"></i>
                    </div>
                </Tooltip>
                <Tooltip>
                    <template #title>重启应用</template>
                    <div class="menu-icon" @click.prevent="restartFn" @mouseenter="iconEnter('2')" @mouseleave="iconLeave('2')">
                        <i class="iconfont icon-menuBarIcon2"></i>
                    </div>
                </Tooltip>
                <Tooltip v-if="!isFullScreen">
                    <template #title>全屏</template>
                    <div class="menu-icon" @click.prevent="onFullScreen" @mouseenter="iconEnter('3')" @mouseleave="iconLeave('3')">
                        <i class="iconfont icon-menuBarIcon3"></i>
                    </div>
                </Tooltip>
                <Tooltip v-else>
                    <template #title>退出全屏</template>
                    <div class="menu-icon" @click.prevent="onFullScreen" @mouseenter="iconEnter('3')" @mouseleave="iconLeave('3')">
                        <i class="iconfont icon-menuBarIcon3_click fullScreen-hover"></i>
                    </div>
                </Tooltip>
                <Tooltip>
                    <template #title>网络</template>
                    <div class="menu-icon" @click="networkStateFn" @mouseenter="iconEnter('4')" @mouseleave="iconLeave('4')">
                        <i class="iconfont icon-menuBarIcon4"></i>
                    </div>
                </Tooltip>
                <Tooltip>
                    <template #title>设置</template>
                    <div class="menu-icon" @click="showSettingAlertFn" @mouseenter="iconEnter('5')" @mouseleave="iconLeave('5')">
                        <i class="iconfont icon-menuBarIcon5"></i>
                    </div>
                </Tooltip>
                <Tooltip>
                    <template #title>帮助</template>
                    <div class="menu-icon" @click.prevent="showHelpAlert" @mouseenter="iconEnter('6')" @mouseleave="iconLeave('6')">
                        <i class="iconfont icon-menuBarIcon6"></i>
                    </div>
                </Tooltip>
            </div>
        </div>
        <div v-if="menubarPosition==='top'"
            @mouseenter="barHoverFn" 
            @mouseleave="barLeaveFn" 
            :class="'menubar-bar-top menubar-bar'" 
            :style="barHoverStyle" 
            @click="toogleMenubar">
            <span class="iconfont icon-bar_1" style="transform: rotate(180deg)"></span>
            <i v-if="isBarHover" class="el-icon-arrow-up"></i>
        </div>
        <div v-else
            @mouseenter="barHoverFn" 
            @mouseleave="barLeaveFn" 
            :class="'menubar-bar-bottom menubar-bar'" 
            :style="barHoverStyle" 
            @click="toogleMenubar">
            <span class="iconfont icon-bar_1"></span>
            <i v-if="isBarHover" class="el-icon-arrow-down"></i>
        </div>
    </template>
    <div v-else class="hide-arrow-box" @click="toogleMenubar">
        <i :class="menubarPosition==='top'?'el-icon-arrow-down hide-arrow':'el-icon-arrow-up hide-arrow'"></i>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions, } from 'vuex';
import Log                          from "@/utils/log";
import Unit                         from '@/utils/unit'
import store                        from '@/store';
import Load                         from '@/load';
import MicInput                     from '../mic_input/mic_input.vue';
import VideoInput                   from '../video_input/video_input.vue';
import Tooltip                      from './components/tooltip';

export default {
    components: {
        MicInput,
        VideoInput,
        Tooltip
    },
    data() {
        return {
            showMenubar: false,
            isBarHover: false,
            offsetPositon: {
                x: 0,
                y: 0,
            },
            position: {
                x: 0,
                y: 5,
            },
            dragStartPosition: {
                x: 0,
                y: 5,
            },
            subscribeAction: null,
            dragStarted: false,
        }
    },
    computed: {
        enableChineseInput() {
            return this.$store.state.enableChineseInput;
        },
        barHoverStyle() {
            const scal = this.isBarHover? '1': '0.6';
            const bottom = this.isBarHover? '-14': '-13';
            const color = this.isBarHover? 'var(--webclient-menubar-btn-hover-bg)': 'var(--webclient-menubar-btn-bg)';
            if(this.menubarPosition === 'top') {
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
            
        },
        positionStyle() {
            if (this.position.x != 0) {
                return {
                    top: this.position.y + "px",
                    left: this.position.x + "px",
                }
            } else {
                if(this.position.y > this.viewPort.height/2) {
                    this.setMenubarPosition('bottom');
                    return {
                        bottom: '5px',
                        top: 'auto',
                        left: "50%",
                        transform: 'translateX(-50%)',
                    };
                }else {
                    this.setMenubarPosition('top');
                    return {
                        bottom: 'auto',
                        top: this.position.y + "px",
                        left: "50%",
                        transform: 'translateX(-50%)',
                    };
                }
            }
        },
        popContentRotatedClass() {
            let clazz = "pop-content";
            const { x, y } = this.position;
            if (x == 0 && y == 0) {
                return clazz;
            }
            const { width, height } = this.viewPort;
            if (y < 55) {
                clazz += " rotate-down";
            } else if (x < 65) {
                clazz += " rotate-right";
            } else if (height - y < 120) {
                clazz += " rotate-up";
            }
            // rotate-right
            return clazz;
        },
        
        isLiveStream() {
            return this.larksr?.params.liveStreaming;
        },
        audioInput() {
            return this.larksr?.params.audioInput;
        },
        videoInput() {
            return this.larksr?.params.videoInput;
        },
        ...mapState({
            larksr: state => state.larksr,  
            ui: state => state.ui,
            inputMethodEnable: state => state.inputMethodEnable,
            menubarPosition: state => state.menubarPosition,
            isShowHelpAlert: state => state.modalHelp.isShowHelpAlert,  
            showWebMenu: (state) => state.showWebMenu,
        }),
        ...mapGetters({
            isChangedScaledMode: 'isChangedScaledMode',
            viewPort: "viewPort",
            isFullScreen: "isFullScreen",
        })
    },
    methods: {
        toogleMenubar() {
            this.showMenubar = !this.showMenubar;
        },
        barHoverFn() {
            this.isBarHover = true;
        },
        barLeaveFn() {
            this.isBarHover = false;
        },
        iconEnter(index) {
			this['icon'+index+'_hover'] = true;
		},
		iconLeave(index) {
			this['icon'+index+'_hover'] = false;
		},
		networkStateFn() {
			this.toggleState();
			this.setCustomContentAlertTitle(this.ui.net)
		},
		
		showHelpAlert() {
            if(!this.isShowHelpAlert) {
                this.setIsShowHelpAlert(true);
			    this.setCustomContentAlertTitle('帮助');
            } else {
                this.setIsShowHelpAlert(false);
			    this.setCustomContentAlertTitle('');
            }
		},
		restartFn() {
			this.showModalConfirm({title:'重启应用', des: '请确认是否重启应用'})
			.then(()=>{
                Log.info('restart Appli confirm');
                this.larksr?.restartCloudApp();
            })
            .catch((e) => {
                Log.info('restart Appli cancle');
            });
		},
        liveStreamFn() {
            this.setIsShowStreamAlert(true);
			this.setCustomContentAlertTitle('推流设置');
		},
        showSettingAlertFn() {
            this.setIsShowSettingAlert(true);
		},
        onDragStart(e) {
            e.dataTransfer?.setDragImage(new Image(), 0, 0);// 去除重影
            Log.info("on drag start", e);
            // this.$refs.controlBall.style.transition = 'none';
            const offsetViewPort = Unit.getOffsetViewport(e.target);
            this.offsetPositon = {
                x: e.clientX - offsetViewPort.offsetX,
                y: e.clientY - offsetViewPort.offsetY,
            }
            this.dragStartPosition = {
                x: e.clientX,
                y: e.clientY,
            }
        },
        onDragEnd(e) {
            Log.info("on drag end", e);
            const { viewPort } = this;
            if (this.dragStarted) {
                this.position.x = 0;
                if(e.clientY > this.viewPort.height/2) {
                    this.position.y = e.clientY;
                } else {
                    this.position.y = 5;
                }
            }
            this.dragStarted = false;
            this.dragStartPosition = {
                x: 0,
                y: 0,
            }
            // if(!this.isFix) {
            //     this.menuTimer = setTimeout(() => {
            //         this.menuBarShrking();
            //         if(this.menuTimer) clearTimeout(this.menuTimer);
            //     },2000);
            // }
        },
        onDrag(e) {
            // Log.info("on drag move", e);
            e.preventDefault();
                e.stopPropagation();
            const { viewPort } = this;
            if (!this.dragStarted) {
                let disx = e.clientX - this.dragStartPosition.x;
                let disy = e.clientY - this.dragStartPosition.y;
                let distance = Math.sqrt(disx*disx + disy*disy);
                if (distance < 40) {
                    return;
                }
                this.dragStarted = true;
            }
            this.position = {
                x: e.clientX,
                // - this.offsetPositon.x,
                y: e.clientY
                // - this.offsetPositon.y,
            }
        },
        // 菜单条收缩
        // menuBarShrking() {
        //     if(this.position.y > this.viewPort.height/2) {
        //     // this.position.y = this.viewPort.height - 50
        //     }
        //     this.menuBarStyle['height'] = (50/1340*100)+'rem';
        //     this.menuBarStyle['transition'] = 'all 0.5s';
        // },
        // mouseOverFn(e) {
        //     this.menuBarStyle['height'] = (100/1340*100)+'rem';
        //     this.menuBarStyle['transition'] = 'all 0.5s';
        // },
        // mouseOutFn() {
        //     if(!this.isFix) {
        //         this.menuTimer = setTimeout(() => {
        //             this.menuBarShrking();
        //             if(this.menuTimer) clearTimeout(this.menuTimer);
        //         },2000);
        //     }
        // },
        resizePosition() {
            // if (this.position.x == 0 && this.position.y == 0) {
            //     return;
            // }
            // Log.info("resizePosition ", this.position.x, this.viewPort.width);
            // if (this.position.x + 64 > this.viewPort.width) {
            //     this.position.x = this.viewPort.width - 100;
            // }
            // if (this.position.y + 64 > this.viewPort.height) {
            //     this.position.y = this.viewPort.height - 100;
            // }
            if (this.position.x != 0) {
                return {
                    top: this.position.y + "px",
                    left: this.position.x + "px",
                }
            } else {
                if(this.position.y > this.viewPort.height/2) {
                return {
                    bottom: 0,
                    top: 'auto',
                    left: "50%",
                    transform: 'translateX(-50%)',
                };
                }else {
                return {
                    bottom: 'auto',
                    top: this.position.y + "px",
                    left: "50%",
                    transform: 'translateX(-50%)',
                };
                }
            }
        },
        onFullScreen() {
            if (!this.larksr) {
                return;
            }
            const { fullScreen } = this.larksr;
            if (fullScreen.isFullScreen) {
                fullScreen.exitFullscreen();
            } else {
                fullScreen.launchFullScreen();
            }
        },
        // functions
        //   onQuit() {
        //       this.showModalConfirm({ des: Msg.COURSE_QUIT, code: CloudlarkEventType.LK_USER_REQUEST_QUIT })
        //       .then(()=>{
        //           Log.info('user confirm');
        //           Unit.quit();
        //       })
        //       .catch((e) => {
        //           Log.info('user cancle');
        //       });
        //   },
        showInput() {
            console.log(this.inputMethodEnable,'this.inputMethodEnable')
            if(this.inputMethodEnable === false) {
                this.setInputMethodEnable(true);
                this.setInputMethodStart(true);
                this.setControlBallInputMethod(true);
            } else {
                this.setInputMethodEnable(false);
                this.setInputMethodStart(false);
                this.setControlBallInputMethod(false);
            }
        },
        changeTextInputFn() {
            const val = this.$store.state.enableChineseInput;
            this.$store.commit('setEnableChineseInput', !val);
        },
        ...mapMutations({
            setInputMethodStart: "setInputMethodStart",
            setInputMethodEnable: 'setInputMethodEnable',
            setIsShowHelpAlert: 'modalHelp/setIsShowHelpAlert',
            setCustomContentAlertTitle: 'customContentAlert/setCustomContentAlertTitle',
            setIsShowStreamAlert: 'modalStream/setIsShowStreamAlert',
            setIsShowSettingAlert: 'modalSetting/setIsShowSettingAlert',
            setControlBallInputMethod: 'setControlBallInputMethod',
            setMenubarPosition: 'setMenubarPosition'
        }),
        ...mapActions({
            resize: 'resize',
            toggleScaleToFitScreen: 'toggleScaleToFitScreen',
            toggleScaleToFillStretch: 'toggleScaleToFillStretch',
            toggleState: 'stateModal/toggleState',
            toggleVMouseMode: 'toggleVMouseMode',
            toggleVKeyboard: 'toggleVKeyboard',
            toggleModalSetup: 'toggleModalSetup',
            showModalAlert: 'modalAlert/showModalAlert',
            showModalConfirm: 'modalConfirm/showModalConfirm',
            toggleInitCursorMode: 'toggleInitCursorMode',
            toggleMenu: 'toggleMenu',
            toggleJoyStick: 'toggleJoyStick',
        }),
    },
    mounted() {
        this.subscribeAction = store.subscribeAction({after: (actions, state) => {
            if (actions.type == 'resize') {
                this.resizePosition();
            }
        }});
        console.log(Load.appKey)
        this.appKey = Load.appKey;
    },
    beforeDestroy() {
        if (this.subscribeAction) {
            this.subscribeAction();
        }
    }
}
</script>
<style lang="scss" scoped>
@import "menuBar.scss";
</style>
