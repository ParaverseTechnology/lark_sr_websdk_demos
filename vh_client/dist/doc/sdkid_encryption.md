# SDK ID 加密配置

使用 larksr SDK 首先需要从平行云商务 business@pingxingyun.com 或者在 https://www.pingxingyun.com/console 获取 SDK 授权码（注意不是服务器端的授权码）。

通过 larksr config 传入 `authCode` 或者通过 larksr.initSDKAuthCode('您的SDKID') 方法设置授权码。

为保护 SDK ID 的安全性，可以从服务端 3.2.3.0 开始可以对 SDK ID 进行加密配置。

配置 SDK 加密：

1. 首先在 larkxr 平台后台登陆，找到系统设定->接入管理->SDKID密钥管理生成 SDK ID 加密 KEY

2. 对 SDK ID 进行加密

以下 java 代码为例:

```java
public static void main(String[] args) {
    /**
    * @param res   被加密的原生字符串
    * @param key  16位字符作为加密的key
    */
    try {
        String res = "被加密的原生字符串";
        String key = "16位字符作为加密的key";
        String ALGORITHM = "AES";
        String CHARSET = "UTF-8";
        SecretKeySpec sks = new SecretKeySpec(key.getBytes(CHARSET), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(cipher.ENCRYPT_MODE, sks);
        byte[] result = cipher.doFinal(res.getBytes());
        // BASE64Encoder encoder = new BASE64Encoder();      //java8
        Base64.Encoder encoder = Base64.getEncoder(); //java9+
        System.out.println(encoder.encodeToString(result));
    }catch (Exception e){
    }
}
```

3. 获取到加密好的字符串传入 lark 配置中即可。
