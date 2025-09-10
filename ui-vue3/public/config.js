const config = {
  PORT: '8181',
  APPPORT: '10002',
  PROTOCOL_CUSTOM: '', // 协议头配置：'': 跟随系统，'http'/'https'

  // **********************以下为播控系统后端接口协议地址端口配置项(默认协议地址跟随系统，端口8183)
  APPURL_PROTOCOL: '',//http/https
  APPURL:'', // ip/域名
  APPURL_PORT:'', // 8183
}
window.config = config;
