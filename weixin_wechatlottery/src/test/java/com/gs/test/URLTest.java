package com.gs.test;

import com.gs.common.WebUtil;
import org.junit.Test;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * Created by Wang Genshen on 2017-07-29.
 */
public class URLTest {

    @Test
    public void testURL() {
        System.out.println(WebUtil.encodeUrl("http://gzyouxue.com/index?id=1"));
    }
}
