package com.jfinal.wxaapp.api;

import com.jfinal.wxaapp.WxaConfig;
import com.jfinal.wxaapp.WxaConfigKit;

public class AccessTokenTest {

	public static void main(String[] args) {
		WxaConfig wc = new WxaConfig();
		wc.setAppId("wx4f53594f9a6b3dcb");
		wc.setAppSecret("eec6482ba3804df05bd10895bace0579");
		WxaConfigKit.setWxaConfig(wc);
		System.out.println(WxaAccessTokenApi.getAccessTokenStr());
	}

}
