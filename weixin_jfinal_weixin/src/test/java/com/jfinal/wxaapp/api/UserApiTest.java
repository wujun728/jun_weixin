package com.jfinal.wxaapp.api;

import com.jfinal.aop.Duang;
import com.jfinal.weixin.sdk.api.ApiResult;

public class UserApiTest {

	static WxaUserApi wxaUserApi = Duang.duang(WxaUserApi.class);
	
	public static void test1() {
		String jsCode = "041ZM4L32ZXoxK00mhL32hZJK32ZM4LL";
		
		ApiResult apiResult = wxaUserApi.getSessionKey(jsCode);
		
		//{"session_key":"nzoqhc3OnwHzeTxJs+inbQ==","expires_in":2592000,"openid":"oVBkZ0aYgDMDIywRdgPW8-joxXc4"}
		System.out.println(apiResult.getJson());
	}
	
	public static void test2() {
		String encryptedData = "s/TXWqLHzG68DfXN0HW41FX18GTNStozgb52uny9llaKKK+9FxII7m9pNZbhKuq/8u6y8THedgvk4RTGxp9wW6juhYFtZLbwAkK3NWq2L7669ESbtJ4LAiPRjE/5iUnFHNhNyPcfaTUw38Fof5Y3uNTY+1tGhCU7UlWbplfaTqTbAdSZIwAwCXHXzB2wcXXzxU2J4dfySUTVGeUX4JHzvUwIRQeHjAQUlhDtLwvc1YSc19fxW6N03xfY3IvquwAcB8Y3aLyZsz00zPtkUCX/v5IX9AMOk9nKiEyHzomomp4/9Sy/q70IONrEQx63va19W1rhT4eJ4F8MXpJZ2V5Yz6ElAkMmAMrhb9KsdYQ3z4PmjLSdm8wDqhoCkcUhGPkAgsD9SKxPfpb292IR1m1IuHZEbg4A5NTuZLv/iVsKepL7/p0cksbBIg1JdW6k2PJVP5NIcl/RSr9Y7kZnMf7ksA==";
		String iv = "xA0Ik2GiB9bSpgmagulqHw==";
		
		String signature = "71b1a12f5e750b807fdd07f4cff32a021d5f8662";
		
		
		String sessionKey = "nzoqhc3OnwHzeTxJs+inbQ==";
		
		String rawData = "{\"nickName\":\"卢春梦\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"\",\"province\":\"Beijing\",\"country\":\"CN\",\"avatarUrl\":\"http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epvprgaxJxUHSRxib9MQS8ib2Cd4B2UA4sibSQUGib515fQx2zUo4CvpBpKSPRVZmwWUJGf118X3qPc3w/0\"}";
		
		System.out.println(wxaUserApi.checkUserInfo(sessionKey, rawData, signature));
		//true
		System.out.println(wxaUserApi.getUserInfo(sessionKey, encryptedData, iv));
		//{"openId":"oVBkZ0aYgDMDIywRdgPW8-joxXc4","nickName":"卢春梦","gender":1,"language":"zh_CN","city":"","province":"Beijing","country":"CN","avatarUrl":"http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epvprgaxJxUHSRxib9MQS8ib2Cd4B2UA4sibSQUGib515fQx2zUo4CvpBpKSPRVZmwWUJGf118X3qPc3w/0","watermark":{"timestamp":1484310746,"appid":"wx4f53594f9a6b3dcb"}}
	}
	
	static WxaMessageApi wxaMessageApi = Duang.duang(WxaMessageApi.class);
	public static void test3() {
		ApiResult apiResult = wxaMessageApi.sendText("oVBkZ0aYgDMDIywRdgPW8-joxXc4", "hello");
		System.out.println(apiResult);
	}
	
	public static void main(String[] args) {
//		test1();
//		test2();
		test3();
	}
}
