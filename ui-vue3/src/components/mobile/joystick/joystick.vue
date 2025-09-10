<template>
  <div ref="joyContainerRef" class="joy-container">
  </div>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import PxyCommonUI         from 'pxy_webcommonui';
import joyLeftBottom01 from '@/assets/images/mobile/joy_left_bottom.png';
import joyLeftBottom02 from '@/assets/images/mobile/joy_stick_bottom.png';
import awsdBottom from '@/assets/images/mobile/AWSD.png';
import joyLeftTop from '@/assets/images/mobile/joy_stick_top.png';

const { Joystick } = PxyCommonUI;

const commStore = useCommStore();

const joystick = ref(null);

const larksr = computed(() => {
  return commStore.larksr;
})
const props = defineProps(["subType"]);
const joystickUrl = computed(() => {
  switch(props.subType) {
    case 1:
        return awsdBottom;
    case 2:
        return joyLeftBottom02;
    case 3:
        return joyLeftBottom01;
    default:
        return joyLeftBottom01;
  }
})

const joyContainerRef = ref(null);
onMounted(() => {
  joystick.value = new Joystick({
    // 必填项，挂载的根元素
    rootElement: joyContainerRef.value, 

    // 可选项，larksr 对象，由 larksr websdk 创建出来
    // 传入后自动发送对应的按键给云端。如果不传入，应手动处理事件，如 joystickstart joystickmove joystickend
    // npm https://www.npmjs.com/package/larksr_websdk
    // doc https://github.com/pingxingyun/lark_sr_websdk_demos
    // demos https://pingxingyun.github.io/webclient_sdk/
    larksr: larksr.value,

    //  可选项 subType  1 wasd  2 updownleftright 3 joystick 0 none
    // 发送给云端的按键类型
    // 类型 1 对应键盘 WASD 按键
    // 类型 2 对应键盘上下左右箭头
    // 类型 3 对应物理摇杆
    // 类型 0 不发送事件
    // 默认为 1
    subType: props.subType,

    // 可选项,摇杆的位置。
    // 注意，如果不传入应调整父组件的位置
    // position: {
    //     top: 150,
    //     left: 500,
    // },

    // 可选项，摇杆的大小
    // 注意，如果不传入，应设置父组件的大小。不传入时摇杆与父组件大小相同
    // size: {
    //     width: 150, 
    //     height: 150,
    // },

    // 可选项，摇杆中间按钮的大小
    // 注意，如果不传入，默认中间的按钮为总摇杆的 25%
    centerSize: {
        width: 60,
        height: 60,
    },

    // 可选项，额外的摇杆样式，会附加到其他样式后面，可覆盖默认样式
    extralJoystickStyle: '',

    // 可选项，额外的摇杆中间按钮样式，会附加到其他样式后面，可覆盖默认样式
    extralCenterStyle: '',

    // 可选项，摇杆的背景图片。最终设置为样式 background-image
    // joystickBackgroundUrl: JoystickBottomImage,

    // 可选项，摇杆中间按钮的背景图片，最终设置为样式 background-image
    // centerBackgroundUrl: JoystickTopImage,

    // 可选项，触发事件的时间间隔
    // repeatTimeout: 33,
    });

    joystick.value.joystickBackgroundUrl = joystickUrl.value;
    joystick.value.centerBackgroundUrl = joyLeftTop;
});

onUnmounted(() => {
  if (joystick.value) {
    joystick.value.destroy();
  }
});
</script>
<style lang="scss" scoped>
@import "joystick.scss";
</style>
