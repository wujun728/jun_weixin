package com.pflm.module.core.controller;
import com.alibaba.fastjson.JSONObject;
import com.pflm.annotation.ApiSysyLog;
import com.pflm.base.entity.AccessTokenEntity;
import com.pflm.module.BaseController;
import com.pflm.module.core.dao.AccessToeknDao;
import com.pflm.module.core.service.TokenService;
import com.pflm.utils.DateUtils;
import com.pflm.utils.R;
import com.pflm.utils.TimeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Date;


/**
 * 基础token
 * @author qinxuewu
 * @version 1.00
 * @time 7/11/2018下午 6:00
 */
@RestController
@RequestMapping("/api/token")
public class TokenController extends BaseController {
    public  final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private TokenService tokenService;

    @Autowired
    AccessToeknDao accessToeknDao;
    /**
     * 获取基础token
     * @return
     */
    @ApiSysyLog("获取基础token")
    @RequestMapping("/get")
    public R getToken(){
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
     * 获取jsapi_ticket
     * @return
     */
    @ApiSysyLog("获取jsapi_ticket")
    @RequestMapping("/getticket")
    public R getticket(String accesToken){
        JSONObject info=tokenService.getticket(accesToken,"jsapi");
        return R.ok().put("data",info);
    }


}
