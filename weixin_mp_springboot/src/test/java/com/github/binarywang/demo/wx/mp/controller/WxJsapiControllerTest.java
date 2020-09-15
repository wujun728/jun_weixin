package com.github.binarywang.demo.wx.mp.controller;


import static io.restassured.RestAssured.given;

import org.junit.Test;

/**
 * jsapi 测试.
 *
 * @author <a href="https://github.com/binarywang">Binary Wang</a>
 * @date 2020-04-25
 */
public class WxJsapiControllerTest extends BaseControllerTest {
	
    @Test
    public void testGetJsapiTicket() {
        given()
            .when().get("/wx/jsapi/xxxx/getJsapiTicket")
            .then()
            .log().everything();
    }
}
