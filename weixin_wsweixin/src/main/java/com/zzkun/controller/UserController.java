package com.zzkun.controller;

import com.github.sd4324530.fastweixin.api.OauthAPI;
import com.zzkun.service.RedBagService;
import com.zzkun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by Administrator on 2016/6/18.
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private OauthAPI oauthAPI;

    @Autowired
    private RedBagService redBagService;

    @Autowired
    private UserService userService;

    @RequestMapping("/detail")
    public ModelAndView detail(@ModelAttribute("code") String code) {
        String appid = oauthAPI.getToken(code).getOpenid();
        ModelAndView mav = new ModelAndView("redbag/Detail");
        mav.addObject("userInfo", userService.getUserInfo(appid));
        mav.addObject("recordList", redBagService.getRecordList(appid));
        return mav;
    }
}
