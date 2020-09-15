package com.github.binarywang.demo.wx.mp.controller;

import org.junit.Before;

import io.restassured.RestAssured;

/**
 * 公共测试方法和参数.
 *
 * @author Binary Wang
 * @date 2019-06-14
 */
public abstract class BaseControllerTest {
	private static final String ROOT_URL = "http://ucpv7m.natappfree.cc:80/";

	@Before
	public void setup() {
		RestAssured.baseURI = ROOT_URL;
	}

}
