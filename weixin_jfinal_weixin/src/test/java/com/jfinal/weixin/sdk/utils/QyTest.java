package com.jfinal.weixin.sdk.utils;

import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;

public class QyTest {

    public static void main(String[] args) {
        Prop prop = PropKit.use("com/jfinal/weixin/sdk/utils/qyapi.properties");

        System.out.println(prop.getProperties().keySet());
    }
}
