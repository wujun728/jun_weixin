package com.jfinal.weixin.iot;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.jfinal.aop.Duang;
import com.jfinal.plugin.redis.RedisPlugin;
import com.jfinal.weixin.iot.api.DeviceApi;
import com.jfinal.weixin.iot.api.DeviceAuth;
import com.jfinal.weixin.sdk.api.ApiConfig;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.cache.RedisAccessTokenCache;

/**
 * 测试步骤
 * @author L.cm
 *
 */
public class DeviceApiTest {
    public static String AppID = "wxc03edcd008ad1e70";
    public static String AppSecret = "11ed9e2b8e3e3c131e7be320a42b2b5a";

    public static void init(){
        ApiConfig ac = new ApiConfig();
        ac.setAppId(AppID);
        ac.setAppSecret(AppSecret);
        ApiConfigKit.putApiConfig(ac);
        ApiConfigKit.setThreadLocalAppId(ac.getAppId());
        
        new RedisPlugin("main", "127.0.0.1").start();
        ApiConfigKit.setAccessTokenCache(new RedisAccessTokenCache());
    }
    
    static DeviceApi deviceApi = Duang.duang(DeviceApi.class);
    
    // 添加设备
    public static void test1() {
        String deviceId = "33657";
        
        DeviceAuth da = new DeviceAuth();
        da.setId(deviceId);
        da.setMac("123456789ABC");
        da.setAuthKey("");
        da.setConnectProtocol("3");
        da.setCloseStrategy("1");
        da.setCloseStrategy("1");
        da.setAuthVer("0");
        da.setManuMacPos("-1");
        da.setSerMacPos("-2");
//        da.setCryptMethod("0");
        List<DeviceAuth> devices = new ArrayList<DeviceAuth>();
        devices.add(da);
        
        System.out.println(deviceApi.authorize(devices, true, "33657"));
        // {"resp":[{"base_info":{"device_type":"gh_72d61a012c82","device_id":"33657"},"errcode":0,"errmsg":"ok"}]}
    }
    
    // 获取设备Qrcode扫描
    public static void test2() {
        System.out.println(deviceApi.createQrcode(Arrays.asList("33657")));
        // {"errcode":0,"errmsg":"ok","device_num":1,"code_list":[{"device_id":"33657","ticket":"http:\/\/we.qq.com\/d\/AQCigLqzllQrpu03NRqQV7zD3li1-DSL9842PL7O"}]}
    }
    
    // 获取绑定的用户
    public static void test3() {
        System.out.println(deviceApi.getOpenId("gh_72d61a012c82", "33657"));
        // {"open_id":["oooC6swV3M5Wq-aaRBFaI6zng8hI"],"resp_msg":{"ret_code":0,"error_info":"ok"}}
    }
    
    // 绑定 系统异常 不知原因
    public static void test4() {
        ApiResult result = deviceApi.bind("http://we.qq.com/d/AQCigLqzWQo18BtFRPmNk1jjGHJLPLKPxzhw8USM", "33657", "oooC6swV3M5Wq-aaRBFaI6zng8hI");
        System.out.println(result);
        // {"base_resp":{"errcode":-1,"errmsg":"system error"}}
    }
    
    // 强制绑定成功
    public static void test5() {
        ApiResult result = deviceApi.compelBind("33657", "oooC6swV3M5Wq-aaRBFaI6zng8hI");
        System.out.println(result);
        // {"base_resp":{"errcode":0,"errmsg":"ok"}}
    }
    
    // 解绑失败
    public static void test6() {
        ApiResult result = deviceApi.unbind("http://we.qq.com/d/AQCigLqzWQo18BtFRPmNk1jjGHJLPLKPxzhw8USM", "33657", "oooC6swV3M5Wq-aaRBFaI6zng8hI");
        System.out.println(result);
        // {"base_resp":{"errcode":-1,"errmsg":"system error"}}
    }
    
    // 获取设备状态
    public static void test7() {
        ApiResult result = deviceApi.getStat("33657");
        System.out.println(result);
        // {"errcode":0,"errmsg":"ok","status":2,"status_info":"bind"}
    }
    
    // 向设备推送消息
    public static void test8() {
        ApiResult result = deviceApi.transMsg("gh_72d61a012c82", "33657", "oooC6swV3M5Wq-aaRBFaI6zng8hI", "hello world!");
        System.out.println(result);
        // {"ret":0,"ret_info":"ok"}
    }
    
    public static void test9() {
        ApiResult result = deviceApi.verifyQrcode("http://we.qq.com/d/AQCigLqzWQo18BtFRPmNk1jjGHJLPLKPxzhw8USM");
        System.out.println(result);
        // {"errcode":0,"errmsg":"ok","device_type":"gh_72d61a012c82","device_id":"33657","mac":"123456789ABC"}
    }
    
    public static void test10() {
        ApiResult result = deviceApi.createQrcodeNew("33657");
        System.out.println(result);
        // {"base_resp":{"errcode":0,"errmsg":"ok"},"deviceid":"gh_72d61a012c82_a50c24256e922768","qrticket":"http:\/\/we.qq.com\/d\/AQCigLqzTYfRgP7HlPkVjG5P2VpUkZiFTmbZHzZQ"}
    }
    
    public static void main(String[] args) throws IOException {
        init();
//        test1();
//        test2();
//        test3();
//        test4();
//        test5();
//        test6();
//        test7();
//        test8();
//        test9();
//        test10();
    }
}
