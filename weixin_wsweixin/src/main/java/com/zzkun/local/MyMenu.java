package com.zzkun.local;

import com.github.sd4324530.fastweixin.api.MenuAPI;
import com.github.sd4324530.fastweixin.api.OauthAPI;
import com.github.sd4324530.fastweixin.api.config.ApiConfig;
import com.github.sd4324530.fastweixin.api.entity.Menu;
import com.github.sd4324530.fastweixin.api.entity.MenuButton;
import com.github.sd4324530.fastweixin.api.enums.MenuType;
import com.github.sd4324530.fastweixin.api.enums.OauthScope;
import com.github.sd4324530.fastweixin.api.enums.ResultType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * Created by Administrator on 2016/6/17.
 */
@Component
public class MyMenu {

    @Autowired
    private ApiConfig apiConfig;

    private OauthAPI oauthAPI = null;

    public String getOAuthURL(String url) {
        if(oauthAPI == null)
            oauthAPI = new OauthAPI(apiConfig);
        return oauthAPI.getOauthPageUrl(url, OauthScope.SNSAPI_BASE, "123");
    }

    public void config() {
        MenuAPI menuAPI = new MenuAPI(apiConfig);
        menuAPI.deleteMenu();
        Menu request = new Menu();

        //一级菜单1
        MenuButton main1 = new MenuButton();
        main1.setType(MenuType.CLICK);
        main1.setKey("main1");
        main1.setName("我的");
        //准备子菜单
        MenuButton sub1 = new MenuButton();
        sub1.setKey("sub1");
        sub1.setName("每日领红包");
        sub1.setType(MenuType.VIEW);
        sub1.setUrl(getOAuthURL("http://2266881.ngrok.natapp.cn/WSWeiXin1/redbag/day"));
        ///
        MenuButton sub2 = new MenuButton();
        sub2.setKey("sub2");
        sub2.setName("查看红包");
        sub2.setType(MenuType.VIEW);
        sub2.setUrl(getOAuthURL("http://2266881.ngrok.natapp.cn/WSWeiXin1/user/detail"));
        ///
        MenuButton sub3 = new MenuButton();
        sub3.setKey("sub3");
        sub3.setName("红包消费");
        sub3.setType(MenuType.VIEW);
        sub3.setUrl(getOAuthURL("http://2266881.ngrok.natapp.cn/WSWeiXin1/redbag/use"));
        ///
        main1.setSubButton(Arrays.asList(sub1, sub2, sub3));

        //一级菜单2
        MenuButton main2 = new MenuButton();
        main2.setType(MenuType.CLICK);
        main2.setKey("main2");
        main2.setName("车服务");
        //准备子菜单
        MenuButton sub21 = new MenuButton();
        sub21.setKey("sub21");
        sub21.setName("莱芜天气");
        sub21.setType(MenuType.VIEW);
        sub21.setUrl("http://waptianqi.2345.com/laiwu-54828.htm");
        ///
        MenuButton sub22 = new MenuButton();
        sub22.setKey("sub22");
        sub22.setName("预约购车");
        sub22.setType(MenuType.CLICK);
        ///
        MenuButton sub23 = new MenuButton();
        sub23.setKey("sub23");
        sub23.setName("预约修车");
        sub23.setType(MenuType.CLICK);
        ///
        MenuButton sub24 = new MenuButton();
        sub24.setKey("sub24");
        sub24.setName("上门送/修");
        sub24.setType(MenuType.CLICK);
        ///
        main2.setSubButton(Arrays.asList(sub21, sub22, sub23, sub24));

        //一级菜单3
        MenuButton main3 = new MenuButton();
        main3.setType(MenuType.CLICK);
        main3.setKey("main3");
        main3.setName("务升车业");
        ///
        MenuButton sub31 = new MenuButton();
        sub31.setKey("sub31");
        sub31.setName("公司简介");
        sub31.setType(MenuType.VIEW);
        sub31.setUrl("http://ws.zzkun.com/archives/13");
        ///
        MenuButton sub32 = new MenuButton();
        sub32.setKey("sub32");
        sub32.setName("最新优惠");
        sub32.setType(MenuType.VIEW);
        sub32.setUrl("http://ws.zzkun.com/archives/20");

        main3.setSubButton(Arrays.asList(sub31, sub32));

        //将主菜单加入请求对象
        request.setButton(Arrays.asList(main1, main2, main3));
        //创建菜单
        ResultType resultType = menuAPI.createMenu(request);
        System.out.println(resultType);
    }
}
