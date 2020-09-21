package com.zzkun.controller;

import com.github.sd4324530.fastweixin.api.OauthAPI;
import com.github.sd4324530.fastweixin.api.config.ApiConfig;
import com.zzkun.service.RedBagService;
import com.zzkun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.logging.Logger;

/**
 * Created by Administrator on 2016/6/17.
 */
@Controller
@RequestMapping("/redbag")
public class RedBagController {

    @Autowired
    private OauthAPI oauthAPI;

    @Autowired
    private RedBagService redBagService;

    @Autowired
    private UserService userService;

    @RequestMapping("/day")
    public ModelAndView day(@ModelAttribute("code") String code) {
        String appid = oauthAPI.getToken(code).getOpenid();
        ModelAndView mav = new ModelAndView("redbag/DayRedBag");
        if(redBagService.hasTodayRecord(appid)) {
            mav.addObject("tip", "您今天已经领取过了，明天再来吧.");
            mav.addObject("value", 0.0);
        } else {
            double value = redBagService.getTodayRedBagVal(appid);
            redBagService.recordDayRedBag(appid, value);
            userService.modifyUserRedBagValue(appid, value);
            mav.addObject("tip", String.format("恭喜您，今天获得%.2f元红包！", value));
            mav.addObject("value", value);
        }
        return mav;
    }

    @RequestMapping("/use")
    public ModelAndView use(@ModelAttribute("code") String code,
                            @ModelAttribute("tip") String tip,
                            @ModelAttribute("appid") String appid) {
        if(appid == null || appid.length() == 0)
            appid = oauthAPI.getToken(code).getOpenid();
        ModelAndView mav = new ModelAndView("redbag/Use");
        mav.addObject("value", userService.getUserInfo(appid).getRedValue());
        mav.addObject("appid", appid);
        return mav;
    }

    @RequestMapping("/solveuse")
    public String solveuse(@RequestParam("appid") String appid,
                           @RequestParam("det") double det,
                           RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("appid", appid);
        double value = -det;
        if(userService.canCostRedBagValue(appid, value)) {
            userService.modifyUserRedBagValue(appid, value);
            redBagService.recordCost(appid, value);
            redirectAttributes.addFlashAttribute("tip", "消费成功！");
        } else {
            redirectAttributes.addFlashAttribute("tip", "消费失败！");
        }
        return "redirect:/redbag/use";
    }
}
