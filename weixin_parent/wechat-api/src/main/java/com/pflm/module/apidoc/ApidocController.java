package com.pflm.module.apidoc;
import com.alibaba.fastjson.JSONObject;
import com.pflm.annotation.ApiSysyLog;
import com.pflm.base.entity.AccessTokenEntity;
import com.pflm.module.BaseController;
import com.pflm.module.core.dao.AccessToeknDao;
import com.pflm.module.core.service.TokenService;
import com.pflm.module.menu.service.MenuService;
import com.pflm.module.template.service.TemplateService;
import com.pflm.utils.DateUtils;
import com.pflm.utils.R;
import com.pflm.utils.TimeUtil;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

/**
 * 接口文档
 * 访问地址 http://localhost/swagger-ui.html
 * @author qinxuewu
 * @version 1.00
 * @time 14/11/2018下午 2:15
 */

@RestController
@RequestMapping(value="/apidoc")
public class ApidocController extends BaseController {
    @Autowired
    public MenuService menuService;

    @Autowired
    AccessToeknDao accessToeknDao;
    @Autowired
    TemplateService templateService;

    @Autowired
    private TokenService tokenService;

    @GetMapping("token/getToken/get")
    @ApiOperation("获取微信基础token")
    public R getToken() {
        AccessTokenEntity accessToken=accessToeknDao.getToken(1);
        if(accessToken==null){
            accessToken=new AccessTokenEntity();
            JSONObject info=tokenService.token(appid,appsecret,"client_credential");
            if(info.containsKey("access_token")){
                accessToken.setAccessToken(info.getString("access_token"));
                accessToken.setCreateTime(TimeUtil.getNowDayTimeFullStr());
                accessToken.setExpiresIn(info.getIntValue("expires_in"));
                accessToken.setType(1);
                accessToken.setExpiryTime(TimeUtil.timet2FullString(Integer.parseInt(TimeUtil.getUnixDate()+"")+info.getIntValue("expires_in")));
                accessToeknDao.save(accessToken);
            }
            return R.ok().put("access_token",info.getString("access_token"));
        }else{
            Date expiryDate =DateUtils.stringToDate(accessToken.getExpiryTime(),DateUtils.DATE_TIME_PATTERN);
            Date now = new Date();
            //续期token 离过期还要5分钟时
            if(DateUtils.getDateTimeMinutesBetween(now,expiryDate)<=5) {
                JSONObject info=tokenService.token(appid,appsecret,"client_credential");
                if(info.containsKey("access_token")){
                    accessToken.setUpdateTime(TimeUtil.getNowDayTimeFullStr());
                    accessToken.setExpiresIn(info.getIntValue("expires_in"));
                    accessToken.setAccessToken(info.getString("access_token"));
                    accessToken.setExpiryTime(TimeUtil.timet2FullString(Integer.parseInt(TimeUtil.getUnixDate()+"")+info.getIntValue("expires_in")));
                    accessToeknDao.update(accessToken);
                }
                return R.ok().put("access_token",info.getString("access_token"));
            }
            return R.ok().put("access_token",accessToken.getAccessToken());
        }

    }



    /**
     * 发送模板消息
     * @param accessToken
     * @return
     */
    @ApiOperation("发送模板模板")
    @PostMapping("template/send")
    public R send(@RequestParam("accessToken") String accessToken, @RequestBody JSONObject info){

        if(StringUtils.isEmpty(accessToken)){
            return R.error("accessToken不能为空");
        }
        if(info==null){
            return R.error("模板消息内容不能为空 不能为空");
        }
        JSONObject data=templateService.delTemplate(accessToken,info);
        return R.ok().put("data",data);
    }

    /**
     *  获取自定义菜单配置
     * @param accessToken
     * @return
     */
    @GetMapping("menu/getCurrentSelfmenuInfo")
    @ApiOperation("获取自定义菜单配置")
    public R getCurrentSelfmenuInfo(@RequestParam("accessToken")  String accessToken){
        logger.debug("menu/getCurrentSelfmenuInfo request:{}",accessToken);
        JSONObject info=menuService.getCurrentSelfmenuInfo(accessToken);
        return  R.ok().put("data",info);
    }
}
