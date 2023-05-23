export interface RTCMediaTrackBinding {
    deviceId: string;
    track: MediaStreamTrack;
    sender: RTCRtpSender | undefined;
}
export interface RTCShareMediaTrackBinding {
    deviceId: string;
    track: MediaStreamTrack;
    transceiver: RTCRtpTransceiver | undefined;
    paused: boolean;
}
export interface MediaShareInterface {
    audioDeviceId: string | undefined | null;
    audioTrack: MediaStreamTrack | undefined | null;
    videoDeviceId: string | undefined | null;
    videoTrack: MediaStreamTrack | undefined | null;
    audioPaused: boolean;
    videoPaused: boolean;
    setAudioEnable(enable: boolean): any;
    setVideoEnable(enable: boolean): any;
    setShareEnable(enable: boolean): any;
    stopLocalAudio(): any;
    stopLocalVideo(): any;
    stopLocalShare(): any;
    pauseAudioSending(): any;
    resumeAudioSending(): any;
    pauseVideoSending(): any;
    resumeVideoSending(): any;
    closeAudio(): any;
    closeVideo(): any;
    closeShare(): any;
    openAudio(deviceId: string): Promise<any>;
    openVideo(audio: boolean, cameraId: string, width: number, height: number, front?: boolean): Promise<any>;
    openDefaultMedia(video: boolean, audio: boolean): Promise<any>;
    openShareMediaDevice(): Promise<any>;
    getConnectedAudioinputDevices(): Promise<any>;
    getConnectedAudioOutputDevices(): Promise<any>;
    getConnectedVideoinputDevices(): Promise<any>;
    getConnectedDevices(type: MediaDeviceKind): Promise<any>;
    openAudioDevice(deviceId: string, kind: "audioinput" | "audiooutput"): Promise<any>;
    openCamera(cameraId: string, minWidth: number, minHeight: number, audio: boolean, front?: boolean): Promise<any>;
    openUserMeida(constraints?: MediaStreamConstraints, reset?: boolean): Promise<any>;
    addMediaTrack(track: MediaStreamTrack, ...streams: MediaStream[]): boolean;
    removeMediaTrack(track: RTCRtpSender): any;
    requestUserMediaPermission(constraints?: MediaStreamConstraints): any;
}
