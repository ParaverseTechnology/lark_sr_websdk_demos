import { defineStore } from "pinia";

export const useModalSettingStore = defineStore('modalSetting', {
  state: () => {
    return {
      isShowSettingAlert: false,
      qualityMode: '1', // 画质 默认1标清
      coderate: 10000, //码率 对齐一览页的进入应用码率
      fps: 60, //帧率 对齐一览页的进入应用帧率
      resolution: { id: '19201080', width: 1920, height: 1080 }, //分辨率
      aerialViewCheck: false, // 鸟瞰模式Switch
      aeriaViewBoxEnd: null,// 最后一次移动aeriaViewBox坐标点，隐藏选择框再次显示选择框时使用
      aeriaViewSelectScale: '21',// 比例 2:1 3:1 4:1
      isShowMobileSettingModal: false
    }
  },
  actions: {
    setIsShowSettingAlert (i) {
      this.isShowSettingAlert = i;
    },
    setQualityMode (q) {
      if (q) {
        this.qualityMode = q;
      } else {
        if (this.coderate==8000 && this.fps == 60) {
          this.qualityMode = '0';
        } else if (this.coderate==10000 && this.fps == 60) {
          this.qualityMode = '1';
        } else if (this.coderate==20000 && this.fps == 60) {
          this.qualityMode = '2';
        } else if (this.coderate==50000 && this.fps == 60) {
          this.qualityMode = '3';
        }
      }
    },
    setCoderate (c) {
      this.coderate = c;
    },
    setFps (f) {
      this.fps = f;
    },
    setResolution (r) {
      this.resolution = r;
    },
    setAerialViewCheck (a) {
      this.aerialViewCheck = a;
    },
    setAeriaViewBoxEnd (a) {
      this.aeriaViewBoxEnd = a;
    },
    setAeriaViewSelectScale (a) {
      this.aeriaViewSelectScale = a;
    },
    setIsShowMobileSettingModal (i) {
      this.isShowMobileSettingModal = i;
    },
    coderateChange(c) {
      this.setCoderate(c);
    },
    codeFpsChange(c) {
      this.setFps(c);
    },
  }
});