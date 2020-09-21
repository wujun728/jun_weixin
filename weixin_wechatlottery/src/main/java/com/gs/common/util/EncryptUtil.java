package com.gs.common.util;

import sun.misc.BASE64Encoder;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by WangGenshen on 12/3/15.
 */
public class EncryptUtil {

    public static final String CHARSET = "utf-8";

    public static final String MD5 = "md5";
    public static final String SHA = "sha";

    public static String md5Encrypt(String str) {
        String encryptStr = null;
        try {
            encryptStr = oneWayEncrypt(str, MD5);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return encryptStr;
    }

    public static String shaEncrypt(String str) {
        String encryptStr = null;
        try {
            encryptStr = oneWayEncrypt(str, SHA);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return encryptStr;
    }

    public static String oneWayEncrypt(String str, String type) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        MessageDigest md = MessageDigest.getInstance(type);
        BASE64Encoder encoder = new BASE64Encoder();
        byte[] bytes = str.getBytes(CHARSET);
        md.update(bytes);
        return encoder.encode(md.digest(bytes));
    }

}
