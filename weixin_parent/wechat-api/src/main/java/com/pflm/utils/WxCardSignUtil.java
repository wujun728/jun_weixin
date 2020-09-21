package com.pflm.utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
/**
 * 微信卡券签名工具类
 * @author qinxuewu
 * @version 1.00
 * @time 6/11/2018下午 7:41
 */
public class WxCardSignUtil {
    public static final Logger log = LoggerFactory.getLogger(WxCardSignUtil.class);
    private ArrayList<String> m_param_to_sign;
    public WxCardSignUtil() {
        m_param_to_sign = new ArrayList<String>();
    }

    public void AddData(String value) {
        m_param_to_sign.add(value);
    }

    public void AddData(Integer value) {
        m_param_to_sign.add(value.toString());
    }

    public String GetSignature() {
        Collections.sort(m_param_to_sign);
        StringBuilder string_to_sign = new StringBuilder();
        for (String str : m_param_to_sign) {
            string_to_sign.append(str);
        }
        try {
            MessageDigest hasher = MessageDigest.getInstance("SHA-1");
            byte[] digest = hasher.digest(string_to_sign.toString().getBytes());
            return ByteToHexString(digest);
        } catch (NoSuchAlgorithmException e) {
            log.error("GetSignature签名异常:{}",e);

            return "";
        }
    }

    public String ByteToHexString(byte[] data){
        StringBuilder str = new StringBuilder();
        for (byte b : data) {
            String hv = Integer.toHexString(b & 0xFF);
            if( hv.length() < 2 )
                str.append("0");
            str.append(hv);
        }
        return str.toString();
    }

}
