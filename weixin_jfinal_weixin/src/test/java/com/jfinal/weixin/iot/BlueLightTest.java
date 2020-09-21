package com.jfinal.weixin.iot;

import com.jfinal.kit.Base64Kit;
import com.jfinal.weixin.iot.protocol.BlueLight;
import com.jfinal.weixin.iot.protocol.BlueLight.CmdId;

public class BlueLightTest {

	public static void main(String[] args) {
		BlueLight light = BlueLight.build(CmdId.OPEN_LIGHT_PUSH, "Hello,WeChat!", (short) 0);
		System.out.println(light);
		System.out.println(Base64Kit.encode(light.toBytes()));
	}

}
