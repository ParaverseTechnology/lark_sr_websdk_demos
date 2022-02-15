# 更新

## V3.2.30

> V3.2.30 仅支持服务端 [V3.2.3.1](https://www.pingxingyun.com/devCenter.html) 以上版本。
> [老版本 SDK Demo 下载](https://github.com/pingxingyun/lark_sr_websdk_demos/releases/tag/V3.2.10)

1. [添加像素流送支持](https://docs.unrealengine.com/4.27/zh-CN/SharingAndReleasing/PixelStreaming/PixelStreamingIntro/)。
2. 完善安全性, 添加 SDK ID 加密配置。
3. 移除 CreateLarkSRClientFromePXYHost，CreateLarkSRClientFromeAPI, CreateLarkSRClientFromeUrl 函数。直接使用 `new LarkSR(config: ILarkSRConfig)` 方式创建对象。
