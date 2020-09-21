package com.lmy.booksserver.controller;

import com.lmy.booksserver.config.AccessTokenBean;
import com.lmy.booksserver.vo.WxResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/v1/menu")
public class MenuController {

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    AccessTokenBean accessTokenBean;

    @Value("${url.menu_create}")
    String menuCreateUrl;

    @Value("${url.self_menu_get}")
    String selfMenu;

    @GetMapping("/c")
    public WxResponse menuCreate(){
        String request=" {\n" +
                "     \"button\":[\n" +
                "     {    \n" +
                "          \"type\":\"click\",\n" +
                "          \"name\":\"今日歌曲\",\n" +
                "          \"key\":\"V1001_TODAY_MUSIC\"\n" +
                "      },\n" +
                "      {\n" +
                "           \"name\":\"菜单\",\n" +
                "           \"sub_button\":[\n" +
                "           {    \n" +
                "               \"type\":\"view\",\n" +
                "               \"name\":\"搜索\",\n" +
                "               \"url\":\"http://www.soso.com/\"\n" +
                "            },\n" +
                "            {\n" +
                "                 \"type\":\"miniprogram\",\n" +
                "                 \"name\":\"wxa\",\n" +
                "                 \"url\":\"http://mp.weixin.qq.com\",\n" +
                "                 \"appid\":\"wx286b93c14bbf93aa\",\n" +
                "                 \"pagepath\":\"pages/lunar/index\"\n" +
                "             },\n" +
                "            {\n" +
                "               \"type\":\"click\",\n" +
                "               \"name\":\"赞一下我们\",\n" +
                "               \"key\":\"V1001_GOOD\"\n" +
                "            }]\n" +
                "       }]\n" +
                " }";
        WxResponse response=restTemplate.postForObject(
                menuCreateUrl+accessTokenBean.getAccessToken(),
                request,WxResponse.class);
        return response;
    }

    @GetMapping("/self")
    public String getSelfMenu(){
        String str=restTemplate.getForObject(
                selfMenu+accessTokenBean.getAccessToken()
                ,String.class);
        return str;
    }
}
