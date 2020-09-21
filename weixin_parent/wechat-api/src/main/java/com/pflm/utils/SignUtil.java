package com.pflm.utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Formatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
/**
 * 微信公众号签名工具类
 * @author qinxuewu
 * @version 1.00
 * @time 6/11/2018下午 7:23
 */
public class SignUtil {

    public static final Logger log = LoggerFactory.getLogger(SignUtil.class);

    /**
     * 与微信配置信息中的Token要一致
     */
    private static final String TOKEN ="weixinqxw";

    /**
     * 验证签名
     * @param signature
     * @param timestamp
     * @param nonce
     * @return
     */
    public static boolean checkSignature(String signature, String timestamp, String nonce) {
        String[] arr = new String[] {TOKEN, timestamp, nonce };
        // 将token、timestamp、nonce三个参数进行字典序排序
        Arrays.sort(arr);
        StringBuilder content = new StringBuilder();
        for (int i = 0; i < arr.length; i++) {
            content.append(arr[i]);
        }
        MessageDigest md = null;
        String tmpStr = null;

        try {
            md = MessageDigest.getInstance("SHA-1");
            // 将三个参数字符串拼接成一个字符串进行sha1加密
            byte[] digest = md.digest(content.toString().getBytes());
            tmpStr = byteToStr(digest);
        } catch (NoSuchAlgorithmException e) {
            log.error("验证签名异常:{},{},{}",signature,timestamp,nonce,e);
            e.printStackTrace();
        }
        content = null;
        log.debug("验证签名****tmpStr:{},signature:{}",tmpStr,signature);
        boolean falg=tmpStr != null ? tmpStr.equals(signature.toUpperCase()) : false;
        // 将sha1加密后的字符串可与signature对比，标识该请求来源于微信
        return falg;
    }

    /**
     * 将字节数组转换为十六进制字符串
     *
     * @param byteArray
     * @return
     */
    private static String byteToStr(byte[] byteArray) {
        String strDigest = "";
        for (int i = 0; i < byteArray.length; i++) {
            strDigest += byteToHexStr(byteArray[i]);
        }
        return strDigest;
    }

    /**
     * 将字节转换为十六进制字符串
     *
     * @param mByte
     * @return
     */
    private static String byteToHexStr(byte mByte) {
        char[] Digit = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };
        char[] tempArr = new char[2];
        tempArr[0] = Digit[(mByte >>> 4) & 0X0F];
        tempArr[1] = Digit[mByte & 0X0F];
        String s = new String(tempArr);
        return s;
    }


    /**
     * JS-SDK使用权限签名算法
     * @param jsapi_ticket
     * @param url
     * @return
     * 2016年8月25日
     */

    public static Map<Object, Object> sign(String jsapi_ticket, String url) {
        Map<Object, Object> ret = new HashMap<Object, Object>();
        String nonce_str = create_nonce_str();
        String timestamp = create_timestamp();
        String string1;
        String signature = "";
        //注意这里参数名必须全部小写，且必须有序
        string1 = "jsapi_ticket=" + jsapi_ticket +
                "&noncestr=" + nonce_str +
                "&timestamp=" + timestamp +
                "&url=" + url;
        System.out.println(string1);
        try {
            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            crypt.update(string1.getBytes("UTF-8"));
            signature = byteToHex(crypt.digest());
        } catch (Exception e) {
            log.error("JS-SDK使用权限签名算法异常:{},{},{}",jsapi_ticket,url,e);
        }

        ret.put("url", url);
        ret.put("jsapi_ticket", jsapi_ticket);
        ret.put("nonceStr", nonce_str);
        ret.put("timestamp", timestamp);
        ret.put("signature", signature);
        return ret;
    }

    /**
     * 卡券签名
     * @param card_id
     * @param code
     * @param openid
     * @param api_ticket
     * @param appid
     * @return
     */
    public static Map<Object, Object> signCardExt(String card_id,String code,String openid,String api_ticket,String appid) {
        Map<Object, Object> ret = new HashMap<Object, Object>();
        String nonce_str = create_nonce_str();
        String timestamp = create_timestamp();
        String string1;
        String signature = "";

        //注意这里参数名必须全部小写，且必须有序
        string1 = "api_ticket="+api_ticket+
                "&timestamp="+timestamp+
                "&card_id="+card_id+
                "&code="+code+
                "&openid="+openid+
                "&noncestr="+nonce_str;
        try {
            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            crypt.update(string1.getBytes("UTF-8"));
            signature = byteToHex(crypt.digest());
        }catch (Exception e) {
            log.error("卡券签名算法异常:{},{},{}",openid,card_id,e);
        }
        ret.put("code", code);
        ret.put("openid", openid);
        ret.put("nonceStr", nonce_str);
        ret.put("timestamp", timestamp);
        ret.put("signature", signature);
        return ret;
    }


    private static String byteToHex(final byte[] hash) {
        Formatter formatter = new Formatter();
        for (byte b : hash) {
            formatter.format("%02x", b);
        }
        String result = formatter.toString();
        formatter.close();
        return result;
    }

    private static String create_nonce_str() {
        return UUID.randomUUID().toString();
    }

    private static String create_timestamp() {
        return Long.toString(System.currentTimeMillis() / 1000);
    }
}
