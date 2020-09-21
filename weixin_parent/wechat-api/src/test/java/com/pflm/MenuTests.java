package com.pflm;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.alibaba.fastjson.JSONObject;
import com.pflm.entitiy.*;
import com.pflm.module.menu.service.MenuService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.io.UnsupportedEncodingException;

/**
 * @author qinxuewu
 * @version 1.00
 * @time 14/11/2018上午 10:13
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class MenuTests {


    @Autowired
    public MenuService menuService;

    @Test
    public void create() throws Exception {
        String token="15_XWzlq8jZyKbapJJgM05hOjITusYNNhbzhk-41yS6170yprZ65F6YK5HJz8peGyhJkVSQaPXCRzCPTbc6jSvyLMsGMewxxVqroZQ4IRz1MvCQwUW7DRyE3V1tuopUVfKd8lQyUurrIn42O7o4RBZcACAAKI";

        JSONObject info= (JSONObject) JSONObject.toJSON(getMenu());
        JSONObject res=menuService.create(token,info);
        System.err.println("请求结果*********"+res.toJSONString());
    }


    /**
     * 组装菜单数据
     *
     * @return
     * @throws UnsupportedEncodingException
     */
    public static Menu getMenu(){
        CommonButton btn11 = new CommonButton();
        btn11.setName("子菜单1");
        btn11.setType("click");
        btn11.setKey("col_2");
        CommonButton btn12 = new CommonButton();
        btn12.setName("子菜单2");
        btn12.setType("click");
        btn12.setKey("12");
        CommonButton btn13 = new CommonButton();
        btn13.setName("子菜单3");
        btn13.setType("click");
        btn13.setKey("13");
        CommonButton btn14 = new CommonButton();
        btn14.setName("子菜单4");
        btn14.setType("click");
        btn14.setKey("14");
        CommonButton btn15 = new CommonButton();
        btn15.setName("子菜单5");
        btn15.setType("click");
        btn15.setKey("32");



        CommonButton btn21 = new CommonButton();
        btn21.setName("歌曲点播");
        btn21.setType("click");
        btn21.setKey("col_2");
        CommonButton btn22 = new CommonButton();
        btn22.setName("经典游戏");
        btn22.setType("click");
        btn22.setKey("col_1");
        CommonButton btn23 = new CommonButton();
        btn23.setName("美女电台");
        btn23.setType("click");
        btn23.setKey("23");
        CommonButton btn24 = new CommonButton();
        btn24.setName("人脸识别");
        btn24.setType("click");
        btn24.setKey("24");
        CommonButton btn25 = new CommonButton();
        btn25.setName("聊天唠嗑");
        btn25.setType("click");
        btn25.setKey("25");




        CommonButton btn31 = new CommonButton();
        btn31.setName("Q友圈");
        btn31.setType("click");
        btn31.setKey("31");
        CommonButton btn33 = new CommonButton();
        btn33.setName("幽默笑话");
        btn33.setType("click");
        btn33.setKey("33");
        CommonButton btn34 = new CommonButton();
        btn34.setName("用户反馈");
        btn34.setType("click");
        btn34.setKey("34");
        CommonButton btn35 = new CommonButton();
        btn35.setName("关于我们");
        btn35.setType("click");
        btn35.setKey("35");
        ViewButton btn32 = new ViewButton();
        btn32.setName("百度一下");
        btn32.setType("view");

        btn32.setUrl("http://www.baidu.com");





        ComplexButton mainBtn1 = new ComplexButton();
        mainBtn1.setName("父菜单1");
        mainBtn1.setSub_button(new Button[] {});

        ComplexButton mainBtn2 = new ComplexButton();
        mainBtn2.setName("父菜单2");
        mainBtn2.setSub_button(new Button[] { btn21, btn22});

        ComplexButton mainBtn3 = new ComplexButton();
        mainBtn3.setName("父菜单3");
        mainBtn3.setSub_button(new Button[] {btn32 });

        /**
         * 这是公众号xiaoqrobot目前的菜单结构，每个一级菜单都有二级菜单项<br>
         *
         * 在某个一级菜单下没有二级菜单的情况，menu该如何定义呢？<br>
         * 比如，第三个一级菜单项不是“更多体验”，而直接是“幽默笑话”，那么menu应该这样定义：<br>
         * menu.setButton(new Button[] { mainBtn1, mainBtn2, btn33 });
         */
        Menu menu = new Menu();
	    menu.setButton(new Button[] { mainBtn1, mainBtn2, mainBtn3 });
//       menu.setButton(new Button[] { mainBtn1});

        return menu;
    }

    public static void main(String[] args) {
        JSONObject info= (JSONObject) JSONObject.toJSON(getMenu());
        System.err.println(info);
    }
}
