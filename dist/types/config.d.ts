import ScaleModel from './utils/scale_mode';
export default class Config {
    static BuildType: 'local' | 'public';
    static LocalHomepagePath: string;
    /**
     */
    static VersionMarjor: number;
    static VersionMinorr: number;
    static VersionRevise: number;
    static VersionBuild: number;
    /**
     * webrtc 断开连接重试次数
     */
    static RetryTime: number;
    /**
     * design width/height
     * TODO reset with 0. check with render server.
     */
    static OriginW: number;
    static OriginH: number;
    /**
     * 默认码率从应用服务器接收码率
     */
    static CodeRate: number;
    static AudioCodeRate: number;
    static FrameRate: number;
    /**
     * default scale mode. 以应用原始尺寸的缩放
     */
    static ScaleMode: ScaleModel;
    /**
     * default net work.
     */
    static Network: 'local' | 'public';
    /**
     * 鼠标模式
     * 0 == 相对
     * 1 == 绝对
     */
    static MouseMode: number;
    /**
     * replace server ip for aws
     */
    static ForceIceAddr: boolean;
    /**
     * 禁用 VPX
     */
    static DisableVPX: boolean;
    /**
     * 是否启用相对鼠标移动虚拟摇杆
     */
    static RelativeMouseMove: boolean;
    /**
     * 虚拟摇杆精度
     */
    static VirtualRackerScale: number;
    static ErrChromeAndroidVersion: string[];
    static DownloadChromium: string;
}
