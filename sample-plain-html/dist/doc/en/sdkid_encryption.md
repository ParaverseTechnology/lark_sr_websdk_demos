# SDK ID Encryption Configuration

To use the larksr SDK, you first need to obtain an SDK authorization code from Pingxingyun Business (business@pingxingyun.com) or at https://www.pingxingyun.com/console (note that this is not the server-side authorization code).

Pass the `authCode` through larksr config or set the authorization code using the method `larksr.initSDKAuthCode('YourSDKID')`.

To protect the security of the SDK ID, from server version 3.2.3.0 onwards, you can configure SDK ID encryption.

Configure SDK encryption:

1. First, log in to the larkxr platform backend, find System Settings -> Access Management -> SDKID Key Management to generate an SDK ID encryption key.

2. Encrypt the SDK ID

The following is an example in Java:

```java
public static void main(String[] args) {
    /**
    * @param res   The original string to be encrypted
    * @param key   16-character key for encryption
    */
    try {
        String res = "The original string to be encrypted";
        String key = "16-character key for encryption";
        String ALGORITHM = "AES";
        String CHARSET = "UTF-8";
        SecretKeySpec sks = new SecretKeySpec(key.getBytes(CHARSET), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(cipher.ENCRYPT_MODE, sks);
        byte[] result = cipher.doFinal(res.getBytes());
        // BASE64Encoder encoder = new BASE64Encoder();      //java8
        Base64.Encoder encoder = Base64.getEncoder(); //java9+
        System.out.println(encoder.encodeToString(result));
    } catch (Exception e) {
    }
}
```

3. Pass the encrypted string into the lark configuration.
