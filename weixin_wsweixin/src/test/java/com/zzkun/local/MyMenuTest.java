package com.zzkun.local;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2016/6/17.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:springmvc-servlet.xml")
public class MyMenuTest {

    @Autowired
    public MyMenu menu;

    @Test
    public void testConfig() throws Exception {
        menu.config();
    }

    @Test
    public void testGetOAuthURL() throws Exception {
        System.out.println(menu.getOAuthURL("http://www.baidu.com"));
    }
}