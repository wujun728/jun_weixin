package com.jfinal.wxaapp.api;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import com.jfinal.aop.Duang;
import com.jfinal.weixin.sdk.utils.IOUtils;
import com.jfinal.wxaapp.WxaConfig;
import com.jfinal.wxaapp.WxaConfigKit;

public class WxaQrcodeApiTest {
	public static void main(String[] args) throws IOException {
		WxaConfig wc = new WxaConfig();
		wc.setAppId("wx4f53594f9a6b3dcb");
		wc.setAppSecret("eec6482ba3804df05bd10895bace0579");
		WxaConfigKit.setWxaConfig(wc);

		WxaAccessTokenApi.getAccessTokenStr();

		WxaQrcodeApi wxaQrcodeApi = Duang.duang(WxaQrcodeApi.class);
		InputStream xx = wxaQrcodeApi.get("pages/index?query=1");
		IOUtils.toFile(xx, new File("/Users/dream/Desktop/xxxx.png"));
	}
}
