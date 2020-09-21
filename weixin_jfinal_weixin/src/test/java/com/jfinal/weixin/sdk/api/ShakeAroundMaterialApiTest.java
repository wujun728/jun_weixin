package com.jfinal.weixin.sdk.api;

import java.io.File;

import com.jfinal.weixin.sdk.api.shakearound.ShakeAroundMaterialApi;

/**
 * 身边摇一摇素材测试
 *
 */
public class ShakeAroundMaterialApiTest {

	public static void main(String[] args) {
		AccessTokenApiTest.init();
		ApiResult xx = ShakeAroundMaterialApi.addMaterial(new File("/Users/dream/Desktop/jfinal_weixin_service_qr_258.png"));
		System.out.println(xx.toString());
	}

}
