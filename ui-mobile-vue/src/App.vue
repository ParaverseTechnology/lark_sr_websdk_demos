<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="format-detection" content="telephone=no, email=no" />
    <meta name="screen-orientation" content="portrait">
    <meta name="x5-orientation" content="portrait">
    <meta name="full-screen" content="yes">
    <meta name="x5-fullscreen" content="true">
    <meta name="browsermode" content="application">
    <meta name="x5-page-mode" content="app">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="HandheldFriendly" content="true">
    <meta name="MobileOptimized" content="320">
    <meta name="360-fullscreen" content="true" />

    <meta name="theme-color" content="#000000" />
    <meta name="renderer" content="webkit" />
    <!--[if IE]>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <![endif]-->
    <!-- 视图窗口，移动端特属的标签。 -->
    <meta name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
    <meta name="description" content="lark3.0" />
    <title>平行云</title>
    <link href="./css/bootstrap.min.css" rel="stylesheet">
    <script src="./js/jquery.min.js"></script>
    <script src="./dist/larksr-web-sdk.min.js?v=33120221010"></script>
    <script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js" crossorigin="anonymous"></script>

    <!-- 可选组件库 -->
    <!-- @see https://github.com/pingxingyun/pxy_webcommonui -->
    <script src="./js/pxy_webcommonui.min.js?v=33120221010"></script>

    <script>
        var client;
        var joystick;
        // 加载完成自动连接云端，关闭时手动点开始连接按钮连接云端
        var autoConnect = false;
        // 是否在数据通道打开时启用已选择的设备
        var useSelectedDeviceWhenDataChannelOpen = false;
        // 测试重制媒体通道
        var resetMediaChannel = true;

        $(document).ready(function () {
            // console
            // var vConsole = new window.VConsole();

            var urlParams = new URLSearchParams(window.location.search);
            var isMonitor = urlParams.get('isMonitor');
            var currentMediaChannel = 0;

            console.log("isMonitor", isMonitor);

            client = new larksr_websdk.LarkSR({
                // 设置挂载显示的元素
                // 注意*不要*设置为 document.documentElement
                rootElement: document.getElementById('container'),
                // 服务器地址,实际使用中填写您的服务器地址
                // 如：http://222.128.6.137:8181/
                // 当使用平行云托管服务时服务器地址自动分配,可留空。
                serverAddress: "http://222.128.6.137:8585/",
                // serverAddress: "https://cloudlark.pingxingyun.com:8586/",
                // 授权码
                // authCode: '您的 SDK ID 联系 business@pingxingyun.com 获取',
                // 视频缩放模式，默认保留宽高比，不会拉伸并完整显示在容器中
                scaleMode: 'contain',
                // 0 -》 用户手动触发, 1 -》 首次点击进入触发, 2 -》 每次点击触发
                fullScreenMode: 0,
                // 测试载入背景图
                // loadingBgUrl: 'https://home-obs.pingxingyun.com/homePage_4_0/bg.jpg',
                logLevel: 'info',

                useSeparateMediaSharePeer: true,

                isMonitor: isMonitor !== undefined && isMonitor !== null && isMonitor === 'true' ? isMonitor : false, 

            });

            client.initSDKAuthCode('6b09421012994a2bba959b556fc2b78f')
                .then(function () {
                    // 开始连接

                    // 连接平行云托管平台的应用
                    // client.connectWithPxyHost({
                    //     // 从平行云托管平台获取
                    //     appliId: "924970933473509376",
                    //     // playerMode: 2,
                    //     // userType: 1,
                    //     // taskId: "",
                    //     // nickname: "Test",
                    // })
                    // .catch(function(e) {
                    //     console.error('enter appli falied', e);
                    //     alert(JSON.stringify(e));
                    // });

                    // 自动开始连接的情况
                    if (autoConnect) {
                        client.connect({
                                // 要使用的云端资源的应用 ID，从后云雀后台接口获取
                                // 参考查询应用一栏文档
                                // https://www.pingxingyun.com/online/api3_2.html?id=476
                                // 如 222.128.6.137:8181 系统下的 879414254636105728 应用
                                // appliId: "968821985918320640",
                                // appliId: "1051897668382490624", //test
                                // appliId: "1053318629182930944", //test
                                appliId: "899728731164114944", //test
                                // playerMode: 2,
                                // userType: 1,
                                // taskId: "",
                                // nickname: "Test",
                            })
                            .catch(function (e) {
                                console.error('enter appli falied', e);
                                alert(JSON.stringify(e));
                            });
                    }

                    const params = larksr_websdk.LoadAppliParamsFromUrl();

                    console.log('params ', params);
                    // params.appServer = "192.168.0.223"
                    // params.appPort = "10002";
                    // // params.appPort = "9980"; // local webrtc server
                    // params.taskid = "123456";
                    // params.appliType = 2;

                    // params.appServer = "192.168.0.109"
                    // params.appServer = "192.168.0.223";
                    // params.appPort = "10002";
                    // params.appPort = "9980"; // local webrtc server
                    // params.taskid = "123456";
                    // params.appliType = 2;
                    // params.debugTask = true;
                    // params.wsProxy = false;
                    // params.preferDecoder = 'auto';
                    params.videoInput = true;
                    params.audioInput = true;

                    // params.liveStreaming = true;

                    client.setAppliParams(params);
                    client.start();
                })
                .catch(function (e) {
                    console.error('auth falied', e);
                    //alert(JSON.stringify(e));
                });

            // 监听连接成功事件
            client.on('connect', function (e) {
                console.log("LarkSRClientEvent CONNECT", e);
                updateChannelState();
                client.getMediaSharePeerConnection(0).on("rtc_state_change", function(e) {
                    console.log("ice state change", e);
                });
            });
            client.on('gotremotesteam', function (e) {
                console.log("LarkSRClientEvent gotremotesteam", e);
            });
            client.on('meidaloaded', function (e) {
                console.log("LarkSRClientEvent meidaloaded", e);
            });
            client.on('mediaplaysuccess', function (e) {
                console.log("LarkSRClientEvent mediaplaysuccess", e);
                if (joystick) {
                    $("#joystick-container").show();
                    joystick.resize();
                }
            });
            client.on('mediaplayfailed', function (e) {
                console.log("LarkSRClientEvent mediaplayfailed", e);
            });
            client.on('meidaplaymute', function (e) {
                console.log("LarkSRClientEvent meidaplaymute", e);
            });
            client.on('playerlist', function (e) {
                console.log("LarkSRClientEvent playerlist", e);
            });
            client.on('error', function (e) {
                console.error("LarkSRClientEvent error", e);
                //alert(JSON.stringify(e.message));
            });
            client.on('info', function (e) {
                console.log("LarkSRClientEvent info", e);
            });
            client.on(larksr_websdk.LarkSRClientEvent.DATACHANNEL_OPEN, (e) => {
                console.log("LarkSRClientEvent DATACHANNEL_OPEN", e);
                // 打开已选择的麦克风
                if (useSelectedDeviceWhenDataChannelOpen) {
                    console.log('open-audio-input-device', $("#audio-input-device").val());

                    var width = parseInt($("#video-width").val());
                    var heigth = parseInt($("#video-height").val());
                    width = isNaN(width) || width === null ? 1280 : width;
                    heigth = isNaN(heigth) || heigth == null ? 720 : heigth;

                    if (resetMediaChannel) {
                        // 重制媒体通道
                        client.openUserMeida({
                            audio: false,
                            video: {
                                deviceId: $("#video-input-device").val(),
                                width,
                                height,
                            }
                        }, true);
                    } else {
                        client.openVideo(false, $("#video-input-device").val(), width, height)
                            .then(function (res) {
                                videoInputBind = res;
                            })
                            .catch(function (e) {
                                console.log('open audio input device failed', e);
                            });
                    }
                }
            });
            client.on(larksr_websdk.LarkSRClientEvent.DATACHANNEL_TEXT, (e) => {
                console.log("LarkSRClientEvent DATACHANNEL_TEXT", e);
                $("#text-from-datachannel").text(e.data);
            });
            client.on(larksr_websdk.LarkSRClientEvent.DATACHANNEL_BINARY, (e) => {
                console.log("LarkSRClientEvent DATACHANNEL_BINARY", e);
                $("#text-from-datachannel").text(e.data);
            });
            client.on(larksr_websdk.LarkSRClientEvent.PLAYER_LIST, (e) => {
                console.log('PLAYER_LIST', e.data);
                var conntent = "";
                e.data.forEach(data => {
                    conntent += "<button class='player' uid='" + data.userId + "' '>" + data.nickName + "</button>";
                    console.log("player=", data);
                });
                $("#player-container").html(conntent);
                $(".player").on("click", function(e) {
                    console.log("on select player ", $(e.target).attr("uid"));
                    client.changeOperater($(e.target).attr("uid"));
                })
            });


            // media devices...
            async function getConnectedAudioinputDevices() {
                const res = await getConnectedDevices("audioinput");
                return res;
            }
            async function getConnectedAudioOutputDevices() {
                const res = await getConnectedDevices("audiooutput");
                return res;
            }
            async function getConnectedVideoinputDevices() {
                const res = await getConnectedDevices("videoinput");
                return res;
            }
            async function getConnectedDevices(type /* audioinput audiooutput videoinput*/ ) {
                const devices = await navigator.mediaDevices.enumerateDevices();
                return devices.filter(device => device.kind === type)
            }
            async function getConnectedDevice(id) {
                const devices = await navigator.mediaDevices.enumerateDevices();
                return devices.filter(device => device.deviceId === id)
            }

            navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                })
                .then(function () {
                    getConnectedAudioinputDevices()
                        .then(function (res) {
                            console.log("getConnectedAudioinputDevices", res);
                            res.forEach(function (device) {
                                var deviceOption =
                                    `<option value="${device.deviceId}">${device.label}</option>`;
                                console.log('add audio intput device option', deviceOption);
                                $("#audio-input-device").append(deviceOption);
                            });
                        })
                        .catch((e) => {
                            console.error(e);
                        });

                    getConnectedAudioOutputDevices()
                        .then(function (res) {
                            console.log("getConnectedAudioOutputDevices", res)
                            res.forEach(function (device) {
                                var deviceOption =
                                    `<option value="${device.deviceId}">${device.label}</option>`;
                                console.log('add audio intput device option', deviceOption);
                                $("#audio-output-device").append(deviceOption);
                            });
                        })
                        .catch((e) => {
                            console.error(e);
                        });

                    getConnectedVideoinputDevices()
                        .then(async function (res) {
                            console.log("getConnectedVideoinputDevices", res);
                            res.forEach(function (device) {
                                var deviceOption =
                                    `<option value="${device.deviceId}">${device.label}</option>`;
                                console.log('add video intput device option', deviceOption);
                                $("#video-input-device").append(deviceOption);
                            });
                            const device = await getConnectedDevice($("#video-input-device").val());
                            console.log("video-input-device change", device);
                            if (device.length > 0) {
                                console.log("width:" + device[0].getCapabilities().width.max +
                                    " height" + device[0].getCapabilities().height.max);
                                $("#video-width").val(device[0].getCapabilities().width.max);
                                $("#video-height").val(device[0].getCapabilities().height.max);
                            }
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                })

            $("#video-input-device").on("change", async function (e) {
                const device = await getConnectedDevice($("#video-input-device").val());
                console.log("video-input-device change", device);
                if (device.length > 0) {
                    console.log("width:" + device[0].getCapabilities().width.max + " height" +
                        device[0].getCapabilities().height.max);
                    $("#video-width").val(device[0].getCapabilities().width.max);
                    $("#video-height").val(device[0].getCapabilities().height.max);
                }
            });

            // ...
            // 主动关闭并清理资源
            // client.close();

            // ui handler
            // handle conenct
            $("#start-connect").on("click", function () {
                client.connect({
                        // 要使用的云端资源的应用 ID，从后云雀后台接口获取
                        // 参考查询应用一栏文档
                        // https://www.pingxingyun.com/online/api3_2.html?id=476
                        // 如 222.128.6.137:8181 系统下的 879414254636105728 应用
                        // appliId: "1051897668382490624", // 独占摄像头
                        // appliId: "899728731164114944", // 独占摄像头
                        appliId: "1053318629182930944", // 独占摄像头
                        // appliId: "968109545291251712", // 音频
                        // appliId: "1007705259486740480", //test
                        // appliId: "1051889560021106688", //test
                        // playerMode: 2,
                        // userType: 1,
                        // taskId: "",
                        // nickname: "Test",
                    })
                    .catch(function (e) {
                        console.error('enter appli falied', e);
                        alert(JSON.stringify(e));
                    });
            })
            $("#stop-connect").on("click", function() {
                client.close();
            })


            // 媒体通道设置相关接口
            function updateChannelState() {
                $("#media-channel-video-code").text("编码设置：" + client.getMediaSharePeerConnection(currentMediaChannel).preferVideoCode);
                $("#media-channel-code-rate").text("码率设置：" + JSON.stringify(client.getMediaSharePeerConnection(currentMediaChannel).codeRate));
                $("#media-channel-canvas").text("画布：" + client.getMediaSharePeerConnection(currentMediaChannel).forceRenderToCanvas);
            }

            // handle channel
            $("#media-channels").on("change", function(e) {
                console.log("select media channel", $("#media-channels").val()); 
                currentMediaChannel = parseInt($("#media-channels").val());

                updateChannelState();
            });

            $("#media-states").on("click", function() {
                client.getMediaSharePeerConnection(currentMediaChannel).getStats()
                .then((res) => {
                    console.log("state: ", res);
                })
                .catch((e) => {
                    console.log("get state failed", e);
                })
            });

            $("#media-code-vp8").on("click", function() {
                client.getMediaSharePeerConnection(currentMediaChannel).preferVideoCode = 'vp8';
                updateChannelState();
            })

            $("#media-code-h264").on("click", function() {
                client.getMediaSharePeerConnection(currentMediaChannel).preferVideoCode = 'h264';
                updateChannelState();
            })            
            
            $("#media-force-canvas").on("click", function() {
                client.getMediaSharePeerConnection(currentMediaChannel).forceRenderToCanvas = true;
                updateChannelState();
            })               
            
            $("#media-no-canvas").on("click", function() {
                client.getMediaSharePeerConnection(currentMediaChannel).forceRenderToCanvas = false;
                client.getMediaSharePeerConnection(currentMediaChannel).canvasRender.clearRotate();
                updateChannelState();
            })            
            
            $("#media-canvas-rotate-clock").on("click", function() {
                client.getMediaSharePeerConnection(currentMediaChannel).canvasRender.setRotate(true);
            })

            $("#media-canvas-rotate-antclock").on("click", function() {
                client.getMediaSharePeerConnection(currentMediaChannel).canvasRender.setRotate(false);
            })


            // handle media
            $("#open-audio").on("click", function(e) {
                console.log("open-audio");
                client.getMediaSharePeerConnection(currentMediaChannel).openAudio();
            });
            $("#close-audio").on("click", function (e) {
                console.log("close-audio");
                client.getMediaSharePeerConnection(currentMediaChannel).closeAudio();
            });
            $("#open-video").on("click", function (e) {
                console.log("open-video");
                client.getMediaSharePeerConnection(currentMediaChannel).openVideo();
            });
            $("#close-video").on("click", function (e) {
                console.log("close-video");
                client.getMediaSharePeerConnection(currentMediaChannel).closeVideo();
            });
            $("#open-share").on("click", function (e) {
                console.log("open-share");
                client.getMediaSharePeerConnection(currentMediaChannel).openShareMediaDevice();
            });
            $("#close-share").on("click", function (e) {
                console.log("close-share");
                client.getMediaSharePeerConnection(currentMediaChannel).closeShare();
            });
            $("#close-closeMediaChannel").on("click", function (e) {
                console.log("closeMediaChannel");
                client.getMediaSharePeerConnection(currentMediaChannel).closeMediaChannel();
            });

            var audioInputBind;
            $("#open-audio-input-device").on("click", function (e) {
                console.log('open-audio-input-device', $("#audio-input-device").val());
                client.getMediaSharePeerConnection(currentMediaChannel).openAudioDevice($("#audio-input-device").val(), 'audioinput')
                    .then(function (res) {
                        audioInputBind = res;
                    })
                    .catch(function (e) {
                        console.log('open audio input device failed', e);
                    });
            });
            $("#open-audio-output-device").on("click", function (e) {
                console.log('open-audio-output-device', $("#audio-output-device").val());
                client.getMediaSharePeerConnection(currentMediaChannel).openAudioDevice($("#audio-output-device").val(), 'audiooutput');
            });
            $("#close-audio-input-device").on("click", function (e) {
                client.getMediaSharePeerConnection(currentMediaChannel).closeAudio();
                // if (audioInputBind) {
                //     console.log('close-audio-input-device', audioInputBind);
                //     client.removeMediaTrack(audioInputBind.rtcRtpSenders[0].sender);
                //     audioInputBind = null;
                // }
            });

            $("#stop-audio-input-device").on("click", function (e) {
                client.getMediaSharePeerConnection(currentMediaChannel).stopLocalAudio();
            });
            $("#pause-audio-input-device").on("click", function (e) {
                client.getMediaSharePeerConnection(currentMediaChannel).pauseAudioSending();
            });
            $("#resume-audio-input-device").on("click", function (e) {
                client.getMediaSharePeerConnection(currentMediaChannel).resumeAudioSending();
            });

            $("#enum-audio-input-device").on("click", function (e) {
                navigator.mediaDevices.enumerateDevices()
                    .then(function (res) {
                        $("#audio-input-device").find('option').remove().end();
                        res.forEach(function (des) {
                            // console.log(des)
                            if (!des.getCapabilities || des.kind !== "audioinput")
                                return;
                            console.log("device " + des.label + " caps " + JSON.stringify(
                                des.getCapabilities()))

                            
                            var deviceOption =
                                `<option value="${des.deviceId}">${des.label}</option>`;
                            console.log('add audio intput device option', deviceOption);
                            $("#audio-input-device").append(deviceOption);
                        })
                    })
            });


            var videoInputBind;
            $("#open-video-input-device").on("click", function (e) {
                var width = parseInt($("#video-width").val());
                var height = parseInt($("#video-height").val());
                width = isNaN(width) || width === null ? 1280 : width;
                height = isNaN(height) || height == null ? 720 : height;

                console.log('open-video-input-device', $("#video-input-device").val(), width, height);

                if (resetMediaChannel) {
                    // 重制媒体通道
                    client.getMediaSharePeerConnection(currentMediaChannel).openUserMeida({
                            audio: false,
                            video: {
                                deviceId: $("#video-input-device").val(),
                                width,
                                height,
                            }
                        }, false)
                        .then(function (res) {
                            videoInputBind = res;
                        })
                        .catch(function (e) {
                            console.error('open video input device failed', e);
                        });
                } else {
                    client.getMediaSharePeerConnection(currentMediaChannel).openVideo(false, $("#video-input-device").val(), width, height)
                        .then(function (res) {
                            videoInputBind = res;
                        })
                        .catch(function (e) {
                            console.error('open video input device failed', e);
                        });
                }

                // client.openCamera($("#video-input-device").val(), width, heigth)
                //     .then(function (res) {
                //         videoInputBind = res;
                //     })
                //     .catch(function (e) {
                //         console.log('open video input device failed', e);
                //     });
            });
            $("#close-video-input-device").on("click", function (e) {
                // 方法1. 设置视频上传 track 为关闭状态
                // client.setVideoEnable(false);
                // 方法2. 关闭视频上传通道
                client.getMediaSharePeerConnection(currentMediaChannel).closeVideo();

                // if (videoInputBind) {
                //     console.log('close-video-input-device', videoInputBind);
                //     client.removeMediaTrack(videoInputBind.rtcRtpSenders[0].sender);
                //     videoInputBind = null;
                // }
            });

            $("#stop-video-input-device").on("click", function (e) {
                client.getMediaSharePeerConnection(currentMediaChannel).stopLocalVideo();
            });
            $("#pause-video-input-device").on("click", function (e) {
                client.getMediaSharePeerConnection(currentMediaChannel).pauseVideoSending();
            });
            $("#resume-video-input-device").on("click", function (e) {
                client.getMediaSharePeerConnection(currentMediaChannel).resumeVideoSending();
            });

            $("#enum-video-input-device").on("click", function (e) {
                navigator.mediaDevices.enumerateDevices()
                    .then(function (res) {
                        $("#video-input-device").find("optioni").remove().end();
                        res.forEach(function (des) {
                            // console.log(des)
                            if (!des.getCapabilities || des.kind !== "videoinput")
                                return;
                            console.log("device " + des.label + " caps " + JSON.stringify(
                                des.getCapabilities()))

                            var deviceOption =
                                `<option value="${des.deviceId}">${des.label}</option>`;
                            console.log('add video intput device option', deviceOption);
                            $("#video-input-device").append(deviceOption);
                        })
                    });
            });

            $("#only-open-video-input-device").on("click", function (e) {
                var width = parseInt($("#video-width").val());
                var height = parseInt($("#video-height").val());
                width = isNaN(width) || width === null ? 1280 : width;
                height = isNaN(height) || height == null ? 720 : height;

                console.log('only-open-video-input-device', $("#video-input-device").val(), width,
                    height);

                navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: {
                            deviceId: $("#video-input-device").val(),
                            width,
                            height,
                        }
                    })
                    .then(function (res) {
                        console.warn("测试getUserMedia成功", res);
                    })
                    .catch(function (e) {
                        console.warn("测试getUserMedia失败", e);
                    })
            });


            $("#button-datachannel").on("click", function (e) {
                var text = $("#input-datachannel").val();
                console.log("input-datachannel ", text);
                client.sendTextToDataChannel(text);
            });
            $("#input-datachannel").on("focus", function () {
                console.log("focus");
                client.op.setKeyboardEnable(false);
            })
            $("#input-datachannel").on("blur", function () {
                console.log("blur");
                client.op.setKeyboardEnable(true);
            })

            $("#button-rtmp-start").on("click", function (e) {
                var path = $("#rtmp-path").val();
                console.log("rtmp-path ", path);
                var key = $("#rtmp-key").val();
                console.log("rtmp-key ", key);
                client.StartCloudLiveStreaming({
                        path: path,
                        key: key,
                    })
                    .then((res) => {
                        console.log("start rtmp", res);
                    })
                    .catch((err) => {
                        alert(err);
                    })
            });
            $("#button-rtmp-stop").on("click", function (e) {
                client.StopLiveStreaming();
            });
            $("#rtmp-path").on("focus", function () {
                console.log("focus");
                client.op.setKeyboardEnable(false);
            })
            $("#rtmp-path").on("blur", function () {
                console.log("blur");
                client.op.setKeyboardEnable(true);
            })
            $("#rtmp-key").on("focus", function () {
                console.log("focus");
                client.op.setKeyboardEnable(false);
            })
            $("#rtmp-key").on("blur", function () {
                console.log("blur");
                client.op.setKeyboardEnable(true);
            })
            client.on(larksr_websdk.LarkSRClientEvent.RTMP_STREAM_STATE, (e) => {
                console.log("LarkSRClientEvent RTMP_STREAM_STATE", e);
                $("#rtmp-state").text(JSON.stringify(e.data));
            });
            client.on(larksr_websdk.LarkSRClientEvent.RTMP_STREAM_ERROR, (e) => {
                console.log("LarkSRClientEvent RTMP_STREAM_ERROR", e);
                $("#rtmp-state").text(JSON.stringify(e.data));
            });


            // 可选组件库
            // @see https://github.com/pingxingyun/pxy_webcommonui
            // sample for pxy commonui 
            // create joystick
            if (pxy_webcommonui.Capabilities.isMobile) {
                joystick = new pxy_webcommonui.Joystick({
                    // 必填项，挂载的根元素
                    rootElement: document.getElementById('joystick-container'),

                    // 可选项，larksr 对象，由 larksr websdk 创建出来
                    // 传入后自动发送对应的按键给云端。如果不传入，应手动处理事件，如 joystickstart joystickmove joystickend
                    // npm https://www.npmjs.com/package/larksr_websdk
                    // doc https://github.com/pingxingyun/lark_sr_websdk_demos
                    // demos https://pingxingyun.github.io/webclient_sdk/
                    larksr: client,

                    //  可选项 subType  1 wasd  2 updownleftright 3 joystick 0 none
                    // 发送给云端的按键类型
                    // 类型 1 对应键盘 WASD 按键
                    // 类型 2 对应键盘上下左右箭头
                    // 类型 3 对应物理摇杆
                    // 类型 0 不发送事件
                    // 默认为 1
                    subType: 1,

                    // 可选项,摇杆的位置。
                    // 注意，如果不传入应调整父组件的位置
                    position: {
                        top: 200,
                        left: 100,
                    },

                    // 可选项，摇杆的大小
                    // 注意，如果不传入，应设置父组件的大小。不传入时摇杆与父组件大小相同
                    size: {
                        width: 150,
                        height: 150,
                    },

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
                    joystickBackgroundUrl: "./img/joy_stick_bottom.png",

                    // 可选项，摇杆中间按钮的背景图片，最终设置为样式 background-image
                    centerBackgroundUrl: "./img/joy_stick_top.png",

                    // 可选项，触发事件的时间间隔
                    repeatTimeout: 10,
                });
                // $("#joystick-container").show();
                // joystick.resize();
                // destroy joystick
                // joystick.destroy();
            }

            var showBlock = true;
            $("#toggle-ui").on("click", function() {
                if (showBlock) {
                    $(".test-functions").hide();
                    showBlock = false;
                } else {
                    $(".test-functions").show();
                    showBlock = true;
                }
            });
        });
    </script>
    <style>
        .ui {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1000;
            pointer-events: none;
        }

        .ui .handler.handler-touchstart {
            background-color: red;
        }

        .ui button, .ui input {
            pointer-events: all;
        }

        .ui .block {
            padding: 10px;
        }

        .ui select {
            pointer-events: all;
        }

        .ui #joystick-container {
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: all;
            z-index: 2000;
        }

        .ui .lable {
            background-color: #303030;
            color: azure;
            text-align: center;
        }
    </style>
</head>

<body>
    <div id="container">
        <!-- 演示 UI 层 -->
        <div class="ui">
            <div class="block">
                <button id="start-connect">
                    开始连接
                </button>
                <button id="stop-connect">
                    关闭连接
                </button>
                <button id="toggle-ui">
                    hide/show ui
                </button>
            </div>
            <div class="block test-functions">
                <button id="open-audio">
                    OpenAudio
                </button>
                <button id="close-audio">
                    CloseAudio
                </button>
                <button id="open-video">
                    OpenVideo
                </button>
                <button id="close-video">
                    CloseVideo
                </button>
                <button id="open-share">
                    openShareMediaDevice
                </button>
                <button id="close-share">
                    stopShareMediaDevice
                </button>
                <button id="close-closeMediaChannel">
                    closeMediaChannel
                </button>
            </div>
            <div class="block test-functions">
                <select id="media-channels">
                    <option value="0">媒体通道 0</option>
                    <option value="1">媒体通道 1</option>
                    <option value="2">媒体通道 2</option>
                    <option value="3">媒体通道 3</option>
                    <option value="4">媒体通道 4</option>
                    <option value="5">媒体通道 5</option>
                </select>
                <span class="lable" id="media-channel-video-code">编码设置：</span>
                <span class="lable" id="media-channel-code-rate">码率设置：</span>
                <span class="lable" id="media-channel-canvas">画布：</span>
                <button id="media-states">获取状态</button>
                <button id="media-code-vp8">VP8</button>
                <button id="media-code-h264">H264</button>
                <button id="media-force-canvas">使用画布</button>
                <button id="media-no-canvas">不使用画布</button>
                <button id="media-canvas-rotate-clock">顺时针</button>
                <button id="media-canvas-rotate-antclock">逆时针</button>
            </div>
            <div class="block test-functions">
                <select name="音频输入设备" id="audio-input-device">
                </select>
                <button id="open-audio-input-device">打开音频输入设备</button>
                <button id="close-audio-input-device">关闭音频输入设备</button>
                <button id="enum-audio-input-device">枚举音频设备信息</button>
                <button id="stop-audio-input-device">停止音频</button>
                <button id="pause-audio-input-device">暂停音频</button>
                <button id="resume-audio-input-device">恢复音频</button>
            </div>
            <!-- <div class="block">
                <select id="audio-output-device">
                </select>
                <button id="open-audio-output-device">打开音频输出设备</button>
            </div> -->
            <div class="block test-functions">
                <select id="video-input-device">
                </select>
                <button id="open-video-input-device">打开视频输入设备</button>
                <button id="close-video-input-device">关闭视频输入设备</button>
                <button id="enum-video-input-device">枚举视频设备信息</button>
                <button id="stop-video-input-device">停止视频</button>
                <button id="pause-video-input-device">暂停视频</button>
                <button id="resume-video-input-device">恢复视频</button>
                <input placeholder="width" id="video-width" type="text" value="1280" />
                <input placeholder="height" id="video-height" type="text" value="720" />
                <button id="only-open-video-input-device">仅测试打开</button>
            </div>
            <div class="block test-functions">
                <input placeholder="发送给云端数据通道" id="input-datachannel" type="text" />
                <button id="button-datachannel">发送</button>
                <p id="text-from-datachannel"></p>
            </div>
            <div class="block test-functions">
                <input placeholder="rtmp-path" id="rtmp-path" type="text" />
                <input placeholder="rtmp-key" id="rtmp-key" type="text" />
                <button id="button-rtmp-start">启动rtmp</button>
                <button id="button-rtmp-stop">关闭rtmp</button>
                <p id="rtmp-state"></p>
            </div>
            
            <div id="player-container" class="block test-functions">
            </div>

            <div id="joystick-container">
            </div>

        </div>
    </div>
</body>

</html>